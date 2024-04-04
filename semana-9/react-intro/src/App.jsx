import { useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { Counter } from "./components/Counter.jsx";
import { Input } from "./components/Input.jsx";

function App() {
  // Valor que cambia en el tiempo, el segundo parametro es una funcion que se encarga de cambiar el valor de count y en () el valor inicial de count
  // const [count, setCount] = useState(0);

  // const sumar = () => setCount(count + 1);

  // const handleInputValue = (event) => setName(event.target.value);

  return (
    <div>
      <Header name="Elena" />
      <Counter />
      <Input />
      {/* Aumentar que el componente footer reciba un companyName */}
      <Footer companyName="DevsL" />
    </div>
  );
}

export default App;
