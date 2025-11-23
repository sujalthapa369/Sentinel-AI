import asyncio
import random
import uuid
from datetime import datetime
from typing import List, Dict

class IngestionService:
    def __init__(self):
        self.feeds = [
            {
                "id": "cam_01", 
                "name": "Main Entrance", 
                "type": "camera", 
                "location": "Building A",
                "video_url": "https://cdn.pixabay.com/video/2023/10/15/185098-874635661_large.mp4" # City/Traffic
            },
            {
                "id": "cam_02", 
                "name": "Warehouse North", 
                "type": "camera", 
                "location": "Warehouse",
                "video_url": "https://cdn.pixabay.com/video/2021/04/12/70838-536102468_large.mp4" # Industrial/Warehouse
            },
            {
                "id": "drone_01", 
                "name": "Patrol Drone Alpha", 
                "type": "drone", 
                "location": "Perimeter",
                "video_url": "https://cdn.pixabay.com/video/2022/11/22/140111-774336952_large.mp4" # Drone/Aerial
            },
            {
                "id": "sensor_01", 
                "name": "Flood Sensor B1", 
                "type": "sensor", 
                "location": "Basement",
                "video_url": "https://cdn.pixabay.com/video/2020/05/25/40139-424930038_large.mp4" # Water/Flood
            },
        ]

    def get_feeds(self) -> List[Dict]:
        return self.feeds

    async def generate_frame(self, feed_id: str):
        """
        Simulates fetching a frame or data point from a feed.
        """
        await asyncio.sleep(0.1)
        return {
            "feed_id": feed_id,
            "timestamp": datetime.now().isoformat(),
            "frame_id": str(uuid.uuid4()),
            "data": "binary_data_placeholder" 
        }
