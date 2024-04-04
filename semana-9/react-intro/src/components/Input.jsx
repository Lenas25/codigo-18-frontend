import { useState } from "react";

export function Input() {
  const [name, setName] = useState("");
  const handleInputValue = (event) => setName(event.target.value);

  return (
    <div>
      <h2>Inputs</h2>
      <p>Name: {name}</p>
      <input type="text" value={name} onChange={handleInputValue} />
    </div>
  );
}
