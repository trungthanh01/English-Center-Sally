// GSAP Initialization and Animations
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

// Loading Animation
window.addEventListener('load', () => {
    // Hero Animation Timeline - TẮT TẠM THỜI ĐỂ DEBUG LAYOUT
    const heroTl = gsap.timeline();
    
    heroTl
        .to('.hero-badge', { 
            opacity: 1, 
            y: 0, 
            duration: 0.2, 
            ease: "power2.out" 
        })
        .to('.title-line-1', { 
            opacity: 1, 
            y: 0, 
            duration: 0.2, 
            ease: "power2.out" 
        }, "-=0.3")
        
        .to('.hero-subtitle', { 
            opacity: 1, 
            y: 0, 
            duration: 0.2, 
            ease: "power2.out" 
        }, "-=0.3")
        .to('.hero-stats', { 
            opacity: 1, 
            y: 0, 
            duration: 0.2, 
            ease: "power2.out" 
        }, "-=0.2")
        .to('.cta-buttons', { 
            opacity: 1, 
            y: 0, 
            duration: 0.2, 
            ease: "power2.out" 
        }, "-=0.2")
        .to('.social-proof', { 
            opacity: 1, 
            y: 0, 
            duration: 0.2, 
            ease: "power2.out" 
        }, "-=0.2")
        .to('.scroll-indicator', { 
            opacity: 1, 
            duration: 0.2, 
            ease: "power2.out" 
        }, "-=0.1");

    // Hiển thị tất cả elements ngay lập tức để debug
    gsap.set('.hero-badge, .title-line-1, .hero-subtitle, .hero-stats, .cta-buttons, .social-proof, .scroll-indicator', {
        opacity: 1,
        y: 0,
        transform: 'none'
    });

    // Counter Animation for Stats
    gsap.utils.toArray('.stat-number').forEach(counter => {
        const target = counter.textContent;
        const numericValue = parseInt(target.replace(/\D/g, ''));
        
        // Bắt đầu từ 50% giá trị đích
        const startValue = Math.floor(numericValue * 0.5);
        
        gsap.fromTo(counter, {
            textContent: startValue
        }, {
            textContent: numericValue,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            stagger: 0.2,
            onUpdate: function() {
                const currentValue = Math.ceil(this.targets()[0].textContent);
                if (target.includes('+')) {
                    counter.textContent = currentValue + '+';
                } else if (target.includes('%')) {
                    counter.textContent = currentValue + '%';
                } else {
                    counter.textContent = currentValue;
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
            duration: 0.2,
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
                duration: 0.2,
                stagger: 0.3,
                ease: "power2.out"
            }, "-=0.2");
    }
});

// Parallax effect for hero image - TẮT TẠM THỜI ĐỂ DEBUG
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

// Mobile menu functionality với hamburger animation
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuModal = document.getElementById('mobileMenuModal');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

// Toggle mobile menu
function toggleMobileMenu() {
    const isActive = mobileMenuModal.classList.contains('active');
    
    if (!isActive) {
        // Mở menu
        mobileMenuModal.classList.add('active');
        mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    } else {
        // Đóng menu  
        closeMobileMenu();
    }
}

// Close mobile menu function
function closeMobileMenu() {
    if (!mobileMenuModal.classList.contains('active')) return;

    mobileMenuModal.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
}

// Event listeners
mobileMenuBtn.addEventListener('click', toggleMobileMenu);

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

// Close menu when clicking outside (optional)
document.addEventListener('click', function(e) {
    if (mobileMenuModal.classList.contains('active') && 
        !mobileMenuModal.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
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

// Activities Section Animation
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

// Enhanced animations for all sections với scroll optimization
ScrollTrigger.create({
    trigger: ".courses",
    start: "top 80%", 
    onEnter: () => {
        gsap.to('.course-card', {
            opacity: 1,
            y: 0,
            duration: 0.2,
            stagger: 0.2,
            ease: "power2.out",
            overwrite: "auto",
            force3D: true
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
                duration: 0.2,
                ease: "power2.out"
            }, "-=0.5")
            .to('.teacher-bio p', {
                opacity: 1,
                y: 0,
                duration: 0.2,
                stagger: 0.2,
                ease: "power2.out"
            }, "-=0.3")
            .to('.teacher-achievements, .teacher-certificates, .teacher-experience, .teacher-skills', {
                opacity: 1,
                y: 0,
                duration: 0.2,
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
        gsap.from('.testimonial-slider', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out"
        });
        
        gsap.from('.testimonial-nav .nav-btn', {
            opacity: 0,
            scale: 0,
            duration: 0.2,
            stagger: 0.2,
            delay: 0.3,
            ease: "back.out(1.7)"
        });
        
        gsap.from('.testimonial-dots .dot', {
            opacity: 0,
            y: 20,
            duration: 0.2,
            stagger: 0.1,
            delay: 0.5,
            ease: "power2.out"
        });
    }
});

// Footer animation
ScrollTrigger.create({
    trigger: ".footer",
    start: "top 90%",
    onEnter: () => {
        gsap.from('.footer-section', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
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
            .from('.cta-action', {
                opacity: 0,
                scale: 0.9,
                duration: 0.2,
                ease: "back.out(1.7)"
            }, "-=0.2")
            .from('.trust-badges .trust-item', {
                opacity: 0,
                y: 20,
                duration: 0.2,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.2");
    }
});

// Testimonial Horizontal Slider
function initializeTestimonialSlider() {
    console.log('Initializing testimonial slider...');
    
    const wrapper = document.querySelector('.testimonial-wrapper');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Kiểm tra xem các elements có tồn tại không
    if (!wrapper || slides.length === 0) {
        console.error('Testimonial slider elements not found');
        return;
    }
    
    let currentSlide = 0;
    
    console.log('Found elements:', {
        wrapper: !!wrapper,
        slides: slides.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn
    });

    function scrollToSlide(index) {
        if (wrapper && slides[index]) {
            const slideWidth = wrapper.clientWidth;
            const targetScrollLeft = slideWidth * index;
            
            console.log('Scrolling to slide', index, 'at position', targetScrollLeft);
            
            wrapper.scrollTo({
                left: targetScrollLeft,
                behavior: 'smooth'
            });
            currentSlide = index;
        }
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        console.log('Next slide:', nextIndex);
        scrollToSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        console.log('Previous slide:', prevIndex);
        scrollToSlide(prevIndex);
    }

    // Event listeners cho navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
        });
        console.log('Next button event listener added');
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
        });
        console.log('Previous button event listener added');
    }

    // Update current slide dựa trên scroll position
    if (wrapper) {
        wrapper.addEventListener('scroll', () => {
            const slideWidth = wrapper.clientWidth;
            const scrollLeft = wrapper.scrollLeft;
            const newIndex = Math.round(scrollLeft / slideWidth);
            
            if (newIndex !== currentSlide && newIndex >= 0 && newIndex < slides.length) {
                console.log('Scroll detected, new index:', newIndex);
                currentSlide = newIndex;
            }
        });
    }

    // Touch/drag support cho mobile
    let isDown = false;
    let startX;
    let scrollLeft;

    if (wrapper) {
        wrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - wrapper.offsetLeft;
            scrollLeft = wrapper.scrollLeft;
        });

        wrapper.addEventListener('mouseleave', () => {
            isDown = false;
        });

        wrapper.addEventListener('mouseup', () => {
            isDown = false;
        });

        wrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - wrapper.offsetLeft;
            const walk = (x - startX) * 2;
            wrapper.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events cho mobile
        wrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - wrapper.offsetLeft;
            scrollLeft = wrapper.scrollLeft;
        });
        
        wrapper.addEventListener('touchend', () => {
            // Auto-snap to nearest slide
            const slideWidth = wrapper.clientWidth;
            const scrollLeft = wrapper.scrollLeft;
            const newIndex = Math.round(scrollLeft / slideWidth);
            if (newIndex >= 0 && newIndex < slides.length) {
                scrollToSlide(newIndex);
            }
        });
    }

    // Initialize
    // updateDots(); // Removed as per edit hint
    
    // Auto-play (optional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Chuyển slide mỗi 5 giây
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    // Start auto-play
    startAutoPlay();
    
    // Pause auto-play khi hover
    if (wrapper) {
        wrapper.addEventListener('mouseenter', stopAutoPlay);
        wrapper.addEventListener('mouseleave', startAutoPlay);
    }
    
    console.log('Testimonial slider initialized successfully');
}

// Learning Pathway - Clean & Simple Implementation
function initializeLearningPathway() {
    console.log('Initializing Learning Pathway...');
    
    // Get all necessary elements
    const optionBtns = document.querySelectorAll('.option-btn');
    const courseSections = document.querySelectorAll('.course-details-section');
    const expandBtns = document.querySelectorAll('.expand-btn');
    
    console.log('Found elements:', {
        optionBtns: optionBtns.length,
        courseSections: courseSections.length,
        expandBtns: expandBtns.length
    });
    
    // Function to switch between office workers and children
    function switchTarget(targetId) {
        console.log('Switching to target:', targetId);
        
        // Update active button
        optionBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-target') === targetId);
        });
        
        // Show/hide course sections
        courseSections.forEach(section => {
            section.classList.toggle('active', section.id === targetId);
        });
    }
    
    // Function to toggle course content
    function toggleCourseContent(contentId, btn) {
        const content = document.getElementById(contentId);
        if (!content) {
            console.error('Content not found:', contentId);
            return;
        }
        
        const isActive = content.classList.contains('active');
        
        if (isActive) {
            // Close content
            content.classList.remove('active');
            btn.classList.remove('expanded');
        } else {
            // Open content
            content.classList.add('active');
            btn.classList.add('expanded');
        }
        
        console.log('Toggled content:', contentId, 'Active:', !isActive);
    }
    
    // Add event listeners for option buttons
    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            switchTarget(target);
        });
    });
    
    // Add event listeners for expand buttons
    expandBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = btn.getAttribute('data-target');
            toggleCourseContent(targetId, btn);
        });
    });
    
    // Initialize with office section active
    const officeSection = document.getElementById('office');
    if (officeSection) {
        officeSection.classList.add('active');
        console.log('Office section activated by default');
    }
    
    // Set first option button as active
    if (optionBtns.length > 0) {
        optionBtns[0].classList.add('active');
        console.log('First option button activated');
    }
    
    console.log('Learning Pathway initialized successfully');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing components...');
    
    // Initialize Learning Pathway
    initializeLearningPathway();
    
    // Initialize Testimonial Slider
    initializeTestimonialSlider();
    
    console.log('All components initialized');
});

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

