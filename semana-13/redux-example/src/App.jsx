import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
//permite entrar a la informacion del store
import { useSelector, useDispatch } from "react-redux";
//para usar la funcion se debe importar la funcion que quiero usar del slice
import { increment, decrement, setValue } from "./app/slices/counterSlice";
import { setUserName } from "./app/slices/userSlice";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  //recibe una funcion, contiene el estado global, para acceder se realiza como un objeto
  const counter = useSelector((state) => state.counter.value);
  const userName = useSelector((state) => state.user.userName);

  //para poder usar una funcion creda en un slice debe importar a useDispatch que permite realizar la ejecucion de una funcion (siempre que queramos usar una funcion creada en un slice debemos llamar a useDispatch)
  const dispatch = useDispatch();

  const handleIncrease = () => {
    //llama a dispatch y pasa como parametro la funcion que quiero ejecutar
    dispatch(increment());
  };

  const handleDecrease = () => {
    if (counter > 0) {
      dispatch(decrement());
    }
  };

  const handleInputValue = (e) => {
    dispatch(setUserName(e.target.value));
  };

  return (
    <>
      <Header />
      <h1>REDUX PRACTICE</h1>
      <div className="card">
        <div>
          <input
            value={userName}
            type="text"
            onChange={handleInputValue}
            placeholder="Enter your name..."
          />
          <div className="counter">
            <div>
              <h2>El contador actual es: {counter}</h2>
            </div>
            <div>
              <button onClick={handleIncrease}>Increase counter</button>
              <button onClick={handleDecrease}>Decrease counter</button>
              <button onClick={() => dispatch(setValue(10))}>
                Boton con valor Custom
              </button>
            </div>
          </div>
        </div>
      </div>
      <Tasks />
    </>
  );
}

export default App;
