import { useEffect, useRef, useState } from "react";
import { GLOBAL_CSS } from "./styles/globalCss";
import { NAV_ITEMS, SOCIALS } from "./data/portfolioData";
import { useAchievements, useFavicon, useSound } from "./hooks";
import { AchievementToast, AchievementsButton, AchievementsPanel, CursorTrail, CustomCursor, KonamiEgg, LoadingScreen, MatrixRain, MatrixToggle, PageTransition, ParticleBackground, ScrollToTop, SnakeLauncher, SocialSidebar, VisitCounter } from "./components/portfolioComponents";
import { PageAbout, PageAwards, PageBlog, PageContact, PageHome, PagePortfolio, PageReferences, PageServices, PageStack, PageTimeline } from "./pages/portfolioPages";

export default function App() {
  const [loaded,setLoaded]=useState(false);
  const [page,setPage]=useState("home");
  const [navSolid,setNavSolid]=useState(false);
  const [light,setLight]=useState(false);
  const [matrix,setMatrix]=useState(false);
  const [showAchievements,setShowAchievements]=useState(false);
  const { unlocked, unlock, toast } = useAchievements();
  const snd = useSound();
  useFavicon();
  // Expose unlock globally immediately (ref ensures it's always current)
  window.__jdgUnlock = unlock;

  // Track page visits for achievements
  const visitedPages = useRef(new Set(["home"]));
  const ALL_PAGES = ["home","about","services","portfolio","timeline","blog","awards","stack","references","contact"];

  // Nav solid on scroll of main-scroll div
  useEffect(()=>{
    const el=document.getElementById('main-scroll');
    if(!el) return;
    const s=()=>setNavSolid(el.scrollTop>40);
    el.addEventListener('scroll',s);
    return()=>el.removeEventListener('scroll',s);
  },[loaded]);

  // Scroll to top on page change + track achievements
  useEffect(()=>{
    document.getElementById('main-scroll')?.scrollTo({top:0,behavior:'smooth'});
    visitedPages.current.add(page);
    if(page==="timeline") window.__jdgUnlock && window.__jdgUnlock("timeline");
    if(page==="blog")     window.__jdgUnlock && window.__jdgUnlock("devlog");
    if(page==="portfolio") window.__jdgUnlock && window.__jdgUnlock("fan");
    if(ALL_PAGES.every(p=>visitedPages.current.has(p))) window.__jdgUnlock && window.__jdgUnlock("explorer");
  },[page]);

  if(!loaded) return <LoadingScreen onDone={()=>setLoaded(true)}/>;

  const pages={home:<PageHome setPage={setPage}/>,about:<PageAbout/>,services:<PageServices/>,portfolio:<PagePortfolio/>,timeline:<PageTimeline/>,blog:<PageBlog/>,awards:<PageAwards/>,stack:<PageStack/>,references:<PageReferences/>,contact:<PageContact/>};

  const navBg  = light ? (navSolid?"rgba(240,244,248,.99)":"rgba(240,244,248,.88)") : (navSolid?"rgba(6,9,15,.98)":"rgba(6,9,15,.85)");
  const navBorder = light ? (navSolid?"rgba(0,150,120,.2)":"rgba(0,150,120,.06)") : (navSolid?"rgba(0,245,196,.15)":"rgba(0,245,196,.06)");

  return(
    <div className={`${light?"light":""} ${matrix?"matrix-mode":""}`.trim()} style={{height:"100vh",display:"flex",flexDirection:"column",background:light?"#f0f4f8":"#06090f",fontFamily:"'Rajdhani',sans-serif",color:light?"#0f1923":"#e2e8f0",overflow:"hidden"}}>
      <style>{GLOBAL_CSS}</style>
      <CustomCursor/>
      <CursorTrail/>
      {matrix && <MatrixRain/>}
      {!light && !matrix && <ParticleBackground/>}
      <ScrollToTop/>
      <SocialSidebar/>
      <KonamiEgg/>
      <SnakeLauncher onAchieve={unlock}/>
      <AchievementToast ach={toast}/>
      <AchievementsButton unlocked={unlocked} onClick={()=>setShowAchievements(true)}/>
      {showAchievements && <AchievementsPanel unlocked={unlocked} onClose={()=>setShowAchievements(false)}/>}
      <MatrixToggle matrix={matrix} setMatrix={setMatrix} snd={snd}/>

      {/* Grid background */}
      <div style={{position:"fixed",inset:0,backgroundImage:`linear-gradient(${light?"rgba(0,150,120,.04)":"rgba(0,245,196,.03)"} 1px,transparent 1px),linear-gradient(90deg,${light?"rgba(0,150,120,.04)":"rgba(0,245,196,.03)"} 1px,transparent 1px)`,backgroundSize:"56px 56px",pointerEvents:"none",zIndex:0,animation:"gridPulse 4s ease-in-out infinite"}}/>

      {/* NAV */}
      <nav className="top-nav" style={{flexShrink:0,position:"relative",zIndex:100,background:navBg,backdropFilter:"blur(20px)",borderBottom:`1px solid ${navBorder}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px 0 48px",height:58,transition:"background .3s,border-color .3s",boxShadow:navSolid?(light?"0 4px 20px rgba(0,0,0,.1)":"0 4px 30px rgba(0,0,0,.4)"):"none"}}>
        <div className="nav-brand" style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{fontFamily:"'Orbitron',monospace",fontSize:15,fontWeight:900,letterSpacing:3,cursor:"none",transition:"text-shadow .2s"}}
            className="glow-text" onClick={()=>{setPage("home");snd.nav();}}
            onMouseEnter={e=>e.currentTarget.style.textShadow=light?"0 0 20px rgba(0,150,120,.5)":"0 0 20px rgba(0,245,196,.6)"}
            onMouseLeave={e=>e.currentTarget.style.textShadow="none"}>JDG</div>
          <VisitCounter/>
        </div>

        <div className="nav-links" style={{display:"flex",alignItems:"center",gap:2,flexWrap:"wrap"}}>
          {NAV_ITEMS.map(n=>(
            <button key={n.id} onClick={()=>{setPage(n.id);snd.nav();}} onMouseEnter={snd.hover}
              className={`nav-btn nav-${n.id}${page===n.id?" active":""}`}
              style={{color:page===n.id?(light?"#007a62":"#00f5c4"):(light?"#3a5060":"#4a5a6a")}}>
              <n.Ico/>{n.label}
            </button>
          ))}

          {/* Theme toggle */}
          <div style={{marginLeft:10,display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:13}}>{light?"☀️":"🌙"}</span>
            <button className={`theme-toggle${light?" light-mode":""}`} onClick={()=>{setLight(l=>!l);snd.click();if(!light && window.__jdgUnlock) window.__jdgUnlock("night_owl");}} onMouseEnter={snd.hover} title={light?"Modo oscuro":"Modo claro"}>
              <div className="knob"/>
            </button>
          </div>
        </div>
      </nav>

      {/* SCROLLABLE MAIN */}
      <div id="main-scroll" style={{flex:1,overflowY:"auto",position:"relative",zIndex:1}}>
        <main className="app-main" style={{paddingRight:48,minHeight:"calc(100vh - 58px)"}}>
          <PageTransition pageKey={page}>
            {pages[page]}
          </PageTransition>
        </main>
        <footer className="app-footer" style={{borderTop:`1px solid ${light?"rgba(0,150,120,.1)":"rgba(0,245,196,.06)"}`,padding:"22px 52px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,background:light?"rgba(230,238,248,.8)":"rgba(6,9,15,.8)"}}>
          <div style={{fontFamily:"'Orbitron',monospace",fontSize:9,color:light?"#8090a0":"#1a2530",letterSpacing:2}}>© 2025 JUAN DAVID GUERRERO UCHIMA</div>
          <div style={{display:"flex",gap:10}}>
            {SOCIALS.map(s=>(
              <a key={s.id} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                style={{display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,color:light?"#8090a0":"#1a2530",textDecoration:"none",transition:"color .2s,transform .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.color=s.color;e.currentTarget.style.transform="translateY(-3px)";}}
                onMouseLeave={e=>{e.currentTarget.style.color=light?"#8090a0":"#1a2530";e.currentTarget.style.transform="translateY(0)";}}>
                <s.Ico size={15}/>
              </a>
            ))}
          </div>
          <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:light?"#8090a0":"#1a2530",letterSpacing:1}}>UNITY · REACT · VR · MEDELLÍN</div>
        </footer>
      </div>
    </div>
  );
}
