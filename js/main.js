// Nav toggle
const toggle = document.querySelector('.nav-toggle');
const navRight = document.querySelector('.nav-right');

toggle.addEventListener('click', () => navRight.classList.toggle('active'));

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navRight.classList.remove('active'));
});

// Page load reveal
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => document.body.classList.add('loaded'));
});
