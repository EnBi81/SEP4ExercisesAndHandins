
export function getPokemonPage(limit, offset){
    return getAsJson(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
}

export function getPokemonObject(pokemonId){
    return getAsJson(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
}

function getAsJson(url){
    return getRequest(url).then(response => response.json());
}

function getRequest(url){
    return fetch(url, {
        headers:{
            'Cache-Control': 'force-cache'
        },
        cache: 'force-cache'
    });
}

