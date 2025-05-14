// script.js
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});
document.addEventListener('DOMContentLoaded', function() {
    // Animasi saat elemen muncul di viewport
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service, .member, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state
    const services = document.querySelectorAll('.service');
    const members = document.querySelectorAll('.member');
    const contactForm = document.querySelector('.contact-form');
    
    services.forEach(service => {
        service.style.opacity = '0';
        service.style.transform = 'translateY(20px)';
        service.style.transition = 'all 0.6s ease-out';
    });
    
    members.forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(20px)';
        member.style.transition = 'all 0.6s ease-out 0.2s';
    });
    
    contactForm.style.opacity = '0';
    contactForm.style.transform = 'translateY(20px)';
    contactForm.style.transition = 'all 0.6s ease-out 0.4s';

    // Event listener untuk scroll
    window.addEventListener('scroll', animateOnScroll);
    // Jalankan sekali saat load
    animateOnScroll();
});
// Hamburger menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
// Animate progress bars when they come into view
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    progressBars.forEach(bar => {
        const position = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (position < screenPosition) {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress;
        }
    });
};

window.addEventListener('scroll', animateProgressBars);
// Run once on load
animateProgressBars();
// Gunakan Intersection Observer untuk animasi scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Atur elemen yang akan diobservasi
document.querySelectorAll('.service, .member, .contact-form').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progress = entry.target.getAttribute('data-progress');
      entry.target.style.width = progress;
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-progress').forEach(bar => {
  progressObserver.observe(bar);
});
function animate() {
  // Logika animasi
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);