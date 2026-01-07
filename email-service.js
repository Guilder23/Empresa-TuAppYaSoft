/**
 * EmailJS Service Configuration
 * Servicio de envío de correos para formulario de contacto
 */

// =====================================================
// CONFIGURACIÓN DE EMAILJS
// =====================================================
// Configuración para envío de correos desde el formulario de contacto
// Correo destino: pplg393935@gmail.com

const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_pu5q5xg',      // Service ID de EmailJS
    TEMPLATE_ID: 'template_unw070m',    // Template ID de EmailJS  
    PUBLIC_KEY: 'fhyfUcjkKmfIU2qm-'     // Public Key de EmailJS
};

// =====================================================
// INICIALIZACIÓN DEL SERVICIO
// =====================================================
(function() {
    // Inicializar EmailJS cuando se cargue la página
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
})();

// =====================================================
// FUNCIÓN PRINCIPAL DE ENVÍO DE CORREO
// =====================================================
function enviarCorreo(formData) {
    // Preparar los parámetros del template
    const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'No proporcionado',
        service: formData.service || 'No especificado',
        message: formData.message
    };

    // Enviar el correo usando EmailJS
    return emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
    );
}

// =====================================================
// MANEJO DEL FORMULARIO DE CONTACTO
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMsg = document.getElementById('formMsg');

    if (!form) {
        return;
    }

    // Evento de envío del formulario
    form.addEventListener('submit', async function(e) {
        e.preventDefault(); // Evitar recarga de página

        // Validar formulario
        if (!form.checkValidity()) {
            mostrarMensaje('Por favor, completa todos los campos requeridos.', 'error');
            return;
        }

        // Obtener datos del formulario
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            service: document.getElementById('service').value,
            message: document.getElementById('message').value.trim()
        };

        // Validaciones adicionales
        if (!formData.name || !formData.email || !formData.message) {
            mostrarMensaje('Por favor, completa los campos obligatorios.', 'error');
            return;
        }

        // Validar email
        if (!validarEmail(formData.email)) {
            mostrarMensaje('Por favor, ingresa un email válido.', 'error');
            return;
        }

        // Deshabilitar botón de envío
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnTextOriginal = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        try {
            // Enviar correo
            await enviarCorreo(formData);

            // Éxito - Mostrar mensaje visual
            mostrarMensaje('✅ ¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
            form.reset();

        } catch (error) {
            // Error - Mostrar mensaje visual
            mostrarMensaje('❌ Error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos por WhatsApp.', 'error');

        } finally {
            // Rehabilitar botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = btnTextOriginal;
        }
    });
});

// =====================================================
// FUNCIONES AUXILIARES
// =====================================================

/**
 * Mostrar mensaje de estado del formulario
 */
function mostrarMensaje(mensaje, tipo = 'info') {
    const formMsg = document.getElementById('formMsg');
    if (!formMsg) return;

    formMsg.textContent = mensaje;
    formMsg.className = `muted small ${tipo}`;
    formMsg.style.display = 'block';

    // Aplicar estilos según el tipo
    if (tipo === 'success') {
        formMsg.style.color = '#10b981';
        formMsg.style.fontWeight = '600';
    } else if (tipo === 'error') {
        formMsg.style.color = '#ef4444';
        formMsg.style.fontWeight = '600';
    } else {
        formMsg.style.color = '#94a3b8';
    }

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        formMsg.style.opacity = '0';
        formMsg.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            formMsg.style.display = 'none';
            formMsg.style.opacity = '1';
        }, 500);
    }, 5000);
}

/**
 * Validar formato de email
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Sanitizar datos de entrada (prevenir XSS)
 */
function sanitizarTexto(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}
