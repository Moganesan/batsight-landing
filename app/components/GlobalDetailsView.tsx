'use client';

import { Globe, Zap, Grid, Layers, FileText, Hash, Activity } from 'lucide-react';
import { SectionLabel } from './VisualAssets';

export const GlobalDetailsView = () => (
    <div className="p-6 animate-in fade-in zoom-in duration-300 max-w-[1600px] mx-auto w-full">
        <div className="mb-8 border-b border-[#292524] pb-6">
             <SectionLabel text="Global Infrastructure" />
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-[#e7e5e4] uppercase tracking-tight mb-2">Network Intelligence</h2>
                    <p className="text-xs text-[#78716c] font-mono max-w-2xl">
                        DECENTRALIZED NODE TOPOLOGY ACROSS 45 ZONES. <br/>
                        MAINTAINING 99.999% UPTIME VIA REDUNDANT MESH ROUTING.
                    </p>
                </div>
                <div className="flex gap-4">
                     <button className="border border-[#44403c] bg-[#1c1917] px-4 py-2 text-[10px] font-bold uppercase text-[#e7e5e4] hover:border-[#ff4d00] transition-colors flex items-center gap-2">
                        <Globe size={14} /> Live Map View
                     </button>
                     <button className="bg-[#ff4d00] text-black px-4 py-2 text-[10px] font-bold uppercase hover:bg-[#e7e5e4] transition-colors flex items-center gap-2">
                        <Zap size={14} className="fill-current" /> Deploy New Node
                     </button>
                </div>
             </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
                { label: "Active Zones", value: "45", delta: "+2" },
                { label: "Total Nodes", value: "12,492", delta: "+124" },
                { label: "Avg Latency", value: "24ms", delta: "-2ms", good: true },
                { label: "Packet Load", value: "45.2 TB/s", delta: "+12%" }
            ].map((stat, i) => (
                <div key={i} className="bg-[#1c1917] border border-[#292524] p-4 group hover:border-[#ff4d00] transition-colors relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Activity size={12} className="text-[#ff4d00]" />
                     </div>
                    <div className="text-[9px] text-[#57534e] uppercase tracking-widest mb-1">{stat.label}</div>
                    <div className="text-2xl font-mono text-[#e7e5e4] mb-1">{stat.value}</div>
                    <div className={`text-[9px] font-mono ${stat.good ? 'text-green-500' : 'text-[#78716c]'}`}>{stat.delta} <span className="opacity-50">vs last 24h</span></div>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#0c0a09] border border-[#292524] p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#ff4d00]"></div>
                <h3 className="text-lg font-bold text-[#e7e5e4] uppercase mb-6 flex items-center gap-2">
                    <Grid size={16} className="text-[#ff4d00]" /> Regional Status
                </h3>

                <div className="space-y-0">
                    <div className="flex items-center justify-between border-b border-[#292524] pb-2 mb-2 text-[9px] uppercase text-[#57534e] font-bold tracking-wider">
                        <span>Zone Name</span>
                        <div className="flex gap-8 mr-2">
                            <span className="w-12 text-right">Latency</span>
                            <span className="w-20 text-right">Load</span>
                            <span className="w-24 text-right">Status</span>
                        </div>
                    </div>

                    {[
                        { name: "US-EAST-1 (N. Virginia)", status: "OPERATIONAL", latency: "12ms", load: "45%" },
                        { name: "EU-WEST-2 (London)", status: "OPERATIONAL", latency: "18ms", load: "32%" },
                        { name: "AP-NORTHEAST-1 (Tokyo)", status: "REROUTING", latency: "45ms", load: "88%", color: "text-yellow-500" },
                        { name: "SA-EAST-1 (São Paulo)", status: "OPERATIONAL", latency: "65ms", load: "24%" },
                        { name: "CN-NORTH-1 (Beijing)", status: "MAINTENANCE", latency: "--", load: "0%", color: "text-[#ff4d00]" },
                        { name: "AF-SOUTH-1 (Cape Town)", status: "OPERATIONAL", latency: "82ms", load: "15%" },
                        { name: "EU-CENTRAL-1 (Frankfurt)", status: "OPERATIONAL", latency: "22ms", load: "41%" },
                    ].map((region, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-[#292524]/50 text-xs font-mono hover:bg-[#1c1917] px-2 -mx-2 transition-colors cursor-pointer group">
                            <span className="text-[#a8a29e] group-hover:text-[#e7e5e4] flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${region.status === 'OPERATIONAL' ? 'bg-green-500' : region.color ? region.color.replace('text-', 'bg-') : 'bg-gray-500'}`}></div>
                                {region.name}
                            </span>

                            <div className="flex gap-8 mr-2">
                                <span className="text-[#57534e] w-12 text-right">{region.latency}</span>
                                <div className="w-20 flex items-center gap-2">
                                    <div className="flex-1 h-1 bg-[#292524] overflow-hidden">
                                        <div className="h-full bg-[#57534e]" style={{width: region.load}}></div>
                                    </div>
                                    <span className="text-[9px] w-6 text-right">{region.load}</span>
                                </div>
                                <span className={`w-24 text-right font-bold text-[9px] ${region.color || 'text-green-500'}`}>{region.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="bg-[#1c1917] border border-[#292524] p-6 flex flex-col justify-between flex-1 relative group">
                     <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Layers size={64} />
                     </div>

                     <div>
                        <h3 className="text-lg font-bold text-[#e7e5e4] uppercase mb-4 flex items-center gap-2">
                            <Layers size={16} className="text-[#ff4d00]" /> Protocol Specs
                        </h3>

                        <ul className="space-y-6 text-[10px] text-[#a8a29e] font-mono uppercase leading-relaxed">
                            <li className="border-l-2 border-[#44403c] pl-4 relative">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#44403c] rounded-full"></div>
                                <strong className="text-[#e7e5e4] block mb-1 text-xs">Encryption Standard</strong>
                                AES-256-GCM with 4096-bit RSA Key Exchange. Zero-knowledge proof architecture ensures data privacy at rest and in transit.
                            </li>

                            <li className="border-l-2 border-[#44403c] pl-4 relative">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#44403c] rounded-full"></div>
                                <strong className="text-[#e7e5e4] block mb-1 text-xs">Threat Heuristics</strong>
                                Real-time anomaly detection using unsupervised learning models (Isolation Forest). Updates propagated globally in &lt;500ms.
                            </li>

                             <li className="border-l-2 border-[#44403c] pl-4 relative">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#44403c] rounded-full"></div>
                                <strong className="text-[#e7e5e4] block mb-1 text-xs">Compliance</strong>
                                SOC2 Type II, GDPR, HIPAA, ISO 27001 Certified.
                            </li>
                        </ul>
                     </div>

                     <div className="mt-8 pt-4 border-t border-[#292524] flex justify-between items-center">
                        <span className="text-[9px] text-[#57534e] flex items-center gap-1"><Hash size={10} /> FIRMWARE: V.2.0.4</span>
                        <button className="text-[9px] border border-[#44403c] px-3 py-1.5 text-[#e7e5e4] hover:bg-[#e7e5e4] hover:text-black transition-colors uppercase flex items-center gap-2">
                            <FileText size={10} /> Download Whitepaper
                        </button>
                     </div>
                </div>

                 <div className="bg-[#ff4d00] text-black p-6 flex items-center justify-between relative overflow-hidden">
                     <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIiAvPjwvc3ZnPg==')]"></div>
                     <div className="relative z-10">
                         <h4 className="font-bold uppercase text-lg mb-1">Enterprise Node</h4>
                         <p className="text-[10px] font-mono opacity-80">Dedicate hardware for <br/>maximum throughput.</p>
                     </div>
                     <button className="relative z-10 bg-black text-white px-4 py-2 text-[10px] font-bold uppercase hover:bg-white hover:text-black transition-colors">
                         Upgrade
                     </button>
                 </div>
            </div>
        </div>
    </div>
);





