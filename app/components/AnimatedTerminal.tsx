'use client';

import { useState, useEffect } from 'react';
import { Scanline } from './VisualAssets';

export const AnimatedTerminal = ({ height = "h-full" }: { height?: string }) => {
  const [lines, setLines] = useState([
    "SYS_BOOT_SEQUENCE_INIT...",
    "LOADING_KERNEL_MODULES...",
    "MOUNTING_VIRTUAL_FS...",
    "ETH0: LINK_UP 1000MBPS_FULL_DUPLEX",
  ]);

  useEffect(() => {
    const phrases = [
      "ANALYZING_PACKET_HEADER_0x4F...",
      "NEURAL_WEIGHTS_UPDATED",
      "ANOMALY_SCORE: 0.0002 [NEGLIGIBLE]",
      "ENCRYPTING_STREAM_BUFFER...",
      "GARBAGE_COLLECTION_RUNNING...",
      "TRAFFIC_SHAPING_ACTIVE",
      "FIREWALL_RULE_ADDED: BLOCK_IP",
      "HEURISTIC_SCAN_COMPLETE",
      "TOKEN_REFRESH_SUCCESS",
      "DAEMON_RESTART_PID_492"
    ];

    const interval = setInterval(() => {
      setLines(prev => {
        const newLines = [...prev, phrases[Math.floor(Math.random() * phrases.length)]];
        if (newLines.length > 14) return newLines.slice(1);
        return newLines;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${height} w-full bg-[#1c1917] overflow-hidden font-mono text-[10px] p-4 text-[#a8a29e] border-l border-[#44403c]`}>
      <Scanline />
      <div className="absolute top-2 right-2 text-[#ff4d00] animate-pulse">
        <div className="w-2 h-2 bg-[#ff4d00]" />
      </div>
      <div className="flex flex-col justify-end h-full space-y-1">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-2 opacity-80 hover:opacity-100 hover:text-[#ff4d00] transition-colors cursor-crosshair">
            <span className="text-[#44403c]">{(i + 100).toString(16).toUpperCase()}:</span>
            <span>{line}</span>
          </div>
        ))}
        <div className="flex gap-2">
           <span className="text-[#ff4d00]">{'>'}</span>
           <span className="animate-pulse bg-[#a8a29e] w-2 h-3 block"></span>
        </div>
      </div>
    </div>
  );
};

