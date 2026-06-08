import { useEffect, useState } from "react";
import { AWARDS, BLOG_POSTS, PROJECTS, REFERENCES, SERVICES, SKILLS, SOCIALS, STACK_CATS, TIMELINE, TYPE_ICONS, TYPE_LABELS } from "../data/portfolioData";
import { AnimatedSkillBar, Avatar, Carousel, downloadCV, ProjectCard, RepoLink, SH, TypingText } from "../components/portfolioComponents";
import { useSound } from "../hooks";

export function PageTimeline() {
  const snd = useSound();
  const [filter, setFilter] = useState("all");
  const types = ["all","edu","work","game"];
  const filtered = filter==="all" ? TIMELINE : TIMELINE.filter(t=>t.type===filter);
  return (
    <div className="page-shell" style={{padding:"52px 52px 64px", animation:"fadeUp .5s ease both"}}>
      <SH title="Timeline" sub="Mi trayectoria en desarrollo, educación y videojuegos"/>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:44}}>
        {types.map(t=>(
          <button key={t} className={`filter-pill${filter===t?" active":""}`}
            onClick={()=>{setFilter(t);snd.click();}} onMouseEnter={snd.hover}>
            {t==="all"?"Todo":TYPE_ICONS[t]+" "+TYPE_LABELS[t]}
          </button>
        ))}
      </div>
      <div style={{position:"relative",maxWidth:720}}>
        <div style={{position:"absolute",left:19,top:0,bottom:0,width:2,background:"linear-gradient(180deg,transparent,rgba(0,245,196,.3) 10%,rgba(0,245,196,.15) 90%,transparent)",borderRadius:1}}/>
        {filtered.map((item,i)=>(
          <div key={i} style={{display:"flex",gap:28,marginBottom:36,animation:`slideInRight .4s ease ${i*.07}s both`}}>
            <div style={{flexShrink:0,width:40,display:"flex",alignItems:"flex-start",paddingTop:2,justifyContent:"center"}}>
              <div style={{width:18,height:18,borderRadius:"50%",background:`linear-gradient(135deg,${item.color},${item.color}88)`,border:`2px solid ${item.color}`,boxShadow:`0 0 12px ${item.color}55`,zIndex:1,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9}}>{TYPE_ICONS[item.type]}</div>
            </div>
            <div className="theme-card timeline-card" style={{flex:1,background:"linear-gradient(145deg,#090e16,#0d1420)",border:`1px solid ${item.color}22`,borderRadius:10,padding:"18px 22px",transition:"border-color .2s,box-shadow .2s",cursor:"none"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=`${item.color}55`;e.currentTarget.style.boxShadow=`0 8px 30px rgba(0,0,0,.4),0 0 20px ${item.color}10`;snd.hover();}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=`${item.color}22`;e.currentTarget.style.boxShadow="none";}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,flexWrap:"wrap",gap:8}}>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:13,fontWeight:700,color:"#d0dae8"}}>{item.title}</div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <span style={{fontFamily:"'Orbitron',monospace",fontSize:8,letterSpacing:2,padding:"2px 8px",borderRadius:2,background:`${item.color}18`,color:item.color,border:`1px solid ${item.color}44`}}>{TYPE_LABELS[item.type]}</span>
                  <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#3a4a5a"}}>{item.year}</span>
                </div>
              </div>
              <div style={{fontSize:11,color:item.color,letterSpacing:1,textTransform:"uppercase",marginBottom:8,opacity:.8}}>{item.org}</div>
              <p style={{fontSize:13,color:"#5a6a7a",lineHeight:1.75}}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE: BLOG
