import os
from pathlib import Path
from flask import Flask
from dotenv import load_dotenv, find_dotenv


def create_app() -> Flask:
    """Application factory for the AI Therapist chatbot."""
    # Load environment variables from project root .env explicitly
    base_dir = Path(__file__).resolve().parent.parent
    env_path = base_dir / ".env"
    load_dotenv(dotenv_path=str(env_path), override=False)

    # Point Flask to project-level templates and static
    app = Flask(
        __name__,
        template_folder=str(base_dir / "templates"),
        static_folder=str(base_dir / "static"),
    )
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-secret-key")

    # Register blueprints
    from .routes import bp as routes_bp

    app.register_blueprint(routes_bp)

    # Optionally auto-create Supabase table if DB URL is provided
    try:
        from .supabase_client import ensure_table_exists  # local import to avoid hard dep at import time

        ensure_table_exists()
    except Exception:
        # Silent if not configured; avoids crashing app startup
        pass

    return app


