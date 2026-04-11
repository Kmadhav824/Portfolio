import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Github, Linkedin, Download } from 'lucide-react';

/**
 * ─── RESUME URL ────────────────────────────────────────────────────────────────
 * To avoid Vercel redeployments every time you update your resume:
 *
 * 1. Upload resume.pdf to Google Drive
 * 2. Share it → "Anyone with the link"
 * 3. Your share link looks like:
 *    https://drive.google.com/file/d/FILE_ID/view
 * 4. Replace RESUME_URL below with:
 *    https://drive.google.com/uc?export=download&id=FILE_ID
 *
 * Future updates: Just right-click in Drive → Manage versions → Upload new version.
 * Same FILE_ID = same URL = zero code changes needed. ✅
 * ─────────────────────────────────────────────────────────────────────────────
 */
const RESUME_URL = 'https://drive.google.com/uc?export=download&id=1FWvmAEl3xSq9VN4nWFe-I3IhWQIApN5m'; // ← Replace with your Google Drive direct-download URL

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.substring(1));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'glass-strong border-b border-indigo-500/10 shadow-lg shadow-black/20'
            : 'bg-transparent border-b border-transparent'
          }`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/30">
                MK
              </div>
              <span className="text-white/90 font-semibold text-sm hidden sm:block group-hover:text-indigo-400 transition-colors">
                Madhav Kumar
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeSection === item.href.substring(1)
                      ? 'text-indigo-400'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  {activeSection === item.href.substring(1) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-indigo-500/10 rounded-lg border border-indigo-500/20"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://github.com/Kmadhav824"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/kmadhav824"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <motion.a
                href={RESUME_URL}
                download={RESUME_URL.startsWith('/') ? 'Madhav_Kumar_Resume.pdf' : undefined}
                target={RESUME_URL.startsWith('http') ? '_blank' : undefined}
                rel={RESUME_URL.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
              >
                <Download size={14} />
                Resume
              </motion.a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-4 border-t border-white/5 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`block w-full text-left px-4 py-2.5 text-sm rounded-lg transition-all ${activeSection === item.href.substring(1)
                      ? 'text-indigo-400 bg-indigo-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-2 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <a href="https://github.com/Kmadhav824" target="_blank" rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors">
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/kmadhav824" target="_blank" rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors">
                    <Linkedin size={20} />
                  </a>
                </div>
                <a
                  href={RESUME_URL}
                  download={RESUME_URL.startsWith('/') ? 'Madhav_Kumar_Resume.pdf' : undefined}
                  target={RESUME_URL.startsWith('http') ? '_blank' : undefined}
                  rel={RESUME_URL.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
                >
                  <Download size={12} />
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        </nav>
      </motion.header>
    </>
  );
};

export default Header;