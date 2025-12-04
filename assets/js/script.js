// Open Demo Menu from Navigation
function openDemoMenu() {
    console.log('openDemoMenu called');
    const demoHTML = `
        <div class="demo-modal" id="demoMenuModal" onclick="if(event.target.id==='demoMenuModal') closeDemoMenu()">
            <div class="demo-menu-container-large">
                <button class="demo-close" onclick="closeDemoMenu()">&times;</button>
                <h2 style="text-align: center; margin-bottom: 10px; font-size: 32px; color: #1e293b;">
                    <span style="background: linear-gradient(135deg, #0B9FD8, #0D5E7D); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Interactive</span> AI Demos
                </h2>
                <p style="text-align: center; color: #64748b; margin-bottom: 40px; font-size: 16px;">Choose your industry to see AI in action</p>
                
                <!-- Real Estate Sector -->
                <div class="demo-sector">
                    <h3 class="sector-title">🏠 Real Estate</h3>
                    <div class="demo-menu-options">
                        <div class="demo-menu-card" onclick="window.location.href='demo.html?scenario=1';">
                            <div class="demo-menu-icon">🏘️</div>
                            <h4>Property Rental</h4>
                            <p>Help customers find their perfect rental apartment</p>
                            <div class="demo-play-btn">▶ Watch Demo</div>
                        </div>
                        <div class="demo-menu-card" onclick="window.location.href='demo.html?scenario=2';">
                            <div class="demo-menu-icon">🏡</div>
                            <h4>Home Purchase</h4>
                            <p>Assist buyers in finding and purchasing their dream home</p>
                            <div class="demo-play-btn">▶ Watch Demo</div>
                        </div>
                    </div>
                </div>
                
                <!-- E-Commerce Sector -->
                <div class="demo-sector">
                    <h3 class="sector-title">🛍️ E-Commerce</h3>
                    <div class="demo-menu-options">
                        <div class="demo-menu-card" onclick="window.location.href='demo.html?scenario=3';">
                            <div class="demo-menu-icon">👗</div>
                            <h4>Fashion Shopping</h4>
                            <p>Guide customers through product discovery and checkout</p>
                            <div class="demo-play-btn">▶ Watch Demo</div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', demoHTML);
}

function closeDemoMenu() {
    const modal = document.getElementById('demoMenuModal');
    if (modal) modal.remove();
}

// Video-style Demo Variables
let demoPlaying = false;
let demoTimeouts = [];
let currentDemoType = '';

// Open Buy Home Video Demo
function openVideoDemoBuy() {
    console.log('Opening Buy Demo');
    currentDemoType = 'buy';
    openVideoDemo('buy');
    const dropdown = document.getElementById('demoDropdown');
    if (dropdown) dropdown.classList.remove('active');
}

// Open Rent Property Video Demo
function openVideoDemoRent() {
    console.log('Opening Rent Demo');
    currentDemoType = 'rent';
    openVideoDemo('rent');
    const dropdown = document.getElementById('demoDropdown');
    if (dropdown) dropdown.classList.remove('active');
}

// Demo conversations with typing indicators
const demoScripts = {
    buy: [
        { type: 'user', text: "Hi! I'm looking for a 3-bedroom house.", delay: 0, typingDelay: 1600 },
        { type: 'bot', text: "Hello! I'd be happy to help you find the perfect home. What's your budget range?", delay: 2600, typingDelay: 1000 },
        { type: 'user', text: "Around $300,000 to $400,000.", delay: 4600, typingDelay: 1600 },
        { type: 'bot', text: "Great! I have several excellent options in that range. Would you prefer a specific neighborhood? I can show you properties in downtown, suburban areas, or near schools.", delay: 7200, typingDelay: 1000 },
        { type: 'user', text: "Near schools would be ideal.", delay: 9200, typingDelay: 1600 },
        { type: 'bot', text: "Perfect! I found 5 properties near top-rated schools. The first one is a beautiful 3-bedroom, 2-bathroom house with a large backyard at $375,000. Would you like to schedule a viewing?", delay: 11800, typingDelay: 1000 },
        { type: 'user', text: "Yes, that sounds great!", delay: 13800, typingDelay: 1600 },
        { type: 'bot', text: "Wonderful! I'll arrange a viewing for this weekend. I'll send you the property details and available time slots via email. Is there anything else you'd like to know?", delay: 16400, typingDelay: 1000 }
    ],
    rent: [
        { type: 'user', text: "Hi, I'm looking for an apartment to rent.", delay: 0, typingDelay: 1600 },
        { type: 'bot', text: "Hello! I'd be happy to help you find the perfect rental. How many bedrooms are you looking for?", delay: 2600, typingDelay: 1000 },
        { type: 'user', text: "2 bedrooms would be ideal.", delay: 4600, typingDelay: 1600 },
        { type: 'bot', text: "Great! What's your monthly budget range?", delay: 6700, typingDelay: 1000 },
        { type: 'user', text: "Between $1,500 and $2,000 per month.", delay: 8700, typingDelay: 1600 },
        { type: 'bot', text: "Perfect! I have several great options. Would you prefer a location close to public transportation, downtown, or in a quieter residential area?", delay: 11300, typingDelay: 1000 },
        { type: 'user', text: "Close to public transportation would be best.", delay: 13300, typingDelay: 1600 },
        { type: 'bot', text: "Excellent choice! I found 4 apartments that match your criteria. One standout option is a modern 2-bedroom apartment near the metro station for $1,850/month. It includes parking and has in-unit laundry. Would you like more details?", delay: 15900, typingDelay: 1000 },
        { type: 'user', text: "Yes, please send me the information.", delay: 17900, typingDelay: 1600 },
        { type: 'bot', text: "I'll email you the complete listing with photos, floor plans, and lease terms right away. Would you like to schedule a tour?", delay: 20500, typingDelay: 1000 },
        { type: 'user', text: "That would be perfect, thank you!", delay: 22500, typingDelay: 1600 },
        { type: 'bot', text: "You're welcome! I'll coordinate with the property manager and send you available viewing times within the next hour. Looking forward to helping you find your new home!", delay: 25100, typingDelay: 1000 }
    ]
};

function openVideoDemo(type) {
    const demoHTML = `
        <div class="demo-modal" id="videoDemo">
            <div class="demo-video-container">
                <button class="demo-close" onclick="closeVideoDemo()">&times;</button>
                <div class="demo-video-header">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 32px;">🏠</span>
                        <div>
                            <h3 style="margin: 0; font-size: 20px;">Alex - Real Estate Assistant</h3>
                            <p style="margin: 4px 0 0; opacity: 0.8; font-size: 14px;">${type === 'buy' ? 'Buy a Home Demo' : 'Rent a Property Demo'}</p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="width: 10px; height: 10px; background: #10b981; border-radius: 50%;"></span>
                        <span style="font-size: 14px;">Online</span>
                    </div>
                </div>
                <div class="demo-video-messages" id="videoMessages"></div>
                <div class="demo-video-controls">
                    <button class="demo-control-btn" onclick="playVideoDemo()" id="playBtn"><span style="font-size: 20px;">▶️</span> Play</button>
                    <button class="demo-control-btn" onclick="pauseVideoDemo()" id="pauseBtn" style="display: none;"><span style="font-size: 20px;">⏸️</span> Pause</button>
                    <button class="demo-control-btn" onclick="restartVideoDemo()"><span style="font-size: 20px;">🔄</span> Restart</button>
                    <button class="demo-control-btn" onclick="skipToEndDemo()"><span style="font-size: 20px;">⏭️</span> Go to End</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', demoHTML);
}

