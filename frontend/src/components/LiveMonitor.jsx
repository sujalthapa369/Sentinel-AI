import React, { useState, useEffect, useRef } from 'react';
import { Camera, Zap, Maximize2, Activity } from 'lucide-react';
import axios from 'axios';
import clsx from 'clsx';

const API_URL = '/api';

const LiveMonitor = () => {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [simulating, setSimulating] = useState(null);

    useEffect(() => {
        fetchFeeds();
    }, []);

    const fetchFeeds = async () => {
        try {
            const res = await axios.get(`${API_URL}/feeds`);
            setFeeds(res.data);
        } catch (err) {
            console.error("Failed to fetch feeds", err);
        } finally {
            setLoading(false);
        }
    };

    const triggerSimulation = async (feedId) => {
        setSimulating(feedId);
        try {
            await axios.post(`${API_URL}/simulate/${feedId}`);
        } catch (err) {
            console.error("Simulation failed", err);
        } finally {
            setTimeout(() => setSimulating(null), 3000);
        }
    };

    if (loading) return <div className="text-slate-400 animate-pulse">Initializing Video Uplink...</div>;

    return (
        <div className="glass-card flex flex-col h-full overflow-hidden shadow-2xl shadow-black/50">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-surface/50">
                <h2 className="font-bold tracking-wide flex items-center gap-2 text-primaryGlow">
                    <Camera className="w-5 h-5" />
                    SURVEILLANCE GRID
                </h2>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span className="text-xs font-mono text-red-400">LIVE</span>
                </div>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto flex-1">
                {feeds.map((feed) => (
                    <div key={feed.id} className="relative group aspect-video bg-black rounded-lg overflow-hidden border border-white/10 shadow-lg">
                        {/* Video Player */}
                        <video
                            src={feed.video_url}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 grayscale hover:grayscale-0"
                        />

                        {/* Scanning Line Animation */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                            <div className="w-full h-[2px] bg-primary shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-scan"></div>
                        </div>

                        {/* Simulating Overlay */}
                        {simulating === feed.id && (
                            <div className="absolute inset-0 border-4 border-red-500/50 animate-pulse z-20 flex items-center justify-center bg-red-500/10 backdrop-blur-[2px]">
                                <div className="text-red-500 font-bold tracking-widest text-xl bg-black/80 px-4 py-2 rounded border border-red-500">
                                    ANALYZING HAZARD...
                                </div>
                            </div>
                        )}

                        {/* Overlay Info */}
                        <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start bg-gradient-to-b from-black/90 to-transparent z-10">
                            <div>
                                <div className="text-xs font-bold text-white font-mono flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    {feed.name}
                                </div>
                                <div className="text-[10px] text-primaryGlow font-mono pl-4">{feed.location}</div>
                            </div>
                            <div className="text-[10px] font-mono text-slate-400">{feed.id}</div>
                        </div>

                        {/* Controls (Hover) */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm z-30">
                            <button
                                onClick={() => triggerSimulation(feed.id)}
                                disabled={simulating === feed.id}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded border border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)] text-sm font-bold flex items-center gap-2 transition-all transform hover:scale-105"
                            >
                                <Zap className="w-4 h-4" />
                                SIMULATE EVENT
                            </button>
                        </div>

                        {/* Corner Brackets */}
                        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary/50 rounded-tl-sm pointer-events-none z-10"></div>
                        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary/50 rounded-tr-sm pointer-events-none z-10"></div>
                        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary/50 rounded-bl-sm pointer-events-none z-10"></div>
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary/50 rounded-br-sm pointer-events-none z-10"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveMonitor;
