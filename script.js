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

// BACK TO TOP FIX: #home points to the hero section, below the header.
// Scroll to document position 0 instead so the header is fully visible.
document.querySelectorAll('.floating-top, .back-inline').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });
});

// DOWNLOAD POPUP: clicking any KROWL-Setup.exe link starts the download
// and shows a "KROWL is downloading" popup with a Support KROWL button.
const downloadModal = document.getElementById('download-modal');
if (downloadModal && typeof downloadModal.showModal === 'function') {
  const closeDownloadModal = () => downloadModal.close();
  document.querySelectorAll('a[href$="KROWL-Setup.exe"]:not(.download-modal-retry)').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      if (!downloadModal.open) downloadModal.showModal();
      window.location.href = link.href; // starts the download; page stays put
    });
  });
  downloadModal.querySelector('.download-modal-close').addEventListener('click', closeDownloadModal);
  // Clicking the dark area outside the popup closes it
  downloadModal.addEventListener('click', event => { if (event.target === downloadModal) closeDownloadModal(); });
}

// ACTIVE NAV LINK: highlight the menu item for the section currently on screen.
const navSectionLinks = [...navigation.querySelectorAll('a[href^="#"]')]
  .map(link => ({ link, section: document.querySelector(link.getAttribute('href')) }))
  .filter(item => item.section);
function updateActiveNav() {
  let current = navSectionLinks[0];
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) current = navSectionLinks[navSectionLinks.length - 1];
  else navSectionLinks.forEach(item => { if (item.section.getBoundingClientRect().top <= 140) current = item; });
  navSectionLinks.forEach(item => item.link.classList.toggle('active', item === current));
}
window.addEventListener('scroll', updateActiveNav, {passive:true});
window.addEventListener('resize', updateActiveNav);
updateActiveNav();
