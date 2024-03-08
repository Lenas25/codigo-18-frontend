//contar cantidad de vocales

const contarVocales = (str) => {
    if (typeof str !== "string") return "Unicamente deseamos texto"
    
    //un grupo de regex el g,global significa que buscara todas las ocurrencias, no se parara solo en la primera y el i, case-insensitive significa que no debe ser sensible a mayusculas y minusculas
    const vowelsRegex = /[aeiou]/gi;
    
    // el metodo match retorna an array con todas las coincidencias
    const matches = str.match(vowelsRegex);
  
    //verifica si la expresion es truthy es decir si no es null, undefined, false, 0, NaN o una cadena vacía
    return matches ? matches.length : 0;
};

//metodo del profesor
const contarVocalesProf = (str) => {
    if (typeof str !== "string") return "Unicamente deseamos texto"
    
    const vocales="aeiou".split("");
    const textoMinuscula=str.toLowerCase();
    let contador=0;
    
    for(let letter in str){
      // verificar si existe la letra de la palabra en las vocales en forma de array
      if(vocales.includes(textoMinuscula[letter])){
        contador++;
      }
    }
    return `La cantidad de vocales son ${contador}`;
};

//metodos de regex
const regex = (str) => {
    const vowelsRegex = /[aeiou]/gi;
    // el metodo exec retorna un objeto con los datos del regex
    let matches = vowelsRegex.exec(str);
    // el metodo test te dice si hay o no coincidencia
     matches = vowelsRegex.test(str);
    // el metodo search retorna el indice de la primera coincidencia
     matches = str.search(vowelsRegex);
    
    return matches;
};

console.log(contarVocales("jijiioo"));
  
console.log(contarVocales("hola"));