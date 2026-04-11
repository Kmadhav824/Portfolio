import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useSectionReveal, SectionHeading } from './About';

type FormState = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
  const { ref, inView } = useSectionReveal(0.1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formState, setFormState] = useState<FormState>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setFormState('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormState('idle'), 5000);
    } catch (err) {
      console.error(err);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 4000);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={18} />,
      label: 'Email',
      value: 'madhav@madhavkumar.dev',
      href: 'mailto:madhav@madhavkumar.dev',
      color: 'indigo',
    },
    {
      icon: <Phone size={18} />,
      label: 'Phone',
      value: '+91 9341294304',
      href: 'tel:+919341294304',
      color: 'violet',
    },
    {
      icon: <MapPin size={18} />,
      label: 'Location',
      value: 'Puducherry, India',
      href: undefined,
      color: 'pink',
    },
  ];

  const socials = [
    { href: 'https://github.com/Kmadhav824', icon: <Github size={18} />, label: 'GitHub', color: 'bg-slate-800 hover:bg-slate-700' },
    { href: 'https://www.linkedin.com/in/kmadhav824', icon: <Linkedin size={18} />, label: 'LinkedIn', color: 'bg-blue-700 hover:bg-blue-600' },
    { href: 'https://x.com/kmadhav824', icon: <Twitter size={18} />, label: 'Twitter', color: 'bg-sky-600 hover:bg-sky-500' },
  ];

  const iconBg: Record<string, string> = {
    indigo: 'bg-indigo-500/10 text-indigo-400',
    violet: 'bg-violet-500/10 text-violet-400',
    pink: 'bg-pink-500/10 text-pink-400',
  };

  const inputClass = 'w-full px-4 py-3 bg-[#0d1117] border border-white/8 rounded-xl text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500/50 transition-all autofill:bg-[#0d1117] autofill:text-slate-200';

  return (
    <section id="contact" className="section-darker py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="06 · Contact"
          title={<>Let's <span className="gradient-text">Work Together</span></>}
          subtitle="Open to full-time roles, freelance projects, and interesting collaborations. Let's build something great."
        />

        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-5 gap-10"
        >
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Availability badge */}
            <div className="glass-strong rounded-2xl p-5 border border-emerald-500/15">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-pulse" />
                <span className="text-emerald-400 font-semibold text-sm">Available for work</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Currently seeking full-time roles or exciting freelance opportunities. Response within 24 hours.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              {contactInfo.map(({ icon, label, value, href, color }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg[color]}`}>
                    {icon}
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">{label}</p>
                    {href ? (
                      <a href={href} className="text-slate-300 hover:text-indigo-400 text-sm font-medium transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-slate-300 text-sm font-medium">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4">Find me on</p>
              <div className="flex gap-3">
                {socials.map(({ href, icon, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-xl ${color} text-white flex items-center justify-center transition-colors shadow-lg`}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="glass-strong rounded-2xl p-8 border border-white/6">
              <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-slate-400 mb-2">Name</label>
                    <input
                      type="text" id="name" name="name"
                      value={formData.name} onChange={handleChange}
                      required className={inputClass} placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-slate-400 mb-2">Email</label>
                    <input
                      type="email" id="email" name="email"
                      value={formData.email} onChange={handleChange}
                      required className={inputClass} placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-slate-400 mb-2">Subject</label>
                  <input
                    type="text" id="subject" name="subject"
                    value={formData.subject} onChange={handleChange}
                    required className={inputClass} placeholder="Project collaboration / Job opportunity"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-slate-400 mb-2">Message</label>
                  <textarea
                    id="message" name="message" rows={5}
                    value={formData.message} onChange={handleChange}
                    required className={`${inputClass} resize-none`}
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={formState === 'sending'}
                  whileHover={formState === 'idle' ? { scale: 1.02 } : {}}
                  whileTap={formState === 'idle' ? { scale: 0.98 } : {}}
                  className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 transition-all duration-300 ${formState === 'success'
                      ? 'bg-emerald-600 text-white'
                      : formState === 'error'
                        ? 'bg-red-600/80 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    } disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  <AnimatePresence mode="wait">
                    {formState === 'idle' && (
                      <motion.span key="idle" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Send size={16} /> Send Message
                      </motion.span>
                    )}
                    {formState === 'sending' && (
                      <motion.span key="sending" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </motion.span>
                    )}
                    {formState === 'success' && (
                      <motion.span key="success" className="flex items-center gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <CheckCircle size={16} /> Message Sent!
                      </motion.span>
                    )}
                    {formState === 'error' && (
                      <motion.span key="error" className="flex items-center gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <AlertCircle size={16} /> Failed — Try Again
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
