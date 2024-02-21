import React from 'react';

const Note = ({ note, onDelete, onEdit, onArchive, onUnarchive, onRemoveCategory }) => {
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      {note.category ? (
        <div>
          <strong>Category:</strong> {note.category}
          <br />
        </div>
      ) : null}
      {note.archived ? (
        <>
          <button onClick={() => onUnarchive(note._id)}>Unarchive</button>
          <span>This note is archived.</span>
        </>
      ) : (
        <>
          <button onClick={() => onDelete(note._id)}>Delete</button>
          <button onClick={() => onEdit(note)}>Edit</button>
          <button onClick={() => onArchive(note._id)}>Archive</button>
          {note.category && (
            <button onClick={() => onRemoveCategory(note._id)}>Remove Category</button>
          )}
        </>
      )}
    </div>
  );
};

export default Note;