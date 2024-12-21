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
backToTop.style.background = 'rgba(255, 206, 0, 0.9)';
backToTop.style.color = '#000';
backToTop.style.padding = '15px';
backToTop.style.borderRadius = '50%';
backToTop.style.cursor = 'pointer';
backToTop.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';
backToTop.style.fontSize = '1.5rem';
backToTop.style.display = 'none';
backToTop.style.zIndex = '1000';
backToTop.style.transition = 'transform 0.3s';

backToTop.addEventListener('mouseover', () => {
  backToTop.style.transform = 'scale(1.2)';
});

backToTop.addEventListener('mouseout', () => {
  backToTop.style.transform = 'scale(1)';
});

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

// Dynamic theme switcher
const themeSwitcher = document.createElement('div');
themeSwitcher.innerHTML = '&#9728;';
themeSwitcher.style.position = 'fixed';
themeSwitcher.style.top = '20px';
themeSwitcher.style.right = '20px';
themeSwitcher.style.background = 'rgba(255, 206, 0, 0.9)';
themeSwitcher.style.color = '#000';
themeSwitcher.style.padding = '15px';
themeSwitcher.style.borderRadius = '50%';
themeSwitcher.style.cursor = 'pointer';
themeSwitcher.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';
themeSwitcher.style.fontSize = '1.5rem';
themeSwitcher.style.transition = 'transform 0.3s';
themeSwitcher.style.zIndex = '1000';

themeSwitcher.addEventListener('mouseover', () => {
  themeSwitcher.style.transform = 'rotate(20deg) scale(1.2)';
});

themeSwitcher.addEventListener('mouseout', () => {
  themeSwitcher.style.transform = 'rotate(0deg) scale(1)';
});

document.body.appendChild(themeSwitcher);

themeSwitcher.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
      themeSwitcher.innerHTML = '&#9790;';
      document.body.style.background = '#1a1a1a';
      document.body.style.color = '#ffffff';
  } else {
      themeSwitcher.innerHTML = '&#9728;';
      document.body.style.background = 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)';
      document.body.style.color = '#ffffff';
  }
});
