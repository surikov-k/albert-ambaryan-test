import { StrictMode } from "react";

import "@albert-ambaryan/styles/global.css";
import * as ReactDOM from "react-dom/client";

import App from "./app/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
