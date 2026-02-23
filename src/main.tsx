import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "spring") {
  import("./index-spring.css");
} else {
  import("./index.css");
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
