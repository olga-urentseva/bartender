import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const savedTheme = localStorage.getItem("theme");

const cssLoad = savedTheme === "spring"
  ? import("./index-spring.css")
  : import("./index.css");

cssLoad.then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});