import React, { Suspense, lazy } from 'react';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import PageLoader from './components/PageLoader';
import BackToTop from './components/BackToTop';

// Lazy-load below-fold sections for performance
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Interests = lazy(() => import('./components/Interests'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Minimal section-level loading fallback
const SectionLoader = () => (
  <div className="py-28 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-100 overflow-x-hidden">
      {/* Intro loading screen — appears once on page load */}
      <PageLoader />

      {/* Custom cursor — hidden on mobile via CSS */}
      <CustomCursor />

      {/* Fixed header with scroll progress */}
      <Header />

      {/* Main content */}
      <main>
        {/* Hero — eagerly loaded for LCP */}
        <Hero />

        {/* Lazy-loaded sections */}
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Interests />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Floating back-to-top button */}
      <BackToTop />
    </div>
  );
}

export default App;
