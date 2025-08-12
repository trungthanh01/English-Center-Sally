// GSAP Initialization and Animations
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

// Loading Animation
window.addEventListener('load', () => {
    // Hero Animation Timeline
    const heroTl = gsap.timeline();
    
    heroTl
        .to('.hero-badge', { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power2.out" 
        })
        .to('.title-line-1', { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "power2.out" 
        }, "-=0.3")
        .to('.title-line-2', { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "power2.out" 
        }, "-=0.4")
        .to('.title-line-3', { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "power2.out" 
        }, "-=0.4")
        .to('.hero-subtitle', { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "power2.out" 
        }, "-=0.3")
        .to('.hero-stats', { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "power2.out" 
        }, "-=0.2")
        .to('.cta-buttons', { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "power2.out" 
        }, "-=0.2")
        .to('.social-proof', { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "power2.out" 
        }, "-=0.2")
        .to('.scroll-indicator', { 
            opacity: 1, 
            duration: 0.5, 
            ease: "power2.out" 
        }, "-=0.1");

    // Counter Animation for Stats
    gsap.utils.toArray('.stat-number').forEach(counter => {
        const target = counter.textContent;
        const numericValue = parseInt(target.replace(/\D/g, ''));
        
        gsap.from(counter, {
            textContent: 0,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            stagger: 0.2,
            onUpdate: function() {
                if (target.includes('+')) {
                    counter.textContent = Math.ceil(this.targets()[0].textContent) + '+';
                } else if (target.includes('%')) {
                    counter.textContent = Math.ceil(this.targets()[0].textContent) + '%';
                } else {
                    counter.textContent = Math.ceil(this.targets()[0].textContent);
                }
            }
        });
    });
});

// Scroll-triggered animations
ScrollTrigger.create({
    trigger: ".story-section",
    start: "top 80%",
    onEnter: () => {
        // Problem cards animation
        gsap.to('.problem-card', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out"
        });
    }
});

ScrollTrigger.create({
    trigger: ".story-transition",
    start: "top 80%",
    onEnter: () => {
        gsap.to('.story-transition', {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        });
    }
});

ScrollTrigger.create({
    trigger: ".sally-story",
    start: "top 80%",
    onEnter: () => {
        const storyTl = gsap.timeline();
        
        storyTl
            .to('.story-image', {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out"
            })
            .to('.story-text', {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.4")
            .to('.journey-step', {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.3,
                ease: "power2.out"
            }, "-=0.2");
    }
});

// Parallax effect for hero image
gsap.to('.hero-image img', {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuModal = document.getElementById('mobileMenuModal');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

        // Open mobile menu
        // Open mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuModal.style.display = 'block';

        // Bỏ setTimeout 10ms, dùng 2 lần rAF để chắc chắn browser đã apply display
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                mobileMenuModal.classList.add('active');
            });
        });
    });

// Close mobile menu function
function closeMobileMenu() {
    if (!mobileMenuModal.classList.contains('active')) return;

    mobileMenuModal.classList.remove('active');

    // Chờ transition kết thúc mới display:none để animation đóng mượt
    const handle = (e) => {
        if (e.propertyName !== 'transform') return;
        mobileMenuModal.style.display = 'none';
        mobileMenuModal.removeEventListener('transitionend', handle);
    };
    mobileMenuModal.addEventListener('transitionend', handle, { once: true });
}

        // Close mobile menu events
        mobileMenuClose.addEventListener('click', closeMobileMenu);

        // Close menu when clicking menu links
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#ffffff';
                header.style.backdropFilter = 'none';
            }
        });

        //Activities Section Animation
        document.addEventListener('DOMContentLoaded', function () {
        const contents = document.querySelectorAll('.timeline-content');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
            });
        }, {
            threshold: 0.2
        });

        contents.forEach(content => observer.observe(content));
        });

// Enhanced animations for all sections
ScrollTrigger.create({
    trigger: ".courses",
    start: "top 80%",
    onEnter: () => {
        gsap.to('.course-card', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.3,
            ease: "power2.out"
        });
    }
});

