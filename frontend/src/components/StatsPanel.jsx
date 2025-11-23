import React, { useState, useEffect } from 'react';
import { BarChart3, ShieldAlert, CheckCircle2, Activity } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const StatsPanel = () => {
    const [stats, setStats] = useState({ total_incidents: 0, critical_active: 0, resolved: 0 });

    useEffect(() => {
        const interval = setInterval(fetchStats, 5000);
        fetchStats();
        return () => clearInterval(interval);
    }, []);

    const fetchStats = async () => {
        try {
            const res = await axios.get(`${API_URL}/stats`);
            setStats(res.data);
        } catch (err) {
            console.error("Failed to fetch stats", err);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
                label="Total Detections"
                value={stats.total_incidents}
                icon={<Activity className="text-primary" />}
                color="primary"
            />
            <StatCard
                label="Active Threats"
                value={stats.critical_active}
                icon={<ShieldAlert className="text-danger" />}
                color="danger"
                pulse={stats.critical_active > 0}
            />
            <StatCard
                label="Resolved"
                value={stats.resolved}
                icon={<CheckCircle2 className="text-success" />}
                color="success"
            />
        </div>
    );
};

const StatCard = ({ label, value, icon, color, pulse }) => (
    <div className="glass-card p-5 relative overflow-hidden group">
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500`}>
            {React.cloneElement(icon, { className: "w-16 h-16" })}
        </div>

        <div className="relative z-10">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                {icon}
                {label}
            </div>
            <div className="text-3xl font-mono font-bold text-white flex items-baseline gap-2">
                {value}
                {pulse && <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>}
            </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${color} to-transparent opacity-50`}></div>
    </div>
);

export default StatsPanel;
