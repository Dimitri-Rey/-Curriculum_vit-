// Fonction pour ouvrir les pages du "livre" et afficher les sections cachées
function openPage(sectionId) {
    // Ajout des classes pour déclencher l'animation de repli des pages
    document.querySelector('.book-container').classList.add('open-' + sectionId);
    
    // Afficher la section correspondante après l'animation
    setTimeout(() => {
        document.querySelector('#' + sectionId).style.display = 'block';
        document.querySelector('.book-container').style.display = 'none'; // Cache le livre après ouverture
    }, 1000);
}
