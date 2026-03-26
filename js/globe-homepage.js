import createGlobe from 'cobe';

function initGlobe() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return;

    const markers = [
        // Africa
        { location: [-30.56, 22.94], size: 0.1 },   // South Africa
        { location: [-22.96, 18.49], size: 0.07 },  // Namibia
        { location: [-19.02, 29.15], size: 0.07 },  // Zimbabwe
        { location: [-13.13, 27.85], size: 0.07 },  // Zambia
        { location: [-22.33, 24.68], size: 0.07 },  // Botswana
        { location: [-18.67, 35.53], size: 0.07 },  // Mozambique
        { location: [-0.02, 37.91], size: 0.07 },   // Kenya
        { location: [9.08, 8.68], size: 0.07 },     // Nigeria
        // Europe
        { location: [55.38, -3.44], size: 0.07 },   // United Kingdom
        { location: [53.14, -7.69], size: 0.07 },   // Ireland
        { location: [51.17, 10.45], size: 0.07 },   // Germany
        { location: [46.23, 2.21], size: 0.07 },    // France
        { location: [52.13, 5.29], size: 0.07 },    // Netherlands
        { location: [51.92, 19.15], size: 0.07 },   // Poland
        // Americas & Asia-Pacific
        { location: [37.09, -95.71], size: 0.07 },  // United States
        { location: [56.13, -106.35], size: 0.07 }, // Canada
        { location: [-14.24, -51.93], size: 0.07 }, // Brazil
        { location: [23.63, -102.55], size: 0.07 }, // Mexico
        { location: [-25.27, 133.78], size: 0.07 }, // Australia
        { location: [1.35, 103.82], size: 0.07 },   // Singapore
        // Middle East
        { location: [23.42, 53.85], size: 0.07 },   // UAE
        { location: [23.89, 45.08], size: 0.07 },   // Saudi Arabia
        { location: [25.35, 51.18], size: 0.07 },   // Qatar
        { location: [29.31, 47.48], size: 0.07 },   // Kuwait
    ];

    let currentPhi = 2.8;
    let pointerInteracting = null;
    let globeInstance = null;

    function startGlobe() {
        try {
            globeInstance = createGlobe(canvas, {
                devicePixelRatio: 2,
                width: 680,
                height: 680,
                phi: 2.8,
                theta: 0.2,
                dark: 1,
                diffuse: 2.5,
                mapSamples: 24000,
                mapBrightness: 6,
                baseColor: [0.15, 0.25, 0.45],
                markerColor: [0.1, 0.8, 0.6],
                glowColor: [0.06, 0.18, 0.4],
                markers: markers,
                opacity: 0.92,
                onRender: (state) => {
                    if (!pointerInteracting) {
                        currentPhi += 0.003;
                    }
                    state.phi = currentPhi;
                    state.width = 680;
                    state.height = 680;
                }
            });

            canvas.style.opacity = '0';
            canvas.style.transition = 'opacity 1.2s ease';
            requestAnimationFrame(() => { canvas.style.opacity = '1'; });
        } catch (err) {
            console.error('Globe failed to initialize:', err);
            canvas.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;width:420px;height:420px;border-radius:50%;background:rgba(14,156,126,0.1);border:1px solid rgba(14,156,126,0.2);"><i class="fas fa-globe-africa" style="font-size:120px;color:rgba(14,156,126,0.4);"></i></div>';
        }
    }

    // Lazy-load: only start when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.disconnect();
                startGlobe();
            }
        });
    }, { threshold: 0.1 });
    observer.observe(canvas);

    canvas.addEventListener('pointerdown', (e) => {
        pointerInteracting = e.clientX;
        canvas.style.cursor = 'grabbing';
    });
    window.addEventListener('pointerup', () => {
        pointerInteracting = null;
        canvas.style.cursor = 'grab';
    });
    canvas.addEventListener('pointermove', (e) => {
        if (pointerInteracting !== null) {
            const delta = e.clientX - pointerInteracting;
            currentPhi += delta / 200;
            pointerInteracting = e.clientX;
        }
    });
    canvas.addEventListener('touchmove', (e) => {
        if (pointerInteracting !== null) e.preventDefault();
    }, { passive: false });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobe);
} else {
    requestAnimationFrame(initGlobe);
}
