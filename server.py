import os
import sys
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import random
import httpx

# Add backend directory to path so we can import app modules
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from app.api.routes import router
from app.services.ingestion import IngestionService

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    asyncio.create_task(run_simulation_loop())
    yield
    # Shutdown (if needed)

app = FastAPI(title="Sentinel AI - Unified Deployment", lifespan=lifespan)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes
app.include_router(router, prefix="/api")

async def run_simulation_loop():
    """
    Background task to randomly trigger alerts for demo purposes.
    """
    ingestion = IngestionService()
    print("--- Background Simulation Started (Unified App) ---")
    while True:
        await asyncio.sleep(random.randint(5, 10)) # Faster interval 5-10s for DEMO
        feeds = ingestion.get_feeds()
        if feeds:
            random_feed = random.choice(feeds)
            try:
                # Use localhost for internal call
                # In production/render, we might need to be careful with this loop calling itself via HTTP
                # But for this architecture it's the simplest way to trigger the existing logic
                async with httpx.AsyncClient() as client:
                    # We assume the app runs on port 10000 in Render or 8000 locally
                    # Better to call the service directly, but the route logic is complex
                    # Let's try to call the service logic directly to avoid HTTP overhead/port issues
                    pass 
                    # actually, let's just hit the API. 
                    # On Render, we might not know the port easily or it might be https.
                    # Let's use the Orchestrator directly if possible? 
                    # The route calls `orchestrator.process_feed`.
                    # But we don't have easy access to the *same* orchestrator instance used by the router 
                    # because it's instantiated inside the router module or dependency.
                    # Let's stick to HTTP but make it robust.
                    port = os.getenv("PORT", "8000")
                    base_url = f"http://127.0.0.1:{port}"
                    await client.post(f"{base_url}/api/simulate/{random_feed['id']}")
                print(f"[Auto-Sim] Triggered simulation for {random_feed['id']}")
            except Exception as e:
                print(f"[Auto-Sim] Failed to trigger: {e}")

# Serve Static Files (Frontend)
# Mount assets first
if os.path.exists("frontend/dist/assets"):
    app.mount("/assets", StaticFiles(directory="frontend/dist/assets"), name="assets")

@app.get("/")
async def serve_root():
    if os.path.exists("frontend/dist/index.html"):
        return FileResponse("frontend/dist/index.html")
    return {"error": "Frontend not built"}

# Catch-all for React routing
@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    # If it's an API call that wasn't matched, return 404 (handled by FastAPI default if not matched above?)
    # No, this catch-all matches everything. We need to be careful.
    # API routes are matched first because they are included before.
    
    # Check if file exists in dist (e.g. favicon.ico)
    file_path = os.path.join("frontend/dist", full_path)
    if os.path.exists(file_path) and os.path.isfile(file_path):
        return FileResponse(file_path)
    
    # Otherwise return index.html for React Router
    if os.path.exists("frontend/dist/index.html"):
        return FileResponse("frontend/dist/index.html")
    return {"error": "Frontend not built"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
