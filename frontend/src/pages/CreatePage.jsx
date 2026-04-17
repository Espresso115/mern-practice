import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import NoteEditorForm from "../components/NoteEditorForm.jsx";

const API_URL = "/api/notes";

const CreatePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [isSaving, setIsSaving] = useState(false);

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

    // Trimming here prevents whitespace-only notes from being submitted to the API.
    if (!trimmedTitle || !trimmedContent) {
      toast.error("Please add both a note title and a note body.");
      return;
    }

    try {
      setIsSaving(true);

      await axios.post(API_URL, {
        title: trimmedTitle,
        content: trimmedContent,
      });

      toast.success("Note created successfully.");
      navigate("/");
    } catch (error) {
      console.error("Could not create note.", error);
      toast.error("We couldn't save your note. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <NoteEditorForm
      mode="create"
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSaving={isSaving}
      backTo="/"
    />
  )
}

export default CreatePage
