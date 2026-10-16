from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import auth, users
from app.schemas.auth import HealthResponse

app = FastAPI(
    title="DineGo Backend API",
    description="Route-Based Restaurant Reservation Platform API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS
origins = settings.cors_origins
if not origins:
    origins = [
        "http://localhost:8081",
        "http://localhost:8082",
        "http://127.0.0.1:8081",
        "http://localhost:5173",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
)

# Mount Routers
app.include_router(auth.router)
app.include_router(users.router)

@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Health check endpoint to verify backend service status."""
    return HealthResponse(
        status="ok",
        app="DineGo Backend API",
        version="1.0.0",
        environment=settings.ENVIRONMENT,
    )

@app.get("/", tags=["Health"])
async def root():
    return {
        "message": "Welcome to DineGo API",
        "docs": "/docs",
        "health": "/health",
    }
