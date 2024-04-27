import { useState } from "react";

export default function useInputValue() {
  const [inputValue, setInputValue] = useState("");
  //manejar el valor del input
  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  return { inputValue, handleInputValue };
}
