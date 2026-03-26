// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Navbar border on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  navbar.style.borderBottomColor = window.scrollY > 50
    ? 'rgba(0, 0, 0, 0.06)'
    : 'transparent';
});

// Intersection Observer for reveal animations
const revealElements = document.querySelectorAll('.work-card, .service-row');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

// SVG draw-on-scroll animations for doodles
const doodleTargets = document.querySelectorAll(
  '.doodle-circle, .doodle-underline, .hero-arrow, .doodle-arrow-down'
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

// Parallax sticky notes on scroll
const stickyHero = document.querySelector('.sticky-note--hero');

if (stickyHero) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY * 0.08;
    stickyHero.style.transform = `rotate(3deg) translateY(${-y}px)`;
  }, { passive: true });
}
