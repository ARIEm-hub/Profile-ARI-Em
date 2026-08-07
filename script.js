
const images = ['avatar1.png','avatar2.png','avatar3.png','avatar4.png','avatar5.png'];
let index = 0;
const mainPortrait = document.getElementById('mainPortrait');
const currentIndex = document.getElementById('currentIndex');
const dots = document.getElementById('dots');

function setImage(i){
  index = (i + images.length) % images.length;
  mainPortrait.style.opacity = '0';
  setTimeout(()=>{ mainPortrait.src = images[index]; mainPortrait.style.opacity = '1'; },150);
  currentIndex.textContent = String(index+1).padStart(2,'0');
  [...dots.children].forEach((d,n)=>d.classList.toggle('active', n===index));
}
images.forEach((_,i)=>{ const b=document.createElement('button'); b.setAttribute('aria-label',`Фото ${i+1}`); b.onclick=()=>setImage(i); dots.appendChild(b); });
setImage(0);
document.getElementById('prevBtn').onclick=()=>setImage(index-1);
document.getElementById('nextBtn').onclick=()=>setImage(index+1);

let sx=0;
const pf=document.getElementById('portraitFrame');
pf.addEventListener('touchstart',e=>sx=e.changedTouches[0].clientX,{passive:true});
pf.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>45)setImage(index+(dx<0?1:-1));},{passive:true});

// Gallery lightbox
const lb=document.getElementById('lightbox'), lbImg=document.getElementById('lightboxImg');
function openLB(i){ index=(i+images.length)%images.length; lbImg.src=images[index]; lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); }
function closeLB(){lb.classList.remove('open');lb.setAttribute('aria-hidden','true')}
document.querySelectorAll('#thumbGrid button').forEach(b=>b.addEventListener('click',()=>openLB(+b.dataset.index)));
document.getElementById('closeLightbox').onclick=closeLB;
document.getElementById('lbPrev').onclick=()=>openLB(index-1);
document.getElementById('lbNext').onclick=()=>openLB(index+1);
lb.addEventListener('click',e=>{if(e.target===lb)closeLB()});
document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')closeLB();if(e.key==='ArrowLeft')openLB(index-1);if(e.key==='ArrowRight')openLB(index+1)});

// Loader
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader').classList.add('hide'),2050));

// Cursor
const dot=document.getElementById('cursorDot'), ring=document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});
function cursorLoop(){rx+=(mx-rx)*.17;ry+=(my-ry)*.17;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(cursorLoop)}cursorLoop();
document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('hover'));el.addEventListener('mouseleave',()=>ring.classList.remove('hover'))});

// Snow particles
const canvas=document.getElementById('snow'),ctx=canvas.getContext('2d');let flakes=[];
function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);const count=Math.min(115,Math.floor(innerWidth/11));flakes=Array.from({length:count},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.8+.45,v:Math.random()*.55+.18,w:Math.random()*.45-.22,a:Math.random()*.42+.16}));}
function snow(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const f of flakes){f.y+=f.v;f.x+=f.w+Math.sin(f.y*.008)*.12;if(f.y>innerHeight+5){f.y=-5;f.x=Math.random()*innerWidth}if(f.x<0)f.x=innerWidth;if(f.x>innerWidth)f.x=0;ctx.beginPath();ctx.fillStyle=`rgba(236,224,255,${f.a})`;ctx.arc(f.x,f.y,f.r,0,Math.PI*2);ctx.fill()}requestAnimationFrame(snow)}
addEventListener('resize',resize);resize();snow();

// Reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
