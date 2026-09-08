// projects.js — Visor Interactivo Pro & Filtros de Proyectos
document.addEventListener('DOMContentLoaded', function () {
  const filters = document.querySelectorAll('.filter');
  const projects = document.querySelectorAll('.project');
  const projectsGrid = document.getElementById('projectsGrid');
  
  // Modal Elements
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalTech = document.getElementById('modalTech');
  const modalDesc = document.getElementById('modalDescText');
  const stageMainImage = document.getElementById('stageMainImage');
  const stageCounter = document.getElementById('stageCounter');
  const stagePrev = document.getElementById('stagePrev');
  const stageNext = document.getElementById('stageNext');
  const modalThumbStrip = document.getElementById('modalThumbStrip');
  const modalZoomFull = document.getElementById('modalZoomFull');
  const closeModal = document.getElementById('closeModal');

  let currentProjectImages = [];
  let currentImageIdx = 0;
  let rotationTimer = null;
  let currentProjectIndex = 0;

  // Enhance each project card with screenshot count badge & click on thumbnail
  projects.forEach(card => {
    const rawImages = card.dataset.images || '';
    const imgs = rawImages.split(',').map(s => s.trim()).filter(Boolean);
    const thumb = card.querySelector('.p-thumb');
    
    if (thumb && imgs.length > 0) {
      // Create count badge
      const badge = document.createElement('span');
      badge.className = 'p-thumb-badge';
      badge.innerHTML = `<i class="fas fa-images"></i> ${imgs.length} ${imgs.length === 1 ? 'Captura' : 'Vistas'}`;
      thumb.appendChild(badge);

      // Create hover hint
      const hint = document.createElement('span');
      hint.className = 'p-thumb-overlay-hint';
      hint.innerHTML = `<i class="fas fa-eye"></i> Explorar Galería`;
      thumb.appendChild(hint);

      // Clicking the thumbnail opens the gallery directly
      thumb.addEventListener('click', () => openProjectModal(card));
    }
  });

  // Filter functionality
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      
      projects.forEach(p => {
        const tags = (p.dataset.tags || '').toLowerCase();
        if (filter === 'all' || tags.includes(filter)) {
          p.style.display = '';
        } else {
          p.style.display = 'none';
          p.classList.remove('is-focused');
        }
      });

      currentProjectIndex = 0;
      startAutoRotation();
    });
  });

  function getVisibleProjects() {
    return Array.from(projects).filter(p => p.style.display !== 'none');
  }

  function focusProject(project) {
    projects.forEach(p => p.classList.remove('is-focused'));
    if (!project) return;
    project.classList.add('is-focused');
  }

  function rotateProject() {
    const visibleProjects = getVisibleProjects();
    if (!visibleProjects.length) return;
    currentProjectIndex = currentProjectIndex % visibleProjects.length;
    focusProject(visibleProjects[currentProjectIndex]);
    currentProjectIndex = (currentProjectIndex + 1) % visibleProjects.length;
  }

  function stopAutoRotation() {
    if (rotationTimer) {
      clearInterval(rotationTimer);
      rotationTimer = null;
    }
  }

  function startAutoRotation() {
    stopAutoRotation();
    const visibleProjects = getVisibleProjects();
    if (visibleProjects.length <= 1) return;
    rotateProject();
    rotationTimer = setInterval(rotateProject, 4500);
  }

  // Open Modal & Initialize Gallery
  function openProjectModal(art) {
    if (!art) return;
    stopAutoRotation();

    modalTitle.textContent = art.dataset.title || '';
    modalTech.innerHTML = `<i class="fas fa-code"></i> ${art.dataset.tech || 'Tecnologías del proyecto'}`;
    modalDesc.textContent = art.dataset.desc || '';

    // Parse images
    currentProjectImages = (art.dataset.images || '').split(',').map(s => s.trim()).filter(Boolean);
    if (currentProjectImages.length === 0) {
      currentProjectImages = ['../assets/ALogoEmpresa.png'];
    }

    currentImageIdx = 0;

    // Build Thumbnail Strip
    modalThumbStrip.innerHTML = '';
    currentProjectImages.forEach((imgSrc, idx) => {
      const thumb = document.createElement('div');
      thumb.className = `thumb-item ${idx === 0 ? 'active' : ''}`;
      thumb.style.backgroundImage = `url('${imgSrc}')`;
      thumb.setAttribute('aria-label', `Ver captura ${idx + 1}`);
      thumb.addEventListener('click', () => {
        setStageImage(idx);
      });
      modalThumbStrip.appendChild(thumb);
    });

    setStageImage(0);

    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent bg scroll
  }

  function setStageImage(index) {
    if (index < 0 || index >= currentProjectImages.length) return;
    currentImageIdx = index;

    const targetSrc = currentProjectImages[currentImageIdx];
    
    // Smooth image transition
    stageMainImage.style.opacity = '0.3';
    stageMainImage.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
      stageMainImage.src = targetSrc;
      stageMainImage.style.opacity = '1';
      stageMainImage.style.transform = 'scale(1)';
    }, 120);

    // Update counter & zoom link
    if (stageCounter) {
      stageCounter.textContent = `${currentImageIdx + 1} / ${currentProjectImages.length}`;
    }
    if (modalZoomFull) {
      modalZoomFull.href = targetSrc;
    }

    // Update active thumb
    const thumbs = modalThumbStrip.querySelectorAll('.thumb-item');
    thumbs.forEach((th, idx) => {
      if (idx === currentImageIdx) {
        th.classList.add('active');
        th.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        th.classList.remove('active');
      }
    });
  }

  function nextImage() {
    if (currentProjectImages.length <= 1) return;
    let nextIdx = (currentImageIdx + 1) % currentProjectImages.length;
    setStageImage(nextIdx);
  }

  function prevImage() {
    if (currentProjectImages.length <= 1) return;
    let prevIdx = (currentImageIdx - 1 + currentProjectImages.length) % currentProjectImages.length;
    setStageImage(prevIdx);
  }

  if (stageNext) stageNext.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
  if (stagePrev) stagePrev.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });

  // Buttons inside cards
  document.querySelectorAll('.view-project').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const art = e.currentTarget.closest('.project');
      openProjectModal(art);
    });
  });

  function closeProjectModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    startAutoRotation();
  }

  if (closeModal) closeModal.addEventListener('click', closeProjectModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProjectModal();
  });

  // Keyboard navigation for gallery & closing
  document.addEventListener('keydown', (e) => {
    if (modal.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') {
        closeProjectModal();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    }
  });

  // Touch swipe support on main stage for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  const stageContainer = document.querySelector('.modal-main-stage');

  if (stageContainer) {
    stageContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stageContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > 40) {
      if (swipeDistance < 0) {
        nextImage(); // swipe left -> next
      } else {
        prevImage(); // swipe right -> prev
      }
    }
  }

  // Hover pause on projects grid
  if (projectsGrid) {
    projectsGrid.addEventListener('mouseenter', stopAutoRotation);
    projectsGrid.addEventListener('mouseleave', () => {
      if (modal.getAttribute('aria-hidden') === 'true') {
        startAutoRotation();
      }
    });
  }

  startAutoRotation();
});
