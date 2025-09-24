import os
from functools import lru_cache
from typing import Optional

from supabase import create_client, Client
import psycopg

# Optional hardcoded fallbacks (fill these with your actual values if you want to bypass .env)
HARDCODED_SUPABASE_URL = "https://daiuefevbtkthizqykez.supabase.co"
HARDCODED_SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhaXVlZmV2YnRrdGhpenF5a2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1Njg1ODIsImV4cCI6MjA3NDE0NDU4Mn0.S8K7oRe2aTAa9ci0BlBZ26GOAn0O7WCFFwdl5o8gi-Y"



@lru_cache(maxsize=1)
def get_supabase() -> Optional[Client]:
    """Returns a cached Supabase client if env vars are present, else None."""
    url = os.getenv("SUPABASE_URL") or HARDCODED_SUPABASE_URL
    key = (
        os.getenv("SUPABASE_ANON_KEY")
        or os.getenv("SUPABASE_SERVICE_ROLE_KEY")
        or HARDCODED_SUPABASE_KEY
    )
    if not url or not key:
        return None
    return create_client(url, key)


def ensure_table_exists() -> None:
    """Create chat_summaries table if SUPABASE_DB_URL is provided.

    This uses a direct Postgres connection (service role recommended).
    """
    db_url = os.getenv("SUPABASE_DB_URL")
    if not db_url:
        return
    ddl = (
        "create table if not exists public.chat_summaries (\n"
        "  id uuid primary key default gen_random_uuid(),\n"
        "  student_name text not null,\n"
        "  summary text not null,\n"
        "  diagnoses text,\n"
        "  created_at timestamptz not null default now()\n"
        ");"
    )
    with psycopg.connect(db_url, autocommit=True) as conn:
        with conn.cursor() as cur:
            cur.execute("create extension if not exists pgcrypto;")
            cur.execute(ddl)


