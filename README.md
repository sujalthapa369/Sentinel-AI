# Sentinel-AI
Sentinel-AI
Real-Time Incident Alerting Agent (AI + IoT + watsonx Orchestrate)

Sentinel-AI is an advanced real-time incident monitoring and alerting system designed to ensure safety and operational continuity in various environments. It leverages AI models to analyze live video feeds and IoT sensor data, proactively detecting hazards such as fire, flood, intrusion, and infrastructure failures.

🌐 Live Demo

🚀 Features
Real-Time Hazard Detection: Detects fire, flood, intrusions, and structural failures using AI-powered video analysis and IoT device monitoring.

Multi-Modal Data Processing: Integrates video feed analysis with readings from connected sensors for holistic situational awareness.

Automated Alerting: Sends instant notifications to relevant stakeholders via various channels (email, dashboard, etc.) upon detecting hazards.

Scalable & Modular Architecture: Built with separate backend (Python) and frontend (JavaScript) modules, easy to deploy and extend.

Watsonx Orchestrate Integration: Uses IBM’s watsonx for advanced workflow orchestration.

Cloud Ready: Deployed on Render for high availability and ease of scaling.

🛠️ Tech Stack
Backend: Python (Flask/FastAPI)

Frontend: JavaScript (React or similar)

IoT Communication: MQTT/REST

AI Models: Computer Vision (fire/flood/intrusion detection)

Orchestration: IBM watsonx

Deployment: Render.com

📂 Project Structure
text
Sentinel-AI/
├── backend/           # Python backend - API, incident processing
├── frontend/          # JavaScript frontend - Dashboard/Alerts
├── server.py          # Main server file
├── requirements.txt   # Python dependencies
├── package-lock.json  # JS dependencies
├── .gitignore
└── README.md
⚡️ Quick Start
1. Clone the Repository
bash
git clone https://github.com/sujalthapa369/Sentinel-AI.git
cd Sentinel-AI
2. Backend Setup (Python)
bash
cd backend
pip install -r requirements.txt
python server.py
3. Frontend Setup (JavaScript)
bash
cd frontend
npm install
npm start
4. IoT & Camera Integration
Add your IoT endpoint configs in the backend.

Connect camera/video feeds for computer vision analysis.

5. Access Dashboard
Go to localhost:3000 (or deployed Render URL) to view and manage incidents.

📈 Use Cases
Industrial safety and operations

Smart buildings/facilities

Infrastructure monitoring

Real-time event alerting for public spaces

🤝 Contributing
Contributions welcome! Please open issues for feature requests or bugs. Fork the repo, create a branch (feature/your-feature), and submit a pull request.

📄 License
MIT License.

💬 Contact
Questions, feedback, and collaborations:
GitHub: sujalthapa369
