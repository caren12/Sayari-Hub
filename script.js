console.log("Sayari Hub Running 🚀");

// 🌌 NASA API
const NASA_API_KEY = "DEMO_KEY"; // replace with real key later if needed

// SECTION CONTROLLER
function showSection(sectionId) {
  document.querySelectorAll("main section").forEach(sec => {
    sec.style.display = "none";
  });

  const target = document.getElementById(sectionId);
  if (target) target.style.display = "block";
}

// NASA APOD (FIXED - NO LOCALHOST)
async function loadHomeAPOD() {
  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
    );

    if (!res.ok) throw new Error("NASA API failed");

    const data = await res.json();

    const img = document.getElementById("homeApodImage");
    const text = document.getElementById("homeApodExplanation");

    if (!img || !text) return;

    text.textContent = data.explanation;

    if (data.media_type === "image") {
      img.src = data.url;
      img.style.display = "block";
    } else {
      img.style.display = "none";
      text.innerHTML += `<br><a href="${data.url}" target="_blank">Watch Media</a>`;
    }

  } catch (err) {
    console.error("NASA Error:", err);
  }
}

// FACTS SYSTEM
const spaceFacts = [
  "A day on Venus is longer than a year.",
  "Neutron stars spin 600 times per second.",
  "There are more stars than grains of sand.",
  "Saturn could float in water.",
  "Light takes 8 minutes from Sun to Earth.",
  "Jupiter has the shortest day.",
  "The universe is expanding."
];

let lastFactIndex = -1;

function getRandomFact() {
  let index;
  do {
    index = Math.floor(Math.random() * spaceFacts.length);
  } while (index === lastFactIndex);

  lastFactIndex = index;
  return spaceFacts[index];
}

function loadSpaceFact() {
  const text = document.getElementById("factText");
  const card = document.getElementById("factCard");

  if (!text || !card) return;

  card.style.opacity = 0;

  setTimeout(() => {
    text.textContent = getRandomFact();
    card.style.opacity = 1;
  }, 300);
}

// GALLERY
function loadGallery() {
  const container = document.getElementById("galleryGrid");
  if (!container) return;

  container.innerHTML = "";

  const images = [
    { url: "https://images-assets.nasa.gov/image/PIA12235/PIA12235~orig.jpg", title: "Galaxy View" },
    { url: "https://images-assets.nasa.gov/image/PIA14293/PIA14293~orig.jpg", title: "Nebula" },
    { url: "https://images-assets.nasa.gov/image/PIA12831/PIA12831~orig.jpg", title: "Deep Space" },
    { url: "https://images-assets.nasa.gov/image/PIA23623/PIA23623~orig.jpg", title: "Planet Surface" },
    { url: "https://images-assets.nasa.gov/image/PIA01141/PIA01141~orig.jpg", title: "Ringed Planet" },
    { url: "https://images-assets.nasa.gov/image/PIA04921/PIA04921~orig.jpg", title: "Mars Landscape" },
    { url: "https://images-assets.nasa.gov/image/PIA17171/PIA17171~orig.jpg", title: "Earth from Space" }
  ];

  images.forEach(img => {
    const div = document.createElement("div");

    div.className = "bg-black/40 border border-gray-700 rounded-xl overflow-hidden";

    div.innerHTML = `
      <img src="${img.url}" class="w-full h-48 object-cover"/>
      <div class="p-2 text-center">${img.title}</div>
    `;

    container.appendChild(div);
  });
}

// BUDDIES SYSTEM (FIXED - MISSING FUNCTION ADDED)
function addBuddy() {
  const name = document.getElementById("buddyName").value.trim();
  const interest = document.getElementById("buddyInterest").value.trim();

  if (!name || !interest) {
    alert("Please fill both fields");
    return;
  }

  const buddies = JSON.parse(localStorage.getItem("buddies")) || [];

  buddies.push({ name, interest });

  localStorage.setItem("buddies", JSON.stringify(buddies));

  document.getElementById("buddyName").value = "";
  document.getElementById("buddyInterest").value = "";

  findBuddies();
}

