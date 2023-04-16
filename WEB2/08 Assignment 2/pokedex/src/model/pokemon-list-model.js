import {getPokemonPage} from "../networking/pokedex-api";


export function getPokemonList(page, numberOfPokemonPerPage){
    return getPokemonPage(numberOfPokemonPerPage, (page - 1) * numberOfPokemonPerPage)
        .then(apiData => convertApiDataToLocal(apiData, page, numberOfPokemonPerPage));
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
    apiData.results = apiData.results.map(p => {
        let url = p.url;
        let id = url.substring(34, url.lastIndexOf('/'));

        p.id = id;
        p.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        return p;
    });

    apiData.currentPage = page;
    apiData.resultCount = numberOfPokemonPerPage;
    apiData.pageCount = Math.ceil(apiData.count / numberOfPokemonPerPage);

    return apiData;
}