function playVideoDemo() {
    if (demoPlaying) return;
    
    demoPlaying = true;
    document.getElementById('playBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'inline-flex';
    
    const script = demoScripts[currentDemoType];
    const messagesContainer = document.getElementById('videoMessages');
    
    script.forEach(msg => {
        // Show typing indicator
        const typingTimeout = setTimeout(() => {
            addTypingIndicator(msg.type);
        }, msg.delay);
        demoTimeouts.push(typingTimeout);
        
        // Show actual message after typing delay
        const messageTimeout = setTimeout(() => {
            removeTypingIndicator();
            addDemoMessage(msg.type, msg.text);
        }, msg.delay + msg.typingDelay);
        demoTimeouts.push(messageTimeout);
    });
}

function addTypingIndicator(type) {
    const messagesContainer = document.getElementById('videoMessages');
    const emoji = type === 'bot' ? '🤖' : '👤';
    const alignment = type === 'bot' ? 'flex-start' : 'flex-end';
    const bgColor = type === 'bot' ? '#e3f2fd' : '#ffffff';
    
    const typingHTML = `
        <div id="typingIndicator" style="display: flex; justify-content: ${alignment}; margin-bottom: 16px; animation: fadeIn 0.3s;">
            <div style="display: flex; align-items: flex-start; gap: 10px; max-width: 70%; ${type === 'user' ? 'flex-direction: row-reverse;' : ''}">
                <div style="font-size: 28px; flex-shrink: 0;">${emoji}</div>
                <div style="background: ${bgColor}; padding: 12px 18px; border-radius: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function pauseVideoDemo() {
    demoPlaying = false;
    document.getElementById('playBtn').style.display = 'inline-flex';
    document.getElementById('pauseBtn').style.display = 'none';
    
    demoTimeouts.forEach(timeout => clearTimeout(timeout));
    demoTimeouts = [];
    removeTypingIndicator();
}

function restartVideoDemo() {
    pauseVideoDemo();
    document.getElementById('videoMessages').innerHTML = '';
    document.getElementById('playBtn').style.display = 'inline-flex';
    document.getElementById('pauseBtn').style.display = 'none';
    demoPlaying = false;
}

function skipToEndDemo() {
    pauseVideoDemo();
    const messagesContainer = document.getElementById('videoMessages');
    messagesContainer.innerHTML = '';
    
    const script = demoScripts[currentDemoType];
    script.forEach(msg => {
        addDemoMessage(msg.type, msg.text);
    });
    
    document.getElementById('playBtn').style.display = 'inline-flex';
    document.getElementById('pauseBtn').style.display = 'none';
}

function addDemoMessage(type, text) {
    const messagesContainer = document.getElementById('videoMessages');
    const emoji = type === 'bot' ? '🤖' : '👤';
    const alignment = type === 'bot' ? 'flex-start' : 'flex-end';
    const bgColor = type === 'bot' ? '#e3f2fd' : '#ffffff';
    
    const messageHTML = `
        <div style="display: flex; justify-content: ${alignment}; margin-bottom: 16px; animation: fadeIn 0.5s;">
            <div style="display: flex; align-items: flex-start; gap: 10px; max-width: 70%; ${type === 'user' ? 'flex-direction: row-reverse;' : ''}">
                <div style="font-size: 28px; flex-shrink: 0;">${emoji}</div>
                <div style="background: ${bgColor}; padding: 12px 18px; border-radius: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <p style="margin: 0; line-height: 1.5; color: #1e293b;">${text}</p>
                </div>
            </div>
        </div>
    `;
    
    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function closeVideoDemo() {
    pauseVideoDemo();
    const modal = document.getElementById('videoDemo');
    if (modal) modal.remove();
}

// Smooth scrolling for navigation links
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

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Form submission handler
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Show success message (you can replace this with actual form submission)
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Smooth scroll animation on reveal
const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Optional: stop observing after animation
            scrollAnimationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all elements with scroll animation classes
document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale').forEach(el => {
    scrollAnimationObserver.observe(el);
});

// Add animation to section headers as well
document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('scroll-animate');
    scrollAnimationObserver.observe(el);
});

// CTA button click handlers
document.querySelectorAll('.cta-button, .btn-primary, .plan-button').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent.includes('Contact') || button.textContent.includes('Started')) {
            e.preventDefault();
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroGradient = document.querySelector('.hero-gradient');
    
    if (heroGradient) {
        heroGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animate numbers in stats
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger number animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat h3');
            stats.forEach((stat, index) => {
                const text = stat.textContent;
                if (text.includes('+')) {
                    const num = parseInt(text);
                    animateNumber(stat, num, 2000);
                    setTimeout(() => {
                        stat.textContent = num + '+';
                    }, 2000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Add parallax effect to sections as you scroll
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            
            // Parallax effect on hero
            const heroGradient = document.querySelector('.hero-gradient');
            if (heroGradient) {
                heroGradient.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            
            // Subtle parallax on service cards
            document.querySelectorAll('.service-card').forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const offset = (window.innerHeight - rect.top) * 0.05;
                    card.style.transform = `translateY(${offset}px)`;
                }
            });
            
            ticking = false;
        });
        ticking = true;
    }
});

console.log('Novalistic.ai website loaded successfully! 🚀');

// Add sparkle effect to badges
document.addEventListener('DOMContentLoaded', function() {
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach(badge => {
        let sparkleInterval;
        
        badge.addEventListener('mouseenter', function() {
            // Create sparkles continuously
            sparkleInterval = setInterval(() => {
                createSparkle(badge);
            }, 150);
        });
        
        badge.addEventListener('mouseleave', function() {
            clearInterval(sparkleInterval);
        });
    });
    
    function createSparkle(badge) {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle-particle';
        
        // Random size: small (3px), medium (5px), or large (7px)
        const sizes = [3, 4, 5, 6, 7];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        
        // Random position within the badge
        const rect = badge.getBoundingClientRect();
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        sparkle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: white;
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            pointer-events: none;
            z-index: 10;
            box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.8);
            animation: sparkleRise 1s ease-out forwards;
        `;
        
        badge.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
});

