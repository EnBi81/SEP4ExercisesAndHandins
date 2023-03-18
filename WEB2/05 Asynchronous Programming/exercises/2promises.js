let apiEndpoint = 'https://pokeapi.co/api/v2/pokemon/';

function getPokemon(nameOrId){
    fetch(apiEndpoint + encodeURIComponent(nameOrId))
        .then(result => result.json())
        .then(json => loadPokemon(json))
}
