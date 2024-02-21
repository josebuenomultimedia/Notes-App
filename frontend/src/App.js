import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import Note from './Note';
import './App.css';

const App = () => {
  const [newNote, setNewNote] = useState({ title: '', content: '', category: '' });
  const [editingNote, setEditingNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/notes')
      .then(response => setNotes(response.data))
      .catch(error => console.error('Error fetching active notes:', error));

    axios.get('http://localhost:5000/api/archivedNotes')
      .then(response => setArchivedNotes(response.data))
      .catch(error => console.error('Error fetching archived notes:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingNote) {
      setEditingNote({
        ...editingNote,
        [name]: value,
      });
    } else {
      setNewNote({
        ...newNote,
        [name]: value,
      });
    }
  };


  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const filteredNotes = categoryFilter
    ? notes.filter(note => note.category.toLowerCase().includes(categoryFilter.toLowerCase()))
    : notes;

  const filteredArchivedNotes = categoryFilter
    ? archivedNotes.filter(archivedNote => archivedNote.category.toLowerCase().includes(categoryFilter.toLowerCase()))
    : archivedNotes;


  const handleAddNote = () => {
    if (!newNote.title || !newNote.content || !newNote.category) return;
    axios.post('http://localhost:5000/api/notes', newNote)
      .then(response => {
        setNotes([...notes, response.data]);
        setNewNote({ title: '', content: '', category: '' });
      })
      .catch(error => console.error('Error adding note:', error));
  };

  const handleEditNote = () => {
    if (!editingNote.title || !editingNote.content) return;
    axios.put(`http://localhost:5000/api/notes/${editingNote._id}`, editingNote)
      .then(response => {
        const updatedNotes = notes.map(note => (note._id === response.data._id ? response.data : note));
        setNotes(updatedNotes);
        setEditingNote(null);
      })
      .catch(error => console.error('Error editing note:', error));
  };

  const handleRemoveCategory = (id) => {
    axios.put(`http://localhost:5000/api/removeCategory/${id}`)
      .then(response => {
        const updatedNotes = notes.map(note => (note._id === response.data._id ? response.data : note));
        setNotes(updatedNotes);
      })
      .catch(error => console.error('Error removing category:', error));
  };

  const handleDeleteNote = (id, archived = false) => {
    const endpoint = archived ? `http://localhost:5000/api/archived/${id}` : `http://localhost:5000/api/notes/${id}`;
    axios.delete(endpoint)
      .then(() => {
        if (archived) {
          setArchivedNotes(archivedNotes.filter(note => note._id !== id));
        } else {
          setNotes(notes.filter(note => note._id !== id));
        }
      })
      .catch(error => console.error('Error deleting note:', error));
  };

  const handleArchiveNote = (id) => {
    const noteToArchive = notes.find(note => note._id === id);
    axios.put(`http://localhost:5000/api/archive/${id}`, { ...noteToArchive, archived: true })
      .then(response => {
        const updatedNotes = notes.filter(note => note._id !== id);
        setNotes(updatedNotes);
        setArchivedNotes([...archivedNotes, response.data]);
      })
      .catch(error => console.error('Error archiving note:', error));
  };

  const handleUnarchiveNote = (id) => {
    axios.put(`http://localhost:5000/api/unarchive/${id}`)
      .then(response => {
        const updatedArchivedNotes = archivedNotes.filter(note => note._id !== id);
        setArchivedNotes(updatedArchivedNotes);
        setNotes([...notes, response.data]);
      })
      .catch(error => console.error('Error unarchiving note:', error));
  };



  return (
    <div id="app-container">
      <div id="add-edit-container">
        <h1>Note App</h1>
        <table className="form-table">
          <tbody>
            <tr>
              <th colSpan="2"><h2>Add/Edit Note</h2></th>
            </tr>
            <tr>
              <td>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={editingNote ? editingNote.title : newNote.title} onChange={handleInputChange} />
              </td>
              <td>
                <label htmlFor="content">Content:</label>
                <textarea id="content" name="content" value={editingNote ? editingNote.content : newNote.content} onChange={handleInputChange} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="category">Category:</label>
                <input type="text" id="category" name="category" value={editingNote ? editingNote.category : newNote.category} onChange={handleInputChange} />
              </td>
              <td>
                {editingNote ? (
                  <button className="edit-button" onClick={handleEditNote}>Edit Note</button>
                ) : (
                  <button className="add-button" onClick={handleAddNote}>Add Note</button>
                )}
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <label htmlFor="categoryFilter">Filter by Category:</label>
                <input type="text" id="categoryFilter" value={categoryFilter} onChange={handleCategoryFilterChange} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="note-container" className="table-container">
        <table className="note-table">
          <thead>
            <tr>
              <th colSpan="4"><h2>Active Notes</h2></th>
            </tr>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotes.map(note => (
              <tr key={note._id}>
                <td>
                  {editingNote && editingNote._id === note._id ? (
                    <input
                      type="text"
                      name="title"
                      value={editingNote.title}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{note.title}</span>
                  )}
                </td>
                <td>
                  {editingNote && editingNote._id === note._id ? (
                    <textarea
                      name="content"
                      value={editingNote.content}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{note.content}</p>
                  )}
                </td>
                <td>
                  {editingNote && editingNote._id === note._id ? (
                    <input
                      type="text"
                      name="category"
                      value={editingNote.category}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{note.category}</span>
                  )}
                </td>
                <td>
                  {note.archived ? (
                    <button className="unarchive-button" onClick={() => handleUnarchiveNote(note._id)}>Unarchive</button>
                  ) : (
                    <>
                      {editingNote && editingNote._id === note._id ? (
                        <button className="edit-button" onClick={handleEditNote}>Save</button>
                      ) : (
                        <>
                          <button className="edit-button" onClick={() => setEditingNote(note)}>Edit</button>
                          <button className="delete-button" onClick={() => handleDeleteNote(note._id)}>Delete</button>
                          <button className="archive-button" onClick={() => handleArchiveNote(note._id)}>Archive</button>
                          {!editingNote && (
                            <button className="remove-category-button" onClick={() => handleRemoveCategory(note._id)}>Remove Category</button>
                          )}
                        </>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="note-table">
          <thead>
            <tr>
              <th colSpan="4"><h2>Archived Notes</h2></th>
            </tr>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredArchivedNotes.map(archivedNote => (
              <tr key={archivedNote._id}>
                <td>{archivedNote.title}</td>
                <td>
                  <p>{archivedNote.content}</p>
                </td>
                <td>{archivedNote.category}</td>
                <td>
                  <button className="unarchive-button" onClick={() => handleUnarchiveNote(archivedNote._id)}>Unarchive</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;