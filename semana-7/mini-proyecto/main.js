import data from "./data.js";

let tbodyCarrito = document.getElementById("tbody-carrito");
let container = document.getElementById("contenido");

let arrCarrito = [];

const cardsData = (data) => {
  //arrDatos=> data
  //convertir esto en algo que pueda entender el navegador
  let cardsHtml = "";
  data.forEach((item) => {
    //iterar sobre cada uno de los elementos y crear una tarjeta por cada uno de ellos
    cardsHtml += `
        <div class="tarjeta">
            <div class="imagen">
                <img src=${item.imagen}>
            </div>
            <div class="texto">
                <h4>${item.nombre}</h4>
                <p>${item.descripcion}</p>
                <div class="precio">
                    <span>S/ ${item.precio}</span>
                    <button class="btn-agregar" data-id="${item.id}">
                      Agregar
                    </button>
                </div>
            </div>
        </div>
    `;
  });
  //al cointainer le vamos a agregar el contenido de las tarjetas
  container.innerHTML = cardsHtml;
  //llamar a la funcion getButtons
  getButtons();
};

const getButtons = () => {
  //obtener botones por clase como array
  let btnsAdd = document.querySelectorAll(".btn-agregar");
  btnsAdd.forEach((btn) => {
    //recorrer el arreglo y agregar un evento a cada boton que se clickee
    //el event target es para saber que boton se esta clickeando y obtener su id especifico da un objeto
    btn.addEventListener("click", (event) => {
      let id = event.target.dataset.id;
      let dish = findDish(id);
      addShop(dish);
    });
  });
};

const findDish = (id) => {
  //con find encontramos el producto  que es un objeto con el id especifico
  let producto = data.find((item) => item.id == id);
  return producto;
};

const addShop = (dish) => {
  //si el arrCarrito incluye el producto que se esta clickeando
  if (arrCarrito.includes(dish)) {
    //aumentamos el stock
    dish.stock++;
  } else {
    //si no lo incluye lo agregamos al arrCarrito para que se muestre en el carrito de compras
    arrCarrito.push(dish);
  }
  //pero siempre que se agregue un producto al carrito se debe actualizar el carrito
  let row = "";
  //iteramos sobre el arrCarrito para mostrar los productos en el carrito
  arrCarrito.forEach((item) => {
    let subTotal = item.stock * item.precio;
    row += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.stock}</td>
                <td>${item.precio}</td>
                <td>${subTotal}</td>
            </tr>
        `;
  });
  //agregamos el contenido de la variable row al tbody del carrito
  let total = arrCarrito.reduce((acc, item) => acc+(item.stock * item.precio),0);
  row += `
        <tr>
            <td colspan="1">Total</td>
            <td></td>
            <td></td>
            <td>${total}</td>
        </tr>
    `;
  tbodyCarrito.innerHTML = row;
};

cardsData(data);
