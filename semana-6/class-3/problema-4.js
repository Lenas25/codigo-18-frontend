function decode(message) {
    //este regex indica que busque todo lo que este entre parentesis y lo guarde en un grupo de captura
    const regex = /\(([^()]+)\)/g
    //este replacer recibe el grupo de captura y lo invierte con el metodo reverse,el group es un array, por lo que se debe convertir a string para poder invertirlo
    const replacer = (_, group) => [...group].reverse().join("")
    //este replace busca el regex y lo reemplaza por el replacer, entonces el group toma el valor de lo que esta entre parentesis y lo invierte
    return message
      .replace(regex, replacer)
      .replace(regex, replacer)
}
const a = decode('hola (odnum)')
console.log(a) // hola mundo

const b = decode('(olleh) (dlrow)!')
console.log(b) // hello world!

const c = decode('sa(u(cla)atn)s')
console.log(c) // santaclaus

// Paso a paso:
// 1. Invertimos el anidado -> sa(ualcatn)s
// 2. Invertimos el que queda -> santaclaus