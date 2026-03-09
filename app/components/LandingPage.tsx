'use client';

import { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import dynamic from 'next/dynamic';
import {
  ChevronRight,
  Globe,
  Zap,
  Lock,
  AlertCircle,
  Activity,
  Cpu,
  X,
  ChevronDown,
  Database,
  BarChart3,
  Shield,
  Network,
  Layers,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { AnimatedTerminal } from './AnimatedTerminal';
import ParticleNetwork from './ParticleNetwork';
import { AnimatedCounter } from './AnimatedCounter';

const Globe3D = dynamic(() => import('./Globe3D'), { ssr: false });

// --- Animated entrance wrapper ---
function FadeIn({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const dirMap = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

// --- Glass card ---
const GlassCard = ({
  className = '',
  children,
  hover = true,
}: {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}) => (
  <div
    className={`
      relative bg-white/[0.02] backdrop-blur-sm
      border border-white/[0.06]
      shadow-card
      ${hover ? 'hover:bg-white/[0.04] hover:border-white/[0.12] hover:shadow-card-hover' : ''}
      transition-all duration-500
      ${className}
    `}
  >
    {children}
  </div>
);

// --- Bento card ---
const BentoItem = ({
  className,
  title,
  subtitle,
  icon: Icon,
  children,
}: {
  className?: string;
  title: string;
  subtitle: string;
  icon?: any;
  children: React.ReactNode;
}) => (
  <GlassCard className={`p-6 flex flex-col justify-between group ${className}`}>
    {/* Top gradient line */}
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="flex justify-between items-start z-10">
      <div>
        <h3 className="font-semibold text-sm text-s9-text-primary tracking-tight mb-1">
          {title}
        </h3>
        <p className="text-[11px] text-s9-text-muted leading-relaxed max-w-[200px]">{subtitle}</p>
      </div>
      {Icon && (
        <div className="p-2 bg-white/[0.03] border border-white/[0.06] group-hover:bg-white/[0.06] group-hover:border-white/[0.1] transition-all duration-500">
          <Icon size={14} className="text-s9-text-muted group-hover:text-s9-white transition-colors duration-500" />
        </div>
      )}
    </div>

    <div className="relative mt-4 flex-grow">{children}</div>
  </GlassCard>
);

// --- Section heading ---
const SectionHeading = ({ tag, title, description }: { tag: string; title: string; description?: string }) => (
  <div className="mb-14">
    <div className="flex items-center gap-3 mb-4">
      <div className="h-[1px] w-8 bg-gradient-to-r from-white/40 to-transparent" />
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-s9-text-muted">
        {tag}
      </span>
    </div>
    <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-gradient leading-tight">
      {title}
    </h2>
    {description && (
      <p className="text-sm text-s9-text-muted max-w-xl mt-4 leading-relaxed">
        {description}
      </p>
    )}
  </div>
);

// ========================
// MAIN LANDING PAGE
// ========================
export const LandingPage = ({
  onNavigate,
}: {
  onNavigate: (view: 'landing' | 'login' | 'dashboard') => void;
}) => {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    contactName: '',
    email: '',
    useCase: '',
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-6 md:px-10 bg-black/60 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
          <img className="w-44 brightness-0 invert opacity-90" src="/logo.png" alt="Logo" />
        </div>
        <nav className="hidden md:flex gap-8">
          {['Platform', 'Capabilities', 'Intelligence', 'Specs'].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="text-[11px] uppercase tracking-[0.12em] text-s9-text-muted hover:text-s9-white transition-colors duration-300 font-mono"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => { setShowForm(true); setSubmitted(false); }}
            className="bg-white text-black text-[11px] font-semibold uppercase tracking-wider px-5 py-2.5 hover:bg-white/90 transition-all duration-300 flex items-center gap-2"
          >
            Get Started <ArrowRight size={12} />
          </button>
        </div>
      </header>

      <main className="min-h-screen bg-s9-black">
        {/* ===== HERO ===== */}
        <div ref={heroRef} id="platform" className="relative min-h-screen flex items-center overflow-hidden">
          {/* Radial gradient from center */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-white/[0.02] blur-[150px] animate-glow-breathe" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-white/[0.03] to-transparent blur-[100px] animate-drift-1" />
          </div>

          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Particle network */}
          <ParticleNetwork className="opacity-30" />

          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pt-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
              {/* Left: Text */}
              <div className="flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center gap-3 mb-8"
                >
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-s9-text-muted">
                    Operational Intelligence Platform
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.04em] leading-[0.9] mb-8"
                >
                  <span className="text-gradient">Vision For</span>
                  <br />
                  <span className="text-gradient">Your </span>
                  <span className="text-gradient-subtle">Data</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="max-w-md text-[15px] text-s9-text-muted leading-relaxed mb-10"
                >
                  Connect to your data sources. Make data-driven decisions.
                  Act on insights across your entire enterprise — in real time.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button
                    onClick={() => { setShowForm(true); setSubmitted(false); }}
                    className="bg-white text-black h-12 px-8 text-[12px] font-semibold uppercase tracking-wider hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Request a Demo <ArrowRight size={14} />
                  </button>
                  <button className="h-12 px-8 text-[12px] font-semibold uppercase tracking-wider text-s9-text-primary border border-white/[0.12] hover:bg-white/[0.04] hover:border-white/[0.2] transition-all duration-300">
                    View Platform
                  </button>
                </motion.div>

                {/* Stats strip */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="flex gap-10 mt-14 pt-8 border-t border-white/[0.06]"
                >
                  {[
                    { label: 'Uptime', value: '99.9%' },
                    { label: 'Latency', value: '<4ms' },
                    { label: 'Data Sources', value: '50+' },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="text-xl font-mono font-semibold text-s9-white">{m.value}</div>
                      <div className="text-[10px] uppercase tracking-[0.15em] text-s9-text-faint font-mono mt-1">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right: 3D Globe */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative h-[500px] lg:h-[600px]"
              >
                <Globe3D />

                {/* Floating status cards */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-10 right-6 bg-black/60 backdrop-blur-xl border border-white/[0.08] shadow-elevated p-3 z-10"
                >
                  <div className="text-[9px] font-mono text-s9-text-faint uppercase tracking-wider">
                    Throughput
                  </div>
                  <div className="text-sm font-mono font-semibold text-s9-white">2.4M ops/s</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                  className="absolute bottom-20 left-6 bg-black/60 backdrop-blur-xl border border-white/[0.08] shadow-elevated p-3 z-10"
                >
                  <div className="text-[9px] font-mono text-s9-text-faint uppercase tracking-wider">
                    Status
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    <span className="text-sm font-mono font-semibold text-s9-white">Nominal</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-mono text-s9-text-faint uppercase tracking-[0.2em]">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent"
            />
          </motion.div>
        </div>

        {/* ===== MARQUEE ===== */}
        <div className="border-y border-white/[0.04] py-3 bg-s9-bg/50 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee font-mono text-[11px] text-s9-text-faint uppercase tracking-[0.15em]">
            {[
              'Manufacturing', 'Automotive & Mobility', 'Healthcare & Pharmaceuticals',
              'Financial Services & Banking', 'Energy & Utilities', 'Consumer Goods & Retail',
              'Telecommunications', 'Logistics & Supply Chain', 'Aviation & Aerospace',
              'Shipbuilding & Maritime', 'Semiconductor Manufacturing', 'Insurance',
              'Manufacturing', 'Automotive & Mobility', 'Healthcare & Pharmaceuticals',
              'Financial Services & Banking', 'Energy & Utilities', 'Consumer Goods & Retail',
              'Telecommunications', 'Logistics & Supply Chain', 'Aviation & Aerospace',
              'Shipbuilding & Maritime', 'Semiconductor Manufacturing', 'Insurance',
            ].map((item, i) => (
              <span key={i} className="mx-8 flex items-center gap-3">
                <span className="w-[3px] h-[3px] bg-white/20 rounded-full" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ===== CAPABILITIES BENTO ===== */}
        <section id="capabilities" className="py-28 px-6 md:px-10 max-w-[1400px] mx-auto scroll-mt-24">
          <FadeIn>
            <SectionHeading
              tag="Capabilities"
              title="360° View of Your Data"
              description="From raw data to real clarity. Integrate, analyze, and act on insights across your entire enterprise."
            />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 md:grid-rows-2 gap-4 h-auto md:h-[520px]">
            <FadeIn delay={0.05} className="md:col-span-2 md:row-span-2">
              <BentoItem
                className="h-full"
                title="See What You Normally Can't"
                subtitle="See the invisible. Fix the critical."
                icon={Globe}
              >
                <div className="w-full h-full bg-s9-black border border-white/[0.04] relative overflow-hidden flex items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  {/* Radar */}
                  <div className="w-48 h-48 border border-white/[0.06] rounded-full flex items-center justify-center relative">
                    <div className="absolute w-48 h-48 border border-white/[0.04] rounded-full" />
                    <div className="absolute w-32 h-32 border border-white/[0.03] rounded-full" />
                    <div className="absolute w-16 h-16 border border-white/[0.02] rounded-full" />
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent absolute top-1/2 left-0 animate-[spin_4s_linear_infinite] origin-center" />
                    <div className="w-2 h-2 bg-white rounded-full z-10 shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
                    {/* Blips */}
                    <div className="absolute w-1.5 h-1.5 bg-white/60 rounded-full top-8 right-14 animate-ping shadow-glow-sm" />
                    <div className="absolute w-1 h-1 bg-white/40 rounded-full bottom-14 left-12 animate-ping" style={{ animationDelay: '0.7s' }} />
                    <div className="absolute w-1 h-1 bg-white/30 rounded-full top-16 left-8 animate-ping" style={{ animationDelay: '1.4s' }} />
                  </div>
                </div>
              </BentoItem>
            </FadeIn>

            <FadeIn delay={0.1}>
              <BentoItem
                className="h-full"
                title="From Raw Data to Real Clarity"
                subtitle="Data you can finally look at."
                icon={BarChart3}
              >
                <div className="flex gap-[3px] mt-4 h-16 items-end">
                  {[40, 60, 30, 80, 50, 90, 70, 40, 60, 85, 45, 75].map((h, i) => (
                    <div
                      key={i}
                      className="w-full bg-white/[0.06] group-hover:bg-gradient-to-t group-hover:from-white/10 group-hover:to-white/30 transition-all duration-700"
                      style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }}
                    />
                  ))}
                </div>
              </BentoItem>
            </FadeIn>

            <FadeIn delay={0.15}>
              <BentoItem
                className="h-full"
                title="Trace Every Problem"
                subtitle="Find the root. Not just the surface."
                icon={Network}
              >
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-white/[0.02] p-2.5 border border-white/[0.06] group-hover:border-white/[0.12] transition-colors">
                    <div className="text-[9px] text-s9-text-faint font-mono">Source</div>
                    <div className="text-xs text-s9-white font-mono font-semibold">AWS S3</div>
                  </div>
                  <div className="bg-white/[0.02] p-2.5 border border-white/[0.06] group-hover:border-white/[0.12] transition-colors">
                    <div className="text-[9px] text-s9-text-faint font-mono">Root Cause</div>
                    <div className="text-xs text-s9-text-primary font-mono font-semibold">Public Access</div>
                  </div>
                </div>
              </BentoItem>
            </FadeIn>

            <FadeIn delay={0.2}>
              <BentoItem
                className="h-full"
                title="Analyse Everything"
                subtitle="Miss nothing."
                icon={Shield}
              >
                <div className="mt-4 font-mono text-[10px] text-white/[0.15] overflow-hidden leading-relaxed">
                  001010101101010<br />
                  101101 <span className="bg-white text-black px-1.5 py-0.5 font-semibold text-[9px]">LOCKED</span> 0101<br />
                  010101010101011<br />
                  110010 <span className="bg-white/10 text-white/60 px-1.5 py-0.5 font-semibold text-[9px]">SECURE</span> 1001
                </div>
              </BentoItem>
            </FadeIn>

            <FadeIn delay={0.25}>
              <BentoItem
                className="h-full"
                title="Make Decisions"
                subtitle="Act on insights."
                icon={AlertCircle}
              >
                <div className="mt-4 space-y-3">
                  {[
                    { opacity: 'bg-white', label: 'Fraud Escalation', status: 'CRITICAL' },
                    { opacity: 'bg-white/60', label: 'Transfer Initiated', status: 'CLEARED' },
                    { opacity: 'bg-white/30', label: 'Compliance Check', status: 'PENDING' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 ${item.opacity} rounded-full`} />
                        <span className="text-[10px] text-s9-text-muted">{item.label}</span>
                      </div>
                      <span className="text-[8px] font-mono text-s9-text-faint uppercase">{item.status}</span>
                    </div>
                  ))}
                </div>
              </BentoItem>
            </FadeIn>
          </div>
        </section>

        {/* ===== SPECS ===== */}
        <section id="specs" className="scroll-mt-24 border-y border-white/[0.04]">
          <div className="max-w-[1400px] mx-auto">
            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-4">
                {[
                  { label: 'Protection Level', value: 'Military', suffix: ' Grade', icon: Shield },
                  { label: 'AI Response Time', value: 12, suffix: 'ms', prefix: '< ', icon: Zap },
                  { label: 'Data Sources', value: 50, suffix: '+', icon: Database },
                  { label: 'Uptime SLA', value: 99.9, suffix: '%', icon: Activity },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="border-b md:border-b-0 md:border-r last:border-r-0 border-white/[0.04] p-10 hover:bg-white/[0.02] transition-all duration-500 group"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <spec.icon size={13} className="text-s9-text-faint group-hover:text-s9-text-subtle transition-colors" />
                      <span className="text-[10px] uppercase tracking-[0.15em] text-s9-text-faint font-mono">
                        {spec.label}
                      </span>
                    </div>
                    <div className="text-2xl font-mono font-semibold text-s9-text-secondary group-hover:text-s9-white transition-colors">
                      {typeof spec.value === 'number' ? (
                        <AnimatedCounter value={spec.value} suffix={spec.suffix} prefix={spec.prefix} />
                      ) : (
                        <>{spec.value}{spec.suffix}</>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== INTELLIGENCE CTA ===== */}
        <section id="intelligence" className="py-28 px-6 md:px-10 max-w-[1400px] mx-auto scroll-mt-24">
          <FadeIn>
            <GlassCard hover={false} className="overflow-hidden">
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: Data architecture viz */}
                <div className="relative border-b lg:border-b-0 lg:border-r border-white/[0.06] bg-s9-black overflow-hidden flex items-center justify-center min-h-[450px] py-12 lg:py-0">
                  <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                      backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
                      backgroundSize: '12px 12px',
                    }}
                  />
                  {/* Subtle center glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-white/[0.015] blur-[80px]" />

                  <div className="relative w-[340px] h-[320px] select-none">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 320" fill="none">
                      <line x1="50" y1="60" x2="170" y2="160" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <line x1="170" y1="40" x2="170" y2="160" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <line x1="290" y1="60" x2="170" y2="160" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <line x1="50" y1="260" x2="170" y2="160" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <line x1="290" y1="260" x2="170" y2="160" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      {/* Animated pulses */}
                      <circle r="2.5" fill="white" opacity="0.6">
                        <animateMotion dur="2s" repeatCount="indefinite" path="M50,60 L170,160" />
                      </circle>
                      <circle r="2.5" fill="white" opacity="0.4">
                        <animateMotion dur="2.4s" repeatCount="indefinite" begin="0.5s" path="M170,40 L170,160" />
                      </circle>
                      <circle r="2.5" fill="white" opacity="0.5">
                        <animateMotion dur="1.8s" repeatCount="indefinite" begin="1s" path="M290,60 L170,160" />
                      </circle>
                      <circle r="2.5" fill="white" opacity="0.3">
                        <animateMotion dur="2.2s" repeatCount="indefinite" begin="0.3s" path="M50,260 L170,160" />
                      </circle>
                      <circle r="2.5" fill="white" opacity="0.45">
                        <animateMotion dur="2.6s" repeatCount="indefinite" begin="0.8s" path="M290,260 L170,160" />
                      </circle>
                    </svg>

                    {/* Source nodes */}
                    {[
                      { x: 'left-0', y: 'top-6', label: 'SQL DB', sub: '4.2TB' },
                      { x: 'left-1/2 -translate-x-1/2', y: 'top-0', label: 'REST API', sub: '12k/s' },
                      { x: 'right-0', y: 'top-6', label: 'Data Lake', sub: '18.7TB' },
                      { x: 'left-0', y: 'bottom-6', label: 'Streams', sub: '920k/s' },
                      { x: 'right-0', y: 'bottom-6', label: 'Files', sub: '230GB' },
                    ].map((node) => (
                      <div key={node.label} className={`absolute ${node.x} ${node.y} flex flex-col items-center gap-1`}>
                        <div className="w-16 h-16 border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-300 flex flex-col items-center justify-center gap-0.5">
                          <div className="text-[9px] font-mono text-s9-text-secondary uppercase tracking-widest">{node.label}</div>
                          <div className="text-[9px] font-mono text-s9-white font-semibold">{node.sub}</div>
                        </div>
                      </div>
                    ))}

                    {/* Center AI node */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-20 h-20 border border-white/[0.2] bg-white/[0.04] flex flex-col items-center justify-center relative shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                        <div className="absolute inset-0 border border-white/[0.05] scale-110 animate-ping" style={{ animationDuration: '3s' }} />
                        <Cpu size={18} className="text-s9-white mb-1" />
                        <div className="text-[8px] font-mono text-s9-text-secondary uppercase tracking-widest">AI Core</div>
                      </div>
                    </div>

                    {/* Bottom metrics */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 border-t border-white/[0.06] pt-2 flex justify-between">
                      {[
                        { val: '99.9%', label: 'Uptime' },
                        { val: '4ms', label: 'Latency' },
                        { val: '50+', label: 'Sources' },
                      ].map((m) => (
                        <div key={m.label} className="text-center">
                          <div className="text-[9px] font-mono text-s9-white font-bold">{m.val}</div>
                          <div className="text-[8px] text-s9-text-faint uppercase">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: CTA */}
                <div className="p-12 md:p-16 flex flex-col justify-center relative overflow-hidden">
                  {/* Subtle glow */}
                  <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      <span className="font-mono text-[10px] font-semibold tracking-[0.15em] text-s9-text-muted uppercase">
                        Operational_Intelligence
                      </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-[-0.03em] mb-6 leading-[0.9]">
                      <span className="text-gradient">Foundational Software</span>
                      <br />
                      <span className="text-gradient-subtle">Delivered Today.</span>
                    </h2>

                    <p className="text-[13px] text-s9-text-muted max-w-md border-l border-white/[0.1] pl-4 mb-8 leading-relaxed font-mono">
                      Integrate data, decisions, and operations across your entire enterprise — in days, not years.
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-10">
                      {[
                        { label: 'Day 1 Value', desc: 'Measurable outcomes from first deployment', icon: Zap },
                        { label: 'AI Into Ops', desc: 'Infuse intelligence across every workflow', icon: Cpu },
                        { label: 'FedRAMP Ready', desc: 'Multi-layer security certifications', icon: Shield },
                        { label: '50+ Sectors', desc: 'Defense, finance, health & beyond', icon: Layers },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="border border-white/[0.06] p-4 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.12] transition-all duration-300 group/card"
                        >
                          <item.icon size={13} className="text-s9-text-faint mb-2 group-hover/card:text-s9-text-subtle transition-colors" />
                          <div className="text-[11px] font-semibold text-s9-text-primary uppercase tracking-wider mb-1">{item.label}</div>
                          <div className="text-[10px] text-s9-text-faint font-mono leading-relaxed">{item.desc}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => { setShowForm(true); setSubmitted(false); }}
                        className="bg-white text-black h-12 px-8 text-[12px] font-semibold uppercase tracking-wider hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Zap size={14} fill="currentColor" /> Request a Demo
                      </button>
                      <button className="border border-white/[0.12] text-s9-text-primary h-12 px-8 text-[12px] font-semibold uppercase tracking-wider hover:bg-white/[0.04] hover:border-white/[0.2] transition-all duration-300">
                        Schedule Bootcamp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        </section>

        {/* ===== TERMINAL ===== */}
        <section className="px-6 md:px-10 max-w-[1400px] mx-auto pb-28">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <GlassCard className="lg:col-span-1 p-8 flex flex-col justify-center" hover={false}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-6 bg-gradient-to-r from-white/30 to-transparent" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-s9-text-muted">
                    Live Feed
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gradient tracking-tight mb-3">
                  Real-Time System Intelligence
                </h3>
                <p className="text-sm text-s9-text-muted leading-relaxed">
                  Monitor every operation, trace every anomaly, and respond in milliseconds.
                </p>
              </GlassCard>
              <div className="lg:col-span-2 h-[350px] border border-white/[0.06] overflow-hidden shadow-card">
                <AnimatedTerminal height="h-full" />
              </div>
            </div>
          </FadeIn>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-s9-black border-t border-white/[0.04] px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto pt-16 pb-12 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <img className="w-36 mb-4 brightness-0 invert opacity-60" src="/logo.png" alt="Sector 9" />
            <p className="text-[11px] text-s9-text-faint leading-relaxed font-mono max-w-[200px]">
              Foundational software for data-driven decisions. Delivered today.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-s9-text-faint uppercase tracking-[0.12em]">
                All Systems Operational
              </span>
            </div>
          </div>

          {[
            { title: 'Platform', links: ['Data Foundry', 'AI Operations', 'Decision Engine', 'Apollo Deploy', 'Gotham Intel'] },
            { title: 'Industries', links: ['Defense & Gov', 'Financial Services', 'Healthcare', 'Energy & Utilities', 'Manufacturing'] },
            { title: 'Company', links: ['About', 'Careers', 'Newsroom', 'Research', 'Contact'] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-s9-text-muted mb-5 pb-2 border-b border-white/[0.04]">
                {col.title}
              </div>
              <ul className="space-y-3">
                {col.links.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[11px] text-s9-text-faint hover:text-s9-white transition-colors duration-300 font-mono uppercase tracking-wide">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-[1400px] mx-auto border-t border-white/[0.04] py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-s9-text-faint font-mono uppercase tracking-[0.1em]">
            © {new Date().getFullYear()} Batsight. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use', 'Security'].map((item) => (
              <a key={item} href="#" className="text-[10px] text-s9-text-faint hover:text-s9-white transition-colors duration-300 font-mono uppercase tracking-[0.1em]">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ===== MODAL ===== */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setShowForm(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-lg bg-s9-bg/95 backdrop-blur-xl border border-white/[0.08] shadow-elevated font-mono z-10"
          >
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                <span className="text-[11px] uppercase tracking-[0.12em] text-s9-text-primary font-semibold">
                  Initialize Access Request
                </span>
              </div>
              <button onClick={() => setShowForm(false)} className="text-s9-text-faint hover:text-s9-white transition-colors">
                <X size={14} />
              </button>
            </div>

            {submitted ? (
              <div className="px-6 py-16 flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 border border-white/[0.15] bg-white/[0.03] flex items-center justify-center shadow-glow">
                  <Zap size={18} className="text-s9-white" fill="currentColor" />
                </div>
                <div className="text-sm font-semibold text-s9-white uppercase tracking-widest">Request Received</div>
                <p className="text-[11px] text-s9-text-muted leading-relaxed max-w-xs">
                  Our team will analyse your profile and reach out within 24 hours.
                </p>
                <div className="text-[10px] text-s9-text-faint border border-white/[0.06] px-4 py-2 mt-2">
                  REF // {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'companyName', label: 'Company Name', placeholder: 'Acme Corp' },
                    { name: 'contactName', label: 'Contact Name', placeholder: 'Jane Smith' },
                  ].map((f) => (
                    <div key={f.name} className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-[0.12em] text-s9-text-faint">{f.label} <span className="text-s9-white">*</span></label>
                      <input
                        required
                        name={f.name}
                        value={(form as any)[f.name]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        className="bg-white/[0.03] border border-white/[0.08] text-s9-text-primary text-[11px] px-3 py-2.5 focus:outline-none focus:border-white/[0.25] focus:bg-white/[0.05] transition-all placeholder:text-s9-text-faint/50"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-[0.12em] text-s9-text-faint">Work Email <span className="text-s9-white">*</span></label>
                  <input
                    required type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="jane@acme.com"
                    className="bg-white/[0.03] border border-white/[0.08] text-s9-text-primary text-[11px] px-3 py-2.5 focus:outline-none focus:border-white/[0.25] focus:bg-white/[0.05] transition-all placeholder:text-s9-text-faint/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'industry', label: 'Industry', options: ['Manufacturing', 'Financial Services', 'Healthcare', 'Energy & Utilities', 'Defense & Gov', 'Telecommunications', 'Logistics', 'Automotive', 'Insurance', 'Other'] },
                    { name: 'companySize', label: 'Company Size', options: ['1–10', '11–50', '51–200', '201–1000', '1000+'] },
                  ].map((f) => (
                    <div key={f.name} className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-[0.12em] text-s9-text-faint">{f.label} <span className="text-s9-white">*</span></label>
                      <div className="relative">
                        <select
                          required name={f.name} value={(form as any)[f.name]} onChange={handleChange}
                          className="w-full appearance-none bg-white/[0.03] border border-white/[0.08] text-s9-text-primary text-[11px] px-3 py-2.5 focus:outline-none focus:border-white/[0.25] transition-all pr-8"
                        >
                          <option value="" disabled>Select...</option>
                          {f.options.map((o) => <option key={o} value={o}>{f.name === 'companySize' ? `${o} employees` : o}</option>)}
                        </select>
                        <ChevronDown size={10} className="absolute right-3 top-1/2 -translate-y-1/2 text-s9-text-faint pointer-events-none" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-[0.12em] text-s9-text-faint">Primary Use Case</label>
                  <textarea
                    name="useCase" value={form.useCase} onChange={handleChange} rows={3}
                    placeholder="Describe what you're trying to solve..."
                    className="bg-white/[0.03] border border-white/[0.08] text-s9-text-primary text-[11px] px-3 py-2.5 focus:outline-none focus:border-white/[0.25] focus:bg-white/[0.05] transition-all resize-none placeholder:text-s9-text-faint/50"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-s9-text-faint/50 uppercase tracking-[0.1em]">// Encrypted · Secure</span>
                  <button type="submit" className="bg-white text-black text-[10px] font-semibold uppercase tracking-widest px-6 py-2.5 hover:bg-white/90 transition-colors flex items-center gap-2">
                    <Zap size={11} fill="currentColor" /> Submit Request
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};
