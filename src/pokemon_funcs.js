import Pokedex from 'pokedex-promise-v2';

const P = new Pokedex();

export const getPokedexData = async (names) => {
    try {
        const response = await P.getPokemonByName(names);
        console.log(response)
        return response;
    } catch (error) {
        console.error('There was an ERROR:', error);
        throw error;
    }
};