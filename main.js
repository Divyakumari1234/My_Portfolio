// Skills Tab Functionality
const skillTabs = document.querySelectorAll('.skill-tab');
const skillCategories = document.querySelectorAll('.skill-category');

skillTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.getAttribute('data-category');
    
    // Remove active class from all tabs and categories
    skillTabs.forEach(t => t.classList.remove('active'));
    skillCategories.forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding category
    tab.classList.add('active');
    document.querySelector(`.skill-category[data-category="${category}"]`).classList.add('active');
    
    // Animate skill bars
    animateSkillBars(category);
  });
});

// Animate skill bars
function animateSkillBars(category) {
  const activeCategory = document.querySelector(`.skill-category[data-category="${category}"]`);
  const skillBars = activeCategory.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width + '%';
    }, 100);
  });
}

// Initialize first skill category
if (skillCategories.length > 0) {
  animateSkillBars('frontend');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.background = 'rgba(10, 14, 39, 0.95)';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.background = 'rgba(10, 14, 39, 0.8)';
    navbar.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.nav__mobile-toggle');
const navLinks = document.querySelector('.nav__links');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileToggle.classList.remove('active');
  });
});

// Form submission handler with loading state
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    // Set the redirect URL after successful submission
    const nextInput = this.querySelector('input[name="_next"]');
    if (nextInput && !nextInput.value) {
      nextInput.value = window.location.href.split('?')[0] + '?success=true';
    }
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Reset button state after delay (in case submission fails)
    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 10000);
  });
}

// Show success message if redirected back from FormSubmit
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('success') === 'true') {
    alert('Thank you for your message! I will get back to you within 24 hours.');
    // Clean URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});

// Add scroll progress indicator
const scrollProgress = () => {
  const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (windowScroll / height) * 100;
  
  // You can add a progress bar here if needed
};

window.addEventListener('scroll', scrollProgress);

// Animate stats on scroll
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        if (finalValue.includes('+')) {
          const number = parseInt(finalValue);
          animateValue(stat, 0, number, 1000, '+');
        } else if (finalValue.includes('.')) {
          const number = parseFloat(finalValue);
          animateValue(stat, 0, number, 1000, '');
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero__stats');
if (heroStats) {
  statsObserver.observe(heroStats);
}

function animateValue(element, start, end, duration, suffix) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = progress * (end - start) + start;
    if (suffix === '+') {
      element.textContent = Math.floor(current) + suffix;
    } else {
      element.textContent = current.toFixed(2);
    }
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end + suffix;
    }
  };
  window.requestAnimationFrame(step);
}

console.log('Portfolio loaded successfully! 🚀');
