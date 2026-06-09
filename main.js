/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;

document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  cursor.style.left=mx+'px'; cursor.style.top=my+'px';
});
(function loopRing(){
  rx+=(mx-rx)*0.1; ry+=(my-ry)*0.1;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(loopRing);
})();
document.querySelectorAll('a,button,.pcard,.sk-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cursor.style.width='14px'; cursor.style.height='14px';
    ring.style.width='44px'; ring.style.height='44px'; ring.style.opacity='.7';
  });
  el.addEventListener('mouseleave',()=>{
    cursor.style.width='8px'; cursor.style.height='8px';
    ring.style.width='30px'; ring.style.height='30px'; ring.style.opacity='1';
  });
});

/* ── Particle Canvas ── */
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');
function resize(){ canvas.width=innerWidth; canvas.height=innerHeight; }
resize(); window.addEventListener('resize',resize);
const N=55;
const pts=Array.from({length:N},()=>({
  x:Math.random()*innerWidth, y:Math.random()*innerHeight,
  vx:(Math.random()-.5)*.28, vy:(Math.random()-.5)*.28,
  r:Math.random()*1.4+.4
}));
(function drawPts(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  pts.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>canvas.width) p.vx*=-1;
    if(p.y<0||p.y>canvas.height) p.vy*=-1;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(0,229,255,.55)'; ctx.fill();
  });
  for(let i=0;i<N;i++) for(let j=i+1;j<N;j++){
    const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
    const d=Math.sqrt(dx*dx+dy*dy);
    if(d<110){
      ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
      ctx.strokeStyle=`rgba(0,229,255,${.07*(1-d/110)})`; ctx.lineWidth=.5; ctx.stroke();
    }
  }
  requestAnimationFrame(drawPts);
})();

/* ── Terminal Typewriter ── */
const phrases=['./run_tests.sh','git push origin main','postman --test api','jira update --status done','n8n start workflow','playwright test --all'];
let pi=0,ci=0,del=false;
const tel=document.getElementById('terminal-text');
function type(){
  const word=phrases[pi];
  if(!del){
    tel.textContent=word.slice(0,++ci);
    if(ci===word.length){ del=true; setTimeout(type,1800); return; }
  } else {
    tel.textContent=word.slice(0,--ci);
    if(ci===0){ del=false; pi=(pi+1)%phrases.length; setTimeout(type,400); return; }
  }
  setTimeout(type,del?45:80);
}
setTimeout(type,1200);

/* ── Scroll Reveal ── */
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

/* ── Nav Scroll Shadow ── */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{
  nav.style.borderBottomColor=scrollY>40?'rgba(28,28,48,.8)':'rgba(28,28,48,.4)';
});

/* ── Mobile Nav ── */
const toggle   = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click',()=> navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=> a.addEventListener('click',()=> navLinks.classList.remove('open')));
