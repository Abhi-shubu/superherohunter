const favoriteList = [];
function navigateTohome(){
    window.location.href = 'index.html';
  }

// Function to remove superhero from favorites
function removeFromFavorites(li, superheroId) {
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.removeChild(li);
  
    // Remove the superhero from local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favorites.filter(superhero => superhero.id !== superheroId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    navigateTohome();
}
  
  // Function to display favorite superheroes on the favorites page
  function displayFavoriteSuperheroes() {
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = '';
  
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    if (favorites.length === 0) {
      favoritesList.innerHTML = '<li>No favorite superheroes added.</li>';
      return;
    }
  
    favorites.forEach(superhero => {
      const li = document.createElement('li');
      li.textContent = superhero.name;
      
    
        const superheroImage = document.createElement('img');
        superheroImage.src = superhero.thumbnail.path + '.' + superhero.thumbnail.extension;
        superheroImage.alt = superhero.name;
        li.appendChild(superheroImage);
    
        const superheroDetails = document.createElement('p');
        superheroDetails.textContent = superhero.description;
        li.appendChild(superheroDetails);
        
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove-button');
      removeButton.addEventListener('click', () => removeFromFavorites(li, superhero.id));
  
      li.appendChild(removeButton);
      favoritesList.appendChild(li);
      
      
    });
  }
  
  // Call the displayFavoriteSuperheroes function when the favorites page loads
  document.addEventListener('DOMContentLoaded', displayFavoriteSuperheroes);
  