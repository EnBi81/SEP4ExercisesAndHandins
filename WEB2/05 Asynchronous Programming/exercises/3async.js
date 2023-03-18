let apiEndpoint = 'https://pokeapi.co/api/v2/pokemon/';

async function getPokemon(nameOrId){
    let result = await fetch(apiEndpoint + encodeURIComponent(nameOrId));
    let json = await result.json();
    loadPokemon(json);
}
