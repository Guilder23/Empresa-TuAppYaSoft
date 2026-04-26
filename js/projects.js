// projects.js — filtrado simple y modal básico
document.addEventListener('DOMContentLoaded', function () {
  const filters = document.querySelectorAll('.filter');
  const projects = document.querySelectorAll('.project');
  const projectsGrid = document.getElementById('projectsGrid');
  let rotationTimer = null;
  let currentProjectIndex = 0;

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

      // Reinicia la rotación tomando solo los proyectos visibles
      currentProjectIndex = 0;
      startAutoRotation();
    });
  });

  // Modal básico para ver detalles
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalTech = document.getElementById('modalTech');
  const modalDesc = document.getElementById('modalDescText');
  const modalGallery = document.getElementById('modalGallery');
  const closeModal = document.getElementById('closeModal');
  
  function getVisibleProjects() {
    return Array.from(projects).filter(p => p.style.display !== 'none');
  }

  function focusProject(project) {
    projects.forEach(p => p.classList.remove('is-focused'));
    if (!project) return;
    project.classList.add('is-focused');
    project.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
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
    rotationTimer = setInterval(rotateProject, 4000);
  }

  document.querySelectorAll('.view-project').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const art = e.currentTarget.closest('.project');
      if (!art) return;
      modalTitle.textContent = art.dataset.title || '';
      modalTech.textContent = art.dataset.tech || '';
      modalDesc.textContent = art.dataset.desc || '';
      // gallery
      modalGallery.innerHTML = '';
      const imgs = (art.dataset.images || '').split(',').map(s => s.trim()).filter(Boolean);
      imgs.forEach(src => {
        const d = document.createElement('div');
        d.className = 'modal-thumb';
        d.style.backgroundImage = `url('${src}')`;
        d.style.height = '160px';
        d.style.backgroundSize = 'cover';
        d.style.marginBottom = '0.5rem';
        modalGallery.appendChild(d);
      });
      stopAutoRotation();
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  function closeProjectModal() {
    modal.setAttribute('aria-hidden', 'true');
    startAutoRotation();
  }

  if (closeModal) closeModal.addEventListener('click', closeProjectModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProjectModal();
  });

  // Pausa cuando el usuario interactúa con la grilla, reanuda al salir
  if (projectsGrid) {
    projectsGrid.addEventListener('mouseenter', stopAutoRotation);
    projectsGrid.addEventListener('mouseleave', startAutoRotation);
  }

  startAutoRotation();
});
