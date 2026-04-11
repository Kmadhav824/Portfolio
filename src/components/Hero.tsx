import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Terminal, Sparkles } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

/* ── Typing text hook ── */
const roles = [
  'Full Stack Engineer',
  'Backend Specialist',
  'Security Enthusiast',
  'Open Source Contributor',
  'Problem Solver',
];

const useTypingEffect = (texts: string[], typingSpeed = 60, deleteSpeed = 35, pause = 2000) => {
  const [displayed, setDisplayed] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    const current = texts[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pause);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 0);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deleteSpeed);
      } else {
        setRoleIndex((i) => (i + 1) % texts.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, roleIndex, texts, typingSpeed, deleteSpeed, pause]);

  return displayed;
};

/* ── Magnetic Button ── */
const MagneticButton = ({ children, className, onClick, href }: {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
  href?: string;
}) => {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };

  const handleMouseLeave = () => {
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 20 });
    animate(y, 0, { type: 'spring', stiffness: 300, damping: 20 });
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref as any}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </Component>
  );
};

/* ── Stats counter ── */
const CountUp = ({ to, suffix = '' }: { to: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasRun.current) {
        hasRun.current = true;
        let start = 0;
        const step = to / 40;
        const interval = setInterval(() => {
          start += step;
          if (start >= to) { setCount(to); clearInterval(interval); }
          else setCount(Math.floor(start));
        }, 30);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ── Hero Component ── */
const Hero = () => {
  const role = useTypingEffect(roles);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#050810] grid-bg"
    >
      {/* Particle background */}
      <ParticleCanvas />

      {/* Gradient orbs */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] orb-1 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[100px] orb-2 pointer-events-none" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050810]/80 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left: Text Content */}
          <div className="space-y-7">
            {/* Status badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5">
              <span className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/20 text-sm text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-pulse" />
                Open to opportunities · Final Year @ PTU
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-white">
                Building{' '}
                <span className="gradient-text glow-text">
                  systems
                </span>
                <br />
                that <span className="text-slate-300">scale.</span>
              </h1>
            </motion.div>

            {/* Typing effect */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <Terminal size={18} className="text-indigo-400 flex-shrink-0" />
              <p className="text-lg text-slate-400 font-mono">
                <span className="text-indigo-300">&gt; </span>
                <span className="text-slate-200">{role}</span>
                <span className="typing-cursor" />
              </p>
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-slate-400 text-lg leading-relaxed max-w-xl">
              Final Year B.Tech (ECE) student at{' '}
              <a href="https://ptuniv.edu.in/" target="_blank" rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors">
                Puducherry Technological University
              </a>. I design, build, and ship secure, performant products that feel fast and look iconic.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <MagneticButton
                className="btn-magnetic inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/30 transition-colors"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Sparkles size={16} />
                View My Work
              </MagneticButton>

              <MagneticButton
                className="btn-magnetic inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/10 hover:border-indigo-500/40 text-slate-300 hover:text-white font-semibold text-sm transition-all"
                onClick={scrollToAbout}
              >
                About Me
              </MagneticButton>
            </motion.div>

            {/* Socials */}
            <motion.div variants={itemVariants} className="flex items-center gap-5">
              {[
                { href: 'https://github.com/Kmadhav824', icon: <Github size={20} />, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/kmadhav824', icon: <Linkedin size={20} />, label: 'LinkedIn' },
                { href: 'mailto:madhav@madhavkumar.dev', icon: <Mail size={20} />, label: 'Email' },
              ].map(({ href, icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-slate-500 hover:text-indigo-400 transition-colors p-2 rounded-lg hover:bg-indigo-500/10"
                >
                  {icon}
                </motion.a>
              ))}

              <div className="h-4 w-px bg-slate-700" />
              <a
                href="https://madhavkumar.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-slate-500 hover:text-indigo-400 transition-colors"
              >
                → Nexus
              </a>
            </motion.div>
          </div>

          {/* Right: Stats Card */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="glass-strong rounded-2xl p-8 border border-indigo-500/15 shadow-2xl"
              >
                {/* Profile row */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 shadow-xl">
                      <img src="/Images/Prof.jpg" alt="Madhav Kumar" className="w-full h-full object-cover object-top" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#0d1117]" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-mono mb-0.5">// featured developer</p>
                    <h3 className="text-white font-semibold text-lg leading-tight">Madhav Kumar</h3>
                    <p className="text-indigo-400 text-sm">Full Stack + Security</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { value: 10, suffix: '+', label: 'Projects' },
                    { value: 4, suffix: '+', label: 'Yrs Coding' },
                    { value: 2, suffix: '', label: 'Internships' },
                  ].map(({ value, suffix, label }) => (
                    <div key={label} className="text-center p-3 rounded-xl bg-white/3 border border-white/5">
                      <p className="text-2xl font-bold gradient-text">
                        <CountUp to={value} suffix={suffix} />
                      </p>
                      <p className="text-slate-500 text-xs mt-1">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Featured projects */}
                <div className="space-y-3">
                  <p className="text-xs font-mono text-slate-500 mb-3">// recent builds</p>
                  {[
                    { name: 'Nexus Deploy', desc: 'Vercel-like CI/CD platform', color: 'indigo' },
                    { name: 'Chatterly', desc: 'Real-time chat with rooms', color: 'violet' },
                    { name: 'Documind', desc: 'RAG-based doc Q&A', color: 'pink' },
                  ].map(({ name, desc, color }) => (
                    <div key={name} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-indigo-500/20 transition-colors group">
                      <div className={`w-2 h-2 rounded-full bg-${color}-500 shadow-lg shadow-${color}-500/50 flex-shrink-0`} />
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium group-hover:text-indigo-300 transition-colors">{name}</p>
                        <p className="text-slate-500 text-xs truncate">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -right-6 -bottom-4 glass border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-400 shadow-xl"
              >
                <span className="text-emerald-400">● </span>
                shipping since 2021
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex justify-center mt-16"
        >
          <motion.button
            onClick={scrollToAbout}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-slate-600 hover:text-indigo-400 transition-colors flex flex-col items-center gap-2"
            aria-label="Scroll down"
          >
            <span className="text-xs font-mono text-slate-600">scroll</span>
            <ArrowDown size={18} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
