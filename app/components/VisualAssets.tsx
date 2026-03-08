export const NoiseOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
    }}
  />
);

export const Scanline = () => (
  <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-transparent via-[rgba(148,163,184,0.03)] to-transparent bg-[length:100%_4px] animate-scan" />
);

export const SectionLabel = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="h-[1px] w-8 bg-sector-accent"></div>
    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-sector-muted">{text}</span>
  </div>
);

export const WorldMapSVG = () => (
  <svg viewBox="0 0 1000 500" className="w-full h-full opacity-30">
    <defs>
      <pattern id="dot-pattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" className="fill-[#334155]" />
      </pattern>
    </defs>
    <path
      d="M180,140 L200,130 L230,140 L250,120 L280,80 L320,70 L350,60 L380,60 L400,70 L380,100 L350,120 L320,140 L300,160 L280,180 L270,210 L260,250 L280,280 L300,320 L320,360 L340,400 L330,430 L300,420 L280,400 L260,380 L250,350 L240,310 L230,280 L210,240 L200,210 L180,180 L170,160 Z
         M450,100 L480,90 L520,90 L550,80 L580,90 L600,120 L620,150 L600,180 L580,190 L550,200 L520,190 L500,170 L480,150 L460,130 Z
         M560,250 L580,240 L620,240 L650,250 L680,280 L700,320 L680,360 L650,380 L620,370 L590,350 L570,320 L560,290 Z
         M750,100 L780,80 L820,80 L860,90 L900,120 L920,160 L900,200 L880,220 L850,230 L820,210 L800,180 L780,150 L760,130 Z
         M850,300 L880,290 L910,300 L920,330 L900,350 L880,340 L860,320 Z"
      fill="url(#dot-pattern)"
    />
    <rect width="1000" height="500" fill="url(#dot-pattern)" mask="url(#map-mask)" />
  </svg>
);

export const MapNode = ({ x, y, label, delay }: { x: number; y: number; label: string; delay: number }) => (
  <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
    <div className="relative">
      <div className="absolute -inset-4 border border-sector-accent rounded-full opacity-0 animate-ping-slow" style={{ animationDelay: `${delay}s` }}></div>
      <div className="absolute -inset-8 border border-sector-accent rounded-full opacity-0 animate-ping-slower" style={{ animationDelay: `${delay}s` }}></div>
      <div className="w-2 h-2 bg-sector-accent rounded-full relative z-10">
        <div className="absolute inset-0 bg-sector-accent animate-ping opacity-75"></div>
      </div>
      <div className="absolute top-2 left-2">
        <div className="h-[1px] w-8 bg-sector-border rotate-[-45deg] origin-top-left"></div>
        <div className="absolute top-[-20px] left-[20px] bg-sector-bg border border-sector-border px-1.5 py-0.5 whitespace-nowrap z-20">
          <span className="text-[8px] text-green-500 font-mono uppercase tracking-wider block">{label}</span>
        </div>
      </div>
    </div>
  </div>
);
