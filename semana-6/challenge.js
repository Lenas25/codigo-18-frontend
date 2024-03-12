// Ordenar un array de números:
// Escribe una función que tome un array de números como entrada y devuelva un nuevo array con los números ordenados de menor a mayor.

//otra manera
const ordenarSort=(arr)=>{
    return (typeof arr !== "object" && arr.length) < 0 || (arr.some(item => typeof item !== "number"))
      ? "No es un array o está vacío o los tipos del array no son números"
      //el sort recibe una function para ordenar ya sea ascendente o descendentemente
    : arr.sort((a,b)=>a-b)
    
    
}


//otra manera
const ordenar=(arr)=>{
    //se trabaja solo con un iterador que va cambiando
    let current=0;
    let sobrante=0;
    for(let i=1;i<arr.length;i++){
      //se guarda las posiciones que hay hasta el momento, por ejemplo el sobrante seria la posicion anterior a la actual
      sobrante=i-1;
      //se guarda el valor actual
      current=arr[i];
      console.log("current "+current);
      console.log("sobrante "+sobrante);
      //evalua si hay mas posiciones atras y si el valor actual es menor al valor de la posicion anterior
      while(sobrante>=0 && arr[sobrante]>current){
        //se cambia el valor de la posicion actual por el valor de la posicion anterior se usa el iterador para no alterar al i principal
        arr[sobrante+1]=arr[sobrante];
        console.log(arr);
        //se disminuye el sobrante para seguir evaluando hacia atras
        sobrante--;
        console.log("sobrante "+sobrante);
        console.log("-------------------")
      }
        //si ya no hay mas posiciones atras que sean mejores a la actual se cambia el valor de la posicion actual por el valor current que no se ha cambiado en todo el proceso
      arr[sobrante+1]=current;
      console.log("current "+current);
      console.log(arr);
    }
    
    return arr;
    

}
  
console.log(ordenar([4,2,1,0,6,2,9]))


// Contar la cantidad de palabras en una frase:
// Escribe una función que tome una frase como entrada y devuelva la cantidad de palabras que contiene. Puedes considerar que las palabras están separadas por espacios en blanco.

const cantidadPalabras=(str)=>{
    //crear un objeto donde se guardaran las palabras y su cantidad
    let newArr={};
    //convertir el string en un array y poner todo en minusculas
    let palabras=str.toLowerCase().split(" ");
    //recorrer el array de palabras
    palabras.forEach((item)=>{
      //por cada palabra se quitara el signo de puntuacion
      const signos=/[.,-;/]/gi;
      //metodo replace reemplaza el signo por un string vacio
      const letter=item.replace(signos,"")
      //si la palabra no existe en el objeto se creara y se le asignara el valor de 1
      if(!newArr[letter]){
        newArr[letter]=1;
      //si la palabra ya existe en el objeto se le sumara 1 a su valor
      }else{
        newArr[letter]+=1;
      }
    })
    
    return newArr;
};
  
console.log(cantidadPalabras("Me llamo, elena elena es mi nombre"))



// Determinar si una cadena es un palíndromo:
// Escribe una función que tome una cadena como entrada y devuelva true si es un palíndromo (es decir, se lee igual de izquierda a derecha que de derecha a izquierda) y false en caso contrario.

const palindromo=(word)=>{
    //se convierte la palabra en minusculas
    word=word.toLowerCase();
    //se convierte la palabra en un array, se invierte y se convierte en un string
    let reverse=word.split("").reverse().join("");
    //se compara si la palabra original es igual a la palabra invertida
    return word===reverse;
}
  
console.log(palindromo("reconocer"))




// Calcular el factorial de un número usando recursión:
// Escribe una función que calcule el factorial de un número utilizando recursión en lugar de un bucle.


const factorial=(number)=>{
    if(number==1){
      console.log(number)
      return 1;
    }
    //factorial(4)*5
    //factorial(3)*4*5
    //factorial(2)*3*4*5
    //factorial(1)*2*3*4*5
    //1*2*3*4*5
    return factorial(number-1)*number;
}
  
factorial(5); //120 6x5x4x3x2x1




// Calcular el número de Fibonacci:
// Crea una función que calcule el n-ésimo número de Fibonacci. El n-ésimo número de Fibonacci se calcula sumando los dos números anteriores en la secuencia Fibonacci.

const fibonacci = (number) =>{
    let newArr=[0,1];
    for(let i=2;i<number;i++){
      newArr[i]=newArr[i-1]+newArr[i-2]
    }
    
    return newArr;
}
  
console.log(fibonacci(10))




// Verificar si dos strings son anagramas:
// Escribe una función que tome dos strings como entrada y devuelva true si son anagramas (es decir, contienen las mismas letras en diferente orden) y false en caso contrario.

const anagrama=(word1, word2)=> word1.split("").sort().join("")==word2.split("").sort().join("")

console.log(anagrama("rama","roma")) //false


// Aplanar un array
function steamrollArray(arr) {
  // Base case
  const flattenedArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      //Si es un array se llama a la misma funcion para que se vuelva a evaluar
      
      flattenedArray.push(...steamrollArray(arr[i]));
      console.log(flattenedArray)
    } else {
      // Copy contents that are not arrays
      flattenedArray.push(arr[i]);
    }
  }
  return flattenedArray;
};

//caso 1
//1 es un numero por lo que se agrega al array
//2 es un array por lo que se llama a la funcion, se crea un nuevo array y se agrega el 2
//3 es un array por lo que se llama a la funcion, se crea un nuevo array y se agrega el 3
steamrollArray([1, [2], [3, [[4]]]]);