import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "CodeSM",
      description: "A comprehensive coding platform designed for creating and solving programming problems. Features include a code execution engine, problem setting tools, and user leaderboards.",
      // Coding/Programming themed image
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      githubUrl: "https://github.com/Kmadhav824/CodeSM",
      liveUrl: "https://code-sm.vercel.app/"
    },
    // {
    //   title: "E-Commerce Platform",
    //   description: "A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, and payment integration.",
    //   image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    //   technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    //   githubUrl: "https://github.com",
    //   liveUrl: "https://example.com"
    // },
    // {
    //   title: "Task Management App",
    //   description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built using React and Firebase.",
    //   image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    //   technologies: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
    //   githubUrl: "https://github.com",
    //   liveUrl: "https://example.com"
    // },
    // {
    //   title: "Blog Platform",
    //   description: "A modern blog platform with content management system, user authentication, and SEO optimization. Built with Next.js and headless CMS integration.",
    //   image: "https://images.pexels.com/photos/261628/pexels-photo-261628.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    //   technologies: ["Next.js", "Sanity CMS", "Vercel", "SEO"],
    //   githubUrl: "https://github.com",
    //   liveUrl: "https://example.com"
    // },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing my projects and skills. Features smooth animations, dark mode toggle, and optimized performance.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
      githubUrl: "https://github.com/Kmadhav824/portfolio",
    },
    // {
    //   title: "Chat Application",
    //   description: "Real-time chat application with multiple rooms, file sharing, and emoji support. Built using Socket.io for real-time communication.",
    //   image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    //   technologies: ["Socket.io", "Express", "MongoDB", "React"],
    //   githubUrl: "https://github.com",
    //   liveUrl: "https://example.com"
    // },
    {
      title: "Nexus",
      description: "A Vercel-like deployment platform with real-time updates, CI/CD integration, and multi-environment support.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      technologies: ["Next.js", "Tailwind CSS", "TypeScript", "Git & Github"],
      githubUrl: "https://github.com/Kmadhav824/wercel-bundle",
      liveUrl: "https://nexus-kmadhav.vercel.app/"
    }

  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of projects that showcase my skills and passion for development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <a
                    href={project.githubUrl}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Github size={16} />
                    <span className="text-sm">Code</span>
                  </a>
                  <a
                    href={project.liveUrl}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm">Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;