console.log("Sayari Hub JS is running 🚀");

async function loadQuiz() {
  try {
    const res = await fetch("http://localhost:3000/quiz");

    // 🛡️ check if response is OK
    if (!res.ok) {
      throw new Error("Failed to fetch quiz");
    }

    const data = await res.json();
    console.log("Quiz data:", data);

    // 🧠 Question
    const questionEl = document.getElementById("question");
    if (questionEl) {
      questionEl.textContent = data.question || "No question available";
    }

    // 🌌 Difficulty (SAFE fallback)
    const difficultyEl = document.getElementById("difficulty");
    if (difficultyEl) {
      difficultyEl.textContent = `Difficulty: ${data.difficulty || "easy"}`;
    }

    // 🎯 Options container
    const optionsDiv = document.getElementById("options");
    if (!optionsDiv) return;

    optionsDiv.innerHTML = "";

    // 🧹 Reset result
    const resultEl = document.getElementById("result");
    if (resultEl) {
      resultEl.textContent = "";
    }

    // 🔘 Create buttons
    (data.options || []).forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;

      btn.onclick = () => {
        if (option === data.answer) {
          resultEl.textContent = "Correct 🚀";
        } else {
          resultEl.textContent = "Wrong ❌";
        }
      };

      optionsDiv.appendChild(btn);
    });

  } catch (error) {
    console.error("Error loading quiz:", error);

    const resultEl = document.getElementById("result");
    if (resultEl) {
      resultEl.textContent = "Failed to load quiz ❌";
    }
  }
}

// 🚀 Load quiz when page opens
loadQuiz();