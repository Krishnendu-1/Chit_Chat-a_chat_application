# Chat App

This full-stack web chat application is designed to provide real-time communication between users. The application is built with a modern tech stack, leveraging React.js for the frontend, Node.js and Express.js for the backend, and Socket.io as the WebSocket library to enable real-time bidirectional communication.

# Features
Real-Time Messaging: Instant communication between multiple users in real time.
User Identification: This functionality is used to know users before accessing the chat with valid usernames.
Responsive Design: The app is designed to work seamlessly on various devices.
Smooth Scrolling: Automatically scrolls to the bottom when new messages are sent or received.
Message History: Stores and displays all messages sent and received by users. Special messages shown on new join for 'You' and other user, user left messages from 'Admin'.

# Tech Stack

# Frontend:

React.js: A JavaScript library for building user interfaces.
React-router-dom: For managing navigation within the application.
React-scroll-to-bottom: Automatically scrolls the chat window to the latest message.
Socket.io-client: Enables real-time communication between the client and server.
Bootstrap: Ensure the device friendly UI/UX with responsive design.
Tailwind CSS: A utility-first CSS framework for rapid, customizable styling.

# Backend:

Node.js: JavaScript runtime built on Chrome's V8 JavaScript engine.
Express.js: Web application framework for Node.js, providing a robust set of features for web and mobile applications.
Socket.io: Enables real-time, bidirectional, and event-based communication between the browser and the server.
nodemon: Auto-restarts server on code changes.
cors: Enables cross-origin requests.
dotenv: Loads sensetive env vars from .env file.

# Installation
Prerequisites
Ensure you have the following installed:

Node.js (v14.x or higher)
npm (v6.x or higher) or yarn

# Backend Setup
Clone the Repository:

bash
git clone `https://github.com/your-username/chat-app.git`
cd chat-app
Navigate to the Backend Directory:

bash
cd server
Install Dependencies:[express.js,socket.io,dotenv,cors,nodemon]

bash
npm install
Start the Backend Server:

bash
npm run start
The server should now be running on `http://localhost:{your-set-port}`.

# Frontend Setup
Navigate to the Frontend Directory:

bash
cd ../client
Install React from Vite:
npm create vite@latest my-project

bash
npm i
Start the React App:

bash
npm run dev
The frontend should now be running on `http://localhost:{your-port}`.

Running the Application
Once both the backend and frontend servers are running, open your web browser and navigate to `http://localhost:{your-set-port}`. You should be able to register and start chatting in real time 😀

Thanks,
Krishnendu Roy
