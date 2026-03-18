import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon, BrainCircuit, ArrowRight, AlertCircle } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, initialMode = 'login', onSuccess }) => {
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [identifier, setIdentifier] = useState('Gavith'); // Pre-fill for demonstration
  const [password, setPassword] = useState('Gethmin');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
      
      if (mode === 'login') {
        const checkId = identifier.trim().toLowerCase();
        if ((checkId === 'gavith' || checkId === 'gavith@example.com') && password === 'Gethmin') {
          // Success! Pass user object
          onSuccess({ name: 'Gavith', email: 'gavith@example.com' });
        } else {
          // Failure
          setError('Invalid login. Hint: try Gavith / Gethmin');
        }
      } else {
        // Signup success mock
        onSuccess({ name: fullName || identifier.split('@')[0], email: identifier });
      }
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0f1724]/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-2xl border border-[#00000014] overflow-hidden flex flex-col font-sans"
        >
          {/* Top Decorative bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#6c63ff] to-[#a09cff]" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#96a0b5] hover:text-[#0f1724] hover:bg-[#f1f4f8] rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="px-8 pt-10 pb-8">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#eef2ff] text-[#6c63ff]">
                <BrainCircuit size={28} />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-[#0f1724] mb-2">
              {mode === 'login' ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-center text-[#96a0b5] text-sm mb-6">
              {mode === 'login' 
                ? 'Enter your details to access your dashboard.' 
                : 'Start tracking your study time and building consistency.'}
            </p>

            {/* Error Message UI */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2 border border-red-100"
                >
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <p className="font-medium">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <AnimatePresence initial={false} mode="wait">
                {mode === 'signup' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#96a0b5]">
                        <UserIcon size={18} />
                      </div>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full pl-10 pr-4 py-3 bg-[#f7f9ff] border border-[#00000014] rounded-lg text-[#0f1724] placeholder-[#96a0b5] focus:outline-none focus:border-[#6c63ff] focus:ring-1 focus:ring-[#6c63ff] transition-all"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#96a0b5]">
                  <Mail size={18} />
                </div>
                <input
                  type={mode === 'login' ? 'text' : 'email'}
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={mode === 'login' ? "Username or Email" : "Email Address"}
                  className="w-full pl-10 pr-4 py-3 bg-[#f7f9ff] border border-[#00000014] rounded-lg text-[#0f1724] placeholder-[#96a0b5] focus:outline-none focus:border-[#6c63ff] focus:ring-1 focus:ring-[#6c63ff] transition-all"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#96a0b5]">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 bg-[#f7f9ff] border border-[#00000014] rounded-lg text-[#0f1724] placeholder-[#96a0b5] focus:outline-none focus:border-[#6c63ff] focus:ring-1 focus:ring-[#6c63ff] transition-all"
                />
              </div>

              {mode === 'login' && (
                <div className="flex justify-between items-center px-1">
                  <label className="flex items-center gap-2 text-sm text-[#96a0b5] cursor-pointer">
                    <input type="checkbox" className="rounded border-[#00000014] text-[#6c63ff] focus:ring-[#6c63ff]" />
                    Remember me
                  </label>
                  <a href="#" className="text-sm font-semibold text-[#6c63ff] hover:text-[#5a52d6]">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-[#6c63ff] hover:bg-[#5a52d6] text-white font-medium py-3.5 rounded-lg flex justify-center items-center gap-2 transition-all active:scale-[0.98] shadow-sm shadow-[#6c63ff]/20 disabled:opacity-70 disabled:active:scale-100"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-[#96a0b5]">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setError('');
                }}
                className="font-bold text-[#6c63ff] hover:text-[#5a52d6] transition-colors"
              >
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
