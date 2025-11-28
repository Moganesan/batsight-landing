'use client';

import { Database, Zap, FileText } from 'lucide-react';
import { SectionLabel } from './VisualAssets';

export const DataLayerView = () => (
    <div className="p-6 animate-in fade-in zoom-in duration-300 max-w-[1600px] mx-auto w-full">
        <div className="mb-8 border-b border-[#292524] pb-6">
             <SectionLabel text="Data Layer Architecture" />
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-[#e7e5e4] uppercase tracking-tight mb-2">Encrypted Vault</h2>
                    <p className="text-xs text-[#78716c] font-mono max-w-2xl">
                        IMMUTABLE LEDGER STORAGE. SHARDED ACROSS DECENTRALIZED NODES.<br/>
                        ZERO-KNOWLEDGE PROOF VERIFICATION ACTIVE.
                    </p>
                </div>
                <div className="flex gap-4">
                     <button className="border border-[#44403c] bg-[#1c1917] px-4 py-2 text-[10px] font-bold uppercase text-[#e7e5e4] hover:border-[#ff4d00] transition-colors flex items-center gap-2">
                        <Database size={14} /> Query Builder
                     </button>
                     <button className="bg-[#ff4d00] text-black px-4 py-2 text-[10px] font-bold uppercase hover:bg-[#e7e5e4] transition-colors flex items-center gap-2">
                        <Zap size={14} className="fill-current" /> Flush Buffer
                     </button>
                </div>
             </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Total Storage", value: "8.4 PB", delta: "+12TB" },
                        { label: "Shard Count", value: "4,096", delta: "Stable" },
                        { label: "Encryption", value: "AES-256", delta: "Verified", good: true },
                        { label: "Query Time", value: "12ms", delta: "-2ms", good: true }
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#1c1917] border border-[#292524] p-4 group hover:border-[#ff4d00] transition-colors relative overflow-hidden">
                            <div className="text-[9px] text-[#57534e] uppercase tracking-widest mb-1">{stat.label}</div>
                            <div className="text-2xl font-mono text-[#e7e5e4] mb-1">{stat.value}</div>
                            <div className={`text-[9px] font-mono ${stat.good ? 'text-green-500' : 'text-[#78716c]'}`}>{stat.delta}</div>
                        </div>
                    ))}
                </div>

                <div className="bg-[#0c0a09] border border-[#292524] p-4 relative overflow-hidden h-64 font-mono text-[10px] text-[#57534e] leading-relaxed select-none">
                    <div className="absolute top-2 right-2 text-[#ff4d00] animate-pulse text-xs uppercase">Stream Active</div>
                    <div className="opacity-50">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="flex gap-4 border-b border-[#292524]/50 py-1">
                                <span className="text-[#44403c]">0x{Math.floor(Math.random()*10000000).toString(16).toUpperCase().padStart(8, '0')}</span>
                                <span>
                                    {Array.from({ length: 8 }).map(() => Math.floor(Math.random()*255).toString(16).toUpperCase().padStart(2, '0')).join(' ')}
                                </span>
                                <span className="text-[#a8a29e] hidden md:inline">
                                    {['SYS', 'DAT', 'ENC', 'KEY', 'LOG', 'ACK', 'SYN'].sort(() => 0.5 - Math.random()).slice(0, 4).join('.')}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#0c0a09] to-transparent"></div>
                </div>

                <div className="bg-[#1c1917] border border-[#292524] p-6">
                    <h3 className="text-xs font-bold text-[#e7e5e4] uppercase mb-4">Shard Integrity Map</h3>
                    <div className="grid grid-cols-8 gap-1">
                        {Array.from({ length: 64 }).map((_, i) => (
                            <div 
                                key={i} 
                                className={`h-3 w-full rounded-sm ${Math.random() > 0.95 ? 'bg-[#ff4d00] animate-pulse' : 'bg-[#292524] hover:bg-[#57534e] transition-colors'}`}
                                title={`Shard #${i}`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-[#0c0a09] border border-[#292524] p-0 flex flex-col h-full">
                <div className="p-4 border-b border-[#292524] flex justify-between items-center">
                    <h3 className="text-xs font-bold text-[#e7e5e4] uppercase">Access Logs</h3>
                    <FileText size={14} className="text-[#57534e]" />
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-[#292524]">
                    {[
                        { time: "10:42:01", user: "ADMIN_01", action: "WRITE_BLOCK", status: "SUCCESS" },
                        { time: "10:41:55", user: "SYSTEM", action: "AUTO_BACKUP", status: "SUCCESS" },
                        { time: "10:41:12", user: "USR_8829", action: "READ_QUERY", status: "SUCCESS" },
                        { time: "10:40:05", user: "UNKNOWN", action: "AUTH_ATTEMPT", status: "DENIED", color: "text-[#ff4d00]" },
                        { time: "10:39:42", user: "NODE_04", action: "SYNC_STATE", status: "SUCCESS" },
                        { time: "10:38:11", user: "ADMIN_02", action: "CONFIG_UPD", status: "PENDING", color: "text-yellow-500" },
                        { time: "10:35:00", user: "SYSTEM", action: "GC_COLLECT", status: "SUCCESS" },
                        { time: "10:32:22", user: "USR_9910", action: "READ_QUERY", status: "SUCCESS" },
                        { time: "10:28:45", user: "NODE_02", action: "HEARTBEAT", status: "SUCCESS" },
                    ].map((log, i) => (
                        <div key={i} className="flex justify-between items-center text-[9px] font-mono border-b border-[#292524]/50 pb-2 last:border-0">
                            <div className="flex flex-col">
                                <span className="text-[#57534e]">{log.time}</span>
                                <span className="text-[#e7e5e4]">{log.action}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-[#78716c] block">{log.user}</span>
                                <span className={`${log.color || 'text-green-500'} font-bold`}>{log.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);





