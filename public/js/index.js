let isLoading = false;
let currIndex = 21; 
const pokemonCardCont = document.getElementById('pokemon-card-container');

// Function to fetch more data
async function fetchMoreData() {
  isLoading = true;
    try {
        for (let id = currIndex; id < currIndex + 15; id++) {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
        const pokemon = await response.json();
        pokemonCardCont.innerHTML += `
            <a href="#" class="block max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <img src="${pokemon.sprites.versions['generation-v']['black-white'].front_default}">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white pokemon-title">${pokemon.name}</h5>
            </a>
        `;
        }
        currIndex += 15;
    } catch (error) {
        console.error('Error fetching more data:', error);
    } finally {
        isLoading = false;
    }
}

// Event listener for scroll
window.addEventListener('scroll', async () => {
  if (!isLoading && window.scrollY + 100 >= document.documentElement.scrollHeight - document.documentElement.clientHeight) {
    await fetchMoreData();
  }
});
