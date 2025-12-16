// Smooth scrolling for anchor links
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

// Update active TOC link on scroll
document.addEventListener('DOMContentLoaded', () => {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.resume-block[id]');
    
    if (tocLinks.length > 0 && sections.length > 0) {
        const updateActiveLink = () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };
        
        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink(); // Initial call
    }
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.resume-item, .about-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        updateThemeToggle(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeToggle(newTheme);
        });
    }
});

function updateThemeToggle(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.innerHTML = `<span>${icon}</span>`;
        themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
}

// Collapsible sections
document.addEventListener('DOMContentLoaded', () => {
    const collapseToggles = document.querySelectorAll('.collapse-toggle-small');
    collapseToggles.forEach(toggle => {
        const content = toggle.closest('.feature-category, .highlight-item').querySelector('.collapsible-content-small');
        if (content) {
            // Start collapsed
            content.classList.add('collapsed');
            
            toggle.addEventListener('click', () => {
                content.classList.toggle('collapsed');
            });
        }
    });
});

// Lightbox / Image Carousel
const lightboxImages = [
    { src: 'images/chumbets-event.png', caption: 'Prediction Event Interface' },
    { src: 'images/chumbets-sidebar.png', caption: 'Sidebar Navigation' },
    { src: 'images/chumbets-battleship.png', caption: 'Battleship Multiplayer Game' },
    { src: 'images/chumbets-bonuses.png', caption: 'Bonuses & Rewards' },
    { src: 'images/desktop view.png', caption: 'Desktop View' }
];

let currentSlide = 0;

function openLightbox(index) {
    currentSlide = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (lightbox && lightboxImg && lightboxCaption) {
        lightboxImg.src = lightboxImages[index].src;
        lightboxCaption.textContent = lightboxImages[index].caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
}

function closeLightbox(event) {
    // Only close if clicking the background, close button, or pressing escape
    if (event.target.classList.contains('lightbox') || 
        event.target.classList.contains('lightbox-close') ||
        event.key === 'Escape') {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        }
    }
}

function changeSlide(event, direction) {
    event.stopPropagation(); // Prevent closing lightbox
    currentSlide += direction;
    
    // Wrap around
    if (currentSlide >= lightboxImages.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = lightboxImages.length - 1;
    
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (lightboxImg && lightboxCaption) {
        lightboxImg.src = lightboxImages[currentSlide].src;
        lightboxCaption.textContent = lightboxImages[currentSlide].caption;
    }
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox(e);
        if (e.key === 'ArrowLeft') changeSlide(e, -1);
        if (e.key === 'ArrowRight') changeSlide(e, 1);
    }
});

