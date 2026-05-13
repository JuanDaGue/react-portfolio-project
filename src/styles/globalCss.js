export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&family=Share+Tech+Mono&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --c: #00f5c4; --c2: #ff3d6b; --c3: #5b9cf6; --c4: #ffd060;
    --bg: #06090f; --bg2: #0b1018; --bg3: #101520;
    --text: #e2e8f0; --muted: #6a7a90;
    --card-bg: linear-gradient(145deg,#090e16,#0d1420);
    --card-border: rgba(0,245,196,.12);
    --nav-bg: rgba(6,9,15,.98);
    cursor: none;
  }
  .light {
    --bg: #f0f4f8; --bg2: #e4eaf2; --bg3: #dce4ef;
    --text: #0f1923; --muted: #4a5a70;
    --card-bg: linear-gradient(145deg,#ffffff,#f4f8ff);
    --card-border: rgba(0,180,140,.2);
    --nav-bg: rgba(240,244,248,.97);
  }
  .light body { background: #f0f4f8; color: #0f1923; }
  .light .glow-text { background: linear-gradient(90deg,#0f1923 0%,#007a62 40%,#1a4a8a 70%,#0f1923 100%); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: 'Rajdhani', sans-serif; cursor: none; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--c); border-radius: 2px; }
  a, button { cursor: none; }

  @keyframes fadeUp    { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn    { from { opacity:0; } to { opacity:1; } }
  @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:.4} }
  @keyframes scanDown  { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
  @keyframes glitchX   { 0%,100%{transform:translateX(0) skewX(0deg)} 20%{transform:translateX(-5px) skewX(-2deg)} 40%{transform:translateX(5px) skewX(2deg)} 60%{transform:translateX(-2px)} 80%{transform:translateX(2px)} }
  @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes gridPulse { 0%,100%{opacity:.035} 50%{opacity:.07} }
  @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes rotateSlow{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes shimmer   { 0%{background-position:200% center} 100%{background-position:-200% center} }
  @keyframes borderGlow{ 0%,100%{box-shadow:0 0 0px transparent} 50%{box-shadow:0 0 18px rgba(0,245,196,.35)} }
  @keyframes particleFade { 0%{opacity:0;transform:translateY(0) scale(0)} 20%{opacity:.8} 100%{opacity:0;transform:translateY(-80px) scale(1.5)} }
  @keyframes slideInRight { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
  @keyframes countUp { from{opacity:0;transform:scale(.7)} to{opacity:1;transform:scale(1)} }
  @keyframes rgbBorder { 0%{border-color:#00f5c4} 33%{border-color:#ff3d6b} 66%{border-color:#5b9cf6} 100%{border-color:#00f5c4} }

  .glow-text {
    background: linear-gradient(90deg,#fff 0%,#00f5c4 40%,#5b9cf6 70%,#fff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    animation: shimmer 4s linear infinite;
  }
  .card-hover {
    transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease, border-color .25s ease;
  }
  .card-hover:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 20px 50px rgba(0,0,0,.5), 0 0 30px rgba(0,245,196,.08);
  }
  .light .card-hover:hover { box-shadow: 0 20px 50px rgba(0,0,0,.15), 0 0 30px rgba(0,180,140,.12); }
  .btn-primary {
    position: relative; overflow: hidden;
    background: linear-gradient(135deg,#00f5c4,#00c49a);
    color: #020810; border: none; border-radius: 3px;
    font-family: 'Orbitron',monospace; font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase;
    padding: 12px 28px; cursor: none;
    transition: transform .2s, box-shadow .2s;
  }
  .btn-primary::before {
    content:''; position:absolute; inset:0;
    background: linear-gradient(135deg,rgba(255,255,255,.25),transparent);
    transform: translateX(-100%); transition: transform .3s ease;
  }
  .btn-primary:hover::before { transform: translateX(100%); }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,245,196,.4); }
  .btn-primary:active { transform: translateY(0); }

  .btn-ghost {
    position: relative; overflow: hidden;
    background: transparent; color: #00f5c4;
    border: 1px solid rgba(0,245,196,.4); border-radius: 3px;
    font-family: 'Orbitron',monospace; font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase;
    padding: 12px 28px; cursor: none;
    transition: all .2s;
  }
  .btn-ghost::after {
    content:''; position:absolute; inset:0;
    background: rgba(0,245,196,.07);
    opacity:0; transition: opacity .2s;
  }
  .btn-ghost:hover::after { opacity:1; }
  .btn-ghost:hover { border-color: rgba(0,245,196,.9); box-shadow: 0 0 20px rgba(0,245,196,.2), inset 0 0 20px rgba(0,245,196,.04); transform: translateY(-2px); }

  /* Theme toggle */
  .theme-toggle {
    position: relative; width: 48px; height: 26px; border-radius: 13px; border: 1px solid rgba(0,245,196,.3);
    background: rgba(0,245,196,.08); cursor: none; transition: all .3s; flex-shrink:0;
  }
  .theme-toggle:hover { border-color: rgba(0,245,196,.7); box-shadow: 0 0 15px rgba(0,245,196,.2); }
  .theme-toggle .knob {
    position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%;
    background: linear-gradient(135deg,#00f5c4,#5b9cf6); transition: transform .3s cubic-bezier(.34,1.56,.64,1);
    box-shadow: 0 0 8px rgba(0,245,196,.5);
  }
  .theme-toggle.light-mode { background: rgba(255,200,50,.1); border-color: rgba(255,200,50,.4); }
  .theme-toggle.light-mode .knob { transform: translateX(22px); background: linear-gradient(135deg,#ffd060,#ff8c42); box-shadow: 0 0 8px rgba(255,208,96,.6); }
  /* Filter pills */
  .filter-pill {
    font-family: 'Orbitron',monospace; font-size: 9px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; padding: 7px 14px; border-radius: 20px; cursor: none;
    border: 1px solid rgba(0,245,196,.2); background: rgba(0,245,196,.04); color: #4a6070;
    transition: all .2s cubic-bezier(.34,1.56,.64,1);
  }
  .filter-pill:hover { border-color: rgba(0,245,196,.5); color: #00f5c4; transform: translateY(-1px); }
  .filter-pill.active { background: rgba(0,245,196,.12); border-color: #00f5c4; color: #00f5c4; box-shadow: 0 0 15px rgba(0,245,196,.2); }
  .light .filter-pill { border-color: rgba(0,150,120,.2); color: #3a5060; }
  .light .filter-pill:hover, .light .filter-pill.active { border-color: #00a088; color: #007a62; background: rgba(0,160,136,.08); }
  /* Search input */
  .search-wrap { position: relative; }
  .search-wrap input { padding-left: 38px; border-radius: 8px; }
  .search-wrap .search-ico { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #3a5060; pointer-events:none; }
  /* Scroll to top */
  .scroll-top-btn {
    position: fixed; bottom: 32px; left: 32px; z-index: 300;
    width: 46px; height: 46px; border-radius: 50%;
    background: linear-gradient(135deg,rgba(0,245,196,.15),rgba(91,156,246,.1));
    border: 1px solid rgba(0,245,196,.4); color: #00f5c4; cursor: none;
    display: flex; align-items: center; justify-content: center; font-size: 18px;
    transition: all .3s cubic-bezier(.34,1.56,.64,1);
    box-shadow: 0 4px 20px rgba(0,0,0,.4);
    backdrop-filter: blur(10px);
  }
  .scroll-top-btn:hover { transform: translateY(-4px) scale(1.1); box-shadow: 0 8px 30px rgba(0,245,196,.3); border-color: #00f5c4; background: rgba(0,245,196,.2); }
  .light .scroll-top-btn { background: rgba(0,180,140,.1); border-color: rgba(0,180,140,.5); color: #007a62; }
  /* Light mode overrides */
  .light input, .light textarea { background: #fff; border-color: rgba(0,150,120,.2); color: #0f1923; }
  .light input:focus, .light textarea:focus { border-color: rgba(0,180,140,.6); box-shadow: 0 0 0 3px rgba(0,180,140,.08); }
  .light input::placeholder, .light textarea::placeholder { color: #9ab0c0; }
  .light .btn-primary { background: linear-gradient(135deg,#00c4a0,#009a80); }
  .light .btn-ghost { color: #007a62; border-color: rgba(0,150,120,.4); }
  .light .btn-ghost:hover { border-color: #00a088; box-shadow: 0 0 20px rgba(0,160,136,.15); }
  .nav-btn {
    position:relative; overflow:hidden;
    font-family:'Orbitron',monospace; font-size:8px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;
    padding:7px 13px; border-radius:2px; cursor:none; border:1px solid transparent;
    transition: all .2s; display:flex; align-items:center; gap:5px; background:transparent;
  }
  .nav-btn::after {
    content:''; position:absolute; bottom:0; left:50%; right:50%; height:1px;
    background:#00f5c4; transition: left .2s, right .2s;
  }
  .nav-btn:hover::after, .nav-btn.active::after { left:0; right:0; }
  .nav-btn.active { color:#00f5c4; border-color:rgba(0,245,196,.25); background:rgba(0,245,196,.06); }
  .nav-btn:hover:not(.active) { color:#c0d0df; }

  .service-card {
    position:relative; overflow:hidden;
    background: var(--bg3); border:1px solid rgba(0,245,196,.1); border-radius:10px; padding:28px 24px;
    transition: transform .3s cubic-bezier(.34,1.56,.64,1), border-color .3s, box-shadow .3s;
    cursor:none;
  }
  .service-card::before {
    content:''; position:absolute; inset:0; opacity:0;
    transition: opacity .3s;
  }
  .service-card:hover { transform:translateY(-8px) scale(1.02); box-shadow:0 24px 60px rgba(0,0,0,.5); }
  .service-card:hover::before { opacity:1; }

  .skill-bar-fill { transition: width 1.2s cubic-bezier(.4,0,.2,1); }


  /* Typing cursor */
  .typing-cursor {
    display:inline-block; width:2px; height:1.1em;
    background:#00f5c4; margin-left:2px; vertical-align:text-bottom;
    animation:blink .75s step-end infinite;
  }
  /* Matrix mode */
  .matrix-mode { --c:#00ff41 !important; }
  .matrix-mode body { background:#000 !important; }
  .matrix-mode .glow-text {
    background: linear-gradient(90deg,#00ff41,#00cc33,#00ff41) !important;
    background-size:200% auto !important;
    -webkit-background-clip:text !important; -webkit-text-fill-color:transparent !important;
  }
  /* Matrix rain canvas */
  #matrix-canvas { position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.18; }
  /* Matrix toggle button */
  .matrix-btn {
    position:fixed; bottom:32px; right:80px; z-index:300;
    width:46px; height:46px; border-radius:50%;
    background:rgba(0,30,0,.85); border:1px solid rgba(0,255,65,.35);
    color:#00ff41; cursor:none; font-family:'Share Tech Mono',monospace;
    font-size:13px; font-weight:700; letter-spacing:0;
    display:flex;align-items:center;justify-content:center;
    transition:all .3s cubic-bezier(.34,1.56,.64,1);
    box-shadow:0 4px 20px rgba(0,0,0,.4);
    backdrop-filter:blur(10px);
  }
  .matrix-btn:hover { transform:translateY(-4px) scale(1.1); box-shadow:0 8px 30px rgba(0,255,65,.25); border-color:rgba(0,255,65,.8); }
  .matrix-btn.active { background:rgba(0,255,65,.15); box-shadow:0 0 30px rgba(0,255,65,.4),0 8px 30px rgba(0,255,65,.2); }

  input, textarea {  input, textarea {
    background:#06090f; border:1px solid rgba(0,245,196,.15); border-radius:4px;
    padding:11px 14px; color:#e8eaf0; font-size:14px; font-family:'Rajdhani',sans-serif;
    outline:none; width:100%; transition: border-color .2s, box-shadow .2s;
  }
  input:focus, textarea:focus {
    border-color:rgba(0,245,196,.6);
    box-shadow:0 0 0 3px rgba(0,245,196,.08), 0 0 20px rgba(0,245,196,.1);
  }
  input::placeholder, textarea::placeholder { color:#2a3a4a; }
`;

