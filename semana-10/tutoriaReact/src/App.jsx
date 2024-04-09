import {useState} from "react";
import './App.css';

function App() {
  const [backgroundColor, setBackgroundColor] = useState("");

  const handleChange = (e) => {
    setBackgroundColor(e.target.value);
  }

  return (
    <div className="app" style={{backgroundColor}}>
      <span>Seleccionar un color:</span>
      <input 
      type="text" 
      placeholder="#FF0000" 
      onChange={handleChange} />
    </div>
  );
}

export default App;
