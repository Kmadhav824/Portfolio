import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ArrowUpRight, Layers } from 'lucide-react';
import { useSectionReveal, SectionHeading } from './About';

/* ── Project Data ── */
interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDesc: string;
  image: string;
  tags: string[];
  category: string;
  techDetails: string[];
  githubUrl: string;
  liveUrl?: string;
  highlight?: boolean;
  color: string;
}

const projects: Project[] = [
  {
    id: 'nexus',
    title: 'Nexus Deploy',
    tagline: 'Self-hosted Vercel alternative',
    description: 'A Vercel-like deployment platform with real-time updates, CI/CD integration, and multi-environment support.',
    longDesc:
      'Nexus is a production-grade deployment platform with a GitHub webhook-driven CI/CD pipeline, real-time build log streaming via WebSockets, multi-tenant environment management, custom domain routing with Nginx reverse proxy, Let\'s Encrypt SSL automation, and a tiered rate-limiting system for build minutes.',
    image: 'https://images.unsplash.com/photo-1667264501379-c1537934c7ab?auto=format&fit=crop&w=800&q=80',
    tags: ['Next.js', 'TypeScript', 'Docker', 'Redis', 'Nginx'],
    category: 'fullstack',
    techDetails: ['WebSocket real-time logs', 'Let\'s Encrypt SSL', 'Redis rate limiting', 'GitHub Webhooks', 'Docker'],
    githubUrl: 'https://github.com/Kmadhav824/wercel-bundle',
    liveUrl: 'https://madhavkumar.tech',
    highlight: true,
    color: 'indigo',
  },
  {
    id: 'chatterly',
    title: 'Chatterly',
    tagline: 'Real-time group chat rooms',
    description: 'Real-time chat application with multiple rooms, file sharing, emoji reactions, and NextAuth authentication.',
    longDesc:
      'Chatterly is a full-stack chat platform using Socket.io for real-time bidirectional communication. Features include OAuth via NextAuth, emoji reactions, file uploads, room-based messaging, persistent message history in MongoDB, and read receipts.',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Socket.io', 'MongoDB', 'Express'],
    category: 'fullstack',
    techDetails: ['Socket.io bidirectional realtime', 'NextAuth OAuth', 'MongoDB persistence', 'File uploads', 'Read receipts'],
    githubUrl: 'https://github.com/Kmadhav824/Chatterly',
    liveUrl: 'https://chatterly-olive.vercel.app/',
    color: 'violet',
  },
  {
    id: 'documind',
    title: 'Documind',
    tagline: 'RAG-powered document intelligence',
    description: 'A RAG-based document parsing and Q&A system using OpenAI GPT-3.5. Upload any file, ask questions about its content.',
    longDesc:
      'Documind implements a full Retrieval-Augmented Generation pipeline: PDF/document parsing, vector embeddings via OpenAI, semantic similarity search, and streaming GPT-3.5 responses. Users can upload multiple documents and get contextual, grounded answers.',
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Node.js', 'OpenAI', 'Vector DB'],
    category: 'ai',
    techDetails: ['RAG pipeline', 'Vector embeddings', 'Streaming responses', 'Multi-doc support', 'GPT-3.5 Turbo'],
    githubUrl: 'https://github.com/Kmadhav824/documind',
    liveUrl: 'https://documind-new.vercel.app/',
    color: 'pink',
  },
  {
    id: 'codesm',
    title: 'CodeSM',
    tagline: 'Competitive programming platform',
    description: 'A comprehensive coding platform with code execution engine, problem setting tools, leaderboards, and contest management.',
    longDesc:
      'CodeSM is a full-featured competitive programming platform built with React and Node.js. It features a sandboxed code execution engine, multi-language support, a problem authoring suite, user rating system, and real-time contest functionality.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    category: 'fullstack',
    techDetails: ['Sandboxed execution', 'Multi-language support', 'Contest system', 'Rating algorithm', 'Judge engine'],
    githubUrl: 'https://github.com/Kmadhav824/CodeSM',
    liveUrl: 'https://code-sm.vercel.app/',
    color: 'cyan',
  },
];

