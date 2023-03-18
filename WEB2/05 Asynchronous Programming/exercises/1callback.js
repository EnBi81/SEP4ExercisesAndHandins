let apiEndpoint = 'https://pokeapi.co/api/v2/pokemon/';

function getPokemon(nameOrId){
    let request = new XMLHttpRequest();
    request.open('GET', apiEndpoint + encodeURIComponent(nameOrId));
    request.send();

    request.onreadystatechange = state => {
        if(request.readyState === 4 && request.status === 200){
            let pokemon = JSON.parse(request.responseText);
            loadPokemon(pokemon)
        }

        if(request.readyState === 4 && request.status === 404)
        {
            alert('This pokemon does not exist')
        }
    }
}
