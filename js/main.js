/* ========================================
   LUMIE DENTAL — MAIN JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ========== NAVBAR SCROLL ==========
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ========== MOBILE MENU ==========
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ========== FADE IN ON SCROLL ==========
    const fadeElements = document.querySelectorAll('.service-card, .why-card, .doctor-card, .location-card, .section-header');
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 80);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // ========== TESTIMONIAL SLIDER ==========
    const track = document.getElementById('testimonialTrack');
    let currentSlide = 0;
    let autoSlide;

    function getTotalSlides() {
        return track.querySelectorAll('.testimonial-card').length;
    }

    function slideTestimonial(direction) {
        const total = getTotalSlides();
        currentSlide += direction;
        if (currentSlide < 0) currentSlide = total - 1;
        if (currentSlide >= total) currentSlide = 0;
        
        const card = track.querySelector('.testimonial-card');
        const cardWidth = card.offsetWidth;
        track.scrollTo({ left: cardWidth * currentSlide, behavior: 'smooth' });
        
        resetAutoSlide();
    }

    // Make slideTestimonial globally available
    window.slideTestimonial = slideTestimonial;

    function startAutoSlide() {
        autoSlide = setInterval(() => slideTestimonial(1), 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    startAutoSlide();

    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', startAutoSlide);

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoSlide);
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? slideTestimonial(1) : slideTestimonial(-1);
        }
        startAutoSlide();
    }, { passive: true });

    // ========== ACTIVE NAV LINK ==========
    const sections = document.querySelectorAll('section[id]');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => sectionObserver.observe(section));

    console.log('🦷 Lumie Dental Website loaded successfully!');
});
