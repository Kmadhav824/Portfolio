import React from 'react';
import { Code, Palette, Rocket } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed">
              I'm a passionate coder with a love for creating innovative solutions 
              and building exceptional digital experiences. With expertise in modern web technologies, 
              I transform ideas into reality through clean, efficient code.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              My journey in software development started during my studies at PTU, 
              and I've since gained valuable experience through Contest and Solving Quesions on Platforms like Codechef, Codeforces and Leetcode. 
              I'm constantly learning new technologies and staying up-to-date with industry trends.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <Code className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Clean Code</h3>
                <p className="text-sm text-gray-600">Writing maintainable and scalable code</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                  <Palette className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Design Focus</h3>
                <p className="text-sm text-gray-600">Creating beautiful user experiences</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                  <Rocket className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-sm text-gray-600">Always exploring new technologies</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="src\assets\Images\coder.jpg"
                alt="Image"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute top-4 left-4 w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;