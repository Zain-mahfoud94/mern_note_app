import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

const CreateNotePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const nagivate = useNavigate();

  const handleSubmit = async (e) => {
    // handle response
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and Content are required.");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post("/notes", {
        title,
        content,
      });
      if (response && response.status === 201) {
        toast.success("Note created successfully!");
        nagivate("/");
      }
    } catch (error) {
      console.log("Error creating note:", error);
      if (error.response && error.response.status === 429) {
        toast.error("You are creating notes too quickly. Please slow down.", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create the note. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="card-title text-2xl mb-4">Create New Note</div>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Title</legend>
                    <input
                      type="text"
                      className="input w-full input-lg"
                      placeholder="Note Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Content</legend>
                    <textarea
                      className="textarea h-36 w-full input-lg"
                      placeholder="Note Content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                  </fieldset>
                  <div className="card-actions justify-end mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Create Note"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNotePage;
