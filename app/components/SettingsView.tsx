'use client';

import { useState } from 'react';
import { Settings, Shield, User, LogOut, Zap, Database, AlertCircle } from 'lucide-react';
import { SectionLabel } from './VisualAssets';

export const SettingsView = () => {
    const [toggles, setToggles] = useState({
        notifications: true,
        twoFactor: true,
        autoUpdate: false,
        darkMode: true,
        dataRetention: true
    });

    const toggle = (key: keyof typeof toggles) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <div className="p-6 animate-in fade-in zoom-in duration-300 max-w-[1600px] mx-auto w-full font-sans">
            <div className="mb-8 border-b border-[#292524] pb-6">
                <SectionLabel text="System Configuration" />
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-[#e7e5e4] uppercase tracking-tight mb-2">Global Settings</h2>
                        <p className="text-xs text-[#78716c] font-mono max-w-2xl">
                            CONFIGURE NODE PARAMETERS AND OPERATOR PREFERENCES.<br />
                            CHANGES PROPAGATE TO EDGE NODES IMMEDIATELY.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button className="border border-[#44403c] bg-[#1c1917] px-4 py-2 text-[10px] font-bold uppercase text-[#e7e5e4] hover:border-[#ff4d00] transition-colors flex items-center gap-2">
                            <LogOut size={14} /> Reset Default
                        </button>
                        <button className="bg-[#ff4d00] text-black px-4 py-2 text-[10px] font-bold uppercase hover:bg-[#e7e5e4] transition-colors flex items-center gap-2">
                            <Zap size={14} className="fill-current" /> Save Changes
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#1c1917] border border-[#292524] p-6 relative overflow-hidden group hover:border-[#44403c] transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#ff4d00]"></div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#0c0a09] border border-[#44403c] flex items-center justify-center">
                                <User size={20} className="text-[#e7e5e4]" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-[#e7e5e4] uppercase">Operator_8829</div>
                                <div className="text-[9px] text-[#78716c] font-mono">SECURE_ID: 0x992A...B12</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[9px] uppercase text-[#57534e] font-bold tracking-wider">Display Name</label>
                                <input type="text" className="w-full bg-[#0c0a09] border border-[#292524] text-[#e7e5e4] text-xs font-mono p-2 focus:outline-none focus:border-[#ff4d00] transition-colors" defaultValue="Kaelthas" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] uppercase text-[#57534e] font-bold tracking-wider">Email Protocol</label>
                                <input type="email" className="w-full bg-[#0c0a09] border border-[#292524] text-[#e7e5e4] text-xs font-mono p-2 focus:outline-none focus:border-[#ff4d00] transition-colors" defaultValue="admin@sector9.net" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0c0a09] border border-[#292524] p-6">
                        <h3 className="text-xs font-bold text-[#e7e5e4] uppercase mb-4 flex items-center gap-2">
                            <Shield size={14} className="text-[#ff4d00]" /> Security Protocols
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-4 border-b border-[#292524]/50">
                                <div>
                                    <div className="text-[10px] font-bold text-[#e7e5e4] uppercase">2-Factor Auth</div>
                                    <div className="text-[9px] text-[#57534e]">Hardware key requirement</div>
                                </div>
                                <div 
                                    onClick={() => toggle('twoFactor')}
                                    className={`w-8 h-4 cursor-pointer transition-colors ${toggles.twoFactor ? 'bg-[#ff4d00]' : 'bg-[#292524]'}`}
                                >
                                    <div className={`w-4 h-4 bg-white transition-transform ${toggles.twoFactor ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pb-4 border-b border-[#292524]/50">
                                <div>
                                    <div className="text-[10px] font-bold text-[#e7e5e4] uppercase">Session Timeout</div>
                                    <div className="text-[9px] text-[#57534e]">Auto-lock after 15m</div>
                                </div>
                                <div className="w-8 h-4 bg-[#292524] flex items-center justify-center text-[8px] text-[#78716c]">15m</div>
                            </div>

                            <button className="w-full border border-[#44403c] py-2 text-[9px] font-bold uppercase text-[#ff4d00] hover:bg-[#ff4d00] hover:text-black transition-colors">
                                Rotate API Keys
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#1c1917] border border-[#292524] p-6">
                        <h3 className="text-xs font-bold text-[#e7e5e4] uppercase mb-6 flex items-center gap-2">
                            <Settings size={14} className="text-[#ff4d00]" /> System Preferences
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="text-[9px] uppercase text-[#78716c] tracking-widest border-b border-[#292524] pb-2 mb-4">Alert Thresholds</h4>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-[#e7e5e4] font-mono">Critical Alerts</span>
                                    <div 
                                        onClick={() => toggle('notifications')}
                                        className={`w-8 h-4 cursor-pointer transition-colors ${toggles.notifications ? 'bg-green-500' : 'bg-[#292524]'}`}
                                    >
                                        <div className={`w-4 h-4 bg-white transition-transform ${toggles.notifications ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-[#e7e5e4] font-mono">Auto-Updates</span>
                                    <div 
                                        onClick={() => toggle('autoUpdate')}
                                        className={`w-8 h-4 cursor-pointer transition-colors ${toggles.autoUpdate ? 'bg-green-500' : 'bg-[#292524]'}`}
                                    >
                                        <div className={`w-4 h-4 bg-white transition-transform ${toggles.autoUpdate ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                    </div>
                                </div>

                                 <div className="flex items-center justify-between">
                                    <span className="text-xs text-[#e7e5e4] font-mono">Log Retention</span>
                                    <div 
                                        onClick={() => toggle('dataRetention')}
                                        className={`w-8 h-4 cursor-pointer transition-colors ${toggles.dataRetention ? 'bg-green-500' : 'bg-[#292524]'}`}
                                    >
                                        <div className={`w-4 h-4 bg-white transition-transform ${toggles.dataRetention ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[9px] uppercase text-[#78716c] tracking-widest border-b border-[#292524] pb-2 mb-4">Allocation Limit</h4>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-[9px] text-[#57534e] uppercase mb-1">
                                            <span>Local Cache</span>
                                            <span className="text-[#e7e5e4]">64%</span>
                                        </div>
                                        <div className="w-full h-2 bg-[#0c0a09] border border-[#292524]">
                                            <div className="h-full bg-[#e7e5e4] w-[64%] relative">
                                                <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-white animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-[9px] text-[#57534e] uppercase mb-1">
                                            <span>Bandwidth Cap</span>
                                            <span className="text-[#ff4d00]">92%</span>
                                        </div>
                                        <div className="w-full h-2 bg-[#0c0a09] border border-[#292524]">
                                            <div className="h-full bg-[#ff4d00] w-[92%]"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 p-3 bg-[#0c0a09] border border-[#292524] flex gap-3 items-start">
                                    <AlertCircle size={16} className="text-[#ff4d00] shrink-0 mt-0.5" />
                                    <p className="text-[9px] text-[#78716c] leading-relaxed">
                                        <strong className="text-[#e7e5e4] block mb-1">Warning: High Usage</strong>
                                        Approaching allocated bandwidth limit for Tier 1 subscription. Recommend node expansion.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0c0a09] border border-[#292524] p-6">
                        <h3 className="text-xs font-bold text-[#e7e5e4] uppercase mb-4 flex items-center gap-2">
                            <Database size={14} className="text-[#57534e]" /> API Endpoint Configuration
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[9px] uppercase text-[#57534e] font-bold tracking-wider">Webhook URL</label>
                                <input type="text" className="w-full bg-[#1c1917] border border-[#292524] text-[#78716c] text-xs font-mono p-2 focus:outline-none focus:border-[#ff4d00]" defaultValue="https://api.sector9.net/v1/hooks/..." />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] uppercase text-[#57534e] font-bold tracking-wider">Callback Interval</label>
                                <select className="w-full bg-[#1c1917] border border-[#292524] text-[#e7e5e4] text-xs font-mono p-2 focus:outline-none focus:border-[#ff4d00] appearance-none rounded-none">
                                    <option>Real-time (WebSocket)</option>
                                    <option>5 Seconds</option>
                                    <option>1 Minute</option>
                                    <option>Hourly Batch</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};





