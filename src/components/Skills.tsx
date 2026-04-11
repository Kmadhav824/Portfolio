import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSectionReveal, SectionHeading } from './About';

const skillGroups = [
  {
    category: 'Languages',
    color: 'indigo',
    icon: '⌨️',
    skills: ['TypeScript', 'JavaScript', 'Python', 'C++', 'SQL'],
  },
  {
    category: 'Frontend',
    color: 'violet',
    icon: '🎨',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'HTML5 / CSS3'],
  },
  {
    category: 'Backend',
    color: 'pink',
    icon: '⚙️',
    skills: ['Node.js', 'Express', 'REST APIs', 'WebSockets', 'Redis'],
  },
  {
    category: 'Databases',
    color: 'cyan',
    icon: '🗄️',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Prisma ORM'],
  },
  {
    category: 'DevOps & Cloud',
    color: 'emerald',
    icon: '☁️',
    skills: ['Docker', 'CI/CD', 'AWS', 'GitHub Actions', 'Linux'],
  },
  {
    category: 'Security',
    color: 'amber',
    icon: '🔐',
    skills: ['Penetration Testing', 'OWASP Top 10', 'Cryptography', 'Ethical Hacking', 'Network Security'],
  },
];

const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20 hover:bg-indigo-500/20 hover:shadow-indigo-500/30',
  violet: 'bg-violet-500/10 text-violet-300 border-violet-500/20 hover:bg-violet-500/20 hover:shadow-violet-500/30',
  pink: 'bg-pink-500/10 text-pink-300 border-pink-500/20 hover:bg-pink-500/20 hover:shadow-pink-500/30',
  cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20 hover:bg-cyan-500/20 hover:shadow-cyan-500/30',
  emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20 hover:shadow-emerald-500/30',
  amber: 'bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500/20 hover:shadow-amber-500/30',
};

const headerColorMap: Record<string, string> = {
  indigo: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/5',
  violet: 'text-violet-400 border-violet-500/30 bg-violet-500/5',
  pink: 'text-pink-400 border-pink-500/30 bg-pink-500/5',
  cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5',
  emerald: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
  amber: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
};

const Skills = () => {
  const { ref, inView } = useSectionReveal(0.1);
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="skills" className="section-darker py-28 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="02 · Skills"
          title={<>Technical <span className="gradient-text">Arsenal</span></>}
          subtitle="A comprehensive toolkit spanning languages, frameworks, DevOps, and security — built through real projects, not just tutorials."
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.category}
              variants={cardVariants}
              onHoverStart={() => setHoveredGroup(group.category)}
              onHoverEnd={() => setHoveredGroup(null)}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className={`glass-strong rounded-2xl p-6 border transition-all duration-300 ${
                hoveredGroup === group.category
                  ? `border-${group.color}-500/30 shadow-lg shadow-${group.color}-500/10`
                  : 'border-white/6'
              }`}
            >
              {/* Card header */}
              <div className={`inline-flex items-center gap-2.5 px-3 py-2 rounded-lg border mb-6 ${headerColorMap[group.color]}`}>
                <span className="text-base">{group.icon}</span>
                <span className="text-sm font-semibold">{group.category}</span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.05 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className={`skill-tag px-3 py-1.5 text-xs font-medium rounded-lg border cursor-default shadow-sm ${colorMap[group.color]}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional competitive programming note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 p-6 glass rounded-2xl border border-white/6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <span className="text-4xl">🏆</span>
          <div>
            <p className="text-white font-semibold">Competitive Programming</p>
            <p className="text-slate-400 text-sm mt-1">
              Active on <span className="text-amber-400">CodeChef</span>,{' '}
              <span className="text-blue-400">Codeforces</span>, and{' '}
              <span className="text-orange-400">LeetCode</span> — 500+ problems solved, sharpening algorithmic thinking and problem-solving speed.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