══════════════════════════════════════════════════════════ */
export function BlogCard({ post, delay=0 }) {
  const snd = useSound();
  const [hov,setHov]=useState(false);
  return (
    <div className="theme-card blog-card" onMouseEnter={()=>{setHov(true);snd.hover();}} onMouseLeave={()=>setHov(false)}
      style={{background:"linear-gradient(145deg,#090e16,#0d1420)",border:`1px solid ${hov?post.tagColor+"44":"rgba(0,245,196,.1)"}`,borderRadius:12,overflow:"hidden",transition:"transform .25s cubic-bezier(.34,1.56,.64,1),border-color .2s,box-shadow .2s",transform:hov?"translateY(-5px)":"translateY(0)",boxShadow:hov?`0 20px 50px rgba(0,0,0,.5),0 0 25px ${post.tagColor}12`:"none",animation:`fadeUp .5s ease ${delay}s both`,cursor:"none"}}>
      <div style={{height:100,background:`linear-gradient(135deg,${post.tagColor}15,${post.tagColor}05)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:44,position:"relative",borderBottom:`1px solid ${post.tagColor}18`}}>
        <span style={{transition:"transform .3s",transform:hov?"scale(1.15) rotate(-5deg)":"scale(1)"}}>{post.emoji}</span>
        <span style={{position:"absolute",top:12,right:12,fontFamily:"'Orbitron',monospace",fontSize:8,letterSpacing:2,padding:"3px 8px",borderRadius:2,background:post.tagColor+"22",color:post.tagColor,border:`1px solid ${post.tagColor}44`}}>{post.tag}</span>
        <span style={{position:"absolute",bottom:10,left:14,fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#2a3a4a"}}>{post.date} · {post.readTime} de lectura</span>
      </div>
      <div style={{padding:"20px 22px"}}>
        <div style={{fontFamily:"'Orbitron',monospace",fontSize:12,fontWeight:700,color:hov?"#fff":"#c0ccd8",lineHeight:1.4,marginBottom:12,transition:"color .2s"}}>{post.title}</div>
        <p style={{fontSize:13,color:"#5a6a7a",lineHeight:1.75,marginBottom:16}}>{post.excerpt}</p>
        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:16}}>
          {post.topics.map(t=><span key={t} style={{fontSize:9,letterSpacing:1,textTransform:"uppercase",padding:"2px 7px",borderRadius:2,background:"rgba(255,255,255,.04)",color:"#3a4a5a",border:"1px solid rgba(255,255,255,.06)"}}>{t}</span>)}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,fontFamily:"'Orbitron',monospace",fontSize:8,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:post.tagColor,opacity:hov?1:.4,transition:"opacity .2s"}}>Leer entrada →</div>
      </div>
    </div>
  );
}
export function PageBlog() {
  return (
    <div className="page-shell" style={{padding:"52px 52px 64px",animation:"fadeUp .5s ease both"}}>
      <SH title="Devlog" sub="Entradas sobre proceso creativo, técnicas y aprendizajes"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}>
        {BLOG_POSTS.map((p,i)=><BlogCard key={p.id} post={p} delay={i*.07}/>)}
      </div>
      <div className="theme-card devlog-note" style={{marginTop:36,padding:"20px 24px",borderRadius:10,border:"1px dashed rgba(0,245,196,.15)",background:"rgba(0,245,196,.02)",display:"flex",alignItems:"center",gap:16}}>
        <span style={{fontSize:24}}>✍️</span>
        <div>
          <div style={{fontFamily:"'Orbitron',monospace",fontSize:10,color:"#00f5c4",letterSpacing:2,marginBottom:4}}>Más entradas próximamente</div>
          <p style={{fontSize:13,color:"#3a4a5a"}}>Sígueme en redes para no perderte ninguna actualización.</p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE: AWARDS
══════════════════════════════════════════════════════════ */
export function PageAwards() {
  const snd = useSound();
  return (
    <div className="page-shell" style={{padding:"52px 52px 64px",animation:"fadeUp .5s ease both"}}>
      <SH title="Awards" sub="Reconocimientos, logros y participaciones destacadas"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20,marginBottom:40}}>
        {AWARDS.map((a,i)=>(
          <div key={i} className="theme-card award-card" style={{background:"linear-gradient(145deg,#090e16,#0d1420)",border:`1px solid ${a.color}22`,borderRadius:12,padding:"24px 22px",animation:`fadeUp .5s ease ${i*.08}s both`,transition:"transform .25s cubic-bezier(.34,1.56,.64,1),border-color .2s,box-shadow .2s",cursor:"none"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.borderColor=`${a.color}55`;e.currentTarget.style.boxShadow=`0 16px 40px rgba(0,0,0,.5),0 0 25px ${a.color}12`;snd.hover();}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.borderColor=`${a.color}22`;e.currentTarget.style.boxShadow="none";}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
              <div style={{fontSize:40,lineHeight:1}}>{a.icon}</div>
              <div style={{textAlign:"right"}}>
                <span style={{fontFamily:"'Orbitron',monospace",fontSize:8,letterSpacing:2,padding:"2px 8px",borderRadius:2,background:`${a.color}18`,color:a.color,border:`1px solid ${a.color}44`,display:"block",marginBottom:4}}>{a.type}</span>
                <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#2a3a4a"}}>{a.year}</span>
              </div>
            </div>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:13,fontWeight:700,color:"#d0dae8",marginBottom:6,lineHeight:1.3}}>{a.title}</div>
            <div style={{fontSize:11,color:a.color,letterSpacing:1,textTransform:"uppercase",marginBottom:10,opacity:.8}}>{a.event}</div>
            <p style={{fontSize:13,color:"#5a6a7a",lineHeight:1.75}}>{a.desc}</p>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:14}}>
        {[["🏆","1","Premio académico"],["🎮","1","Finalista jam"],["🔭","1","Mención científica"],["⚡","1","Contribuidor"]].map(([ico,n,l])=>(
          <div key={l} className="theme-card award-stat-card" style={{background:"linear-gradient(145deg,#090e16,#0c1220)",border:"1px solid rgba(0,245,196,.08)",borderRadius:10,padding:"16px",textAlign:"center"}}>
            <div style={{fontSize:26,marginBottom:6}}>{ico}</div>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:22,fontWeight:900,color:"#00f5c4",lineHeight:1}}>{n}</div>
            <div style={{fontSize:10,color:"#3a4a5a",marginTop:4,letterSpacing:1}}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE: STACK
══════════════════════════════════════════════════════════ */
export function StackLogo({ item, color }) {
  const snd = useSound();
  const [hov,setHov]=useState(false);
  return (
    <div className="theme-card stack-card" onMouseEnter={()=>{setHov(true);snd.hover();}} onMouseLeave={()=>setHov(false)}
      style={{background:"linear-gradient(145deg,#090e16,#0d1420)",border:`1px solid ${hov?color+"66":"rgba(255,255,255,.06)"}`,borderRadius:10,padding:"20px 16px",textAlign:"center",transition:"all .25s cubic-bezier(.34,1.56,.64,1)",transform:hov?"translateY(-6px) scale(1.03)":"translateY(0) scale(1)",boxShadow:hov?`0 16px 40px rgba(0,0,0,.5),0 0 25px ${color}15`:"none",cursor:"none"}}>
      <div style={{width:44,height:44,borderRadius:10,background:hov?`${color}18`:"rgba(255,255,255,.04)",margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center",color:hov?color:"#3a4a5a",transition:"all .2s",boxShadow:hov?`0 0 15px ${color}30`:"none"}}>
        <div style={{width:26,height:26}}>{item.logo}</div>
      </div>
      <div style={{fontFamily:"'Orbitron',monospace",fontSize:10,fontWeight:700,color:hov?"#e0e8f0":"#5a6a7a",marginBottom:6,transition:"color .2s"}}>{item.name}</div>
      <div style={{height:2,background:"rgba(255,255,255,.06)",borderRadius:1,marginBottom:8,overflow:"hidden"}}>
        <div style={{height:"100%",width:hov?`${item.level}%`:"0%",background:`linear-gradient(90deg,${color},${color}88)`,borderRadius:1,transition:"width .8s cubic-bezier(.4,0,.2,1)",boxShadow:`0 0 6px ${color}66`}}/>
      </div>
      <div style={{fontSize:9,color:hov?color:"#2a3a4a",letterSpacing:1,transition:"color .2s"}}>{item.level}%</div>
      {hov&&<div style={{fontSize:11,color:"#5a6a7a",marginTop:8,lineHeight:1.5,animation:"fadeInUp .2s ease"}}>{item.desc}</div>}
    </div>
  );
}
export function PageStack() {
  return (
    <div className="page-shell" style={{padding:"52px 52px 64px",animation:"fadeUp .5s ease both"}}>
      <SH title="Tech Stack" sub="Todas las tecnologías con las que trabajo"/>
      {STACK_CATS.map((cat,ci)=>(
        <div key={ci} style={{marginBottom:44}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
            <div style={{width:3,height:20,borderRadius:2,background:`linear-gradient(180deg,${cat.color},${cat.color}44)`}}/>
            <span style={{fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,color:cat.color,letterSpacing:3,textTransform:"uppercase"}}>{cat.cat}</span>
            <div style={{flex:1,height:1,background:`linear-gradient(90deg,${cat.color}33,transparent)`}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14}}>
            {cat.items.map((item,ii)=>(
              <div key={ii} style={{animation:`fadeUp .4s ease ${(ci*4+ii)*.06}s both`}}>
                <StackLogo item={item} color={cat.color}/>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function PageCompactPortfolio({ setExtended }) {
  const featured = PROJECTS.slice(0, 6);
  return (
    <div className="compact-shell" style={{padding:"54px 52px 72px",animation:"fadeUp .5s ease both"}}>
      <section className="compact-hero" style={{display:"grid",gridTemplateColumns:"minmax(0,1.05fr) minmax(280px,.95fr)",gap:36,alignItems:"center",marginBottom:52}}>
        <div>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"'Orbitron',monospace",fontSize:10,fontWeight:700,letterSpacing:3,color:"#00f5c4",border:"1px solid rgba(0,245,196,.35)",padding:"5px 14px",borderRadius:2,marginBottom:16,textTransform:"uppercase",background:"rgba(0,245,196,.04)"}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#00f5c4",animation:"pulse 1.5s ease-in-out infinite"}}/>
            Portfolio resumido
          </div>
          <h1 className="glow-text" style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(34px,5vw,62px)",fontWeight:900,lineHeight:1.05,marginBottom:18}}>Juan David<br/>Guerrero Uchima</h1>
          <p style={{fontSize:16,lineHeight:1.85,color:"#8090a0",maxWidth:640,marginBottom:28}}>
            Desarrollador web y game developer. Actualmente trabajo con Unity y Unreal Engine, incluyendo FreakFall como proyecto activo en Unreal.
          </p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <a className="btn-primary" href="#compact-projects" style={{textDecoration:"none",display:"inline-flex",alignItems:"center"}}>Ver proyectos</a>
            <a className="btn-ghost" href="#compact-contact" style={{textDecoration:"none",display:"inline-flex",alignItems:"center"}}>Contacto</a>
            <button className="btn-ghost" onClick={()=>setExtended(true)}>Versión extendida</button>
          </div>
        </div>
        <div className="theme-card compact-summary-card" style={{background:"linear-gradient(145deg,#090e16,#0d1420)",border:"1px solid rgba(0,245,196,.12)",borderRadius:12,padding:"28px 28px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:14}}>
            {[["5","Proyectos"],["2+","Años web"],["80%+","Unreal"],["VR","Experiencias"]].map(([n,l])=>(
              <div key={l} style={{padding:"16px 14px",border:"1px solid rgba(0,245,196,.08)",borderRadius:8,background:"rgba(0,245,196,.035)"}}>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:26,fontWeight:900,color:"#00f5c4",lineHeight:1}}>{n}</div>
                <div style={{fontSize:10,color:"#3a4a5a",letterSpacing:1.5,textTransform:"uppercase",marginTop:6}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="compact-projects" style={{marginBottom:56}}>
        <SH title="Projects" sub="Una selección rápida de mis proyectos principales"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:20}}>
          {featured.map((p,i)=><ProjectCard key={p.id} p={p} delay={i*.06}/>)}
        </div>
      </section>

      <section id="compact-contact">
        <SH title="Contact" sub="Hablemos sobre videojuegos, web o experiencias interactivas"/>
        <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(280px,420px)",gap:22,alignItems:"stretch"}}>
          <div className="theme-card compact-contact-card" style={{background:"linear-gradient(145deg,#090e16,#0d1420)",border:"1px solid rgba(0,245,196,.12)",borderRadius:12,padding:"28px"}}>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:13,fontWeight:700,color:"#00f5c4",letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Disponible para proyectos</div>
            <p style={{fontSize:14,color:"#6a7a8a",lineHeight:1.8,marginBottom:22}}>
              Si quieres revisar mi trabajo completo, puedes abrir la versión extendida. Si ya tienes una idea clara, escríbeme directamente.
            </p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <a className="btn-primary" href="mailto:juandague@email.com" style={{textDecoration:"none",display:"inline-flex",alignItems:"center"}}>Enviar email</a>
              <button className="btn-ghost" onClick={()=>setExtended(true)}>Ver todo</button>
            </div>
          </div>
          <div className="theme-card compact-social-card" style={{background:"linear-gradient(145deg,#090e16,#0d1420)",border:"1px solid rgba(0,245,196,.1)",borderRadius:12,padding:"22px 24px"}}>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:10,fontWeight:700,letterSpacing:3,color:"#00f5c4",textTransform:"uppercase",marginBottom:14}}>Redes</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {SOCIALS.map(s=>(
                <a key={s.id} href={s.href} target="_blank" rel="noreferrer"
                  style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:7,border:"1px solid rgba(255,255,255,.05)",background:"rgba(0,0,0,.2)",textDecoration:"none",color:"#5a6a7a",transition:"all .22s"}}>
                  <span style={{display:"flex",alignItems:"center",flexShrink:0,color:s.color}}><s.Ico/></span>
                  <span style={{fontFamily:"'Orbitron',monospace",fontSize:9,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase"}}>{s.label}</span>
                  <span style={{marginLeft:"auto",fontSize:12,opacity:.3}}>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



export function PageHome({ setPage }) {
  const [mousePos,setMousePos]=useState({x:0,y:0});
  useEffect(()=>{
    const m=e=>setMousePos({x:e.clientX/window.innerWidth,y:e.clientY/window.innerHeight});
    window.addEventListener('mousemove',m);
    return()=>window.removeEventListener('mousemove',m);
  },[]);
  return(
    <div style={{animation:"fadeUp .6s ease both"}}>
      <div className="home-hero" style={{position:"relative",padding:"90px 52px 80px",minHeight:"80vh",display:"flex",flexDirection:"column",justifyContent:"center",overflow:"hidden"}}>
        {/* Parallax layer 1 — large teal blob, slow */}
        <div style={{position:"absolute",top:`${15+mousePos.y*8}%`,right:`${2+mousePos.x*4}%`,width:700,height:700,background:"radial-gradient(circle,rgba(0,245,196,.07) 0%,transparent 60%)",pointerEvents:"none",transition:"top 1.2s cubic-bezier(.25,.46,.45,.94),right 1.2s cubic-bezier(.25,.46,.45,.94)"}}/>
        {/* Parallax layer 2 — pink blob, medium */}
        <div style={{position:"absolute",bottom:`${8+mousePos.y*6}%`,left:`${12+mousePos.x*3}%`,width:450,height:450,background:"radial-gradient(circle,rgba(255,61,107,.05) 0%,transparent 65%)",pointerEvents:"none",transition:"bottom .9s cubic-bezier(.25,.46,.45,.94),left .9s cubic-bezier(.25,.46,.45,.94)"}}/>
        {/* Parallax layer 3 — blue mid, faster */}
        <div style={{position:"absolute",top:`${35+mousePos.y*12}%`,left:`${55+mousePos.x*6}%`,width:280,height:280,background:"radial-gradient(circle,rgba(91,156,246,.06) 0%,transparent 70%)",pointerEvents:"none",transition:"top .6s cubic-bezier(.25,.46,.45,.94),left .6s cubic-bezier(.25,.46,.45,.94)"}}/>
        {/* Parallax layer 4 — gold small, fastest */}
        <div style={{position:"absolute",top:`${60+mousePos.y*15}%`,right:`${20+mousePos.x*8}%`,width:150,height:150,background:"radial-gradient(circle,rgba(255,208,96,.04) 0%,transparent 70%)",pointerEvents:"none",transition:"top .4s ease,right .4s ease"}}/>
        {/* Parallax layer 5 — violet, counter-move */}
        <div style={{position:"absolute",top:`${25-mousePos.y*5}%`,left:`${25-mousePos.x*3}%`,width:320,height:320,background:"radial-gradient(circle,rgba(167,139,250,.04) 0%,transparent 70%)",pointerEvents:"none",transition:"top .7s ease,left .7s ease"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div className="hero-intro" style={{display:"flex",alignItems:"center",gap:24,marginBottom:32}}>
            <Avatar size={100}/>
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"'Orbitron',monospace",fontSize:10,fontWeight:700,letterSpacing:3,color:"#00f5c4",border:"1px solid rgba(0,245,196,.4)",padding:"5px 14px",borderRadius:2,marginBottom:10,textTransform:"uppercase",animation:"borderGlow 3s ease-in-out infinite",backdropFilter:"blur(8px)",background:"rgba(0,245,196,.04)"}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:"#00f5c4",animation:"pulse 1.5s ease-in-out infinite"}}/>
                Game Developer Portfolio
              </div>
              <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#2a3a4a",letterSpacing:2,textTransform:"uppercase"}}>
                Presiona ↑↑↓↓←→←→BA para una sorpresa 🎮
              </div>
            </div>
          </div>
          <h1 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(32px,5.5vw,64px)",fontWeight:900,lineHeight:1.05,letterSpacing:-1,marginBottom:14}} className="glow-text">Juan David<br/>Guerrero Uchima</h1>
          <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:16,fontWeight:300,letterSpacing:4,color:"#4a6070",textTransform:"uppercase",marginBottom:30}}>
            <TypingText texts={[
              "Indie Game Dev · Unreal · Unity · VR",
              "Web Developer · React · Angular · APIs",
              "B.Sc. Astronomy · Física · Astrobiología",
              "Medellín, Colombia 🇨🇴",
            ]} speed={50} pause={2000}/>
          </div>
          <p style={{fontSize:16,lineHeight:1.9,color:"#8090a0",maxWidth:580,marginBottom:44}}>
            Desarrollador con +2 años en web y experiencia en videojuegos con Unity y Unreal Engine. Actualmente trabajo en{" "}
            <span style={{color:"#00f5c4",fontWeight:600}}>FreakFall</span>, un proyecto en Unreal enfocado en gameplay, movimiento y prototipado con Blueprints/C++.
          </p>
          <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:64}}>
            <button className="btn-primary" onClick={()=>setPage("portfolio")}>Ver Proyectos ↗</button>
            <button className="btn-ghost" onClick={()=>setPage("contact")}>Contactar</button>
          </div>
          <div className="hero-stats" style={{display:"flex",gap:44,flexWrap:"wrap"}}>
            {[["5","Proyectos"],["2+","Años Web"],["80%+","Unreal"],["3","Plataformas"]].map(([n,l],i)=>(
              <div key={l} style={{textAlign:"center",animation:`countUp .5s ease ${i*.1+.5}s both`}}>
                <span style={{fontFamily:"'Orbitron',monospace",fontSize:36,fontWeight:900,display:"block",lineHeight:1,background:`linear-gradient(135deg,#00f5c4,#5b9cf6)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{n}</span>
                <span style={{fontSize:10,letterSpacing:3,color:"#3a4a5a",textTransform:"uppercase"}}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageAbout() {
  return(
    <div className="page-shell" style={{padding:"52px 52px 64px",animation:"fadeUp .5s ease both"}}>
      <SH title="About Me" sub="Desarrollador indie apasionado por crear experiencias únicas"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24}}>
        <div className="theme-card about-card" style={{background:"linear-gradient(145deg,#090e16,#0d1420)",border:"1px solid rgba(0,245,196,.12)",borderRadius:12,padding:"30px 28px",boxShadow:"0 8px 40px rgba(0,0,0,.3)"}}>
          <div style={{display:"flex",alignItems:"center",gap:18,marginBottom:28}}>
            <Avatar size={80} light={false}/>
            <div>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:14,fontWeight:700,color:"#e0e8f0"}}>Juan David Guerrero Uchima</div>
              <div style={{fontSize:11,color:"#3a5060",letterSpacing:2,textTransform:"uppercase",marginTop:5}}>Indie Game Dev · Medellín, Colombia</div>
            </div>
          </div>
          <p style={{fontSize:14,lineHeight:1.9,color:"#6a7a8a",marginBottom:14}}>Más de dos años en desarrollo web y experiencia en videojuegos con Unity y Unreal Engine. Actualmente desarrollo FreakFall en Unreal, trabajando gameplay, movimiento, cámara y sistemas base con Blueprints/C++.</p>
          <p style={{fontSize:14,lineHeight:1.9,color:"#6a7a8a",marginBottom:24}}>Mi formación en <span style={{color:"#00f5c4"}}>física y astronomía</span> me permite crear mecánicas jugables únicas que combinan ciencia y entretenimiento.</p>
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:16}}>
            {["Unreal Engine","Blueprints","C++","FreakFall","Unity","C#","React","Angular","JavaScript","Python","VR","Física","Astronomía"].map(t=>(
              <span key={t} data-hover style={{fontSize:9,letterSpacing:1.5,textTransform:"uppercase",padding:"4px 10px",borderRadius:2,background:"rgba(0,245,196,.05)",color:"#00f5c4",border:"1px solid rgba(0,245,196,.18)",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,245,196,.12)";e.currentTarget.style.boxShadow="0 0 12px rgba(0,245,196,.15)";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(0,245,196,.05)";e.currentTarget.style.boxShadow="none";}}>{t}</span>
            ))}
          </div>
          <button className="btn-primary" onClick={()=>{ downloadCV(); if(window.__jdgUnlock) window.__jdgUnlock("recruiter"); }}
            style={{fontSize:9,padding:"9px 20px",display:"inline-flex",alignItems:"center",gap:8}}>
            ⬇ Descargar CV (PDF)
          </button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          <div className="theme-card skills-card" style={{background:"linear-gradient(145deg,#090e16,#0d1420)",border:"1px solid rgba(0,245,196,.1)",borderRadius:12,padding:"24px 26px"}}>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:10,fontWeight:700,letterSpacing:3,color:"#00f5c4",textTransform:"uppercase",marginBottom:18}}>Skills</div>
            {SKILLS.map((s,si)=>(
              <div key={s.cat} style={{marginBottom:20}}>
                <div style={{fontSize:9,color:s.color,letterSpacing:2.5,textTransform:"uppercase",marginBottom:9,fontFamily:"'Orbitron',monospace"}}>{s.cat}</div>
                {s.items.map((it,ii)=><AnimatedSkillBar key={it.name} name={it.name} pct={it.pct} color={s.color} delay={(si*3+ii)*80}/>)}
              </div>
            ))}
          </div>
          <div className="theme-card feature-card" style={{background:"linear-gradient(145deg,#080d18,#0c1225)",border:"1px solid rgba(91,156,246,.2)",borderRadius:12,padding:"20px 24px",boxShadow:"0 0 30px rgba(91,156,246,.05)"}}>
            <div style={{fontSize:13,fontWeight:600,color:"#5b9cf6",marginBottom:8,display:"flex",alignItems:"center",gap:8}}>🔭 BioAstronomía VR</div>
            <p style={{fontSize:13,color:"#5a6a7a",lineHeight:1.7}}>Propuesta educativa: telescopio virtual para niños, observar planetas y evaluar habitabilidad con criterios de astrobiología.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageServices() {
  return(
    <div className="page-shell" style={{padding:"52px 52px 64px",animation:"fadeUp .5s ease both"}}>
      <SH title="Services" sub="Lo que puedo construir para ti"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:18}}>
        {SERVICES.map((s,i)=>(
          <div key={i} className="service-card" style={{animationDelay:`${i*.07}s`,"--hc":s.color}} onMouseEnter={e=>{e.currentTarget.style.borderColor=s.color+"50";e.currentTarget.style.boxShadow=`0 24px 60px rgba(0,0,0,.6),0 0 30px ${s.color}12`;e.currentTarget.style.background=`linear-gradient(145deg,#0d1420,${s.color}08)`;}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(0,245,196,.1)";e.currentTarget.style.boxShadow="none";e.currentTarget.style.background="#101520";}}>
            <div style={{fontSize:36,marginBottom:16,display:"inline-block",transition:"transform .3s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.2) rotate(-5deg)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1) rotate(0)"}>{s.icon}</div>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,color:s.color,letterSpacing:1,marginBottom:10}}>{s.title}</div>
            <p style={{fontSize:13,color:"#5a6a7a",lineHeight:1.8}}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PagePortfolio() {
  const ALL_TAGS = ["Todo", ...Array.from(new Set(PROJECTS.flatMap(p => p.chips)))];
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("Todo");

  const filtered = PROJECTS.filter(p => {
    const matchTag = activeTag === "Todo" || p.chips.includes(activeTag);
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.genre.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.chips.some(c => c.toLowerCase().includes(q));
    return matchTag && matchSearch;
  });

  return(
    <div className="page-shell" style={{padding:"52px 52px 64px",animation:"fadeUp .5s ease both"}}>
      <SH title="Portfolio" sub="Proyectos reales construidos con pasión"/>
      <Carousel/>

      {/* ── Search + Filter bar ── */}
      <div style={{marginBottom:28,display:"flex",flexDirection:"column",gap:16}}>
        {/* Search */}
        <div className="search-wrap" style={{maxWidth:380}}>
          <span className="search-ico">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input
            placeholder="Buscar proyectos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{borderRadius:8,paddingLeft:38}}
          />
        </div>

        {/* Filter pills */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontFamily:"'Orbitron',monospace",fontSize:9,color:"#3a4a5a",letterSpacing:2,textTransform:"uppercase",marginRight:4}}>Filtrar:</span>
          {ALL_TAGS.map(tag => (
            <button key={tag} className={`filter-pill${activeTag===tag?" active":""}`} onClick={() => setActiveTag(tag)}>{tag}</button>
          ))}
          {(search || activeTag !== "Todo") && (
            <button onClick={() => { setSearch(""); setActiveTag("Todo"); }}
              style={{fontFamily:"'Orbitron',monospace",fontSize:8,letterSpacing:1.5,textTransform:"uppercase",padding:"5px 10px",borderRadius:20,border:"1px solid rgba(255,61,107,.3)",background:"rgba(255,61,107,.06)",color:"#ff3d6b",cursor:"none",transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,61,107,.15)";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,61,107,.06)";}}>
              ✕ Limpiar
            </button>
          )}
        </div>

        {/* Result count */}
        <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:"#2a3a4a",letterSpacing:1}}>
          {filtered.length === 0
            ? <span style={{color:"#ff3d6b"}}>No se encontraron proyectos</span>
            : <span><span style={{color:"#00f5c4"}}>{filtered.length}</span> proyecto{filtered.length!==1?"s":""} encontrado{filtered.length!==1?"s":""}</span>
          }
        </div>
      </div>

      {/* ── Grid ── */}
      {filtered.length > 0 ? (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:20}}>
          {filtered.map((p,i)=><ProjectCard key={p.id} p={p} delay={i*.07}/>)}
        </div>
      ) : (
        <div style={{textAlign:"center",padding:"60px 20px",border:"1px dashed rgba(0,245,196,.15)",borderRadius:12}}>
          <div style={{fontSize:44,marginBottom:16}}>🔍</div>
          <div style={{fontFamily:"'Orbitron',monospace",fontSize:12,color:"#2a3a4a",letterSpacing:2,marginBottom:8}}>Sin resultados</div>
          <p style={{fontSize:13,color:"#2a3a4a"}}>Intenta con otra búsqueda o filtro.</p>
        </div>
      )}
    </div>
  );
}

