import React, { useState } from "react";

export default function NoteModal({
  note,
  token,
  onClose,
  refreshNotes,
  isNew = false,
}) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isFavorite, setIsFavorite] = useState(note.isFavorite);

  const saveChanges = async () => {
    try {
      let res;
      if (isNew) {
        // Create new note
        res = await fetch("http://localhost:5000/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content, isFavorite }),
        });
      } else {
        // Update existing note
        res = await fetch(`http://localhost:5000/api/notes/${note._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content, isFavorite }),
        });
      }
      if (res.ok) {
        refreshNotes();
        onClose();
      }
    } catch (error) {
      console.error("Error saving note changes:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    // TODO: Implement image upload (e.g., upload to a cloud service and update the note)
  };

  const goFullScreen = () => {
    const elem = document.getElementById("note-modal");
    if (elem && elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  return (
    <div
      id="note-modal"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          width: "90%",
          maxWidth: "600px",
          borderRadius: "8px",
          position: "relative",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            lineHeight: "1",
          }}
          aria-label="Close modal"
        >
          &times;
        </button>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note Content"
            style={{
              width: "100%",
              height: "200px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />
        </div>
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            style={{
              padding: "8px 16px",
              background: isFavorite ? "#e74c3c" : "#3498db",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {isFavorite ? "Unfavorite" : "Favorite"}
          </button>
          <button
            onClick={saveChanges}
            style={{
              padding: "8px 16px",
              background: "#2ecc71",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
          <button
            onClick={goFullScreen}
            style={{
              padding: "8px 16px",
              background: "#f1c40f",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Fullscreen
          </button>
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ fontSize: "16px" }}
          />
        </div>
      </div>
    </div>
  );
}
