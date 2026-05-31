from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from ml.loader import store
from app.routers import sentiment
from app.models.schemas import HealthResponse


@asynccontextmanager
async def lifespan(app: FastAPI):
    store.load_all()       # loads all models once at startup
    yield                  # app runs here
    # cleanup if needed later


app = FastAPI(
    title="Social Sentiment API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://*.vercel.app",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(sentiment.router)


@app.get("/health", response_model=HealthResponse)
def health():
    return HealthResponse(
        status="ok",
        models_loaded=len(store.registry()),
    )

@app.get("/")
def read_root():
    return {"message": "Social Sentiment API is running"}