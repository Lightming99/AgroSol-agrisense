// Global state management
const AppState = {
    isMenuOpen: false,
    currentTab: 'pipeline',
    isFabOpen: false,
    animations: {
        typewriter: null,
        counters: null
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    setupScrollEffects();
    setupTypewriter();
    setupFormHandling();
    setupAnimations();
    setupInteractiveElements();
}

// Event Listeners
function setupEventListeners() {
    // Navigation
    window.addEventListener('scroll', handleScroll);
    
    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    // FAB functionality
    const fabMain = document.getElementById('fabMain');
    const fabContainer = document.querySelector('.fab-container');
    
    if (fabMain) {
        fabMain.addEventListener('click', toggleFab);
    }
    
    // Click outside to close
    document.addEventListener('click', (e) => {
        if (fabContainer && !fabContainer.contains(e.target) && AppState.isFabOpen) {
            toggleFab();
        }
    });
}

function setupInteractiveElements() {
    // Tech cards hover effects
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Research cards interaction
    const researchCards = document.querySelectorAll('.research-card');
    researchCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });
    });
    
    // Architecture components
    const components = document.querySelectorAll('.component');
    components.forEach(component => {
        component.addEventListener('click', () => {
            showComponentDetails(component);
        });
    });
    
    // Innovation cards animation
    const innovationCards = document.querySelectorAll('.innovation-card');
    innovationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

function showComponentDetails(component) {
    const detail = component.querySelector('.component-detail');
    if (detail) {
        showNotification(`${component.querySelector('span').textContent}: ${detail.textContent}`, 'info');
    }
}

// Navigation functions
function handleScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    updateActiveNavLink();
}

function toggleMobileMenu() {
    AppState.isMenuOpen = !AppState.isMenuOpen;
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    if (AppState.isMenuOpen) {
        navMenu.classList.add('active');
        hamburger.classList.add('active');
    } else {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

function handleNavClick(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href').substring(1);
    scrollToSection(targetId);
    
    // Close mobile menu if open
    if (AppState.isMenuOpen) {
        toggleMobileMenu();
    }
}

function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Tab functionality
function switchTab(tabName) {
    AppState.currentTab = tabName;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.querySelector(`[data-panel="${tabName}"]`).classList.add('active');
}

// Typewriter animation
function setupTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const texts = [
        'AI Research',
        'Agricultural Intelligence',
        'Neuro-Symbolic AI',
        'Computer Vision',
        'Knowledge Graphs'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Scroll effects and animations
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

function setupAnimations() {
    // Floating animation for tech cards
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Pulse animation for icons
    const icons = document.querySelectorAll('.card-icon i');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        icon.addEventListener('animationend', () => {
            icon.style.animation = '';
        });
    });
}

// Form handling
// Remove or comment out these functions:
// - handleContactFormSubmit
// - handleQuestionFormSubmit
// - submitFormData
// - createEmailBody
// - sendEmail

// Keep only the form animations
// Updated form handling for Google Forms
function setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    const questionForm = document.getElementById('questionForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleGoogleFormSubmit);
        setupFormAnimations(contactForm);
    }
    
    if (questionForm) {
        questionForm.addEventListener('submit', handleGoogleFormSubmit);
        setupFormAnimations(questionForm);
    }
}

function handleGoogleFormSubmit(event) {
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    // Allow form to submit naturally to Google Forms
    setTimeout(() => {
        showNotification('Form submitted successfully! Thank you for your message.', 'success');
        form.reset();
        resetFormStyles(form);
        
        // Close modal if it's the question form
        if (form.id === 'questionForm') {
            closeModal('questionModal');
        }
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1000);
}


function setupFormAnimations(form) {
    const formInputs = form.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', handleInputFocus);
        input.addEventListener('blur', handleInputBlur);
        input.addEventListener('input', handleInputChange);
    });
}

function handleInputFocus(event) {
    const formGroup = event.target.closest('.form-group');
    if (formGroup) {
        formGroup.classList.add('focused');
        const line = formGroup.querySelector('.form-line');
        if (line) {
            line.style.width = '100%';
        }
    }
}

