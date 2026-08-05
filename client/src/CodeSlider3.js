import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const files = [
  {
    fileName: "backend / config / db.js",
    code: `
import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ludo";
  try {
    await mongoose.connect(uri);
    console.log("[db] MongoDB connected");
  } catch (err) {
    console.error("[db] MongoDB connection failed:", err.message);
    process.exit(1);
  }
}`
  }
  ,
  {
    fileName: "backend / controllers / gameController.js",
    code: `
import GameResult from "../models/GameResult.js";
import User from "../models/User.js";

export async function saveResult(req, res) {
  try {
    const { players, winnerColor, totalTurns, durationSeconds } = req.body;
    if (!Array.isArray(players) || players.length < 2) {
      return res.status(400).json({ message: "At least 2 players are required" });
    }

    const result = await GameResult.create({
      user: req.userId || null,
      players,
      winnerColor,
      totalTurns: totalTurns || 0,
      durationSeconds: durationSeconds || 0,
    });

    if (req.userId) {
      const account = await User.findById(req.userId);
      const winner = players.find((p) => p.color === winnerColor);
      const won =
        account && winner && winner.name?.toLowerCase() === account.username.toLowerCase();
      await User.findByIdAndUpdate(req.userId, {
        $inc: { "stats.played": 1, "stats.wins": won ? 1 : 0 },
      });
    }

    res.status(201).json({ result });
  } catch (err) {
    res.status(500).json({ message: "Could not save result", error: err.message });
  }
}

export async function getHistory(req, res) {
  try {
    const results = await GameResult.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({ results });
  } catch (err) {
    res.status(500).json({ message: "Could not load history", error: err.message });
  }
}`
  },
  {
    fileName: "backend / controllers / authController.js",
    code: `
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

export async function register(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ username: username.trim() });
    if (existing) {
      return res.status(409).json({ message: "That username is already taken" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username: username.trim(), passwordHash });

    const token = signToken(user._id);
    res.status(201).json({
      token,
      user: { id: user._id, username: user.username, stats: user.stats },
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username: username.trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = signToken(user._id);
    res.json({
      token,
      user: { id: user._id, username: user.username, stats: user.stats },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
}

export async function me(req, res) {
  const user = await User.findById(req.userId).select("-passwordHash");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ user });
}`
  },
  {
    fileName: "backend / middleware / auth.js",
    code: `
import jwt from "jsonwebtoken";

function getTokenFromHeader(req) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) return null;
  return header.slice(7);
}

// Blocks the request if no valid token is present.
export function requireAuth(req, res, next) {
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// Attaches req.userId if a valid token is present, but never blocks the request.
// Used for endpoints guests can also hit (e.g. saving a guest match result).
export function optionalAuth(req, res, next) {
  const token = getTokenFromHeader(req);
  if (!token) return next();
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
  } catch {
    // ignore invalid token for optional auth
  }
  next();
}`
  },
  {
    fileName: "backend / models / User.js",
    code: `
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    stats: {
      played: { type: Number, default: 0 },
      wins: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);`
  },
  {
    fileName: "backend / models / GameResult.js",
    code: `
import mongoose from "mongoose";

const gameResultSchema = new mongoose.Schema(
  {
    // The logged-in user who reported this result (optional - guests can play too)
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    players: [
      {
        name: { type: String, required: true },
        color: {
          type: String,
          enum: ["red", "green", "yellow", "blue"],
          required: true,
        },
        rank: { type: Number, default: null }, // 1 = winner, 2 = second, etc.
      },
    ],
    winnerColor: { type: String, enum: ["red", "green", "yellow", "blue"] },
    totalTurns: { type: Number, default: 0 },
    durationSeconds: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("GameResult", gameResultSchema);`
  },
  {
    fileName: "backend / routes / gameRoutes.js",
    code: `
import { Router } from "express";
import { saveResult, getHistory } from "../controllers/gameController.js";
import { requireAuth, optionalAuth } from "../middleware/auth.js";

const router = Router();

router.post("/result", optionalAuth, saveResult);
router.get("/history", requireAuth, getHistory);

export default router;`
  },
  {
    fileName: "backend / routes / authRoutes.js",
    code: `
import { Router } from "express";
import { register, login, me } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, me);

export default router;
`
  },
  {
    fileName: "backend / server.js",
    code: `
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log([server] Listening on port \${PORT}));
});`
  }, {
    fileName: "frontend / main.js",
    code: `
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);`
  },
  {
    fileName: "frontend / App.js",
    code: `
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GamePage from "./pages/GamePage";
import History from "./pages/History";
import { useAuth } from "./context/AuthContext";

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/game" element={<GamePage />} />
      <Route
        path="/history"
        element={
          <RequireAuth>
            <History />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}`
  },
  {
    fileName: "frontend / styles / index.css",
    code: `
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Inter:wght@400;500;600&display=swap");

:root {
  --felt: #12463b;
  --felt-dark: #0c332b;
  --wood: #a9673a;
  --wood-dark: #7c4a28;
  --cream: #f5ecd8;
  --ink: #1f2a24;
  --gold: #e0b03d;

  --board-bg: #f5ecd8;
  --board-line: rgba(31, 42, 36, 0.18);
  --board-frame: var(--wood-dark);
  --star-color: #b8860b;
  --select-ring: var(--gold);
  --dice-accent: var(--felt);

  --radius-lg: 20px;
  --radius-md: 12px;
  --shadow-soft: 0 10px 30px rgba(0, 0, 0, 0.25);

  font-family: "Inter", system-ui, sans-serif;
  color-scheme: light;
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  height: 100%;
}

body {
  margin: 0;
  background:
    radial-gradient(circle at 20% 0%, rgba(255, 255, 255, 0.06), transparent 40%),
    var(--felt);
  background-attachment: fixed;
  color: var(--cream);
  min-height: 100vh;
}

h1,
h2 {
  font-family: "Fredoka", "Inter", sans-serif;
  margin: 0;
}

button {
  font-family: inherit;
}

.link-btn {
  color: var(--cream);
  text-decoration: none;
  opacity: 0.85;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
}
.link-btn:hover {
  opacity: 1;
  text-decoration: underline;
}

.primary-btn {
  background: var(--gold);
  color: var(--felt-dark);
  border: none;
  font-weight: 700;
  font-family: "Fredoka", sans-serif;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(224, 176, 61, 0.35);
  transition: transform 0.15s ease;
}
.primary-btn:hover {
  transform: translateY(-1px);
}
.primary-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* ---------- Home / setup ---------- */
.home-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 3rem;
}

.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.home-header h1 {
  font-size: 2rem;
  color: var(--gold);
}

.home-user {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.home-user a {
  color: var(--cream);
  opacity: 0.85;
  text-decoration: none;
}
.home-user a:hover {
  opacity: 1;
  text-decoration: underline;
}

.setup-card {
  background: var(--cream);
  color: var(--ink);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  box-shadow: var(--shadow-soft);
}

.setup-card h2 {
  font-size: 1.4rem;
  margin-bottom: 0.35rem;
}

.setup-sub {
  margin: 0 0 1.25rem;
  opacity: 0.75;
  font-size: 0.95rem;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}
@media (min-width: 480px) {
  .color-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.color-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  padding: 0.75rem 0.5rem;
  border-radius: var(--radius-md);
  border: 2px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  font-weight: 600;
  cursor: pointer;
  opacity: 0.55;
  transition: all 0.15s ease;
}
.color-toggle--on {
  opacity: 1;
  border-color: var(--c);
  background: color-mix(in srgb, var(--c) 12%, white);
}
.color-toggle__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--c);
  display: inline-block;
}

.name-inputs {
  display: grid;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}
.name-inputs label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: #fff;
  border-radius: var(--radius-md);
  padding: 0.15rem 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
}
.name-inputs__swatch {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--c);
  flex-shrink: 0;
}
.name-inputs input {
  border: none;
  outline: none;
  padding: 0.6rem 0;
  width: 100%;
  font-size: 0.95rem;
  background: transparent;
}

/* ---------- Auth ---------- */
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.auth-card {
  background: var(--cream);
  color: var(--ink);
  width: 100%;
  max-width: 380px;
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.auth-sub {
  margin: -0.5rem 0 0.25rem;
  opacity: 0.7;
  font-size: 0.9rem;
}

.auth-card label {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.9rem;
  font-weight: 600;
}

.auth-card input {
  padding: 0.65rem 0.75rem;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 1rem;
}

.auth-card button {
  margin-top: 0.4rem;
  background: var(--felt);
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
}

.auth-error {
  color: #b3261e;
  font-size: 0.85rem;
  margin: 0;
}

.auth-switch {
  text-align: center;
  font-size: 0.85rem;
  margin: 0;
}

/* ---------- Game page ---------- */
.game-page {
  padding: 1rem;
  max-width: 1100px;
  margin: 0 auto;
}

.game-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.game-header h1 {
  font-size: 1.4rem;
  color: var(--gold);
}
.turn-count {
  opacity: 0.75;
  font-size: 0.85rem;
}

.game-layout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
@media (min-width: 860px) {
  .game-layout {
    flex-direction: row;
    align-items: flex-start;
  }
}

.board-wrap {
  background: var(--wood);
  border-radius: var(--radius-lg);
  padding: 0.6rem;
  box-shadow: var(--shadow-soft);
  flex: 1 1 auto;
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
}

.ludo-board {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
  overflow: hidden;
}

.game-sidebar {
  flex: 0 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
@media (min-width: 860px) {
  .game-sidebar {
    width: 300px;
  }
}

.player-panel {
  display: grid;
  gap: 0.5rem;
}

.player-card {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  padding: 0.6rem 0.8rem;
}
.player-card--active {
  border-color: var(--player-color);
  background: rgba(255, 255, 255, 0.14);
}
.player-card--done {
  opacity: 0.6;
}
.player-card__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--player-color);
  flex-shrink: 0;
}
.player-card__info {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.player-card__name {
  font-weight: 600;
  font-size: 0.92rem;
}
.player-card__meta {
  font-size: 0.75rem;
  opacity: 0.7;
}
.player-card__badge {
  font-size: 0.7rem;
  background: var(--gold);
  color: var(--felt-dark);
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  font-weight: 700;
}

.turn-box {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--c);
  border-radius: var(--radius-lg);
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}
.turn-box__label {
  margin: 0;
  font-weight: 700;
  font-family: "Fredoka", sans-serif;
  color: var(--c);
}

.dice {
  width: 84px;
  height: 84px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}
.dice:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.hint {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.75;
}

.game-log {
  background: rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-md);
  padding: 0.75rem 0.9rem;
  font-size: 0.78rem;
  line-height: 1.5;
  max-height: 160px;
  overflow-y: auto;
}
.game-log p {
  margin: 0 0 0.25rem;
  opacity: 0.85;
}

/* ---------- Modal ---------- */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 20;
}
.modal {
  background: var(--cream);
  color: var(--ink);
  border-radius: var(--radius-lg);
  padding: 2rem;
  max-width: 380px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow-soft);
}
.modal h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.rank-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  display: grid;
  gap: 0.4rem;
  text-align: left;
}
.rank-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}
.rank-list__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--c);
}
.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
  margin-top: 0.5rem;
}

/* ---------- History ---------- */
.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.6rem;
}
.history-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #fff;
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
}
.history-item__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}
.history-item__title {
  margin: 0;
  font-weight: 600;
  font-size: 0.92rem;
}
.history-item__meta {
  margin: 0;
  font-size: 0.78rem;
  opacity: 0.65;
}

.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: var(--cream);
}`
  },
  {
    fileName: "frontend / pages / GamePage.js",
    code: `
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import LudoBoard from "../game/LudoBoard";
import Dice from "../game/Dice";
import PlayerPanel from "../game/PlayerPanel";
import { useLudoGame } from "../game/useLudoGame";
import { COLOR_HEX, COLOR_LABEL } from "../game/boardData";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const setup = location.state;

  useEffect(() => {
    if (!setup?.colors?.length) navigate("/", { replace: true });
  }, [setup, navigate]);

  const colors = setup?.colors || ["red", "yellow"];
  const names = setup?.names || {};

  const { state, roll, move, reset } = useLudoGame(colors, names);
  const [rolling, setRolling] = useState(false);
  const startTimeRef = useRef(Date.now());
  const [saved, setSaved] = useState(false);

  const currentPlayer = state.players[state.currentPlayerIndex];

  function handleRoll() {
    if (state.diceRolled || rolling || state.gameOver) return;
    setRolling(true);
    setTimeout(() => {
      roll();
      setRolling(false);
    }, 550);
  }

  function handleSelectPawn(pawnIndex) {
    if (!state.diceRolled) return;
    if (!state.validPawnIndices.includes(pawnIndex)) return;
    move(pawnIndex);
  }

  function handlePlayAgain() {
    startTimeRef.current = Date.now();
    setSaved(false);
    reset(colors, names);
  }

  useEffect(() => {
    if (!state.gameOver || saved) return;
    const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
    const players = state.players.map((p) => ({
      name: p.name,
      color: p.color,
      rank: p.rank,
    }));
    const winnerColor = state.winners[0];
    api
      .post("/game/result", { players, winnerColor, totalTurns: state.turnCount, durationSeconds })
      .catch(() => {
        /* saving history is best-effort; ignore failures (e.g. backend not running) */
      });
    setSaved(true);
  }, [state.gameOver, saved, state.players, state.winners, state.turnCount]);

  const winnerName = useMemo(() => {
    if (!state.gameOver || !state.winners.length) return null;
    const winnerColor = state.winners[0];
    const p = state.players.find((pl) => pl.color === winnerColor);
    return p?.name || COLOR_LABEL[winnerColor];
  }, [state.gameOver, state.winners, state.players]);

  return (
    <div className="game-page">
      <header className="game-header">
        <Link to="/" className="link-btn">← Exit</Link>
        <h1>🎲 Ludo</h1>
        <span className="turn-count">Turn {state.turnCount}</span>
      </header>

      <div className="game-layout">
        <div className="board-wrap">
          <LudoBoard
            players={state.players}
            currentColor={currentPlayer.color}
            validPawnIndices={state.validPawnIndices}
            onSelectPawn={handleSelectPawn}
          />
        </div>

        <aside className="game-sidebar">
          <PlayerPanel players={state.players} currentColor={currentPlayer.color} />

          <div className="turn-box" style={{ "--c": COLOR_HEX[currentPlayer.color] }}>
            <p className="turn-box__label">
              {state.gameOver ? "Game over" : \${currentPlayer.name}'s turn}
            </p>
            <Dice
              value={state.diceValue}
              rolling={rolling}
              disabled={state.diceRolled || rolling || state.gameOver}
              onRoll={handleRoll}
              colorHex={COLOR_HEX[currentPlayer.color]}
            />
            {state.diceRolled && state.validPawnIndices.length === 0 && (
              <p className="hint">No legal move — turn will pass.</p>
            )}
            {state.diceRolled && state.validPawnIndices.length > 0 && (
              <p className="hint">Tap a glowing pawn to move it.</p>
            )}
          </div>

          <div className="game-log">
            {state.log.slice(-6).reverse().map((entry, i) => (
              <p key={i}>{entry}</p>
            ))}
          </div>
        </aside>
      </div>

      {state.gameOver && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>🏆 {winnerName} wins!</h2>
            <ol className="rank-list">
              {[...state.players]
                .sort((a, b) => (a.rank || 99) - (b.rank || 99))
                .map((p) => (
                  <li key={p.color} style={{ "--c": COLOR_HEX[p.color] }}>
                    <span className="rank-list__dot" /> {p.name} — Rank #{p.rank || "-"}
                  </li>
                ))}
            </ol>
            {!user && <p className="hint">Log in next time to save your match history.</p>}
            <div className="modal-actions">
              <button className="primary-btn" onClick={handlePlayAgain}>Play again</button>
              <Link className="link-btn" to="/">Change players</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`
  },
  {
    fileName: "frontend / pages / History.js",
    code: `
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { COLOR_HEX, COLOR_LABEL } from "../game/boardData";

export default function History() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/game/history")
      .then((res) => setResults(res.data.results))
      .catch((err) => setError(err.response?.data?.message || "Could not load history"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Match history</h1>
        <Link to="/" className="link-btn">← Back</Link>
      </header>

      <div className="setup-card">
        {loading && <p>Loading…</p>}
        {error && <p className="auth-error">{error}</p>}
        {!loading && !error && results.length === 0 && <p>No games saved yet — go play one!</p>}

        <ul className="history-list">
          {results.map((r) => (
            <li key={r._id} className="history-item">
              <span
                className="history-item__dot"
                style={{ background: COLOR_HEX[r.winnerColor] }}
              />
              <div>
                <p className="history-item__title">
                  {COLOR_LABEL[r.winnerColor]} won · {r.players.length} players
                </p>
                <p className="history-item__meta">
                  {new Date(r.createdAt).toLocaleString()} · {r.totalTurns} turns
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}`
  },
  {
    fileName: "frontend / pages / Home.js",
    code: `
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { COLOR_HEX, COLOR_LABEL, PLAYER_ORDER } from "../game/boardData";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(["red", "yellow"]);
  const [names, setNames] = useState({});
  const [error, setError] = useState("");

  function toggleColor(color) {
    setError("");
    setSelected((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  }

  function startGame() {
    if (selected.length < 2) {
      setError("Pick at least 2 players.");
      return;
    }
    const orderedColors = PLAYER_ORDER.filter((c) => selected.includes(c));
    navigate("/game", { state: { colors: orderedColors, names } });
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>🎲 Ludo</h1>
        {user ? (
          <div className="home-user">
            <span>Hi, {user.username}</span>
            <Link to="/history">History</Link>
            <button className="link-btn" onClick={logout}>Log out</button>
          </div>
        ) : (
          <div className="home-user">
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </header>

      <div className="setup-card">
        <h2>Pass-and-play setup</h2>
        <p className="setup-sub">Choose 2–4 players. Everyone shares this device and takes turns.</p>

        <div className="color-grid">
          {PLAYER_ORDER.map((color) => {
            const isOn = selected.includes(color);
            return (
              <button
                key={color}
                type="button"
                className={color-toggle \${isOn ? "color-toggle--on" : ""}}
                style={{ "--c": COLOR_HEX[color] }}
                onClick={() => toggleColor(color)}
              >
                <span className="color-toggle__dot" />
                {COLOR_LABEL[color]}
              </button>
            );
          })}
        </div>

        {selected.length > 0 && (
          <div className="name-inputs">
            {PLAYER_ORDER.filter((c) => selected.includes(c)).map((color) => (
              <label key={color} style={{ "--c": COLOR_HEX[color] }}>
                <span className="name-inputs__swatch" />
                <input
                  placeholder={COLOR_LABEL[color]}
                  value={names[color] || ""}
                  onChange={(e) => setNames((prev) => ({ ...prev, [color]: e.target.value }))}
                  maxLength={16}
                />
              </label>
            ))}
          </div>
        )}

        {error && <p className="auth-error">{error}</p>}

        <button className="primary-btn" onClick={startGame}>
          Start game
        </button>
      </div>
    </div>
  );
}`
  },
  {
    fileName: "frontend / pages / Login.js",
    code: `
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Welcome back</h1>
        <p className="auth-sub">Log in to save your match history.</p>
        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" disabled={busy}>
          {busy ? "Logging in…" : "Log in"}
        </button>
        <p className="auth-switch">
          No account? <Link to="/register">Register</Link>
        </p>
        <p className="auth-switch">
          <Link to="/">Continue as guest</Link>
        </p>
      </form>
    </div>
  );
}`
  },
  {
    fileName: "frontend / pages / Register.js",
    code: `
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await register(username, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Create your account</h1>
        <p className="auth-sub">Track your wins across devices.</p>
        <label>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={3}
            maxLength={20}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </label>
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" disabled={busy}>
          {busy ? "Creating…" : "Create account"}
        </button>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        <p className="auth-switch">
          <Link to="/">Continue as guest</Link>
        </p>
      </form>
    </div>
  );
}`
  },
  {
    fileName: "frontend / game / Dice.js",
    code: `
import { useEffect, useState } from "react";

const PIP_LAYOUTS = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
};

export default function Dice({ value, disabled, rolling, onRoll, colorHex }) {
  const [displayValue, setDisplayValue] = useState(value || 1);

  useEffect(() => {
    if (!rolling) {
      if (value) setDisplayValue(value);
      return;
    }
    const interval = setInterval(() => {
      setDisplayValue(1 + Math.floor(Math.random() * 6));
    }, 80);
    return () => clearInterval(interval);
  }, [rolling, value]);

  const pips = PIP_LAYOUTS[displayValue] || [];

  return (
    <button
      className="dice"
      onClick={onRoll}
      disabled={disabled}
      style={{ "--dice-accent": colorHex }}
      aria-label="Roll dice"
    >
      <svg viewBox="0 0 60 60" width="100%" height="100%">
        <rect x="2" y="2" width="56" height="56" rx="12" fill="#fff" stroke="var(--dice-accent)" strokeWidth="3" />
        {pips.map(([r, c], i) => (
          <circle key={i} cx={13 + c * 17} cy={13 + r * 17} r="4.2" fill="var(--dice-accent)" />
        ))}
      </svg>
    </button>
  );
}`
  },
  {
    fileName: "frontend / game / LudoBoard.js",
    code: `
import {
  GRID_SIZE,
  PATH_COORDS,
  HOME_COLUMN_COORDS,
  YARD_CORNER,
  SAFE_INDICES,
  START_INDEX,
  COLOR_HEX,
} from "./boardData";
import { getPawnGridPosition } from "./gameEngine";

const CELL = 40;
const BOARD_PX = GRID_SIZE * CELL;

function cellRect(row, col, fill, opts = {}) {
  return (
    <rect
      key={opts.key || \${row}-\${col}}
      x={col * CELL}
      y={row * CELL}
      width={CELL}
      height={CELL}
      fill={fill}
      stroke="var(--board-line)"
      strokeWidth="1"
    />
  );
}

function Yard({ color }) {
  const [row, col] = YARD_CORNER[color];
  const size = 6 * CELL;
  return (
    <g>
      <rect
        x={col * CELL}
        y={row * CELL}
        width={size}
        height={size}
        fill={COLOR_HEX[color]}
      />
      <rect
        x={col * CELL + CELL}
        y={row * CELL + CELL}
        width={4 * CELL}
        height={4 * CELL}
        rx={16}
        fill="var(--board-bg)"
      />
    </g>
  );
}

function HomeColumnCells({ color }) {
  return HOME_COLUMN_COORDS[color].map(([r, c], i) =>
    cellRect(r, c, COLOR_HEX[color], { key: \${color}-home-\${i} })
  );
}

function PathCells() {
  return PATH_COORDS.map(([r, c], i) => {
    let fill = "var(--board-bg)";
    const isStart = Object.values(START_INDEX).includes(i);
    if (isStart) {
      const startColor = Object.keys(START_INDEX).find((k) => START_INDEX[k] === i);
      fill = COLOR_HEX[startColor];
    }
    return (
      <g key={path-\${i}}>
        {cellRect(r, c, fill)}
        {SAFE_INDICES.has(i) && !isStart && (
          <text
            x={c * CELL + CELL / 2}
            y={r * CELL + CELL / 2 + 5}
            textAnchor="middle"
            fontSize="18"
            fill="var(--star-color)"
          >
            ★
          </text>
        )}
      </g>
    );
  });
}

function CenterTriangle() {
  const cx = 6 * CELL;
  const cy = 6 * CELL;
  const s = 3 * CELL;
  const mid = cx + s / 2;
  const midY = cy + s / 2;
  return (
    <g>
      <polygon points={\${cx},\${cy} \${mid},\${midY} \${cx},\${cy + s}} fill={COLOR_HEX.red} />
      <polygon points={\${cx},\${cy} \${mid},\${midY} \${cx + s},\${cy}} fill={COLOR_HEX.green} />
      <polygon points={\${cx + s},\${cy} \${mid},\${midY} \${cx + s},\${cy + s}} fill={COLOR_HEX.yellow} />
      <polygon points={\${cx},\${cy + s} \${mid},\${midY} \${cx + s},\${cy + s}} fill={COLOR_HEX.blue} />
    </g>
  );
}

function Pawn({ color, row, col, isActive, isSelectable, onClick, label }) {
  const cx = col * CELL + CELL / 2;
  const cy = row * CELL + CELL / 2;
  return (
    <g
      transform={translate(\${cx}, \${cy})}
      onClick={isSelectable ? onClick : undefined}
      style={{ cursor: isSelectable ? "pointer" : "default" }}
    >
      {isSelectable && (
        <circle r={CELL * 0.42} fill="none" stroke="var(--select-ring)" strokeWidth="3">
          <animate attributeName="r" values={\${CELL * 0.36};\${CELL * 0.46};\${CELL * 0.36}} dur="1.1s" repeatCount="indefinite" />
        </circle>
      )}
      <circle r={CELL * 0.3} fill={COLOR_HEX[color]} stroke="#fff" strokeWidth="2.5" />
      <circle r={CELL * 0.12} fill="#fff" opacity="0.85" />
    </g>
  );
}

export default function LudoBoard({ players, currentColor, validPawnIndices, onSelectPawn }) {
  return (
    <svg
      viewBox={0 0 \${BOARD_PX} \${BOARD_PX}}
      className="ludo-board"
      role="img"
      aria-label="Ludo board"
    >
      <rect x="0" y="0" width={BOARD_PX} height={BOARD_PX} fill="var(--board-bg)" />
      <Yard color="red" />
      <Yard color="green" />
      <Yard color="yellow" />
      <Yard color="blue" />
      <PathCells />
      <HomeColumnCells color="red" />
      <HomeColumnCells color="green" />
      <HomeColumnCells color="yellow" />
      <HomeColumnCells color="blue" />
      <CenterTriangle />
      <rect
        x={0}
        y={0}
        width={BOARD_PX}
        height={BOARD_PX}
        fill="none"
        stroke="var(--board-frame)"
        strokeWidth="6"
      />

      {players.map((player) =>
        player.pawns.map((pawn, pawnIndex) => {
          const [row, col] = getPawnGridPosition(player.color, pawn, pawnIndex);
          const isSelectable =
            player.color === currentColor && validPawnIndices.includes(pawnIndex);
          return (
            <Pawn
              key={\${player.color}-\${pawnIndex}}
              color={player.color}
              row={row}
              col={col}
              isSelectable={isSelectable}
              onClick={() => onSelectPawn(pawnIndex)}
            />
          );
        })
      )}
    </svg>
  );
}`
  },
  {
    fileName: "frontend / game / PlayerPanel.js",
    code: `
import { COLOR_HEX, COLOR_LABEL } from "./boardData";
import { FINISHED } from "./gameEngine";

export default function PlayerPanel({ players, currentColor }) {
  return (
    <div className="player-panel">
      {players.map((player) => {
        const homeCount = player.pawns.filter((p) => p.steps === FINISHED).length;
        const isTurn = player.color === currentColor && !player.finished;
        return (
          <div
            key={player.color}
            className={player-card \${isTurn ? "player-card--active" : ""} \${player.finished ? "player-card--done" : ""}}
            style={{ "--player-color": COLOR_HEX[player.color] }}
          >
            <span className="player-card__dot" />
            <div className="player-card__info">
              <span className="player-card__name">{player.name || COLOR_LABEL[player.color]}</span>
              <span className="player-card__meta">
                {player.finished ? Finished · Rank #\${player.rank} : \${homeCount}/4 home}
              </span>
            </div>
            {isTurn && <span className="player-card__badge">Turn</span>}
          </div>
        );
      })}
    </div>
  );
}`
  },
  {
    fileName: "frontend / game / boardData.js",
    code: `
// All coordinates are [row, col] on a 15x15 grid (0-indexed).
// This is the classic Ludo board layout with 4-fold rotational symmetry.

export const GRID_SIZE = 15;

// The 52-cell shared track, starting at Red's entry square (index 0)
// and proceeding clockwise.
export const PATH_COORDS = [
  [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
  [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6],
  [0, 7],
  [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8],
  [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14],
  [7, 14],
  [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [8, 9],
  [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8],
  [14, 7],
  [14, 6], [13, 6], [12, 6], [11, 6], [10, 6], [9, 6],
  [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0],
  [7, 0],
  [6, 0],
];

// Each color's start index into PATH_COORDS (offset by 13, a quarter of 52).
export const START_INDEX = {
  red: 0,
  green: 13,
  yellow: 26,
  blue: 39,
};

// Safe cells (stars + all start squares) - opponents can never be captured here.
export const SAFE_INDICES = new Set([0, 8, 13, 21, 26, 34, 39, 47]);

// Home column (final stretch) cells per color, index 0..5, leading to the center.
export const HOME_COLUMN_COORDS = {
  red: [[7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6]],
  green: [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]],
  yellow: [[7, 13], [7, 12], [7, 11], [7, 10], [7, 9], [7, 8]],
  blue: [[13, 7], [12, 7], [11, 7], [10, 7], [9, 7], [8, 7]],
};

export const CENTER_COORD = [7, 7];

// Corner (top-left cell) of each color's 6x6 yard block, used to lay out
// the 4 pawn "nests" inside it.
export const YARD_CORNER = {
  red: [0, 0],
  green: [0, 9],
  yellow: [9, 9],
  blue: [9, 0],
};

// Offsets (within a yard block) for each of the 4 pawn nest slots.
export const YARD_SLOT_OFFSETS = [
  [1.3, 1.3],
  [1.3, 3.7],
  [3.7, 1.3],
  [3.7, 3.7],
];

export const PLAYER_ORDER = ["red", "green", "yellow", "blue"];

export const COLOR_HEX = {
  red: "#e63946",
  green: "#2a9d8f",
  yellow: "#f4a300",
  blue: "#3a5ba0",
};

export const COLOR_LABEL = {
  red: "Red",
  green: "Green",
  yellow: "Yellow",
  blue: "Blue",
};`
  },
  {
    fileName: "frontend / game / gameEngine.js",
    code: `
  import {
  PATH_COORDS,
  START_INDEX,
  SAFE_INDICES,
  HOME_COLUMN_COORDS,
  CENTER_COORD,
  YARD_CORNER,
  YARD_SLOT_OFFSETS,
  PLAYER_ORDER,
} from "./boardData";

export const PAWNS_PER_PLAYER = 4;
export const TOTAL_STEPS_TO_FINISH = 58; // 51 common cells + 6 home column cells + 1 "arrived"
export const HOME_COLUMN_START = 52;
export const FINISHED = 58;

/** Creates a brand new game state for the given list of colors (2-4). */
export function createInitialState(colorList, names = {}) {
  const players = colorList.map((color) => ({
    color,
    name: names[color] || color[0].toUpperCase() + color.slice(1),
    pawns: Array.from({ length: PAWNS_PER_PLAYER }, () => ({ steps: 0 })),
    finished: false,
    rank: null,
  }));

  return {
    players,
    currentPlayerIndex: 0,
    diceValue: null,
    diceRolled: false,
    consecutiveSixes: 0,
    validPawnIndices: [],
    winners: [], // colors in finishing order
    gameOver: false,
    turnCount: 0,
    log: ["Game started. " + players[0].name + " goes first."],
  };
}

export function rollDice() {
  return 1 + Math.floor(Math.random() * 6);
}

function absolutePathIndex(color, steps) {
  // steps is 1..51 here
  return (START_INDEX[color] + steps - 1) % 52;
}

/** Returns indices (0-3) of pawns belonging to the current player that can legally move. */
export function getValidMoves(state, diceValue) {
  const player = state.players[state.currentPlayerIndex];
  const valid = [];
  player.pawns.forEach((pawn, idx) => {
    if (pawn.steps === 0) {
      if (diceValue === 6) valid.push(idx);
      return;
    }
    if (pawn.steps === FINISHED) return;
    const newSteps = pawn.steps + diceValue;
    if (newSteps <= FINISHED) valid.push(idx);
  });
  return valid;
}

/** Returns true if the given absolute path cell is a safe zone. */
export function isSafeCell(absIndex) {
  return SAFE_INDICES.has(absIndex);
}

/**
 * Applies a move for the current player's pawn at pawnIndex, given the last dice roll.
 * Returns a NEW state object (immutable update). Handles capturing and win detection.
 */
export function applyMove(state, pawnIndex, diceValue) {
  const players = state.players.map((p) => ({
    ...p,
    pawns: p.pawns.map((pw) => ({ ...pw })),
  }));
  const player = players[state.currentPlayerIndex];
  const pawn = player.pawns[pawnIndex];
  const log = [...state.log];

  const newSteps = pawn.steps === 0 ? 1 : pawn.steps + diceValue;
  pawn.steps = newSteps;

  let captured = false;

  if (newSteps >= 1 && newSteps <= 51) {
    const absIndex = absolutePathIndex(player.color, newSteps);
    if (!isSafeCell(absIndex)) {
      players.forEach((opponent) => {
        if (opponent.color === player.color) return;
        opponent.pawns.forEach((oppPawn) => {
          if (oppPawn.steps === 0 || oppPawn.steps > 51) return; // in yard or in home stretch = untouchable
          const oppAbs = absolutePathIndex(opponent.color, oppPawn.steps);
          if (oppAbs === absIndex) {
            oppPawn.steps = 0;
            captured = true;
          }
        });
      });
    }
  }

  if (newSteps === FINISHED) {
    log.push(\${player.name}'s pawn reached home!);
  } else if (captured) {
    log.push(\${player.name} captured an opponent's pawn!);
  } else {
    log.push(\${player.name} moved a pawn \${diceValue === undefined ? "" : diceValue + " steps"}..trim());
  }

  // Check if this player just finished all pawns
  const allHome = player.pawns.every((pw) => pw.steps === FINISHED);
  let winners = state.winners;
  if (allHome && !player.finished) {
    player.finished = true;
    winners = [...state.winners, player.color];
    player.rank = winners.length;
    log.push(\${player.name} finished all pawns! Rank #\${player.rank}.);
  }

  const activePlayers = players.filter((p) => !p.finished);
  const gameOver = activePlayers.length <= 1;
  if (gameOver && activePlayers.length === 1 && !winners.includes(activePlayers[0].color)) {
    activePlayers[0].finished = true;
    activePlayers[0].rank = winners.length + 1;
    winners = [...winners, activePlayers[0].color];
  }

  return {
    ...state,
    players,
    winners,
    gameOver,
    captured,
    justFinishedPawn: newSteps === FINISHED,
    log: log.slice(-40),
  };
}

/** Computes whose turn is next, skipping players who have already finished. */
export function getNextPlayerIndex(state) {
  const n = state.players.length;
  let idx = state.currentPlayerIndex;
  for (let i = 0; i < n; i++) {
    idx = (idx + 1) % n;
    if (!state.players[idx].finished) return idx;
  }
  return state.currentPlayerIndex;
}

/** Pixel-space (grid units, not px) position for a pawn, used by the board renderer. */
export function getPawnGridPosition(color, pawn, pawnIndex) {
  if (pawn.steps === 0) {
    const [cornerRow, cornerCol] = YARD_CORNER[color];
    const [offRow, offCol] = YARD_SLOT_OFFSETS[pawnIndex];
    return [cornerRow + offRow, cornerCol + offCol];
  }
  if (pawn.steps >= 1 && pawn.steps <= 51) {
    return PATH_COORDS[absolutePathIndex(color, pawn.steps)];
  }
  if (pawn.steps >= HOME_COLUMN_START && pawn.steps <= 57) {
    return HOME_COLUMN_COORDS[color][pawn.steps - HOME_COLUMN_START];
  }
  // Finished: stack near the center, slightly offset per pawn so they don't fully overlap.
  const [r, c] = CENTER_COORD;
  const dx = [-0.18, 0.18, -0.18, 0.18][pawnIndex % 4];
  const dy = [-0.18, -0.18, 0.18, 0.18][pawnIndex % 4];
  return [r + dy, c + dx];
}

export function colorTurnOrder(colorList) {
  return PLAYER_ORDER.filter((c) => colorList.includes(c));
}`
  },
  {
    fileName: "frontend / game / useLudoGame.js",
    code: `
import { useCallback, useReducer, useRef } from "react";
import {
  createInitialState,
  rollDice as rollDiceValue,
  getValidMoves,
  applyMove,
  getNextPlayerIndex,
} from "./gameEngine";

const MAX_CONSECUTIVE_SIXES = 3;

function reducer(state, action) {
  switch (action.type) {
    case "RESET":
      return createInitialState(action.colors, action.names);

    case "ROLL": {
      if (state.gameOver || state.diceRolled) return state;
      const diceValue = action.forcedValue ?? rollDiceValue();
      const consecutiveSixes = diceValue === 6 ? state.consecutiveSixes + 1 : 0;

      if (consecutiveSixes >= MAX_CONSECUTIVE_SIXES) {
        const nextIndex = getNextPlayerIndex(state);
        return {
          ...state,
          diceValue: null,
          diceRolled: false,
          validPawnIndices: [],
          consecutiveSixes: 0,
          log: [...state.log, \${state.players[state.currentPlayerIndex].name} rolled three 6s in a row — turn forfeited.].slice(-40),
          currentPlayerIndex: nextIndex,
          turnCount: state.turnCount + 1,
        };
      }

      const validPawnIndices = getValidMoves(state, diceValue);

      if (validPawnIndices.length === 0) {
        // No legal move: pass turn (unless it was a 6, which still passes here
        // since bringing a pawn out is the only 6-only action and none exist).
        const nextIndex = getNextPlayerIndex(state);
        return {
          ...state,
          diceValue,
          diceRolled: false,
          validPawnIndices: [],
          consecutiveSixes: diceValue === 6 ? consecutiveSixes : 0,
          currentPlayerIndex: diceValue === 6 ? state.currentPlayerIndex : nextIndex,
          turnCount: state.turnCount + 1,
          log: [...state.log, \${state.players[state.currentPlayerIndex].name} rolled \${diceValue} — no valid move.].slice(-40),
        };
      }

      return {
        ...state,
        diceValue,
        diceRolled: true,
        validPawnIndices,
        consecutiveSixes,
      };
    }

    case "MOVE": {
      if (!state.diceRolled || state.gameOver) return state;
      if (!state.validPawnIndices.includes(action.pawnIndex)) return state;

      const moved = applyMove(state, action.pawnIndex, state.diceValue);
      const extraTurn = state.diceValue === 6 && !moved.gameOver;

      const nextIndex = extraTurn ? moved.currentPlayerIndex : getNextPlayerIndex(moved);

      return {
        ...moved,
        diceValue: null,
        diceRolled: false,
        validPawnIndices: [],
        currentPlayerIndex: moved.gameOver ? moved.currentPlayerIndex : nextIndex,
        turnCount: moved.turnCount + 1,
      };
    }

    default:
      return state;
  }
}

export function useLudoGame(colors, names) {
  const initRef = useRef({ colors, names });
  const [state, dispatch] = useReducer(reducer, null, () =>
    createInitialState(initRef.current.colors, initRef.current.names)
  );

  const roll = useCallback((forcedValue) => dispatch({ type: "ROLL", forcedValue }), []);
  const move = useCallback((pawnIndex) => dispatch({ type: "MOVE", pawnIndex }), []);
  const reset = useCallback(
    (newColors, newNames) => dispatch({ type: "RESET", colors: newColors, names: newNames }),
    []
  );

  return { state, roll, move, reset };
}`
  },
  {
    fileName: "frontend / context / AuthContext.js",
    code: `
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("ludo_token");
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => localStorage.removeItem("ludo_token"))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (username, password) => {
    const res = await api.post("/auth/login", { username, password });
    localStorage.setItem("ludo_token", res.data.token);
    setUser(res.data.user);
    return res.data.user;
  }, []);

  const register = useCallback(async (username, password) => {
    const res = await api.post("/auth/register", { username, password });
    localStorage.setItem("ludo_token", res.data.token);
    setUser(res.data.user);
    return res.data.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("ludo_token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}`
  },
  {
    fileName: "frontend / api / axios.js",
    code: `
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ludo_token");
  if (token) config.headers.Authorization = Bearer \${token};
  return config;
});

export default api;`
  }
];

function CodeSlider3() {
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
        MERN Project -3  (Ludo Game)
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

export default CodeSlider3;