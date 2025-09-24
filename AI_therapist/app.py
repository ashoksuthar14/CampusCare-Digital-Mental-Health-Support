from flask import Flask, render_template, request, jsonify, session
from flask_session import Session
from dotenv import load_dotenv
import os
import logging

logging.basicConfig(level=logging.DEBUG)
load_dotenv()

from rag.config import settings
from rag.chain import build_chain
from rag.prompts import CRISIS_INSTRUCTIONS  # SYSTEM_PROMPT not used directly in app

# Flask setup
app = Flask(__name__, template_folder="templates", static_folder="static")
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Build chain once on startup
chain = build_chain()

def ensure_history():
    if "history" not in session:
        session["history"] = []

@app.route("/")
def index():
    ensure_history()
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    ensure_history()
    data = request.json or {}
    question = data.get("question", "").strip()
    if not question:
        return jsonify({"error": "Empty question"}), 400

    # Basic crisis keyword check
    crisis_keywords = ["suicide", "kill myself", "hurt myself", "end my life", "can't go on"]
    if any(k in question.lower() for k in crisis_keywords):
        return jsonify({
            "answer": "I’m really sorry you’re feeling this way. Please contact your local emergency services or a trusted person immediately.",
            "crisis": True
        }), 200

    chat_history = session.get("history", [])
    result = chain({"question": question, "chat_history": chat_history})

    answer = result.get("answer")
    source_docs = result.get("source_documents", [])

    # Short provenance info
    sources = []
    for d in source_docs:
        md = getattr(d, "metadata", {})
        sources.append({
            "text_snippet": d.page_content[:500],
            "metadata": md
        })

    # Save to session history
    chat_history.append((question, answer))
    session["history"] = chat_history

    return jsonify({"answer": answer, "sources": sources})

@app.route("/reset", methods=["POST"])
def reset():
    session.pop("history", None)
    return jsonify({"ok": True})

if __name__ == "__main__":
    # Enable debug & accessible from network
    app.run(host="0.0.0.0", port=5000, debug=True)
