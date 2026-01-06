function createParticles(x, y) {
    const particleCount = 12;
    
    // Variantes de azul
    const colors = [
        '#0000FF', // Azul puro
        '#0066FF', // Azul real
        '#00CCFF', // Azul celeste
        '#0033CC', // Azul marino
        '#1E90FF', // Azul dodger
        '#4169E1', // Azul real
        '#000080', // Azul marino oscuro
        '#4682B4'  // Azul acero
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // Reducir el ángulo de dispersión
        const angle = (i * (360 / particleCount)) + Math.random() * 15; // Reducido de 30 a 15
        const distance = 10 + Math.random() * 100; // Reducido de 100-300 a 50-150 píxeles
        
        const tx = Math.cos(angle * Math.PI / 180) * distance;
        const ty = Math.sin(angle * Math.PI / 180) * distance;
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1500); // Reducido de 1500 a 1000ms para una animación más rápida
    }
}

document.addEventListener('mousemove', (e) => {
    if (!document.createParticleThrottle) {
        createParticles(e.clientX, e.clientY);
        document.createParticleThrottle = true;
        setTimeout(() => {
            document.createParticleThrottle = false;
        }, 50);
    }
});