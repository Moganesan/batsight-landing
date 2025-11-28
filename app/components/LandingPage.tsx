'use client';

import { Disc, ChevronRight, Globe, Hash, Zap, Lock, AlertCircle, Activity, Cpu } from 'lucide-react';
import { AnimatedTerminal } from './AnimatedTerminal';
import { SecurityDashboard } from './SecurityDashboard';
import { SectionLabel, WorldMapSVG, MapNode } from './VisualAssets';

const BentoItem = ({ className, title, subtitle, icon: Icon, children, dark = false }: {
  className?: string;
  title: string;
  subtitle: string;
  icon?: any;
  children: React.ReactNode;
  dark?: boolean;
}) => (
  <div className={`relative group border border-[#44403c] p-5 flex flex-col justify-between transition-all duration-300 hover:border-[#ff4d00] ${dark ? 'bg-[#1c1917]' : 'bg-[#0c0a09]'} ${className}`}>
    <div className="absolute top-0 left-0 w-1 h-1 bg-[#44403c] group-hover:bg-[#ff4d00] transition-colors"></div>
    <div className="absolute top-0 right-0 w-1 h-1 bg-[#44403c] group-hover:bg-[#ff4d00] transition-colors"></div>
    <div className="absolute bottom-0 left-0 w-1 h-1 bg-[#44403c] group-hover:bg-[#ff4d00] transition-colors"></div>
    <div className="absolute bottom-0 right-0 w-1 h-1 bg-[#44403c] group-hover:bg-[#ff4d00] transition-colors"></div>

    <div className="flex justify-between items-start z-10">
      <div>
        <h3 className="font-bold text-sm text-[#e7e5e4] uppercase tracking-tight mb-1">{title}</h3>
        <p className="text-[10px] text-[#78716c] leading-tight max-w-[160px]">{subtitle}</p>
      </div>
      {Icon && <Icon size={14} className="text-[#57534e] group-hover:text-[#ff4d00] transition-colors" />}
    </div>

    <div className="relative mt-4 flex-grow">
      {children}
    </div>
  </div>
);

