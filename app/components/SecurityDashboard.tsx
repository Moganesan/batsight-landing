'use client';

import { useState, useEffect } from 'react';
import { Shield, Activity, Wifi, Cpu } from 'lucide-react';

export const SecurityDashboard = () => {
  const [stats, setStats] = useState({
    threats: 8492,
    bandwidth: 2.4,
    cpu: 42
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        const newThreats = prev.threats + (Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0);
        const newBandwidth = Math.max(1.0, Math.min(5.0, prev.bandwidth + (Math.random() - 0.5) * 0.4));
        const newCpu = Math.max(10, Math.min(90, prev.cpu + Math.floor((Math.random() - 0.5) * 10)));
        return {
          threats: newThreats,
          bandwidth: parseFloat(newBandwidth.toFixed(1)),
          cpu: newCpu
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#0c0a09] border border-[#44403c] p-4 font-sans select-none relative z-20 group flex flex-col">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#ff4d00]"></div>
        <div className="flex justify-between items-center mb-4 border-b border-[#292524] pb-2">
            <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-none bg-[#ff4d00] animate-pulse"></div>
                 <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716c]">Node_Connected</span>
            </div>
            <Activity size={12} className="text-[#44403c] animate-pulse" />
        </div>
        <div className="bg-[#1c1917] border border-[#292524] p-4 mb-3 relative overflow-hidden group hover:border-[#44403c] transition-colors flex-grow">
            <div className="flex justify-between items-start mb-2">
                <span className="bg-[#000] text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide border border-[#292524]">Today</span>
                <span className="text-[9px] font-mono text-[#57534e] animate-pulse">THREATS_BLOCKED</span>
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-3xl font-bold text-[#e7e5e4] font-mono tabular-nums tracking-tight">
                        {stats.threats.toLocaleString()}
                    </div>
                    <div className="text-[9px] text-[#78716c] uppercase mt-1">Packet Anomalies</div>
                    <div className="text-[9px] text-[#ff4d00] mt-2 font-mono">98.4% EFFICIENT</div>
                </div>
                <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90 animate-spin-slow" viewBox="0 0 36 36">
                        <path className="text-[#292524]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                        <path className="text-[#ff4d00]" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                    </svg>
                    <Shield size={12} className="text-[#e7e5e4] absolute z-10" />
                </div>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#ff4d00] p-3 text-black relative overflow-hidden">
                 <div className="absolute inset-0 opacity-10 animate-scroll-diag bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIiAvPjwvc3ZnPg==')]"></div>
                 <div className="flex justify-between items-start relative z-10">
                    <span className="text-[9px] font-bold uppercase tracking-wide">Bandwidth</span>
                    <Wifi size={10} />
                 </div>
                 <div className="mt-4 relative z-10">
                    <div className="text-2xl font-bold font-mono leading-none flex items-baseline gap-0.5 tabular-nums">
                        <span className="animate-pulse">{stats.bandwidth.toFixed(1)}</span>
                        <span className="text-xs opacity-50">GB/s</span>
                    </div>
                 </div>
            </div>
            <div className="bg-[#1c1917] border border-[#292524] p-3 flex flex-col justify-between group hover:border-[#44403c] transition-colors">
                 <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-mono text-[#78716c] uppercase">CPU</span>
                    <Cpu size={10} className="text-[#57534e]" />
                 </div>
                 <div className="text-xl font-mono text-[#e7e5e4] mb-1 tabular-nums">{stats.cpu}%</div>
                 <div className="flex items-end gap-[2px] h-4 overflow-hidden">
                     {[20, 45, 30, 60, 35, 50, 40, 70, 45, 30, 55, 40].map((h, i) => (
                        <div key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} className={`w-1 flex-1 animate-equalize origin-bottom ${i > 8 ? 'bg-[#ff4d00]' : 'bg-[#44403c]'}`}></div>
                     ))}
                 </div>
            </div>
        </div>
    </div>
  );
};