// Timeline Courses Pathway Animation (Enhanced with GSAP)
ScrollTrigger.create({
    trigger: ".courses-pathway",
    start: "top 80%",
    onEnter: () => {
        const chartGroups = document.querySelectorAll('.chart-group');
        
        chartGroups.forEach((group, index) => {
            const days = parseInt(group.dataset.days);
            const factor = parseFloat(group.dataset.factor);
            const maxHeight = 180 * factor;
            const dayDisplay = group.querySelector('.chart-day');
            const bars = group.querySelectorAll('.chart-bar');

            // Initial animation for chart appearance
            gsap.from(group, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: index * 0.3,
                ease: "power2.out"
            });

            // Animated counter for days
            gsap.to({}, {
                duration: 2,
                delay: index * 0.3 + 0.5,
                onUpdate: function() {
                    const progress = this.progress();
                    const currentDay = Math.ceil(progress * days);
                    dayDisplay.textContent = `Ngày ${currentDay}`;
                    
                    bars.forEach(bar => {
                        bar.style.height = progress * maxHeight + 'px';
                    });
                },
                ease: "power2.out"
            });
        });
    }
});

// Activities section animations
ScrollTrigger.create({
    trigger: ".activities-section",
    start: "top 80%",
    onEnter: () => {
        gsap.to('.timeline-content', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.4,
            ease: "power2.out"
        });
    }
});

// Teacher section animation
ScrollTrigger.create({
    trigger: ".teacher",
    start: "top 80%",
    onEnter: () => {
        const teacherTl = gsap.timeline();
        
        teacherTl
            .to('.teacher-image', {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 1,
                ease: "back.out(1.7)"
            })
            .to('.teacher-name', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.5")
            .to('.teacher-bio p', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: "power2.out"
            }, "-=0.3")
            .to('.teacher-achievements, .teacher-certificates, .teacher-experience, .teacher-skills', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: "power2.out"
            }, "-=0.2");
    }
});

// Testimonials scroll animation
ScrollTrigger.create({
    trigger: ".testimonials",
    start: "top 80%",
    onEnter: () => {
        gsap.to('.testimonial-card', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });
    }
});

// Contact section animation
ScrollTrigger.create({
    trigger: ".contact-boxes",
    start: "top 80%",
    onEnter: () => {
        gsap.to('.contact-box', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)"
        });
    }
});

// Final CTA animation
ScrollTrigger.create({
    trigger: ".final-cta",
    start: "top 80%",
    onEnter: () => {
        const ctaTl = gsap.timeline();
        
        ctaTl
            .from('.cta-urgency', {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: "power2.out"
            })
            .from('.cta-title', {
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.3")
            .from('.cta-subtitle', {
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.2")
            .from('.cta-benefits .benefit-item', {
                opacity: 0,
                x: -30,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.2")
            .from('.cta-action', {
                opacity: 0,
                scale: 0.9,
                duration: 0.6,
                ease: "back.out(1.7)"
            }, "-=0.2")
            .from('.trust-badges .trust-item', {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.2");
    }
});

// Countdown Timer
function startCountdown() {
    // Set countdown to 7 days from now
    const now = new Date().getTime();
    const countdownDate = now + (7 * 24 * 60 * 60 * 1000);
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Add animation on seconds change
        if (seconds % 5 === 0) {
            gsap.to('.countdown-number', {
                scale: 1.1,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        }
        
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('countdown').innerHTML = '<p style="color: var(--secondary); font-weight: 700;">Ưu đãi đã kết thúc!</p>';
        }
    }, 1000);
}

// Start countdown when page loads
document.addEventListener('DOMContentLoaded', startCountdown);

// Mobile Optimization
function isMobile() {
    return window.innerWidth <= 768;
}

// Reduce animations on mobile for better performance
if (isMobile()) {
    // Reduce animation durations
    gsap.globalTimeline.timeScale(1.5);
    
    // Disable parallax on mobile
    ScrollTrigger.refresh();
}

// Performance optimization - Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(10); // Speed up animations significantly
    gsap.set('*', { animation: 'none !important' });
}

// Lazy loading for better performance
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Smooth scrolling optimization for mobile
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            // Header background change optimization
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(74, 71, 163, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--primary)';
                header.style.backdropFilter = 'none';
            }
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Touch-friendly hover effects for mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.course-card, .contact-box, .problem-card').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Interactive hover effects with GSAP
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -10,
            boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Smooth scroll enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: {
                    y: target,
                    offsetY: 100
                },
                ease: "power2.inOut"
            });
        }
    });
});
