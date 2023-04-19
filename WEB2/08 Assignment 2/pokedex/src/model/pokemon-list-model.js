import {getPokemonPage} from "../networking/pokedex-api";
import {cachePokemonImages, getCachedImage, getCachePokemonImageColor, getUseCaching} from './cachePokemons'


export function getPokemonList(page, numberOfPokemonPerPage){
    return getPokemonPage(numberOfPokemonPerPage, (page - 1) * numberOfPokemonPerPage)
        .then(apiData => {
            let convertedApiData = convertApiDataToLocal(apiData, page, numberOfPokemonPerPage);

            if(getUseCaching()){
                let pokemonsToCache = convertedApiData.results.filter(pok => !pok.isImageCached);
                if(pokemonsToCache.length > 0)
                    cachePokemonImages(pokemonsToCache);
            }

            return convertedApiData;
        });
}

export function getEmptyResponse(){
    return {
        count: 0,
        currentPage: 1,
        resultCount: 0,
        pageCount: 1,
        results: [],
    }
}

function convertApiDataToLocal(apiData, page, numberOfPokemonPerPage){
    let initialOrderNumber = (page - 1) * numberOfPokemonPerPage;
    apiData.results = apiData.results.map(p => {
        let url = p.url;
        let id = url.substring(34, url.lastIndexOf('/'));

        p.orderNumber = initialOrderNumber++;
        p.id = id;

        let localStorageImage = getCachedImage(p.id + '');
        if(localStorageImage === undefined){
            p.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            p.isImageCached = false;
        }
        else {
            p.image = localStorageImage;
            p.isImageCached = true;
        }

        p.bgColor = getCachePokemonImageColor(id);

        return p;
    });

    apiData.currentPage = page;
    apiData.resultCount = numberOfPokemonPerPage;
    apiData.pageCount = Math.ceil(apiData.count / numberOfPokemonPerPage);

    return apiData;
}


