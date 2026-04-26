// projects.js — filtrado simple y modal básico
document.addEventListener('DOMContentLoaded', function () {
  const filters = document.querySelectorAll('.filter');
  const projects = document.querySelectorAll('.project');

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
        }
      });
    });
  });

  // Modal básico para ver detalles
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalTech = document.getElementById('modalTech');
  const modalDesc = document.getElementById('modalDescText');
  const modalGallery = document.getElementById('modalGallery');
  const closeModal = document.getElementById('closeModal');

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
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  if (closeModal) closeModal.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.setAttribute('aria-hidden', 'true'); });
});
