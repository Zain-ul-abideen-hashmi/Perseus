from __future__ import annotations

import re
from urllib.parse import urljoin, urlparse

import httpx
from bs4 import BeautifulSoup

from .schemas import Touchpoint

_UA = "PerseusBot/4.0 (+concept build; funnel stress tester)"
_CTA_WORDS = ["book", "schedule", "get started", "start", "buy", "sign up", "subscribe",
              "contact", "request", "call", "quote", "free", "try", "order", "apply", "join"]
_FOLLOW = ["pricing", "price", "plans", "cost", "book", "appointment", "schedule",
           "services", "service", "about", "contact", "quote", "product", "features"]


def _stage_for(url: str, text: str) -> str:
    u = (url or "").lower()
    t = text.lower()[:400]
    if any(k in u for k in ["book", "appointment", "schedule", "contact", "checkout"]):
        return "booking"
    if any(k in u for k in ["pricing", "price", "cost", "plans", "quote"]):
        return "objection"
    if any(k in u for k in ["service", "product", "feature", "about", "implant", "solutions"]):
        return "consideration"
    if any(k in u for k in ["", "home", "index", "/"]) and any(k in t for k in ["welcome", "trusted", "leading"]):
        return "awareness"
    return "consideration"


def parse_html(html: str, url: str | None = None, channel: str = "landing", idx: int = 0) -> Touchpoint:
    soup = BeautifulSoup(html, "lxml")
    for tag in soup(["script", "style", "noscript", "svg"]):
        tag.decompose()

    title = (soup.title.string.strip() if soup.title and soup.title.string else "") or ""
    h1 = soup.find(["h1", "h2"])
    headline = h1.get_text(" ", strip=True) if h1 else title

    main = soup.find("main") or soup.find("article") or soup.body or soup
    body = re.sub(r"\s+", " ", main.get_text(" ", strip=True))[:4000]

    ctas = []
    for el in soup.find_all(["a", "button"]):
        txt = el.get_text(" ", strip=True)
        if txt and len(txt) < 40 and any(w in txt.lower() for w in _CTA_WORDS):
            ctas.append(txt)
    ctas = list(dict.fromkeys(ctas))[:6]

    links = len(soup.find_all("a"))
    stage = _stage_for(url or "", headline + " " + body)
    return Touchpoint(
        id=f"tp-{idx}", channel=channel, stage=stage, url=url,
        title=title, headline=headline, body=body, ctas=ctas,
        links=links, word_count=len(body.split()),
    )


def _same_host(a: str, b: str) -> bool:
    return urlparse(a).netloc == urlparse(b).netloc


def crawl(url: str, max_pages: int = 6, timeout: float = 10.0) -> list[Touchpoint]:
    """Fetch a URL and a few same-domain funnel pages (pricing, book, …)."""
    tps: list[Touchpoint] = []
    seen: set[str] = set()
    with httpx.Client(headers={"User-Agent": _UA}, follow_redirects=True, timeout=timeout) as client:
        try:
            r = client.get(url)
            r.raise_for_status()
        except Exception as exc:  # noqa: BLE001
            raise RuntimeError(f"could not fetch {url}: {exc}") from exc
        seen.add(url)
        home = parse_html(r.text, url, idx=0)
        tps.append(home)

        soup = BeautifulSoup(r.text, "lxml")
        candidates = []
        for a in soup.find_all("a", href=True):
            href = urljoin(url, a["href"].split("#")[0])
            if not href.startswith("http") or not _same_host(url, href) or href in seen:
                continue
            if any(k in href.lower() for k in _FOLLOW):
                candidates.append(href)
        for href in dict.fromkeys(candidates):
            if len(tps) >= max_pages:
                break
            try:
                rr = client.get(href)
                rr.raise_for_status()
                seen.add(href)
                tps.append(parse_html(rr.text, href, idx=len(tps)))
            except Exception:  # noqa: BLE001
                continue
    return tps


def from_documents(docs: list[dict]) -> list[Touchpoint]:
    """docs: [{html, url?, channel?}] — pasted markup or uploaded exports."""
    out = []
    for i, d in enumerate(docs):
        html = d.get("html", "")
        if not html.strip():
            continue
        out.append(parse_html(html, d.get("url"), d.get("channel", "landing"), idx=i))
    return out
