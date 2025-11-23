from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List
from ..services.orchestrator import OrchestratorService
from ..services.ingestion import IngestionService
import asyncio

router = APIRouter()
orchestrator = OrchestratorService()
ingestion = IngestionService()

@router.get("/feeds")
async def get_feeds():
    return ingestion.get_feeds()

@router.get("/incidents")
async def get_incidents():
    return orchestrator.get_incidents()

@router.post("/simulate/{feed_id}")
async def simulate_processing(feed_id: str):
    """
    Manually trigger a processing cycle for a feed to generate potential incidents.
    """
    incident = await orchestrator.process_feed(feed_id)
    return {"processed": True, "incident_created": incident is not None, "incident": incident}

@router.post("/incidents/{incident_id}/action")
async def take_action(incident_id: str, action: str, user: str = "Admin"):
    result = orchestrator.update_incident_status(incident_id, action, user)
    if not result:
        raise HTTPException(status_code=404, detail="Incident not found")
    return result

@router.get("/stats")
async def get_stats():
    incidents = orchestrator.get_incidents()
    total = len(incidents)
    critical = len([i for i in incidents if i["severity"] == "Critical"])
    resolved = len([i for i in incidents if i["status"] == "Resolved"])
    return {
        "total_incidents": total,
        "critical_active": critical,
        "resolved": resolved
    }
