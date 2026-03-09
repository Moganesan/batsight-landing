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
      "DAEMON_RESTART_PID_492",
      "DATA_PIPELINE_SYNC: OK",
      "CLUSTER_NODE_JOIN: eu-west-2",
      "INFERENCE_LATENCY: 3.2ms",
      "CACHE_HIT_RATIO: 97.4%",
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
    <div className={`relative ${height} w-full bg-s9-bg overflow-hidden font-mono text-[10px] p-5 text-white/40`}>
      <Scanline />
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <span className="text-[8px] text-white/15 uppercase tracking-[0.15em]">Live</span>
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
      </div>
      <div className="flex flex-col justify-end h-full space-y-1">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-2 opacity-60 hover:opacity-100 hover:text-white/80 transition-colors cursor-crosshair">
            <span className="text-white/15">{(i + 100).toString(16).toUpperCase()}:</span>
            <span>{line}</span>
          </div>
        ))}
        <div className="flex gap-2">
           <span className="text-white/60">{'>'}</span>
           <span className="animate-pulse bg-white/50 w-2 h-3 block"></span>
        </div>
      </div>
    </div>
  );
};
