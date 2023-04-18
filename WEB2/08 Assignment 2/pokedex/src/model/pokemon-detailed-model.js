import {getPokemonObject} from "../networking/pokedex-api";
import {cachePokemonImages, getCachedImage} from "./cachePokemons";

let pokemonCache = {}

export function getPokemonDetailedObject(id){
    if(pokemonCache[id] !== undefined){
        return new Promise(resolve => resolve(pokemonCache[id]));
    }

    return getPokemonObject(id)
        .then(pokemon => {
            pokemonCache[id] = pokemon;

            // cache image if not cached yet:
            if(getCachedImage(id + '') === undefined){
                console.log('looking for image for ' + id)
                let newImage = scanObjectForFrontDefaultProperty(pokemon.sprites.versions);
                if(newImage != null){
                    console.log('found image for ' + id);
                    let pokemonToCache = [{
                        id,
                        image: newImage,
                    }]
                    cachePokemonImages(pokemonToCache);
                }
                else console.log('couldnt find an image for ' + id);
            }
            else console.log('image already cached for ' + id);

            return new Promise(resolve => resolve(pokemon));
        })
}

function scanObjectForFrontDefaultProperty(obj){
    for (const key of Object.keys(obj)) {
        let value = obj[key];

        if(value == null)
            continue;

        if(typeof value === 'string' || value instanceof String) {
            if(key === 'front_default')
                return value;

            continue;
        }

        if(Object.keys(value).length > 0){
            let valueRec = scanObjectForFrontDefaultProperty(value);
            if(valueRec != null)
                return valueRec;
        }
    }
    return null;
}
