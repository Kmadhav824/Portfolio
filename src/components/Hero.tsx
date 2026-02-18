import React from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="pt-24 min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-5"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                <img src="/Images/Prof.jpg" alt="MK" className="w-full h-full object-cover object-top rounded-full" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            <span className="block">Hi, I'm</span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Madhav Kumar
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Final Year student at <a href="https://ptuniv.edu.in/" className="text-green-500 hover:text-green-700">Puducherry Technological University</a>&nbsp;
            B.Tech in Electronics and Communication Engineering
            Passionate about Problem Solving.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={scrollToAbout}
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View My Work
            </button>
            <a 
              href="#contact" 
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </a>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/Kmadhv824" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/kmadhav824" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110">
              <Linkedin size={24} />
            </a>
            <a href="mailto:kmadhav824.second@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110">
              <Mail size={24} />
            </a>
          </div>
        </div>
        
        <div className="animate-bounce">
          <button 
            onClick={scrollToAbout}
            className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;