from app import create_app
import os


app = create_app()


if __name__ == "__main__":
    use_waitress = os.getenv("WAITRESS", "0") == "1"
    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", "5000"))
    if use_waitress:
        from waitress import serve

        serve(app, host=host, port=port)
    else:
        app.run(host=host, port=port, debug=os.getenv("FLASK_ENV") == "development")


