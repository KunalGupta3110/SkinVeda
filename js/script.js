document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const backToTop = document.querySelector('.back-to-top');
  const progressBar = document.querySelector('.scroll-progress');
  const revealItems = document.querySelectorAll('.reveal');
  const counters = document.querySelectorAll('.counter');
  const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const sliderButtons = document.querySelectorAll('.slider-btn');
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  let testimonialIndex = 0;
  let testimonialTimer;

  const showLoading = () => {
    setTimeout(() => {
      loadingScreen?.classList.add('hidden');
    }, 850);
  };

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${percentage}%`;
    header.classList.toggle('scrolled', scrollTop > 24);
    backToTop.classList.toggle('visible', scrollTop > 600);
  };

  const revealOnScroll = () => {
    revealItems.forEach((item) => {
      const top = item.getBoundingClientRect().top;
      if (top < window.innerHeight - 90) {
        item.classList.add('visible');
      }
    });
  };

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = Number(counter.dataset.target || 0);
      const duration = 1200;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        counter.textContent = `${value}${target >= 100 ? '+' : ''}`;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = `${target}${target >= 100 ? '+' : ''}`;
        }
      };

      requestAnimationFrame(step);
    });
  };

  const startTestimonials = () => {
    clearInterval(testimonialTimer);
    testimonialTimer = setInterval(() => {
      showTestimonial((testimonialIndex + 1) % testimonialCards.length);
    }, 5000);
  };

  const showTestimonial = (index) => {
    testimonialIndex = index;
    testimonialCards.forEach((card, cardIndex) => {
      card.classList.toggle('active', cardIndex === index);
    });
  };

  const setActiveNav = (id) => {
    navLinks?.querySelectorAll('a').forEach((link) => {
      const linkId = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active', linkId === id);
    });
  };

  const handleNavToggle = () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  };

  if (sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  navToggle?.addEventListener('click', handleNavToggle);
  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  whatsappButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const productName = button.dataset.product || 'SkinVeda product';
      const message = `Hello SkinVeda Team! 👋\n\nI discovered your website and I'm interested in purchasing the following product:\n\n🛍️ Product: ${productName}\n\nCould you please share:\n\n• Price\n• Product availability\n• Delivery details\n• Payment options\n\nIf there are any ongoing offers or recommendations related to this product, I'd love to know as well.\n\nLooking forward to your response.\n\nThank you! 😊`;
      const encodedMessage = encodeURIComponent(message);
      const url = `https://wa.me/919355293311?text=${encodedMessage}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      event.currentTarget.classList.add('ripple');
      setTimeout(() => event.currentTarget.classList.remove('ripple'), 500);
    });
  });

  sliderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.classList.contains('next') ? 1 : -1;
      const nextIndex = (testimonialIndex + direction + testimonialCards.length) % testimonialCards.length;
      showTestimonial(nextIndex);
      startTestimonials();
    });
  });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    updateProgress();
    revealOnScroll();
  });

  window.addEventListener('load', () => {
    showLoading();
    animateCounters();
    showTestimonial(0);
    startTestimonials();
  });

  updateProgress();
  revealOnScroll();
  showLoading();
  showTestimonial(0);
  startTestimonials();
});
