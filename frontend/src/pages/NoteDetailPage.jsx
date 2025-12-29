import { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard";
import { Link, useNavigate, useParams } from "react-router";
import axiosInstance from "../lib/axios";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/notes/${id}`);
        setNote(response.data.note);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      setSaving(true);
      await axiosInstance.delete(`/notes/${id}`);
      toast.success("Note deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete the note. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or a content.");
      return;
    }
    try {
      setSaving(true);
      const updatedNote = await axiosInstance.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      });
      if (updatedNote && updatedNote.status === 200) {
        toast.success(updatedNote.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update the note. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back To Notes
            </Link>
            <button
              className="btn btn-outline btn-error"
              onClick={handleDelete}
              disabled={saving}
            >
              <Trash2Icon className="size-5"></Trash2Icon>
              {saving ? "Deleting..." : "Delete Note"}
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Title</legend>
                  <input
                    type="text"
                    className="input w-full input-lg"
                    placeholder="Note Title"
                    value={note?.title || ""}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Content</legend>
                  <textarea
                    className="textarea h-36 w-full input-lg"
                    placeholder="Note Content"
                    value={note?.content || ""}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  ></textarea>
                </fieldset>
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={handleUpdate}
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? "Updating..." : "Update Note"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
