import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n.js";
import App from "./App.jsx";
import { SERVER_BASE_URL } from "./apiConfig";

window.SERVER_BASE_URL = SERVER_BASE_URL;

const originalFetch = window.fetch.bind(window);
window.fetch = (input, init) => {
  const inputUrl = typeof input === "string"
    ? input
    : input instanceof URL
      ? input.toString()
      : input?.url;

  if (typeof inputUrl === "string" && inputUrl.startsWith("http://localhost:4000")) {
    const rewrittenUrl = inputUrl.replace("http://localhost:4000", SERVER_BASE_URL);

    if (typeof input === "string") {
      return originalFetch(rewrittenUrl, init);
    }

    if (input instanceof Request) {
      return originalFetch(new Request(rewrittenUrl, input), init);
    }

    return originalFetch(new Request(rewrittenUrl, input), init);
  }

  return originalFetch(input, init);
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);