from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import router
import asyncio
import random
from .services.ingestion import IngestionService
import httpx

app = FastAPI(title="Real-Time Alerting Agent API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(run_simulation_loop())

async def run_simulation_loop():
    """
    Background task to randomly trigger alerts for demo purposes.
    """
    ingestion = IngestionService()
    print("--- Background Simulation Started ---")
    while True:
        await asyncio.sleep(random.randint(5, 10)) # Faster interval 5-10s for DEMO
        feeds = ingestion.get_feeds()
        if feeds:
            random_feed = random.choice(feeds)
            try:
                # Use localhost for internal call
                async with httpx.AsyncClient() as client:
                    await client.post(f"http://127.0.0.1:8000/api/simulate/{random_feed['id']}")
                print(f"[Auto-Sim] Triggered simulation for {random_feed['id']}")
            except Exception as e:
                print(f"[Auto-Sim] Failed to trigger: {e}")

@app.get("/")
async def root():
    return {"message": "Real-Time Alerting Agent API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
