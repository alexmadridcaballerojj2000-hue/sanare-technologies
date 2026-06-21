/**
 * SANARE TECHNOLOGIES — script.js
 * Premium interactive JavaScript
 */

'use strict';

/* ── Utility ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initNavbar();
  initHamburger();
  initParticles();
  initReveal();
  initCounters();
  initTestimonialsCarousel();
  initFAQ();
  initContactForm();
  initBackToTop();
  initActiveNavLinks();
  initSmoothScroll();
  initStatCounters();
  initServiceCards();
});

/* ═══════════════════════════════════════════════
   1. YEAR
═══════════════════════════════════════════════ */
function initYear() {
  const el = $('#year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ═══════════════════════════════════════════════
   2. STICKY NAVBAR
═══════════════════════════════════════════════ */
function initNavbar() {
  const navbar = $('#navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load
}

/* ═══════════════════════════════════════════════
   3. HAMBURGER MENU
═══════════════════════════════════════════════ */
function initHamburger() {
  const btn = $('#hamburger');
  const links = $('#nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    btn.classList.toggle('active', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && links.classList.contains('open')) {
      links.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ═══════════════════════════════════════════════
   4. PARTICLES
═══════════════════════════════════════════════ */
function initParticles() {
  const container = $('#particles');
  if (!container) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const COUNT = window.innerWidth < 768 ? 20 : 50;

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 15 + 8;
    const delay = Math.random() * 10;
    const left = Math.random() * 100;
    const drift = (Math.random() - 0.5) * 200;
    const hue = Math.random() > 0.5 ? '#00D4FF' : '#7C3AED';

    Object.assign(p.style, {
      left: `${left}%`,
      bottom: '-10px',
      width: `${size}px`,
      height: `${size}px`,
      background: hue,
      '--drift': `${drift}px`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      boxShadow: `0 0 ${size * 2}px ${hue}`,
    });

    container.appendChild(p);
  }
}

/* ═══════════════════════════════════════════════
   5. REVEAL ON SCROLL (Intersection Observer)
═══════════════════════════════════════════════ */
function initReveal() {
  const elements = $$('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════
   6. ANIMATED COUNTERS (section counters)
═══════════════════════════════════════════════ */
function initCounters() {
  const counters = $$('.counter-number');
  if (!counters.length) return;

  const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = ease(progress);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString('es-HN') + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString('es-HN') + suffix;
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c => observer.observe(c));
}

/* ═══════════════════════════════════════════════
   7. HERO STAT COUNTERS
═══════════════════════════════════════════════ */
function initStatCounters() {
  const stats = $$('.stat-number');
  if (!stats.length) return;

  const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const animateStat = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2200;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(ease(progress) * target);
      el.textContent = current.toLocaleString('es-HN');
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString('es-HN');
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStat(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach(s => observer.observe(s));
}

/* ═══════════════════════════════════════════════
   8. TESTIMONIALS CAROUSEL
═══════════════════════════════════════════════ */
function initTestimonialsCarousel() {
  const track = $('#testimonials-track');
  const prevBtn = $('#prev-btn');
  const nextBtn = $('#next-btn');
  const dotsContainer = $('#carousel-dots');
  if (!track || !prevBtn || !nextBtn) return;

  const cards = $$('.testimonial-card', track);
  let current = 0;
  let autoplayTimer;

  // Determine cards per view
  const getPerView = () => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  let perView = getPerView();
  const total = cards.length;
  const maxIndex = () => Math.max(0, total - perView);

  // Build dots
  const buildDots = () => {
    dotsContainer.innerHTML = '';
    const numDots = maxIndex() + 1;
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === current ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Ir al testimonio ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  };

  const updateDots = () => {
    $$('.carousel-dot', dotsContainer).forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  };

  const goTo = (index) => {
    current = Math.max(0, Math.min(index, maxIndex()));
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap || '16');
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    updateDots();
  };

  const next = () => goTo(current + 1 > maxIndex() ? 0 : current + 1);
  const prev = () => goTo(current - 1 < 0 ? maxIndex() : current - 1);

  nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });
  prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });

  // Touch/swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next(); else prev();
      resetAutoplay();
    }
  });

  // Autoplay
  const startAutoplay = () => {
    autoplayTimer = setInterval(next, 5000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  // Responsive rebuild
  window.addEventListener('resize', () => {
    perView = getPerView();
    buildDots();
    goTo(0);
  });

  buildDots();
  goTo(0);
  startAutoplay();

  // Pause on hover
  track.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  track.addEventListener('mouseleave', startAutoplay);
}

/* ═══════════════════════════════════════════════
   9. FAQ ACCORDION
═══════════════════════════════════════════════ */
function initFAQ() {
  const items = $$('.faq-item');

  items.forEach(item => {
    const btn = $('.faq-question', item);
    const answer = $('.faq-answer', item);
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all others
      items.forEach(other => {
        const otherBtn = $('.faq-question', other);
        const otherAns = $('.faq-answer', other);
        if (otherBtn && otherAns && other !== item) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAns.hidden = true;
        }
      });

      // Toggle current
      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.hidden = isOpen;
    });
  });
}

