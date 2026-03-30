/* ===== Theme Toggle ===== */
const themeToggle = document.querySelector('.theme-toggle');

function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'light' ? '\u2600' : '\u263E';
}

applyTheme(getPreferredTheme());

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

/* ===== Mobile Nav ===== */
const navToggle = document.querySelector('.nav-toggle');
const navMobile = document.querySelector('.nav-mobile');

if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navMobile.addEventListener('click', (e) => {
    if (e.target.matches('a')) {
      navMobile.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMobile.classList.contains('active')) {
      navMobile.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });
}
