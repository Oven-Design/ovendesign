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
    ? 'rgba(43, 30, 13, 0.08)'
    : 'transparent';
}, { passive: true });

// Page load trigger
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    document.body.classList.add('loaded');
  });
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

// SVG draw-on-scroll for doodles
const doodleTargets = document.querySelectorAll(
  '.doodle-circle, .doodle-underline-standalone, .doodle-arrow-down, .doodle-arrow-right'
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

// Scroll-reveal text (word by word)
const textRevealBlocks = document.querySelectorAll('.text-reveal-scroll');

textRevealBlocks.forEach((block) => {
  const text = block.textContent.trim();
  block.textContent = '';
  text.split(/\s+/).forEach((word) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = word + ' ';
    block.appendChild(span);
  });
});

function updateTextReveal() {
  textRevealBlocks.forEach((block) => {
    const rect = block.getBoundingClientRect();
    const words = block.querySelectorAll('.word');
    const viewH = window.innerHeight;

    // Start activating when block enters bottom 80%, finish at 30%
    const progress = 1 - (rect.top - viewH * 0.3) / (viewH * 0.5);
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const activeCount = Math.floor(clampedProgress * words.length);

    words.forEach((word, i) => {
      word.classList.toggle('active', i < activeCount);
    });
  });
}

window.addEventListener('scroll', updateTextReveal, { passive: true });
updateTextReveal();

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
    // Smooth follow with lerp
    currentX += (cursorX - currentX) * 0.15;
    currentY += (cursorY - currentY) * 0.15;
    cursor.style.left = currentX + 'px';
    cursor.style.top = currentY + 'px';
    cursorLabel.style.left = currentX + 'px';
    cursorLabel.style.top = currentY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover scaling on interactive elements
  document.querySelectorAll('[data-hover], .nav-links a, .logo').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });

  // "View" label on work cards
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

// Parallax sticky notes
const stickyHero = document.querySelector('.sticky-note--hero');

if (stickyHero) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY * 0.08;
    stickyHero.style.transform = `rotate(3deg) translateY(${-y}px)`;
  }, { passive: true });
}
