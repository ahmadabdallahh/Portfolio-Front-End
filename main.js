// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const body = document.body;

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  body.setAttribute('data-theme', newTheme);

  if (newTheme === 'light') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
});

// Typewriter Effect
const typewriter = document.getElementById('typewriter');
const texts = [
  'Frontend Developer',
  'React Specialist',
  'UI/UX Enthusiast',
  'Clean Code Advocate',
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typewriterEffect() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    typewriter.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriter.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500;
  }

  setTimeout(typewriterEffect, typeSpeed);
}

// Start typewriter effect
setTimeout(typewriterEffect, 1000);

// Particles Animation
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = Math.random() * 3 + 3 + 's';
    particlesContainer.appendChild(particle);
  }
}

createParticles();

// Navigation Dots
const navDots = document.querySelectorAll('.nav-dot');
const sections = document.querySelectorAll('.section');

navDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    const targetSection = dot.getAttribute('data-section');
    document.getElementById(targetSection).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// Intersection Observer for animations and navigation
const observerOptions = {
  threshold: 0.3,
  rootMargin: '-50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Update navigation dots
      navDots.forEach((dot) => dot.classList.remove('active'));
      const activeNavDot = document.querySelector(
        `[data-section="${entry.target.id}"]`
      );
      if (activeNavDot) {
        activeNavDot.classList.add('active');
      }

      // Animate elements
      const animatedElements = entry.target.querySelectorAll(
        '.section-title, .about-text, .about-image, .skill-item, .project-card, .contact-info, .contact-form'
      );
      animatedElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animate');
        }, index * 100);
      });

      // Animate skill bars
      if (entry.target.id === 'skills') {
        const skillBars = entry.target.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
          setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
          }, index * 200);
        });
      }
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

// Contact Form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = contactForm.querySelector('input[type="text"]').value;
  const email = contactForm.querySelector('input[type="email"]').value;
  const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
  const message = contactForm.querySelector('textarea').value;

  // Simple validation
  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    alert("Thank you for your message! I'll get back to you soon.");
    contactForm.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Add scroll indicator
window.addEventListener('scroll', () => {
  const scrolled =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  document.documentElement.style.setProperty(
    '--scroll-progress',
    scrolled + '%'
  );
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.getElementById('hero');
  const heroContent = hero.querySelector('.container');

  if (scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - scrolled / window.innerHeight;
  }
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault();
    const currentSection =
      document.querySelector('.section:target') ||
      document.getElementById('hero');
    const allSections = Array.from(sections);
    const currentIndex = allSections.indexOf(currentSection);

    let nextIndex;
    if (e.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % allSections.length;
    } else {
      nextIndex = (currentIndex - 1 + allSections.length) % allSections.length;
    }

    allSections[nextIndex].scrollIntoView({ behavior: 'smooth' });
  }
});

// Mobile menu handling (for smaller screens)
if (window.innerWidth <= 768) {
  // Create mobile menu button
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.innerHTML = '☰';
  mobileMenuBtn.style.cssText = `
                position: fixed;
                top: 20px;
                left: 20px;
                z-index: 1001;
                background: var(--bg-card);
                border: 2px solid var(--border-color);
                border-radius: 50%;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 1.2rem;
                color: var(--text-primary);
            `;
  document.body.appendChild(mobileMenuBtn);

  // Create mobile menu
  const mobileMenu = document.createElement('div');
  mobileMenu.style.cssText = `
                position: fixed;
                top: 0;
                left: -100%;
                width: 250px;
                height: 100vh;
                background: var(--bg-secondary);
                z-index: 1000;
                transition: left 0.3s ease;
                padding: 80px 20px 20px;
                box-shadow: var(--shadow);
            `;

  const menuItems = ['hero', 'about', 'skills', 'projects', 'contact'];
  menuItems.forEach((item) => {
    const menuLink = document.createElement('a');
    menuLink.href = `#${item}`;
    menuLink.textContent = item.charAt(0).toUpperCase() + item.slice(1);
    menuLink.style.cssText = `
                    display: block;
                    padding: 15px 0;
                    color: var(--text-primary);
                    text-decoration: none;
                    font-size: 1.1rem;
                    border-bottom: 1px solid var(--border-color);
                    transition: color 0.3s ease;
                `;
    menuLink.addEventListener('click', () => {
      mobileMenu.style.left = '-100%';
    });
    mobileMenu.appendChild(menuLink);
  });

  document.body.appendChild(mobileMenu);

  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.style.left === '0px';
    mobileMenu.style.left = isOpen ? '-100%' : '0px';
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.style.left = '-100%';
    }
  });
}

// Performance optimization: Lazy load images
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    }
  });
});

document.querySelectorAll('img[data-src]').forEach((img) => {
  imageObserver.observe(img);
});

// Add easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.code);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
    // Easter egg activated
    document.body.style.animation = 'rainbow 2s infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
document.head.appendChild(style);
