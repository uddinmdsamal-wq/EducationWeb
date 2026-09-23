from pathlib import Path
import subprocess
import sys

WEB = Path("/storage/emulated/0/DCIM/web")

APP = WEB / "app.py"
REQ = WEB / "requirements.txt"


# ─────────────────────────────────────
# 1. Check project directory
# ─────────────────────────────────────

if not WEB.exists():
    print("❌ Website folder পাওয়া যায়নি:")
    print(WEB)
    sys.exit(1)

print("✅ Website folder পাওয়া গেছে")
print(WEB)


# ─────────────────────────────────────
# 2. Install Flask + Gunicorn
# ─────────────────────────────────────

print("\n📦 Checking Flask...")

subprocess.run([
    sys.executable,
    "-m",
    "pip",
    "install",
    "flask",
    "gunicorn"
])


# ─────────────────────────────────────
# 3. Create requirements.txt
# ─────────────────────────────────────

REQ.write_text(
    "Flask\n"
    "gunicorn\n",
    encoding="utf-8"
)

print("✅ requirements.txt তৈরি হয়েছে")


# ─────────────────────────────────────
# 4. Create Flask application
# ─────────────────────────────────────

app_code = r'''
from flask import Flask, send_from_directory, abort
from pathlib import Path

app = Flask(__name__)

WEB = Path(__file__).resolve().parent


@app.route("/")
def home():
    return send_from_directory(WEB, "home.html")


@app.route("/<path:filename>")
def files(filename):

    target = WEB / filename

    if not target.exists() or not target.is_file():
        abort(404)

    return send_from_directory(
        target.parent,
        target.name
    )


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
'''

APP.write_text(app_code.strip() + "\n", encoding="utf-8")

print("✅ app.py তৈরি হয়েছে")


# ─────────────────────────────────────
# 5. Start Flask
# ─────────────────────────────────────

print("\n🚀 Starting Flask server...")
print("🌐 http://127.0.0.1:5000")
print("📱 Same device থেকে browser-এ এই address খুলবে।")
print("\nPress CTRL+C to stop the server.\n")

subprocess.run([
    sys.executable,
    str(APP)
])
