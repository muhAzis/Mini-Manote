import React from 'react';
import '../styles/NoteCard.css';
import dayjs from 'dayjs';

const NoteCard = ({ id, title, body, updatedAt, archived, archive, detail, setDetail, setNote, deleteNote, children }) => {
  return (
    <>
      <div
        className="noteCard"
        onClick={() => {
          setDetail(true);
          setNote(id);
        }}
      >
        <i
          className="bi bi-x delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            deleteNote(id);
          }}
        ></i>
        <div className="row1 row">
          <h5 className="note-updated">{dayjs(updatedAt).format('DD MMM, YYYY | HH:mm')}</h5>
          <h3 className="note-title">
            <div className="dot"></div>
            {title}
          </h3>
        </div>
        <div className="row2 row">
          <p className="note">{body}</p>
        </div>
        <div className="row3 row">
          <i
            className="bi bi-journal-bookmark-fill archive-btn"
            onClick={(e) => {
              e.stopPropagation();
              archive(id, archived);
            }}
          ></i>
        </div>
      </div>
      {detail && children}
    </>
  );
};

export default NoteCard;
