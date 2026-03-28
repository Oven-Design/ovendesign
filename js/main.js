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
let isScrolled = false;

window.addEventListener('scroll', () => {
  const shouldBeScrolled = window.scrollY > 50;
  if (shouldBeScrolled !== isScrolled) {
    isScrolled = shouldBeScrolled;
    navbar.classList.toggle('scrolled', isScrolled);
  }
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
