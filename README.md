# Sayari Hub

Sayari Hub is an interactive space-themed web application that allows users to explore astronomy content, learn facts, take quizzes, and connect with other learners. The platform is designed to make learning about space engaging and accessible.

---

## Features

### NASA Image of the Day

* Fetches and displays the latest image from NASA’s Astronomy Picture of the Day (APOD) API
* Provides detailed explanations for each image
* Supports both image and video content

### Space Gallery

* Collection of curated space images
* Responsive grid layout for a smooth browsing experience

### Space Facts

* Displays random astronomy facts
* Includes simple transitions for better user experience

### Quiz System

* Multiple-choice quiz on space topics
* Timer-based questions
* Score calculation with percentage results
* Best score stored using local storage

### Learning Buddies

* Users can add and view other learners with shared interests
* Data stored locally using browser storage

### Authentication System

* Basic signup and login functionality
* User session stored in local storage
* Interface updates based on authentication state

---

## Technologies Used

* HTML5 – Structure
* Tailwind CSS – Styling and layout
* JavaScript (Vanilla JS) – Application logic
* Node.js / Express – Backend API
* NASA APOD API – External data source

---

## Project Structure

```id="y5v93k"
Sayari-Hub/
│
├── index.html        # Main HTML file
├── script.js         # Frontend logic
├── server.js         # Backend server (NASA API integration)
├── .env              # Environment variables
└── README.md         # Project documentation
```

---

## Setup Instructions

### 1. Clone the repository

```id="u4c6r8"
git clone https://github.com/your-username/sayari-hub.git
cd sayari-hub
```

### 2. Install dependencies

```id="7ayc37"
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```id="yhm9o2"
NASA_API_KEY=your_nasa_api_key_here
```

### 4. Start the server

```id="1a9c2p"
npm start
```

### 5. Run the application

Open `index.html` in your browser or use a live server extension.

---

## API Integration

The application uses the NASA Astronomy Picture of the Day (APOD) API:

* Endpoint: https://api.nasa.gov/planetary/apod
* Requires an API key stored in the `.env` file

---

## Future Improvements

* Add a database for persistent storage
* Implement real-time communication for users
* Expand quiz content and difficulty levels
* Improve authentication with backend validation
* Deploy the application

---

## Author

Caren Chemjor
Software Engineering Student with a background in Astronomy and Astrophysics

---

## License

This project is intended for educational and personal use.