function handleInputBlur(event) {
    const formGroup = event.target.closest('.form-group');
    if (formGroup && !event.target.value) {
        formGroup.classList.remove('focused');
        const line = formGroup.querySelector('.form-line');
        if (line) {
            line.style.width = '0%';
        }
    }
}

function handleInputChange(event) {
    const formGroup = event.target.closest('.form-group');
    if (formGroup) {
        if (event.target.value) {
            formGroup.classList.add('filled');
        } else {
            formGroup.classList.remove('filled');
        }
    }
}

function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        institution: formData.get('institution') || 'Not specified',
        inquiryType: formData.get('inquiry-type'),
        message: formData.get('message')
    };
    
    submitFormData(data, 'Contact Form', event.target);
}

function handleQuestionFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        category: formData.get('category'),
        question: formData.get('question')
    };
    
    submitFormData(data, 'Question Form', event.target);
    closeModal('questionModal');
}

function submitFormData(data, formType, formElement) {
    const submitBtn = formElement.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Create email body
    const emailBody = createEmailBody(data, formType);
    
    // Send email using EmailJS or mailto
    sendEmail(data.email, formType, emailBody)
        .then(() => {
            showNotification('Message sent successfully!', 'success');
            formElement.reset();
            resetFormStyles(formElement);
        })
        .catch(() => {
            showNotification('Failed to send message. Please try again.', 'error');
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

function createEmailBody(data, formType) {
    let body = `New ${formType} Submission\n\n`;
    body += `Name: ${data.name}\n`;
    body += `Email: ${data.email}\n`;
    
    if (data.institution) {
        body += `Institution: ${data.institution}\n`;
    }
    
    if (data.inquiryType) {
        body += `Inquiry Type: ${data.inquiryType}\n`;
    }
    
    if (data.category) {
        body += `Category: ${data.category}\n`;
    }
    
    body += `\nMessage/Question:\n${data.message || data.question}`;
    
    return body;
}

function sendEmail(senderEmail, subject, body) {
    return new Promise((resolve, reject) => {
        // Create mailto link
        const mailtoLink = `mailto:as21212022@gmail.com?subject=${encodeURIComponent(subject + ' - AgriSense')}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Simulate success (since we can't detect if email was actually sent)
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

function resetFormStyles(form) {
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('focused', 'filled');
        const line = group.querySelector('.form-line');
        if (line) {
            line.style.width = '0%';
        }
    });
}

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        const firstInput = modal.querySelector('input, textarea, select');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Click outside modal to close
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal[style*="block"]');
        if (openModal) {
            closeModal(openModal.id);
        }
    }
});

// FAB functionality
function toggleFab() {
    AppState.isFabOpen = !AppState.isFabOpen;
    const fabContainer = document.querySelector('.fab-container');
    const fabMain = document.getElementById('fabMain');
    
    if (AppState.isFabOpen) {
        fabContainer.classList.add('active');
        fabMain.style.transform = 'rotate(45deg)';
    } else {
        fabContainer.classList.remove('active');
        fabMain.style.transform = 'rotate(0deg)';
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${getNotificationColor(type)};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

function getNotificationColor(type) {
    switch (type) {
        case 'success':
            return '#10b981';
        case 'error':
            return '#ef4444';
        case 'warning':
            return '#f59e0b';
        default:
            return '#2563eb';
    }
}

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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Smooth scrolling for all internal links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});

// Add loading animation to buttons
document.addEventListener('click', (e) => {
    if (e.target.matches('button') && !e.target.disabled) {
        e.target.style.transform = 'scale(0.98)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }
});

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
setupLazyLoading();

// Performance optimization
const debouncedScroll = debounce(handleScroll, 10);
window.removeEventListener('scroll', handleScroll);
window.addEventListener('scroll', debouncedScroll);

// Error handling
window.addEventListener('error', function(event) {
    console.error('Application error:', event.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Add ripple effect to buttons
document.addEventListener('click', (e) => {
    if (e.target.matches('button, .btn')) {
        createRippleEffect(e);
    }
});

function createRippleEffect(e) {
    const button = e.target;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        background: rgba(255, 255, 255, 0.3);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS animation for ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .notification {
        animation: slideInRight 0.3s ease;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0);
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AppState,
        scrollToSection,
        switchTab,
        openModal,
        closeModal,
        showNotification
    };
}
