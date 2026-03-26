/**
 * DNA Outsourcing Homepage JavaScript
 * Author: DNA Outsourcing
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Initialize AOS (Animate On Scroll)
    // ============================================
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    const navbar = document.querySelector('.dna-navbar');
    const utilityBar = document.querySelector('.top-utility-bar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (utilityBar) {
                utilityBar.classList.add('hidden');
            }
        } else {
            navbar.classList.remove('scrolled');
            if (utilityBar) {
                utilityBar.classList.remove('hidden');
            }
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Run on load

    // ============================================
    // World Clocks - South African Cities
    // ============================================
    function updateClocks() {
        const now = new Date();
        
        // All SA cities use SAST (Africa/Johannesburg timezone - UTC+2)
        const saCities = ['johannesburg', 'pretoria', 'durban', 'cape-town'];
        
        saCities.forEach(city => {
            const element = document.getElementById(`clock-${city}`);
            if (element) {
                const saTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Johannesburg' }));
                element.textContent = saTime.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    hour12: false 
                });
            }
        });
    }

    // Update clocks immediately and then every second
    updateClocks();
    setInterval(updateClocks, 1000);

    // ============================================
    // Counter Animation for Stats
    // ============================================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = counter.innerText;
            
            // Handle special cases like "R 8.5 BILLION" or "375,000"
            if (target.includes('R') || target.includes(',')) {
                // Keep static for complex numbers
                return;
            }
            
            const num = parseInt(target);
            if (isNaN(num)) return;
            
            let current = 0;
            const increment = num / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= num) {
                    counter.innerText = num;
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.floor(current);
                }
            }, 30);
        });
    }

    // Trigger counter animation when stats section is in view
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // Form Submission Handling
    // ============================================
    const contactForm = document.querySelector('.form-card form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Basic validation
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const phoneInput = this.querySelector('input[type="tel"]');
            const messageInput = this.querySelector('textarea');
            
            if (!nameInput.value.trim()) {
                alert('Please enter your name.');
                nameInput.focus();
                return;
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                alert('Please enter a valid email address.');
                emailInput.focus();
                return;
            }
            
            if (!phoneInput.value.trim()) {
                alert('Please enter your phone number.');
                phoneInput.focus();
                return;
            }
            
            if (!messageInput.value.trim()) {
                alert('Please enter your message.');
                messageInput.focus();
                return;
            }
            
            // Show success message
            alert('Thank you for your message! We will get back to you shortly.');
            this.reset();
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ============================================
    // Mobile Navigation Toggle
    // ============================================
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
        
        // Close mobile menu when clicking a nav link
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // ============================================
    // Logo Marquee Pause on Hover (Touch Devices)
    // ============================================
    const logoMarquee = document.querySelector('.logo-marquee-track');
    if (logoMarquee) {
        // For touch devices
        logoMarquee.addEventListener('touchstart', function() {
            this.style.animationPlayState = 'paused';
        });
        
        logoMarquee.addEventListener('touchend', function() {
            this.style.animationPlayState = 'running';
        });
    }

    // ============================================
    // Lazy Loading Images (Native + Fallback)
    // ============================================
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ============================================
    // Video Play Button Handler
    // ============================================
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const videoUrl = this.getAttribute('href');
            if (videoUrl && videoUrl.includes('matterport')) {
                // Let the link open naturally for Matterport tours
                return;
            }
            // For other videos, could implement a modal player here
        });
    });

    // ============================================
    // Country Cards Hover Effect
    // ============================================
    const countryCards = document.querySelectorAll('.country-card');
    countryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ============================================
    // Scroll to Top Button (Optional Enhancement)
    // ============================================
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #0E9C7E 0%, #001737 100%);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 20px rgba(14, 156, 126, 0.3);
    `;
    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect for scroll to top button
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });

    console.log('DNA Outsourcing Homepage initialized successfully.');
});
