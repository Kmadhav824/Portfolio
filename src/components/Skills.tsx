import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        "C++ (Competitive Programming)",
        "JavaScript / Node.js",
        "Python",
        "SQL",
        "Kotlin"
      ]
    },
    {
      title: "Core & Security",
      skills: [
        "Cryptography (Post-Quantum)",
        "Network Security",
        "Data Structures & Algorithms",
        "Database Management (DBMS)",
        "Ethical Hacking"
      ]
    },
    {
      title: "Development & Tools",
      skills: [
        "VS Code",
        "React.js",
        "Git & GitHub",
        "Linux Environment",
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive technical toolkit spanning low-level hardware design to modern software development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-600">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                {category.title}
              </h3>
              
              <ul className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center space-x-3 group">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 group-hover:text-purple-600 transition-colors duration-300 flex-shrink-0" />
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;