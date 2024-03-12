const adjustLights=(lights)=>{
  const validatePattern= (lights,color)=>{
    let counter=0;
    //se valida si el primer elemento es diferente al color que se quiere validar y se aumenta el contador en caso de ser verdadero
    if(color!==lights[0]){
      counter++;
      lights[0]=color;
    }
    
    //se recorre el arreglo de luces hasta una posicion antes de terminar y se valida si el elemento actual es igual al siguiente, si es asi se cambia el valor del siguiente elemento y se aumenta el contador de cambios
    for(let index=0;index<lights.length-1;index++){
        if(lights[index]===lights[index+1]){
          lights[index+1] = lights[index]==="🔴"?"🟢":"🔴";
          counter++
        }
    }
    
    return counter;
    
  }
  //aqui se hace la validacion de los dos casos posibles y se retorna el menor de los dos valores
  const solution1= validatePattern([...lights],"🟢");
  const solution2= validatePattern([...lights],"🔴");
  return Math.min(solution1, solution2);
}
console.log(adjustLights(["🟢", "🔴", "🟢", "🟢", "🟢"]));
// -> 1 (cambias la cuarta luz a 🔴)

console.log(adjustLights(["🔴", "🔴", "🟢", "🔴", "🟢"]));
// -> 1 (cambia la primera luz a verde)

console.log(adjustLights(["🔴", "🔴", "🟢", "🟢", "🔴"]));
// -> 2 (cambias la segunda luz a 🟢 y la tercera a 🔴)

console.log(adjustLights(["🟢", "🔴", "🟢", "🔴", "🟢"]));
// -> 0 (ya están alternadas)

console.log(adjustLights(["🔴", "🔴", "🔴"]));
// -> 1 (cambias la segunda luz a 🟢)
