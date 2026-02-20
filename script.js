/* ============================================
   FIEL ALIMENTOS — Proposta Comercial
   Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // ---- Reading Progress Bar ----
  const progressBar = document.getElementById('readingProgress');

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }

  // ---- Navbar Scroll Effect ----
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // ---- Active Nav Link ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Throttled scroll handler
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        handleNavScroll();
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  // ---- Mobile Navigation Toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinksMenu = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinksMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // Close mobile nav when clicking a link
  navLinksMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksMenu.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  // ---- Scroll Animations (IntersectionObserver) ----
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay) || 0;
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => observer.observe(el));

  // ---- Accordion (Section 5) ----
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.parentElement;
      const isActive = item.classList.contains('active');
      const content = item.querySelector('.accordion-content');

      // Close all other accordions
      document.querySelectorAll('.accordion-item.active').forEach(activeItem => {
        if (activeItem !== item) {
          activeItem.classList.remove('active');
          activeItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
          activeItem.querySelector('.accordion-content').style.maxHeight = '0';
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // ---- Interactive Calculator (B2B Loss) ----
  const calcTabs = document.querySelectorAll('.calc-tab');
  const calcAmount = document.getElementById('calc-display-amount');
  const calcCaption = document.getElementById('calc-display-caption');

  const calcData = {
    'month': {
      value: 10000,
      caption: 'Dinheiro deixado na mesa para os distribuidores ágeis e concorrência direta na sua região, apenas neste mês.'
    },
    'year': {
      value: 120000,
      caption: 'Faturamento mínimo que uma fábrica de médio porte deixa de faturar no ano por não possuir catálogo digital rápido.'
    },
    'five-years': {
      value: 600000,
      caption: 'Prejuízo escalável. Clientes atacadistas que foram fidelizados por outras marcas B2B porque você não estava no Google.'
    }
  };

  if (calcTabs.length && calcAmount) {
    calcTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class
        calcTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Get data
        const period = tab.dataset.period;
        const data = calcData[period];

        // Animate count and update caption
        const currentValue = parseInt(calcAmount.textContent.replace(/\./g, ''));
        animateCounterValue(calcAmount, currentValue, data.value, 800);
        calcCaption.textContent = data.caption;
      });
    });
  }

  // helper to animate any counter from A to B
  function animateCounterValue(el, start, target, duration) {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(start + (target - start) * eased);
      el.textContent = value.toLocaleString('pt-BR');

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString('pt-BR');
      }
    }
    requestAnimationFrame(update);
  }

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Counter Animation for Stats ----
  function animateCounter(el, target, duration) {
    let start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString('pt-BR');

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString('pt-BR');
      }
    }

    requestAnimationFrame(update);
  }

  // Observe counter elements
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.count);
          animateCounter(entry.target, target, 2000);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  // ---- Parallax-like subtle effect on hero shapes ----
  const shapes = document.querySelectorAll('.shape');
  if (shapes.length && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      shapes.forEach((shape, i) => {
        const speed = (i + 1) * 8;
        shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  }

  // ---- Initial calls ----
  updateProgress();
  handleNavScroll();
});
