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
    ? 'rgba(26, 18, 7, 0.08)'
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