export const LandingPage = ({ onNavigate }: { onNavigate: (view: 'landing' | 'login' | 'dashboard') => void }) => {
  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0c0a09]/90 backdrop-blur-sm border-b border-[#292524] h-10 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-2 h-2 bg-[#ff4d00]"></div>
          <span className="font-mono text-xs font-bold tracking-widest text-[#e7e5e4]">SECTOR_9</span>
        </div>
        <nav className="hidden md:flex gap-8">
          {[
            { label: 'Platform', href: '#hero' },
            { label: 'Capabilities', href: '#capabilities' },
            { label: 'Specs', href: '#specs' },
          ].map((item) => (
            <a key={item.label} href={item.href} className="text-[10px] uppercase tracking-widest text-[#78716c] hover:text-[#ff4d00] transition-colors">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex gap-4 items-center">
          <button onClick={() => onNavigate('login')} className="text-[10px] uppercase tracking-widest text-[#78716c] hover:text-[#ff4d00] transition-colors">
            Login
          </button>
          <button className="bg-[#292524] hover:bg-[#ff4d00] hover:text-black transition-all text-[10px] uppercase px-3 py-1 border border-[#44403c]">
            Get Access
          </button>
        </div>
      </header>

      <main className="pt-20 pb-20 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen">
        {/* Hero Section */}
        <div id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4 min-h-[500px]">
          {/* Hero Text */}
          <div className="lg:col-span-8 border border-[#292524] bg-[#12100f] p-8 relative flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Disc size={120} className="animate-spin-slow text-[#44403c]" />
            </div>
            
            <div>
              <div className="inline-block border border-[#ff4d00] text-[#ff4d00] px-2 py-1 text-[9px] font-mono mb-6">
                V.2.0.4 STABLE
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-[#e7e5e4] leading-[0.85] mb-6">
                NULL<br/>
                POINTER<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#44403c] to-transparent">EXCEPTION.</span>
              </h1>
              <p className="max-w-md text-xs text-[#a8a29e] leading-relaxed font-mono">
                // Autonomous cybersecurity mesh for decentralized infrastructure.
                <br/>
                // We protect the void between your data points.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-12">
              <button onClick={() => onNavigate('login')} className="bg-[#e7e5e4] text-black h-10 px-6 text-xs font-bold uppercase tracking-wide hover:bg-[#ff4d00] transition-colors flex items-center justify-center gap-2">
                Deploy Agent <ChevronRight size={12} />
              </button>
              <div className="h-10 border-b border-[#292524] flex items-end pb-2 gap-4">
                <div className="text-[9px] text-[#57534e] uppercase">Latency <span className="text-[#e7e5e4] block text-sm">4ms</span></div>
                <div className="text-[9px] text-[#57534e] uppercase">Threats <span className="text-[#e7e5e4] block text-sm">0</span></div>
              </div>
            </div>
          </div>

          {/* Animated Terminal Column */}
          <div className="lg:col-span-4 h-full min-h-[300px]">
            <AnimatedTerminal />
          </div>
        </div>

        {/* Marquee */}
        <div className="border-y border-[#292524] py-2 mb-12 bg-[#12100f] overflow-hidden">
          <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] font-mono text-[10px] text-[#57534e] uppercase tracking-[0.2em]">
            <span className="mx-12">System Integrity: 100%</span>
            <span className="mx-12">Encryption: AES-256-GCM</span>
            <span className="mx-12">Active Nodes: 4,291</span>
            <span className="mx-12">Last Breach: Never</span>
            <span className="mx-12">AI Model: Sentinel-X</span>
            <span className="mx-12">System Integrity: 100%</span>
            <span className="mx-12">Encryption: AES-256-GCM</span>
          </div>
        </div>

        {/* Bento Grid */}
        <div id="capabilities" className="scroll-mt-24">
          <SectionLabel text="System Capabilities" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 md:grid-rows-2 gap-3 h-auto md:h-[500px]">
            <BentoItem 
              className="md:col-span-2 md:row-span-2" 
              title="Global Threat Map" 
              subtitle="Real-time visualization of attack vectors."
              icon={Globe}
            >
              <div className="w-full h-full bg-[#000] border border-[#292524] relative overflow-hidden flex items-center justify-center group-hover:border-[#ff4d00]/50 transition-colors">
                <div className="absolute inset-0" style={{ 
                  backgroundImage: 'radial-gradient(#44403c 1px, transparent 1px)', 
                  backgroundSize: '20px 20px' 
                }}>
                </div>
                <div className="w-48 h-48 border border-[#292524] rounded-full flex items-center justify-center relative">
                  <div className="w-full h-[1px] bg-[#ff4d00] absolute top-1/2 left-0 animate-spin origin-center opacity-50"></div>
                  <div className="w-2 h-2 bg-[#ff4d00] rounded-full animate-pulse"></div>
                </div>
              </div>
            </BentoItem>

            <BentoItem 
              title="Neural Processing" 
              subtitle="Dedicated silicon for AI inference."
              icon={Cpu}
              dark
            >
              <div className="flex gap-1 mt-4 h-12 items-end">
                {[40, 60, 30, 80, 50, 90, 70, 40, 60, 85].map((h, i) => (
                  <div 
                    key={i} 
                    className="w-full bg-[#44403c] group-hover:bg-[#e7e5e4] transition-colors" 
                    style={{ height: `${h}%` }} 
                  />
                ))}
              </div>
            </BentoItem>

            <BentoItem 
              title="System Status" 
              subtitle="All systems operational."
              icon={Activity}
            >
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="bg-[#1c1917] p-2 border border-[#292524]">
                  <div className="text-[9px] text-[#57534e]">UPTIME</div>
                  <div className="text-xs text-[#ff4d00] font-mono">99.99%</div>
                </div>
                <div className="bg-[#1c1917] p-2 border border-[#292524]">
                  <div className="text-[9px] text-[#57534e]">LOAD</div>
                  <div className="text-xs text-[#e7e5e4] font-mono">12%</div>
                </div>
              </div>
            </BentoItem>

            <BentoItem 
              title="End-to-End" 
              subtitle="Zero-knowledge architecture."
              icon={Lock}
              dark
            >
              <div className="mt-4 font-mono text-[9px] text-[#57534e] overflow-hidden">
                001010101101010<br/>
                101101 <span className="bg-[#ff4d00] text-black px-1">LOCKED</span> 0101<br/>
                010101010101011
              </div>
            </BentoItem>

            <BentoItem 
              title="Active Alerts" 
              subtitle="No critical threats detected."
              icon={AlertCircle}
            >
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="text-[10px] text-[#78716c]">Secure</div>
              </div>
            </BentoItem>
          </div>
        </div>

        {/* Specs Section */}
        <div id="specs" className="mt-24 grid grid-cols-1 lg:grid-cols-3 border-t border-[#292524] scroll-mt-24">
          {[
            { label: "Protection Level", val: "Military Grade" },
            { label: "AI Response Time", val: "< 12ms" },
            { label: "Data Retention", val: "Encrypted / 30 Days" }
          ].map((spec, i) => (
            <div key={i} className="border-b lg:border-b-0 lg:border-r border-[#292524] p-8 hover:bg-[#12100f] transition-colors group">
              <div className="text-[9px] uppercase tracking-widest text-[#57534e] mb-2 flex items-center gap-2">
                <Hash size={10} />
                {spec.label}
              </div>
              <div className="text-xl font-mono text-[#a8a29e] group-hover:text-[#e7e5e4] transition-colors">
                {spec.val}
              </div>
            </div>
          ))}
        </div>

        {/* World Map Section */}
        <div className="mt-24 border border-[#292524] bg-[#0c0a09] relative h-[400px] overflow-hidden group">
          <div className="absolute top-6 left-6 z-20">
            <SectionLabel text="Global Threat Detection" />
            <h3 className="text-xl font-bold text-[#e7e5e4] uppercase tracking-tight">
              Active <span className="text-[#ff4d00]">Nodes</span>
            </h3>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pt-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <WorldMapSVG />
          </div>

          <MapNode x={28} y={38} label="New York" delay={0} />
          <MapNode x={49} y={32} label="London" delay={1} />
          <MapNode x={85} y={40} label="Tokyo" delay={2} />
          <MapNode x={32} y={75} label="Sao Paulo" delay={3} />
          <MapNode x={52} y={82} label="Cape Town" delay={1.5} />
          <MapNode x={75} y={65} label="Singapore" delay={2.5} />
        </div>

        {/* CTA Section */}
        <div className="mt-24 border border-[#292524] bg-[#1c1917] relative overflow-hidden group grid grid-cols-1 lg:grid-cols-2">
          <div className="relative lg:h-auto border-b lg:border-b-0 lg:border-r border-[#292524] bg-[#0c0a09] overflow-hidden flex items-center justify-center min-h-[400px] py-12 lg:py-0">
            <div className="absolute inset-0 opacity-10" style={{ 
              backgroundImage: 'radial-gradient(#44403c 1px, transparent 1px)', 
              backgroundSize: '10px 10px' 
            }}></div>
            
            <div className="scale-100 md:scale-110 lg:scale-125">
              <SecurityDashboard />
            </div>
          </div>

          <div className="p-12 md:p-16 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff4d00] rounded-full filter blur-[120px] opacity-[0.05] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-[#ff4d00] animate-pulse"></div>
                <span className="font-mono text-xs font-bold tracking-widest text-[#ff4d00]">READY_TO_DEPLOY</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-[#e7e5e4] uppercase tracking-tighter mb-6 leading-[0.9]">
                Secure Your<br/>Infrastructure
              </h2>
              
              <p className="text-xs text-[#a8a29e] font-mono max-w-md border-l border-[#44403c] pl-4 mb-10">
                INITIALIZE SENTINEL PROTOCOLS TODAY.<br/>
                NO CREDIT CARD REQUIRED FOR DEV ENVIRONMENTS.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => onNavigate('login')} className="bg-[#ff4d00] text-black h-14 px-8 text-xs font-bold uppercase tracking-wide hover:bg-[#e7e5e4] transition-colors flex items-center justify-center gap-2 min-w-[180px]">
                  <Zap size={16} fill="currentColor" /> Start Free Trial
                </button>
                <button className="border border-[#44403c] text-[#e7e5e4] h-14 px-8 text-xs font-bold uppercase tracking-wide hover:border-[#ff4d00] transition-colors min-w-[180px]">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#080706] py-12 px-4 md:px-8 border-t border-[#292524]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-end">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-[#44403c]"></div>
              <span className="font-mono text-xs font-bold tracking-widest text-[#57534e]">SECTOR_9</span>
            </div>
            <p className="text-[10px] text-[#44403c] max-w-xs uppercase leading-relaxed">
              Operating under international cyber-defense protocols.<br/>
              Authorized personnel only.
            </p>
          </div>
          <div className="text-[180px] leading-none font-black text-[#12100f] select-none pointer-events-none absolute bottom-0 right-0 -z-0 hidden lg:block">
            NULL
          </div>
        </div>
      </footer>
    </>
  );
};





