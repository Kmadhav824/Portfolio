import React from 'react';
import { Camera, Music, Plane, Code2, Book, Coffee } from 'lucide-react';

const Interests = () => {
  const interests = [
    
    {
      icon: <Music size={24} />,
      title: "Sci-Fi",
      description: "Watching Science Fictions is always a fun"
    },
    {
      icon: <Book size={24} />,
      title: "Languages",
      description: "Trying to learn new Languages"
    },
    {
      icon: <Music size={24} />,
      title: "Cricket",
      description: "Playing cricket, subject to team availability"
    },
  ];

  return (
    <section id="interests" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Interests & Hobbies</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            When I'm not coding, you'll find me exploring these passions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {interests.map((interest, index) => (
            <div key={index} className="group bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                {interest.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{interest.title}</h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">{interest.description}</p>
            </div>
          ))}
        </div>
        
        {/* Additional personal touch */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 inline-block">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Always Learning</h3>
            <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
              I believe in continuous learning and growth. Whether it's mastering a new programming language, 
              exploring creative outlets, or discovering new cultures through travel, I'm always eager to 
              expand my horizons and bring fresh perspectives to my work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interests;