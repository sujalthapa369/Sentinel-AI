import React, { useState } from 'react';
import { Activity, Shield, LayoutDashboard, Settings, Bell, Menu, Map } from 'lucide-react';
import LiveMonitor from './components/LiveMonitor';
import IncidentLog from './components/IncidentLog';
import StatsPanel from './components/StatsPanel';
import SettingsPanel from './components/SettingsPanel';
import MapView from './components/MapView';
import Login from './components/Login';
import clsx from 'clsx';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeView, setActiveView] = useState('dashboard');

    const handleLogin = (username) => {
        setUser(username);
        setIsLoggedIn(true);
    };

    if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return (
                    <>
                        <StatsPanel />
                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
                            <div className="lg:col-span-8 flex flex-col min-h-0">
                                <LiveMonitor />
                            </div>
                            <div className="lg:col-span-4 flex flex-col min-h-0">
                                <IncidentLog />
                            </div>
                        </div>
                    </>
                );
            case 'feeds':
                return (
                    <div className="flex-1 flex flex-col min-h-0">
                        <LiveMonitor />
                    </div>
                );
            case 'map':
                return (
                    <div className="flex-1 flex flex-col min-h-0">
                        <MapView />
                    </div>
                );
            case 'alerts':
                return (
                    <div className="flex-1 flex flex-col min-h-0 max-w-4xl mx-auto w-full">
                        <IncidentLog />
                    </div>
                );
            case 'settings':
                return (
                    <div className="flex-1 overflow-y-auto">
                        <SettingsPanel />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex bg-background text-slate-100 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className={clsx(
                "fixed inset-y-0 left-0 z-50 w-64 bg-surface/90 backdrop-blur-xl border-r border-white/5 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
                !sidebarOpen && "-translate-x-full lg:hidden"
            )}>
                <div className="h-16 flex items-center px-6 border-b border-white/5">
                    <Shield className="w-8 h-8 text-primary mr-3" />
                    <span className="text-lg font-bold tracking-wider text-white">SENTINEL<span className="text-primary">AI</span></span>
                </div>

                <nav className="p-4 space-y-2">
                    <NavItem
                        icon={<LayoutDashboard />}
                        label="Dashboard"
                        active={activeView === 'dashboard'}
                        onClick={() => setActiveView('dashboard')}
                    />
                    <NavItem
                        icon={<Activity />}
                        label="Live Feeds"
                        active={activeView === 'feeds'}
                        onClick={() => setActiveView('feeds')}
                    />
                    <NavItem
                        icon={<Map />}
                        label="Geospatial Map"
                        active={activeView === 'map'}
                        onClick={() => setActiveView('map')}
                    />
                    <NavItem
                        icon={<Bell />}
                        label="Alerts"
                        badge="3"
                        active={activeView === 'alerts'}
                        onClick={() => setActiveView('alerts')}
                    />
                    <NavItem
                        icon={<Settings />}
                        label="Settings"
                        active={activeView === 'settings'}
                        onClick={() => setActiveView('settings')}
                    />
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                        <span className="text-xs font-mono text-slate-400">SYSTEM ONLINE</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Background Grid Effect */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>

                {/* Header */}
                <header className="h-16 glass flex items-center justify-between px-6 z-10 shrink-0">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-white/5 rounded-lg">
                        <Menu className="w-5 h-5" />
                    </button>

                    <h2 className="text-lg font-medium text-slate-200 capitalize">
                        {activeView.replace('-', ' ')}
                    </h2>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono">
                            v2.4.0-RC
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-xs font-bold">
                            {user ? user.substring(0, 2).toUpperCase() : 'OP'}
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-6 overflow-hidden flex flex-col gap-6 z-0">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

const NavItem = ({ icon, label, active, badge, onClick }) => (
    <button
        onClick={onClick}
        className={clsx(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
            active
                ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                : "text-slate-400 hover:text-white hover:bg-white/5"
        )}
    >
        {React.cloneElement(icon, { className: "w-5 h-5" })}
        <span>{label}</span>
        {badge && (
            <span className="ml-auto bg-danger/20 text-danger border border-danger/20 text-[10px] px-2 py-0.5 rounded-full">
                {badge}
            </span>
        )}
    </button>
);

export default App;
