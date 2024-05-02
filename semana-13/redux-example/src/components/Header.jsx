import { useSelector } from "react-redux";

export default function Header() {
  //para acceder a la variable de forma global se usa usSelector
  const counter = useSelector((state) => state.counter.value);

  return (
    <nav>
      <ul>
        <li>Inicio</li>
        <li>Nosotros</li>
        <li>Proyectos</li>
        <li>Contacto</li>
      </ul>
      <div>
        <h2>El contador actual es: {counter}</h2>
      </div>
    </nav>
  );
}
