
// start up background worker
const main_worker_url = makeWorkerURL( `
  let utf8Encode = new TextEncoder();
  let utf8Decode = new TextDecoder();

  let port;

  onmessage = async (evt) => {
    if(evt.data === "port"){
        port = evt.ports[ 0 ];
        return;
    }
    
    let textData = utf8Decode.decode(evt.data);
    let pokemonResult = JSON.parse(textData);
    let pokemonImagesToCache = pokemonResult;
    let pokemonCachedImages = [];
    
    
    for(const res of pokemonImagesToCache){
        let dataUrl = await cacheResource(res.image);
        if(dataUrl == null)
            continue;
        
        let pokemonCached = {
            id: res.id + '',
            cachedImage: dataUrl,
        };
        
        pokemonCachedImages.push(pokemonCached);
    }
    
    let textToSend = JSON.stringify(pokemonCachedImages);
    let byteArr = utf8Encode.encode(textToSend);
    port.postMessage(byteArr, [byteArr.buffer]);
 };
 
 async function cacheResource(resource) {
    let response = await fetch(resource);
        
    if(!response.ok)
        return null;
        
    let blob = await response.blob();
    let dataUrl = await new Promise(resolve => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
    
    return dataUrl;
 }
` );

const main_worker = new Worker( main_worker_url );
const channel = new MessageChannel();
channel.port1.onmessage = ({ data }) => addCachedPicturesToLocalStorage(data);
main_worker.postMessage("port", [channel.port2]);


function makeWorkerURL( content ) {
    const blob = new Blob([content], { type: "text/javascript" });
    return URL.createObjectURL( blob );
}

let utf8Encode = new TextEncoder();
let utf8Decode = new TextDecoder();

export function cachePokemonImages(pokemonPageResult){
    if(!getUseCaching())
        return;

    let text = JSON.stringify(pokemonPageResult);
    let dataToSend = utf8Encode.encode(text)
    main_worker.postMessage(dataToSend, [dataToSend.buffer]);
}

function addCachedPicturesToLocalStorage(data){
    let text = utf8Decode.decode(data);
    let results = JSON.parse(text);

    for (const result of results) {
        let id = result.id;
        if(localStorage[id] === undefined){
            localStorage[id] = result.cachedImage;

            if(id in cacheItemListener){
                cacheItemListener[id](result.cachedImage);
                delete cacheItemListener[id];
            }
        }
    }
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

export function getCachedImage(id){
    return localStorage[id];
}

let cacheItemListener = {}

export function addCachedItemListener(id, callback){
    cacheItemListener[id] = callback;
}

export function cachePokemonImageColor(id, color){
    if(!getUseCaching())
        return;

    let key = id + 'color';
    if(localStorage[key] === undefined)
        localStorage[key] = color;
}

export function getCachePokemonImageColor(id){
    let key = id + 'color';
    return localStorage[key];
}