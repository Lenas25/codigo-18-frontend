const findFirstRepeated = (gifts) => {
    const cleanNumbers = gifts.filter((gift, index) => 
    //primera vuelta gift=2, index=0, indexOf(2) = 0
    //segunda vuelta gift=1, index=1, indexOf(1) = 1
    //tercera vuelta gift=2, index=2, indexOf(2) = 0
    //cuarta vuelta gift=1, index=3, indexOf(1) = 1
    //indexOf busca la primera coincidencia, para separar los numeros repetidos
    gifts.indexOf(gift) !== index);
    //me retorna el primer numero que se repite
    console.log(cleanNumbers);
    //operador nullish coelising operator -> si el primer valor es null o undefined, retorna el segundo valor
    return cleanNumbers[0] ?? -1;
}

const giftsId=[2,1,2,1];

console.log(findFirstRepeated(giftsId));