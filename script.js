// JavaScript for HTML Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Set initial active state
    
    // Create floating particles
    function createParticles() {
        const particlesContainer = document.querySelector('.particles-container');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    // Create floating orbs
    function createOrbs() {
        const orbsContainer = document.querySelector('.floating-orbs');
        if (!orbsContainer) return;
        
        for (let i = 0; i < 3; i++) {
            const orb = document.createElement('div');
            orb.className = 'orb';
            orbsContainer.appendChild(orb);
        }
    }
    
    // Initialize background effects
    createParticles();
    createOrbs();
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-slide-up');
            }
        });
    }, observerOptions);
    
    // Observe all sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.particle, .orb');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index % 3) * 0.2;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Typing animation for hero text
    function typeWriter(element, text, delay = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, delay);
            }
        }
        
        type();
    }
    
    // Initialize typing animation for subtitle
    const subtitle = document.querySelector('#hero h2');
    if (subtitle) {
        const originalText = subtitle.textContent;
        setTimeout(() => {
            typeWriter(subtitle, originalText, 50);
        }, 1000);
    }
    
    // // Cursor glow effect
    // document.addEventListener('mousemove', (e) => {
    //     const cursor = document.createElement('div');
    //     cursor.className = 'cursor-glow';
    //     cursor.style.cssText = `
    //         position: fixed;
    //         left: ${e.clientX}px;
    //         top: ${e.clientY}px;
    //         width: 30px;
    //         height: 30px;
    //         background: radial-gradient(circle, rgba(3, 238, 255, 0.3), transparent);
    //         pointer-events: none;
    //         border-radius: 20%;
    //         transform: translate(-25%, -25%);
    //         z-index: 9999;
    //         transition: opacity 0.3s ease;
    //     `;
        
    //     document.body.appendChild(cursor);
        
    //     setTimeout(() => {
    //         cursor.style.opacity = '0';
    //         setTimeout(() => {
    //             document.body.removeChild(cursor);
    //         }, 300);
    //     }, 100);
    // });
    
    // Skills progress animation
    function animateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    }
    
    // Trigger skills animation when skills section is visible
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
    }
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const optimizedScroll = debounce(() => {
    // Any scroll-based animations can go here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScroll);




















// // JavaScript for HTML Portfolio

// document.addEventListener('DOMContentLoaded', function() {
//     // ... (Your existing code for mobile menu, smooth scrolling, etc.) ...

//     // Intersection Observer for scroll animations
//     const observerOptions = {
//         root: null, // Use the viewport as the root
//         rootMargin: '0px',
//         threshold: 0.2 // Trigger when 20% of the element is visible
//     };

//     const observer = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 // Add the 'fade-in' class to trigger the animation
//                 entry.target.classList.add('fade-in');

//                 // Stop observing after the animation is triggered once
//                 observer.unobserve(entry.target);
//             }
//         });
//     }, observerOptions);

//     // Observe all sections for animations
//     document.querySelectorAll('section').forEach(section => {
//         // Initially hide the sections so the animation can be applied
//         section.style.opacity = '0'; 
//         observer.observe(section);
//     });

//     // ... (Your existing code for background effects, contact form, etc.) ...
// });