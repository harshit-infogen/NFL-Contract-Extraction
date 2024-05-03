import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import New from "./New.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      {/* <App /> */}
      <New />
    </ThemeProvider>
  </React.StrictMode>
);
