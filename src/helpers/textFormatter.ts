export function capitalizeText(text: string){
    return text.split(' ').map(text => text[0].toUpperCase() + text.substring(1)).join(' ')
}