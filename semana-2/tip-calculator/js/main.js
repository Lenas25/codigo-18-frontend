const containerBill = document.querySelector("#container-bill");
const inputBill = document.querySelector("#input-bill");
const inputPeople = document.querySelector("#number-people");
const containerPeople = document.querySelector("#container-people");
const containerPercentage= document.querySelector("#container-percentage");
const btnsTips= document.querySelectorAll("[data-set]");

//array con valores de los botones
const percentages=[
    {
        id:1,
        type:"button",
        value:"5%"
    },
    {
        id:2,
        type:"button",
        value:"10%"
    },
    {
        id:3,
        type:"button",
        value:"15%"
    },
    {
        id:4,
        type:"button",
        value:"25%"
    },
    {
        id:5,
        type:"button",
        value:"50%"
    },
    {
        type:"input",
        value:""
    }
]

//funcion para validar que el input sea un numero valido
const validarInput = (inputValue,input, container) => {
    if(isNaN(inputValue)){
        // Remove the last character
        input.value = inputValue.slice(0, -1);
    }else if(!(inputValue === "")){
        //mostrar el input con un borde verde si es un numero valido y no es un vacio
        container.classList.add("border","border-[#26c0ab]", "border-2");
    }
}

//funcion para validar que el input no sea 0
const validarZero = (inputValue, container) => {
    if(inputValue[0]=== "0"){
        //mostrar el input con un borde rojo y un mensaje Can't be zero
        container.classList.add("border","border-red-500", "border-2");
    }else{
        container.classList.remove("border","border-red-500", "border-2");

    }
}

//evento para validar el input de bill
inputBill.onkeyup = (event)=> {
    const inputValue= event.target.value;
    validarZero(inputValue, containerBill);
    validarInput(inputValue, inputBill, containerBill);

}

//evento para validar el input de people
inputPeople.onkeyup = (event)=> {
    const inputValue= event.target.value;
    validarZero(inputValue, containerPeople);
    validarInput(inputValue, inputPeople, containerPeople);
}

//funcion para renderizar los botones
function renderButtons(text, index) {
    return `<button onclick="setButtonTip(this)" id="button-percentage-${index}">${text}</button>`
}

//funcion para renderizar el input
function renderInput (index) {
    return `<input id="input-percentage-${index}" type="text" placeholder="Custom" autocomplete="off"/>`
}

//recorrer el array de porcentajes y agregar el html al container
percentages.forEach((percentage,index) => {
    //se guarda el html en una constante
    const html=
    percentage.type==="button"
    ? renderButtons(percentage.value, index)
    : renderInput(index);
    
    containerPercentage.innerHTML += html;
})

btnsTips.forEach((btnTip) => {
    btnTip.onclick = (event) => {
        btnTip.classList.add("bg-[#26c0ab]","text-white");
        event.preventDefault();
    }
});

function setButtonTip(element){
    element.classList.add("bg-[#26c0ab]","text-white");   
}


const total= () => {
    if(!(inputBill.value === "") && !(inputPeople.value === "")){
        const bill= inputBill.value;
        const people= inputPeople.value;
        console.log(bill, people);
    }
}


// customTip.onkeyup = (event)=> {
//     const inputValue= event.target.value;
//     validarZero(inputValue, customTip);
//     validarInput(inputValue, customTip, customTip);
// }