💼 AI Interview Prep
AI Interview Prep is a MERN stack application that helps users prepare for job interviews by creating custom sessions for a specific technology or role. Each session provides LLM-generated questions, along with their answers and detailed explanations, enabling users to learn, self-evaluate, and grow confidently.

✨ Key Features
🎯 Create sessions based on selected technology or role (e.g., React, Node.js, Data Structures)

🤖 AI-generated interview questions, along with ideal answers and explanations

🧠 Learn the "why" behind every answer with clear reasoning

📚 Multiple questions per session, mimicking real interview rounds

📝 Text-only interface — optimized for focus and learning

⚡ Responsive, clean UI with smooth transitions

🧱 Tech Stack (MERN)
Layer	Tech Used
Frontend	React.js, Tailwind CSS, Zustand
Backend	Node.js, Express.js
Database	MongoDB (via Mongoose)
AI Integration	Gemini / OpenAI LLM APIs
Hosting	Vercel / Render / Netlify

📁 Project Structure
bash
Copy
Edit
AI-Interview-Prep/
├── backend/                     # Express.js server with LLM integration
│   ├── routes/                  # API routes (e.g., /session, /questions)
│   ├── controllers/             # Logic to handle requests
│   └── services/aiService.js    # LLM communication logic
├── frontend/ai-interview-prep/  # React client
│   ├── components/              # Reusable UI elements
│   ├── pages/                   # Interview session UI
│   └── services/                # API calls to backend
└── README.md
🚀 Getting Started
🔧 Prerequisites
Node.js and npm

MongoDB URI (e.g. Atlas)

Gemini or OpenAI API key

📦 Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_connection_string
AI_API_KEY=your_gemini_or_openai_key
Start the backend server:

bash
Copy
Edit
npm run dev
🌐 Frontend Setup
bash
Copy
Edit
cd ../frontend/ai-interview-prep
npm install
npm run dev
🧪 How It Works
User selects a technology/topic to create a session.

Backend generates questions (and corresponding answers + explanations) via LLM.

Frontend displays a structured Q&A format.

Users learn by reading model answers and understanding the reasoning.

📸 Example Use Case
“I want to prepare for a React.js interview. I create a session → the app gives me 5 questions → for each, I get the ideal answer + explanation.”

🛠️ Possible Enhancements
Add user authentication to track saved sessions

Enable custom question count and difficulty level

Show previous performance analytics

Add bookmarking and notes per question

🤝 Contributing
Fork the repository

Create a new branch: git checkout -b feature/your-feature-name

Commit changes: git commit -m "Add your feature"

Push to your branch: git push origin feature/your-feature-name

Create a Pull Request

