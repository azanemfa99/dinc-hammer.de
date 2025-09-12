/* Yıl */
document.getElementById('year').textContent = new Date().getFullYear();

/* Partikül katmanı */
(function particles(){
  const cvs = document.getElementById("fx-particles");
  if(!cvs) return;
  const ctx = cvs.getContext("2d");
  let W, H, dots = [];

  function resize(){
    W = cvs.width  = innerWidth;
    H = cvs.height = innerHeight;
    const count = Math.floor((W*H)/26000);
    dots = new Array(count).fill(0).map(() => ({
      x: Math.random()*W, y: Math.random()*H,
      r: Math.random()*1.6 + .4,
      dx: (Math.random()*.45 - .22),
      dy: (Math.random()*.45 - .22),
      a: Math.random()*.65 + .25
    }));
  }
  addEventListener("resize", resize); resize();

  (function tick(){
    ctx.clearRect(0,0,W,H);
    for(const p of dots){
      p.x += p.dx; p.y += p.dy;
      if(p.x<0 || p.x>W) p.dx *= -1;
      if(p.y<0 || p.y>H) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(90,200,250,${p.a})`;
      ctx.shadowColor = "rgba(90,200,250,.45)";
      ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
    }
    requestAnimationFrame(tick);
  })();
})();

/* Parallax: arka planı fareye hafif oynat */
(() => {
  const bg = document.querySelector('.bg');
  if(!bg) return;
  let tx=0, ty=0, cx=0, cy=0, raf=null;
  function move(e){
    const x = (e.clientX / innerWidth  - .5) * 10;
    const y = (e.clientY / innerHeight - .5) * 10;
    tx=x; ty=y; if(!raf) raf=requestAnimationFrame(apply);
  }
  function apply(){ cx += (tx-cx)*.08; cy += (ty-cy)*.08; bg.style.transform = `translate3d(${cx}px, ${cy}px, 0)`; raf=null; }
  addEventListener('mousemove', move, {passive:true});
})();

/* Toast util (gerekirse) */
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(()=> t.classList.remove('show'), 1800);
}

/* ====== GALERİ SLIDER ====== */
const GALLERIES = {
  abbruch: {
    title: "Abbruch – Galerie",
    images: [
      {src:"https://images.unsplash.com/photo-1604014237800-1c9102b1e3f1?q=80&w=1600&auto=format&fit=crop", cap:"Abbruch – 1/2"},
      {src:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop", cap:"Abbruch – 2/2"}
    ]
  },
  reinigung: {
    title: "Gebäudereinigung – Galerie",
    images: [
      {src:"https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=1600&auto=format&fit=crop", cap:"Reinigung – 1/2"},
      {src:"https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?q=80&w=1600&auto=format&fit=crop", cap:"Reinigung – 2/2"}
    ]
  },
  garten: {
    title: "Gartenarbeiten – Galerie",
    images: [
      {src:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1600&auto=format&fit=crop", cap:"Garten – 1/2"},
      {src:"https://images.unsplash.com/photo-1469536526925-9b5547cd7ef2?q=80&w=1600&auto=format&fit=crop", cap:"Garten – 2/2"}
    ]
  }
};

const modal   = document.getElementById('galleryModal');
const titleEl = document.getElementById('galleryTitle');
const imgEl   = document.getElementById('slideImage');
const capEl   = document.getElementById('slideCaption');
const prevBtn = document.querySelector('.slide-prev');
const nextBtn = document.querySelector('.slide-next');

let active = null; // aktif galeri
let i = 0;        // indeks

function openGallery(key){
  active = GALLERIES[key];
  if(!active) return;
  i = 0;
  titleEl.textContent = active.title;
  setImage(i);
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeGallery(){
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function setImage(idx){
  const item = active.images[idx];
  imgEl.src = item.src;
  imgEl.alt = `${active.title} Bild ${idx+1}`;
  capEl.textContent = item.cap;
}

/* kart tıklamaları */
document.querySelectorAll('.card[data-gallery]').forEach(btn=>{
  btn.addEventListener('click', ()=> openGallery(btn.getAttribute('data-gallery')));
});

/* modal etkileşimleri */
prevBtn.addEventListener('click', ()=> { if(!active) return; i = (i-1+active.images.length)%active.images.length; setImage(i); });
nextBtn.addEventListener('click', ()=> { if(!active) return; i = (i+1)%active.images.length; setImage(i); });

modal.addEventListener('click', (e)=>{
  if(e.target.hasAttribute('data-close') || e.target === modal) closeGallery();
});

addEventListener('keydown', (e)=>{
  if(!modal.classList.contains('show')) return;
  if(e.key === 'Escape') closeGallery();
  if(e.key === 'ArrowLeft')  prevBtn.click();
  if(e.key === 'ArrowRight') nextBtn.click();
});

/* basit swipe */
(()=> {
  let startX=0, isDown=false;
  imgEl.addEventListener('pointerdown', e=>{isDown=true; startX=e.clientX});
  addEventListener('pointerup', e=>{
    if(!isDown){return}
    isDown=false;
    const dx=e.clientX-startX;
    if(Math.abs(dx)<30) return;
    if(dx>0) prevBtn.click(); else nextBtn.click();
  });
})();
