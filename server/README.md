# 🚀 BlogIt: API Server

This is the complete **Node.js/Express backend** for the **BlogIt** application.
It provides a **secure, stateless RESTful API** for handling **users, posts, and comments**.

---

## ⚙️ Core Technology

| Tech             | Purpose                                          |
| ---------------- | ------------------------------------------------ |
| **Node.js**      | JavaScript Runtime                               |
| **Express**      | API Framework                                    |
| **Mongoose**     | MongoDB Object Data Modeling (ODM)               |
| **jsonwebtoken** | User Authentication (Signing & Verifying Tokens) |
| **bcrypt.js**    | Password Hashing                                 |
| **cors**         | Cross-Origin Resource Sharing Security           |

---

## 🔑 Environment Setup

Before running, you must create a `.env` file in the `/server` directory.

```bash
# --- Database ---
# Your MongoDB Atlas connection string.
# (For production, ensure Atlas IP Access List is 0.0.0.0/0 for Render)
MONGO_URI="mongodb+srv://..."

# --- Authentication ---
# A new, strong 64-character random string
# (Use: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET="YOUR_SUPER_STRONG_SECRET_KEY_HERE"
JWT_LIFETIME="7d"

# --- Server & Security ---
# Port for the server to run on
PORT=8000
# The URL of your deployed React app (for CORS security)
CLIENT_URL="http://localhost:5173"
# (For production, update CLIENT_URL to your live Netlify URL)
```

---

## 🧩 How to Run

**Install Dependencies:**

```bash
npm install
```

**Run in Development Mode**
(Uses `nodemon` for auto-reloading):

```bash
npm run start:dev
```

The API will be live and listening at:

```
http://localhost:8000
```

---

## 📖 API Endpoints

> All routes are prefixed with `/api`.

| Method     | Endpoint                 | Access    | Description                                                 |
| ---------- | ------------------------ | --------- | ----------------------------------------------------------- |
| **POST**   | `/auth/signup`           | Public    | Register a new user                                         |
| **POST**   | `/auth/login`            | Public    | Log in a user and receive a JWT                             |
| **GET**    | `/posts`                 | Public    | Get all published posts. Queries: `?search=...`, `?tag=...` |
| **POST**   | `/posts`                 | Protected | Create a new post                                           |
| **GET**    | `/posts/myposts`         | Protected | Get all posts (draft & published) by the logged-in user     |
| **GET**    | `/posts/:id`             | Public    | Get a single post by its ID (increments views)              |
| **PUT**    | `/posts/:id`             | Protected | Update a post (Author only)                                 |
| **DELETE** | `/posts/:id`             | Protected | Delete a post (Author only)                                 |
| **GET**    | `/comments/post/:postId` | Public    | Get all comments for a specific post (newest first)         |
| **POST**   | `/comments`              | Protected | Create a new comment (increments commentCount)              |

### 🗂️ Folder Structure
A simplified overview of the key frontend directories and files:

```
/server
│
├── config/
│   └── db.js                    # MongoDB connection configuration
│
├── controllers/                 # Request handlers for each route
│   ├── auth.js                  # Handles user registration and login
│   ├── commentController.js     # Handles CRUD for comments
│   └── posts.js                 # Handles CRUD for posts
│
├── middleware/
│   └── auth.js                  # JWT verification and route protection
│
├── models/                      # Mongoose data models
│   ├── Comment.js
│   ├── Post.js
│   └── User.js
│
├── routes/                      # Express route definitions
│   ├── auth.js
│   ├── commentRoutes.js
│   └── posts.js
│
├── node_modules/
│
├── .env                         # Environment variables (private)
├── .env.example                 # Example env file for setup reference
├── .gitignore                   # Git ignore configuration
├── package.json                 # Project dependencies and scripts
├── package-lock.json
├── server.js                    # Main entry point (Express app)
└── README.md                    # Project documentation

```
