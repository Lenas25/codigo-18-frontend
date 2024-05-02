import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { globalStore } from "./app/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* recibe store como props, provider envuelve todo el proyecto donde asi pasar el store para usar las variables en cualquier parte */}
    <Provider store={globalStore} >
      <App />
    </Provider>
  </React.StrictMode>
);
