import React, { useState } from 'react';
import { Shield, Lock, User, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Mock login delay
        setTimeout(() => {
            onLogin(username);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none"></div>

            <div className="glass-card p-8 w-full max-w-md relative z-10 shadow-2xl shadow-black/50 border border-white/10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4 border border-primary/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                        <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-wider">SENTINEL<span className="text-primary">AI</span></h1>
                    <p className="text-slate-400 text-sm mt-2 font-mono">SECURE ACCESS TERMINAL</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Operator ID</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-surfaceHighlight border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                placeholder="Enter ID..."
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Passcode</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-surfaceHighlight border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                    >
                        {loading ? (
                            <span className="animate-pulse">AUTHENTICATING...</span>
                        ) : (
                            <>
                                ACCESS SYSTEM <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-[10px] text-slate-600 font-mono">
                        RESTRICTED AREA. UNAUTHORIZED ACCESS IS PROHIBITED.
                        <br />
                        SYSTEM ID: 8X-992-ALPHA
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
