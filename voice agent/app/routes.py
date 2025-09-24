from flask import Blueprint, render_template, request, jsonify, session
from .gemini_client import generate_therapist_reply, summarize_conversation
from .supabase_client import get_supabase
import os
import requests
from uuid import uuid4
from datetime import datetime, timezone


bp = Blueprint("routes", __name__)


@bp.route("/")
def index():
    # Initialize chat history in session
    if "chat_history" not in session:
        session["chat_history"] = []
    if "student_name" not in session:
        session["student_name"] = None
    return render_template("index.html")


@bp.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    user_message = (data.get("message") or "").strip()
    if not user_message:
        return jsonify({"error": "Message is required."}), 400

    # Restore conversation history
    conversation = session.get("chat_history", [])

    # Append user message
    conversation.append({"role": "user", "content": user_message})

    # Generate assistant reply using Gemini
    try:
        assistant_reply = generate_therapist_reply(conversation)
    except Exception as exc:  # Surface concise error to client
        return jsonify({"error": f"Failed to contact AI: {exc}"}), 500

    # Append assistant message and persist
    conversation.append({"role": "assistant", "content": assistant_reply})
    session["chat_history"] = conversation

    # Crisis detection and n8n webhook trigger (idempotence-bypass via unique token)
    try:
        text = f"{user_message} {assistant_reply}".lower()
        crisis_terms = [
            "suicide", "kill myself", "end my life", "self-harm", "self harm",
            "depression", "depressed", "i want to die", "i don't want to live",
        ]
        if any(term in text for term in crisis_terms):
            base_url = os.getenv("N8N_WEBHOOK_URL", "https://ashuminajsuthar.app.n8n.cloud/webhook/e7ec5f84-2b1d-4ba8-b782-7b2aa6502dae")
            token = str(uuid4())
            # Add a cache-buster so n8n treats each as a fresh invocation
            webhook_url = f"{base_url}?t={token}"
            payload = {
                "student_name": session.get("student_name") or "Unknown",
                "message": user_message,
                "assistant_reply": assistant_reply,
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "event_id": token,
            }
            # Fire and forget with small timeout; include headers to avoid middleware rejections
            try:
                r = requests.post(
                    webhook_url,
                    json=payload,
                    timeout=8,
                    headers={"User-Agent": "ai-therapist-bot/1.0", "Cache-Control": "no-cache"},
                )
                # If n8n returns booking details, stash them for next UI response
                if r.ok:
                    try:
                        booking = r.json()
                        # Expecting keys like time, counsellor, room from n8n
                        session["latest_booking"] = {
                            "time": booking.get("time") or datetime.now(timezone.utc).isoformat(),
                            "counsellor": booking.get("counsellor") or "Counsellor team",
                            "room": booking.get("room") or "To be assigned",
                        }
                    except Exception:
                        # Fallback generic booking info even if body isn't JSON
                        session["latest_booking"] = {
                            "time": datetime.now(timezone.utc).isoformat(),
                            "counsellor": "Counsellor team",
                            "room": "To be assigned",
                        }
            except Exception:
                # Network error, still show generic confirmation
                session["latest_booking"] = {
                    "time": datetime.now(timezone.utc).isoformat(),
                    "counsellor": "Counsellor team",
                    "room": "To be assigned",
                }
    except Exception:
        pass

    # Return booking details if present (for modal)
    booking = session.pop("latest_booking", None)
    return jsonify({"reply": assistant_reply, "booking": booking})


@bp.route("/api/reset", methods=["POST"])
def reset():
    session.pop("chat_history", None)
    session.pop("student_name", None)
    return jsonify({"ok": True})


@bp.route("/api/name", methods=["POST"])
def set_name():
    data = request.get_json(silent=True) or {}
    name = (data.get("student_name") or "").strip()
    if not name:
        return jsonify({"error": "student_name is required."}), 400
    session["student_name"] = name
    return jsonify({"ok": True})


@bp.route("/api/end", methods=["POST"])
def end_chat():
    """End chat: summarize with Gemini and save to Supabase."""
    history = session.get("chat_history", [])
    student_name = session.get("student_name") or "Unknown"

    if not history:
        return jsonify({"error": "No conversation to summarize."}), 400

    try:
        result = summarize_conversation(history)
        summary = (result.get("summary", "") or "").strip()
        diagnoses = (result.get("diagnoses", "") or "").strip()
    except Exception as exc:
        return jsonify({"error": f"Failed to summarize: {exc}"}), 500

    sb = get_supabase()
    if sb is None:
        return jsonify({"error": "Supabase is not configured on the server."}), 500

    try:
        payload = {
            "student_name": student_name,
            "summary": summary,
            "diagnoses": diagnoses,
        }
        # Also populate common alternative column names if they exist in the table
        # (helps if the table was created with a different name)
        payload["diagnosis"] = diagnoses
        payload["diagnosis_labels"] = diagnoses
        sb.table("chat_summaries").insert(payload).execute()
        # Reset after saving
        session.pop("chat_history", None)
        session.pop("student_name", None)
        return jsonify({"ok": True, "summary": summary, "diagnoses": diagnoses})
    except Exception as exc:
        return jsonify({"error": f"Failed to save: {exc}"}), 500


@bp.route("/api/summary", methods=["POST"])
def save_summary():
    """Persist student summary and diagnoses to Supabase without chat history.

    Expected JSON body: {"student_name": str, "summary": str, "diagnoses": str}
    """
    data = request.get_json(silent=True) or {}
    student_name = (data.get("student_name") or "").strip()
    summary = (data.get("summary") or "").strip()
    diagnoses = (data.get("diagnoses") or "").strip()

    if not student_name or not summary:
        return jsonify({"error": "student_name and summary are required."}), 400

    sb = get_supabase()
    if sb is None:
        return jsonify({"error": "Supabase is not configured on the server."}), 500

    try:
        # Table must exist in Supabase: chat_summaries
        # Columns: id (uuid default), student_name (text), summary (text), diagnoses (text), created_at (timestamptz default now())
        payload = {
            "student_name": student_name,
            "summary": summary,
            "diagnoses": diagnoses,
        }
        sb.table("chat_summaries").insert(payload).execute()
        return jsonify({"ok": True})
    except Exception as exc:
        return jsonify({"error": f"Failed to save summary: {exc}"}), 500


