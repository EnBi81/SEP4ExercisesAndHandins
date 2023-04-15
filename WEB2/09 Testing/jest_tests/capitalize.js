

export function capitalize(text){
    if(text.length === 0)
        return '';

    if(text.length === 1)
        return text.toUpperCase();

    let [firstChar] = text;

    return firstChar.toUpperCase() + text.substring(1);
}