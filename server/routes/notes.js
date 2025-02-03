import express from "express";
import Note from "../models/note.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId }).sort({
      createdAt: 1,
    });
    res.json({ notes });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      userId: req.user.userId,
      title: title || "Untitled Note",
      content,
    });
    await note.save();
    res.status(201).json({ note });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ note });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, content, isFavorite } = req.body;
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    note.title = title || note.title;
    note.content = content || note.content;
    if (typeof isFavorite === "boolean") note.isFavorite = isFavorite;
    note.updatedAt = Date.now();
    await note.save();
    res.json({ note });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
