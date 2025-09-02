// School Website Interactive Features
class SchoolWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.animateOnLoad();
        this.setupIntersectionObserver();
        this.addParticleEffect();
        this.setupTypewriterEffect();
    }

    setupEventListeners() {
        // Tab switching functionality
        const navItems = document.querySelectorAll('.nav-item');
        const contentSections = document.querySelectorAll('.content-section');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const targetTab = e.currentTarget.dataset.tab;
                this.switchTab(targetTab, navItems, contentSections);
            });
        });

        // Gallery filter functionality
        this.setupGalleryFilters();

        // Add hover effects to cards
        this.setupCardHoverEffects();
        
        // Add click animations
        this.setupClickAnimations();
        
        // Setup smooth scrolling
        this.setupSmoothScrolling();
    }

    switchTab(targetTab, navItems, contentSections) {
        // Remove active class from all nav items and content sections
        navItems.forEach(item => item.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));

        // Add active class to clicked nav item
        const activeNavItem = document.querySelector(`[data-tab="${targetTab}"]`);
        activeNavItem.classList.add('active');

        // Show target content section with animation
        const targetSection = document.getElementById(targetTab);
        targetSection.classList.add('active');

        // Add ripple effect to clicked tab
        this.addRippleEffect(activeNavItem);

        // Trigger content animation
        this.animateContentOnSwitch(targetSection);
    }

    addRippleEffect(element) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: 20px;
            height: 20px;
            left: 50%;
            top: 50%;
            margin-left: -10px;
            margin-top: -10px;
        `;

        element.appendChild(ripple);

        // Add ripple animation keyframes if not exists
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    animateContentOnSwitch(section) {
        // Animate cards with staggered effect
        const cards = section.querySelectorAll('.student-card, .teacher-card, .subject-card, .event-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Animate list items in syllabus
        const listItems = section.querySelectorAll('li');
        listItems.forEach((item, index) => {
            item.style.setProperty('--i', index);
        });
    }

    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.student-card, .teacher-card, .subject-card, .event-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addFloatingParticles(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeFloatingParticles(card);
            });
        });
    }

    addFloatingParticles(element) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.classList.add('floating-particle');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--accent-color);
                border-radius: 50%;
                pointer-events: none;
                animation: particleFloat 2s ease-out forwards;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                z-index: 100;
            `;

            element.appendChild(particle);

            // Add particle animation if not exists
            if (!document.querySelector('#particle-styles')) {
                const style = document.createElement('style');
                style.id = 'particle-styles';
                style.textContent = `
                    @keyframes particleFloat {
                        0% {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                        100% {
                            opacity: 0;
                            transform: translateY(-50px) scale(0);
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    }

    removeFloatingParticles(element) {
        const particles = element.querySelectorAll('.floating-particle');
        particles.forEach(particle => particle.remove());
    }

    setupClickAnimations() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.student-card, .teacher-card, .subject-card')) {
                const card = e.target.closest('.student-card, .teacher-card, .subject-card');
                this.addClickExplosion(e.clientX, e.clientY);
                
                // Add temporary sparkle class
                card.classList.add('sparkle');
                setTimeout(() => {
                    card.classList.remove('sparkle');
                }, 2000);
            }
        });
    }

    addClickExplosion(x, y) {
        for (let i = 0; i < 8; i++) {
            const explosion = document.createElement('div');
            explosion.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: var(--accent-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${x}px;
                top: ${y}px;
                animation: explode 0.8s ease-out forwards;
            `;

            const angle = (i / 8) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            
            explosion.style.setProperty('--end-x', `${Math.cos(angle) * distance}px`);
            explosion.style.setProperty('--end-y', `${Math.sin(angle) * distance}px`);

            document.body.appendChild(explosion);

            // Add explosion animation if not exists
            if (!document.querySelector('#explosion-styles')) {
                const style = document.createElement('style');
                style.id = 'explosion-styles';
                style.textContent = `
                    @keyframes explode {
                        0% {
                            opacity: 1;
                            transform: translate(0, 0) scale(1);
                        }
                        100% {
                            opacity: 0;
                            transform: translate(var(--end-x), var(--end-y)) scale(0);
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            setTimeout(() => {
                explosion.remove();
            }, 800);
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loading');
                    
                    // Trigger card animations
                    const cards = entry.target.querySelectorAll('.student-card, .teacher-card, .subject-card, .event-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animation = `cardSlideIn 0.6s ease forwards`;
                        }, index * 100);
                    });
                }
            });
        });

        // Add slide-in animation styles
        if (!document.querySelector('#slide-styles')) {
            const style = document.createElement('style');
            style.id = 'slide-styles';
            style.textContent = `
                @keyframes cardSlideIn {
                    from {
                        opacity: 0;
                        transform: translateX(-50px) rotateY(-15deg);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0) rotateY(0deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => observer.observe(section));
    }

    animateOnLoad() {
        // Animate header elements
        const headerElements = document.querySelectorAll('.header > *');
        headerElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(-30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Animate navigation
        const navigation = document.querySelector('.navigation');
        navigation.style.opacity = '0';
        navigation.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            navigation.style.transition = 'all 0.8s ease';
            navigation.style.opacity = '1';
            navigation.style.transform = 'translateY(0)';
        }, 600);

        // Animate initial content
        setTimeout(() => {
            const activeSection = document.querySelector('.content-section.active');
            this.animateContentOnSwitch(activeSection);
        }, 1000);
    }

    setupSmoothScrolling() {
        // Add smooth scrolling behavior
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    addParticleEffect() {
        // Create floating particles in background
        setInterval(() => {
            this.createBackgroundParticle();
        }, 3000);
    }

    createBackgroundParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 5;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            opacity: 0.6;
            animation: particleRise 8s linear forwards;
        `;

        document.body.appendChild(particle);

        // Add particle rise animation if not exists
        if (!document.querySelector('#particle-rise-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-rise-styles';
            style.textContent = `
                @keyframes particleRise {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0.6;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            particle.remove();
        }, 8000);
    }

    setupTypewriterEffect() {
        // Add typewriter effect to section descriptions
        const descriptions = document.querySelectorAll('.section-header p');
        
        descriptions.forEach(desc => {
            const text = desc.textContent;
            desc.textContent = '';
            desc.style.borderRight = '2px solid var(--accent-color)';
            
            let index = 0;
            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    desc.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(typeInterval);
                    desc.style.borderRight = 'none';
                }
            }, 50);
        });
    }

    // Advanced animation utilities
    addShakeAnimation(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        
        if (!document.querySelector('#shake-styles')) {
            const style = document.createElement('style');
            style.id = 'shake-styles';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }

    addPulseAnimation(element) {
        element.style.animation = 'pulse 1s ease-in-out';
        
        if (!document.querySelector('#pulse-styles')) {
            const style = document.createElement('style');
            style.id = 'pulse-styles';
            style.textContent = `
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            element.style.animation = '';
        }, 1000);
    }

    // Theme switching functionality (bonus feature)
    switchTheme(newTheme) {
        const root = document.documentElement;
        
        const themes = {
            default: {
                '--primary-bg': '#F5F5DC',
                '--secondary-bg': '#FAEBD7',
                '--text-primary': '#F8F8FF',
                '--text-secondary': '#E6E6FA',
                '--accent-color': '#DEB887',
                '--hover-color': '#D2B48C'
            },
            dark: {
                '--primary-bg': '#2C2C2C',
                '--secondary-bg': '#3C3C3C',
                '--text-primary': '#F8F8FF',
                '--text-secondary': '#E6E6FA',
                '--accent-color': '#FFD700',
                '--hover-color': '#FFA500'
            },
            ocean: {
                '--primary-bg': '#E0F6FF',
                '--secondary-bg': '#B8E6FF',
                '--text-primary': '#003366',
                '--text-secondary': '#004080',
                '--accent-color': '#0077BE',
                '--hover-color': '#0066A0'
            }
        };

        if (themes[newTheme]) {
            Object.entries(themes[newTheme]).forEach(([property, value]) => {
                root.style.setProperty(property, value);
            });
        }
    }

    // Special effects for enhanced user experience
    addConfettiEffect() {
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${this.getRandomColor()};
                left: ${Math.random() * 100}vw;
                top: -10px;
                z-index: 1000;
                animation: confettiFall 3s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;

            document.body.appendChild(confetti);

            if (!document.querySelector('#confetti-styles')) {
                const style = document.createElement('style');
                style.id = 'confetti-styles';
                style.textContent = `
                    @keyframes confettiFall {
                        to {
                            transform: translateY(100vh) rotate(720deg);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }

    getRandomColor() {
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Add interactive sound effects (visual feedback)
    addSoundVisualFeedback(element) {
        const feedback = document.createElement('div');
        feedback.textContent = '♪';
        feedback.style.cssText = `
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            color: var(--accent-color);
            font-size: 1.5rem;
            pointer-events: none;
            animation: soundWave 1s ease-out forwards;
        `;

        element.style.position = 'relative';
        element.appendChild(feedback);

        if (!document.querySelector('#sound-styles')) {
            const style = document.createElement('style');
            style.id = 'sound-styles';
            style.textContent = `
                @keyframes soundWave {
                    0% {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-30px) scale(1.5);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            feedback.remove();
        }, 1000);
    }

    // Gallery filter functionality
    setupGalleryFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInScale 0.5s ease forwards';
                    } else {
                        item.style.animation = 'fadeOutScale 0.3s ease forwards';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Add filter animation styles
        if (!document.querySelector('#gallery-filter-styles')) {
            const style = document.createElement('style');
            style.id = 'gallery-filter-styles';
            style.textContent = `
                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                @keyframes fadeOutScale {
                    from {
                        opacity: 1;
                        transform: scale(1);
                    }
                    to {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Easter egg: Konami code for confetti
    setupKonamiCode() {
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        let konamiIndex = 0;

        document.addEventListener('keydown', (e) => {
            if (e.code === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    this.addConfettiEffect();
                    konamiIndex = 0;
                    
                    // Show easter egg message
                    const message = document.createElement('div');
                    message.textContent = '🎉 Congratulations! You found the easter egg! 🎉';
                    message.style.cssText = `
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: var(--gradient-accent);
                        color: var(--text-primary);
                        padding: 20px 40px;
                        border-radius: 15px;
                        font-weight: 600;
                        z-index: 10000;
                        animation: popIn 0.5s ease-out;
                    `;

                    document.body.appendChild(message);

                    setTimeout(() => {
                        message.remove();
                    }, 3000);
                }
            } else {
                konamiIndex = 0;
            }
        });

        // Add pop-in animation
        if (!document.querySelector('#pop-styles')) {
            const style = document.createElement('style');
            style.id = 'pop-styles';
            style.textContent = `
                @keyframes popIn {
                    0% {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.5);
                    }
                    100% {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Enhanced interaction features
class InteractionEnhancer {
    constructor() {
        this.setupAdvancedEffects();
    }

    setupAdvancedEffects() {
        // Magnetic effect for buttons and cards
        this.setupMagneticEffect();
        
        // 3D tilt effect
        this.setup3DTilt();
        
        // Parallax scrolling for background elements
        this.setupParallaxScrolling();
    }

    setupMagneticEffect() {
        const magneticElements = document.querySelectorAll('.nav-item, .student-card, .teacher-card');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.1;
                const moveY = y * 0.1;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });
    }

    setup3DTilt() {
        const tiltElements = document.querySelectorAll('.teacher-card, .subject-card');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });
    }

    setupParallaxScrolling() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-shape');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const website = new SchoolWebsite();
    const enhancer = new InteractionEnhancer();
    
    // Setup Konami code for fun
    website.setupKonamiCode();
    
    // Add welcome animation
    setTimeout(() => {
        const welcome = document.createElement('div');
        welcome.textContent = 'Welcome to Adamjee Cantonment Public School! 🎓';
        welcome.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--gradient-accent);
            color: var(--text-primary);
            padding: 15px 25px;
            border-radius: 25px;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.5s ease-out, fadeOut 0.5s ease-out 3s forwards;
            box-shadow: 0 10px 30px var(--shadow-color);
        `;

        document.body.appendChild(welcome);

        // Add slide-in animation
        if (!document.querySelector('#welcome-styles')) {
            const style = document.createElement('style');
            style.id = 'welcome-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes fadeOut {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            welcome.remove();
        }, 4000);
    }, 2000);
    
    // Initialize slideshows
    initializeSlideshows();
});

// Slideshow functionality
let currentMainSlide = 0;
let currentStudentSlide = 0;
let mainSlideInterval;
let studentSlideInterval;

// Main slideshow functions
function showMainSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!slides.length) return;
    
    if (n >= slides.length) { currentMainSlide = 0; }
    if (n < 0) { currentMainSlide = slides.length - 1; }
    
    // Hide all slides and remove active indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current slide and highlight indicator
    slides[currentMainSlide].classList.add('active');
    if (indicators[currentMainSlide]) {
        indicators[currentMainSlide].classList.add('active');
    }
}

function changeSlide(n) {
    clearInterval(mainSlideInterval);
    currentMainSlide += n;
    showMainSlide(currentMainSlide);
    startMainSlideshow();
}

function currentSlide(n) {
    clearInterval(mainSlideInterval);
    currentMainSlide = n - 1;
    showMainSlide(currentMainSlide);
    startMainSlideshow();
}

function startMainSlideshow() {
    mainSlideInterval = setInterval(() => {
        currentMainSlide++;
        showMainSlide(currentMainSlide);
    }, 5000); // Change slide every 5 seconds
}

// Student slideshow functions
function showStudentSlide(n) {
    const slides = document.querySelectorAll('.student-slide');
    const indicators = document.querySelectorAll('.student-indicator');
    
    if (!slides.length) return;
    
    if (n >= slides.length) { currentStudentSlide = 0; }
    if (n < 0) { currentStudentSlide = slides.length - 1; }
    
    // Hide all slides and remove active indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current slide and highlight indicator
    slides[currentStudentSlide].classList.add('active');
    if (indicators[currentStudentSlide]) {
        indicators[currentStudentSlide].classList.add('active');
    }
}

function changeStudentSlide(n) {
    clearInterval(studentSlideInterval);
    currentStudentSlide += n;
    showStudentSlide(currentStudentSlide);
    startStudentSlideshow();
}

function currentStudentSlide(n) {
    clearInterval(studentSlideInterval);
    currentStudentSlide = n - 1;
    showStudentSlide(currentStudentSlide);
    startStudentSlideshow();
}

function startStudentSlideshow() {
    studentSlideInterval = setInterval(() => {
        currentStudentSlide++;
        showStudentSlide(currentStudentSlide);
    }, 4000); // Change slide every 4 seconds
}

function initializeSlideshows() {
    // Initialize main slideshow
    if (document.querySelector('.slideshow-container')) {
        showMainSlide(currentMainSlide);
        startMainSlideshow();
        
        // Pause slideshow on hover
        const mainSlideshowContainer = document.querySelector('.slideshow-container');
        mainSlideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(mainSlideInterval);
        });
        
        mainSlideshowContainer.addEventListener('mouseleave', () => {
            startMainSlideshow();
        });
    }
    
    // Initialize student slideshow
    if (document.querySelector('.student-slideshow-container')) {
        showStudentSlide(currentStudentSlide);
        startStudentSlideshow();
        
        // Pause slideshow on hover
        const studentSlideshowContainer = document.querySelector('.student-slideshow-container');
        studentSlideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(studentSlideInterval);
        });
        
        studentSlideshowContainer.addEventListener('mouseleave', () => {
            startStudentSlideshow();
        });
    }
}

// Make functions globally accessible for onclick events
window.changeSlide = changeSlide;
window.currentSlide = currentSlide;
window.changeStudentSlide = changeStudentSlide;
window.currentStudentSlide = currentStudentSlide;