export function PageReferences() {
  return(
    <div className="page-shell" style={{padding:"52px 52px 64px",animation:"fadeUp .5s ease both"}}>
      <SH title="References" sub="Lo que dicen quienes han trabajado conmigo"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:20}}>
        {REFERENCES.map((r,i)=>(
          <div key={i} className="theme-card reference-card card-hover" style={{background:"linear-gradient(145deg,#090e16,#0d1420)",border:"1px solid rgba(0,245,196,.1)",borderRadius:12,padding:"28px 24px",animation:`fadeUp .5s ease ${i*.1}s both`,cursor:"none"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(0,245,196,.3)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(0,245,196,.1)";}}>
            <div style={{fontSize:44,color:"rgba(0,245,196,.12)",fontFamily:"Georgia,serif",lineHeight:1,marginBottom:12}}>&ldquo;</div>
            <p style={{fontSize:14,color:"#7a8a9a",lineHeight:1.85,marginBottom:22,fontStyle:"italic"}}>{r.quote}</p>
            <div style={{display:"flex",alignItems:"center",gap:14,paddingTop:16,borderTop:"1px solid rgba(0,245,196,.07)"}}>
              <div style={{width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,#00f5c4,#5b9cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Orbitron',monospace",fontSize:12,fontWeight:700,color:"#06090f",flexShrink:0,boxShadow:"0 0 15px rgba(0,245,196,.25)"}}>{r.avatar}</div>
              <div>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:10,fontWeight:700,color:"#c0ccd8"}}>{r.name}</div>
                <div style={{fontSize:11,color:"#3a4a5a",marginTop:3}}>{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageContact() {
  const [form,setForm]=useState({name:"",email:"",subject:"",msg:""});
  const [sent,setSent]=useState(false);
  const handle=(k,v)=>setForm(f=>({...f,[k]:v}));
  const submit=()=>{if(form.name&&form.email&&form.msg)setSent(true);};
  return(
    <div className="page-shell" style={{padding:"52px 52px 64px",animation:"fadeUp .5s ease both"}}>
      <SH title="Contact" sub="Hablemos sobre tu próximo proyecto"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:24,maxWidth:880}}>
        <div className="theme-card contact-card" style={{background:"linear-gradient(145deg,#090e16,#0d1420)",border:"1px solid rgba(0,245,196,.12)",borderRadius:12,padding:"28px 28px"}}>
          {sent?(
            <div style={{textAlign:"center",padding:"44px 0"}}>
              <div style={{fontSize:52,marginBottom:16,animation:"floatY 2s ease-in-out infinite"}}>✅</div>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:13,color:"#00f5c4",marginBottom:10}}>Mensaje enviado</div>
              <p style={{fontSize:13,color:"#5a6a7a",marginBottom:24}}>Gracias, te responderé pronto.</p>
              <button className="btn-ghost" style={{fontSize:9,padding:"8px 18px"}} onClick={()=>{setSent(false);setForm({name:"",email:"",subject:"",msg:""});}}>Nuevo mensaje</button>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:10,fontWeight:700,letterSpacing:3,color:"#00f5c4",textTransform:"uppercase",marginBottom:6}}>Envíame un mensaje</div>
              <input placeholder="Nombre" value={form.name} onChange={e=>handle("name",e.target.value)}/>
              <input placeholder="Email" type="email" value={form.email} onChange={e=>handle("email",e.target.value)}/>
              <input placeholder="Asunto" value={form.subject} onChange={e=>handle("subject",e.target.value)}/>
              <textarea placeholder="Mensaje..." value={form.msg} onChange={e=>handle("msg",e.target.value)} rows={5} style={{resize:"vertical"}}/>
              <button className="btn-primary" style={{marginTop:4}} onClick={submit}>Enviar mensaje</button>
            </div>
          )}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:18}}>
          <div className="theme-card contact-info-card" style={{background:"linear-gradient(145deg,#090e16,#0d1420)",border:"1px solid rgba(0,245,196,.1)",borderRadius:12,padding:"24px 26px"}}>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:10,fontWeight:700,letterSpacing:3,color:"#00f5c4",textTransform:"uppercase",marginBottom:16}}>Info de contacto</div>
            {[["📍","Ubicación","Medellín, Colombia"],["✉️","Email","juandague@email.com"],["💼","Disponible","Proyectos freelance abiertos"]].map(([ico,k,v])=>(
              <div key={k} style={{display:"flex",gap:12,marginBottom:14,alignItems:"flex-start"}}>
                <span style={{fontSize:16,flexShrink:0}}>{ico}</span>
                <div><div style={{fontSize:9,color:"#3a4a5a",letterSpacing:1.5,textTransform:"uppercase",marginBottom:2}}>{k}</div><div style={{fontSize:14,color:"#c0ccd8"}}>{v}</div></div>
              </div>
            ))}
          </div>
          <div className="theme-card contact-social-card" style={{background:"linear-gradient(145deg,#090e16,#0d1420)",border:"1px solid rgba(0,245,196,.1)",borderRadius:12,padding:"22px 24px"}}>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:10,fontWeight:700,letterSpacing:3,color:"#00f5c4",textTransform:"uppercase",marginBottom:14}}>Redes Sociales</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {SOCIALS.map(s=>(
                <a key={s.id} href={s.href} target="_blank" rel="noreferrer"
                  style={{display:"flex",alignItems:"center",gap:12,padding:"9px 14px",borderRadius:7,border:"1px solid rgba(255,255,255,.05)",background:"rgba(0,0,0,.2)",textDecoration:"none",color:"#5a6a7a",transition:"all .22s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=`${s.color}55`;e.currentTarget.style.color=s.color;e.currentTarget.style.background=`${s.color}10`;e.currentTarget.style.transform="translateX(4px)";e.currentTarget.style.boxShadow=`0 4px 20px ${s.color}18`;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.05)";e.currentTarget.style.color="#5a6a7a";e.currentTarget.style.background="rgba(0,0,0,.2)";e.currentTarget.style.transform="translateX(0)";e.currentTarget.style.boxShadow="none";}}>
                  <span style={{display:"flex",alignItems:"center",flexShrink:0}}><s.Ico/></span>
                  <span style={{fontFamily:"'Orbitron',monospace",fontSize:9,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase"}}>{s.label}</span>
                  <span style={{marginLeft:"auto",fontSize:12,opacity:.3}}>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
