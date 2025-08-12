/* Theme: respect system + persist */
(function initTheme() {
  const stored = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = stored ? stored === 'dark' : systemPrefersDark;
  document.documentElement.classList.toggle('dark', isDark);
})();

window.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Update copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      // Thumb icon swap
      const thumb = toggle.querySelector('.theme-thumb');
      if (thumb) thumb.textContent = isDark ? '🌙' : '☀️';
    });
  }

  // Easter egg
  const egg = document.getElementById('egg');
  if (egg) {
    egg.addEventListener('click', () => {
      const msg = document.createElement('div');
      msg.textContent = '☕ Brewing... enjoy your day!';
      msg.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 rounded-xl border border-white/30 dark:border-white/10 bg-white/90 dark:bg-ink-900/90 backdrop-blur px-4 py-2 shadow-glass z-50';
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 2200);
    });
  }

  // GSAP + ScrollTrigger
  const gsapReady = typeof gsap !== 'undefined';
  if (gsapReady && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero fade-up
    gsap.from('#hero h1, #hero p, #hero a', {
      y: 16,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.08,
    });

    // Cards reveal
    gsap.utils.toArray('#projects article').forEach((el) => {
      gsap.from(el, {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });
  }

  // Lenis smooth scroll
  try {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.1,
      smoothTouch: false,
    });
    if (prefersReducedMotion) lenis.destroy();
  } catch (e) { /* noop */ }

  // Parallax on scroll
  const parallaxEls = document.querySelectorAll('.parallax');
  if (parallaxEls.length && !prefersReducedMotion) {
    window.addEventListener('scroll', () => {
      const sc = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.08');
        el.style.transform = `translate3d(0, ${sc * speed}px, 0)`;
      });
    }, { passive: true });
  }

  // Tilt on hover for project cards
  document.querySelectorAll('#projects article').forEach((card) => {
    let bounds = card.getBoundingClientRect();
    const handleMove = (e) => {
      const x = (e.clientX - bounds.left) / bounds.width - 0.5;
      const y = (e.clientY - bounds.top) / bounds.height - 0.5;
      const rotateX = (y * -8).toFixed(2);
      const rotateY = (x * 10).toFixed(2);
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const reset = () => { card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)'; };
    card.addEventListener('mouseenter', () => { bounds = card.getBoundingClientRect(); });
    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', reset);
  });

  // Before/after slider control
  document.querySelectorAll('.ba-slider').forEach((slider) => {
    const container = slider.closest('article');
    const afterImg = container?.querySelector('.project-after');
    const clip = (value) => { if (afterImg) afterImg.style.clipPath = `inset(0 ${100 - value}% 0 0)`; };
    clip(parseInt(slider.value, 10));
    slider.addEventListener('input', (e) => clip(parseInt(e.target.value, 10)));
  });

  // Swiper testimonials
  try {
    new Swiper('.swiper', {
      spaceBetween: 24,
      autoHeight: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      keyboard: { enabled: true },
    });
  } catch (e) { /* noop */ }

  // Chart.js skills chart
  try {
    const ctx = document.getElementById('skillsChart');
    if (ctx) {
      const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, 'rgba(125, 211, 252, 0.6)');
      gradient.addColorStop(1, 'rgba(125, 211, 252, 0.1)');
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['React', 'Design Systems', 'Performance', 'Accessibility', 'Animations', 'Backend'],
          datasets: [{
            label: 'Proficiency',
            data: [90, 85, 88, 82, 86, 70],
            fill: true,
            backgroundColor: gradient,
            borderColor: 'rgba(125, 211, 252, 0.85)',
            pointBackgroundColor: 'rgba(255,255,255,0.9)',
            pointBorderColor: 'rgba(0,0,0,0.1)'
          }]
        },
        options: {
          scales: { r: { grid: { color: 'rgba(0,0,0,0.08)' }, angleLines: { color: 'rgba(0,0,0,0.08)' }, pointLabels: { color: 'inherit', font: { family: 'Inter' } }, suggestedMin: 0, suggestedMax: 100 } },
          plugins: { legend: { display: false } },
        }
      });
    }
  } catch (e) { /* noop */ }

  // Contact form: fallback to mailto
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = encodeURIComponent(data.get('name'));
      const email = encodeURIComponent(data.get('email'));
      const message = encodeURIComponent(data.get('message'));
      window.location.href = `mailto:hello@example.com?subject=Portfolio%20inquiry%20from%20${name}&body=${message}%0A%0Afrom:%20${email}`;
    });
  }
});