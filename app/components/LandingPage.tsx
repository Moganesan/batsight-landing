'use client';

import { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import dynamic from 'next/dynamic';
import {
  ChevronRight,
  Globe,
  Hash,
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
} from 'lucide-react';
import { AnimatedTerminal } from './AnimatedTerminal';
import ParticleNetwork from './ParticleNetwork';
import { AnimatedCounter } from './AnimatedCounter';

const Globe3D = dynamic(() => import('./Globe3D'), { ssr: false });

// --- Reusable animated wrapper ---
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
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const dirMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

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
  <div
    className={`relative group border border-sector-border bg-sector-surface/50 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-sector-accent hover:bg-sector-surface/80 ${className}`}
  >
    {/* Corner accents */}
    <div className="absolute top-0 left-0 w-6 h-[1px] bg-sector-border group-hover:bg-sector-accent transition-colors duration-500" />
    <div className="absolute top-0 left-0 w-[1px] h-6 bg-sector-border group-hover:bg-sector-accent transition-colors duration-500" />
    <div className="absolute top-0 right-0 w-6 h-[1px] bg-sector-border group-hover:bg-sector-accent transition-colors duration-500" />
    <div className="absolute top-0 right-0 w-[1px] h-6 bg-sector-border group-hover:bg-sector-accent transition-colors duration-500" />
    <div className="absolute bottom-0 left-0 w-6 h-[1px] bg-sector-border group-hover:bg-sector-accent transition-colors duration-500" />
    <div className="absolute bottom-0 left-0 w-[1px] h-6 bg-sector-border group-hover:bg-sector-accent transition-colors duration-500" />
    <div className="absolute bottom-0 right-0 w-6 h-[1px] bg-sector-border group-hover:bg-sector-accent transition-colors duration-500" />
    <div className="absolute bottom-0 right-0 w-[1px] h-6 bg-sector-border group-hover:bg-sector-accent transition-colors duration-500" />

    <div className="flex justify-between items-start z-10">
      <div>
        <h3 className="font-bold text-sm text-sector-heading uppercase tracking-tight mb-1">
          {title}
        </h3>
        <p className="text-[11px] text-sector-muted leading-tight max-w-[200px]">{subtitle}</p>
      </div>
      {Icon && (
        <Icon
          size={16}
          className="text-sector-border-hover group-hover:text-sector-accent transition-colors duration-500"
        />
      )}
    </div>

    <div className="relative mt-4 flex-grow">{children}</div>
  </div>
);

