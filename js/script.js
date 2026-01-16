const openBtn = document.querySelector('.nav__toggle--open');
const closeBtn = document.querySelector('.nav__toggle--close');
const mobileNav = document.querySelector('.mobile__nav');

/* OPEN menu */
openBtn.addEventListener('click', () => {
  mobileNav.classList.add('open');
  openBtn.setAttribute('aria-expanded', 'true');
});

/* CLOSE menu */
closeBtn.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  openBtn.setAttribute('aria-expanded', 'false');
});

/* DROPDOWNS (scalable) */
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const parent = toggle.closest('.has-dropdown');
    const open = parent.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
});