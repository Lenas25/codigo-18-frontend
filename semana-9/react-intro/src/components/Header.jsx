export function Header(props) {
    return (
      <div>
        <ul>
            <li>Home</li>
            <li>About Me</li>
            <li>Contact Me</li>
        </ul>
        <div>
          <h2>Hola {props.name}</h2>
        </div>
      </div>
    );
  };