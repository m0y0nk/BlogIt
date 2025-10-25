# 🚀 BlogIt: A Modern MERN Stack Platform

**BlogIt** is a full-stack, production-ready blogging application built from scratch. It features a secure RESTful API backend and a dynamic, responsive React frontend, demonstrating a complete content management lifecycle.

---

## ✨ Live Demo

- **Frontend (Netlify):** [https://blogthat.netlify.app/](https://blogthat.netlify.app/)  
- **Backend (Render):** [https://my-blog-backend-td3b.onrender.com/](https://my-blog-backend-td3b.onrender.com/)

---

## ✅ Core Features

- **Authentication:** Secure JWT (JSON Web Token) user registration and login.  
- **Content Management:** Full CRUD (Create, Read, Update, Delete) operations for posts.  
- **User Dashboards:** A protected "My Posts" (`/profile`) page for users to manage their own content.  
- **Post Status:** Draft vs. Published logic (drafts are hidden from the public feed).  
- **Content Discovery:** Dynamic, real-time search (`?search=...`) and tag-based filtering.  
- **User Engagement:** A full commenting system (newest first) on post pages.  
- **Post Statistics:** Tracks and displays post views and comment count.  

---

## 🛠️ Technology Stack

| **Category** | **Technology** | **Purpose** |
|---------------|----------------|--------------|
| **Frontend** | React (Vite) | UI Library & Single-Page Application |
| **Backend** | Node.js & Express | RESTful API & Server Logic |
| **Database** | MongoDB Atlas | Cloud-hosted NoSQL Database |
| **Authentication** | JWT & bcrypt | Secure, stateless user sessions & password hashing |
| **Deployment** | Netlify (Client) | Frontend Hosting & CD |
|  | Render (Server) | Backend Hosting & CD |

---

## 🔧 Getting Started

This project is a **monorepo** containing two separate applications: `server` and `client`.  
You must run both in separate terminal sessions.

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mern_gemini.git
cd mern_gemini
```

### 2. Run the Backend (Server)
Full instructions are in the server/README.md.
```bash
# 1. Navigate to the server
cd server

# 2. Install dependencies
npm install

# 3. Create a .env file (see server/README.md for details)
touch .env

# 4. Run the server (on http://localhost:8000)
npm run start:dev
```

### 3. Run the Frontend (Client)
Full instructions are in the client/README.md.

```bash
# 1. In a new terminal, navigate to the client (from root)
cd client

# 2. Install dependencies
npm install

# 3. Create a .env.development file (see client/README.md for details)
touch .env.development

# 4. Run the client (on http://localhost:5173)
npm run dev
```

### 📂 Project Structure
This repository is structured as a monorepo.
```bash
/server   → Contains the Node.js & Express API.
/client   → Contains the React & Vite Frontend.
```

- Read the Server README for API endpoints and setup.
- Read the Client README for frontend structure and setup.
