import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSectionReveal } from './About';

/* ── Terminal commands database ── */
const COMMANDS: Record<string, string> = {
  help: `Available commands:
  <span class="terminal-accent">about</span>      — Who is Madhav Kumar?
  <span class="terminal-accent">skills</span>     — Tech stack & tools
  <span class="terminal-accent">projects</span>   — Featured work
  <span class="terminal-accent">contact</span>    — Get in touch
  <span class="terminal-accent">interests</span>  — Hobbies & passions
  <span class="terminal-accent">hire</span>       — Why hire Madhav?
  <span class="terminal-accent">clear</span>      — Clear the terminal`,

  about: `<span class="terminal-success">Madhav Kumar</span> — Full Stack Engineer + Security Enthusiast

Final Year B.Tech (ECE) @ Puducherry Technological University
Based in Puducherry, India 🇮🇳
Open to: Full-time roles, internships, freelance projects

I build scalable systems end-to-end — from database schema design
to production deployment pipelines. Security is never an afterthought.`,

  skills: `<span class="terminal-success">// Technical Stack</span>

Languages   → TypeScript, JavaScript, Python, C++, SQL
Frontend    → React.js, Next.js, Tailwind CSS, Framer Motion
Backend     → Node.js, Express, REST APIs, WebSockets, Redis
Databases   → MongoDB, PostgreSQL, MySQL, Prisma ORM
DevOps      → Docker, CI/CD, AWS, GitHub Actions, Linux
Security    → OWASP, Pen Testing, Cryptography, Ethical Hacking`,

  projects: `<span class="terminal-success">// Featured Projects</span>

  <span class="terminal-accent">Nexus Deploy</span>     — Vercel-like deployment platform
                     Next.js, Docker, Redis, Nginx, SSL automation
                     → https://madhavkumar.tech

  <span class="terminal-accent">Chatterly</span>        — Real-time chat with rooms & file sharing
                     React, Socket.io, MongoDB, NextAuth
                     → https://chatterly-olive.vercel.app

  <span class="terminal-accent">Documind</span>         — RAG-based document Q&A (OpenAI GPT-3.5)
                     React, Node.js, Vector embeddings
                     → https://documind-new.vercel.app

  <span class="terminal-accent">CodeSM</span>           — Competitive programming platform
                     React, Node.js, Sandboxed code execution
                     → https://code-sm.vercel.app`,

  contact: `<span class="terminal-success">// Let's connect!</span>

  Email   → <a href="mailto:madhav@madhavkumar.dev" class="terminal-accent hover:underline" target="_blank">madhav@madhavkumar.dev</a>
  GitHub  → <a href="https://github.com/Kmadhav824" class="terminal-accent hover:underline" target="_blank">github.com/Kmadhav824</a>
  LinkedIn→ <a href="https://www.linkedin.com/in/kmadhav824" class="terminal-accent hover:underline" target="_blank">linkedin.com/in/kmadhav824</a>
  Web     → <a href="https://madhavkumar.tech" class="terminal-accent hover:underline" target="_blank">madhavkumar.tech</a>`,

  interests: `<span class="terminal-success">// Beyond code</span>

  🚀  Sci-Fi        — Devouring everything from Dune to Interstellar
  🌍  Languages     — Learning new human languages alongside programming ones
  🏏  Cricket       — Playing whenever a team can be assembled
  📖  Reading       — Tech blogs, system design, philosophy
  🎮  Gaming        — Strategy games that demand planning`,

  hire: `<span class="terminal-success">// Why hire Madhav?</span>

  ✅  Ships production-ready code, not just demos
  ✅  Security-first mindset from day zero
  ✅  Can work across the full stack independently
  ✅  Communicates clearly in async, remote environments
  ✅  Constantly learning — currently exploring distributed systems
  ✅  Has real internship & open-source contribution experience

  <span class="terminal-accent">→ Ready to contribute from week one.</span>`,

  clear: '__CLEAR__',
};

/* ── Terminal Line type ── */
interface TerminalEntry {
  id: number;
  type: 'input' | 'output' | 'error';
  content: string;
}

const WELCOME = `<span class="terminal-success">Welcome to Madhav's Interactive Portfolio Terminal v1.0</span>
Type <span class="terminal-accent">help</span> to see available commands.
─────────────────────────────────────────────────────`;

const Terminal = () => {
  const [entries, setEntries] = useState<TerminalEntry[]>([
    { id: 0, type: 'output', content: WELCOME },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  const { ref, inView } = useSectionReveal(0.3);

  // Auto-scroll
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [entries]);

  const addEntry = (type: TerminalEntry['type'], content: string) => {
    setEntries((prev) => [...prev, { id: idRef.current++, type, content }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    // Add to history
    setHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    // Add input echo
    addEntry('input', cmd);
    setInput('');

    // Process command
    if (cmd === 'clear') {
      setEntries([{ id: idRef.current++, type: 'output', content: WELCOME }]);
    } else if (COMMANDS[cmd]) {
      addEntry('output', COMMANDS[cmd]);
    } else {
      addEntry('error', `Command not found: '<span class="text-white">${cmd}</span>'. Type <span class="terminal-accent">help</span> to see available commands.`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? '' : history[newIndex]);
    }
  };

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="terminal"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Header */}
        <div className="terminal-header">
          <div className="terminal-dot bg-red-500" />
          <div className="terminal-dot bg-yellow-500" />
          <div className="terminal-dot bg-green-500" />
          <span className="text-slate-500 text-xs font-mono ml-2">
            madhav@portfolio:~$
          </span>
          <span className="ml-auto text-xs text-slate-600 font-mono">bash v5.2</span>
        </div>

        {/* Body */}
        <div ref={bodyRef} className="terminal-body">
          {entries.map((entry) => (
            <div key={entry.id} className="mb-2">
              {entry.type === 'input' && (
                <div className="terminal-line">
                  <span className="terminal-prompt">madhav@portfolio:~$</span>
                  <span className="text-white">{entry.content}</span>
                </div>
              )}
              {(entry.type === 'output' || entry.type === 'error') && (
                <div
                  className={`terminal-output ml-0 whitespace-pre-wrap ${entry.type === 'error' ? 'terminal-error' : ''}`}
                  dangerouslySetInnerHTML={{ __html: entry.content }}
                />
              )}
            </div>
          ))}

          {/* Active input line */}
          <form onSubmit={handleSubmit} className="terminal-line mt-1">
            <span className="terminal-prompt">madhav@portfolio:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              placeholder="type a command..."
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Terminal;
