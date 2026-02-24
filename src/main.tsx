import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

const savedTheme = localStorage.getItem("theme");
document.documentElement.style.setProperty("--varrr", savedTheme === "spring" ? "spring" : "default");

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
