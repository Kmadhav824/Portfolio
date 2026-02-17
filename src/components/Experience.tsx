import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "Penetration Testing Intern",
      company: "CDAC",
      location: "Noida, India",
      duration: "Sep 2024 - Oct 2024",
      description: [
        "Learnt Networking Concepts, Vulnerability and Ethical Concerns",
        "Got hands on experience using Advanced Virtual Lab p",
        "Improved application performance by 30% through code optimization",
        "Participated in daily stand-ups and sprint planning meetings"
      ]
    },
    {
      title: "Open Source Contributor",
      company: "GitHub Community",
      location: "Remote",
      duration: "2026 - Present",
      description: [
        "Contributing to open-source repositories by resolving issues and submitting pull requests",
        "Strong understanding of Git workflows including branching, rebasing, and version control",
        "Collaborating with global developers through code reviews and discussions",
        "Maintaining clean commit history and following best practices for contribution",
        "Continuously learning and improving through community-driven development"
      ]
    }

  ];

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600">
            My professional journey and internship experiences
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>
          
          {experiences.map((experience, index) => (
            <div key={index} className="relative mb-12 ml-16">
              {/* Timeline dot */}
              <div className="absolute -left-10 top-6 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg"></div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{experience.title}</h3>
                    <h4 className="text-lg font-medium text-blue-600">{experience.company}</h4>
                  </div>
                  <div className="flex flex-col md:text-right mt-2 md:mt-0">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm">{experience.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2" />
                      <span className="text-sm">{experience.location}</span>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {experience.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;