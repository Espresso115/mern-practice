import axios from "axios";
import { ArrowLeft, CalendarRange, Clock3, PencilLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_URL = "/api/notes";

function formatTimestamp(dateString) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setErrorMessage("");
        setIsLoading(true);

        const response = await axios.get(`${API_URL}/${id}`);
        setNote(response.data);
      } catch (error) {
        console.error("Could not load the selected note.", error);
        setErrorMessage("We couldn't find that note. It may have been removed.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    const shouldDelete = window.confirm(
      "Delete this note permanently? This action cannot be undone."
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Note deleted successfully.");
      navigate("/");
    } catch (error) {
      console.error("Could not delete note.", error);
      toast.error("We couldn't delete that note. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/" className="btn btn-ghost rounded-full border border-base-300 bg-base-100/70 px-5 text-base-content/75 hover:bg-base-200">
          <ArrowLeft size={16} />
          Back to notes
        </Link>

        {note && (
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/note/${id}/edit`}
              className="btn btn-primary rounded-full px-5"
            >
              <PencilLine size={16} />
              Edit note
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="btn rounded-full border border-error/30 bg-error/10 px-5 text-error hover:border-error/40 hover:bg-error/15 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Trash2 size={16} />
              {isDeleting ? "Deleting..." : "Delete note"}
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="surface-panel rounded-[2rem] p-8">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton mt-4 h-12 w-3/4" />
          <div className="skeleton mt-6 h-24 w-full" />
          <div className="skeleton mt-3 h-24 w-full" />
        </div>
      ) : errorMessage ? (
        <div className="surface-panel rounded-[2rem] px-6 py-10 sm:px-8">
          <p className="section-label">Note unavailable</p>
          <h1 className="mt-3 text-3xl font-semibold text-base-content">
            This note could not be loaded
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-base-content/65">
            {errorMessage}
          </p>
          <Link to="/" className="btn btn-primary mt-7 rounded-full px-6">
            Return Home
          </Link>
        </div>
      ) : (
        <article className="grid gap-6 lg:grid-cols-[1.45fr_0.75fr]">
          <section className="surface-panel rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
            <p className="section-label">Note details</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-base-content sm:text-5xl">
              {note.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-base-content/55">
              <div className="flex items-center gap-2">
                <Clock3 size={15} />
                <span>Created {formatTimestamp(note.createdAt)}</span>
              </div>

              <div className="h-1 w-1 rounded-full bg-base-content/25" />

              <div className="flex items-center gap-2">
                <CalendarRange size={15} />
                <span>Updated {formatTimestamp(note.updatedAt ?? note.createdAt)}</span>
              </div>
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-base-300/80 bg-base-100/70 p-6">
              <p className="section-label">Body</p>
              <div className="mt-4 whitespace-pre-wrap text-base leading-8 text-base-content/80">
                {note.content}
              </div>
            </div>
          </section>

          <aside className="surface-panel rounded-[2rem] px-6 py-8">
            <p className="section-label">At a glance</p>

            <div className="mt-5 space-y-4">
              <div className="rounded-[1.5rem] border border-base-300/75 bg-base-100/65 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-base-content/45">
                  Timestamp
                </p>
                <p className="mt-3 text-lg font-semibold leading-7 text-base-content">
                  {formatTimestamp(note.createdAt)}
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-base-300/75 bg-base-100/65 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-base-content/45">
                  Note length
                </p>
                <p className="mt-3 text-lg font-semibold text-base-content">
                  {note.content.trim().split(/\s+/).length} words
                </p>
                <p className="mt-2 text-sm leading-6 text-base-content/60">
                  A quick estimate based on the current note body.
                </p>
              </div>
            </div>
          </aside>
        </article>
      )}
    </div>
  )
}

export default NoteDetailPage
