
//NOTA 1
const numbers=[100,20,23,54,57,12]

// for of: valor
function forOfExample(){
  for(let number of numbers){
    console.log(number)
  }
}

// for in: indice
function forInExample(){
  for(let number in numbers){
    console.log(number)
  }
}

//map lo que hace es iterar y retornar un arreglo
function powNumbersMap(){
  const newNumbers = numbers.map((number)=>Math.pow(number,2));
  
  return newNumbers;
}

console.log(powNumbersMap())





//NOTA 2
// array de objetos
const books=[{
    id:1,
    title:"1984",
    country:"UK",
    pages:328,
    isbn:"9821928712812"
  },
  {
    id:2,
    title:"hamlet",
    country:"Denmark",
    pages:342,
    isbn:"9821928712812"
}]
  
// book.forEach((item)=>console.log(item.id))
// agregar la propedad imagen a books
// map retorna un array con la misma cantidad de elementos
const newBooks=books.map((book)=>{
    // retorna los valores de cada objeto en el array
    return {
      // spread operator para realizar una copia 
      ...book,
      img:"https://img..."
    }
})




//NOTA 3
// forEach no retorna nada, iterar un elemento y en la iteracion realizar actividades
const countVowels2=(names)=>{
    const vowelsRegex = /[aeiou]/gi;
      // el metodo match retorna an array con todas las coincidencias
    names.forEach((name)=>{
      let cont=0;
      const matches=name.match(vowelsRegex);
      console.log(`${name} - ${matches.length}`)
    });
      
}
  
const countVowels=(names)=>{
    let result=[];
    //los separa en un array
    const vowels = "aeiou".split("");
    //itera el array pasado
    names.forEach((name)=>{
      //convierte cada nombre en minuscula
      const nameInLowerCase=name.toLowerCase();
      let cont=0;
      //cada nombre se convierte en array y cada letra se itera con un forEach
      nameInLowerCase.split("").forEach((letter)=>{
        //verificar si el array vowel incluye alguna letra
        if(vowels.includes(letter)){
          cont++;
        }
      });
      
      //almacena en una variable el resultado como array de objetos
      result.push({
        name:name,
        count:cont
      });
      
    });
    
    //la funcion general retorna el array de objetos
    return result;
}
  
  
console.log(countVowels(["Pepe","Juan","Maria","Pedro"]))




//NOTA 4
//array.from crea un array con la longitud que se le pase y el segundo parametro es una funcion que recibe el valor y el indice del array creado y retorna el valor que se le asignara a cada elemento
const fizzBuzz=()=>{
    let newArr=[];
    //el for each itera el array que se le pasa y retorna un array con los valores que se le asignan a cada elemento
    Array.from( {length:100} , (v,i)=> i+1).forEach((item)=>{
      let value="";
      //si el residuo de la division de item entre 3 es 0, se le asigna fizz a la variable value
      if(item%3===0) value+="fizz";
      //si el residuo de la division de item entre 5 es 0, se le asigna buzz a la variable value
      if(item%5===0) value+="buzz";
      //si value es falso o vacio, se le asigna el valor de item
      newArr.push(value||item);
    })
    
    return newArr;
}
  
console.log(fizzBuzz())