// DISPLAY BUDDIES
function findBuddies() {
  const container = document.getElementById("buddiesList");
  if (!container) return;

  const buddies = JSON.parse(localStorage.getItem("buddies")) || [];

  container.innerHTML = "";

  if (buddies.length === 0) {
    container.innerHTML = "<p>No buddies yet</p>";
    return;
  }

  buddies.forEach(b => {
    const div = document.createElement("div");
    div.className = "p-2 border border-gray-600 rounded mt-2";

    div.innerHTML = `
      <p>👤 ${b.name}</p>
      <p>🌌 ${b.interest}</p>
    `;

    container.appendChild(div);
  });
}

// AUTH SYSTEM
function signup() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !email || !password) {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem("userData", JSON.stringify({
    username,
    email,
    password
  }));

  alert("Signup successful 🚀 Now login");
}

function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const user = JSON.parse(localStorage.getItem("userData"));

  if (!user) {
    alert("No account found. Please sign up first.");
    return;
  }

  if (email === user.email && password === user.password) {
    localStorage.setItem("loggedInUser", JSON.stringify({
      username: user.username,
      email: user.email
    }));

    alert(`Welcome ${user.username} 🚀`);
    checkAuthState();
  } else {
    alert("Invalid login ❌");
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  alert("Logged out 👋");
  checkAuthState();
}

// QUIZ SYSTEM (UNCHANGED BUT WORKING)
let quizData = [
  { question: "What is the largest planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Jupiter" },
  { question: "What galaxy do we live in?", options: ["Andromeda", "Milky Way", "Whirlpool", "Sombrero"], answer: "Milky Way" },
  { question: "What is the Sun?", options: ["Planet", "Star", "Moon", "Comet"], answer: "Star" },
  { question: "Which planet is red?", options: ["Earth", "Mars", "Venus", "Saturn"], answer: "Mars" },
  { question: "How many planets?", options: ["7", "8", "9", "10"], answer: "8" }
];

let currentIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

function loadQuiz() {
  currentIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const q = quizData[currentIndex];
  if (!q) return;

  clearInterval(timer);

  timeLeft = 10;
  document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);

  document.getElementById("question").textContent = q.question;
  document.getElementById("difficulty").textContent =
    `Question ${currentIndex + 1} of ${quizData.length}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  document.getElementById("result").textContent = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");

    btn.className = "bg-gray-800 hover:bg-gray-700 p-3 rounded-lg border border-gray-600";
    btn.textContent = option;

    btn.onclick = () => {
      clearInterval(timer);

      if (option === q.answer) {
        score++;
        document.getElementById("result").textContent = "Correct 🚀";
      } else {
        document.getElementById("result").textContent = "Wrong ❌";
      }

      setTimeout(nextQuestion, 1000);
    };

    optionsDiv.appendChild(btn);
  });
}

function nextQuestion() {
  currentIndex++;

  if (currentIndex < quizData.length) {
    showQuestion();
  } else {
    document.getElementById("question").textContent = "Quiz Completed 🎉";
    document.getElementById("options").innerHTML = "";
    document.getElementById("timer").textContent = "";

    document.getElementById("difficulty").textContent =
      `Score: ${score}/${quizData.length}`;
  }
}

// INIT
window.addEventListener("DOMContentLoaded", () => {
  showSection("homeSection");
  loadHomeAPOD();

  document.getElementById("homeBtn")?.addEventListener("click", () => {
    showSection("homeSection");
    loadHomeAPOD();
  });

  document.getElementById("galleryBtn")?.addEventListener("click", () => {
    showSection("gallerySection");
    loadGallery();
  });

  document.getElementById("factsBtn")?.addEventListener("click", () => {
    showSection("factsSection");
    loadSpaceFact();
  });

  document.getElementById("nextFactBtn")?.addEventListener("click", loadSpaceFact);

  document.getElementById("buddies")?.addEventListener("click", () => {
    showSection("buddiesSection");
    findBuddies();
  });

  document.getElementById("startQuizBtn")?.addEventListener("click", () => {
    showSection("quizSection");
    loadQuiz();
  });
});