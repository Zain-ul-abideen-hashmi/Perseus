from __future__ import annotations

from dataclasses import dataclass, field

STAGE_ORDER = ["awareness", "consideration", "objection", "booking"]

REGIONS = ["headline", "hero", "proof", "price", "cta"]


@dataclass
class Touchpoint:
    id: str
    channel: str = "landing"          # landing | ads | social | email
    stage: str = "consideration"      # one of STAGE_ORDER
    url: str | None = None
    title: str = ""
    headline: str = ""
    body: str = ""
    ctas: list[str] = field(default_factory=list)
    links: int = 0
    word_count: int = 0

    def region_text(self) -> dict[str, str]:
        cta = " ".join(self.ctas)
        return {
            "headline": self.headline or self.title,
            "hero": self.body[:600],
            "proof": self.body,
            "price": self.body,
            "cta": cta,
        }
