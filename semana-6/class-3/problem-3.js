function findNaughtyStep(original, modified) {
    if(original.length === modified.length) return '';
    let [min,max]=[original,modified].sort((a,b)=>a.length-b.length);
    //el fon in sirve porque se puede romper el ciclo con return, pero no se puede usar con forEach
    // for(let i in max){
    //     if(max[i]!==min[i]){
    //         return max[i];
    //     }
    // }

    //aqui el filter recorre el array y retorna un nuevo array con los elementos que cumplan con la condicion
    const word=max.split("").filter((letter,index)=>min[index]!==letter).join("");
    //pero como el filter retorna un array, solo se desea el primer elemento del array que es el que cumple con la condicion
    return word[0];
}

function findNaughtyStep2(original, modified) {
    if(original.length === modified.length) return '';
    const mayor= original.length>modified.length ? original : modified;
    const menor= original.length<modified.length ? original : modified;
    for(let i in mayor){
        if(mayor[i]!==menor[i]){
            return mayor[i];
        }
    }
}



let original = 'abcd' //a, b, c, d
let modified = 'abcde' //a, b, c, d, e
console.log(findNaughtyStep(original, modified)) // 'e'

original = 'steppfor'
modified = 'steppfor'
console.log(findNaughtyStep(original, modified)) // 'f'

original = 'abcde'
modified = 'abcde'
console.log(findNaughtyStep(original, modified)) // ''