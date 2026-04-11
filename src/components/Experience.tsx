import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { useSectionReveal, SectionHeading } from './About';

const experiences = [
  {
    title: 'Penetration Testing Intern',
    company: 'CDAC',
    companyUrl: 'https://www.cdac.in/',
    location: 'Noida, India',
    duration: 'Sep 2024 – Oct 2024',
    type: 'Internship',
    color: 'indigo',
    points: [
      'Learned advanced networking concepts, vulnerability assessment, and ethical security methodologies',
      'Gained hands-on experience with virtual lab environments simulating real-world cyberattack scenarios',
      'Simulated SQL Injection, XSS, Buffer Overflow, and other common OWASP attack vectors',
      'Conducted pentests on web applications and network infrastructures with written vulnerability reports',
    ],
  },
  {
    title: 'Open Source Contributor',
    company: 'cal.com',
    companyUrl: 'https://cal.com/',
    location: 'Remote',
    duration: '2026 – Present',
    type: 'Open Source',
    color: 'violet',
    points: [
      'Contributing to a widely-used open-source scheduling platform with 25k+ GitHub stars',
      'Resolving GitHub issues and submitting reviewed pull requests following strict contribution guidelines',
      'Deep understanding of Git workflows: branching, rebasing, squashing, and version control best practices',
      'Collaborating with global developers through code reviews, discussions, and async communication',
    ],
  },
];

const colorDot: Record<string, string> = {
  indigo: 'border-indigo-500 shadow-indigo-500/50',
  violet: 'border-violet-500 shadow-violet-500/50',
};

const colorTag: Record<string, string> = {
  indigo: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
  violet: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
};

const Experience = () => {
  const { ref, inView } = useSectionReveal(0.1);

  return (
    <section id="experience" className="section-darker py-28 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="04 · Experience"
          title={<>Where I've <span className="gradient-text">Worked</span></>}
          subtitle="Professional experiences and open-source contributions that shaped my engineering perspective."
        />

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-6 bottom-6 w-0.5 timeline-line opacity-30 rounded-full hidden sm:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative sm:pl-14"
              >
                {/* Timeline dot */}
                <div className={`absolute left-0 top-6 w-10 h-10 rounded-full glass-strong border-2 ${colorDot[exp.color]} shadow-lg flex items-center justify-center hidden sm:flex`}>
                  <div className="w-3 h-3 rounded-full bg-current text-indigo-400" />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -4, x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="glass-strong rounded-2xl p-7 border border-white/6 hover:border-indigo-500/20 transition-all"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                    <div>
                      <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full border mb-2 ${colorTag[exp.color]}`}>
                        {exp.type}
                      </span>
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 mt-0.5 w-fit transition-colors"
                      >
                        {exp.company}
                        <ExternalLink size={12} />
                      </a>
                    </div>

                    <div className="flex flex-col gap-1.5 text-sm text-slate-400 sm:text-right flex-shrink-0">
                      <span className="flex items-center gap-1.5 sm:justify-end">
                        <Calendar size={14} />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-1.5 sm:justify-end">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2.5">
                    {exp.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
