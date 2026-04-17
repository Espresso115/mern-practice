import axios from "axios";
import { Plus, RefreshCw, StickyNote } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoteCard from "../components/NoteCard.jsx";

const API_URL = "/api/notes";

function formatLatestDate(dateString) {
  if (!dateString) {
    return "No recent activity";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchNotes = async () => {
    try {
      setErrorMessage("");
      setIsLoading(true);

      const response = await axios.get(API_URL);

      // We sort once on the client so the newest note stays first even if the API order changes.
      const sortedNotes = [...response.data].sort(
        (firstNote, secondNote) =>
          new Date(secondNote.createdAt) - new Date(firstNote.createdAt)
      );

      setNotes(sortedNotes);
    } catch (error) {
      console.error("Could not load notes.", error);
      setErrorMessage("We couldn't load your notes right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const latestNote = notes[0];

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="surface-panel rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
          <p className="section-label">Overview</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight text-base-content sm:text-5xl">
            Notes, arranged with clarity and a quiet professional feel.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-base-content/70 sm:text-lg">
            Browse every note, jump into the details, or create a new draft in a
            workspace that stays clean and focused.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/create" className="btn btn-primary rounded-full px-6">
              <Plus size={17} />
              Create Note
            </Link>

            <button
              type="button"
              onClick={fetchNotes}
              className="btn btn-ghost rounded-full border border-base-300 bg-base-100/70 px-6 text-base-content/75 hover:bg-base-200"
            >
              <RefreshCw size={17} />
              Refresh
            </button>
          </div>
        </div>

        <aside className="surface-panel rounded-[2rem] px-6 py-8 sm:px-7">
          <p className="section-label">Quick glance</p>

          <div className="mt-5 grid gap-4">
            <div className="rounded-[1.5rem] border border-base-300/75 bg-base-100/65 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-base-content/45">
                Total notes
              </p>
              <p className="mt-3 text-4xl font-semibold text-base-content">
                {isLoading ? "--" : notes.length}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-base-300/75 bg-base-100/65 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-base-content/45">
                Latest update
              </p>
              <p className="mt-3 text-lg font-semibold text-base-content">
                {isLoading ? "Loading..." : formatLatestDate(latestNote?.updatedAt ?? latestNote?.createdAt)}
              </p>
              <p className="mt-2 text-sm leading-6 text-base-content/60">
                {latestNote?.title ?? "Create your first note to start building your workspace."}
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="section-label">All notes</p>
            <h2 className="mt-2 text-3xl font-semibold text-base-content">
              Your collection
            </h2>
          </div>

          {!isLoading && notes.length > 0 && (
            <div className="hidden rounded-full border border-base-300/85 bg-base-100/70 px-4 py-2 text-sm text-base-content/60 sm:block">
              {notes.length} saved note{notes.length === 1 ? "" : "s"}
            </div>
          )}
        </div>

        {errorMessage && (
          <div className="alert border border-error/20 bg-error/10 text-error">
            <span>{errorMessage}</span>
          </div>
        )}

        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="surface-panel rounded-[1.5rem] p-5"
              >
                <div className="skeleton h-4 w-20" />
                <div className="skeleton mt-4 h-8 w-4/5" />
                <div className="skeleton mt-6 h-4 w-full" />
                <div className="skeleton mt-3 h-4 w-11/12" />
                <div className="skeleton mt-3 h-4 w-8/12" />
                <div className="skeleton mt-8 h-4 w-28" />
              </div>
            ))}
          </div>
        ) : notes.length === 0 ? (
          <div className="surface-panel rounded-[2rem] px-6 py-12 text-center sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <StickyNote size={26} />
            </div>
            <h3 className="mt-5 text-3xl font-semibold text-base-content">
              Your workspace is empty
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-base-content/65">
              Start with a single well-titled note and build from there. Every
              note you create will appear here for quick access.
            </p>
            <Link to="/create" className="btn btn-primary mt-7 rounded-full px-6">
              <Plus size={17} />
              Create Your First Note
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default HomePage
