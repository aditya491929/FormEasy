import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {NavControllerProvider} from './context/NavContext';

ReactDOM.render(
  <React.StrictMode>
    <NavControllerProvider>
      <App />
    </NavControllerProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
