// Navbar scroll effect with smooth transition
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add pulse effect to target section
                target.style.animation = 'sectionPulse 0.6s ease-out';
                setTimeout(() => {
                    target.style.animation = '';
                }, 600);
            }
        }
    });
});

// Add CSS for section pulse
const style = document.createElement('style');
style.textContent = `
    @keyframes sectionPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.01); }
        100% { transform: scale(1); }
    }
    
    @keyframes dataFlow {
        0% { transform: translateX(-100%) translateY(-50%); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateX(100%) translateY(-50%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Add flowing data particles on navbar hover
const navbar = document.querySelector('.navbar');
let particleInterval;

navbar.addEventListener('mouseenter', function() {
    particleInterval = setInterval(() => {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'linear-gradient(90deg, #0B9FD8, #0D5E7D)';
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = '0';
        particle.style.pointerEvents = 'none';
        particle.style.animation = 'dataFlow 3s ease-in-out forwards';
        particle.style.boxShadow = '0 0 10px rgba(11, 159, 216, 0.5)';
        particle.style.zIndex = '1';
        
        this.style.position = 'relative';
        this.appendChild(particle);
        
        setTimeout(() => particle.remove(), 3000);
    }, 300);
});

navbar.addEventListener('mouseleave', function() {
    clearInterval(particleInterval);
});

// Animate blog cards with stagger effect on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.blog-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
});

// Add AI pulse effect to CTA buttons
document.querySelectorAll('.cta-button, .btn-primary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px rgba(11, 159, 216, 0.6), 0 0 60px rgba(11, 159, 216, 0.3)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// Add typing indicator effect to hero section
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    heroSubtitle.addEventListener('mouseenter', function() {
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.style.animation = 'blink 1s infinite';
        cursor.style.marginLeft = '2px';
        cursor.style.color = '#0B9FD8';
        this.appendChild(cursor);
        
        const blinkStyle = document.createElement('style');
        blinkStyle.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(blinkStyle);
        
        setTimeout(() => cursor.remove(), 3000);
    });
}

// Add interactive grid background to sections on hover
document.querySelectorAll('section').forEach(section => {
    section.addEventListener('mouseenter', function() {
        if (!this.querySelector('.grid-overlay')) {
            const grid = document.createElement('div');
            grid.className = 'grid-overlay';
            grid.style.position = 'absolute';
            grid.style.top = '0';
            grid.style.left = '0';
            grid.style.width = '100%';
            grid.style.height = '100%';
            grid.style.background = 'linear-gradient(90deg, rgba(11, 159, 216, 0.02) 1px, transparent 1px), linear-gradient(rgba(11, 159, 216, 0.02) 1px, transparent 1px)';
            grid.style.backgroundSize = '50px 50px';
            grid.style.pointerEvents = 'none';
            grid.style.opacity = '0';
            grid.style.transition = 'opacity 0.5s ease';
            grid.style.zIndex = '0';
            
            this.style.position = 'relative';
            this.insertBefore(grid, this.firstChild);
            
            setTimeout(() => {
                grid.style.opacity = '1';
            }, 10);
        }
    });
    
    section.addEventListener('mouseleave', function() {
        const grid = this.querySelector('.grid-overlay');
        if (grid) {
            grid.style.opacity = '0';
            setTimeout(() => grid.remove(), 500);
        }
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnToggle = mobileToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
});

// Sparkle Effect for Blog Cards
document.addEventListener('DOMContentLoaded', function() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        // Create sparkle elements
        for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            
            // Random size (small, medium, large)
            const sizes = ['10px', '14px', '18px', '12px', '16px'];
            const size = sizes[Math.floor(Math.random() * sizes.length)];
            
            // Random position around the card
            const angle = (Math.PI * 2 * i) / 12;
            const distance = 80 + Math.random() * 40;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            // Random delay
            const delay = Math.random() * 0.5;
            
            sparkle.style.setProperty('--size', size);
            sparkle.style.setProperty('--tx', `${tx}px`);
            sparkle.style.setProperty('--ty', `${ty}px`);
            sparkle.style.setProperty('--delay', `${delay}s`);
            sparkle.style.left = '50%';
            sparkle.style.top = '50%';
            
            card.appendChild(sparkle);
        }
        
        // Reset animation on mouse leave
        card.addEventListener('mouseleave', function() {
            setTimeout(() => {
                const sparkles = card.querySelectorAll('.sparkle');
                sparkles.forEach(sparkle => {
                    sparkle.style.animation = 'none';
                    setTimeout(() => {
                        sparkle.style.animation = '';
                    }, 10);
                });
            }, 2000);
        });
    });
});
