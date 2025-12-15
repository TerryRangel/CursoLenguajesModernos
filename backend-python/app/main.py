from fastapi import FastAPI
from app.routes import user_routes


app = FastAPI(title="Backend con FastAPI")

@app.get("/")
def root():
    return {"message": "Serividor funcionando correctamente"}


app.include_router(user_routes.router,prefix="/api/v1")

