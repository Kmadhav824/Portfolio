import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Heart } from 'lucide-react';

const Footer = () => {
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  const socials = [
    { href: 'https://github.com/Kmadhav824', icon: <Github size={18} />, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/kmadhav824', icon: <Linkedin size={18} />, label: 'LinkedIn' },
    { href: 'https://x.com/kmadhav824', icon: <Twitter size={18} />, label: 'Twitter' },
    { href: 'mailto:madhav@madhavkumar.dev', icon: <Mail size={18} />, label: 'Email' },
  ];

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.substring(1));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050810] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/30">
                MK
              </div>
              <div>
                <p className="text-white font-bold">Madhav Kumar</p>
                <p className="text-slate-500 text-xs">Full Stack Engineer</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Building secure, scalable systems with a security-first mindset. Available for opportunities.
            </p>
            <div className="flex gap-2">
              {socials.map(({ href, icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-lg glass border border-white/6 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-[0.2em] mb-5">Navigation</p>
            <ul className="space-y-2.5">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-slate-400 hover:text-indigo-400 text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-4 h-px bg-slate-600 group-hover:bg-indigo-500 group-hover:w-6 transition-all duration-200" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Call to action */}
          <div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-[0.2em] mb-5">Work Together</p>
            <p className="text-slate-400 text-sm mb-5 leading-relaxed">
              Looking for a developer who ships production-ready code with security in mind?
            </p>
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
            >
              Let's talk
              <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm flex items-center gap-2">
            Designed & built by Madhav Kumar with{' '}
            <Heart size={14} className="text-pink-500" />
          </p>
          <p className="text-slate-600 text-sm font-mono">
            © {new Date().getFullYear()} · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;