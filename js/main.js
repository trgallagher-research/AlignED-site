// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }

  // Close nav when clicking outside
  document.addEventListener('click', function(e) {
    if (nav && nav.classList.contains('active') &&
        !nav.contains(e.target) &&
        !navToggle.contains(e.target)) {
      nav.classList.remove('active');
    }
  });

  // Set active nav link based on current page
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.endsWith(href) ||
        (href !== 'index.html' && currentPath.includes(href.replace('.html', '').replace('/', '')))) {
      link.classList.add('active');
    }
  });
});
