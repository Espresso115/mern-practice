import { ArrowLeft, FileText, Save } from "lucide-react";
import { Link } from "react-router-dom";

const NoteEditorForm = ({
  mode,
  formData,
  onChange,
  onSubmit,
  isSaving,
  isLoading = false,
  backTo,
}) => {
  const isEditMode = mode === "edit";
  const titleText = isEditMode ? "Edit note" : "Create note";
  const headingText = isEditMode
    ? "Refine an existing note."
    : "Capture a clear thought.";
  const submitText = isEditMode ? "Update Note" : "Save Note";

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="surface-panel rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="section-label">{titleText}</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-base-content sm:text-5xl">
              {headingText}
            </h1>
          </div>

          <Link
            to={backTo}
            className="btn btn-ghost rounded-full border border-base-300 bg-base-100/70 px-5 text-base-content/75 hover:bg-base-200"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>

        {isLoading ? (
          <div className="mt-8 space-y-6">
            <div className="skeleton h-4 w-24" />
            <div className="skeleton h-16 w-full rounded-[2rem]" />
            <div className="skeleton h-4 w-28" />
            <div className="skeleton h-52 w-full rounded-[2rem]" />
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-semibold uppercase tracking-[0.22em] text-base-content/55"
              >
                Note title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={onChange}
                placeholder="Quarterly review summary"
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="content"
                className="text-sm font-semibold uppercase tracking-[0.22em] text-base-content/55"
              >
                Note body
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={onChange}
                placeholder="Write the key points, decisions, or ideas you want to keep."
                className="textarea-field"
              />
              <p className="text-sm text-base-content/50">
                Keep it concise, or use multiple paragraphs for longer notes.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={isSaving}
                className="btn btn-primary rounded-full px-6 disabled:cursor-not-allowed disabled:opacity-75"
              >
                <Save size={16} />
                {isSaving ? "Saving..." : submitText}
              </button>

              <Link
                to={backTo}
                className="btn btn-ghost rounded-full border border-base-300 bg-base-100/70 px-6 text-base-content/75 hover:bg-base-200"
              >
                Cancel
              </Link>
            </div>
          </form>
        )}
      </section>

      <aside className="surface-panel rounded-[2rem] px-6 py-8">
        <p className="section-label">Writing notes</p>

        <div className="mt-5 rounded-[1.75rem] border border-base-300/75 bg-base-100/65 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText size={22} />
          </div>

          <h2 className="mt-5 text-2xl font-semibold text-base-content">
            A professional note starts with a strong title.
          </h2>
          <p className="mt-3 text-base leading-7 text-base-content/65">
            Use the title to make scanning easy later, then keep the body focused
            on the actual idea, decision, or summary you want to retain.
          </p>
        </div>

        <div className="mt-4 rounded-[1.75rem] border border-base-300/75 bg-base-100/65 p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-base-content/45">
            Live count
          </p>
          <p className="mt-3 text-lg font-semibold text-base-content">
            {formData.content.trim() ? formData.content.trim().split(/\s+/).length : 0} words
          </p>
          <p className="mt-2 text-sm leading-6 text-base-content/60">
            A simple word count helps you keep the note brief and readable.
          </p>
        </div>
      </aside>
    </div>
  );
};

export default NoteEditorForm;
