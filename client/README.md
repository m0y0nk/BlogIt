# 🎨 BlogIt: Frontend UI (React & Vite)

This is the **React frontend** for the **BlogIt** platform.
It’s a **fast, modern, and responsive Single-Page Application (SPA)** built with **Vite**.

---

## ✨ Features

* **Secure Auth Flow:** Full user registration and login with global state management via Context API.
* **Protected Routes:** Users are redirected from pages like `/create` or `/profile` if not logged in.
* **Dynamic Content:** Fetch, create, edit, and delete blog posts.
* **User Dashboard:** “My Posts” page to manage your own draft and published content.
* **Post Discovery:** Homepage feed with dynamic search and tag-based filtering.
* **Interactive Comments:** Users can post comments on articles, which appear instantly (newest first).
* **Post Stats:** View counts and comment counts displayed on all posts.
* **Smart Navigation:** Automatically scrolls to the top of the page on navigation.

---

## 🚀 How to Run

### **Install Dependencies**

From the `/client` directory:

```bash
npm install
```

### **Create Environment File**

Create a `.env.development` file in the `/client` directory.
This file connects the frontend to your backend API.

```bash
# The URL of your local backend API (from server/README.md)
# (Vite requires the 'VITE_' prefix)
VITE_API_URL="http://localhost:8000/api"
```

> 💡 For production, this variable is set in your hosting platform (e.g., Netlify).

### **Run the Development Server**

```bash
npm run dev
```

The app will be live and accessible at:

```
http://localhost:5173
```

---

## 🏛️ Frontend Architecture

This app follows a **component-based architecture**.
Below are the key files and their responsibilities:

| File / Folder                         | Description                                                                                                                |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **src/main.jsx**                      | Entry point. Wraps the entire app in `<BrowserRouter>` and `<AuthProvider>`.                                               |
| **src/App.jsx**                       | Defines top-level routes using `react-router-dom` and includes the “scroll-to-top” logic.                                  |
| **src/context/AuthContext.js**        | The **brain** of the app. Manages global auth state (`user`, `token`, `login()`, `signup()`, `logout()`).                  |
| **src/services/api.js**               | The **heart** of API communication. Creates a central Axios instance and attaches JWT automatically to protected requests. |
| **src/components/ProtectedRoute.jsx** | The **gatekeeper**. Checks for a valid token; redirects to `/login` if unauthorized.                                       |
| **src/pages/**                        | Contains the main “views” of the app (e.g., `HomePage.jsx`, `SinglePostPage.jsx`, etc.).                                   |

---

## 🗂️ Folder Structure

A simplified overview of the key frontend directories and files:

```
/client
│
├── node_modules/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── Header.css
│   │   ├── Header.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── pages/
│   │   ├── AuthForm.css
│   │   ├── EditPostPage.jsx
│   │   ├── HomePage.css
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── PostEditor.css
│   │   ├── PostEditorPage.jsx
│   │   ├── ProfilePage.css
│   │   ├── ProfilePage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── SinglePostPage.css
│   │   └── SinglePostPage.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env.development
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

