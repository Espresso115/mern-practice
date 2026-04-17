import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "18px",
            border: "1px solid rgba(227, 215, 199, 0.9)",
            background: "rgba(248, 244, 237, 0.96)",
            color: "#1f2520",
            boxShadow: "0 18px 45px -30px rgba(23, 29, 27, 0.55)",
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
)
