console.log("🚀 STARTING SERVER...");

// =========================
// IMPORTS
// =========================
import express from "express";
import cors from "cors";
import fs from "fs";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

console.log("✅ Imports loaded");

// =========================
// APP SETUP
// =========================
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

console.log("✅ App created");

// =========================
// FILE STORAGE
// =========================
const USERS_FILE = "./users.json";

// Ensure users.json exists
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

// =========================
// NASA API ROUTE
// =========================
app.get("/apod", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "NASA API failed" });
  }
});

// =========================
// HOME TEST ROUTE
// =========================
app.get("/", (req, res) => {
  res.json({ message: "Sayari Hub backend is working 🚀" });
});

// =========================
// SIGNUP ROUTE
// =========================
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  let users = JSON.parse(fs.readFileSync(USERS_FILE));

  const exists = users.find(u => u.email === email);

  if (exists) {
    return res.json({
      success: false,
      message: "User already exists"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    username,
    email,
    password: hashedPassword
  };

  users.push(newUser);

  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({
    success: true,
    message: "Account created 🚀"
  });
});

// =========================
// LOGIN ROUTE
// =========================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let users = JSON.parse(fs.readFileSync(USERS_FILE));

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.json({
      success: false,
      message: "User not found"
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.json({
      success: false,
      message: "Wrong password"
    });
  }

  res.json({
    success: true,
    message: "Login successful 🚀",
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  });
});

// =========================
// QUIZ ROUTE (10 QUESTIONS)
// =========================
app.get("/quiz", (req, res) => {
  res.json([
    {
      question: "What galaxy do we live in?",
      options: ["Andromeda", "Milky Way", "Whirlpool"],
      answer: "Milky Way"
    },
    {
      question: "What planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter"],
      answer: "Mars"
    },
    {
      question: "What force keeps planets in orbit?",
      options: ["Gravity", "Magnetism", "Friction"],
      answer: "Gravity"
    },
    {
      question: "Which planet has rings?",
      options: ["Saturn", "Earth", "Mars"],
      answer: "Saturn"
    },
    {
      question: "What is the closest star to Earth?",
      options: ["Sun", "Sirius", "Alpha Centauri"],
      answer: "Sun"
    },
    {
      question: "Which planet is the largest?",
      options: ["Jupiter", "Mars", "Earth"],
      answer: "Jupiter"
    },
    {
      question: "What is a shooting star?",
      options: ["Meteor", "Comet", "Asteroid"],
      answer: "Meteor"
    },
    {
      question: "Which planet is hottest?",
      options: ["Venus", "Mercury", "Mars"],
      answer: "Venus"
    },
    {
      question: "What is the Milky Way?",
      options: ["Galaxy", "Star", "Planet"],
      answer: "Galaxy"
    },
    {
      question: "How many planets are in our solar system?",
      options: ["8", "9", "7"],
      answer: "8"
    }
  ]);
});

// =========================
// START SERVER
// =========================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});