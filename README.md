# Physics AI Agentic Chat Bot

A full stack application that allows you to talk to iconic physicists.

- **Frontend:** Built with **React**, **TypeScript**, and **Vite** — lightweight, responsive, and simple.
- **Backend:** Built with **Python**, **LangGraph**, **FastAPI**, and **MongoDB**.
- **AI Capabilities:** Uses **RAG (Retrieval-Augmented Generation)**, context retrieval, and summarizer nodes to deliver historically inspired, intelligent responses.

---

## ✨ Features

- Chat with AI-powered personas of famous physicists (Einstein, Newton, Curie, and more).
- Retrieval-Augmented Generation for accurate, knowledge-backed answers.
- Summarizer nodes to keep conversations coherent and contextual.
- Modular architecture — easy to extend with new physicists or features.
- Production-ready with **Docker Compose** for deployment.

---

## 🚀 Getting Started

### Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/kuki1029/physicsAgents
cd physicsAgents

# 2. Build the docker image
docker compose build

# 3. Run docker containers
docker compose up
```

This will spin up all the required containers for the site to work.

> The dev server will usually start at `http://localhost:5173`.

---

## ⚙️ Configuration

Create a `.env` file in the `backend/` directory with the following variables:

```env
GROQ_API_KEY=your_groq_api_key_here
```

I used Groq as it was mostly free.
