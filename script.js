const publicKey = "8e54ed4bb8b480da27d64f99891632d1";
const privateKey = "252b219830036085c939ccaa9ca385887e50557c";

// Function to calculate the MD5 hash
function generateHash(ts) {
  const md5 = CryptoJS.MD5(ts + privateKey + publicKey).toString();
  return md5;
}

// Function to fetch superheroes based on search query
async function searchSuperheroes(query) {
  const ts = Date.now().toString();
  const hash = generateHash(ts);

  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.log(error);
    return [];
    
  }
}

// Function to display search results
function displaySearchResults(results) {
  const resultsList = document.getElementById('results-list');
  resultsList.innerHTML = '';

  if (results.length === 0) {
    resultsList.innerHTML = '<li>No superheroes found.</li>';
    return;
  }

  results.forEach(superhero => {
    const li = document.createElement('li');
    li.textContent = superhero.name;

    const superheroImage = document.createElement('img');
    superheroImage.src = superhero.thumbnail.path + '.' + superhero.thumbnail.extension;
    superheroImage.alt = superhero.name;
    li.appendChild(superheroImage);

    const superheroDetails = document.createElement('p');
    superheroDetails.textContent = superhero.description;
    li.appendChild(superheroDetails);

    const favoriteButton = document.createElement('button');
    favoriteButton.textContent = 'Favorite';
    favoriteButton.addEventListener('click', () => addToFavorites(superhero));

    li.appendChild(favoriteButton);
    resultsList.appendChild(li);

    // Add event listener to open superhero page on click
    li.addEventListener('click', () => openSuperheroPage(superhero));
  });
}



// Function to add superhero to favorites
function navigateToFavorites() {
  window.location.href = 'favorites.html';
}
function addToFavorites(superhero) {
  const favoritesList = document.getElementById('favorites-list');
  const li = document.createElement('li');
  li.textContent = superhero.name;

  
  // Store the favorite superhero in local storage
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(superhero);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  navigateToFavorites();
}





// Function to handle search
async function handleSearch() {
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value.trim();

  if (query === '') {
    alert('Please enter a search query.');
    return;
  }

  const results = await searchSuperheroes(query);
  displaySearchResults(results);
}

// Event listeners
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handleSearch);
