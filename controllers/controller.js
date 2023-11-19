import { getPokedexData } from '../src/pokemon_funcs.js'; 

const controller = {
    getIndex: async function(req, res) {
        try {
            const pokemonData = await getPokedexData(Array.from({ length: 20 }, (_, index) => index + 1));
            res.render('index', { pokemonData });
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
            res.status(500).send('Error fetching Pokémon data.');
        }
    }
};

export default controller;
