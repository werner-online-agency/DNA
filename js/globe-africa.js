import createGlobe from 'cobe';

function initGlobe() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return;

    const markers = [
        // North Africa
        { location: [36.75, 3.04], size: 0.07, name: 'Algeria' },
        { location: [26.82, 30.80], size: 0.07, name: 'Egypt' },
        { location: [26.34, 17.23], size: 0.06, name: 'Libya' },
        { location: [31.79, -7.09], size: 0.07, name: 'Morocco' },
        { location: [33.89, 9.54], size: 0.07, name: 'Tunisia' },
        // West Africa
        { location: [9.31, 2.32], size: 0.06, name: 'Benin' },
        { location: [12.24, -1.56], size: 0.06, name: 'Burkina Faso' },
        { location: [7.37, 12.35], size: 0.07, name: 'Cameroon' },
        { location: [5.95, -11.79], size: 0.07, name: "Côte d'Ivoire" },
        { location: [7.95, -1.02], size: 0.07, name: 'Ghana' },
        { location: [9.95, -9.70], size: 0.06, name: 'Guinea' },
        { location: [17.57, -4.00], size: 0.06, name: 'Mali' },
        { location: [9.08, 8.68], size: 0.08, name: 'Nigeria' },
        { location: [14.50, -14.45], size: 0.06, name: 'Senegal' },
        // East Africa
        { location: [9.15, 40.49], size: 0.07, name: 'Ethiopia' },
        { location: [-0.02, 37.91], size: 0.08, name: 'Kenya' },
        { location: [-18.77, 46.87], size: 0.06, name: 'Madagascar' },
        { location: [-13.25, 34.30], size: 0.06, name: 'Malawi' },
        { location: [-18.67, 35.53], size: 0.07, name: 'Mozambique' },
        { location: [-1.94, 29.87], size: 0.06, name: 'Rwanda' },
        { location: [-6.37, 34.89], size: 0.07, name: 'Tanzania' },
        { location: [1.37, 32.29], size: 0.07, name: 'Uganda' },
        // Southern Africa
        { location: [-30.56, 22.94], size: 0.1, name: 'South Africa' },
        { location: [-22.33, 24.68], size: 0.07, name: 'Botswana' },
        { location: [-22.96, 18.49], size: 0.07, name: 'Namibia' },
        { location: [-13.13, 27.85], size: 0.07, name: 'Zambia' },
        { location: [-19.02, 29.15], size: 0.07, name: 'Zimbabwe' },
        { location: [-12.29, 16.87], size: 0.06, name: 'Angola' },
        // Central Africa
        { location: [15.45, 18.73], size: 0.06, name: 'Chad' },
        { location: [-4.04, 21.76], size: 0.06, name: 'Congo (DRC)' },
        { location: [-4.27, 15.28], size: 0.06, name: 'Congo (Republic)' },
        { location: [-0.80, 11.61], size: 0.06, name: 'Gabon' },
        // Middle East
        { location: [23.42, 53.85], size: 0.08, name: 'UAE' },
        { location: [23.89, 45.08], size: 0.08, name: 'Saudi Arabia' },
    ];

    let currentPhi = 0.3;
    let pointerInteracting = null;
    let globeInstance = null;

    function startGlobe() {
        try {
            globeInstance = createGlobe(canvas, {
                devicePixelRatio: 2,
                width: 900,
                height: 900,
                phi: 0.3,
                theta: 0.1,
                dark: 1,
                diffuse: 3,
                mapSamples: 24000,
                mapBrightness: 1.8,
                baseColor: [0.12, 0.18, 0.33],
                markerColor: [0.1, 0.8, 0.6],
                glowColor: [0.03, 0.1, 0.22],
                markers: markers,
                opacity: 0.9,
                onRender: (state) => {
                    if (!pointerInteracting) {
                        currentPhi += 0.002;
                    }
                    state.phi = currentPhi;
                    state.width = 900;
                    state.height = 900;
                }
            });

            canvas.style.opacity = '0';
            canvas.style.transition = 'opacity 1.2s ease';
            requestAnimationFrame(() => { canvas.style.opacity = '1'; });
        } catch (err) {
            console.error('Globe failed to initialize:', err);
            canvas.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;width:500px;height:500px;border-radius:50%;background:rgba(14,156,126,0.1);border:1px solid rgba(14,156,126,0.2);margin:0 auto;"><i class="fas fa-globe-africa" style="font-size:140px;color:rgba(14,156,126,0.4);"></i></div>';
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

    // Drag to rotate
    let dragStartX = null;
    canvas.addEventListener('pointerdown', (e) => {
        pointerInteracting = true;
        dragStartX = e.clientX;
        canvas.style.cursor = 'grabbing';
    });
    window.addEventListener('pointerup', () => {
        pointerInteracting = null;
        dragStartX = null;
        canvas.style.cursor = 'grab';
    });
    canvas.addEventListener('pointermove', (e) => {
        if (pointerInteracting && dragStartX !== null) {
            const delta = e.clientX - dragStartX;
            currentPhi += delta / 200;
            dragStartX = e.clientX;
        }
    });
    canvas.addEventListener('touchmove', (e) => {
        if (pointerInteracting) e.preventDefault();
    }, { passive: false });

    // Tooltip & click logic
    const tooltip = document.getElementById('globe-tooltip');
    const currentTheta = 0.1;
    let activeMarker = null;

    function latLngToScreen(lat, lng, phi, theta, radius, cx, cy) {
        const latRad = (lat * Math.PI) / 180;
        const lngRad = (lng * Math.PI) / 180;
        const x = Math.cos(latRad) * Math.sin(lngRad - phi);
        const y = -Math.sin(latRad) * Math.cos(theta) + Math.cos(latRad) * Math.sin(theta) * Math.cos(lngRad - phi);
        const z = Math.sin(latRad) * Math.sin(theta) + Math.cos(latRad) * Math.cos(theta) * Math.cos(lngRad - phi);
        if (z < 0) return null;
        return { x: cx + x * radius, y: cy + y * radius };
    }

    function getClosestMarker(mx, my, rect) {
        const displayW = rect.width;
        const displayH = rect.height;
        const cx = displayW / 2;
        const cy = displayH / 2;
        const radius = displayW * 0.45;
        let closest = null;
        let closestDist = 22;
        for (const m of markers) {
            const pos = latLngToScreen(m.location[0], m.location[1], currentPhi, currentTheta, radius, cx, cy);
            if (!pos) continue;
            const d = Math.hypot(pos.x - mx, pos.y - my);
            if (d < closestDist) {
                closestDist = d;
                closest = { marker: m, pos };
            }
        }
        return closest;
    }

    // Hover — show tooltip
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const hit = getClosestMarker(mx, my, rect);
        canvas.style.cursor = hit ? 'pointer' : 'default';
        if (hit && activeMarker !== hit.marker) {
            tooltip.textContent = hit.marker.name;
            tooltip.style.left = hit.pos.x + 'px';
            tooltip.style.top = (hit.pos.y - 40) + 'px';
            tooltip.style.opacity = '1';
        } else if (!hit && !activeMarker) {
            tooltip.style.opacity = '0';
        }
    });

    canvas.addEventListener('mouseleave', () => {
        if (!activeMarker) tooltip.style.opacity = '0';
    });

    // Click — toggle persistent info
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const hit = getClosestMarker(mx, my, rect);

        if (hit) {
            if (activeMarker === hit.marker) {
                activeMarker = null;
                tooltip.classList.remove('globe-tooltip-active');
                tooltip.style.opacity = '0';
            } else {
                activeMarker = hit.marker;
                tooltip.innerHTML = '<i class="fas fa-map-marker-alt"></i> ' + hit.marker.name;
                tooltip.style.left = hit.pos.x + 'px';
                tooltip.style.top = (hit.pos.y - 44) + 'px';
                tooltip.style.opacity = '1';
                tooltip.classList.add('globe-tooltip-active');
            }
        } else {
            activeMarker = null;
            tooltip.classList.remove('globe-tooltip-active');
            tooltip.style.opacity = '0';
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobe);
} else {
    requestAnimationFrame(initGlobe);
}
