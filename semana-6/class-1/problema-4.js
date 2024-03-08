// suma de elemenos de un array

const sumArray = (arr) => {
    return (typeof arr !== "object" && arr.length) < 0 || (arr.some(item => typeof item !== "number"))
    // para verificar si alguno de los datos del array es diferente a un numero
      ? "No es un array o está vacío o los tipos del array no son números"
      : arr.reduce((acc, item) => acc + item);
};
  
  
console.log(sumArray([1,"10",5]));
console.log(sumArray([20,43,3]));


// promedio de un array

const promArray = (arr) => {
    return (typeof arr !== "object" && arr.length) < 0 || (arr.some(item => typeof item !== "number"))
    // para verificar si alguno de los datos del array es diferente a un numero
      ? "No es un array o está vacío o los tipos del array no son números"
      : arr.reduce((acc, item) => acc + item)/arr.length;
};