/* ═══════════════════════════════════════════════
   10. CONTACT FORM → WHATSAPP
═══════════════════════════════════════════════ */
function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;

  const WHATSAPP_NUMBER = '50492722667';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = $('#name')?.value.trim();
    const phone = $('#phone')?.value.trim();
    const service = $('#service')?.value;
    const description = $('#description')?.value.trim();

    // Simple validation
    if (!name || !phone || !service || !description) {
      showFormError('Por favor completa todos los campos.');
      return;
    }

    // Build message
    const msg = [
      `¡Hola SANARE TECHNOLOGIES! 👋`,
      ``,
      `*📋 Solicitud de Servicio*`,
      ``,
      `👤 *Nombre:* ${name}`,
      `📱 *Teléfono:* ${phone}`,
      `🔧 *Servicio:* ${service}`,
      `📝 *Descripción:*`,
      description,
      ``,
      `⏰ Enviado desde la web — ${new Date().toLocaleDateString('es-HN')}`,
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    // Show success
    showFormSuccess();
    form.reset();
  });
}

function showFormError(message) {
  removeFormMessages();
  const el = document.createElement('div');
  el.className = 'form-message form-error';
  el.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
  el.style.cssText = `
    padding: 0.75rem 1rem;
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.3);
    border-radius: 8px;
    color: #FCA5A5;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: slideDown 0.3s ease;
  `;
  const form = $('#contact-form');
  form?.insertBefore(el, form.querySelector('button[type="submit"]'));
  setTimeout(() => el?.remove(), 4000);
}

function showFormSuccess() {
  removeFormMessages();
  const el = document.createElement('div');
  el.className = 'form-message form-success';
  el.innerHTML = `<i class="fas fa-check-circle"></i> ¡Mensaje preparado! Se abrirá WhatsApp ahora.`;
  el.style.cssText = `
    padding: 0.75rem 1rem;
    background: rgba(74,222,128,0.1);
    border: 1px solid rgba(74,222,128,0.3);
    border-radius: 8px;
    color: #86EFAC;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: slideDown 0.3s ease;
  `;
  const form = $('#contact-form');
  form?.insertBefore(el, form.querySelector('button[type="submit"]'));
  setTimeout(() => el?.remove(), 5000);
}

function removeFormMessages() {
  $$('.form-message').forEach(el => el.remove());
}

/* ═══════════════════════════════════════════════
   11. BACK TO TOP
═══════════════════════════════════════════════ */
function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ═══════════════════════════════════════════════
   12. ACTIVE NAV LINKS (Scrollspy)
═══════════════════════════════════════════════ */
function initActiveNavLinks() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href')?.replace('#', '');
            link.classList.toggle('active', href === id);
          });
        }
      });
    },
    {
      rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) + 10}px 0px -60% 0px`,
      threshold: 0,
    }
  );

  sections.forEach(s => observer.observe(s));
}

/* ═══════════════════════════════════════════════
   13. SMOOTH SCROLL FOR ANCHOR LINKS
═══════════════════════════════════════════════ */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = $(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ═══════════════════════════════════════════════
   14. SERVICE CARDS MOUSE GLOW EFFECT
═══════════════════════════════════════════════ */
function initServiceCards() {
  $$('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPct = (x / rect.width) * 100;
      const yPct = (y / rect.height) * 100;

      const glow = card.querySelector('.card-glow');
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(0,212,255,0.08) 0%, transparent 60%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      const glow = card.querySelector('.card-glow');
      if (glow) glow.style.background = '';
    });

    // Keyboard accessibility
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const cta = card.querySelector('.service-cta');
        if (cta) cta.click();
      }
    });
  });
}

/* ═══════════════════════════════════════════════
   15. LAZY LOADING IMAGES
═══════════════════════════════════════════════ */
if ('IntersectionObserver' in window) {
  const lazyImages = $$('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imageObserver.observe(img));
}

/* ═══════════════════════════════════════════════
   16. PARALLAX (hero orbs) — subtle
═══════════════════════════════════════════════ */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const orb1 = $('.orb-1');
    const orb2 = $('.orb-2');
    const orb3 = $('.orb-3');
    if (orb1) orb1.style.transform = `translateY(${scrollY * 0.12}px)`;
    if (orb2) orb2.style.transform = `translateY(${-scrollY * 0.08}px)`;
    if (orb3) orb3.style.transform = `translateY(${scrollY * 0.05}px)`;
  }, { passive: true });
}

/* ═══════════════════════════════════════════════
   17. PAGE LOAD ANIMATION
═══════════════════════════════════════════════ */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
});
