import random
from typing import Dict, Optional

class DetectionService:
    def __init__(self):
        self.hazards = ["Fire", "Flood", "Intruder", "Damage", "Smoke", "Biohazard", "Unauthorized Vehicle"]
        self.severities = ["Critical", "High", "Medium", "Low"]

    def analyze_frame(self, frame_data: Dict) -> Optional[Dict]:
        """
        Simulates AI analysis of a frame.
        Randomly detects hazards for demonstration purposes.
        """
        # 70% chance of detecting a hazard for DEMO purposes
        if random.random() < 0.70:
            hazard_type = random.choice(self.hazards)
            confidence = round(random.uniform(0.7, 0.99), 2)
            
            # Logic to assign severity based on hazard type
            if hazard_type == "Fire":
                severity = "Critical"
            elif hazard_type == "Intruder":
                severity = "High"
            elif hazard_type == "Flood":
                severity = "High"
            elif hazard_type == "Biohazard":
                severity = "Critical"
            elif hazard_type == "Smoke":
                severity = "High"
            else:
                severity = "Medium"

            return {
                "detected": True,
                "hazard_type": hazard_type,
                "confidence": confidence,
                "severity": severity,
                "bbox": [100, 100, 300, 300], # Mock bounding box
                "description": f"Detected {hazard_type} with {confidence} confidence."
            }
        
        return None
