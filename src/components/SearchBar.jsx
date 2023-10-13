import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ notes, renderNotes }) => {
  const filterNotes = (title) => {
    const filteredNotes = [...notes].filter((note) => note.title.toLowerCase().includes(title.toLowerCase()));
    renderNotes(filteredNotes);
  };

  return (
    <div id="searchBar">
      <i className="bi bi-search"></i>
      <input
        className="input-bar"
        type="text"
        placeholder="Find notes..."
        onChange={(e) => {
          filterNotes(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
