import uuid
from datetime import datetime
from typing import List, Dict, Optional
from .ingestion import IngestionService
from .detection import DetectionService
from .notification_service import NotificationService
from .report_service import ReportService

class OrchestratorService:
    def __init__(self):
        self.ingestion = IngestionService()
        self.detection = DetectionService()
        self.notification = NotificationService()
        self.report_service = ReportService()
        self.incidents = []  # In-memory storage for demo
        self.active_alerts = []

    async def process_feed(self, feed_id: str):
        """
        Orchestrates the flow: Ingest -> Detect -> Alert
        """
        # 1. Ingest
        frame = await self.ingestion.generate_frame(feed_id)
        
        # 2. Detect
        result = self.detection.analyze_frame(frame)
        
        if result and result["detected"]:
            # 3. Create Incident / Alert
            incident = self._create_incident(frame, result)
            self.incidents.append(incident)
            
            # 4. Trigger Alert (Mock)
            if result["severity"] in ["Critical", "High"]:
                self._trigger_alert(incident)
                
            return incident
        
        return None

    def _create_incident(self, frame: Dict, detection: Dict) -> Dict:
        return {
            "id": str(uuid.uuid4()),
            "timestamp": datetime.now().isoformat(),
            "feed_id": frame["feed_id"],
            "hazard_type": detection["hazard_type"],
            "severity": detection["severity"],
            "status": "New",  # New, Pending Approval, Action Taken, Resolved, Dismissed
            "description": detection["description"],
            "location": self._get_location(frame["feed_id"]),
            "actions_taken": [],
            "report_url": None
        }

    def _get_location(self, feed_id: str) -> str:
        # Simple lookup
        for feed in self.ingestion.get_feeds():
            if feed["id"] == feed_id:
                return feed["location"]
        return "Unknown"

    def _trigger_alert(self, incident: Dict):
        message = f"!!! ALERT: {incident['severity']} {incident['hazard_type']} detected at {incident['location']} !!!"
        print(message)
        
        # Send Notifications
        self.notification.send_sms("+1234567890", message) # Mock number
        self.notification.send_slack(message)

        self.active_alerts.append({
            "incident_id": incident["id"],
            "channel": "Multi-Channel (SMS/Slack)",
            "sent_at": datetime.now().isoformat()
        })

    def get_incidents(self) -> List[Dict]:
        return sorted(self.incidents, key=lambda x: x["timestamp"], reverse=True)

    def update_incident_status(self, incident_id: str, action: str, user: str) -> Optional[Dict]:
        for incident in self.incidents:
            if incident["id"] == incident_id:
                incident["status"] = "Resolved" if action == "resolve" else "Dismissed"
                incident["actions_taken"].append({
                    "action": action,
                    "user": user,
                    "timestamp": datetime.now().isoformat()
                })
                
                # Generate Report on Resolution
                if action == "resolve":
                    report_path = self.report_service.generate_incident_report(incident)
                    incident["report_url"] = report_path

                return incident
        return None
