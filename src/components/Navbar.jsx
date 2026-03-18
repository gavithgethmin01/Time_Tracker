import React from 'react';
import { BrainCircuit } from 'lucide-react';

const Navbar = ({ onOpenAuth }) => {
  return (
    <nav className="w-full bg-[#f7f9ff] border-b border-[#00000014] sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3 font-bold text-xl text-[#0f1724] cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <div className="w-6 h-6 flex items-center justify-center text-[#6c63ff]">
            <BrainCircuit size={24} />
          </div>
          StudyFlow
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-medium text-[#96a0b5]">
          <a href="#features" className="hover:text-[#0f1724] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#0f1724] transition-colors">How it Works</a>
          <a href="#benefits" className="hover:text-[#0f1724] transition-colors">Benefits</a>
          <a href="#faq" className="hover:text-[#0f1724] transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onOpenAuth('login')}
            className="font-medium text-[#96a0b5] hover:text-[#0f1724] transition-colors hidden sm:block"
          >
            Log in
          </button>
          <button 
            onClick={() => onOpenAuth('signup')}
            className="bg-[#6c63ff] hover:bg-[#5a52d6] text-white px-6 py-3 rounded-md font-medium transition-colors shadow-sm active:scale-95"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
