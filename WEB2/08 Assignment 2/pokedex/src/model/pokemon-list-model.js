import {getPokemonPage} from "../networking/pokedex-api";

let jsonString = '{"count":1279,"next":"https://pokeapi.co/api/v2/pokemon?offset=50&limit=50","previous":null,"results":[{"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"},{"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon/2/"},{"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},{"name":"charmander","url":"https://pokeapi.co/api/v2/pokemon/4/"},{"name":"charmeleon","url":"https://pokeapi.co/api/v2/pokemon/5/"},{"name":"charizard","url":"https://pokeapi.co/api/v2/pokemon/6/"},{"name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon/7/"},{"name":"wartortle","url":"https://pokeapi.co/api/v2/pokemon/8/"},{"name":"blastoise","url":"https://pokeapi.co/api/v2/pokemon/9/"},{"name":"caterpie","url":"https://pokeapi.co/api/v2/pokemon/10/"},{"name":"metapod","url":"https://pokeapi.co/api/v2/pokemon/11/"},{"name":"butterfree","url":"https://pokeapi.co/api/v2/pokemon/12/"},{"name":"weedle","url":"https://pokeapi.co/api/v2/pokemon/13/"},{"name":"kakuna","url":"https://pokeapi.co/api/v2/pokemon/14/"},{"name":"beedrill","url":"https://pokeapi.co/api/v2/pokemon/15/"},{"name":"pidgey","url":"https://pokeapi.co/api/v2/pokemon/16/"},{"name":"pidgeotto","url":"https://pokeapi.co/api/v2/pokemon/17/"},{"name":"pidgeot","url":"https://pokeapi.co/api/v2/pokemon/18/"},{"name":"rattata","url":"https://pokeapi.co/api/v2/pokemon/19/"},{"name":"raticate","url":"https://pokeapi.co/api/v2/pokemon/20/"},{"name":"spearow","url":"https://pokeapi.co/api/v2/pokemon/21/"},{"name":"fearow","url":"https://pokeapi.co/api/v2/pokemon/22/"},{"name":"ekans","url":"https://pokeapi.co/api/v2/pokemon/23/"},{"name":"arbok","url":"https://pokeapi.co/api/v2/pokemon/24/"},{"name":"pikachu","url":"https://pokeapi.co/api/v2/pokemon/25/"},{"name":"raichu","url":"https://pokeapi.co/api/v2/pokemon/26/"},{"name":"sandshrew","url":"https://pokeapi.co/api/v2/pokemon/27/"},{"name":"sandslash","url":"https://pokeapi.co/api/v2/pokemon/28/"},{"name":"nidoran-f","url":"https://pokeapi.co/api/v2/pokemon/29/"},{"name":"nidorina","url":"https://pokeapi.co/api/v2/pokemon/30/"},{"name":"nidoqueen","url":"https://pokeapi.co/api/v2/pokemon/31/"},{"name":"nidoran-m","url":"https://pokeapi.co/api/v2/pokemon/32/"},{"name":"nidorino","url":"https://pokeapi.co/api/v2/pokemon/33/"},{"name":"nidoking","url":"https://pokeapi.co/api/v2/pokemon/34/"},{"name":"clefairy","url":"https://pokeapi.co/api/v2/pokemon/35/"},{"name":"clefable","url":"https://pokeapi.co/api/v2/pokemon/36/"},{"name":"vulpix","url":"https://pokeapi.co/api/v2/pokemon/37/"},{"name":"ninetales","url":"https://pokeapi.co/api/v2/pokemon/38/"},{"name":"jigglypuff","url":"https://pokeapi.co/api/v2/pokemon/39/"},{"name":"wigglytuff","url":"https://pokeapi.co/api/v2/pokemon/40/"},{"name":"zubat","url":"https://pokeapi.co/api/v2/pokemon/41/"},{"name":"golbat","url":"https://pokeapi.co/api/v2/pokemon/42/"},{"name":"oddish","url":"https://pokeapi.co/api/v2/pokemon/43/"},{"name":"gloom","url":"https://pokeapi.co/api/v2/pokemon/44/"},{"name":"vileplume","url":"https://pokeapi.co/api/v2/pokemon/45/"},{"name":"paras","url":"https://pokeapi.co/api/v2/pokemon/46/"},{"name":"parasect","url":"https://pokeapi.co/api/v2/pokemon/47/"},{"name":"venonat","url":"https://pokeapi.co/api/v2/pokemon/48/"},{"name":"venomoth","url":"https://pokeapi.co/api/v2/pokemon/49/"},{"name":"diglett","url":"https://pokeapi.co/api/v2/pokemon/50/"}]}';


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
    apiData.pageCount = Math.ceil(apiData.count / page);

    return apiData;
}