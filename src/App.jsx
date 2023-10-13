import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import NotesContainer from './components/NotesContainer';
import initialData from './utils/database';
import NoteCard from './components/NoteCard';
import ControlBar from './components/ControlBar';
import NoteForm from './components/NoteForm';
import NoteDetail from './components/NoteDetail';
import Logo from './components/Logo';
import SearchBar from './components/SearchBar';
import DarkModeButton from './components/DarkModeButton';
import EmptyShelf from './components/EmptyShelf';
import EmptySearch from './components/EmptySearch';

function App() {
  const [notes, setNotes] = useState(initialData);
  const [renderNotes, setRenderNotes] = useState(initialData);
  const [currentNote, setCurrentNote] = useState(0);
  const [displayAddForm, setDisplayAddForm] = useState(false);
  const [displayEditForm, setDisplayEditForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const toggleArchive = (id, archived) => {
    const updatedNotes = notes.map((note) => (note.id === id ? { ...note, archived: !archived } : note));

    setNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);

    setNotes(updatedNotes);
  };

  return (
    <div id="mainContainer">
      <Navbar>
        <Logo />
        <SearchBar notes={notes} renderNotes={setRenderNotes} />
        <DarkModeButton />
      </Navbar>
      <ControlBar notes={notes} renderNotes={renderNotes} setNotes={setRenderNotes} showForm={setDisplayAddForm} />

      {notes.length ? (
        renderNotes.length ? (
          <>
            <NotesContainer title={'Notes'}>
              {renderNotes.map(
                (note) =>
                  !note.archived && (
                    <NoteCard key={note.id} {...note} archive={toggleArchive} detail={showDetail} setDetail={setShowDetail} setNote={setCurrentNote} deleteNote={deleteNote}>
                      {note.id === currentNote && <NoteDetail {...note} show={setShowDetail} archive={toggleArchive} deleteNote={deleteNote} showForm={setDisplayEditForm} />}
                    </NoteCard>
                  )
              )}
            </NotesContainer>

            <NotesContainer title={'Archive'}>
              {renderNotes.map(
                (note) =>
                  note.archived && (
                    <NoteCard key={note.id} {...note} archive={toggleArchive} detail={showDetail} setDetail={setShowDetail} setNote={setCurrentNote} deleteNote={deleteNote}>
                      {note.id === currentNote && <NoteDetail {...note} show={setShowDetail} archive={toggleArchive} deleteNote={deleteNote} showForm={setDisplayEditForm} />}
                    </NoteCard>
                  )
              )}
            </NotesContainer>
          </>
        ) : (
          <EmptySearch />
        )
      ) : (
        <EmptyShelf />
      )}

      {displayAddForm && <NoteForm type={'add'} showForm={setDisplayAddForm} notes={notes} setNotes={setNotes} />}
      {displayEditForm && <NoteForm type={'edit'} showForm={setDisplayEditForm} notes={notes} setNotes={setNotes} noteID={currentNote} />}
    </div>
  );
}

export default App;
