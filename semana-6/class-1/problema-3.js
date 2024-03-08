// true primo y false si no lo es
const esPrimo=(number)=>{
    if(typeof number !="number") return "Solo se acepta numeros"
    // cuenta los numeros divisibles
    if(number === 1) return false
    let contador=0;
    for(let i=0; i<=number;i++){
      if(number%i==0){
        contador++
      }
    }
    // retorna si es divisible solo por dos numeros, 1 y su mismo numero
    return (contador==2)
}

// del profesor
const esPrimoOtro=(number)=>{
    if(typeof number !="number") return "Solo se acepta numeros"
    for (let i=2; i<number;i++){
      if(number%i===0){
        return false;
      }
    }
    
    return number!==1;
}