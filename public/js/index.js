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
        let htmlTypes = ``;
        
        pokemon.types.forEach(element => {
            htmlTypes += `<span class="${element.type.name} text-xs font-medium me-2 px-2.5 py-0.5 rounded">${element.type.name}</span>
            `;
        });
        pokemonCardCont.innerHTML += `
            <div class="card-cont flex justify-center items-center flex-col block max-w-xs max-h-40 p-6 mt-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 hover:border-zinc-400 hover:border-2">
                <div class="pokemon-img-cont container flex justify-center w-24 h-24">
                        <img src="${pokemon.sprites.versions['generation-v']['black-white'].front_default}" class="pokemon-icon-idle">
                </div>
                        <div class="flex justify-center	items-center flex-col -pt-2">
                        <p class="text-xs text-gray-500 dark:text-gray-400">N° ${pokemon.id}</p>
                        <h5 class="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white pokemon-title">${pokemon.name}</h5>  
                        <div>
                            ` + htmlTypes +
                            `
                    </div>  
                </div>
            </div>
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
