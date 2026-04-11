import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ── Reusable section reveal hook ── */
export const useSectionReveal = (threshold = 0.15) => {
  const [ref, inView] = useInView({ threshold, triggerOnce: true });
  return { ref, inView };
};

/* ── Section heading component ── */
export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  centered = true,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
}) => {
  const { ref, inView } = useSectionReveal();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-16 ${centered ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <p className="text-xs font-mono text-indigo-400 uppercase tracking-[0.3em] mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

/* ── About Component ── */
const About = () => {
  const { ref: sectionRef, inView } = useSectionReveal(0.1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  const highlights = [
    {
      label: 'B.Tech ECE',
      value: 'PTU — 2022–2026',
      icon: '🎓',
    },
    {
      label: 'Security Intern',
      value: 'CDAC, Noida',
      icon: '🔐',
    },
    {
      label: 'Open Source',
      value: 'cal.com contributor',
      icon: '🌍',
    },
    {
      label: 'Competitive',
      value: 'CodeChef · LeetCode · CF',
      icon: '⚡',
    },
  ];

  const traits = [
    { icon: '🏗️', title: 'Systems Builder', desc: 'I ship end-to-end products — from database schema to deployment pipeline.' },
    { icon: '🔒', title: 'Security-First', desc: 'Every line of code I write considers attack surfaces and secure defaults.' },
    { icon: '⚡', title: 'Performance Obsessed', desc: 'Sub-second responses, minimal bundle sizes, and optimized queries.' },
  ];

  return (
    <section id="about" className="section-dark py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="01 · About"
          title={<>The engineer <span className="gradient-text">behind the code</ span></>}
          subtitle="I build full-stack systems with a security-first philosophy, combining deep technical foundations with a designer's eye for detail."
        />

        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left: Image */}
          <motion.div variants={itemVariants} className="relative order-2 lg:order-1">
            <div className="relative z-10">
              <div className="glass-strong rounded-2xl p-2 border border-white/8">
                <img
                  src="/Images/coder.jpg"
                  alt="Madhav Kumar coding"
                  className="rounded-xl w-full object-cover aspect-[4/3]"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback: show a code-terminal illustration
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-2 rounded-xl bg-gradient-to-t from-[#050810]/70 via-transparent to-transparent" />
              </div>

              {/* Stat badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -left-5 top-8 glass border border-indigo-500/20 rounded-xl px-4 py-3 shadow-xl"
              >
                <p className="text-2xl font-bold gradient-text">10+</p>
                <p className="text-slate-400 text-xs">Projects shipped</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="absolute -right-5 bottom-8 glass border border-violet-500/20 rounded-xl px-4 py-3 shadow-xl"
              >
                <p className="text-2xl font-bold gradient-text">500+</p>
                <p className="text-slate-400 text-xs">Problems solved</p>
              </motion.div>
            </div>

            {/* Decorative gradient behind card */}
            <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-violet-600/20 blur-sm" />
          </motion.div>

          {/* Right: Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-slate-300 text-lg leading-relaxed">
                I'm a passionate <span className="text-white font-medium">full-stack engineer</span> who loves building robust systems — from distributed backends to polished UIs. My journey started at PTU, and I've since sharpened my skills through competitive programming and real-world internships.
              </p>
              <p className="text-slate-400 leading-relaxed">
                I genuinely care about how systems work under the hood — performance, security, and clean architecture aren't afterthoughts for me; they're first principles.
              </p>
            </motion.div>

            {/* Highlight grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
              {highlights.map(({ label, value, icon }) => (
                <div key={label} className="glass border border-white/6 rounded-xl p-4 hover:border-indigo-500/25 transition-colors">
                  <span className="text-2xl mb-2 block">{icon}</span>
                  <p className="text-white text-sm font-semibold">{label}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{value}</p>
                </div>
              ))}
            </motion.div>

            {/* Traits */}
            <motion.div variants={itemVariants} className="space-y-3">
              {traits.map(({ icon, title, desc }) => (
                <motion.div
                  key={title}
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="flex gap-4 p-4 glass rounded-xl border border-white/5 hover:border-indigo-500/20 transition-colors cursor-default"
                >
                  <span className="text-2xl flex-shrink-0">{icon}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{title}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
