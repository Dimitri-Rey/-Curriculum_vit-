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

// Add a modern back-to-top button with label
const backToTop = document.createElement('div');
backToTop.innerHTML = `
  <div style="display: flex; flex-direction: column; align-items: center;">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 24px; height: 24px; color: #000;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
      </svg>
      <span style="font-size: 0.7rem; color: #fff; margin-top: 5px;">Haut</span>
  </div>`;
backToTop.style.position = 'fixed';
backToTop.style.bottom = '20px';
backToTop.style.right = '20px';
backToTop.style.background = 'rgba(0, 0, 0, 0.7)';
backToTop.style.color = '#fff';
backToTop.style.padding = '15px';
backToTop.style.borderRadius = '50%';
backToTop.style.cursor = 'pointer';
backToTop.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';
backToTop.style.fontSize = '1.5rem';
backToTop.style.display = 'none';
backToTop.style.zIndex = '1000';
backToTop.style.transition = 'transform 0.3s, background 0.3s';

backToTop.addEventListener('mouseover', () => {
  backToTop.style.transform = 'scale(1.3)';
  backToTop.style.background = '#ff9800';
});

backToTop.addEventListener('mouseout', () => {
  backToTop.style.transform = 'scale(1)';
  backToTop.style.background = 'rgba(0, 0, 0, 0.7)';
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

// Remove bullet points from lists in sections
document.querySelectorAll('main section ul').forEach(ul => {
  ul.style.listStyleType = 'none';
  ul.style.paddingLeft = '0';
});

// Create a toggle switch for theme with animation
const themeSwitcherContainer = document.createElement('div');
themeSwitcherContainer.style.position = 'fixed';
themeSwitcherContainer.style.top = '20px';
themeSwitcherContainer.style.right = '20px';
themeSwitcherContainer.style.zIndex = '1000';
themeSwitcherContainer.style.display = 'flex';
themeSwitcherContainer.style.alignItems = 'center';
themeSwitcherContainer.style.gap = '10px';

themeSwitcherContainer.innerHTML = `
  <label style="cursor: pointer; display: flex; align-items: center; gap: 5px;">
      <span id="themeLabel" style="font-size: 0.9rem; color: #000;">Mode Clair</span>
      <input type="checkbox" id="themeToggle" style="display: none;">
      <span style="width: 40px; height: 20px; background: #ccc; border-radius: 10px; position: relative; display: inline-block;">
          <span style="width: 18px; height: 18px; background: #fff; border-radius: 50%; position: absolute; top: 1px; left: 1px; transition: all 0.3s;"></span>
      </span>
  </label>
`;

document.body.appendChild(themeSwitcherContainer);

const themeToggle = themeSwitcherContainer.querySelector('#themeToggle');
const themeIndicator = themeSwitcherContainer.querySelector('span > span');
const themeLabel = themeSwitcherContainer.querySelector('#themeLabel');

// Toggle theme logic with animations
themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
      document.body.classList.add('dark-mode');
      document.body.style.transition = 'background 0.5s, color 0.5s';
      document.body.style.background = '#1a1a1a';
      document.body.style.color = '#ffffff';
      themeIndicator.style.left = '21px';
      themeIndicator.style.background = '#000';
      themeLabel.textContent = 'Mode Sombre';
  } else {
      document.body.classList.remove('dark-mode');
      document.body.style.transition = 'background 0.5s, color 0.5s';
      document.body.style.background = 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)';
      document.body.style.color = '#ffffff';
      themeIndicator.style.left = '1px';
      themeIndicator.style.background = '#fff';
      themeLabel.textContent = 'Mode Clair';
  }
});

// Add keyboard navigation support
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
      window.scrollBy({ top: -100, behavior: 'smooth' });
  } else if (event.key === 'ArrowDown') {
      window.scrollBy({ top: 100, behavior: 'smooth' });
  } else if (event.key === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (event.key === 'End') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
});

// Add a dynamic greeting message based on time of day
const greeting = document.createElement('div');
greeting.style.position = 'fixed';
greeting.style.bottom = '10px';
greeting.style.left = '10px';
greeting.style.padding = '10px 20px';
greeting.style.background = 'rgba(0, 0, 0, 0.7)';
greeting.style.color = '#fff';
greeting.style.borderRadius = '5px';
greeting.style.fontSize = '1rem';
greeting.style.zIndex = '1000';
greeting.innerHTML = `
  Bonjour, bienvenue sur mon CV !
`;

document.body.appendChild(greeting);

setTimeout(() => {
  greeting.style.opacity = '0';
  setTimeout(() => {
      greeting.remove();
  }, 500);
}, 5000);

