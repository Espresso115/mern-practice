import HomePage from "./pages/HomePage.jsx"
import CreatePage from "./pages/CreatePage.jsx"
import NoteDetailPage from "./pages/NoteDetailPage.jsx"
import EditPage from "./pages/EditPage.jsx"
import Navbar from "./components/Navbar.jsx"
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div data-theme="atelier" className="app-shell">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <Navbar />

        <div className="mt-8 flex-1">
          {/* Each page keeps its own data logic while sharing the same outer shell. */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/note/:id" element={<NoteDetailPage />} />
            <Route path="/note/:id/edit" element={<EditPage />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
