import React, { useEffect, useState } from 'react';
import '../styles/ControlBar.css';

const ControlBar = ({ notes, setNotes, showForm }) => {
  const [checked, setChecked] = useState('updatedAt');
  const [reverse, setReverse] = useState(false);

  const windowWidth = window.innerWidth;

  const sortingOptions = [
    ['title', 'title'],
    ['last updated', 'updatedAt'],
  ];

  useEffect(() => {
    if (notes.length) {
      const sortedNotes = [...notes].sort((note_a, note_b) => (note_a[checked] < note_b[checked] ? 1 : -1));
      if (reverse) {
        sortedNotes.reverse();
      }

      setNotes(sortedNotes);
    }
  }, [reverse, checked, notes]);

  return (
    <div id="controlBar">
      <div className="sorting-container">
        <div className={reverse ? 'sort-reverse active' : 'sort-reverse'} onClick={() => setReverse((prev) => !prev)}>
          <i className="bi bi-sort-down-alt"></i>
        </div>
        {sortingOptions.map((option, i) => (
          <div key={option[1] + i} className={option[1] === checked ? 'sort-menu active' : 'sort-menu'} onClick={() => setChecked(option[1])}>
            {option[0]}
          </div>
        ))}
      </div>
      <button className="add-note-btn" onClick={() => showForm(true)}>
        <i className="bi bi-plus-circle"></i>
        {windowWidth > 576 && 'Add new note'}
      </button>
    </div>
  );
};

export default ControlBar;
