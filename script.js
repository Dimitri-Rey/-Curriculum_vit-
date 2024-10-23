// Smooth scroll for all links with anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Barre de progression de lecture
window.onscroll = function() {
    var scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    var winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (scrollPos / winHeight) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
};
