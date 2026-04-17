import { ArrowUpRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

function buildPreview(content) {
  return content.length > 140 ? `${content.slice(0, 140)}...` : content;
}

const NoteCard = ({ note }) => {
  return (
    <Link
      to={`/note/${note._id}`}
      className="surface-panel group flex h-full flex-col rounded-[1.5rem] p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_65px_-40px_rgba(45,76,69,0.45)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-label">Note</p>
          <h2 className="mt-2 line-clamp-2 text-xl font-semibold text-base-content">
            {note.title}
          </h2>
        </div>

        <div className="rounded-full border border-base-300/90 p-2 text-base-content/55 transition group-hover:border-primary/40 group-hover:text-primary">
          <ArrowUpRight size={16} />
        </div>
      </div>

      <p className="mt-4 flex-1 whitespace-pre-wrap text-sm leading-7 text-base-content/70">
        {buildPreview(note.content)}
      </p>

      <div className="mt-6 flex items-center gap-2 text-sm text-base-content/50">
        <Clock3 size={15} />
        <span>Updated {formatDate(note.updatedAt ?? note.createdAt)}</span>
      </div>
    </Link>
  );
};

export default NoteCard;
