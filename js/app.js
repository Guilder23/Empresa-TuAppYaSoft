(() => {
  'use strict';

  // ==================== THEME TOGGLE ====================
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.classList.remove('dark', 'light');
  body.classList.add(savedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      body.classList.remove('dark', 'light');
      body.classList.add(newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Add animation
      themeToggle.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        themeToggle.style.transform = '';
      }, 400);
    });
  }

  // ==================== TYPING EFFECT HERO ====================
  const typingTarget = document.getElementById('typingText');
  const typingPrefix = document.getElementById('typingPrefix');
  if (typingTarget) {
    const prefixText = (typingPrefix?.dataset.prefix || '').trim();
    const words = (typingTarget.dataset.words || 'AppYaa')
      .split(',')
      .map(word => word.trim())
      .filter(Boolean);

    if (words.length > 0) {
      const typePrefixOnce = (done) => {
        if (!typingPrefix || !prefixText) return done();
        let i = 0;
        const tick = () => {
          i += 1;
          typingPrefix.textContent = prefixText.slice(0, i);
          if (i >= prefixText.length) return done();
          setTimeout(tick, 45);
        };
        typingPrefix.textContent = '';
        tick();
      };

      let wordIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const typeLoop = () => {
        const currentWord = words[wordIndex];

        if (deleting) {
          charIndex = Math.max(charIndex - 1, 0);
        } else {
          charIndex = Math.min(charIndex + 1, currentWord.length);
        }

        typingTarget.textContent = currentWord.slice(0, charIndex);

        let delay = deleting ? 50 : 90;
        if (!deleting && charIndex === currentWord.length) {
          delay = 1400;
          deleting = true;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          delay = 300;
        }

        setTimeout(typeLoop, delay);
      };

      typingTarget.textContent = '';
      typePrefixOnce(() => setTimeout(typeLoop, 250));
    }
  }

  // ==================== MOBILE MENU TOGGLE ====================
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const nav = document.querySelector('.nav');
  
  // Función para cerrar el menú
  const closeNav = () => {
    if (nav && nav.classList.contains('active')) {
      nav.classList.remove('active');
      const icon = mobileMenuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  };
  
  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      const icon = mobileMenuToggle.querySelector('i');
      if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('active') && 
          !nav.contains(e.target) && 
          !mobileMenuToggle.contains(e.target)) {
        closeNav();
      }
    });
  }

  // ==================== TILT 3D EFFECT ====================
  function applyTilt(el, e) {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotX = (-y * 8).toFixed(2);
    const rotY = (x * 12).toFixed(2);
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
  }
  
  function resetTilt(el) {
    el.style.transform = '';
  }
  
  document.querySelectorAll('[data-tilt], .card-3d').forEach(el => {
    el.addEventListener('mousemove', e => applyTilt(el, e));
    el.addEventListener('mouseleave', () => resetTilt(el));
  });

  // ==================== SMOOTH SCROLL ====================
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || !href) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      // Close mobile menu if open
      const navElement = document.querySelector('.nav');
      const menuToggle = document.getElementById('mobileMenuToggle');
      if (navElement && navElement.classList.contains('active')) {
        navElement.classList.remove('active');
        if (menuToggle) {
          const icon = menuToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
      
      // Scroll to target using scrollIntoView
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Adjust for fixed header
        setTimeout(() => {
          window.scrollBy({
            top: -80,
            behavior: 'smooth'
          });
        }, 10);
      }
    });
  });

  // ==================== SCROLL ANIMATIONS ====================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });

  // ==================== COUNTER ANIMATION ====================
  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, stepTime);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number[data-target]').forEach(counter => {
    counterObserver.observe(counter);
  });

  // ==================== PROJECT FILTERS ====================
  const filters = document.querySelectorAll('.filter');
  const projects = document.querySelectorAll('.project');
  
  if (filters.length > 0 && projects.length > 0) {
    filters.forEach(btn => btn.addEventListener('click', () => {
      // Update active filter
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      // Filter projects with animation
      projects.forEach(p => {
        if (filter === 'all' || p.dataset.tags.split(' ').includes(filter)) {
          p.style.display = '';
          setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
          }, 10);
        } else {
          p.style.opacity = '0';
          p.style.transform = 'translateY(20px)';
          setTimeout(() => {
            p.style.display = 'none';
          }, 300);
        }
      });
    }));
  }

  // ==================== PROJECT MODAL ====================
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalTech = document.getElementById('modalTech');
  const modalDescText = document.getElementById('modalDescText');
  const modalGallery = document.getElementById('modalGallery');
  const modalDemo = document.getElementById('modalDemo');
  const modalRepo = document.getElementById('modalRepo');
  const closeModal = document.getElementById('closeModal');

  let currentImages = [];
  let currentIndex = 0;

  function updateGallery() {
    if (!modalGallery) return;
    
    modalGallery.innerHTML = '';
    currentImages.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src.trim();
      img.alt = modalTitle.textContent;
      img.className = 'gallery-image';
      if (i === currentIndex) img.classList.add('active');
      
      // Click to view fullscreen
      img.addEventListener('click', () => {
        const fullscreenDiv = document.createElement('div');
        fullscreenDiv.className = 'fullscreen-image show';
        fullscreenDiv.innerHTML = `
          <button class="fullscreen-close"><i class="fas fa-times"></i></button>
          <img src="${src.trim()}" alt="${modalTitle.textContent}">
        `;
        document.body.appendChild(fullscreenDiv);
        document.body.style.overflow = 'hidden';
        
        fullscreenDiv.querySelector('.fullscreen-close').addEventListener('click', () => {
          fullscreenDiv.classList.remove('show');
          setTimeout(() => {
            document.body.removeChild(fullscreenDiv);
            document.body.style.overflow = '';
          }, 300);
        });
        
        fullscreenDiv.addEventListener('click', (e) => {
          if (e.target === fullscreenDiv) {
            fullscreenDiv.querySelector('.fullscreen-close').click();
          }
        });
      });
      
      modalGallery.appendChild(img);
    });
  }

  function showModal(card) {
    if (!modal) return;
    
    modalTitle.textContent = card.dataset.title || '';
    modalTech.textContent = card.dataset.tech || '';
    modalDescText.textContent = card.dataset.desc || '';
    currentImages = card.dataset.images ? card.dataset.images.split(',') : [];
    currentIndex = 0;
    updateGallery();

    if (modalDemo) modalDemo.href = card.dataset.demo || '#';
    if (modalRepo) modalRepo.href = card.dataset.repo || '#';

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  // Attach modal triggers
  document.querySelectorAll('.view-project').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      showModal(e.target.closest('.project'));
    });
  });

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }

  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        closeModal.click();
      }
    });
  }

  // ==================== CONTACT FORM ====================
  const contactForm = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Basic validation
      if (!data.name || !data.email || !data.message) {
        formMsg.textContent = '⚠️ Por favor completa todos los campos requeridos.';
        formMsg.style.color = '#ff6b6b';
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        formMsg.textContent = '⚠️ Por favor ingresa un email válido.';
        formMsg.style.color = '#ff6b6b';
        return;
      }
      
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual backend call)
      setTimeout(() => {
        formMsg.textContent = '✅ ¡Mensaje enviado con éxito! Te contactaremos pronto.';
        formMsg.style.color = '#51cf66';
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          formMsg.textContent = '';
        }, 5000);
      }, 1500);
    });
  }

  // ==================== HEADER SCROLL EFFECT ====================
  let lastScroll = window.pageYOffset || 0;
  const header = document.querySelector('.site-header');
  const SCROLL_DELTA = 8;
  
  window.addEventListener('scroll', () => {
    if (!header) return;

    const currentScroll = window.pageYOffset || 0;
    
    if (currentScroll > 100) {
      header.style.padding = '12px 20px';
    } else {
      header.style.padding = '16px 24px';
    }

    if (currentScroll <= 12) {
      header.classList.remove('header-hidden');
      lastScroll = currentScroll;
      return;
    }

    const scrollDiff = currentScroll - lastScroll;
    if (Math.abs(scrollDiff) < SCROLL_DELTA) {
      return;
    }

    // Bajando => ocultar | Subiendo => mostrar
    if (scrollDiff > 0) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });

  // ==================== FLOATING ANIMATION ====================
  const floatingCards = document.querySelectorAll('.floating-card');
  floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.5}s`;
  });

  // ==================== INITIALIZE ====================
  console.log('✅ TuAppYaSoft - Website loaded successfully!');
  
  // Add entrance animation to hero
  setTimeout(() => {
    document.querySelector('.hero')?.classList.add('visible');
  }, 100);
})();