import React, { useState, useEffect } from 'react';
import { AlertTriangle, Check, X, Clock, MapPin, ChevronRight } from 'lucide-react';
import axios from 'axios';
import clsx from 'clsx';

const API_URL = '/api';

const IncidentLog = () => {
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        const interval = setInterval(fetchIncidents, 2000);
        fetchIncidents();
        return () => clearInterval(interval);
    }, []);

    const fetchIncidents = async () => {
        try {
            const res = await axios.get(`${API_URL}/incidents`);
            setIncidents(res.data);
        } catch (err) {
            console.error("Failed to fetch incidents", err);
        }
    };

    const handleAction = async (id, action) => {
        try {
            await axios.post(`${API_URL}/incidents/${id}/action?action=${action}&user=Operator_01`);
            fetchIncidents();
        } catch (err) {
            console.error("Action failed", err);
        }
    };

    return (
        <div className="glass-card flex flex-col h-full overflow-hidden shadow-2xl shadow-black/50">
            <div className="p-4 border-b border-white/5 bg-surface/50">
                <h2 className="font-bold tracking-wide flex items-center gap-2 text-warning">
                    <AlertTriangle className="w-5 h-5" />
                    INTELLIGENCE FEED
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {incidents.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-40 text-slate-500 gap-2 border border-dashed border-slate-700 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-mono uppercase tracking-widest">No Active Threats</span>
                    </div>
                )}

                {incidents.map((incident) => (
                    <div key={incident.id} className={clsx(
                        "relative p-4 rounded-lg border transition-all duration-300 group",
                        incident.status === 'New'
                            ? "bg-gradient-to-r from-surfaceHighlight to-surface border-l-4 border-l-primary border-y-white/5 border-r-white/5 shadow-lg"
                            : "bg-surface/30 border border-white/5 opacity-60 hover:opacity-100"
                    )}>
                        {/* Header */}
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <span className={clsx(
                                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border shadow-[0_0_10px_inset]",
                                    incident.severity === 'Critical' ? "bg-red-500/10 text-red-400 border-red-500/30 shadow-red-500/20" :
                                        incident.severity === 'High' ? "bg-orange-500/10 text-orange-400 border-orange-500/30 shadow-orange-500/20" :
                                            "bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-blue-500/20"
                                )}>
                                    {incident.severity}
                                </span>
                                <span className="text-sm font-bold text-white tracking-wide">{incident.hazard_type}</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                                {new Date(incident.timestamp).toLocaleTimeString()}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="space-y-2 mb-4">
                            <p className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                                <MapPin className="w-3 h-3 text-accent" />
                                {incident.location}
                            </p>
                            <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-slate-700 pl-3">
                                {incident.description}
                            </p>
                        </div>

                        {/* Actions */}
                        {incident.status === 'New' ? (
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => handleAction(incident.id, 'resolve')}
                                    className="flex-1 bg-success/10 hover:bg-success/20 text-success border border-success/30 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                                >
                                    <Check className="w-3 h-3" />
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleAction(incident.id, 'dismiss')}
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-slate-400 border border-white/10 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                                >
                                    <X className="w-3 h-3" />
                                    Dismiss
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-xs text-slate-500 italic border-t border-white/5 pt-2 mt-2">
                                {incident.status === 'Resolved' ? <Check className="w-3 h-3 text-success" /> : <X className="w-3 h-3" />}
                                {incident.status === 'Resolved' ? 'Protocol Executed' : 'Marked False Positive'}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IncidentLog;
