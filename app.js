(() => {
  // --- Tilt 3D ---
  function applyTilt(el, e) {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotX = (-y * 8).toFixed(2);
    const rotY = (x * 12).toFixed(2);
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
  }
  function resetTilt(el) { el.style.transform = ''; }
  document.querySelectorAll('[data-tilt], .card-3d').forEach(el => {
    el.addEventListener('mousemove', e => applyTilt(el, e));
    el.addEventListener('mouseleave', () => resetTilt(el));
  });

  // --- Scroll suave ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
  });

  // --- Filtros de proyectos ---
  const filters = document.querySelectorAll('.filter');
  const projects = document.querySelectorAll('.project');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projects.forEach(p => {
      p.style.display = filter === 'all' || p.dataset.tags.split(' ').includes(filter) ? '' : 'none';
    });
  }));

  // --- Modal ---
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalTech = document.getElementById('modalTech');
  const modalDescText = document.getElementById('modalDescText');
  const modalGallery = document.getElementById('modalGallery');
  const modalDemo = document.getElementById('modalDemo');
  const modalRepo = document.getElementById('modalRepo');
  const closeModal = document.getElementById('closeModal');
  const prevBtn = document.getElementById('prevImage');
  const nextBtn = document.getElementById('nextImage');

  let currentImages = [];
  let currentIndex = 0;

  function updateGallery() {
    modalGallery.innerHTML = '';
    currentImages.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = modalTitle.textContent;
      img.className = 'gallery-image';
      if (i === currentIndex) img.classList.add('active');
      img.addEventListener('click', () => window.open(src, '_blank'));
      modalGallery.appendChild(img);
    });
  }

  function showModal(card) {
    modalTitle.textContent = card.dataset.title || '';
    modalTech.textContent = card.dataset.tech || '';
    modalDescText.textContent = card.dataset.desc || '';
    currentImages = card.dataset.images ? card.dataset.images.split(',') : [];
    currentIndex = 0;
    updateGallery();

    modalDemo.href = card.dataset.demo || '#';
    modalRepo.href = card.dataset.repo || '#';

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  document.querySelectorAll('.view-project').forEach(btn => {
    btn.addEventListener('click', e => showModal(e.target.closest('.project')));
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });

  modal.addEventListener('click', e => { if (e.target === modal) closeModal.click(); });

  prevBtn.addEventListener('click', () => {
    if (!currentImages.length) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateGallery();
  });

  nextBtn.addEventListener('click', () => {
    if (!currentImages.length) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateGallery();
  });

  // --- Formulario de contacto ---
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) {
        formMsg.textContent = 'Por favor completa todos los campos.';
        return;
      }
      const subject = encodeURIComponent('Contacto portafolio - ' + name);
      const body = encodeURIComponent(message + '\n\nDe: ' + name + ' - ' + email);
      window.location.href = `mailto:guilder@example.com?subject=${subject}&body=${body}`;
      formMsg.textContent = 'Se abrirá tu cliente de correo para enviar el mensaje.';
    });
  }

  // --- Descargar CV ---
  const downloadBtn = document.getElementById('downloadCv');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const data = 'Curriculum - Guilder Paredes Lovera\nFullstack Developer\nCochabamba, Bolivia';
      const blob = new Blob([data], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CV-Guilder-Paredes.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }

  // --- Botón contratación ---
  const hireBtn = document.getElementById('hireBtn');
  if (hireBtn) hireBtn.addEventListener('click', () => document.querySelector('a[href="#contacto"]').click());

})();
// --- Modal y galería ---
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalTech = document.getElementById('modalTech');
const modalDescText = document.getElementById('modalDescText');
const modalGallery = document.getElementById('modalGallery');
const modalDemo = document.getElementById('modalDemo');
const modalRepo = document.getElementById('modalRepo');
const closeModal = document.getElementById('closeModal');
const prevBtn = document.getElementById('prevImage');
const nextBtn = document.getElementById('nextImage');

let currentImages = [];
let currentIndex = 0;

// Actualiza la galería mostrando solo la imagen activa
function updateGallery() {
  modalGallery.innerHTML = '';
  currentImages.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = modalTitle.textContent;
    img.className = 'gallery-image';
    if (i === currentIndex) img.classList.add('active'); // activa la imagen actual
    img.addEventListener('click', () => window.open(src, '_blank')); // abrir en nueva pestaña
    modalGallery.appendChild(img);
  });
}

// Abre el modal con los datos del proyecto
function showModal(card) {
  modalTitle.textContent = card.dataset.title || '';
  modalTech.textContent = card.dataset.tech || '';
  modalDescText.textContent = card.dataset.desc || '';
  currentImages = card.dataset.images ? card.dataset.images.split(',') : [];
  currentIndex = 0;
  updateGallery();

  modalDemo.href = card.dataset.demo || '#';
  modalRepo.href = card.dataset.repo || '#';

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

// Botón para abrir modal desde un proyecto
document.querySelectorAll('.view-project').forEach(btn => {
  btn.addEventListener('click', e => showModal(e.target.closest('.project')));
});

// Cerrar modal
closeModal.addEventListener('click', () => {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
});

// Cerrar modal haciendo clic fuera del contenido
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal.click();
});

// Botones de navegación de la galería
prevBtn.addEventListener('click', () => {
  if (!currentImages.length) return;
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateGallery();
});

nextBtn.addEventListener('click', () => {
  if (!currentImages.length) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateGallery();
});
