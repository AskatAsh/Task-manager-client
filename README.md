# Task Manager App

A powerful and intuitive task management application that helps users organize, track, and manage their tasks efficiently.

## 🚀 Live Demo

- **Frontend**: [Live Link](https://drag-and-drop-task.web.app)
- **Backend**: [Live Link](https://task-manage-dnd-server.vercel.app)
- **Backend**: [Github Link](https://github.com/AskatAsh/Task-manager-server.git)

## 📦 Dependencies

This project uses the following dependencies:

- **Frontend**
  - "@hello-pangea/dnd": "^18.0.1",
  - "axios": "^1.7.9",
  - "firebase": "^11.3.1",
  - "react": "^19.0.0",
  - "react-dom": "^19.0.0",
  - "react-router-dom": "^7.2.0"
- **Backend**
  - "cors": "^2.8.5",
  - "dotenv": "^16.4.7",
  - "express": "^4.21.2",
  - "mongodb": "^6.13.1",
  - "mongoose": "^8.10.1",
  - "nodemon": "^3.1.9"

## 🛠️ Installation Steps

1. **Clone the Repository**

   - Client side

   ```sh
   git clone https://github.com/AskatAsh/Task-manager-client.git
   cd Task-manager-client
   ```

   - Server side

   ```sh
   git clone https://github.com/AskatAsh/Task-manager-server.git
   cd Task-manager-server
   ```

2. **Install Dependencies**

   - Frontend:
     ```sh
     cd frontend
     npm install
     ```
   - Backend:
     ```sh
     cd backend
     npm install
     ```

3. **Set Up Environment Variables**

   - Create a `.env` file in both frontend and backend directories and add necessary environment variables.
   - For frontend create `.env.local` file instead.

4. **Run the Development Servers**

   - Frontend:
     ```sh
     npm run dev
     ```
   - Backend:
     ```sh
     nodemon
     # OR
     nodemon index.js
     ```

5. **Access the Application**
   - Open `http://localhost:5173` for the frontend.
   - Open `http://localhost:5000` for the backend.

## 🛠 Technologies Used

- **Frontend**: React.js, Tailwind CSS, Firebase Authentication (Google)
- **Backend**: MongoDB, Mongoose, Express.js
- **Deployment**: Firebase (Frontend), Vercel (Backend)

---

Feel free to explore and give feedback! 😊
