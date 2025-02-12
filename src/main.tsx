import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import PSPDFKit from "pspdfkit";

export async function preloadPsPdfKit(): Promise<void> {
  return PSPDFKit.preloadWorker({
    container: "",
    document: "",
    baseUrl: `${window.location.protocol}//${window.location.host}/`,
    inlineWorkers: false,
  });
}

preloadPsPdfKit().catch(console.error);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
