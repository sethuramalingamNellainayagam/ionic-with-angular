import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { AuthContextStoreProvider } from "./ContextStore/AuthContextStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextStoreProvider>
    <App />
  </AuthContextStoreProvider>
);
