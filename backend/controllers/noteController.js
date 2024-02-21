const Note = require('../models/noteModel');

// Active notes
exports.getAllActiveNotes = async (req, res) => {
  try {
    const notes = await Note.find({ archived: false });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Archived notes
exports.getAllArchivedNotes = async (req, res) => {
  try {
    const archivedNotes = await Note.find({ archived: true });
    res.json(archivedNotes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createArchivedNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newArchivedNote = new Note({ title, content, archived: true });
    await newArchivedNote.save();
    res.json(newArchivedNote);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.archiveNote = async (req, res) => {
  try {
    const { id } = req.params;
    const noteToArchive = await Note.findByIdAndUpdate(id, { archived: true }, { new: true });
    res.json(noteToArchive);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.unarchiveNote = async (req, res) => {
  try {
    const { id } = req.params;
    const noteToUnarchive = await Note.findByIdAndUpdate(id, { archived: false }, { new: true });
    res.json(noteToUnarchive);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteArchivedNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.json({ message: 'Archived note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const newNote = new Note({ title, content, category });
    await newNote.save();
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(id, { title, content, category }, { new: true });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.removeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const noteWithoutCategory = await Note.findByIdAndUpdate(id, { category: null }, { new: true });
    res.json(noteWithoutCategory);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};