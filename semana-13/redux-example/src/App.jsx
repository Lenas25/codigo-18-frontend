import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
//permite entrar a la informacion del store
import { useSelector, useDispatch } from "react-redux";
//para usar la funcion se debe importar la funcion que quiero usar del slice
import { increment, decrement } from "./app/slices/counterSlice";
import Header from "./components/Header";

function App() {
  //recibe una funcion, contiene el estado global, para acceder se realiza como un objeto
  const counter = useSelector((state) => state.counter.value);

  //para poder usar una funcion creda en un slice debe importar a useDispatch que permite realizar la ejecucion de una funcion (siempre que queramos usar una funcion creada en un slice debemos llamar a useDispatch)
  const dispatch = useDispatch();

  const handleIncrease = () => {
    //llama a dispatch y pasa como parametro la funcion que quiero ejecutar
    dispatch(increment());
  };

  const handleDecrease = () => {
    dispatch(decrement());
  }

  return (
    <>
      <Header />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div>
          <button onClick={handleIncrease}>Increase counter</button>
          <button onClick={handleDecrease}>Decrease counter</button>
        </div>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
