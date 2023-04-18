
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
        let pokemonCached = {
            orderNumber: res.orderNumber + '',
            cachedImage: dataUrl,
        };
        
        pokemonCachedImages.push(pokemonCached);
    }
    
    let textToSend = JSON.stringify(pokemonCachedImages);
    let byteArr = utf8Encode.encode(textToSend);
    port.postMessage(byteArr, [byteArr.buffer]);
 };
 
 async function cacheResource(resource) {
    let blob = await fetch(resource).then(r => r.blob());
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
    let text = JSON.stringify(pokemonPageResult);
    let dataToSend = utf8Encode.encode(text)
    main_worker.postMessage(dataToSend, [dataToSend.buffer]);
}

function addCachedPicturesToLocalStorage(data){
    let text = utf8Decode.decode(data);
    let results = JSON.parse(text);

    for (const result of results) {
        if(localStorage[result.orderNumber] === undefined){
            localStorage[result.orderNumber] = result.cachedImage;
        }
    }
}