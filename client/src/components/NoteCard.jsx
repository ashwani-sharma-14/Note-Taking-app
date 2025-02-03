import React, { useState } from "react";
import NoteModal from "./NoteModal";

export default function NoteCard({ note, token, refreshNotes }) {
  const [showModal, setShowModal] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(note.content);
    alert("Copied to clipboard!");
  };

  const deleteNote = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await fetch(`http://localhost:5000/api/notes/${note._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        refreshNotes();
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  const renameNote = async () => {
    const newTitle = window.prompt("Enter new title", note.title);
    if (newTitle) {
      try {
        await fetch(`http://localhost:5000/api/notes/${note._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: newTitle }),
        });
        refreshNotes();
      } catch (error) {
        console.error("Error renaming note:", error);
      }
    }
  };

  // Card styling
  const cardStyle = {
    background: "#fff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "transform 0.2s",
  };

  const [isHovered, setIsHovered] = useState(false);
  const hoverStyle = isHovered ? { transform: "scale(1.02)" } : {};

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#333",
  };

  const contentStyle = {
    fontSize: "14px",
    color: "#555",
    marginBottom: "15px",
  };

  const buttonGroupStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  };

  const buttonStyle = {
    background: "#3498db",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  };

  const deleteButtonStyle = { ...buttonStyle, background: "#e74c3c" };

  return (
    <>
      <div
        style={{ ...cardStyle, ...hoverStyle }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowModal(true)}
      >
        <h3 style={titleStyle}>{note.title}</h3>
        <p style={contentStyle}>
          {note.content ? note.content.substring(0, 100) : ""}...
        </p>
        <div style={buttonGroupStyle} onClick={(e) => e.stopPropagation()}>
          <button style={buttonStyle} onClick={copyToClipboard}>
            Copy
          </button>
          <button style={buttonStyle} onClick={renameNote}>
            Rename
          </button>
          <button style={deleteButtonStyle} onClick={deleteNote}>
            Delete
          </button>
        </div>
      </div>
      {showModal && (
        <NoteModal
          note={note}
          token={token}
          onClose={() => setShowModal(false)}
          refreshNotes={refreshNotes}
        />
      )}
    </>
  );
}
