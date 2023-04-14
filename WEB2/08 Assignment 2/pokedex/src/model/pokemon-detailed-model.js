import {getPokemonObject} from "../networking/pokedex-api";

let pokemonCache = {}

export function getPokemonDetailedObject(id){
    if(pokemonCache[id] !== undefined){
        return new Promise(resolve => resolve(pokemonCache[id]));
    }

    return getPokemonObject(id)
        .then(pokemon => {
            pokemonCache[id] = pokemon;
            return new Promise(resolve => resolve(pokemon));
        })
}