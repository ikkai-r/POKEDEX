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
            <div class="card-cont flex justify-center	items-center flex-col block max-w-xs max-h-xs p-6 mt-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <img src="${pokemon.sprites.versions['generation-v']['black-white'].front_default}" class="w-24 pokemon-icon-idle">
                        <div class="flex justify-center	items-center flex-col mt-1">
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

function changeIcon(element, mouseOver){
    const imgElement = element.querySelector('img');
    const pElement = element.querySelector('p');
    const parts = pElement.textContent.trim().split(' ');
    const id = parseInt(parts[1]);
    if(mouseOver) {
        imgElement.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' + id + '.gif';
        imgElement.classList.remove('w-24');
        imgElement.classList.add('w-20');
        imgElement.classList.add('mb-3');

    } else {
        imgElement.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/' + id + '.png';
        imgElement.classList.add('w-24');
        imgElement.classList.remove('w-20');
        imgElement.classList.remove('mb-3');
    }
   
}
