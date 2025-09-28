// Theme toggle functionality
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = themeToggle?.querySelector('.material-symbols-outlined');

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
const updateThemeIcon = (theme) => {
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
  }
};

// Initialize icon
updateThemeIcon(currentTheme);

// Theme toggle event listener
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

// Mobile nav toggle with background blur
const btn = document.querySelector('.nav-toggle');
const list = document.querySelector('#nav-menu');

// Create and insert mobile menu overlay
const createMobileOverlay = () => {
  const overlay = document.createElement('div');
  overlay.className = 'mobile-menu-overlay';
  overlay.id = 'mobile-menu-overlay';
  document.body.appendChild(overlay);
  return overlay;
};

// Get or create overlay
const overlay = document.getElementById('mobile-menu-overlay') || createMobileOverlay();

// Toggle mobile menu function
const toggleMobileMenu = (isOpen) => {
  if (isOpen) {
    list.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    btn.setAttribute('aria-expanded', 'true');
  } else {
    list.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    btn.setAttribute('aria-expanded', 'false');
  }
};

if (btn && list) {
  btn.addEventListener('click', () => {
    const isOpen = !list.classList.contains('open');
    toggleMobileMenu(isOpen);
  });
}

// Close mobile nav when clicking on overlay
if (overlay) {
  overlay.addEventListener('click', () => {
    toggleMobileMenu(false);
  });
}

// Close mobile nav when clicking on a link
const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (list.classList.contains('open')) {
      toggleMobileMenu(false);
    }
  });
});

// Close mobile nav on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && list.classList.contains('open')) {
    toggleMobileMenu(false);
  }
});

// Scroll progress indicator
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
  });
}

// Smooth scroll for navigation links
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

// Intersection Observer for fade-in animations
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

// Observe cards and skill cards for animations
document.querySelectorAll('.card, .skill-card, .stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Typing animation for hero title
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  heroTitle.style.borderRight = '2px solid var(--brand)';

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    } else {
      setTimeout(() => {
        heroTitle.style.borderRight = 'none';
      }, 1000);
    }
  };

  setTimeout(typeWriter, 500);
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector('.hero:before');
  if (heroBackground) {
    heroBackground.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.3}px)`;
  }
});

// Year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
