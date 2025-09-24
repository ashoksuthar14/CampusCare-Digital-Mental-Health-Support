import os
from typing import List, Dict

import google.generativeai as genai
from google.api_core import exceptions as google_exceptions


SYSTEM_PROMPT = (
   ''' You are a supportive AI therapist and trusted friend for students. 
Speak in a warm, natural, human-like way, like a close friend who listens without judgment. 
Keep your answers short (1 sentence), clear, and conversational. 
Always show empathy first: acknowledge their feelings, validate their experience, 
and respond with kindness. 

Your style:
- Listen actively and ask gentle follow-up questions. 
- Offer simple, practical tips for stress, anxiety, focus, relationships, self-confidence, and everyday challenges. 
- Encourage healthy habits (sleep, study balance, self-care, talking to trusted people).
- Keep tone calm, caring, and uplifting. 
- Never sound robotic or overly formal.

Safety:
- If someone mentions self-harm, abuse, or crisis, respond gently with care, 
  encourage reaching out to a trusted adult or professional, 
  and share helpful resources. 
- Do not give medical diagnoses or prescriptions. 

Goal: Be a steady, understanding companion that helps students feel heard, 
less alone, and gently guided toward healthy next steps.'''

)

# Fallback key provided by user; used only if environment variable is missing.
DEFAULT_API_KEY = "AIzaSyBQ0v1aNPUqE1fStCWA3XM0894W8BqBNms"


def _get_model_name() -> str:
    # Default to gemini-2.5-flash as requested
    return os.getenv("GEMINI_MODEL", "gemini-2.5-flash")


def _ensure_client_configured() -> None:
    api_key = os.getenv("GEMINI_API_KEY") or DEFAULT_API_KEY
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not set in environment.")
    genai.configure(api_key=api_key)


def _build_prompt_from_history(history: List[Dict[str, str]]) -> str:
    # Convert simple role/content pairs into a single prompt string
    lines: List[str] = [f"System: {SYSTEM_PROMPT}"]
    for msg in history:
        role = msg.get("role", "user")
        content = msg.get("content", "")
        if not content:
            continue
        prefix = "User" if role == "user" else "Assistant"
        lines.append(f"{prefix}: {content}")
    lines.append("Assistant:")
    return "\n".join(lines)


def generate_therapist_reply(history: List[Dict[str, str]]) -> str:
    """Generate a reply from the AI therapist given conversation history."""
    _ensure_client_configured()
    primary = _get_model_name()
    fallbacks = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-8b",
        "gemini-2.0-flash-exp",
    ]

    prompt = _build_prompt_from_history(history)

    last_error: Exception | None = None
    for model_name in [primary, *fallbacks]:
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content(prompt)
            text = (getattr(response, "text", "") or "").strip()
            if text:
                return text
        except (google_exceptions.GoogleAPIError, Exception) as exc:  # broad fallback
            last_error = exc
            continue

    if last_error:
        raise RuntimeError(str(last_error))

    return "I'm here with you. Could you share a bit more about what's going on?"


def summarize_conversation(history: List[Dict[str, str]]) -> Dict[str, str]:
    """Return a concise summary and tentative non-clinical diagnoses labels.

    Output keys: {"summary": str, "diagnoses": str}
    """
    _ensure_client_configured()
    model_name = _get_model_name()

    prompt = (
        _build_prompt_from_history(history)
        + "\n\nAssistant: Please provide two sections in JSON with keys 'summary' and 'diagnoses'. "
          "Summarize in 3-6 sentences; be empathetic and practical. For 'diagnoses', do NOT diagnose; "
          "instead list 1-3 tentative labels like 'academic stress', 'social anxiety indicators', 'time management challenges' based on conversation. "
          "Return ONLY valid JSON."
    )

    model = genai.GenerativeModel(model_name)
    response = model.generate_content(prompt)
    text = (getattr(response, "text", "") or "").strip()
    import json, re

    # Strip common code fences if present
    if text.startswith("```"):
        text = re.sub(r"^```[a-zA-Z]*\n|\n```$", "", text).strip()

    try:
        data = json.loads(text)
        summary_val = data.get("summary")
        diagnoses_val = data.get("diagnoses")

        # Normalize to strings
        if isinstance(summary_val, (dict, list)):
            summary = json.dumps(summary_val, ensure_ascii=False)
        else:
            summary = (summary_val or "").strip()

        if isinstance(diagnoses_val, list):
            diagnoses = ", ".join(str(x) for x in diagnoses_val if str(x).strip())
        elif isinstance(diagnoses_val, dict):
            diagnoses = ", ".join(f"{k}: {v}" for k, v in diagnoses_val.items())
        else:
            diagnoses = (diagnoses_val or "").strip()

        if not summary:
            summary = "Conversation summary unavailable."

        # If diagnoses still empty, run a second targeted extraction
        if not diagnoses:
            diag_prompt = (
                _build_prompt_from_history(history)
                + "\n\nAssistant: Based on the conversation, list 1-3 tentative non-clinical labels "
                  "(e.g., 'academic stress', 'time management challenges', 'low mood indicators'). "
                  "Return ONLY a comma-separated list, no extra words."
            )
            diag_resp = model.generate_content(diag_prompt)
            diag_text = (getattr(diag_resp, "text", "") or "").strip()
            # Remove possible wrappers
            diag_text = re.sub(r"^```[a-zA-Z]*\n|\n```$", "", diag_text).strip()
            diagnoses = ", ".join([s.strip() for s in diag_text.split(",") if s.strip()])

        return {"summary": summary, "diagnoses": diagnoses}
    except Exception:
        # Fallback plain text
        return {
            "summary": text or "Conversation summary unavailable.",
            "diagnoses": "",
        }


