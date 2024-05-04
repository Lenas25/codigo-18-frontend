
//describe: descripcion del test, titulo principal, luego recibe una funcion
describe('Probando home page', () => {
  //beforeEach: antes de cada test, se ejecuta la funcion que esta dentro
  beforeEach(()=>{
    cy.visit('http://localhost:5173/');
  })
  //it: descripcion del test individual, lo que va dentro es el paso a paso
  it('vamos a probar que el texto Lena Suarez exista', () => {
    //paso 2: buscar el texto
    cy.get('h1').contains('Lena Suarez');
  });

  it("vamos a probar que el input y boton funcione", () => {
    cy.get(".tasks").should("have.length", 0);
    cy.get('input[name="task"]').type('Hola Mundo');
    cy.wait(1000);
    cy.get('button').contains("Add Task").click();
    cy.get(".tasks").should("have.length", 1);
  });

})