// Add dynamic statistics inside the Experience section
const experienceSection = document.getElementById('experience');
const statsSection = document.createElement('div');
statsSection.style.marginTop = '20px';
statsSection.style.display = 'flex';
statsSection.style.justifyContent = 'space-around';
statsSection.style.alignItems = 'center';
statsSection.style.background = 'rgba(0, 0, 0, 0.7)';
statsSection.style.color = '#fff';
statsSection.style.padding = '15px';
statsSection.style.borderRadius = '10px';
statsSection.style.fontSize = '1rem';
statsSection.innerHTML = `
  <div><strong>Projets terminés :</strong> <span id="projectsCompleted">0</span></div>
  <div><strong>Années d'expérience :</strong> <span id="yearsExperience">0</span></div>
  <div><strong>Technologies maîtrisées :</strong> <span id="technologiesMastered">0</span></div>
`;

experienceSection.appendChild(statsSection);

let projectsCompleted = 0;
let yearsExperience = 0;
let technologiesMastered = 0;

const projectsTarget = 15;
const experienceTarget = 5;
const technologiesTarget = 10;

const incrementStats = () => {
  const interval = setInterval(() => {
      if (projectsCompleted < projectsTarget) {
          projectsCompleted++;
          document.getElementById('projectsCompleted').textContent = projectsCompleted;
      }
      if (yearsExperience < experienceTarget) {
          yearsExperience++;
          document.getElementById('yearsExperience').textContent = yearsExperience;
      }
      if (technologiesMastered < technologiesTarget) {
          technologiesMastered++;
          document.getElementById('technologiesMastered').textContent = technologiesMastered;
      }

      if (projectsCompleted === projectsTarget && yearsExperience === experienceTarget && technologiesMastered === technologiesTarget) {
          clearInterval(interval);
      }
  }, 100);
};

incrementStats();

// Add a gallery for PC builds
const gallerySection = document.createElement('section');
gallerySection.id = 'gallery';
gallerySection.style.margin = '50px 0';
gallerySection.innerHTML = `
  <h2 style="text-align: center; margin-bottom: 20px; color: #fff;">Galerie de créations PC</h2>
  <div id="galleryContainer" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 20px;">
      <img src="assets/images/image1.jpg" alt="PC Build 1" class="gallery-image" style="width: 200px; height: 150px; object-fit: cover; border-radius: 10px; cursor: pointer;">
      <img src="assets/images/image2.jpg" alt="PC Build 2" class="gallery-image" style="width: 200px; height: 150px; object-fit: cover; border-radius: 10px; cursor: pointer;">
      <img src="assets/images/image3.jpg" alt="PC Build 3" class="gallery-image" style="width: 200px; height: 150px; object-fit: cover; border-radius: 10px; cursor: pointer;">
      <img src="assets/images/image4.jpg" alt="PC Build 4" class="gallery-image" style="width: 200px; height: 150px; object-fit: cover; border-radius: 10px; cursor: pointer;">
  </div>
`;

document.querySelector('main').appendChild(gallerySection);

const modal = document.createElement('div');
modal.id = 'imageModal';
modal.style.position = 'fixed';
modal.style.top = '0';
modal.style.left = '0';
modal.style.width = '100%';
modal.style.height = '100%';
modal.style.background = 'rgba(0, 0, 0, 0.8)';
modal.style.display = 'none';
modal.style.justifyContent = 'center';
modal.style.alignItems = 'center';
modal.style.zIndex = '2000';
modal.innerHTML = `
  <div style="position: relative;">
      <span id="closeModal" style="position: absolute; top: 10px; right: 10px; background: red; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; justify-content: center; align-items: center; cursor: pointer; font-size: 1.5rem;">&times;</span>
      <img id="modalImage" src="" alt="Image Zoomed" style="max-width: 80%; max-height: 80%; border-radius: 10px;">
  </div>
`;

document.body.appendChild(modal);

const closeModal = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');
const allImages = document.querySelectorAll('.gallery-image');
let currentImageIndex = 0;

document.querySelectorAll('.gallery-image').forEach((img, index) => {
  img.addEventListener('click', () => {
      modalImage.src = img.src;
      modal.style.display = 'flex';
      currentImageIndex = index;
  });
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
      modal.style.display = 'none';
  } else {
      if (e.clientX > window.innerWidth / 2) {
          // Next image
          currentImageIndex = (currentImageIndex + 1) % allImages.length;
      } else {
          // Previous image
          currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
      }
      modalImage.src = allImages[currentImageIndex].src;
  }
});
