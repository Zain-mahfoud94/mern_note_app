import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

const NoteCard = ({ note, setNotes }) => {
  const [loading, isLoading] = useState(false);
  const handleDelete = async (e, noteId) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }
    try {
      isLoading(true);
      const response = await axiosInstance.delete(`/notes/${noteId}`);
      if (response && response.data) {
        toast.success(
          response.data.message || "The Note has been deleted successfully!"
        );
        setNotes((prevNotes) =>
          prevNotes.filter((noteItem) => noteItem._id !== noteId)
        );
      }
    } catch (error) {
      toast.error("Couldn't delete the note. Please try again later!");
      console.error("Couldn't delete the note.", error);
    } finally {
      isLoading(false);
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className=" card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
              disabled={loading}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
