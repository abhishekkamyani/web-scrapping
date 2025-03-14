import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WebsitesMetadataProvider } from "./contexts/WebsitesMetadataContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WebsitesMetadataProvider>
        <App />
      </WebsitesMetadataProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
