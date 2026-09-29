(function () {
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');

  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 20); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('ul a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function (el) { io.observe(el); });
})();
