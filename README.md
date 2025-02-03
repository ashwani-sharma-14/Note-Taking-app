# 📝 Note-Taking App

A **React-based Note-Taking Application** that allows users to create, edit, delete, and search notes with text and audio transcription. The app also supports authentication using JWT and stores user notes in MongoDB.

## 🚀 Features

- 🔐 **User Authentication**
  - Signup and login functionality using JWT.
- 📝 **Note Management**
  - Create, edit, delete, and rename notes.
  - Support for text-based and audio-based notes (transcribed via Web Speech API).
  - Favorite/unfavorite notes.
  - Copy notes to the clipboard.
  - Sort notes from old to new.
- 🔍 **Search & Filtering**
  - Search notes in real-time by title and content.
  - Display search results dynamically.
- 🎤 **Audio Transcription**
  - Record and transcribe voice notes (max duration: 1 minute).
- 🖼️ **File Upload**
  - Upload images and associate them with notes.
- 📌 **Note Modal**
  - Clicking a note opens a modal with full content.
  - Supports fullscreen mode.

## 🏗️ Tech Stack

- **Frontend:** React.js (with Tailwind CSS & Shadcn UI for styling)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Speech Recognition:** Web Speech API

## 📦 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/note-taking-app.git
cd note-taking-app
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```
REACT_APP_API_URL=http://localhost:5000
```

### 4️⃣ Run the Backend Server
Navigate to the backend folder and start the server:
```sh
npm run server-install
npm run server-start
```

### 5️⃣ Start the Frontend App
Return to the root directory and run:
```sh
npm run client-install
npm run client-start
```

## 📷 Screenshots
![image](https://github.com/user-attachments/assets/2b7cc2dd-b530-4414-b78c-847cbbb9ec06)


.

