import mongoose from "mongoose";
// Define the Note schema
const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
); // to automatically manage createdAt and updatedAt fields

// Create and export the Note model based on the schema
const Note = mongoose.model("Note", noteSchema);
export default Note;
