import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Madhav Kumar
          </div>
          
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Full-Stack Developer passionate about creating innovative solutions 
            and building exceptional digital experiences.
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <span>Made with</span>
            <Heart size={16} className="text-red-500" />
            <span>by Madhav</span>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            © {new Date().getFullYear()} Madhav Kumar. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;