const FILTER_OPTIONS = ['all', 'fullstack', 'ai'];

/* ── 3D Tilt Card ── */
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`project-card transition-transform duration-200 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

/* ── Project Modal ── */
const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const colorBg: Record<string, string> = {
    indigo: 'from-indigo-600/20 to-indigo-600/0',
    violet: 'from-violet-600/20 to-violet-600/0',
    pink: 'from-pink-600/20 to-pink-600/0',
    cyan: 'from-cyan-600/20 to-cyan-600/0',
  };

  const tagColor: Record<string, string> = {
    indigo: 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20',
    violet: 'bg-violet-500/10 text-violet-300 border border-violet-500/20',
    pink: 'bg-pink-500/10 text-pink-300 border border-pink-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0d1117] rounded-2xl border border-white/8 overflow-hidden shadow-2xl"
      >
        {/* Image header */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${colorBg[project.color]} to-[#0d1117]`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-7 -mt-14 relative z-10">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
              <p className="text-slate-400 text-sm">{project.tagline}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg glass border border-white/8 text-slate-400 hover:text-white hover:border-white/20 transition-all"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg glass border border-white/8 text-slate-400 hover:text-white hover:border-white/20 transition-all"
                  aria-label="Live Demo"
                >
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed mb-6 text-sm">{project.longDesc}</p>

          {/* Tech details */}
          <div className="mb-5">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">Key Features</p>
            <div className="grid grid-cols-2 gap-2">
              {project.techDetails.map((detail) => (
                <div key={detail} className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                  {detail}
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className={`px-3 py-1 text-xs font-medium rounded-full ${tagColor[project.color]}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Projects Component ── */
const Projects = () => {
  const { ref, inView } = useSectionReveal(0.05);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const tagColor: Record<string, string> = {
    indigo: 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20',
    violet: 'bg-violet-500/10 text-violet-300 border border-violet-500/20',
    pink: 'bg-pink-500/10 text-pink-300 border border-pink-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20',
  };

  const accentColor: Record<string, string> = {
    indigo: 'from-indigo-600/30 to-transparent',
    violet: 'from-violet-600/30 to-transparent',
    pink: 'from-pink-600/30 to-transparent',
    cyan: 'from-cyan-600/30 to-transparent',
  };

  return (
    <section id="projects" className="section-dark py-28 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-600/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="03 · Projects"
          title={<>What I've <span className="gradient-text">Built</span></>}
          subtitle="Real-world systems that solve actual problems — from deployment platforms to AI-powered apps."
        />

        {/* Filter tabs */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {FILTER_OPTIONS.map((f) => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative px-5 py-2.5 text-sm font-medium rounded-xl capitalize transition-all ${
                filter === f
                  ? 'text-white'
                  : 'text-slate-500 hover:text-slate-300 glass border border-white/6'
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="filter-active"
                  className="absolute inset-0 bg-indigo-600 rounded-xl"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {f === 'all' && <Layers size={14} />}
                {f === 'fullstack' && '⚙️'}
                {f === 'ai' && '🤖'}
                {f}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.07,
                }}
                className={project.highlight ? 'md:col-span-2' : ''}
              >
                <TiltCard className="h-full">
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="group h-full glass-strong rounded-2xl border border-white/6 overflow-hidden hover:border-indigo-500/25 transition-all duration-300 cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-52">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Overlay gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-tr ${accentColor[project.color]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/90 via-transparent to-transparent" />

                      {/* Expand hint */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="glass border border-white/20 rounded-lg p-2 text-white">
                          <ExternalLink size={14} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-slate-500 text-xs mt-0.5">{project.tagline}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                            aria-label="GitHub"
                          >
                            <Github size={16} />
                          </a>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                              aria-label="Live"
                            >
                              <ArrowUpRight size={16} />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-slate-400 text-sm leading-relaxed mb-5">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className={`px-2.5 py-1 text-xs font-medium rounded-lg ${tagColor[project.color]}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/Kmadhav824"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 glass rounded-xl border border-white/8 text-slate-300 hover:text-white hover:border-indigo-500/30 transition-all text-sm font-medium"
          >
            <Github size={18} />
            View all projects on GitHub
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
