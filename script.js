const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.14
});

revealItems.forEach(item => revealObserver.observe(item));

const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxItems = document.querySelectorAll('.lightbox-item');

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt || 'Просмотр работы';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

lightboxItems.forEach(item => {
  item.addEventListener('click', () => {
    const image = item.querySelector('img');
    const src = item.dataset.image || image?.src;
    const alt = image?.alt || '';
    openLightbox(src, alt);
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});

const tiltCards = document.querySelectorAll('.tilt-card');

function applyTilt(card, event) {
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rotateY = ((x / rect.width) - 0.5) * 8;
  const rotateX = ((y / rect.height) - 0.5) * -8;
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (event) => applyTilt(card, event));
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
