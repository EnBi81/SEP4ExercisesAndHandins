export function caesarCipher(text, shift){
    let [...chars] = text;

    const aCharCode = 'a'.charCodeAt(0);
    const zCharCode = 'z'.charCodeAt(0);

    return chars.map(c => {
        let charCode = c.charCodeAt(0);

        if(charCode < aCharCode || charCode > zCharCode)
            return c;

        let cipherCode = (charCode - aCharCode + shift) % (zCharCode - aCharCode + 1) + aCharCode;
        return String.fromCharCode(cipherCode);
    }).join('')
}