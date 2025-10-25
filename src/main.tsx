import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Chapter1 from "./pages/chapter-1.tsx"
import NextEvent from "./pages/next-event.tsx"
import Admin from "./pages/admin.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NextEvent />} />
        <Route path="/chapter-1" element={<Chapter1 />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

