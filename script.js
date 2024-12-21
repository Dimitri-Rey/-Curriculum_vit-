// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      window.scrollTo({
          top: targetSection.offsetTop - 50,
          behavior: 'smooth'
      });
  });
});

// Highlight active section in navigation on scroll
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
          currentSection = section.getAttribute('id');
      }
  });

  navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentSection) {
          link.classList.add('active');
      }
  });
});

// Add a dynamic back-to-top button
const backToTop = document.createElement('div');
backToTop.innerHTML = '&#8679;';
backToTop.style.position = 'fixed';
backToTop.style.bottom = '20px';
backToTop.style.right = '20px';
backToTop.style.background = '#ffce00';
backToTop.style.color = '#000';
backToTop.style.padding = '10px';
backToTop.style.borderRadius = '50%';
backToTop.style.cursor = 'pointer';
backToTop.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
backToTop.style.display = 'none';
backToTop.style.zIndex = '1000';

document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
      backToTop.style.display = 'block';
  } else {
      backToTop.style.display = 'none';
  }
});

// Add animations when sections come into view
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
      }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('main section').forEach(section => {
  observer.observe(section);
});

// Example animation classes in CSS
// .animate {
//     opacity: 1;
//     transform: translateY(0);
//     transition: opacity 0.6s, transform 0.6s;
// }

// main section {
//     opacity: 0;
//     transform: translateY(20px);
// }
