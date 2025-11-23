import os
from twilio.rest import Client
import requests

class NotificationService:
    def __init__(self):
        # In a real app, these would come from environment variables
        self.twilio_sid = os.getenv("TWILIO_ACCOUNT_SID", "mock_sid")
        self.twilio_token = os.getenv("TWILIO_AUTH_TOKEN", "mock_token")
        self.twilio_from = os.getenv("TWILIO_FROM_NUMBER", "+15550000000")
        self.slack_webhook = os.getenv("SLACK_WEBHOOK_URL", "")
        
        if self.twilio_sid != "mock_sid":
            self.twilio_client = Client(self.twilio_sid, self.twilio_token)
        else:
            self.twilio_client = None

    def send_sms(self, to: str, message: str):
        if self.twilio_client:
            try:
                self.twilio_client.messages.create(
                    body=message,
                    from_=self.twilio_from,
                    to=to
                )
                print(f"SMS sent to {to}: {message}")
                return True
            except Exception as e:
                print(f"Failed to send SMS: {e}")
                return False
        else:
            print(f"[MOCK] SMS to {to}: {message}")
            return True

    def send_slack(self, message: str):
        if self.slack_webhook:
            try:
                requests.post(self.slack_webhook, json={"text": message})
                print(f"Slack message sent: {message}")
                return True
            except Exception as e:
                print(f"Failed to send Slack message: {e}")
                return False
        else:
            print(f"[MOCK] Slack message: {message}")
            return True
