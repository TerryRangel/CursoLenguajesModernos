# filepath: c:\CursoLenguajes\backend-python\app\config\settings.py
import os
from dotenv import load_dotenv
from google.cloud import firestore

load_dotenv()

# Asegura que la variable esté en el entorno
cred_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
if cred_path:
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = cred_path

PORT = int(os.getenv("PORT", 5050))
PROJECT_ID = os.getenv("GCP_PROJECT_ID", "my-project-id")
JWT_SECRET = os.getenv("JWT_SECRET")
JWT_EXPIRE_HOURS = int(os.getenv("JWT_EXPIRE_HOURS", 24))
COLLECTION = os.getenv("FIRESTORE_COLLECTION_USUARIOS", "usuarios_python")

db = firestore.Client(project=PROJECT_ID)