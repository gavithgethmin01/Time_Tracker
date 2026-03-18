import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Timer, BookOpen, BarChart2, Target, Bell, 
  CheckCircle2, Play, Pause, BrainCircuit,
  Twitter, Linkedin, Instagram
} from 'lucide-react';
import Navbar from './Navbar';
import AuthModal from './AuthModal';

const Landing = ({ onLoginSuccess }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen font-sans bg-[#f7f9ff] text-[#0f1724] overflow-hidden">
      <Navbar onOpenAuth={openAuth} />

      {/* Hero Section */}
      <section className="pt-[120px] pb-[80px] text-center bg-gradient-to-b from-[#eef2ff] to-[#f7f9ff]" id="hero">
        <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-[-0.02em] mb-6 text-[#0f1724] max-w-[800px] mx-auto"
          >
            Track your study time.<br/>Stay consistent. Achieve more.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-[#96a0b5] max-w-[600px] mx-auto mb-[40px]"
          >
            A simple and powerful way to manage your study sessions, track
            progress, and build better habits.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4 justify-center mb-[80px]"
          >
            <button 
              onClick={() => openAuth('signup')}
              className="bg-[#6c63ff] hover:bg-[#5a52d6] text-white font-medium px-6 py-3 rounded-md transition-colors shadow-sm active:scale-95"
            >
              Get Started
            </button>
            <button className="bg-transparent border border-[#00000014] text-[#0f1724] font-medium px-6 py-3 rounded-md hover:bg-black/5 transition-colors active:scale-95">
              Download App
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative max-w-[1000px] mx-auto rounded-xl overflow-hidden border border-[#00000014] shadow-[0_24px_48px_rgba(0,0,0,0.1)] bg-white transform-gpu"
          >
            {/* Embedded Tablet UI from previous iteration */}
            <div className="w-full h-auto bg-[#0F172A] relative flex flex-col aspect-[16/9]">
              {/* Fake UI Header */}
              <div className="h-10 w-full bg-[#1e2335] flex items-center justify-between px-6 border-b border-slate-800/80">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#6c63ff]">Study Dashboard</div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700 hover:bg-slate-500 transition-colors" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700 hover:bg-slate-500 transition-colors" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700 hover:bg-slate-500 transition-colors" />
                </div>
              </div>

               {/* Fake UI Background */}
               <div className="flex-1 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#31104C] p-4 sm:p-6 lg:p-8 grid grid-cols-12 grid-rows-2 gap-3 sm:gap-4 lg:gap-6 relative overflow-hidden text-left">
                  {/* Ambient Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-[80px] mix-blend-screen pointer-events-none" />
                  
                  {/* Left Card: Weekly Progress */}
                  <div className="col-span-12 sm:col-span-5 row-span-2 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 p-4 lg:p-5 flex flex-col relative z-10 shadow-xl group hover:bg-white/[0.05] transition-all">
                      <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Weekly Progress</h3>
                      <p className="text-white text-xs mb-4 opacity-60 font-semibold">Study Hours</p>
                      
                      <div className="flex-1 flex items-end relative w-full h-full pb-6">
                          {/* Background Grid Lines */}
                          <div className="absolute inset-0 flex flex-col justify-between pb-6 opacity-20 pointer-events-none">
                              <div className="w-full border-b border-slate-600 border-dashed" />
                              <div className="w-full border-b border-slate-600 border-dashed" />
                              <div className="w-full border-b border-slate-600 border-dashed" />
                              <div className="w-full border-b border-slate-600 border-dashed" />
                          </div>

                          <svg className="w-full h-full overflow-visible z-10" preserveAspectRatio="none" viewBox="0 0 100 50">
                              <motion.path 
                                  initial={{ opacity: 0, pathLength: 0 }}
                                  animate={isMounted ? { opacity: 0.6, pathLength: 1 } : {}}
                                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                  d="M0,50 L0,35 Q10,25 20,38 T40,25 T60,15 T80,30 T100,10 L100,50 Z" 
                                  fill="url(#chart-grad)" 
                              />
                              <motion.polyline 
                                  initial={{ pathLength: 0 }}
                                  animate={isMounted ? { pathLength: 1 } : {}}
                                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                  points="0,35 20,38 40,25 60,15 80,30 100,10" 
                                  fill="none" 
                                  stroke="#818CF8" 
                                  strokeWidth="2.5" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                              />
                              <circle cx="20" cy="38" r="3" fill="#0F172A" stroke="#818CF8" strokeWidth="2" />
                              <circle cx="40" cy="25" r="3" fill="#0F172A" stroke="#818CF8" strokeWidth="2" />
                              <circle cx="60" cy="15" r="3" fill="#0F172A" stroke="#818CF8" strokeWidth="2" />
                              <circle cx="80" cy="30" r="3" fill="#0F172A" stroke="#818CF8" strokeWidth="2" />
                              <circle cx="100" cy="10" r="4" fill="#818CF8" stroke="white" strokeWidth="1.5" className="shadow-[0_0_10px_#818CF8]" />
                          </svg>
                          <defs>
                              <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8"/>
                                  <stop offset="100%" stopColor="#818CF8" stopOpacity="0"/>
                              </linearGradient>
                          </defs>
                      </div>
                      <div className="flex justify-between w-full text-[9px] text-slate-500 font-bold uppercase mt-2 px-1">
                          <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                      </div>
                  </div>

                  {/* Center Card: Main Timer */}
                  <div className="col-span-12 sm:col-span-7 row-span-2 flex flex-col gap-3 sm:gap-4 lg:gap-6 z-10 w-full h-full">
                      <div className="flex-1 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 p-4 lg:p-6 flex flex-col items-center justify-center relative shadow-xl">
                          <div className="relative w-28 h-28 lg:w-36 lg:h-36 flex items-center justify-center">
                              <svg className="absolute inset-0 w-full h-full -rotate-90">
                                  <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                                  <motion.circle 
                                      initial={{ strokeDashoffset: 300 }}
                                      animate={isMounted ? { strokeDashoffset: 100 } : {}}
                                      transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                                      cx="50%" cy="50%" r="45%" 
                                      fill="none" 
                                      stroke="#818CF8" 
                                      strokeWidth="8" 
                                      strokeDasharray="300" 
                                      strokeLinecap="round" 
                                  />
                              </svg>
                              <div className="text-center">
                                  <div className="text-2xl lg:text-3xl font-black text-white tracking-tighter drop-shadow-lg">01:45:30</div>
                                  <div className="text-[8px] lg:text-[9px] font-black text-[#818CF8] uppercase tracking-widest mt-1">Focus Time</div>
                              </div>
                          </div>
                      </div>
                      
                      {/* Mini Data Cards under Timer */}
                      <div className="h-[80px] lg:h-[100px] grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                        <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 p-3 lg:p-4 flex items-center justify-center lg:justify-start gap-4 shadow-xl">
                            <div className="relative w-10 h-10 lg:w-12 lg:h-12 hidden lg:block">
                                <svg className="w-full h-full -rotate-90">
                                    <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                                    <circle cx="24" cy="24" r="20" fill="none" stroke="#818CF8" strokeWidth="8" strokeDasharray="125" strokeDashoffset="40" strokeLinecap="round" />
                                    <circle cx="24" cy="24" r="20" fill="none" stroke="#34D399" strokeWidth="8" strokeDasharray="125" strokeDashoffset="100" strokeLinecap="round" className="origin-center rotate-180" />
                                </svg>
                            </div>
                            <div className="flex flex-col gap-1.5 align-middle">
                                <div className="text-[9px] font-black uppercase text-slate-400">Analytics</div>
                                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#818CF8]" /><span className="text-[10px] text-white font-bold">Math</span></div>
                                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#34D399]" /><span className="text-[10px] text-white font-bold">Science</span></div>
                            </div>
                        </div>

                        <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 p-3 lg:p-4 flex flex-col justify-center shadow-xl">
                            <h3 className="text-[#94A3B8] text-[9px] font-black uppercase tracking-widest mb-2">Upcoming Tasks</h3>
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-emerald-400 flex-shrink-0" />
                                    <span className="text-[9px] lg:text-[10px] text-white font-medium line-clamp-1">Read Chapter 5</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 lg:w-3.5 lg:h-3.5 rounded-full border-2 border-[#818CF8] flex-shrink-0" />
                                    <span className="text-[9px] lg:text-[10px] text-[#818CF8] font-medium line-clamp-1">Calculus Set</span>
                                </div>
                            </div>
                        </div>
                      </div>
                  </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-[96px] bg-[#f7f9ff]" id="features">
        <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-[36px] font-bold text-center mb-4 text-[#0f1724]">Everything you need to succeed</h2>
          <p className="text-lg text-center text-[#96a0b5] max-w-[600px] mx-auto mb-[56px]">
            Powerful features designed specifically to help students maintain
            focus and build sustainable study habits.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <FeatureCard icon={<Timer size={24} />} title="Smart Study Timer" desc="Customizable Pomodoro and deep work timers to keep you focused." />
            <FeatureCard icon={<BookOpen size={24} />} title="Subject Management" desc="Organize your learning by courses, modules, or specific exams." />
            <FeatureCard icon={<BarChart2 size={24} />} title="Progress Analytics" desc="Visualize your daily, weekly, and monthly study patterns effortlessly." />
            <FeatureCard icon={<Target size={24} />} title="Goal Tracking" desc="Set weekly hour targets and watch your consistency grow over time." />
            <FeatureCard icon={<Bell size={24} />} title="Reminders" desc="Gentle nudges to keep you on schedule without feeling overwhelmed." />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-[96px] bg-[#eef2ff]" id="how-it-works">
        <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-[36px] font-bold text-center mb-4 text-[#0f1724]">How It Works</h2>
          <p className="text-lg text-center text-[#96a0b5] max-w-[600px] mx-auto mb-[56px]">
            Start optimizing your study sessions in just four simple steps.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard number="1" title="Create Subjects" desc="Add all the classes and topics you need to study for this semester." />
            <StepCard number="2" title="Start Timer" desc="Pick a subject, set your preferred session length, and begin studying." />
            <StepCard number="3" title="Track Sessions" desc="Log your productive time automatically as you complete each session." />
            <StepCard number="4" title="View Analytics" desc="Check your dashboard to see trends, streaks, and total hours invested." />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-[96px] bg-[#f7f9ff]" id="benefits">
        <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-[36px] font-bold text-center mb-4 text-[#0f1724]">Why use StudyFlow?</h2>
          <p className="text-lg text-center text-[#96a0b5] max-w-[600px] mx-auto mb-[56px]">
            Experience the difference structured tracking makes to your academic life.
          </p>

          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 rounded-[8px] overflow-hidden w-full">
              <img 
                src="https://storage.googleapis.com/banani-generated-images/generated-images/3225524a-708c-4732-b1c9-3d30b049bd57.jpg" 
                alt="Student studying" 
                className="w-full h-auto object-cover aspect-[4/3] rounded-[8px]"
              />
            </div>
            
            <div className="flex-1 flex flex-col gap-6 w-full">
              <BenefitItem title="Build consistent study habits" desc="Turn irregular cramming into steady, manageable daily progress." />
              <BenefitItem title="Stay focused longer" desc="Structured intervals help you maintain high concentration levels." />
              <BenefitItem title="Understand your productivity" desc="Learn what times of day you perform best based on actual data." />
              <BenefitItem title="Improve exam performance" desc="Confidence comes from knowing exactly how much effort you've put in." />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-[96px] bg-[#eef2ff]" id="faq">
        <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-[36px] font-bold text-center mb-4 text-[#0f1724]">Frequently Asked Questions</h2>
          <p className="text-lg text-center text-[#96a0b5] max-w-[600px] mx-auto mb-[56px]">
            Everything you need to know about the product and billing.
          </p>

          <div className="flex flex-col gap-4 max-w-[800px] mx-auto">
            <FaqItem q="Is this app free?" a="Yes! StudyFlow has a generous free tier that covers basic tracking, timers, and limited analytics. We also offer a Premium version for advanced insights and unlimited goals." />
            <FaqItem q="Can I track multiple subjects?" a="Absolutely. You can create as many subjects or projects as you need and color-code them to keep your dashboard organized." />
            <FaqItem q="Does it work offline?" a="Yes, the timer and basic tracking work completely offline. Your data will securely sync to the cloud the next time you connect to the internet." />
            <FaqItem q="Is my data secure?" a="We take privacy seriously. Your study data is encrypted and we never sell your personal information to third parties." />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[96px] bg-[#6c63ff] text-center">
        <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Start your study journey today</h2>
          <button 
            onClick={() => openAuth('signup')}
            className="bg-[#f7f9ff] text-[#0f1724] font-medium text-[18px] px-10 py-[16px] rounded-md hover:bg-white transition-colors active:scale-95"
          >
            Sign Up Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f7f9ff] border-t border-[#00000014] pt-[48px] pb-[24px] px-[48px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
            <div className="flex items-center gap-3 font-bold text-[20px] text-[#0f1724] cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="w-6 h-6 flex items-center justify-center text-[#0f1724]">
                <BrainCircuit size={24} />
              </div>
              StudyFlow
            </div>

            <div className="flex flex-wrap justify-center md:gap-[32px] gap-4 text-[#96a0b5] font-medium">
              <a href="#" className="hover:text-[#0f1724] transition-colors">About</a>
              <a href="#" className="hover:text-[#0f1724] transition-colors">Contact</a>
              <a href="#" className="hover:text-[#0f1724] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#0f1724] transition-colors">Terms</a>
            </div>

            <div className="flex gap-4">
              <a href="#" className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#eef2ff] text-[#2b2f42] hover:bg-[#dbe0ff] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#eef2ff] text-[#2b2f42] hover:bg-[#dbe0ff] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#eef2ff] text-[#2b2f42] hover:bg-[#dbe0ff] transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div className="text-center pt-[24px] border-t border-[#00000014] text-[#96a0b5] text-[14px]">
            © 2025 StudyFlow Inc. All rights reserved.
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode} 
        onSuccess={onLoginSuccess}
      />
    </div>
  );
};

// Sub-components
const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex-[1_1_calc(33.333%-16px)] min-w-[300px] max-w-[360px] bg-white border border-[#00000014] rounded-[8px] p-[32px] flex flex-col items-start shadow-sm hover:shadow-md transition-shadow">
    <div className="w-[48px] h-[48px] flex items-center justify-center rounded-[6px] bg-[#6c63ff] text-white mb-[24px]">
      {icon}
    </div>
    <h3 className="text-[20px] font-semibold mb-[12px] text-[#0f1724]">{title}</h3>
    <p className="text-[#96a0b5] leading-relaxed">{desc}</p>
  </div>
);

const StepCard = ({ number, title, desc }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-[64px] h-[64px] rounded-full bg-[#f7f9ff] border-2 border-[#6c63ff] flex items-center justify-center text-[24px] font-bold text-[#6c63ff] mb-[24px]">
      {number}
    </div>
    <h3 className="text-[20px] font-semibold mb-[12px] text-[#2b2f42]">{title}</h3>
    <p className="text-[#96a0b5] leading-relaxed">{desc}</p>
  </div>
);

const BenefitItem = ({ title, desc }) => (
  <div className="flex items-start gap-[16px] bg-white p-[24px] rounded-[6px] border border-[#00000014] shadow-sm w-full">
    <div className="w-[24px] h-[24px] flex items-center justify-center text-[#10b981] flex-shrink-0 mt-0.5">
      <CheckCircle2 size={24} />
    </div>
    <div className="flex flex-col gap-1 w-full">
      <h4 className="text-[18px] font-semibold text-[#0f1724]">{title}</h4>
      <p className="text-[#96a0b5]">{desc}</p>
    </div>
  </div>
);

const FaqItem = ({ q, a }) => (
  <div className="bg-white border border-[#00000014] rounded-[6px] p-[24px] shadow-sm w-full">
    <h4 className="text-[18px] font-semibold text-[#0f1724] mb-[12px]">{q}</h4>
    <p className="text-[#96a0b5]">{a}</p>
  </div>
);

export default Landing;
