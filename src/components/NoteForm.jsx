import React, { useEffect, useState } from 'react';
import '../styles/NoteForm.css';

const NoteForm = ({ type, showForm, notes, noteID, setNotes }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    const currentNote = [...notes].filter((note) => note.id === noteID)[0];
    setTitle(type === 'add' ? 'New note' : currentNote.title);
    setBody(type === 'add' ? '' : currentNote.body);
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    const newNote = {
      id: +new Date(),
      title,
      body,
      archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedNotes = [...notes];
    updatedNotes.push(newNote);

    setNotes(updatedNotes);
    showForm(false);
  };

  const editNote = (e) => {
    e.preventDefault();
    const updatedNotes = [...notes].map((note) => {
      if (note.id === noteID) {
        return {
          ...note,
          title,
          body,
          updatedAt: new Date().toISOString(),
        };
      }

      return note;
    });

    setNotes(updatedNotes);
    showForm(false);
  };

  const setColor = () => {
    if (50 - title.length <= 0) {
      return { color: 'red' };
    } else if (50 - title.length > 0 && 50 - title.length <= 10) {
      return { color: 'yellow' };
    } else {
      return { color: 'white' };
    }
  };

  return (
    <div id="noteForm">
      <div className="form-container">
        <i className="bi bi-x-circle-fill close-btn" onClick={() => showForm(false)}></i>
        <h1>{type === 'add' ? 'New Note' : 'Edit Note'}</h1>
        <form className="note-form" onSubmit={type === 'add' ? addNote : editNote}>
          <input
            className="input-bar"
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => {
              return setTitle(e.target.value.slice(0, 50));
            }}
            required
          />
          <p className="title-limit" style={setColor()}>
            You have {50 - title.length} character(s) left
          </p>
          <textarea className="textarea-bar" cols="30" rows="10" placeholder="write your note here..." value={body} onChange={(e) => setBody(e.target.value)} required autoFocus></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
