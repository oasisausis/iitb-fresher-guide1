
const nav = document.querySelector('.site-nav');
const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');

const syncNav = () => nav?.classList.toggle('scrolled', window.scrollY > 12);
syncNav();
window.addEventListener('scroll', syncNav, { passive: true });

menu?.addEventListener('click', () => {
  const open = links?.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(Boolean(open)));
});

links?.addEventListener('click', event => {
  if (event.target.closest('a')) {
    links.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(node => observer.observe(node));

document.querySelectorAll('[data-tabs]').forEach(group => {
  const buttons = [...group.querySelectorAll('[data-tab]')];
  const targetSelector = group.dataset.tabs;
  const panels = [...document.querySelectorAll(targetSelector)];

  function activate(id, updateHash = true) {
    buttons.forEach(button => button.classList.toggle('active', button.dataset.tab === id));
    panels.forEach(panel => panel.classList.toggle('active', panel.id === id));
    if (updateHash) history.replaceState(null, '', `#${id}`);
  }

  buttons.forEach(button => button.addEventListener('click', () => activate(button.dataset.tab)));
  const requested = location.hash.slice(1);
  const initial = panels.some(panel => panel.id === requested) ? requested : buttons[0]?.dataset.tab;
  if (initial) activate(initial, false);
});
