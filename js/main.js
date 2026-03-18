// ===== Custom Cursor =====
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

(function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
})();

document.querySelectorAll('a, button, .project-card, .skill-list li').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('is-hover');
    follower.classList.add('is-hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-hover');
    follower.classList.remove('is-hover');
  });
});

// ===== Hero Canvas =====
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

class Particle {
  constructor() { this.reset(); }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.25;
    this.speedY = (Math.random() - 0.5) * 0.25;
    this.opacity = Math.random() * 0.25 + 0.05;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(26, 26, 26, ${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = Array.from({ length: 70 }, () => new Particle());
}

let heroMX = 0, heroMY = 0;

document.getElementById('hero').addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  heroMX = e.clientX - rect.left;
  heroMY = e.clientY - rect.top;

  particles.forEach(p => {
    const dx = p.x - heroMX;
    const dy = p.y - heroMY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 90 && dist > 0) {
      p.x += (dx / dist) * 1.8;
      p.y += (dy / dist) * 1.8;
    }
  });
});

(function drawFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 110) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(26, 26, 26, ${0.06 * (1 - dist / 110)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawFrame);
})();

resizeCanvas();
initParticles();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

// ===== Scroll Animations =====
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-animate]').forEach((el, i) => {
  animObserver.observe(el);
});

// Stagger project cards
document.querySelectorAll('.project-card[data-animate]').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.12}s`;
});

// ===== Mobile Nav Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const [span1, span2] = navToggle.querySelectorAll('span');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('active');
  span1.style.transform = open ? 'translateY(3.5px) rotate(45deg)' : '';
  span2.style.transform = open ? 'translateY(-3.5px) rotate(-45deg)' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    span1.style.transform = '';
    span2.style.transform = '';
  });
});

// ===== Active Nav on Scroll =====
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = '#' + entry.target.id;
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => navObserver.observe(s));
