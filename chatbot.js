(() => {
  'use strict';

  // ==================== FAQ DATABASE ====================
  const faqData = {
    'precios': {
      question: '¿Cuáles son sus precios?',
      answer: 'Nuestros precios son muy accesibles y negociables:<br><br>• <strong>Sitio Web Básico:</strong> desde $200<br>• <strong>Web Profesional:</strong> desde $650<br>• <strong>E-commerce Completo:</strong> desde $1,200<br><br>Todos los precios son charlables según tus necesidades. <a href="#contacto">Contacta con nosotros</a> para un presupuesto personalizado.'
    },
    'servicios': {
      question: '¿Qué servicios ofrecen?',
      answer: 'Ofrecemos desarrollo de software profesional:<br><br>• Páginas Web Estáticas<br>• Páginas Web Dinámicas<br>• E-commerce / Tiendas Online<br>• Aplicaciones Móviles (Android/iOS)<br>• Sistemas Personalizados<br>• Diseño UX/UI<br><br><a href="#servicios">Ver todos los servicios</a>'
    },
    'tiempo': {
      question: '¿Cuánto tiempo tarda un proyecto?',
      answer: 'El tiempo depende de la complejidad:<br><br>• <strong>Web Básica:</strong> 1-2 semanas<br>• <strong>Web Profesional:</strong> 2-4 semanas<br>• <strong>E-commerce:</strong> 4-8 semanas<br>• <strong>App Móvil:</strong> 6-12 semanas<br><br>Te damos un cronograma detallado al iniciar el proyecto.'
    },
    'tecnologias': {
      question: '¿Qué tecnologías usan?',
      answer: 'Trabajamos con tecnologías modernas:<br><br><strong>Frontend:</strong> HTML, CSS, JavaScript, React, Vue<br><strong>Backend:</strong> Node.js, Laravel, Django<br><strong>Móvil:</strong> Flutter, React Native<br><strong>Bases de datos:</strong> MySQL, PostgreSQL, MongoDB<br><br>Elegimos la mejor tecnología para tu proyecto.'
    },
    'ubicacion': {
      question: '¿Dónde están ubicados?',
      answer: 'Estamos ubicados en <strong>Cochabamba, Bolivia</strong>.<br><br>Trabajamos con clientes de todo el mundo de forma remota. También podemos reunirnos presencialmente si estás en la zona.<br><br>📍 Cochabamba, Bolivia<br>📞 +591 77910962<br>✉️ plg39395@gmail.com'
    },
    'contacto': {
      question: '¿Cómo puedo contactarlos?',
      answer: 'Puedes contactarnos por varios medios:<br><br>• <strong>WhatsApp:</strong> <a href="https://wa.me/59177910962" target="_blank">+591 77910962</a><br>• <strong>Email:</strong> plg39395@gmail.com<br>• <strong>Formulario:</strong> <a href="#contacto">Ir al formulario de contacto</a><br><br>Respondemos en menos de 24 horas.'
    },
    'mantenimiento': {
      question: '¿Ofrecen mantenimiento?',
      answer: 'Sí, ofrecemos servicios de mantenimiento y soporte:<br><br>• Actualizaciones de contenido<br>• Corrección de errores<br>• Mejoras de seguridad<br>• Optimización de rendimiento<br>• Backup periódico<br><br>Consultanos por planes mensuales de mantenimiento.'
    },
    'garantia': {
      question: '¿Tienen garantía?',
      answer: 'Sí, todos nuestros proyectos incluyen:<br><br>• <strong>30 días de garantía</strong> para corrección de errores<br>• Soporte post-entrega<br>• Revisiones durante el desarrollo<br>• Capacitación en el uso del sistema<br><br>Tu satisfacción es nuestra prioridad.'
    },
    'metodologia': {
      question: '¿Cómo es su metodología de trabajo?',
      answer: 'Trabajamos con metodología ágil:<br><br>1. <strong>Análisis:</strong> Entendemos tus necesidades<br>2. <strong>Propuesta:</strong> Presupuesto y cronograma<br>3. <strong>Diseño:</strong> Mockups y prototipos<br>4. <strong>Desarrollo:</strong> Entregas parciales<br>5. <strong>Testing:</strong> Pruebas exhaustivas<br>6. <strong>Entrega:</strong> Capacitación y documentación'
    },
    'pago': {
      question: '¿Cómo son las formas de pago?',
      answer: 'Aceptamos múltiples formas de pago:<br><br>• Transferencia bancaria<br>• PayPal<br>• Pago en efectivo (local)<br><br><strong>Modalidad de pago:</strong><br>• 50% al iniciar<br>• 50% al finalizar<br><br>Para proyectos grandes, podemos acordar pagos por hitos.'
    },
    'portfolio': {
      question: '¿Tienen proyectos anteriores?',
      answer: 'Sí, hemos desarrollado más de 100 proyectos:<br><br>• Sistema de inscripciones OH-SANSI<br>• Biblioteca educativa<br>• E-commerce de construcción<br>• App móvil de cine<br>• Sistema de asistencias<br>• Red social MVP<br><br><a href="#proyectos">Ver nuestro portafolio completo</a>'
    },
    'idiomas': {
      question: '¿En qué idiomas trabajan?',
      answer: 'Desarrollamos sistemas en múltiples idiomas:<br><br>• Español (nativo)<br>• Inglés<br>• Multiidioma (si lo necesitas)<br><br>Podemos adaptar cualquier proyecto al idioma que necesites.'
    },
    'saludo': {
    question: 'Hola',
    answer: '¡Hola! 👋 Bienvenido a <strong>TuAppYaSoft</strong>.<br><br>Estoy aquí para ayudarte con información sobre precios, servicios, tiempos de entrega y más.<br><br>¿Qué te gustaría saber? 😊'
    },
    'despedida': {
    question: 'Adiós',
    answer: '¡Gracias por escribirnos! 👋<br><br>Si tienes otra consulta, aquí estaré. También puedes contactarnos directamente por WhatsApp o correo.<br><br>¡Que tengas un excelente día! 🚀'
    },
    'agradecimiento': {
    question: 'Gracias',
    answer: '¡Con gusto! 😊<br><br>Estamos aquí para ayudarte cuando lo necesites. ¿Deseas información sobre algún servicio en específico?'
    },
    'como_estas': {
    question: '¿Cómo estás?',
    answer: '¡Muy bien, gracias por preguntar! 😄<br><br>Listo para ayudarte con tu proyecto de software. ¿Qué tienes en mente?'
    },

    'reunion': {
    question: '¿Podemos tener una reunión?',
    answer: '¡Claro que sí! 🤝<br><br>Podemos coordinar una reunión:<br>• Virtual (Google Meet / Zoom)<br>• Presencial (si estás en Cochabamba)<br><br>Contáctanos por WhatsApp para agendar una reunión.'
    },
    'contrato': {
    question: '¿Trabajan con contrato?',
    answer: 'Sí 👍<br><br>Todos nuestros proyectos pueden realizarse con contrato, donde se detallan:<br>• Alcance del proyecto<br>• Plazos<br>• Costos<br>• Responsabilidades<br><br>Esto brinda seguridad a ambas partes.'
    },
    'factura': {
    question: '¿Emiten factura?',
    answer: 'Sí, podemos emitir factura según el acuerdo del proyecto.<br><br>Consúltanos para más detalles.'
    },
    'empresa_legal': {
    question: '¿Son una empresa legal?',
    answer: 'Sí, trabajamos de manera formal y profesional, brindando confianza, cumplimiento y soporte en cada proyecto.'
    },

    'hosting': {
    question: '¿Incluye hosting y dominio?',
    answer: 'El hosting y dominio no están incluidos por defecto.<br><br>Pero podemos:<br>• Asesorarte para comprarlos<br>• Configurarlos por ti<br>• Administrarlos si lo deseas'
    },
    'seo': {
    question: '¿Hacen SEO?',
    answer: 'Sí 🚀<br><br>Aplicamos SEO básico y avanzado:<br>• Optimización de velocidad<br>• SEO on-page<br>• Buenas prácticas para Google'
    },
    'responsive': {
    question: '¿La web es adaptable a celular?',
    answer: 'Sí ✅<br><br>Todos nuestros proyectos son <strong>100% responsive</strong>, adaptados a celulares, tablets y computadoras.'
    },
    'admin_panel': {
    question: '¿Tendré panel de administración?',
    answer: 'Sí, si tu proyecto lo requiere.<br><br>Podrás administrar:<br>• Contenido<br>• Usuarios<br>• Productos<br>• Información del sitio'
    }


  };

  // Keywords para detectar intención
  const keywords = {
    'precios': ['precio', 'costo', 'cuanto', 'valor', 'tarifa', 'cotizar', 'presupuesto', 'barato'],
    'servicios': ['servicio', 'ofrecer', 'hacer', 'desarrollo', 'tipo'],
    'tiempo': ['tiempo', 'cuanto tarda', 'demora', 'plazo', 'cuando', 'rapido', 'entrega'],
    'tecnologias': ['tecnologia', 'lenguaje', 'framework', 'react', 'node', 'laravel', 'django', 'flutter', 'herramienta'],
    'ubicacion': ['ubicacion', 'donde', 'direccion', 'ciudad', 'pais', 'bolivia', 'cochabamba'],
    'contacto': ['contacto', 'contactar', 'llamar', 'email', 'whatsapp', 'telefono', 'correo'],
    'mantenimiento': ['mantenimiento', 'soporte', 'actualizar', 'actualización', 'mantener'],
    'garantia': ['garantia', 'asegurar', 'seguro', 'proteccion'],
    'metodologia': ['metodologia', 'proceso', 'trabajo', 'como trabajan', 'etapa', 'fase'],
    'pago': ['pago', 'pagar', 'forma de pago', 'metodo', 'transferencia'],
    'portfolio': ['portfolio', 'proyectos', 'trabajo anterior', 'experiencia', 'ejemplo'],
    'idiomas': ['idioma', 'lenguaje', 'español', 'ingles', 'traducir'],
    
    'saludo': ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'hey', 'hello'],
    'despedida': ['adios', 'chau', 'hasta luego', 'nos vemos'],
    'agradecimiento': ['gracias', 'muchas gracias', 'thanks'],
    'como_estas': ['como estas', 'que tal', 'todo bien'],

    'reunion': ['reunion', 'reunir', 'meeting', 'llamada'],
    'contrato': ['contrato', 'acuerdo', 'legal'],
    'factura': ['factura', 'recibo'],
    'empresa_legal': ['empresa', 'legal', 'formal', 'registrado'],

    'hosting': ['hosting', 'dominio', 'servidor'],
    'seo': ['seo', 'google', 'posicionamiento'],
    'responsive': ['responsive', 'celular', 'movil', 'tablet'],
    'admin_panel': ['panel', 'administrar', 'dashboard']


  };

  const quickQuestions = [
    { text: '💰 ¿Cuáles son sus precios?', key: 'precios' },
    { text: '⚡ ¿Qué servicios ofrecen?', key: 'servicios' },
    { text: '⏱️ ¿Cuánto tarda un proyecto?', key: 'tiempo' },
    { text: '📞 ¿Cómo contactarlos?', key: 'contacto' },
    { text: '💻 ¿Qué tecnologías usan?', key: 'tecnologias' },
    { text: '📁 ¿Tienen proyectos anteriores?', key: 'portfolio' }
  ];

  // ==================== CHATBOT FUNCTIONS ====================
  function findBestMatch(userInput) {
    const input = userInput.toLowerCase().trim();
    
    // Buscar coincidencias exactas primero
    for (const [key, wordList] of Object.entries(keywords)) {
      for (const word of wordList) {
        if (input.includes(word)) {
          return key;
        }
      }
    }
    
    return null;
  }

  function addMessage(text, isUser = false, isHtml = false) {
    const chatMessages = document.querySelector('.chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    
    if (isHtml) {
      bubble.innerHTML = text;
    } else {
      bubble.textContent = text;
    }
    
    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    setTimeout(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
  }

  function showTypingIndicator() {
    const chatMessages = document.querySelector('.chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message bot-message typing-indicator';
    typingDiv.innerHTML = '<div class="message-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
  }

  function removeTypingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
      indicator.parentNode.removeChild(indicator);
    }
  }

  function handleUserMessage(message) {
    if (!message.trim()) return;
    
    // Add user message
    addMessage(message, true);
    
    // Show typing
    const typing = showTypingIndicator();
    
    // Find answer
    setTimeout(() => {
      removeTypingIndicator(typing);
      
      const matchKey = findBestMatch(message);
      
      if (matchKey && faqData[matchKey]) {
        addMessage(faqData[matchKey].answer, false, true);
      } else {
        const fallbackMessage = `Lo siento, no tengo una respuesta específica para eso. 😔<br><br>Pero puedo ayudarte con:<br><br>• Información sobre precios<br>• Servicios que ofrecemos<br>• Tiempos de desarrollo<br>• Formas de contacto<br><br>O puedes <a href="#contacto">contactarnos directamente</a> y te responderemos personalmente.`;
        addMessage(fallbackMessage, false, true);
      }
      
      // Show quick questions again after answer
      setTimeout(() => {
        showQuickQuestions();
      }, 500);
    }, 1000);
  }

  function showQuickQuestions() {
    const chatMessages = document.querySelector('.chatbot-messages');
    
    // Remove existing quick questions
    const existing = chatMessages.querySelector('.quick-questions-container');
    if (existing) existing.remove();
    
    const container = document.createElement('div');
    container.className = 'quick-questions-container';
    
    const title = document.createElement('div');
    title.className = 'quick-title';
    title.textContent = 'Preguntas frecuentes:';
    container.appendChild(title);
    
    const quickDiv = document.createElement('div');
    quickDiv.className = 'quick-questions';
    
    quickQuestions.forEach(q => {
      const btn = document.createElement('button');
      btn.className = 'quick-question-btn';
      btn.textContent = q.text;
      btn.onclick = () => {
        container.remove();
        addMessage(q.text, true);
        const typing = showTypingIndicator();
        setTimeout(() => {
          removeTypingIndicator(typing);
          if (faqData[q.key]) {
            addMessage(faqData[q.key].answer, false, true);
          }
          setTimeout(() => showQuickQuestions(), 500);
        }, 1000);
      };
      quickDiv.appendChild(btn);
    });
    
    container.appendChild(quickDiv);
    chatMessages.appendChild(container);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // ==================== INITIALIZATION ====================
  function initChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatMessages = document.querySelector('.chatbot-messages');

    if (!chatbotToggle || !chatbotWindow) return;

    // Toggle chatbot
    chatbotToggle.addEventListener('click', () => {
      chatbotWindow.classList.toggle('active');
      chatbotToggle.classList.toggle('active');
      
      if (chatbotWindow.classList.contains('active')) {
        // Initialize with welcome message if empty
        if (chatMessages.children.length === 0) {
          addMessage('¡Hola! 👋 Soy el asistente virtual de TuAppYaSoft.', false, true);
          setTimeout(() => {
            addMessage('Estoy aquí para responder tus preguntas sobre nuestros servicios, precios y más. ¿En qué puedo ayudarte?', false, true);
            setTimeout(() => showQuickQuestions(), 500);
          }, 800);
        }
        chatbotInput.focus();
      }
    });

    // Close chatbot
    if (chatbotClose) {
      chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
        chatbotToggle.classList.remove('active');
      });
    }

    // Send message
    function sendMessage() {
      const message = chatbotInput.value.trim();
      if (message) {
        handleUserMessage(message);
        chatbotInput.value = '';
      }
    }

    if (chatbotSend) {
      chatbotSend.addEventListener('click', sendMessage);
    }

    if (chatbotInput) {
      chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendMessage();
        }
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }

  console.log('💬 Chatbot loaded successfully!');
})();
