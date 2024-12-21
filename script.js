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

// Contact form placeholder animation (if needed in future versions)
// const formInputs = document.querySelectorAll('input, textarea');
// formInputs.forEach(input => {
//     input.addEventListener('focus', () => {
//         input.parentNode.classList.add('focused');
//     });
//     input.addEventListener('blur', () => {
//         if (!input.value) {
//             input.parentNode.classList.remove('focused');
//         }
//     });
// });
