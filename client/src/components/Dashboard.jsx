import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import NoteCard from "./NoteCard";
import AudioRecorder from "./AudioRecorder";
import NoteModal from "./NoteModal";

export default function Dashboard({ token, onLogout }) {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Fetch notes from the backend
  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNotes(data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotes();
    }
  }, [token]);

  // Filter notes based on search query
  const filteredNotes = notes.filter((note) => {
    const q = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(q) ||
      (note.content && note.content.toLowerCase().includes(q))
    );
  });

  // Callback when audio transcription is complete
  const handleTranscriptionComplete = async (transcribedText) => {
    try {
      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: transcribedText }),
      });
      const data = await res.json();
      setNotes([data.note, ...notes]);
    } catch (error) {
      console.error("Error creating note from transcription:", error);
    }
  };

  // Styling (inspired by your design)
  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#F4F6F8",
    fontFamily: "Arial, sans-serif",
  };

  const mainContentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  };

  const contentHeaderStyle = {
    padding: "20px",
  };

  const searchInputStyle = {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "20px",
  };

  const notesGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    padding: "0 20px 20px",
    flex: 1,
  };

  const sectionStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    margin: "20px",
  };

  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={mainContentStyle}>
        <Header onLogout={onLogout} username="User" />
        <div style={contentHeaderStyle}>
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={searchInputStyle}
          />
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              backgroundColor: "#3498db",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            New Note
          </button>
        </div>
        <div style={notesGridStyle}>
          {filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              token={token}
              refreshNotes={fetchNotes}
            />
          ))}
        </div>
        <div style={sectionStyle}>
          <h2>Or record your voice</h2>
          <AudioRecorder onTranscriptionComplete={handleTranscriptionComplete} />
        </div>
      </div>
      {showCreateModal && (
        <NoteModal
          note={{ title: "", content: "", isFavorite: false }}
          token={token}
          onClose={() => setShowCreateModal(false)}
          refreshNotes={fetchNotes}
          isNew={true}
        />
      )}
    </div>
  );
}
