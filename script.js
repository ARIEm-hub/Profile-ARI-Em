const loader = document.querySelector('#loader');
const bar = document.querySelector('.loader__bar i');
const percent = document.querySelector('.loader__percent');
let p = 0;
const loadTimer = setInterval(() => {
  p += Math.floor(Math.random() * 9) + 3;
  if (p >= 100) p = 100;
  bar.style.width = `${p}%`;
  percent.textContent = `${p}%`;
  if (p === 100) {
    clearInterval(loadTimer);
    setTimeout(() => loader.classList.add('is-done'), 380);
  }
}, 90);

const images = [...document.querySelectorAll('.gallery__image')];
const prev = document.querySelector('.gallery__btn--prev');
const next = document.querySelector('.gallery__btn--next');
const dots = document.querySelector('.gallery__dots');
let current = 0;

images.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Фото ${i + 1}`);
  dot.addEventListener('click', () => show(i));
  dots.appendChild(dot);
});
const dotEls = [...dots.children];
function show(i){
  current = (i + images.length) % images.length;
  images.forEach((img, idx) => img.classList.toggle('is-active', idx === current));
  dotEls.forEach((dot, idx) => dot.classList.toggle('active', idx === current));
}
prev.addEventListener('click', () => show(current - 1));
next.addEventListener('click', () => show(current + 1));
show(0);

let touchStartX = 0;
const frame = document.querySelector('.gallery__frame');
frame.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].clientX, {passive:true});
frame.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 45) show(current + (dx < 0 ? 1 : -1));
}, {passive:true});

const snow = document.querySelector('.snow');
const flakes = ['✦','•','✧','❄'];
for(let i=0;i<42;i++){
  const el=document.createElement('span');
  el.className='flake';
  el.textContent=flakes[Math.floor(Math.random()*flakes.length)];
  el.style.left=`${Math.random()*100}%`;
  el.style.fontSize=`${Math.random()*7+4}px`;
  el.style.opacity=(Math.random()*.5+.2).toFixed(2);
  el.style.animationDuration=`${Math.random()*9+8}s`;
  el.style.animationDelay=`-${Math.random()*14}s`;
  el.style.setProperty('--drift',`${Math.random()*100-50}px`);
  snow.appendChild(el);
}

const dot = document.querySelector('.cursor--dot');
const ring = document.querySelector('.cursor--ring');
let rx=0, ry=0, mx=0, my=0;
window.addEventListener('mousemove', e => {mx=e.clientX;my=e.clientY;dot.style.left=`${mx}px`;dot.style.top=`${my}px`;});
function animateCursor(){rx += (mx-rx)*.17; ry += (my-ry)*.17; ring.style.left=`${rx}px`;ring.style.top=`${ry}px`;requestAnimationFrame(animateCursor)}
animateCursor();
document.querySelectorAll('button,a,.tag-cloud span').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('hover'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('hover'));
});
