import React from 'react';
import { motion } from 'framer-motion';
import { Film, BookOpen, Trophy, Globe } from 'lucide-react';
import { useSectionReveal, SectionHeading } from './About';
import Terminal from './Terminal';

const interests = [
  {
    icon: <Film size={22} />,
    title: 'Sci-Fi',
    description: 'From Dune to Interstellar — stories of scale inspire my system design thinking.',
    color: 'indigo',
  },
  {
    icon: <Globe size={22} />,
    title: 'Languages',
    description: 'Picking up new human languages, one grammar rule at a time.',
    color: 'violet',
  },
  {
    icon: <Trophy size={22} />,
    title: 'Cricket',
    description: 'Playing whenever a team is available — strategy on and off the field.',
    color: 'pink',
  },
  {
    icon: <BookOpen size={22} />,
    title: 'Reading',
    description: 'Tech essays, philosophy, system design papers, and the occasional novel.',
    color: 'cyan',
  },
];

const colorCard: Record<string, string> = {
  indigo: 'border-indigo-500/15 hover:border-indigo-500/35 group-hover:shadow-indigo-500/10',
  violet: 'border-violet-500/15 hover:border-violet-500/35 group-hover:shadow-violet-500/10',
  pink: 'border-pink-500/15 hover:border-pink-500/35 group-hover:shadow-pink-500/10',
  cyan: 'border-cyan-500/15 hover:border-cyan-500/35 group-hover:shadow-cyan-500/10',
};

const colorIcon: Record<string, string> = {
  indigo: 'bg-indigo-500/10 text-indigo-400',
  violet: 'bg-violet-500/10 text-violet-400',
  pink: 'bg-pink-500/10 text-pink-400',
  cyan: 'bg-cyan-500/10 text-cyan-400',
};

const Interests = () => {
  const { ref, inView } = useSectionReveal(0.1);

  return (
    <section id="interests" className="section-dark py-28 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Interests grid */}
        <SectionHeading
          eyebrow="05 · Beyond Code"
          title={<>What <span className="gradient-text">Drives Me</span></>}
          subtitle="The things that fuel curiosity, creativity, and a broader perspective on life."
        />

        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20"
        >
          {interests.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group glass-strong rounded-2xl p-6 border ${colorCard[item.color]} transition-all duration-300 cursor-default`}
            >
              <div className={`w-12 h-12 rounded-xl ${colorIcon[item.color]} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                {item.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Terminal WOW section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mb-8"
          >
            <p className="text-xs font-mono text-indigo-400 uppercase tracking-[0.3em] mb-3">
              Interactive Terminal
            </p>
            <h3 className="text-2xl font-bold text-white mb-2">
              Explore my portfolio{' '}
              <span className="gradient-text">via CLI</span>
            </h3>
            <p className="text-slate-400 text-sm">
              Type <code className="font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded">help</code> to start
            </p>
          </motion.div>

          <Terminal />
        </div>
      </div>
    </section>
  );
};

export default Interests;