// Override createSparkle with horizontal movement
document.addEventListener('DOMContentLoaded', function() {
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach(badge => {
        let sparkleInterval;
        
        badge.addEventListener('mouseenter', function() {
            sparkleInterval = setInterval(() => {
                createSparkleHorizontal(badge);
            }, 120);
        });
        
        badge.addEventListener('mouseleave', function() {
            clearInterval(sparkleInterval);
        });
    });
    
    function createSparkleHorizontal(badge) {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle-particle';
        
        const sizes = [3, 4, 5, 6, 7];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        
        // Random direction: left or right
        const direction = Math.random() > 0.5 ? 50 : -50;
        
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;
        
        sparkle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: white;
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            pointer-events: none;
            z-index: 10;
            box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.9);
            --direction: ${direction}px;
            animation: sparkleRise 1s ease-out forwards;
        `;
        
        badge.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
});

// Sparkles flying outward from badge edges
document.addEventListener('DOMContentLoaded', function() {
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach(badge => {
        let sparkleInterval;
        
        badge.addEventListener('mouseenter', function() {
            sparkleInterval = setInterval(() => {
                createSparkleOutward(badge);
            }, 10);
        });
        
        badge.addEventListener('mouseleave', function() {
            clearInterval(sparkleInterval);
        });
    });
    
    function createSparkleOutward(badge) {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle-particle';
        
        const sizes = [3, 4, 5, 6, 7];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        
        // Random side: left or right edge
        const isLeftSide = Math.random() > 0.5;
        const x = isLeftSide ? 0 : 100;
        const y = Math.random() * 100;
        
        // Direction: fly outward from the edge
        const direction = isLeftSide ? -60 : 60;
        
        sparkle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: white;
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            pointer-events: none;
            z-index: 10;
            box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.9);
            --direction: ${direction}px;
            animation: sparkleRise 1.2s ease-out forwards;
        `;
        
        badge.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1200);
    }
});



