'use client';

import { Command, Zap, GitBranch, Box, Thermometer, Fan, Activity } from 'lucide-react';
import { SectionLabel } from './VisualAssets';

export const SystemLayerView = () => (
    <div className="p-6 animate-in fade-in zoom-in duration-300 max-w-[1600px] mx-auto w-full">
        <div className="mb-8 border-b border-[#292524] pb-6">
             <SectionLabel text="Kernel Operations" />
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-[#e7e5e4] uppercase tracking-tight mb-2">System Topology</h2>
                    <p className="text-xs text-[#78716c] font-mono max-w-2xl">
                        REAL-TIME KERNEL METRICS. SERVICE MESH TOPOLOGY.<br/>
                        HARDWARE ABSTRACTION LAYER STATUS: ONLINE.
                    </p>
                </div>
                <div className="flex gap-4">
                     <button className="border border-[#44403c] bg-[#1c1917] px-4 py-2 text-[10px] font-bold uppercase text-[#e7e5e4] hover:border-[#ff4d00] transition-colors flex items-center gap-2">
                        <Command size={14} /> Root Terminal
                     </button>
                     <button className="bg-[#ff4d00] text-black px-4 py-2 text-[10px] font-bold uppercase hover:bg-[#e7e5e4] transition-colors flex items-center gap-2">
                        <Zap size={14} className="fill-current" /> Restart Daemon
                     </button>
                </div>
             </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-[#0c0a09] border border-[#292524] relative overflow-hidden min-h-[400px] group">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#ff4d00]"></div>
                <div className="absolute top-4 left-4 z-20">
                    <span className="text-[9px] font-mono text-[#78716c] uppercase tracking-widest flex items-center gap-2">
                        <GitBranch size={12} /> Service Mesh
                    </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="100%" height="100%" viewBox="0 0 800 400" className="opacity-80">
                        <g stroke="#292524" strokeWidth="1">
                            <path d="M400 50 L 200 150" />
                            <path d="M400 50 L 600 150" />
                            <path d="M200 150 L 100 300" />
                            <path d="M200 150 L 300 300" />
                            <path d="M600 150 L 500 300" />
                            <path d="M600 150 L 700 300" />
                            <path d="M300 300 L 500 300" strokeDasharray="4" className="animate-pulse" />
                        </g>
                        
                        {[
                            { x: 400, y: 50, type: 'Master' },
                            { x: 200, y: 150, type: 'Relay' },
                            { x: 600, y: 150, type: 'Relay' },
                            { x: 100, y: 300, type: 'Node' },
                            { x: 300, y: 300, type: 'Node' },
                            { x: 500, y: 300, type: 'Node' },
                            { x: 700, y: 300, type: 'Node' },
                        ].map((node, i) => (
                            <g key={i} className="group/node cursor-pointer hover:opacity-100 transition-opacity">
                                <circle cx={node.x} cy={node.y} r="6" className="fill-[#1c1917] stroke-[#ff4d00] stroke-2" />
                                <circle cx={node.x} cy={node.y} r="12" className="fill-transparent stroke-[#ff4d00] stroke-[0.5] opacity-30 group-hover/node:opacity-100 group-hover/node:animate-ping-slow" />
                                <text x={node.x + 15} y={node.y + 4} className="fill-[#57534e] text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover/node:opacity-100 transition-opacity">{node.type}_{i}</text>
                            </g>
                        ))}
                    </svg>
                </div>

                <div className="absolute bottom-0 right-0 p-4 text-right">
                    <div className="text-[9px] text-[#57534e] font-mono uppercase">Mesh Health: <span className="text-green-500">100%</span></div>
                    <div className="text-[9px] text-[#57534e] font-mono uppercase">Active Routes: <span className="text-[#e7e5e4]">128</span></div>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-6 flex flex-col h-full">
                <div className="bg-[#1c1917] border border-[#292524] p-4">
                    <h3 className="text-xs font-bold text-[#e7e5e4] uppercase mb-4 flex items-center gap-2">
                        <Box size={14} className="text-[#ff4d00]" /> Hardware Metrics
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-[9px] uppercase text-[#78716c] mb-1">
                                <span className="flex items-center gap-1"><Thermometer size={10} /> Core Temp</span>
                                <span className="text-[#e7e5e4] font-mono">68°C</span>
                            </div>
                            <div className="h-1.5 w-full bg-[#0c0a09] rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-green-500 to-yellow-500 w-[65%]"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-[9px] uppercase text-[#78716c] mb-1">
                                <span className="flex items-center gap-1"><Fan size={10} /> Fan Speed</span>
                                <span className="text-[#e7e5e4] font-mono">4200 RPM</span>
                            </div>
                            <div className="h-1.5 w-full bg-[#0c0a09] rounded-full overflow-hidden">
                                <div className="h-full bg-[#57534e] w-[80%]"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2">
                            <div className="bg-[#0c0a09] p-2 border border-[#292524] text-center">
                                <div className="text-[9px] text-[#57534e] uppercase">Voltage</div>
                                <div className="text-xs font-mono text-[#e7e5e4]">1.24V</div>
                            </div>
                            <div className="bg-[#0c0a09] p-2 border border-[#292524] text-center">
                                <div className="text-[9px] text-[#57534e] uppercase">Uptime</div>
                                <div className="text-xs font-mono text-[#e7e5e4]">14d 2h</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0c0a09] border border-[#292524] flex-1 flex flex-col overflow-hidden">
                    <div className="p-3 border-b border-[#292524] bg-[#12100f] flex justify-between items-center">
                        <h3 className="text-[10px] font-bold text-[#e7e5e4] uppercase">Active Processes</h3>
                        <Activity size={12} className="text-[#57534e]" />
                    </div>

                    <div className="flex-1 overflow-y-auto p-0 scrollbar-thin scrollbar-thumb-[#292524]">
                        <table className="w-full text-left border-collapse">
                            <thead className="sticky top-0 bg-[#1c1917] text-[8px] uppercase text-[#78716c] font-mono tracking-wider">
                                <tr>
                                    <th className="p-2 font-normal border-b border-[#292524]">PID</th>
                                    <th className="p-2 font-normal border-b border-[#292524]">Name</th>
                                    <th className="p-2 font-normal border-b border-[#292524] text-right">CPU</th>
                                    <th className="p-2 font-normal border-b border-[#292524] text-right">Mem</th>
                                </tr>
                            </thead>
                            <tbody className="text-[9px] font-mono text-[#a8a29e]">
                                {[
                                    { pid: 1024, name: "kernel_task", cpu: "4.2%", mem: "1.2GB" },
                                    { pid: 8821, name: "sentinel_d", cpu: "12.1%", mem: "400MB", highlight: true },
                                    { pid: 4492, name: "net_filter", cpu: "0.8%", mem: "64MB" },
                                    { pid: 3310, name: "crypt_wkr", cpu: "8.5%", mem: "210MB" },
                                    { pid: 1102, name: "db_shard_0", cpu: "2.1%", mem: "1.8GB" },
                                    { pid: 5501, name: "node_rly", cpu: "0.2%", mem: "32MB" },
                                    { pid: 7729, name: "auth_svc", cpu: "0.1%", mem: "45MB" },
                                    { pid: 9912, name: "log_rot", cpu: "0.0%", mem: "12MB" },
                                    { pid: 2201, name: "ui_render", cpu: "1.5%", mem: "120MB" },
                                ].map((proc, i) => (
                                    <tr key={i} className={`border-b border-[#292524]/50 hover:bg-[#1c1917] transition-colors ${proc.highlight ? 'text-[#e7e5e4] bg-[#1c1917]/50' : ''}`}>
                                        <td className="p-2 text-[#57534e]">{proc.pid}</td>
                                        <td className="p-2">{proc.name}</td>
                                        <td className="p-2 text-right">{proc.cpu}</td>
                                        <td className="p-2 text-right">{proc.mem}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
);





