// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// Navbar border on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  navbar.style.borderBottomColor = window.scrollY > 50
    ? 'rgba(43, 30, 13, 0.06)'
    : 'transparent';
}, { passive: true });

// Page load
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => document.body.classList.add('loaded'));
});

// Reveal on scroll
const revealEls = document.querySelectorAll(
  '.process-card, .work-card, .service-card'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
);

revealEls.forEach((el) => revealObserver.observe(el));

// SVG draw-on-scroll
const doodleTargets = document.querySelectorAll(
  '.doodle-underline-standalone, .doodle-arrow-down, .doodle-arrow-right'
);

const doodleObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('drawn');
        doodleObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

doodleTargets.forEach((el) => doodleObserver.observe(el));

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorLabel = document.querySelector('.cursor-label');
let cursorX = 0, cursorY = 0;
let currentX = 0, currentY = 0;

if (cursor && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  function animateCursor() {
    currentX += (cursorX - currentX) * 0.15;
    currentY += (cursorY - currentY) * 0.15;
    cursor.style.left = currentX + 'px';
    cursor.style.top = currentY + 'px';
    cursorLabel.style.left = currentX + 'px';
    cursorLabel.style.top = currentY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover state
  document.querySelectorAll('[data-hover], .nav-links a, .logo, .faq-item summary').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });

  // Work card "View" label
  document.querySelectorAll('[data-cursor-label]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor--label');
      cursorLabel.classList.add('visible');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor--label');
      cursorLabel.classList.remove('visible');
    });
  });
}
