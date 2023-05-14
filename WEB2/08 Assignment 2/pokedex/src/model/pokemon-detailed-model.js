import {getPokemonObject} from "../networking/pokedex-api";
import {cachePokemonImages, getCachedImage} from "./cachePokemons";
import {getModelPath, has3DModel} from "./pokemon-3d-models";

let pokemonCache = {}

export function getPokemonDetailedObject(id){
    if(pokemonCache[id] !== undefined){
        return new Promise(resolve => resolve(pokemonCache[id]));
    }

    return getPokemonObject(id)
        .then(pokemon => {
            pokemonCache[id] = pokemon;

            pokemon.model3d = {
                hasModel: has3DModel(id),
                path: getModelPath(id),
            }

            // scan for image if there is none cache image if not cached yet:
            if(getCachedImage(id + '') === undefined){
                let newImage = scanObjectForFrontDefaultProperty(pokemon.sprites.versions);
                if(newImage != null){
                    let pokemonToCache = [{
                        id,
                        image: newImage,
                    }]
                    cachePokemonImages(pokemonToCache);
                }
            }

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
