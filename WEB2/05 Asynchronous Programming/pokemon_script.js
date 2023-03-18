let idField = document.getElementById('pok-id')
let nameField = document.getElementById('pok-name')
let xpField = document.getElementById('pok-base-xp')
let heightField = document.getElementById('pok-height')
let imageField = document.querySelector('.pokemon-image img');
let mainContentBox = document.querySelector('.content');

function loadPokemon(pokemon){
    idField.textContent = pokemon.id;
    nameField.textContent = pokemon.name;
    xpField.textContent = pokemon.base_experience;
    heightField.textContent = pokemon.height;

    let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    downloadAndSetImage(imageUrl)
}

function onImageLoad(imgTag){
    let numToHex = num => {
        num = num.toString(16);
        if(num.length === 1)
            num = '0' + num;
        return num;
    }

    let imgRgb = getAverageRGB(imageField);
    console.log(imgRgb)
    let imgHex = `#${numToHex(imgRgb.r)}${numToHex(imgRgb.g)}${numToHex(imgRgb.b)}`;
    mainContentBox.setAttribute('style', '--content-bg: ' + imgHex)
}

function downloadAndSetImage(url){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
        if (this.status !== 200) return;
        let blob = new Blob([this.response], {type: this.response.type});
        //rest of the code that uses the blob goes here
        let imageUrl = URL.createObjectURL(blob);
        imageField.src = imageUrl;
    };

    xhr.send();
}

function getAverageRGB(imgEl) {

    let blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        console.log(e)
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        if(data.data[i] < 5 && data.data[i+1] < 5 && data.data[i+2] < 5)
            continue;

        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb;

}