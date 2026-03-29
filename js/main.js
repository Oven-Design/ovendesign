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
