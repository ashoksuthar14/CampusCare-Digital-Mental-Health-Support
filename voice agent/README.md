# AI Therapist Chatbot (Flask + Gemini)

Simple student-support chatbot using Flask and Google's Gemini (gemini-2.5-flash).

## Setup

1) Create and activate venv (Windows PowerShell):
```
python -m venv venv
./venv/Scripts/Activate.ps1
```

2) Install dependencies:
```
pip install -r requirements.txt
```

3) Configure environment:
- Create a `.env` file in the project root with:
```
GEMINI_API_KEY=YOUR_KEY
GEMINI_MODEL=gemini-2.5-flash
FLASK_ENV=development
SECRET_KEY=dev-secret-key
```

4) Run the app:
```
python run.py
```
Visit http://127.0.0.1:5000

## Notes
- Not a replacement for professional care. If imminent risk: direct to local emergency services.
- Session chat history only; no database.

## Deploy
Set `WAITRESS=1`, `HOST=0.0.0.0`, and `PORT=8080` to run with Waitress:
```
$env:WAITRESS="1"; $env:HOST="0.0.0.0"; $env:PORT="8080"; python run.py
```

## Supabase Integration

Set the following environment variables in `.env`:
```
SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-or-service-role-key
```

Create a table `chat_summaries`:
```
create table if not exists public.chat_summaries (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  summary text not null,
  diagnoses text,
  created_at timestamptz not null default now()
);
```

API endpoint to save a record:
```
POST /api/summary
{ "student_name": "Alice", "summary": "...", "diagnoses": "..." }
```


