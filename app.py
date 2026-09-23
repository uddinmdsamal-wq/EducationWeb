from flask import Flask, send_from_directory, abort
from pathlib import Path

# ============================================================
# EducationWeb Flask Server
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

app = Flask(__name__)


# ============================================================
# HOME
# ============================================================

@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


# ============================================================
# ROOT FILES
# ============================================================

@app.route("/<path:filename>")
def root_files(filename):
    """
    Serve files from the main ~/web directory.

    Examples:
        /home.html
        /dashboard.html
        /settings.html
        /css/home.css
        /js/home.js
        /entry.png
    """

    file_path = BASE_DIR / filename

    # Security:
    # Prevent access outside ~/web
    try:
        file_path.resolve().relative_to(BASE_DIR.resolve())
    except ValueError:
        abort(404)

    if not file_path.is_file():
        abort(404)

    return send_from_directory(
        file_path.parent,
        file_path.name
    )


# ============================================================
# SCIENCE SUBJECT FILES
# ============================================================

@app.route("/books/science/<path:filename>")
def science_files(filename):
    """
    Serve everything inside:

        ~/web/books/science/

    This includes:

        HTML
        CSS
        JavaScript
        Images
        Future assets
    """

    science_dir = BASE_DIR / "books" / "science"
    file_path = science_dir / filename

    # Security:
    # Prevent path traversal
    try:
        file_path.resolve().relative_to(science_dir.resolve())
    except ValueError:
        abort(404)

    if not file_path.is_file():
        abort(404)

    return send_from_directory(
        file_path.parent,
        file_path.name
    )


# ============================================================
# ERROR HANDLER
# ============================================================

@app.errorhandler(404)
def page_not_found(error):
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>404 - Page Not Found</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #050b14;
                color: white;
                text-align: center;
                padding: 80px 20px;
            }

            h1 {
                font-size: 64px;
                margin-bottom: 10px;
            }

            p {
                color: #9ca3af;
            }

            a {
                color: #38bdf8;
                text-decoration: none;
            }
        </style>
    </head>

    <body>

        <h1>404</h1>

        <p>
            The requested page was not found.
        </p>

        <a href="/">
            ← Back to EducationWeb
        </a>

    </body>
    </html>
    """, 404


# ============================================================
# SERVER
# ============================================================

if __name__ == "__main__":

    print()
    print("=" * 55)
    print("        EducationWeb Flask Server")
    print("=" * 55)
    print()
    print("Project :", BASE_DIR)
    print("Home    : http://127.0.0.1:5000")
    print()
    print("Press CTRL+C to stop the server.")
    print("=" * 55)
    print()

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
