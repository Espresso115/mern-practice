import { NotebookText, PenSquare } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const navigationLinks = [
  { label: "Home", to: "/" },
  { label: "Create", to: "/create" },
];

const Navbar = () => {
  return (
    <header className="surface-panel rounded-[1.75rem]">
      <div className="flex flex-col gap-4 px-5 py-5 sm:px-7 sm:py-6 lg:flex-row lg:items-center lg:justify-between">
        <Link to="/" className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-lg shadow-primary/20">
            <NotebookText size={22} />
          </div>

          <div>
            <p className="section-label">Minimal notes workspace</p>
            <h1 className="text-2xl font-semibold text-base-content">Ledger Notes</h1>
          </div>
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <nav className="flex items-center gap-2 rounded-full border border-base-300/80 bg-base-100/75 p-1.5">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm transition ${
                    isActive
                      ? "bg-neutral text-neutral-content shadow-sm"
                      : "text-base-content/70 hover:text-base-content"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/create" className="btn btn-primary rounded-full px-5">
            <PenSquare size={16} />
            New Note
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
