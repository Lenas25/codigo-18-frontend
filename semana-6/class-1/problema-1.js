// Problema 1
// Revetir cadena, no numeros

const invertirCadena = (str) => {
    // validamos si el parametro texto es una cadena
    let result = (typeof str !== "string") ? 
      "Unicamente se aceptan textos" : 
    // el reverse sirve para invertir un array
      str.split("").reverse().join("");
    
    return result;
  };
  
  
  console.log(invertirCadena(2));