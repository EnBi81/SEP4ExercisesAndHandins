let apiEndpoint = 'https://pokeapi.co/api/v2/pokemon/';

async function getPokemon(nameOrId){
    getJsonFromUrl(apiEndpoint + encodeURIComponent(nameOrId))
        .then(pokemon => loadPokemon(pokemon));
}

function getJsonFromUrl(url){
    let promise = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.send();

        request.onreadystatechange = state => {
            if(request.readyState === 4 && request.status === 200){
                let pokemon = JSON.parse(request.responseText);
                resolve(pokemon);
            }
            else if(request.readyState === 4)
            {
                reject(request);
            }
        }
    });

    return promise;
}