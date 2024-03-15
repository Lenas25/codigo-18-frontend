
containerBill.onclick = function () {
    inputBill.focus();
};

containerPeople.onclick = function () {
    inputPeople.focus();
};

//evento para validar el input de bill
inputBill.onkeyup = (event) => {
    validateInputIfNumber(event, "event", containerBill, inputBill);
};

//evento para validar el input de people
inputPeople.onkeyup = (event) => {
    validateInputIfNumber(event, "event", containerPeople, inputPeople);
};

btnCalculate.onclick = function () {
    //se procede a hacer la operacion matematica
    //paso1:obtener los valores de nuestro input y botones
    const billValue=Number(inputBill.value);
    const peopleValue=Number(inputPeople.value);
    const getValuePercentage=percentages.find((percentage)=>percentage.isCheck
    ) ?? percentages.at(-1);


    const parsePercentage=Number(getValuePercentage.value.replace("%",""));

    const operation=billValue+(billValue*parsePercentage)/100;
    const operationPerPerson=operation/peopleValue;

    //paso2:mostrar el resultado en el DOM
    total.innerHTML=`$${operation.toFixed(2)}`;
    totalPerPerson.innerHTML=`$${operationPerPerson.toFixed(2)}`;

    //paso3:limpiar los input
    inputBill.value="";
    inputPeople.value="";
    percentages=percentages.map((percentage)=>{
        return{
            type:percentage.type,
            isCheck:false,
            value:percentage.type==="input"?"":percentage.value
        }
    });

    renderPercentageButtons(percentages);
}

/**
 * renderInput
 * Recibe 2 parametros
 * pertange: el objeto que obtenemos de cada iteracion
 * index: es el indice de cada objeto que existe dentro del array
 *
 * además tenemos atributos
 * value: va a tomar el valor que exista dentro de percentage.value
 * ojo: recurden que el valor de percentage.value por defecto es igual a ""
 *
 * ahora en este caso queremos que cuando el usuario escriba en el input
 * el boton que estaba seleccion se desmarque
 *
 * como queremos captura lo que el usuario escribe por teclado vamos a usar
 * el evento onkeyup, en este evento vamos a llamar a la funcion `setInputTip`
 * y le vamos a pasar this
 * Recordemos que en este context this = input
 */
function renderInput(text, index) {
  return `<input 
  type="text"
  value="${text.value}"
  data-index="${index}"
  id="input-bill-${index}"
  onkeyup="setCustomTip(this)"
  placeholder="Custom" 
  class=""
  autocomplete="off"/>`;
}

/**
 * renderButton
 * Esta funcion sirve para renderizar los botones que tenemos en la vista
 * ahora esta lista de botones funcion como si fueran radioButtons, es decir
 * podemos seleccionar solo 1 a la vez, por ende yo requiero saber a que boton
 * le dieron click y marcar ese como seleccionado
 */
function renderButtons(text, index) {
  /**
   * Paso1: Para poder darle un estilo diferente al boton que esta
   * seleccionado vamos usar la propiedad isCheck, por que recuerden que esa
   * propiedad va a ser true cuando el boton sea seleccionado
   */
  const extraClass = text.isCheck ? "active-btn" : "";
  /**
   * Cuando creamos el boton estamos asignando al funcion setButton(this) para
   * cada click del boton, entonces al igual que el input estamos creando el
   * data-index para poder saber la del boton al que le dieron click
   */
  return `<button 
  class="${extraClass}" 
  onclick="setButtonTip(this)" 
  data-index="${index}">${text.value}</button>`;
}

/**
 * setButtonTip
 * Recibe como parametro a un element que en este contexto es button
 * lo que queremos obtener de este button es el indice del boton al que le
 * dieron click, sabiendo eso haremos lo siguiente
 */
function setButtonTip(element) {
  // Paso1: Obtener el indice del button
  const buttonIndex = element.dataset.index;
  // Paso2: Entrar al array de objecto y buscar por indicie y cambiar la
  // propiedad isCheck = true
  percentages[buttonIndex].isCheck = true;
  // Paso3: Modificamos el valor de las otra opciones false
  for (let percentage in percentages) {
    // Paso4: Validamos que el indice sea diferente a buttonIndex
    if (percentage !== buttonIndex) {
      percentages[percentage].isCheck = false;
    }
  }
  // Paso5: Volvemos a renderizar lo botones con la informaciona actualizada
  renderPercentageButtons(percentages);
}

