import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  
  const sumar = () => setCount(count + 1);
  const reboot = () => setCount(0);
  const restar = () => setCount(count - 1);

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={sumar}>Sumar</button>
      <button onClick={reboot}>Reiniciar</button>
      <button onClick={restar}>Restar</button>
      <hr />
    </div>
  );
}
