export default function Crest({ w = 38, h = 34, blaze = false, animate = false, eye = null }) {
  const eyeW = eye?.w ?? Math.max(4, w * 0.15);
  const eyeH = eye?.h ?? Math.max(3, h * 0.11);
  const eyeStyle = {
    position: 'absolute',
    top: '48.5%',
    width: eyeW,
    height: eyeH,
    transform: 'translate(-50%,-50%)',
    borderRadius: '50%',
    background: blaze
      ? 'radial-gradient(ellipse,#fff0f3 8%,#ff2d55 34%,rgba(255,45,85,.55) 58%,transparent 78%)'
      : 'radial-gradient(ellipse,#ff2d55 20%,transparent 72%)',
    boxShadow: blaze
      ? '0 0 22px 7px rgba(255,45,85,.6)'
      : `0 0 ${Math.max(5, w * 0.16)}px ${Math.max(1.5, w * 0.05)}px rgba(255,45,85,.6)`,
    animation: blaze ? 'eyeBlaze 2.4s ease-in-out infinite' : undefined,
  };
  return (
    <div style={{ position: 'relative', width: w, height: h, flex: 'none' }}>
      <img
        src="/perseus-crest.png"
        alt="Perseus"
        style={{
          position: 'absolute',
          inset: 0,
          width: w,
          height: h,
          objectFit: 'contain',
          animation: animate ? 'crestPulse 2.4s ease-in-out infinite' : undefined,
        }}
      />
      <span style={{ ...eyeStyle, left: '43.6%' }} />
      <span style={{ ...eyeStyle, left: '56.4%' }} />
    </div>
  );
}
