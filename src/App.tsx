import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Interests from './components/Interests';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
      <div className="min-h-screen overflow-y-auto bg-white text-gray-900">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Interests />
      <Contact />
      <Footer />
      </div>
  );
}

export default App;