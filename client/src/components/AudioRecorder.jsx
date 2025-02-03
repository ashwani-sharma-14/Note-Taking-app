import React, { useState, useRef } from "react";

export default function AudioRecorder({ onTranscriptionComplete }) {
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef(null);

  if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
    return <p>Web Speech API is not supported in this browser.</p>;
  }

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setRecording(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setRecording(false);
      onTranscriptionComplete(transcript);
    };
    recognition.onerror = (e) => {
      console.error(e);
      setRecording(false);
    };

    recognition.start();

    // Automatically stop after 60 seconds
    setTimeout(() => {
      if (recording) {
        recognition.stop();
      }
    }, 60000);
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <button
      onClick={recording ? stopRecording : startRecording}
      style={{
        padding: "10px 20px",
        backgroundColor: recording ? "#c0392b" : "#2ecc71",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      {recording ? "Stop Recording" : "Start Recording"}
    </button>
  );
}
