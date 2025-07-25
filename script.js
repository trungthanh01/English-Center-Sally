 // Mobile menu functionality
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const mobileMenuModal = document.getElementById('mobileMenuModal');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

        // Open mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuOverlay.style.display = 'block';
            mobileMenuModal.style.display = 'block';
            
            // Trigger animations
            setTimeout(() => {
                mobileMenuOverlay.classList.add('active');
                mobileMenuModal.classList.add('active');
            }, 10);
        });

        // Close mobile menu function
        function closeMobileMenu() {
            mobileMenuOverlay.classList.remove('active');
            mobileMenuModal.classList.remove('active');
            
            setTimeout(() => {
                mobileMenuOverlay.style.display = 'none';
                mobileMenuModal.style.display = 'none';
            }, 300);
        }

        // Close mobile menu events
        mobileMenuClose.addEventListener('click', closeMobileMenu);
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);

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

        // Timeline Courses Pathway Animation (Grouped)
    // Khi user scroll tới biểu đồ, animation sẽ chạy 1 lần cho mỗi cấp độ

    document.addEventListener('DOMContentLoaded', function () {
        const chartSection = document.querySelector('.courses-pathway');
        const chartGroups = document.querySelectorAll('.chart-group');
        let started = false;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                started = true;
                chartGroups.forEach(group => {
                const days = parseInt(group.dataset.days);
                const factor = parseFloat(group.dataset.factor);
                const maxHeight = 180 * factor;
                const dayDisplay = group.querySelector('.chart-day');
                const bars = group.querySelectorAll('.chart-bar');

                let currentDay = 0;
                const interval = setInterval(() => {
                    if (currentDay >= days) {
                    clearInterval(interval);
                    } else {
                    currentDay++;
                    bars.forEach(bar => {
                        bar.style.height = (currentDay / days) * maxHeight + 'px';
                    });
                    dayDisplay.textContent = `Ngày ${currentDay}`;
                    }
                }, 20);
                });
                observer.unobserve(chartSection);
            }
            });
        }, { threshold: 0.2 });

        if (chartSection) {
            observer.observe(chartSection);
        }
    });
    console.log(chartGroups);