//
// Service layer for managing notes (in-memory)
//
const { v4: uuidv4 } = require('uuid');

// In-memory notes data store
const notes = [];

class NotesService {
  // PUBLIC_INTERFACE
  /**
   * Get all notes, optionally filtered by folder or tag
   * @param {Object} [filters]
   * @param {string} [filters.folder]
   * @param {string} [filters.tag]
   * @returns {Array}
   */
  getAllNotes(filters = {}) {
    let res = notes.slice();
    if (filters.folder) {
      res = res.filter((n) => n.folder === filters.folder);
    }
    if (filters.tag) {
      res = res.filter((n) => (n.tags || []).includes(filters.tag));
    }
    return res;
  }

  // PUBLIC_INTERFACE
  /**
   * Get note by id
   * @param {string} id
   * @returns {Object|null}
   */
  getNoteById(id) {
    return notes.find((n) => n.id === id) || null;
  }

  // PUBLIC_INTERFACE
  /**
   * Create a new note
   * @param {Object} data
   * @param {string} data.title
   * @param {string} data.content
   * @param {string} [data.folder]
   * @param {Array<string>} [data.tags]
   * @returns {Object}
   */
  createNote(data) {
    const note = {
      id: uuidv4(),
      title: data.title,
      content: data.content,
      folder: data.folder || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    notes.push(note);
    return note;
  }

  // PUBLIC_INTERFACE
  /**
   * Update a note by id
   * @param {string} id
   * @param {Object} data
   * @returns {Object|null}
   */
  updateNote(id, data) {
    const note = notes.find((n) => n.id === id);
    if (!note) return null;
    if (typeof data.title === 'string') note.title = data.title;
    if (typeof data.content === 'string') note.content = data.content;
    if (typeof data.folder === 'string') note.folder = data.folder;
    if (Array.isArray(data.tags)) note.tags = data.tags;
    note.updatedAt = new Date().toISOString();
    return note;
  }

  // PUBLIC_INTERFACE
  /**
   * Delete note by id
   * @param {string} id
   * @returns {boolean} True if deleted, false if not found
   */
  deleteNote(id) {
    const idx = notes.findIndex((n) => n.id === id);
    if (idx !== -1) {
      notes.splice(idx, 1);
      return true;
    }
    return false;
  }

  // PUBLIC_INTERFACE
  /**
   * Organize a note (move to folder, update tags)
   * @param {string} id
   * @param {Object} data
   * @param {string} [data.folder]
   * @param {Array<string>} [data.tags]
   * @returns {Object|null}
   */
  organizeNote(id, data) {
    const note = notes.find((n) => n.id === id);
    if (!note) return null;
    if (typeof data.folder === 'string') note.folder = data.folder;
    if (Array.isArray(data.tags)) note.tags = data.tags;
    note.updatedAt = new Date().toISOString();
    return note;
  }
}

module.exports = new NotesService();

