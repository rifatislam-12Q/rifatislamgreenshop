import React, { useState } from 'react';
import { X, User, Lock, Phone, Mail, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [phone, setPhone] = useState('01700-123456');
  const [name, setName] = useState('Ursports Skillhub');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#16171c] border border-[#2b2c36] rounded-2xl p-6 shadow-2xl text-neutral-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-white rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white">Welcome to GreenShop!</h3>
            <p className="text-xs text-neutral-400">Account verified with local mart privileges.</p>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold text-white">GreenShop</span>
                <span className="text-xs text-emerald-400 font-medium">Customer Portal</span>
              </div>
              <p className="text-xs text-neutral-400">
                {isLogin ? 'Sign in to access your orders and saved items' : 'Create an account for quick delivery across Bangladesh'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Full Name</label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your name"
                      className="w-full bg-[#111215] text-white text-xs pl-9 pr-3 py-2.5 rounded-xl border border-neutral-700 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Mobile Number (BD)</label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3 w-4 h-4 text-neutral-500" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+880 17XX-XXXXXX"
                    className="w-full bg-[#111215] text-white text-xs pl-9 pr-3 py-2.5 rounded-xl border border-neutral-700 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Password</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 w-4 h-4 text-neutral-500" />
                  <input
                    type="password"
                    defaultValue="••••••••"
                    required
                    className="w-full bg-[#111215] text-white text-xs pl-9 pr-3 py-2.5 rounded-xl border border-neutral-700 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-colors shadow-md mt-2"
              >
                {isLogin ? 'Sign In' : 'Create GreenShop Account'}
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-neutral-800 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-neutral-400 hover:text-emerald-400 transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
