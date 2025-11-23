import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Video, AlertTriangle } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView = () => {
    // Mock coordinates for demo
    const center = [51.505, -0.09];

    const markers = [
        { id: "cam_01", pos: [51.505, -0.09], name: "Main Entrance", type: "camera", status: "normal" },
        { id: "cam_02", pos: [51.51, -0.1], name: "Warehouse North", type: "camera", status: "normal" },
        { id: "drone_01", pos: [51.51, -0.08], name: "Patrol Drone Alpha", type: "drone", status: "active" },
        { id: "sensor_01", pos: [51.505, -0.08], name: "Flood Sensor B1", type: "sensor", status: "warning" },
    ];

    return (
        <div className="h-full w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl relative">
            <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {markers.map((marker) => (
                    <Marker key={marker.id} position={marker.pos}>
                        <Popup className="glass-popup">
                            <div className="p-2">
                                <h3 className="font-bold text-slate-800">{marker.name}</h3>
                                <p className="text-xs text-slate-600 capitalize">Type: {marker.type}</p>
                                <p className="text-xs text-slate-600 capitalize">Status: {marker.status}</p>
                            </div>
                        </Popup>
                        {marker.status === 'warning' && (
                            <Circle center={marker.pos} radius={500} pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2 }} />
                        )}
                    </Marker>
                ))}
            </MapContainer>

            {/* Overlay Legend */}
            <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur p-4 rounded-lg border border-white/10 z-[1000]">
                <h4 className="text-xs font-bold text-white uppercase mb-2">Map Legend</h4>
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div> Camera Feed
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div> Active Drone
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div> Hazard Zone
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapView;