// Sparkles on chatbot hover only
document.addEventListener('DOMContentLoaded', function() {
    const chatbot = document.querySelector('.cute-robot');
    
    if (chatbot) {
        let sparkleInterval;
        
        chatbot.addEventListener('mouseenter', function() {
            sparkleInterval = setInterval(() => {
                createChatbotSparkle(chatbot);
            }, 10);
        });
        
        chatbot.addEventListener('mouseleave', function() {
            clearInterval(sparkleInterval);
        });
    }
    
    function createChatbotSparkle(bot) {
        const sparkle = document.createElement('span');
        sparkle.className = 'chatbot-sparkle';
        
        const size = Math.random() * 4 + 2;
        const angle = Math.random() * Math.PI * 2;
        const distance = 25 + Math.random() * 20;
        
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        sparkle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: #0B9FD8;
            border-radius: 50%;
            left: 50%;
            top: 50%;
            pointer-events: none;
            z-index: 1000;
            box-shadow: 0 0 ${size * 3}px rgba(11, 159, 216, 0.9);
            transform: translate(-50%, -50%);
        `;
        
        // Append to body with fixed position relative to chatbot
        const rect = bot.getBoundingClientRect();
        sparkle.style.position = 'fixed';
        sparkle.style.left = rect.left + rect.width / 2 + 'px';
        sparkle.style.top = rect.top + rect.height / 2 + 'px';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.style.transition = 'all 0.8s ease-out';
            sparkle.style.transform = `translate(${endX}px, ${endY}px)`;
            sparkle.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            sparkle.remove();
        }, 900);
    }
});




// Speech bubble for chatbot on hover
document.addEventListener('DOMContentLoaded', function() {
    const chatbot = document.querySelector('.cute-robot');
    
    if (chatbot) {
        let speechBubble;
        
        chatbot.addEventListener('mouseenter', function() {
            // Create speech bubble
            speechBubble = document.createElement('div');
            speechBubble.className = 'robot-speech';
            speechBubble.textContent = "Let's get started!";
            
            speechBubble.style.cssText = `
                position: fixed;
                background: white;
                color: #0B9FD8;
                padding: 8px 14px;
                border-radius: 18px;
                font-size: 13px;
                font-weight: 600;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                pointer-events: none;
                z-index: 1001;
                white-space: nowrap;
                animation: speechPop 0.3s ease-out;
            `;
            
            // Position next to robot
            const rect = chatbot.getBoundingClientRect();
            speechBubble.style.left = (rect.right + 10) + 'px';
            speechBubble.style.top = (rect.top - 5) + 'px';
            
            // Add triangle pointer
            const triangle = document.createElement('div');
            triangle.style.cssText = `
                position: absolute;
                left: -6px;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                border-right: 6px solid white;
            `;
            speechBubble.appendChild(triangle);
            
            document.body.appendChild(speechBubble);
        });
        
        chatbot.addEventListener('mouseleave', function() {
            if (speechBubble) {
                speechBubble.remove();
                speechBubble = null;
            }
        });
    }
});

// Alex Demo System
let currentScenario = 'buy';
let demoSpeed = 0.5;
let demoTimeout = null;
let demoTimeouts = [];
let isPlaying = false;

const scenarios = {
    buy: [
        { type: 'user', text: "Hi! I'm looking for a 3-bedroom house.", delay: 0 },
        { type: 'typing', delay: 2.5 },
        { type: 'bot', text: "Hello! I'd be happy to help you find the perfect home. What's your budget range?", delay: 3.5 },
        { type: 'user', text: "Around $300,000 to $400,000.", delay: 6.0 },
        { type: 'typing', delay: 8.5 },
        { type: 'bot', text: "Great! I have several excellent options in that range. Would you prefer a specific neighborhood? I can show you properties in downtown, suburban areas, or near schools.", delay: 10.0 },
        { type: 'user', text: "Near schools would be ideal.", delay: 13.0 },
        { type: 'typing', delay: 15.5 },
        { type: 'bot', text: "Perfect! I found 5 properties near top-rated schools. The first one is a beautiful 3-bedroom, 2-bathroom house with a large backyard at $375,000. Would you like to schedule a viewing?", delay: 17.5 },
        { type: 'user', text: "Yes, that sounds great!", delay: 21.0 },
        { type: 'typing', delay: 23.5 },
        { type: 'bot', text: "Wonderful! I'll arrange a viewing for this weekend. I'll send you the property details and available time slots via email. Is there anything else you'd like to know?", delay: 25.5 }
    ],
    rent: [
        { type: 'user', text: "Hi, I'm looking for an apartment to rent.", delay: 0 },
        { type: 'typing', delay: 2.5 },
        { type: 'bot', text: "Hello! I'd be happy to help you find the perfect rental. How many bedrooms are you looking for?", delay: 3.5 },
        { type: 'user', text: "2 bedrooms would be ideal.", delay: 6.0 },
        { type: 'typing', delay: 8.5 },
        { type: 'bot', text: "Great! What's your monthly budget range?", delay: 10.0 },
        { type: 'user', text: "Between $1,500 and $2,000 per month.", delay: 12.0 },
        { type: 'typing', delay: 14.5 },
        { type: 'bot', text: "Perfect! I have several great options. Would you prefer a location close to public transportation, downtown, or in a quieter residential area?", delay: 16.5 },
        { type: 'user', text: "Close to public transportation would be best.", delay: 19.5 },
        { type: 'typing', delay: 22.0 },
        { type: 'bot', text: "Excellent choice! I found 4 apartments that match your criteria. One standout option is a modern 2-bedroom apartment near the metro station for $1,850/month. It includes parking and has in-unit laundry. Would you like more details?", delay: 24.0 },
        { type: 'user', text: "Yes, please send me the information.", delay: 27.5 },
        { type: 'typing', delay: 30.0 },
        { type: 'bot', text: "I'll email you the complete listing with photos, floor plans, and lease terms right away. Would you like to schedule a tour?", delay: 32.0 },
        { type: 'user', text: "That would be perfect, thank you!", delay: 35.0 },
        { type: 'typing', delay: 37.5 },
        { type: 'bot', text: "You're welcome! I'll coordinate with the property manager and send you available viewing times within the next hour. Looking forward to helping you find your new home!", delay: 39.5 }
    ]
};

function showScenario(type) {
    currentScenario = type;
    
    // Update button states
    document.getElementById('buyBtn').classList.remove('active');
    document.getElementById('rentBtn').classList.remove('active');
    document.getElementById(type + 'Btn').classList.add('active');
    
    // Reset demo
    restartDemo();
}

function playDemo() {
    if (isPlaying) return;
    
    isPlaying = true;
    document.getElementById('playBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'inline-block';
    
    const container = document.getElementById('messagesContainer');
    const messages = scenarios[currentScenario];
    
    messages.forEach(msg => {
        const timeout = setTimeout(() => {
            if (msg.type === 'typing') {
                addTypingIndicator();
            } else if (msg.type === 'bot' || msg.type === 'user') {
                removeTypingIndicator();
                addMessage(msg.type, msg.text);
            }
        }, msg.delay * 1000 / demoSpeed);
        
        demoTimeouts.push(timeout);
    });
}

function pauseDemo() {
    isPlaying = false;
    document.getElementById('playBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
    
    // Clear all timeouts
    demoTimeouts.forEach(timeout => clearTimeout(timeout));
    demoTimeouts = [];
}

function restartDemo() {
    pauseDemo();
    
    // Clear messages
    const container = document.getElementById('messagesContainer');
    container.innerHTML = '';
    
    // Reset play button
    document.getElementById('playBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
}

function changeSpeed(speed) {
    demoSpeed = speed;
    
    // Update button states
    document.querySelectorAll('.speed-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('speed' + speed.toString().replace('.', '')).classList.add('active');
}

function addMessage(type, text) {
    const container = document.getElementById('messagesContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const emoji = type === 'bot' ? '🤖' : '👤';
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <span class="message-emoji">${emoji}</span>
            <span>${text}</span>
        </div>
    `;
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function addTypingIndicator() {
    const container = document.getElementById('messagesContainer');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
        <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// White circle sparkles bursting in all directions for badges
document.addEventListener('DOMContentLoaded', function() {
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach(badge => {
        let sparkleInterval;
        
        badge.addEventListener('mouseenter', function() {
            sparkleInterval = setInterval(() => {
                createCircleSparkle(badge);
            }, 60);
        });
        
        badge.addEventListener('mouseleave', function() {
            clearInterval(sparkleInterval);
            badge.querySelectorAll('.circle-sparkle').forEach(s => s.remove());
        });
    });
    
    function createCircleSparkle(badge) {
        const sparkle = document.createElement('div');
        sparkle.className = 'circle-sparkle';
        
        // Different sizes: tiny, small, medium, big, large
        const sizes = [3, 5, 7, 9, 11];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        
        // Random angle - 65% horizontal, 35% vertical
        let angle;
        if (Math.random() > 0.35) {
            // More horizontal (left/right)
            angle = (Math.random() > 0.5) ? 
                    (Math.random() * Math.PI / 4) : // Right side
                    (Math.PI - Math.random() * Math.PI / 4); // Left side
        } else {
            // Vertical (up/down)
            angle = Math.random() * Math.PI * 2;
        }
        
        const distance = 60 + Math.random() * 50;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        sparkle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: 50%;
            top: 50%;
            pointer-events: none;
            z-index: 100;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 50%;
            box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.9);
        `;
        
        badge.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.style.transition = 'all 1s ease-out';
            sparkle.style.transform = `translate(${endX}px, ${endY}px) scale(0.1)`;
            sparkle.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1100);
    }
});

// Add more rain sparkles on chat bubbles
document.addEventListener('DOMContentLoaded', function() {
    const aiBubble = document.querySelector('.ai-bubble');
    
    if (aiBubble) {
        setInterval(() => {
            const rain = document.createElement('div');
            const size = 3 + Math.random() * 4;
            const left = Math.random() * 100;
            
            rain.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: white;
                border-radius: 50%;
                left: ${left}%;
                top: -20px;
                pointer-events: none;
                box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.8);
                animation: rainFall 2.5s linear forwards;
            `;
            
            aiBubble.appendChild(rain);
            
            setTimeout(() => {
                rain.remove();
            }, 2500);
        }, 150);
    }
});

// Most Popular Badge removed - no longer needed

// Speech Bubble Animation for Chatbot Emoji
document.addEventListener('DOMContentLoaded', function() {
    const robot = document.querySelector('.cute-robot');
    if (robot) {
        let speechBubble = null;
        
        function showSpeechBubble() {
            // Remove existing bubble
            if (speechBubble) {
                speechBubble.remove();
            }
            
            // Create speech bubble
            speechBubble = document.createElement('div');
            speechBubble.className = 'robot-speech-bubble';
            speechBubble.textContent = "Let's get started!";
            
            speechBubble.style.cssText = `
                position: absolute;
                background: white;
                color: #0B9FD8;
                padding: 10px 16px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 600;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                pointer-events: none;
                z-index: 100;
                white-space: nowrap;
                animation: speechPop 0.3s ease-out;
                left: 100%;
                margin-left: 12px;
                top: 50%;
                transform: translateY(-50%);
            `;
            
            // Add triangle pointer
            const triangle = document.createElement('div');
            triangle.style.cssText = `
                position: absolute;
                left: -8px;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-top: 8px solid transparent;
                border-bottom: 8px solid transparent;
                border-right: 8px solid white;
            `;
            speechBubble.appendChild(triangle);
            
            // Position relative to robot
            robot.style.position = 'relative';
            robot.appendChild(speechBubble);
            
            // Hide after 3 seconds
            setTimeout(() => {
                if (speechBubble) {
                    speechBubble.style.animation = 'speechFadeOut 0.3s ease-out forwards';
                    setTimeout(() => {
                        if (speechBubble) speechBubble.remove();
                    }, 300);
                }
            }, 3000);
        }
        
        // Show bubble every 6 seconds (3s show + 3s hide)
        showSpeechBubble();
        setInterval(showSpeechBubble, 6000);
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes speechPop {
                from {
                    opacity: 0;
                    transform: translateY(-50%) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translateY(-50%) scale(1);
                }
            }
            
            @keyframes speechFadeOut {
                to {
                    opacity: 0;
                    transform: translateY(-50%) scale(0.8);
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// Watch Demo Button Event Listener
document.addEventListener('DOMContentLoaded', function() {
    const watchDemoBtn = document.getElementById('watchDemoBtn');
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Button clicked!');
            openDemoMenu();
        });
    }
});
