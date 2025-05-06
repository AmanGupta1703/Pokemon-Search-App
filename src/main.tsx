import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import PokemonContextProvider from "./contexts/PokemonContext.tsx";

import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PokemonContextProvider>
      <App />
    </PokemonContextProvider>
  </StrictMode>,
);
