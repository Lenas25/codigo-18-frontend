function manufacture(gifts, materials){
    const apperArray=gifts.filter((gift)=>{
        //split convierte un string en un array
        //every recorre el array y verifica si todos los elementos cumplen con la condicion, luego retorna un booleano y si todos cumplen con la condicion retorna true
        //en filter si la funcion retorna true el elemento se agrega al array
        return gift.split("").every((letter)=>{
            return materials.indexOf(letter)!==-1;
        })
    })
    return apperArray;
}

function manufacture2(gifts, materials){
    const results=[];
    
    gifts.forEach((gift)=>{
        let condition=true;
        for(let word of gift.split("")){
            //materials = palabra.indexOf(una sola letra)
            //es como decir si la palabra tiene la letra te arroja un numero
            //cual es el indice de word en materials
            if(materials.indexOf(word)===-1){
                condition=false;
                //cambio de valor y termina la ejecucion
                return;
            }
        }
        if(condition){
            results.push(gift);
        }
    });
    return results;
}




let gifts = ['juego', 'puzzle']
let materials = 'jlepuz'

console.log(manufacture(gifts, materials)) // ["puzzle"]

gifts = ['libro', 'ps5']
materials = 'psli'

console.log(manufacture(gifts, materials)) // []

gifts = ['tren', 'oso', 'pelota']
materials = 'tronesa'
console.log(manufacture(gifts, materials) )// ["tren", "oso"]