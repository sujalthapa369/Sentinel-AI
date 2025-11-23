import React from 'react';
import { Save, Bell, Shield, User, Volume2 } from 'lucide-react';

const SettingsPanel = () => {
    return (
        <div className="glass-card p-6 max-w-2xl mx-auto w-full">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                System Configuration
            </h2>

            <div className="space-y-6">
                {/* Notification Settings */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-white/5 pb-2">
                        Notifications
                    </h3>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-slate-400" />
                            <div>
                                <div className="text-sm font-medium text-white">Critical Alerts</div>
                                <div className="text-xs text-slate-500">Receive immediate popups for high severity events</div>
                            </div>
                        </div>
                        <Toggle defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Volume2 className="w-5 h-5 text-slate-400" />
                            <div>
                                <div className="text-sm font-medium text-white">Audio Alarms</div>
                                <div className="text-xs text-slate-500">Play siren sound on detection</div>
                            </div>
                        </div>
                        <Toggle defaultChecked />
                    </div>
                </div>

                {/* User Settings */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-white/5 pb-2">
                        User Profile
                    </h3>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-slate-400" />
                            <div>
                                <div className="text-sm font-medium text-white">Operator ID</div>
                                <div className="text-xs text-slate-500">OP-742-ALPHA</div>
                            </div>
                        </div>
                        <button className="text-xs text-primary hover:text-primaryGlow">Edit</button>
                    </div>
                </div>

                <div className="pt-4">
                    <button className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
                        <Save className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

const Toggle = ({ defaultChecked }) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
    </label>
);

export default SettingsPanel;
