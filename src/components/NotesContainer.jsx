import React, { useState } from 'react';
import '../styles/NotesContainer.css';

const NotesContainer = ({ title, children }) => {
  const [show, setShow] = useState(true);

  return (
    <div id="notesContainer">
      <h1 className="group-title">
        {title}
        <i className={show ? 'bi bi-caret-down-fill show' : 'bi bi-caret-down-fill'} onClick={() => setShow((prev) => !prev)}></i>
      </h1>
      <div className={show ? 'notes-container show' : 'notes-container'}>{children}</div>
    </div>
  );
};

export default NotesContainer;
