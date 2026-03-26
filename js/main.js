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
    ? 'rgba(0, 0, 0, 0.06)'
    : 'transparent';
}, { passive: true });

// Page load
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => document.body.classList.add('loaded'));
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.work-card, .service');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
);

revealEls.forEach((el) => observer.observe(el));
