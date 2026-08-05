import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const files = [
  {
    fileName: "server / server.js",
    code: `
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());

app.get("/", (req, res) => res.send("Notes App API running..."));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));

app.use((req, res) => res.status(404).json({ message: "Not found" }));
app.use((err, req, res, next) => res.status(500).json({ message: err.message }));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(Notes App API running on port \${PORT}));
`
  },

  {
    fileName: "server/routes/authRoutes.js",
    code: `
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;`
  },
    {
    fileName: "server/routes/noteRoutes.js",
    code: `
const express = require("express");
const router = express.Router();
const { getNotes, createNote, updateNote, deleteNote } = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);
router.route("/").get(getNotes).post(createNote);
router.route("/:id").put(updateNote).delete(deleteNote);

module.exports = router;`
  },

  {
    fileName: "server/model/Note.js",
    code: `
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, default: "" },
    content: { type: String, required: true },
    color: { type: String, default: "#fff7cc" },
    pinned: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

noteSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Note", noteSchema);`
  },
  {
    fileName: "server/model/User.js",
    code: `
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("User", userSchema);`
  },
  {
    fileName: "server/controller/authController.js",
    code: `
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };  `
  },
  {
    fileName: "server/controller/noteController.js",
    code: `
const Note = require("../models/Note");

const getNotes = async (req, res) => {
  const filter = { user: req.user._id };
  if (req.query.keyword) filter.$text = { $search: req.query.keyword };
  const notes = await Note.find(filter).sort({ pinned: -1, updatedAt: -1 });
  res.json(notes);
};

const createNote = async (req, res) => {
  try {
    const { title, content, color, tags } = req.body;
    const note = await Note.create({ user: req.user._id, title, content, color, tags });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateNote = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
  if (!note) return res.status(404).json({ message: "Note not found" });
  Object.assign(note, req.body);
  const updated = await note.save();
  res.json(updated);
};

const deleteNote = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
  if (!note) return res.status(404).json({ message: "Note not found" });
  await note.deleteOne();
  res.json({ message: "Note removed" });
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
`
  },
  {
    fileName: "server/config/db.js",
    code: `
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(MongoDB connected: \${conn.connection.host});
  } catch (error) {
    console.error(DB connection error: \${error.message});
    process.exit(1);
  }
};

module.exports = connectDB;
`
  },
  {
    fileName: "server/middleware/authMiddleware.js",
    code: `
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) return res.status(401).json({ message: "Not authorized" });
      next();
    } catch (err) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
`
  },
  {
    fileName: "server/ .env",
    code: `
PORT=5002
MONGO_URI= ///enter your mongodb  url
JWT_SECRET=djkdh7dfh4ui3h
CLIENT_URL=http://localhost:3000
`
  },
  {
    fileName: "client/api/axios.js",
    code: `
import axios from "axios";

const api = axios.create({ baseURL: "/api" });

api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) config.headers.Authorization = Bearer \${token};
  }
  return config;
});

export default api;`
  },
  {
    fileName: "client/components/Navbar.js",
    code: `
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ onSearch }) => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">QuickNotes</Link>
        {userInfo && (
          <>
            <input
              className="search-input"
              placeholder="Search notes..."
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
            <div className="nav-right">
              <span>Hi, {userInfo.name.split(" ")[0]}</span>
              <button className="btn btn-outline" onClick={() => { logout(); navigate("/login"); }}>
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;`
  },
  {
    fileName: "client/components/NoteComponents.js",
    code: `
import React, { useState } from "react";

const colors = ["#fff7cc", "#d9f7e6", "#dceeff", "#ffe3e3", "#f0e3ff", "#ffffff"];

export const NoteCard = ({ note, onEdit, onDelete, onTogglePin }) => {
  return (
    <div className="note-card" style={{ background: note.color || "#fff7cc" }}>
      <div className="note-card-top">
        {note.title && <h4>{note.title}</h4>}
        <button className="pin-btn" onClick={() => onTogglePin(note)} title="Pin">
          {note.pinned ? "★" : "☆"}
        </button>
      </div>
      <p className="note-content">{note.content}</p>
      {note.tags?.length > 0 && (
        <div className="tag-row">
          {note.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>
      )}
      <div className="note-actions">
        <button onClick={() => onEdit(note)}>Edit</button>
        <button className="danger" onClick={() => onDelete(note._id)}>Delete</button>
      </div>
    </div>
  );
};

export const NoteModal = ({ initial, onClose, onSave }) => {
  const [form, setForm] = useState(
    initial || { title: "", content: "", color: colors[0], tags: [] }
  );
  const [tagInput, setTagInput] = useState(initial?.tags?.join(", ") || "");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSave({ ...form, tags: tagInput.split(",").map((t) => t.trim()).filter(Boolean) });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h3>{initial ? "Edit Note" : "New Note"}</h3>
        <label>Title (optional)</label>
        <input name="title" value={form.title} onChange={handleChange} />

        <label>Content</label>
        <textarea name="content" value={form.content} onChange={handleChange} rows={5} required />

        <label>Tags (comma separated)</label>
        <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="work, ideas" />

        <label>Color</label>
        <div className="color-row">
          {colors.map((c) => (
            <button
              type="button"
              key={c}
              className={color-swatch \${form.color === c ? "active" : ""}}
              style={{ background: c }}
              onClick={() => setForm({ ...form, color: c })}
            />
          ))}
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
};`
  },

  {
    fileName: "client/components/PrivateRoute.js",
    code: `
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { userInfo } = useAuth();
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;`
  },
  {
    fileName: "client/context/AuthContext.js",
    code: `
import React, { createContext, useState, useContext } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const stored = localStorage.getItem("userInfo");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUserInfo(data);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", { name, email, password });
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUserInfo(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);`
  },
  {
    fileName: "client/pages/Dashboard.js",
    code: `
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { NoteCard, NoteModal } from "../components/NoteComponents";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [keyword, setKeyword] = useState("");

  const fetchNotes = useCallback(async () => {
    const { data } = await api.get(/notes\${keyword ? ?keyword=\${keyword} : ""});
    setNotes(data);
  }, [keyword]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSave = async (form) => {
    try {
      if (editing) {
        await api.put(/notes/\${editing._id}, form);
        toast.success("Note updated");
      } else {
        await api.post("/notes", form);
        toast.success("Note created");
      }
      setModalOpen(false);
      setEditing(null);
      fetchNotes();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    await api.delete(/notes/\${id});
    toast.success("Note deleted");
    fetchNotes();
  };

  const togglePin = async (note) => {
    await api.put(/notes/\${note._id}, { pinned: !note.pinned });
    fetchNotes();
  };

  return (
    <>
      <Navbar onSearch={setKeyword} />
      <div className="container">
        <div className="page-header">
          <h1>My Notes</h1>
          <button className="btn btn-primary" onClick={() => { setEditing(null); setModalOpen(true); }}>
            + New Note
          </button>
        </div>

        {notes.length === 0 ? (
          <p className="empty-state">No notes yet. Create your first one!</p>
        ) : (
          <div className="notes-grid">
            {notes.map((n) => (
              <NoteCard
                key={n._id}
                note={n}
                onEdit={(note) => { setEditing(note); setModalOpen(true); }}
                onDelete={handleDelete}
                onTogglePin={togglePin}
              />
            ))}
          </div>
        )}

        {modalOpen && (
          <NoteModal
            initial={editing}
            onClose={() => { setModalOpen(false); setEditing(null); }}
            onSave={handleSave}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;`
  },
  {
    fileName: "client/pages/Login.js",
    code: `
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={submit}>
        <h2>Sign In to QuickNotes</h2>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-primary full-width">Sign In</button>
        <p>No account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;`
  },
  {
    fileName: "client/pages/Register.js",
    code: `
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={submit}>
        <h2>Create Account</h2>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-primary full-width">Register</button>
        <p>Already have an account? <Link to="/login">Sign in</Link></p>
      </form>
    </div>
  );
};

export default Register;`
  },
  {
    fileName: "client/styles/index.css",
    code: `
:root {
  --bg: #fafaf8;
  --surface: #ffffff;
  --text: #292524;
  --muted: #78716c;
  --primary: #d97706;
  --primary-hover: #b45309;
  --border: #e7e5e4;
  --radius: 12px;
}
* { box-sizing: border-box; }
body { margin: 0; font-family: "Segoe UI", sans-serif; background: var(--bg); color: var(--text); }
a { text-decoration: none; color: inherit; }
button { cursor: pointer; font-family: inherit; }

.container { max-width: 1200px; margin: 0 auto; padding: 24px 20px 60px; }

.navbar { background: var(--surface); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 20; }
.navbar-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; gap: 16px; }
.brand { font-size: 20px; font-weight: 700; color: var(--primary); white-space: nowrap; }
.search-input { flex: 1; max-width: 360px; padding: 8px 14px; border: 1px solid var(--border); border-radius: 20px; }
.nav-right { display: flex; align-items: center; gap: 14px; font-size: 14px; white-space: nowrap; }

.btn { padding: 9px 18px; border-radius: 8px; border: none; font-weight: 600; font-size: 14px; }
.btn-primary { background: var(--primary); color: #fff; }
.btn-primary:hover { background: var(--primary-hover); }
.btn-outline { background: #fff; border: 1px solid var(--border); }
.full-width { width: 100%; }

.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.empty-state { color: var(--muted); text-align: center; padding: 60px 0; }

.notes-grid { columns: 4 260px; column-gap: 16px; }
.note-card {
  break-inside: avoid; border-radius: var(--radius); padding: 16px; margin-bottom: 16px;
  border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.note-card-top { display: flex; justify-content: space-between; align-items: flex-start; }
.note-card-top h4 { margin: 0 0 6px; font-size: 15px; }
.pin-btn { background: none; border: none; font-size: 16px; color: var(--primary); }
.note-content { white-space: pre-wrap; font-size: 14px; line-height: 1.5; margin: 4px 0 10px; }
.tag-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
.tag { background: rgba(0,0,0,0.06); font-size: 11px; padding: 2px 8px; border-radius: 12px; }
.note-actions { display: flex; gap: 8px; }
.note-actions button { font-size: 12px; background: rgba(255,255,255,0.6); border: 1px solid rgba(0,0,0,0.1); padding: 4px 10px; border-radius: 6px; }
.note-actions button.danger { color: #dc2626; }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 100; }
.modal { background: #fff; padding: 24px; border-radius: var(--radius); width: 100%; max-width: 440px; }
.modal h3 { margin-top: 0; }
.modal label { display: block; font-size: 13px; font-weight: 600; margin: 10px 0 4px; }
.modal input, .modal textarea { width: 100%; padding: 9px 10px; border: 1px solid var(--border); border-radius: 8px; font-size: 14px; }
.color-row { display: flex; gap: 8px; margin-top: 6px; }
.color-swatch { width: 26px; height: 26px; border-radius: 50%; border: 2px solid transparent; }
.color-swatch.active { border-color: var(--primary); }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 18px; }

.auth-page { display: flex; justify-content: center; padding: 60px 20px; }
.auth-form { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 30px; width: 100%; max-width: 380px; }
.auth-form h2 { margin-top: 0; }
.auth-form label { display: block; font-size: 13px; font-weight: 600; margin: 12px 0 4px; }
.auth-form input { width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 14px; }
.auth-form p { margin-top: 16px; font-size: 13px; text-align: center; color: var(--muted); }
.auth-form button { margin-top: 18px; }

@media (max-width: 768px) {
  .notes-grid { columns: 2 220px; }
  .navbar-inner { flex-wrap: wrap; }
}`
  },
  {
    fileName: "client/App.js",
    code: `
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2200} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;`
  },
  {
    fileName: "client/index.js",
    code: `
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);`
  }
];

function CodeSlider2() {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    <div style={{ width: "85%", margin: "30px auto" }}>
      <h1 style={{ textAlign: "center" }}>
        MERN Project - 2 (Notes Management)
      </h1>
      <div className="slider-container">
        <Slider {...settings}>
          {files.map((item, index) => (
            <div key={index}>
              <div
                style={{

                  padding: "30px",
                  background: "#282c34",
                  borderRadius: "20px"
                }}
              >
                <h2 style={{ color: "white" }}>
                  {item.fileName}
                </h2>

                <pre
                  style={{
                    color: "#61dafb",
                    overflowX: "auto",
                    whiteSpace: "pre-wrap",

                  }}
                >
                  <code>{item.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </Slider></div>
    </div>
  );
}

export default CodeSlider2;