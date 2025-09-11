// Yıl
document.getElementById('y').textContent = new Date().getFullYear();

// Parallax (mouse ile arka planı hafif oynat)
(() => {
  const bg = document.getElementById('bg');
  let tx=0, ty=0, cx=0, cy=0, raf=null;
  function move(e){
    const x = (e.clientX / innerWidth - .5) * 10; // ±10px
    const y = (e.clientY / innerHeight - .5) * 10;
    tx=x; ty=y; if(!raf) raf=requestAnimationFrame(apply);
  }
  function apply(){ cx += (tx-cx)*.08; cy += (ty-cy)*.08; bg.style.transform = `translate3d(${cx}px, ${cy}px, 0)`; raf=null; }
  addEventListener('mousemove', move, {passive:true});
})();

// --- Galeriler (her biri bağımsız) ---
// İnternetten örnek 2 görsel; istersen kendi URL’lerinle değiştirebilirsin.
const GALLERIES = {
  abbruch: {
    title: "Abbruch – Galerie",
    images: [
      "https://images.unsplash.com/photo-1604014237800-1c9102b1e3f1?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop"
    ]
  },
  reinigung: {
    title: "Gebäudereinigung – Galerie",
    images: [
      "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?q=80&w=1600&auto=format&fit=crop"
    ]
  },
  garten: {
    title: "Gartenarbeiten – Galerie",
    images: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469536526925-9b5547cd7ef2?q=80&w=1600&auto=format&fit=crop"
    ]
  }
};

// Modal referansları
const modal = document.getElementById('galleryModal');
const grid  = document.getElementById('galleryGrid');
const title = document.getElementById('galleryTitle');

// Kartlara tıklayınca ilgili galeriyi yükle
document.querySelectorAll('.card[data-gallery]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const key = btn.getAttribute('data-gallery');
    const gal = GALLERIES[key];
    if(!gal) return;

    title.textContent = gal.title;
    grid.innerHTML = '';
    gal.images.forEach((src,i)=>{
      const img = new Image();
      img.loading = 'lazy';
      img.alt = `${gal.title} Bild ${i+1}`;
      img.src = src;
      grid.appendChild(img);
    });

    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // arka plan kaymasın
  });
});

// Kapatma (arka plana veya X’e basınca, ESC ile)
modal.addEventListener('click', e=>{
  if(e.target.hasAttribute('data-close') || e.target === modal){
    closeModal();
  }
});
addEventListener('keydown', e=>{ if(e.key === 'Escape' && modal.classList.contains('show')) closeModal(); });

function closeModal(){
  modal.classList.remove('show');
  document.body.style.overflow = '';
}
