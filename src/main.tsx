import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { PdfContextProvider } from "./context/PdfContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PdfContextProvider>
      <App />
    </PdfContextProvider>
  </React.StrictMode>
);
