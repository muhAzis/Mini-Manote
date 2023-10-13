import React from 'react';
import '../styles/NoteDetail.css';
import dayjs from 'dayjs';

const NoteDetail = ({ id, title, body, createdAt, updatedAt, archived, show, archive, deleteNote, showForm }) => {
  const windowWidth = window.innerWidth;

  return (
    <div id="noteDetail">
      <div className="back-btn" onClick={() => show(false)}>
        <i className="bi bi-arrow-left-circle"></i>
        Back
      </div>
      <div className="note-detail-container">
        <h1 className="title">
          <i className={archived ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'}></i>
          {title}
        </h1>
        <h3 className="last-updated">Last updated: {dayjs(updatedAt).format('DD MMM, YYYY | HH:mm')}</h3>
        <h5 className="id">ID: {id}</h5>
        <p className="body">{body}</p>
        <h4 className="created">Created: {dayjs(createdAt).format('DD MMM, YYYY | HH:mm')}</h4>
      </div>
      <div className="action-buttons">
        <span className="bi bi-pencil-square edit-btn button archive-btn" onClick={() => showForm(true)}>
          {windowWidth > 576 && 'Edit'}
        </span>
        <span className="bi bi-journal-bookmark-fill button edit-btn" onClick={() => archive(id, archived)}>
          {windowWidth > 576 ? (archived ? 'Unarchive' : 'Archive') : ''}
        </span>
        <span
          className="bi bi-trash3 delete-btn button delete-btn"
          onClick={() => {
            deleteNote(id);
            show(false);
          }}
        >
          {windowWidth > 576 && 'Delete'}
        </span>
      </div>
    </div>
  );
};

export default NoteDetail;
