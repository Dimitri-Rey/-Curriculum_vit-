/**
 * script.js
 * Gestion du menu burger, scroll doux, et petites animations.
 */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {

  // ----------------------------------------------------------------
  // 1. MENU BURGER
  // ----------------------------------------------------------------
  const burger = document.querySelector('.burger');
  const navMenu = document.querySelector('nav ul');
  
  if (burger && navMenu) {
      burger.addEventListener('click', () => {
          navMenu.classList.toggle('show');
      });
  }

  // ----------------------------------------------------------------
  // 2. SCROLL DOUX (smooth scroll déjà activé en CSS, 
  //    ici on gère le décalage si besoin)
  // ----------------------------------------------------------------
  // Si vous souhaitez un offset supplémentaire, vous pouvez intercepter
  // l'événement de clic sur chaque ancre, et scroller via window.scrollTo().
  // Pour l’instant, on se contente de la propriété CSS scroll-behavior: smooth.

  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          const targetElement = document.querySelector(this.getAttribute('href'));
          if (targetElement) {
              // Empêcher le comportement par défaut
              e.preventDefault();
              // Scroll avec offset si besoin
              window.scrollTo({
                  top: targetElement.offsetTop - 50, // ajuster l’offset
                  behavior: 'smooth'
              });
              // Fermer le menu en mobile après le clic
              navMenu.classList.remove('show');
          }
      });
  });

  // ----------------------------------------------------------------
  // 3. ANIMATIONS D'APPARITION AU SCROLL (ex. fade-in)
  // ----------------------------------------------------------------
  const fadeElements = document.querySelectorAll('.fade-in');
  
  function handleFadeIn() {
      fadeElements.forEach(el => {
          const rect = el.getBoundingClientRect();
          // Apparait quand l'élément est visible à ~80% de la fenêtre
          if (rect.top <= window.innerHeight * 0.8) {
              el.classList.add('visible');
          }
      });
  }

  // Écouter le scroll pour déclencher l'effet fade-in
  window.addEventListener('scroll', handleFadeIn);
  // Et éventuellement au chargement
  handleFadeIn();

});