/**
 * setInputTip
 * Recibe como parametro a element, recordemos que element es basicamente el input
 * por ende puedo accede a sus propiedades
 */
function setCustomTip(element) {
  /**
   * Paso1: Es validar que unicamente podamos escribir numeros en el input
   * para ello primero vamos a capturar el valor actual del input
   * y vamos a evaluar lo siguiente
   */
  const validate = validateInputIfNumber(
    element, 
    "element", 
    element, 
    element);

  if (!validate) return;
  /**
   * Si la validaciones anteriores fueron exitosas entonces ahora procedemos a
   * poner todos los button a false, porque recorder que el objeto existe
   * la propiedad isCheck la cual usamos para saber si un boton esta
   * seleccionado
   *
   * Para pasar todo a false y además mantener el valor del input que estamos
   * escribien vamos usar la funcion map
   *
   * En la funcion estamos retornando la misma estructura
   *
   * {
   *  type: "button",
   *  isCheck: false,
   *  value: "4"
   * }
   *
   * En el type y el isCheck no hay nada nuevo siemplemente mantenemos el valor
   * de type y pasamos los isCheck a false, pero en caso de value quiero guardar
   * el valor que el usuario escribio, por ende hago una condicion
   *
   * Si el type es igual a input entonces cambio value = element.value, pero si
   * no se cumple esa condicion mantengo el valor por defecto
   */
  const percetangesFalse = percentages.map(function (percentage) {
    return {
      type: percentage.type,
      isCheck: false,
      value: percentage.type === "input" ? element.value : percentage.value,
    };
  });
  /**
   * Como en el map estamos creando un array con la informacion cambiada vamos a
   * pasarle ese nuevo array a la funcion renderPercentagesButtons la cual va a
   * recrear todo ese div con los nuevos valores
   */
  percentages = percetangesFalse;
  renderPercentageButtons(percentages);
  /**
   * Ocurre un problema como estamos volviendo a renderizar el div con los botones
   * e input, el focus (el cursor) del input se pierde, para ellos vamos a forzar
   * el focus de este elemento para que siempre este al final del text que esta
   * escribiendo el usuario
   */

  //Paso 1: Obtenemos el input que se acaba de crear
  const currentInput = document.querySelector(
    `#input-bill-${element.dataset.index}`
  );
  // A ese input le hacemos focus, pero sucede que al hacer focus es cursor va
  // a estar en la parte inicial del input
  currentInput.focus();
  // Para que el cursor se posicione en la parte final del texto usamos la
  // funcion setSelectionRange la cual va a permitirnos mover el cursor al final
  // pasandome la cantidad de caractares que tiene actualmente el input
  currentInput.setSelectionRange(
    currentInput.value.length,
    currentInput.value.length
  );
}

/**
 * renderPercentagesButtons
 * Recibe un array de objetos donde esos objetos son para hacer
 * el render de un boton o un input
 *
 */
function renderPercentageButtons(percentages) {
  //Paso1:limpiamos el contenedor para evitar que se dupliquen los botones
  containerPercentage.innerHTML = "";
  //Paso2:recorremos el array de porcentajes para poder pintar un boton o un input
  percentages.forEach((percentage, index) => {
    /**
     * En este la variable `html` la cual puede llamarse como ustedes quieran
     * toma su valor en base a una condicion la cual depdende `type` para
     * llamar a una funcion u otra
     */
    const html =
      percentage.type === "button"
        ? renderButtons(percentage, index)
        : renderInput(percentage, index);

    /**
     * En el contenedor vamos a adicionar cada elemento por ende usamos
     * el opera +=, si no usamos este operador y solo colocamos = que pasa, que
     * se reemplazaria en vez de adicionar
     */
    containerPercentage.innerHTML += html;
  });
}

//llamamos a la funcion para que cuando la pagina cargue se pinten los botones por defecto
renderPercentageButtons(percentages);
