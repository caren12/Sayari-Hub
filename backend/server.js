import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

console.log("Server file is running...");

// 🌌 Home route
app.get("/", (req, res) => {
  res.json({ message: "Sayari Hub backend is working 🚀" });
});

// 🎮 Quiz route
app.get("/quiz", (req, res) => {
  const quizzes = [
    {
      question: "What planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter"],
      answer: "Mars"
    },
    {
      question: "What galaxy do we live in?",
      options: ["Andromeda", "Milky Way", "Whirlpool"],
      answer: "Milky Way"
    },
    {
      question: "What force keeps planets in orbit?",
      options: ["Gravity", "Magnetism", "Friction"],
      answer: "Gravity"
    }
  ];

  const today = new Date().getDate();
  const quiz = quizzes[today % quizzes.length];

  res.json(quiz);
});

app.listen(3000, () => {
  console.log("Server is now LIVE 🚀 on http://localhost:3000");
});