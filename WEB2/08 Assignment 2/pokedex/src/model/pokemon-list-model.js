import {getPokemonPage} from "../networking/pokedex-api";
import {cachePokemonImages} from './cachePokemons'


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

        let localStorageImage = localStorage[p.orderNumber + ''];
        if(localStorageImage === undefined){
            p.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            p.isImageCached = false;
        }
        else {
            p.image = localStorageImage;
            p.isImageCached = true;
        }

        return p;
    });

    apiData.currentPage = page;
    apiData.resultCount = numberOfPokemonPerPage;
    apiData.pageCount = Math.ceil(apiData.count / numberOfPokemonPerPage);

    return apiData;
}


export function getUseCaching(){
    let useCachingLocalStorage = localStorage['use-caching'];
    if(useCachingLocalStorage === undefined)
        return true;

    return useCachingLocalStorage === '1';
}

export function setUseCaching(useCaching){
    localStorage['use-caching'] = useCaching ? '1' : '0';
}

export function clearCache(){
    let useCaching = getUseCaching();
    localStorage.clear()
    setUseCaching(useCaching);
}

export function getCacheSizeKB(){
    let _lsTotal = 0,
        _xLen, _x;
    for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x) || _x === 'use-caching') {
            continue;
        }
        _xLen = ((localStorage[_x].length + _x.length) * 2);
        _lsTotal += _xLen;
    }

    return (_lsTotal / 1024).toFixed(2);
}