// --- Main Landing Page ---
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
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* ============ HEADER ============ */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-sector-bg/80 backdrop-blur-xl border-b border-sector-border/50 h-16 flex items-center justify-between px-6 md:px-10">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onNavigate('landing')}
        >
          <img className="w-48" src="/logo.png" alt="Logo" />
        </div>
        <nav className="hidden md:flex gap-8">
          {[
            { label: 'Platform', href: '#hero' },
            { label: 'Capabilities', href: '#capabilities' },
            { label: 'Intelligence', href: '#intelligence' },
            { label: 'Specs', href: '#specs' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[11px] uppercase tracking-[0.15em] text-sector-muted hover:text-sector-accent transition-colors duration-300 font-mono"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => {
              setShowForm(true);
              setSubmitted(false);
            }}
            className="bg-sector-accent hover:bg-sector-heading hover:text-sector-bg text-black transition-all duration-300 text-[11px] uppercase tracking-wider font-bold px-5 py-2.5 flex items-center gap-2"
          >
            Get Started <ArrowRight size={12} />
          </button>
        </div>
      </header>

      <main className="min-h-screen bg-sector-bg text-sector-body">
        {/* ============ HERO SECTION ============ */}
        <div ref={heroRef} id="hero" className="relative min-h-screen flex items-center overflow-hidden">
          {/* Gradient mesh background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/3 -left-1/4 w-[800px] h-[800px] rounded-full bg-sector-accent/[0.07] blur-[150px] animate-drift-1" />
            <div className="absolute -bottom-1/3 -right-1/4 w-[700px] h-[700px] rounded-full bg-sector-cyan/[0.05] blur-[150px] animate-drift-2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sector-violet/[0.04] blur-[150px] animate-drift-3" />
          </div>

          {/* Particle network */}
          <ParticleNetwork className="opacity-40" />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pt-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
              {/* Left: Text */}
              <div className="flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center gap-3 mb-8"
                >
                  <div className="w-2 h-2 bg-sector-accent rounded-full animate-pulse" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-sector-accent">
                    Operational Intelligence
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-sector-heading leading-[0.9] mb-8"
                >
                  Vision For
                  <br />
                  Your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sector-accent via-sector-cyan to-sector-violet">
                    DATA
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <p className="max-w-md text-sm text-sector-muted leading-relaxed font-mono border-l-2 border-sector-border pl-4 mb-10">
                    Connect to your data sources.
                    <br />
                    Make data driven decisions.
                    <br />
                    Act on insights in real-time.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button
                    onClick={() => {
                      setShowForm(true);
                      setSubmitted(false);
                    }}
                    className="bg-sector-accent text-black h-14 px-8 text-xs font-bold uppercase tracking-wider hover:bg-sector-heading transition-all duration-300 flex items-center justify-center gap-2 min-w-[200px]"
                  >
                    <Zap size={16} fill="currentColor" /> Request a Demo
                  </button>
                  <button className="border border-sector-border text-sector-heading h-14 px-8 text-xs font-bold uppercase tracking-wider hover:border-sector-accent hover:text-sector-accent transition-all duration-300 min-w-[200px]">
                    View Platform
                  </button>
                </motion.div>

                {/* Metrics strip */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="flex gap-8 mt-12 pt-8 border-t border-sector-border/50"
                >
                  {[
                    { label: 'Uptime', value: '99.9%' },
                    { label: 'Latency', value: '<4ms' },
                    { label: 'Data Sources', value: '50+' },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="text-lg font-mono font-bold text-sector-heading">{m.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-sector-muted font-mono">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right: 3D Globe */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative h-[500px] lg:h-[600px]"
              >
                <Globe3D />

                {/* Floating data cards around globe */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-8 right-4 bg-sector-surface/80 backdrop-blur-xl border border-sector-border p-3 z-10"
                >
                  <div className="text-[9px] font-mono text-sector-muted uppercase tracking-wider">
                    Live Throughput
                  </div>
                  <div className="text-sm font-mono font-bold text-sector-cyan">2.4M ops/s</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-16 left-4 bg-sector-surface/80 backdrop-blur-xl border border-sector-border p-3 z-10"
                >
                  <div className="text-[9px] font-mono text-sector-muted uppercase tracking-wider">
                    Threat Level
                  </div>
                  <div className="text-sm font-mono font-bold text-green-400">NOMINAL</div>
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
            <span className="text-[10px] font-mono text-sector-muted uppercase tracking-widest">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-[1px] h-8 bg-gradient-to-b from-sector-accent to-transparent"
            />
          </motion.div>
        </div>

        {/* ============ MARQUEE ============ */}
        <div className="border-y border-sector-border/50 py-3 bg-sector-surface/30 backdrop-blur-sm overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee font-mono text-[11px] text-sector-muted/60 uppercase tracking-[0.2em]">
            {[
              'Manufacturing',
              'Automotive & Mobility',
              'Healthcare & Pharmaceuticals',
              'Financial Services & Banking',
              'Energy & Utilities',
              'Consumer Goods & Retail',
              'Telecommunications',
              'Logistics & Supply Chain',
              'Aviation & Aerospace',
              'Shipbuilding & Maritime',
              'Semiconductor Manufacturing',
              'Insurance',
              'Manufacturing',
              'Automotive & Mobility',
              'Healthcare & Pharmaceuticals',
              'Financial Services & Banking',
              'Energy & Utilities',
              'Consumer Goods & Retail',
              'Telecommunications',
              'Logistics & Supply Chain',
              'Aviation & Aerospace',
              'Shipbuilding & Maritime',
              'Semiconductor Manufacturing',
              'Insurance',
            ].map((item, i) => (
              <span key={i} className="mx-8 flex items-center gap-2">
                <span className="w-1 h-1 bg-sector-accent/40 rounded-full" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ============ CAPABILITIES BENTO GRID ============ */}
        <section
          id="capabilities"
          className="py-24 px-6 md:px-10 max-w-[1400px] mx-auto scroll-mt-24"
        >
          <FadeIn>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[1px] w-8 bg-sector-accent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-sector-muted">
                Capabilities
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] text-sector-heading mb-4">
              360° View of Your Data
            </h2>
            <p className="text-sm text-sector-muted max-w-xl mb-12">
              From raw data to real clarity. Integrate, analyze, and act on insights across your
              entire enterprise.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 md:grid-rows-2 gap-4 h-auto md:h-[520px]">
            <FadeIn delay={0.1} className="md:col-span-2 md:row-span-2">
              <BentoItem
                className="h-full"
                title="See What You Normally Can't"
                subtitle="See the Invisible. Fix the Critical."
                icon={Globe}
              >
                <div className="w-full h-full bg-sector-bg border border-sector-border relative overflow-hidden flex items-center justify-center group-hover:border-sector-accent/30 transition-colors">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  {/* Radar sweep */}
                  <div className="w-48 h-48 border border-sector-border rounded-full flex items-center justify-center relative">
                    <div className="absolute w-48 h-48 border border-sector-border/30 rounded-full" />
                    <div className="absolute w-32 h-32 border border-sector-border/20 rounded-full" />
                    <div className="absolute w-16 h-16 border border-sector-border/10 rounded-full" />
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-sector-accent to-transparent absolute top-1/2 left-0 animate-[spin_4s_linear_infinite] origin-center opacity-60" />
                    <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-sector-cyan/30 to-transparent absolute" />
                    <div className="w-2.5 h-2.5 bg-sector-accent rounded-full animate-pulse z-10" />
                    {/* Blips */}
                    <div className="absolute w-1.5 h-1.5 bg-sector-cyan rounded-full top-8 right-12 animate-ping" />
                    <div
                      className="absolute w-1 h-1 bg-sector-violet rounded-full bottom-16 left-10 animate-ping"
                      style={{ animationDelay: '0.5s' }}
                    />
                  </div>
                </div>
              </BentoItem>
            </FadeIn>

            <FadeIn delay={0.2}>
              <BentoItem
                className="h-full"
                title="From Raw Data to Real Clarity"
                subtitle="Data You Can Finally Look At."
                icon={BarChart3}
              >
                <div className="flex gap-1 mt-4 h-16 items-end">
                  {[40, 60, 30, 80, 50, 90, 70, 40, 60, 85, 45, 75].map((h, i) => (
                    <div
                      key={i}
                      className="w-full bg-sector-border group-hover:bg-gradient-to-t group-hover:from-sector-accent group-hover:to-sector-cyan transition-all duration-700"
                      style={{
                        height: `${h}%`,
                        transitionDelay: `${i * 50}ms`,
                      }}
                    />
                  ))}
                </div>
              </BentoItem>
            </FadeIn>

            <FadeIn delay={0.3}>
              <BentoItem
                className="h-full"
                title="Trace Every Problem"
                subtitle="Find the Root. Not Just the Surface."
                icon={Network}
              >
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-sector-bg p-2.5 border border-sector-border group-hover:border-sector-cyan/30 transition-colors">
                    <div className="text-[9px] text-sector-muted font-mono">Source</div>
                    <div className="text-xs text-sector-cyan font-mono font-bold">AWS S3</div>
                  </div>
                  <div className="bg-sector-bg p-2.5 border border-sector-border group-hover:border-sector-accent/30 transition-colors">
                    <div className="text-[9px] text-sector-muted font-mono">Root Cause</div>
                    <div className="text-xs text-sector-heading font-mono font-bold">
                      Public Access
                    </div>
                  </div>
                </div>
              </BentoItem>
            </FadeIn>

            <FadeIn delay={0.4}>
              <BentoItem
                className="h-full"
                title="Analyse Everything"
                subtitle="Miss Nothing."
                icon={Shield}
              >
                <div className="mt-4 font-mono text-[10px] text-sector-muted/60 overflow-hidden leading-relaxed">
                  001010101101010
                  <br />
                  101101{' '}
                  <span className="bg-sector-accent text-black px-1.5 py-0.5 font-bold text-[9px]">
                    LOCKED
                  </span>{' '}
                  0101
                  <br />
                  010101010101011
                  <br />
                  110010{' '}
                  <span className="bg-sector-cyan/20 text-sector-cyan px-1.5 py-0.5 font-bold text-[9px]">
                    SECURE
                  </span>{' '}
                  1001
                </div>
              </BentoItem>
            </FadeIn>

            <FadeIn delay={0.5}>
              <BentoItem
                className="h-full"
                title="Make Decisions"
                subtitle="Act on Insights."
                icon={AlertCircle}
              >
                <div className="mt-4 space-y-3">
                  {[
                    { color: 'bg-red-500', label: 'Fraud Escalation', status: 'CRITICAL' },
                    { color: 'bg-green-500', label: 'Transfer Initiated', status: 'CLEARED' },
                    { color: 'bg-yellow-500', label: 'Compliance Check', status: 'PENDING' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 ${item.color} rounded-full`} />
                        <span className="text-[10px] text-sector-muted">{item.label}</span>
                      </div>
                      <span className="text-[8px] font-mono text-sector-muted/60 uppercase">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </BentoItem>
            </FadeIn>
          </div>
        </section>

        {/* ============ SPECS SECTION ============ */}
        <section id="specs" className="scroll-mt-24 border-y border-sector-border/50">
          <div className="max-w-[1400px] mx-auto">
            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-4">
                {[
                  {
                    label: 'Protection Level',
                    value: 'Military',
                    suffix: ' Grade',
                    icon: Shield,
                  },
                  { label: 'AI Response Time', value: 12, suffix: 'ms', prefix: '< ', icon: Zap },
                  {
                    label: 'Data Sources',
                    value: 50,
                    suffix: '+',
                    icon: Database,
                  },
                  {
                    label: 'Uptime SLA',
                    value: 99.9,
                    suffix: '%',
                    icon: Activity,
                  },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="border-b md:border-b-0 md:border-r last:border-r-0 border-sector-border/50 p-10 hover:bg-sector-surface/30 transition-all duration-500 group"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <spec.icon
                        size={14}
                        className="text-sector-muted group-hover:text-sector-accent transition-colors"
                      />
                      <span className="text-[10px] uppercase tracking-[0.15em] text-sector-muted font-mono">
                        {spec.label}
                      </span>
                    </div>
                    <div className="text-2xl font-mono font-bold text-sector-body group-hover:text-sector-heading transition-colors">
                      {typeof spec.value === 'number' ? (
                        <AnimatedCounter
                          value={spec.value}
                          suffix={spec.suffix}
                          prefix={spec.prefix}
                        />
                      ) : (
                        <>
                          {spec.value}
                          {spec.suffix}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ============ INTELLIGENCE / GLOBE MAP SECTION ============ */}
        <section
          id="intelligence"
          className="py-24 px-6 md:px-10 max-w-[1400px] mx-auto scroll-mt-24"
        >
          <FadeIn>
            <div className="border border-sector-border bg-sector-surface/20 relative overflow-hidden">
              {/* Gradient blobs */}
              <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-sector-accent/[0.04] blur-[100px]" />
              <div className="absolute -bottom-32 -left-32 w-[300px] h-[300px] rounded-full bg-sector-cyan/[0.04] blur-[100px]" />

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: Data illustration */}
                <div className="relative border-b lg:border-b-0 lg:border-r border-sector-border bg-sector-bg overflow-hidden flex items-center justify-center min-h-[450px] py-12 lg:py-0">
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
                      backgroundSize: '12px 12px',
                    }}
                  />

                  {/* Data Intelligence Illustration */}
                  <div className="relative w-[340px] h-[320px] select-none">
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 340 320"
                      fill="none"
                    >
                      <line
                        x1="50"
                        y1="60"
                        x2="170"
                        y2="160"
                        stroke="#334155"
                        strokeWidth="1"
                      />
                      <line
                        x1="170"
                        y1="40"
                        x2="170"
                        y2="160"
                        stroke="#334155"
                        strokeWidth="1"
                      />
                      <line
                        x1="290"
                        y1="60"
                        x2="170"
                        y2="160"
                        stroke="#334155"
                        strokeWidth="1"
                      />
                      <line
                        x1="50"
                        y1="260"
                        x2="170"
                        y2="160"
                        stroke="#334155"
                        strokeWidth="1"
                      />
                      <line
                        x1="290"
                        y1="260"
                        x2="170"
                        y2="160"
                        stroke="#334155"
                        strokeWidth="1"
                      />
                      <circle r="3" fill="#ff4d00" opacity="0.8">
                        <animateMotion
                          dur="2s"
                          repeatCount="indefinite"
                          path="M50,60 L170,160"
                        />
                      </circle>
                      <circle r="3" fill="#22d3ee" opacity="0.8">
                        <animateMotion
                          dur="2.4s"
                          repeatCount="indefinite"
                          begin="0.5s"
                          path="M170,40 L170,160"
                        />
                      </circle>
                      <circle r="3" fill="#a78bfa" opacity="0.8">
                        <animateMotion
                          dur="1.8s"
                          repeatCount="indefinite"
                          begin="1s"
                          path="M290,60 L170,160"
                        />
                      </circle>
                      <circle r="3" fill="#ff4d00" opacity="0.8">
                        <animateMotion
                          dur="2.2s"
                          repeatCount="indefinite"
                          begin="0.3s"
                          path="M50,260 L170,160"
                        />
                      </circle>
                      <circle r="3" fill="#22d3ee" opacity="0.8">
                        <animateMotion
                          dur="2.6s"
                          repeatCount="indefinite"
                          begin="0.8s"
                          path="M290,260 L170,160"
                        />
                      </circle>
                    </svg>

                    {[
                      { x: 'left-0', y: 'top-6', label: 'SQL DB', sub: '4.2TB' },
                      {
                        x: 'left-1/2 -translate-x-1/2',
                        y: 'top-0',
                        label: 'REST API',
                        sub: '12k/s',
                      },
                      { x: 'right-0', y: 'top-6', label: 'Data Lake', sub: '18.7TB' },
                      { x: 'left-0', y: 'bottom-6', label: 'Streams', sub: '920k/s' },
                      { x: 'right-0', y: 'bottom-6', label: 'Files', sub: '230GB' },
                    ].map((node) => (
                      <div
                        key={node.label}
                        className={`absolute ${node.x} ${node.y} flex flex-col items-center gap-1`}
                      >
                        <div className="w-16 h-16 border border-sector-border bg-sector-surface hover:border-sector-accent/60 transition-colors flex flex-col items-center justify-center gap-0.5">
                          <div className="text-[9px] font-mono text-sector-heading uppercase tracking-widest">
                            {node.label}
                          </div>
                          <div className="text-[9px] font-mono text-sector-accent">{node.sub}</div>
                        </div>
                      </div>
                    ))}

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-20 h-20 border border-sector-accent/60 bg-sector-surface flex flex-col items-center justify-center relative">
                        <div
                          className="absolute inset-0 border border-sector-accent/20 scale-110 animate-ping"
                          style={{ animationDuration: '3s' }}
                        />
                        <Cpu size={20} className="text-sector-accent mb-1" />
                        <div className="text-[8px] font-mono text-sector-heading uppercase tracking-widest">
                          AI Core
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 border-t border-sector-border pt-2 flex justify-between">
                      <div className="text-center">
                        <div className="text-[9px] font-mono text-sector-accent font-bold">
                          99.9%
                        </div>
                        <div className="text-[8px] text-sector-muted uppercase">Uptime</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[9px] font-mono text-sector-cyan font-bold">4ms</div>
                        <div className="text-[8px] text-sector-muted uppercase">Latency</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[9px] font-mono text-sector-violet font-bold">50+</div>
                        <div className="text-[8px] text-sector-muted uppercase">Sources</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: CTA content */}
                <div className="p-12 md:p-16 flex flex-col justify-center relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-2 h-2 bg-sector-accent animate-pulse" />
                      <span className="font-mono text-[11px] font-bold tracking-[0.15em] text-sector-accent uppercase">
                        Operational_Intelligence
                      </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black text-sector-heading uppercase tracking-[-0.03em] mb-6 leading-[0.9]">
                      Foundational Software
                      <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sector-accent to-sector-cyan">
                        Delivered Today.
                      </span>
                    </h2>

                    <p className="text-xs text-sector-muted font-mono max-w-md border-l-2 border-sector-border pl-4 mb-8 leading-relaxed">
                      INTEGRATE DATA, DECISIONS, AND OPERATIONS
                      <br />
                      ACROSS YOUR ENTIRE ENTERPRISE — IN DAYS, NOT YEARS.
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-10">
                      {[
                        {
                          label: 'Day 1 Value',
                          desc: 'Measurable outcomes from first deployment',
                          icon: Zap,
                        },
                        {
                          label: 'AI Into Ops',
                          desc: 'Infuse intelligence across every workflow',
                          icon: Cpu,
                        },
                        {
                          label: 'FedRAMP Ready',
                          desc: 'Multi-layer security certifications',
                          icon: Shield,
                        },
                        {
                          label: '50+ Sectors',
                          desc: 'Defense, finance, health & beyond',
                          icon: Layers,
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="border border-sector-border p-4 bg-sector-bg/50 hover:border-sector-accent/40 transition-colors group/card"
                        >
                          <item.icon
                            size={14}
                            className="text-sector-muted mb-2 group-hover/card:text-sector-accent transition-colors"
                          />
                          <div className="text-[11px] font-bold text-sector-heading uppercase tracking-wider mb-1">
                            {item.label}
                          </div>
                          <div className="text-[10px] text-sector-muted font-mono leading-relaxed">
                            {item.desc}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => {
                          setShowForm(true);
                          setSubmitted(false);
                        }}
                        className="bg-sector-accent text-black h-14 px-8 text-xs font-bold uppercase tracking-wider hover:bg-sector-heading transition-all duration-300 flex items-center justify-center gap-2 min-w-[180px]"
                      >
                        <Zap size={16} fill="currentColor" /> Request a Demo
                      </button>
                      <button className="border border-sector-border text-sector-heading h-14 px-8 text-xs font-bold uppercase tracking-wider hover:border-sector-accent transition-colors min-w-[180px]">
                        Schedule Bootcamp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ============ TERMINAL SECTION ============ */}
        <section className="px-6 md:px-10 max-w-[1400px] mx-auto pb-24">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-1 border border-sector-border bg-sector-surface/30 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-6 bg-sector-cyan" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-sector-muted">
                    Live Feed
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-sector-heading tracking-tight mb-3">
                  Real-Time System Intelligence
                </h3>
                <p className="text-sm text-sector-muted leading-relaxed">
                  Monitor every operation, trace every anomaly, and respond in milliseconds. Your
                  data streams never sleep.
                </p>
              </div>
              <div className="lg:col-span-2 h-[350px] border border-sector-border overflow-hidden">
                <AnimatedTerminal height="h-full" />
              </div>
            </div>
          </FadeIn>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="bg-sector-bg border-t border-sector-border/50 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto pt-16 pb-12 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <img className="w-36 mb-4 opacity-80" src="/logo.png" alt="Sector 9" />
            <p className="text-[11px] text-sector-muted/50 uppercase leading-relaxed font-mono max-w-[200px]">
              Foundational software for data-driven decisions. Delivered today.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-sector-muted uppercase tracking-widest">
                All Systems Operational
              </span>
            </div>
          </div>

          {[
            {
              title: 'Platform',
              links: ['Data Foundry', 'AI Operations', 'Decision Engine', 'Apollo Deploy', 'Gotham Intel'],
            },
            {
              title: 'Industries',
              links: [
                'Defense & Gov',
                'Financial Services',
                'Healthcare',
                'Energy & Utilities',
                'Manufacturing',
              ],
            },
            {
              title: 'Company',
              links: ['About', 'Careers', 'Newsroom', 'Research', 'Contact'],
            },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-sector-muted mb-5 border-b border-sector-border/30 pb-2">
                {col.title}
              </div>
              <ul className="space-y-3">
                {col.links.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[11px] text-sector-muted/60 hover:text-sector-accent transition-colors font-mono uppercase tracking-wide"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-[1400px] mx-auto border-t border-sector-border/30 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-sector-muted/40 font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} Sector 9. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use', 'Security'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] text-sector-muted/40 hover:text-sector-accent transition-colors font-mono uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ============ GET STARTED MODAL ============ */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowForm(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative w-full max-w-lg border border-sector-border bg-sector-bg/95 backdrop-blur-xl font-mono z-10"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sector-accent via-sector-cyan to-sector-violet" />

            <div className="flex items-center justify-between px-6 py-4 border-b border-sector-border">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-sector-accent animate-pulse" />
                <span className="text-[11px] uppercase tracking-[0.15em] text-sector-heading font-bold">
                  Initialize Access Request
                </span>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="text-sector-muted hover:text-sector-accent transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {submitted ? (
              <div className="px-6 py-16 flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 border border-sector-accent flex items-center justify-center mb-2">
                  <Zap size={20} className="text-sector-accent" fill="currentColor" />
                </div>
                <div className="text-sm font-bold text-sector-heading uppercase tracking-widest">
                  Request Received
                </div>
                <p className="text-[11px] text-sector-muted uppercase leading-relaxed max-w-xs">
                  Our team will analyse your profile and reach out within 24 hours.
                </p>
                <div className="text-[10px] text-sector-muted/50 border border-sector-border px-4 py-2 mt-2">
                  REF // {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-sector-muted">
                      Company Name <span className="text-sector-accent">*</span>
                    </label>
                    <input
                      required
                      name="companyName"
                      value={form.companyName}
                      onChange={handleChange}
                      placeholder="Acme Corp"
                      className="bg-sector-surface border border-sector-border text-sector-heading text-[11px] px-3 py-2.5 focus:outline-none focus:border-sector-accent transition-colors placeholder:text-sector-muted/30"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-sector-muted">
                      Contact Name <span className="text-sector-accent">*</span>
                    </label>
                    <input
                      required
                      name="contactName"
                      value={form.contactName}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="bg-sector-surface border border-sector-border text-sector-heading text-[11px] px-3 py-2.5 focus:outline-none focus:border-sector-accent transition-colors placeholder:text-sector-muted/30"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-sector-muted">
                    Work Email <span className="text-sector-accent">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@acme.com"
                    className="bg-sector-surface border border-sector-border text-sector-heading text-[11px] px-3 py-2.5 focus:outline-none focus:border-sector-accent transition-colors placeholder:text-sector-muted/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-sector-muted">
                      Industry <span className="text-sector-accent">*</span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        name="industry"
                        value={form.industry}
                        onChange={handleChange}
                        className="w-full appearance-none bg-sector-surface border border-sector-border text-sector-heading text-[11px] px-3 py-2.5 focus:outline-none focus:border-sector-accent transition-colors pr-8"
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        {[
                          'Manufacturing',
                          'Financial Services',
                          'Healthcare',
                          'Energy & Utilities',
                          'Defense & Gov',
                          'Telecommunications',
                          'Logistics',
                          'Automotive',
                          'Insurance',
                          'Other',
                        ].map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={10}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sector-muted pointer-events-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-sector-muted">
                      Company Size <span className="text-sector-accent">*</span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        name="companySize"
                        value={form.companySize}
                        onChange={handleChange}
                        className="w-full appearance-none bg-sector-surface border border-sector-border text-sector-heading text-[11px] px-3 py-2.5 focus:outline-none focus:border-sector-accent transition-colors pr-8"
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        {['1–10', '11–50', '51–200', '201–1000', '1000+'].map((s) => (
                          <option key={s} value={s}>
                            {s} employees
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={10}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sector-muted pointer-events-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-sector-muted">
                    Primary Use Case
                  </label>
                  <textarea
                    name="useCase"
                    value={form.useCase}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe what you're trying to solve..."
                    className="bg-sector-surface border border-sector-border text-sector-heading text-[11px] px-3 py-2.5 focus:outline-none focus:border-sector-accent transition-colors resize-none placeholder:text-sector-muted/30"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-sector-muted/40 uppercase tracking-widest">
                    // Encrypted · Secure
                  </span>
                  <button
                    type="submit"
                    className="bg-sector-accent text-black text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 hover:bg-sector-heading transition-colors flex items-center gap-2"
                  >
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
