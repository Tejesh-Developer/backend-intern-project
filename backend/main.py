from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
import models
from routers import users, tasks

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Backend Intern Project",
    description="Scalable REST API with Authentication & Role-Based Access",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# V1 routers
app.include_router(users.router, prefix="/api/v1")
app.include_router(tasks.router, prefix="/api/v1")

@app.get("/")
def root():
    return {
        "message": "Backend API is running!",
        "version": "v1",
        "docs": "/docs"
    }