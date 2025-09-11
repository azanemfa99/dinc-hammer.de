// year
document.getElementById('y').textContent = new Date().getFullYear();

// quick actions
document.querySelectorAll('[data-call]').forEach(b=>b.addEventListener('click',()=>location.href='tel:+4917662442952'));
document.querySelectorAll('[data-wa]').forEach(b=>b.addEventListener('click',()=>window.open('https://wa.me/4917662442952','_blank')));

// parallax tilt for cards
const cards = document.querySelectorAll('.card');
cards.forEach(card=>{
  card.addEventListener('mousemove', e=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - .5;
    const y = (e.clientY - r.top)/r.height - .5;
    card.style.transform = `translateY(-2px) rotateX(${(-y*6).toFixed(2)}deg) rotateY(${(x*6).toFixed(2)}deg)`;
  });
  card.addEventListener('mouseleave', ()=> card.style.transform = '');
});

// minimal particle field
(() =>{
  const c = document.getElementById('bg-particles');
  const ctx = c.getContext('2d');
  let w,h,pr,pts=[]; const N=120;
  function resize(){
    pr = window.devicePixelRatio || 1;
    w = c.width = innerWidth*pr;
    h = c.height = innerHeight*pr;
    c.style.width = innerWidth+'px';
    c.style.height = innerHeight+'px';
    pts = Array.from({length:N},()=>({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-.5)*0.15*pr, vy: (Math.random()-.5)*0.15*pr
    }));
  }
  function step(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = 'rgba(154,198,255,.9)';
    pts.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>w) p.vx*=-1;
      if(p.y<0||p.y>h) p.vy*=-1;
      ctx.globalAlpha=.35; ctx.fillRect(p.x, p.y, 1.2*pr, 1.2*pr);
    });
    // light links
    ctx.globalAlpha=.08; ctx.strokeStyle='#9ecbff';
    for(let i=0;i<N;i++){
      for(let j=i+1;j<N;j++){
        const a=pts[i], b=pts[j];
        const dx=a.x-b.x, dy=a.y-b.y; const d=dx*dx+dy*dy;
        if(d< (140*pr)*(140*pr)){ ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
      }
    }
    requestAnimationFrame(step);
  }
  addEventListener('resize', resize, {passive:true});
  resize(); step();
})();
