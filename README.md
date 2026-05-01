📌 Overview

Smart Voting Companion is an AI-driven assistant designed to help users actually complete the voting process, not just understand it.

Unlike traditional election info apps, this system:

explains the voting process
plans when to vote
guides how to reach the polling booth
reduces real-world friction (time, travel, crowd, weather)

Features

Explains voting process step-by-step
Handles user queries interactively
Personalized responses using context (time, location, constraints)

Predicts best time window to vote
Avoids:
peak crowd hours
bad weather conditions

🧩 Tech Stack
  💻 Frontend
    Antigravity (Prompt-based UI)
  ⚙️ Backend
    Node.js / FastAPI (depending on your implementation)
  🤖 AI
    Vertex AI
    Gemini models for conversational intelligence
  🌍 Maps & Navigation
    Google Maps Platform
    Directions API
    Places API
  ☁️ Deployment
    Google Cloud
    Cloud Run

⚠️ Limitations
Crowd prediction is heuristic-based (not real-time data)
Weather integration can be further improved
Depends on API availability
