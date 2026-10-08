// FLOCO Certified — standalone export
// Territory map lives in map/market-map.html (loaded in an iframe).

// Placeholder: the "Find a Certified Specialist" search has no backend yet; stop the form from reloading the page.
document.querySelectorAll('form').forEach(function (f) {
  f.addEventListener('submit', function (e) { e.preventDefault(); });
});

// Mobile/tablet menu toggle (the button is hidden on desktop).
(function () {
  var header = document.querySelector('.site-header');
  var toggle = header && header.querySelector('.nav-toggle');
  if (!toggle) return;
  function setOpen(open) {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setOpen(!header.classList.contains('nav-open')); });
  header.querySelectorAll('.nav-links a, .nav-cta a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  window.matchMedia('(min-width: 1200px)').addEventListener('change', function (m) { if (m.matches) setOpen(false); });
})();
