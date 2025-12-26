import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
  try {
    const notes = (await Note.find()).sort({ createdAt: -1 }); // get the latest first
    res.status(200).json({
      notes: notes,
      message: "Notes retrieved successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(500).json({
      message: "Error retrieving notes, Internal Server Error",
      status: "error",
    });
  }
}

export async function getNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
        status: "error",
      });
    }
    res.status(200).json({
      note: note,
      message: "Note retrieved successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Error retrieving the note:", error);
    res.status(500).json({
      message: "Error retrieving the note, Internal Server Error",
      status: "error",
    });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json({
      note: savedNote,
      message: "Note created successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Error creating the note:", error);
    res.status(500).json({
      message: "Error creating the note, Internal Server Error",
      status: "error",
    });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const newUpdatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!newUpdatedNote) {
      return res.status(404).json({
        message: "Note not found",
        status: "error",
      });
    }
    res.status(200).json({
      note: newUpdatedNote,
      message: "Note updated successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Error updating the note:", error);
    res.status(500).json({
      message: "Error updating the note, Internal Server Error",
      status: "error",
    });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
        status: "error",
      });
    }
    res.status(200).json({
      note: deletedNote,
      message: "Note deleted successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Error deleting the note:", error);
    res.status(500).json({
      message: "Error deleting the note, Internal Server Error",
      status: "error",
    });
  }
}
