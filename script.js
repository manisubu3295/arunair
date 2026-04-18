/* ═══════════════════════════════════════
   ARUN AIR TRAVELS — Interactions
   ═══════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Header scroll shadow ─────────────── */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile hamburger ─────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    mobileNav.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  /* ── Trip type tabs ───────────────────── */
  const tabs = document.querySelectorAll('.trip-tab');
  const returnGroup = document.getElementById('return-date-group');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const type = tab.dataset.tab;
      if (returnGroup) {
        returnGroup.style.display = type === 'return' ? 'flex' : 'none';
      }
    });
  });

  /* ── Search form → WhatsApp redirect ─── */
  const form = document.getElementById('search-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const from  = form.from.value.trim()        || 'Chennai';
      const to    = form.to.value.trim()           || '(destination not specified)';
      const date  = form.departure.value           || '';
      const pax   = form.passengers.value          || '1';
      const phone = form.phone.value.trim();

      const msg = [
        `Hi, I want to enquire about flight tickets.`,
        `From: ${from}`,
        `To: ${to}`,
        date  ? `Date: ${date}` : '',
        `Passengers: ${pax}`,
        phone ? `My number: ${phone}` : '',
        `Please send me the best available fares.`
      ].filter(Boolean).join('\n');

      const waURL = `https://wa.me/918508716957?text=${encodeURIComponent(msg)}`;
      window.open(waURL, '_blank', 'noopener,noreferrer');
    });
  }

  /* ── Scroll-triggered fade-up animations */
  const animEls = document.querySelectorAll(
    '.service-card, .why-card, .how-step, .deal-card, .testi-card'
  );

  animEls.forEach((el, i) => {
    el.classList.add('fade-up');
    const delay = Math.min(i % 4, 3);
    if (delay > 0) el.classList.add(`fade-up-delay-${delay}`);
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  animEls.forEach(el => observer.observe(el));

  /* ── Swap cities button ─────────────────── */
  const swapBtn = document.querySelector('.swap-btn');
  if (swapBtn) {
    swapBtn.addEventListener('click', () => {
      const fromInput = document.getElementById('from-city');
      const toInput   = document.getElementById('to-city');
      const temp = fromInput.value;
      fromInput.value = toInput.value;
      toInput.value = temp;
    });
  }

  /* ── Live searcher counter ───────────────── */
  const liveCountEl = document.getElementById('live-count');
  if (liveCountEl) {
    let count = 47;
    setInterval(() => {
      const delta = Math.floor(Math.random() * 5) - 2;
      count = Math.max(31, Math.min(82, count + delta));
      liveCountEl.textContent = count;
    }, 4000);
  }

  /* ── Set today as min date for date inputs */
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(input => {
    input.setAttribute('min', today);
  });

  /* ── Active nav link highlighting ──────── */
  const sections = document.querySelectorAll('section[id], div[id="enquiry"]');
  const navLinks = document.querySelectorAll('.main-nav a');

  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.style.color = href === `#${id}` ? 'var(--navy)' : '';
            link.style.fontWeight = href === `#${id}` ? '700' : '';
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => navObserver.observe(s));

  /* ── Login form → OTP placeholder ──────── */
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = loginForm.querySelector('.btn-login-submit');
      btn.textContent = 'OTP Sent ✓';
      btn.style.background = 'var(--green)';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Send OTP';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    });
  }

})();
