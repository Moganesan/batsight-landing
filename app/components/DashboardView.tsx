'use client';

import { useState, useEffect } from 'react';
import { Grid, Globe, Layers, Database, Settings, LogOut, User, Zap, Command, Shield, Radio, Lock, FileText, Activity } from 'lucide-react';
import { AnimatedTerminal } from './AnimatedTerminal';
import { SecurityDashboard } from './SecurityDashboard';
import { GlobalDetailsView } from './GlobalDetailsView';
import { DataLayerView } from './DataLayerView';
import { SystemLayerView } from './SystemLayerView';
import { SettingsView } from './SettingsView';
import { SectionLabel, WorldMapSVG, MapNode } from './VisualAssets';

export const DashboardView = ({ onLogout }: { onLogout: () => void }) => {
    const [time, setTime] = useState(new Date());
    const [activeTab, setActiveTab] = useState<'overview' | 'global' | 'db' | 'layers' | 'settings'>('overview');

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex h-screen bg-[#0c0a09] overflow-hidden animate-in fade-in duration-500">
            {/* Sidebar */}
            <aside className="w-16 lg:w-20 bg-[#080706] border-r border-[#292524] flex flex-col items-center py-6 z-50">
                <div className="w-8 h-8 bg-[#ff4d00] mb-12 flex items-center justify-center">
                    <Zap size={16} className="text-black fill-current" />
                </div>

                <nav className="flex-1 flex flex-col gap-8 w-full">
                    {[
                        { id: 'overview' as const, icon: Grid, label: 'Overview' },
                        { id: 'global' as const, icon: Globe, label: 'Global Map' },
                        { id: 'layers' as const, icon: Layers, label: 'System Layers' },
                        { id: 'db' as const, icon: Database, label: 'Database' },
                        { id: 'settings' as const, icon: Settings, label: 'Settings' }
                    ].map((item, i) => (
                        <div 
                            key={i} 
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full h-12 flex items-center justify-center cursor-pointer transition-all relative group`}
                        >
                            {activeTab === item.id && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#ff4d00]"></div>}
                            <item.icon size={20} className={`transition-colors ${activeTab === item.id ? 'text-[#ff4d00]' : 'text-[#57534e] group-hover:text-[#e7e5e4]'}`} />
                            
                            <div className="absolute left-full ml-2 bg-[#1c1917] border border-[#44403c] text-[#e7e5e4] text-[9px] uppercase font-mono px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 tracking-wider shadow-xl">
                                {item.label}
                                <div className="absolute top-1/2 right-full w-2 h-[1px] bg-[#44403c]"></div> 
                            </div>
                        </div>
                    ))}
                </nav>

                <button onClick={onLogout} className="mt-auto text-[#57534e] hover:text-[#ff4d00] transition-colors p-4 relative group">
                    <LogOut size={20} />
                    <div className="absolute left-full ml-2 bg-[#1c1917] border border-[#44403c] text-[#ff4d00] text-[9px] uppercase font-mono px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 tracking-wider shadow-xl">
                        Logout
                        <div className="absolute top-1/2 right-full w-2 h-[1px] bg-[#44403c]"></div>
                    </div>
                </button>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Dashboard Header */}
                <header className="h-16 border-b border-[#292524] bg-[#0c0a09]/95 backdrop-blur-sm flex items-center justify-between px-8 z-40">
                    <div className="flex items-center gap-4">
                         <h1 className="text-xl font-black text-[#e7e5e4] uppercase tracking-tight">
                            {activeTab === 'global' ? 'Global Intelligence' : 
                             activeTab === 'db' ? 'Data Vault' : 
                             activeTab === 'layers' ? 'System Architecture' : 
                             activeTab === 'settings' ? 'Configuration' : 'Command Center'}
                         </h1>
                         <span className="px-2 py-0.5 bg-[#1c1917] border border-[#292524] text-[10px] text-[#ff4d00] font-mono tracking-widest">LIVE_FEED</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right hidden md:block">
                            <div className="text-[10px] text-[#78716c] uppercase tracking-widest">System Time</div>
                            <div className="text-xs font-mono text-[#e7e5e4]">{time.toLocaleTimeString()}</div>
                        </div>
                        <div className="h-8 w-[1px] bg-[#292524] hidden md:block"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <div className="text-xs font-bold text-[#e7e5e4] uppercase">Operator_8829</div>
                                <div className="text-[9px] text-[#78716c] font-mono">LEVEL_5_ACCESS</div>
                            </div>
                            <div className="w-8 h-8 bg-[#1c1917] border border-[#44403c] flex items-center justify-center">
                                <User size={14} className="text-[#e7e5e4]" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content Area */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                    {activeTab === 'global' ? (
                        <GlobalDetailsView />
                    ) : activeTab === 'db' ? (
                        <DataLayerView />
                    ) : activeTab === 'layers' ? (
                        <SystemLayerView />
                    ) : activeTab === 'settings' ? (
                        <SettingsView />
                    ) : (
                        /* Overview Grid (Default) */
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
                            {/* Widget: Live Threat Map (Large) */}
                            <div className="md:col-span-2 lg:col-span-3 row-span-2 bg-[#0c0a09] border border-[#292524] relative h-[400px] overflow-hidden group">
                                <div className="absolute top-4 left-4 z-20">
                                    <SectionLabel text="Global Threat Vector" />
                                </div>

                                 <div className="absolute inset-0 flex items-center justify-center pt-12 opacity-60 hover:opacity-100 transition-all duration-500">
                                    <WorldMapSVG />
                                 </div>

                                 <MapNode x={28} y={38} label="New York" delay={0} />
                                 <MapNode x={49} y={32} label="London" delay={1} />
                                 <MapNode x={85} y={40} label="Tokyo" delay={2} />
                                 <MapNode x={32} y={75} label="Sao Paulo" delay={3} />
                                 <MapNode x={52} y={82} label="Cape Town" delay={1.5} />
                                 <MapNode x={75} y={65} label="Singapore" delay={2.5} />
                                 
                                 <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#0c0a09]/90 border-t border-[#292524] flex items-center px-4 gap-8 overflow-x-auto no-scrollbar">
                                    <div className="flex gap-2 items-center whitespace-nowrap">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-[9px] uppercase text-[#78716c] tracking-wider">Network Status: <span className="text-[#e7e5e4]">OPTIMAL</span></span>
                                    </div>
                                    <div className="flex gap-2 items-center whitespace-nowrap">
                                        <div className="w-1.5 h-1.5 bg-[#ff4d00] rounded-full"></div>
                                        <span className="text-[9px] uppercase text-[#78716c] tracking-wider">Active Intercepts: <span className="text-[#e7e5e4] font-mono">42</span></span>
                                    </div>
                                 </div>
                            </div>

                            {/* Widget: Security Dashboard */}
                            <div className="h-full">
                                 <SecurityDashboard />
                            </div>

                            {/* Widget: Terminal */}
                            <div className="md:col-span-2 lg:col-span-2 bg-[#1c1917] border border-[#292524] flex flex-col h-64">
                                 <div className="h-8 border-b border-[#292524] bg-[#12100f] flex items-center justify-between px-3">
                                     <span className="text-[9px] font-mono text-[#78716c] uppercase">System_Log</span>
                                     <Command size={10} className="text-[#57534e]" />
                                 </div>
                                 <div className="flex-1 overflow-hidden">
                                    <AnimatedTerminal height="h-full" />
                                 </div>
                            </div>

                            {/* Widget: Quick Actions */}
                             <div className="md:col-span-1 lg:col-span-2 grid grid-cols-2 gap-4">
                                 <div className="bg-[#1c1917] border border-[#292524] p-4 hover:border-[#ff4d00] transition-colors cursor-pointer group">
                                     <Shield size={24} className="text-[#57534e] group-hover:text-[#ff4d00] mb-3 transition-colors" />
                                     <h4 className="text-xs font-bold text-[#e7e5e4] uppercase mb-1">Purge Cache</h4>
                                     <p className="text-[9px] text-[#78716c]">Clear local node storage</p>
                                 </div>

                                 <div className="bg-[#1c1917] border border-[#292524] p-4 hover:border-[#ff4d00] transition-colors cursor-pointer group">
                                     <Radio size={24} className="text-[#57534e] group-hover:text-[#ff4d00] mb-3 transition-colors" />
                                     <h4 className="text-xs font-bold text-[#e7e5e4] uppercase mb-1">Scan Ports</h4>
                                     <p className="text-[9px] text-[#78716c]">Initiate deep diagnostic</p>
                                 </div>

                                 <div className="bg-[#1c1917] border border-[#292524] p-4 hover:border-[#ff4d00] transition-colors cursor-pointer group">
                                     <Lock size={24} className="text-[#57534e] group-hover:text-[#ff4d00] mb-3 transition-colors" />
                                     <h4 className="text-xs font-bold text-[#e7e5e4] uppercase mb-1">Lockdown</h4>
                                     <p className="text-[9px] text-[#78716c]">Emergency protocol</p>
                                 </div>

                                  <div className="bg-[#1c1917] border border-[#292524] p-4 hover:border-[#ff4d00] transition-colors cursor-pointer group">
                                     <FileText size={24} className="text-[#57534e] group-hover:text-[#ff4d00] mb-3 transition-colors" />
                                     <h4 className="text-xs font-bold text-[#e7e5e4] uppercase mb-1">Export Log</h4>
                                     <p className="text-[9px] text-[#78716c]">Download daily report</p>
                                 </div>
                             </div>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-[9px] text-[#44403c] font-mono uppercase">End of Line // Sector 9 Secure Environment</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

