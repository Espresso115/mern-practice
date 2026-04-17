import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import NoteEditorForm from "../components/NoteEditorForm.jsx";

const API_URL = "/api/notes";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/${id}`);

        setFormData({
          title: response.data.title ?? "",
          content: response.data.content ?? "",
        });
      } catch (error) {
        console.error("Could not load note for editing.", error);
        toast.error("We couldn't load that note for editing.");
        navigate(`/note/${id}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTitle = formData.title.trim();
    const trimmedContent = formData.content.trim();

    if (!trimmedTitle || !trimmedContent) {
      toast.error("Please add both a note title and a note body.");
      return;
    }

    try {
      setIsSaving(true);

      await axios.put(`${API_URL}/${id}`, {
        title: trimmedTitle,
        content: trimmedContent,
      });

      toast.success("Note updated successfully.");
      navigate(`/note/${id}`);
    } catch (error) {
      console.error("Could not update note.", error);
      toast.error("We couldn't update your note. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <NoteEditorForm
      mode="edit"
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSaving={isSaving}
      isLoading={isLoading}
      backTo={`/note/${id}`}
    />
  );
};

export default EditPage;
