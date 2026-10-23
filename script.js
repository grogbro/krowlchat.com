// Mobile navigation
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const expanded = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
// Placeholder links: prevents the page jumping to the top until real URLs are added.
document.querySelectorAll('[data-placeholder]').forEach(link => link.addEventListener('click', event => {
  if (link.getAttribute('href') === '#') event.preventDefault();
}));

// BACK TO TOP: Show a small floating link after the visitor scrolls down.
const backToTop = document.querySelector('.floating-top');
function updateBackToTop() { backToTop.classList.toggle('visible', window.scrollY > 380); }
window.addEventListener('scroll', updateBackToTop, {passive:true});
updateBackToTop();
