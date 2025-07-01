//
// Controller for notes endpoints
//
const notesService = require('../services/notes');

class NotesController {
  // PUBLIC_INTERFACE
  /**
   * Get all notes (supports ?folder=...&tag=...)
   */
  getAll(req, res) {
    const { folder, tag } = req.query;
    const notes = notesService.getAllNotes({ folder, tag });
    res.json(notes);
  }

  // PUBLIC_INTERFACE
  /**
   * Get a single note by id
   */
  getOne(req, res) {
    const note = notesService.getNoteById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  }

  // PUBLIC_INTERFACE
  /**
   * Create new note
   */
  create(req, res) {
    const { title, content, folder, tags } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'title and content are required' });
    }
    const note = notesService.createNote({ title, content, folder, tags });
    res.status(201).json(note);
  }

  // PUBLIC_INTERFACE
  /**
   * Update a note
   */
  update(req, res) {
    const note = notesService.updateNote(req.params.id, req.body);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  }

  // PUBLIC_INTERFACE
  /**
   * Delete a note
   */
  delete(req, res) {
    const ok = notesService.deleteNote(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Note not found' });
    res.status(204).send();
  }

  // PUBLIC_INTERFACE
  /**
   * Organize a note (change folder/tags)
   */
  organize(req, res) {
    const note = notesService.organizeNote(req.params.id, req.body);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  }
}

module.exports = new NotesController();

