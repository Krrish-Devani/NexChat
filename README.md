# NexChat 💬✨

A modern real-time chat application with user authentication, message history, and beautiful UI design. Connect with friends and colleagues instantly! 🚀

## Live Demo 🌐

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-brightgreen?style=for-the-badge&logo=vercel)](https://nexchat-l1ln.onrender.com/)

## Features ✨

- **Real-time Messaging** 🔄 - Instant messaging with Socket.IO
- **User Authentication** 🔐 - Secure signup/login with JWT tokens
- **Message History** 📜 - Persistent chat history with MongoDB
- **Image Sharing** 📸 - Upload and share images in conversations
- **Online Status** 🟢 - See who's currently online
- **Profile Management** 👤 - Update profile pictures
- **Modern UI** 🎨 - Clean, intuitive interface
- **Message Timestamps** ⏰ - Track when messages were sent

## Technologies Used 🛠️

### Frontend 🎨
- React.js ⚛️
- Vite 🔥
- Tailwind CSS 🎯
- Lucide React (Icons) 🎭
- Socket.IO Client 🔌
- React Router Dom 🛣️
- React Hot Toast 🍞
- Zustand (State Management) 🐻

### Backend 🔧
- Node.js 💚
- Express.js 🚀
- MongoDB 🍃
- Socket.IO 🔌
- JWT (Authentication) 🔑
- Bcrypt.js 🔒

### Cloud Services ☁️
- Cloudinary (Image Storage) 📷
- MongoDB Atlas (Database) 🌐
- Render (Deployment) 🚀

## Installation 💻

1. Clone the repository
   ```bash
   git clone https://github.com/Krrish-Devani/NexChat.git
   cd NexChat
   ```

2. Set up environment variables (create a `.env` file in the backend directory)
   ```
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_key
   CLOUD_API_SECRET=your_cloudinary_secret
   NODE_ENV=development
   ```

3. Build the app
   ```bash
   npm run build
   ```

4. Start the server
   ```bash
   npm start
   ```

7. Visit `localhost:5173` in your browser

## Project Structure 📁

```
NexChat/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── message.controller.js
│   │   ├── lib/
│   │   │   ├── cloudinary.js
│   │   │   ├── mongodb.js
│   │   │   ├── socket.js
│   │   │   ├── utils.js
│   │   │   ├── validators.js
│   │   │   ├── helpers.js
│   │   │   └── config.js
│   │   ├── middleware/
│   │   │   └── checkAuthMiddleware.js
│   │   ├── models/
│   │   │   ├── message.model.js
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── auth.route.js
│   │   │   └── message.route.js
│   │   └── index.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── dist/              # Production build files
│   │   ├── assets/
│   │   ├── index.html
│   │   └── NexChat.png
│   ├── public/
│   │   └── NexChat.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── MessageContainer.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoChatSelected.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── SignUp.jsx
│   │   ├── store/
│   │   │   ├── messageStore.js
│   │   │   └── userAuthStore.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore
├── package.json           # Root package.json
└── README.md
```

## API Endpoints 🔌

### Authentication 🔐
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Log in a user
- `POST /api/auth/logout` - Log out a user
- `PUT /api/auth/update-profile` - Update user profile
- `GET /api/auth/check-auth` - Check authentication status

### Messages 💬
- `GET /api/messages/users` - Get all users for sidebar
- `GET /api/messages/:id` - Get messages with a specific user
- `POST /api/messages/send/:id` - Send a message to a user

## Key Features Explained 🔑

### Real-time Communication 🔄
The application uses Socket.IO for real-time bidirectional communication between clients and server. Messages are delivered instantly without page refresh.

### Authentication System 🔐
JWT-based authentication with secure password hashing using bcrypt. Protected routes ensure only authenticated users can access chat features.

### Message Persistence 📜
All messages are stored in MongoDB, allowing users to access their chat history across sessions and devices.

### Image Sharing 📸
Users can upload and share images in conversations. Images are stored securely using Cloudinary with automatic optimization.

### State Management 🐻
Zustand is used for efficient state management across the React application, handling user authentication and message states.

## 🙏 Acknowledgments

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

## 🔗 Connect

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/krrish-devani-121076323)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Krrish-Devani)

Created with ❤️ by Krrish Devani
