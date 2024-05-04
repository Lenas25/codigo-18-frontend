import { useSelector } from "react-redux";

export default function Header() {
  //para acceder a la variable de forma global se usa usSelector
  const userName = useSelector((state) => state.user.userName);

  return (
    <>
      <nav>
        <h1 className="user">{userName}</h1>
        <ul>
          <li>Inicio | </li>
          <li>Nosotros | </li>
          <li>Proyectos | </li>
          <li>Contacto</li>
        </ul>
      </nav>
    </>
  );
}
