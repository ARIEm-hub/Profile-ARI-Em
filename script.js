(() => {
  const body = document.body;
  const loader = document.getElementById('loader');
  const bar = document.getElementById('loaderBar');
  const percent = document.getElementById('loaderPercent');
  const topbar = document.getElementById('topbar');

  body.classList.add('locked');
  let value = 0;
  const timer = setInterval(() => {
    const step = value < 55 ? Math.random() * 11 + 5 : Math.random() * 6 + 2;
    value = Math.min(100, value + step);
    const rounded = Math.floor(value);
    bar.style.width = `${rounded}%`;
    percent.textContent = String(rounded).padStart(2, '0');
    if (value >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        loader.classList.add('hide');
        body.classList.remove('locked');
        document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('show'));
      }, 430);
    }
  }, 120);

  window.addEventListener('scroll', () => {
    topbar.classList.toggle('scrolled', window.scrollY > 36);
  }, { passive: true });

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal:not(.hero .reveal)').forEach(el => io.observe(el));

  // subtle hero-photo depth
  const heroFrame = document.getElementById('heroFrame');
  if (heroFrame && matchMedia('(pointer:fine)').matches) {
    heroFrame.addEventListener('mousemove', e => {
      const r = heroFrame.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      heroFrame.style.transform = `perspective(1100px) rotateY(${x * 2.2}deg) rotateX(${-y * 2.2}deg)`;
    });
    heroFrame.addEventListener('mouseleave', () => heroFrame.style.transform = '');
  }

  // cursor
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  let mx = 0, my = 0, cx = 0, cy = 0;
  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursorDot.style.left = `${mx}px`; cursorDot.style.top = `${my}px`;
  });
  const tick = () => {
    cx += (mx - cx) * .15; cy += (my - cy) * .15;
    cursor.style.left = `${cx}px`; cursor.style.top = `${cy}px`;
    requestAnimationFrame(tick);
  };
  tick();
  document.querySelectorAll('a,button,.photo-frame').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hot'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hot'));
  });

  // lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const galleryItems = [...document.querySelectorAll('.gallery-item')];
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    body.classList.remove('locked');
    setTimeout(() => lightboxImage.removeAttribute('src'), 320);
  };
  galleryItems.forEach((item, i) => item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.src;
    lightboxCounter.textContent = `${String(i + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')}`;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    body.classList.add('locked');
  }));
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // simple anti-drag for presentation
  document.addEventListener('dragstart', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });
})();
