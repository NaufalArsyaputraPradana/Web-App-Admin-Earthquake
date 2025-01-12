import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import RouteList from "./RouteList";
import Store from "./Pages/Redux/Store";
import "./index.css"; // Impor styling

// Validasi elemen root
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element with ID 'root' not found!");
}

// Render aplikasi
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={RouteList} />
    </Provider>
  </StrictMode>
);
