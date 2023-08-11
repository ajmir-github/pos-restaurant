import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StoreProvider } from "./state";
import { AuthProvider } from "./state/AuthState.jsx";
import PageLoading from "./components/PageLoading.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider>
      <AuthProvider LoadingComponent={<PageLoading />}>
        <App />
      </AuthProvider>
    </StoreProvider>
  </React.StrictMode>
);
