// Script pour forcer le thème sombre
(function() {
  function forceDarkTheme() {
    // Force l'attribut data-theme
    document.documentElement.setAttribute('data-theme', 'dark');
    
    // Force le localStorage
    localStorage.setItem('ecologis-theme', 'dark');
    
    // Force tous les éléments avec des styles inline
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      const style = el.getAttribute('style');
      if (style && (
        style.includes('backgroundColor: \'white\'') ||
        style.includes('background-color: white') ||
        style.includes('backgroundColor: \'#fff\'') ||
        style.includes('backgroundColor: \'#ffffff\'') ||
        style.includes('backgroundColor: \'var(--color-card-bg)\'')
      )) {
        el.style.backgroundColor = '#0f0f0f';
      }
    });
    
    // Force le body et html
    document.body.style.backgroundColor = '#0f0f0f';
    document.documentElement.style.backgroundColor = '#0f0f0f';
  }
  
  // Exécute immédiatement
  forceDarkTheme();
  
  // Exécute après le chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceDarkTheme);
  }
  
  // Exécute après un délai pour les éléments chargés dynamiquement
  setTimeout(forceDarkTheme, 1000);
})();
