import React, { useState } from 'react';
import {
  X,
  Lock,
  Phone,
  Mail,
  CheckCircle2,
  Eye,
  EyeOff,
  User,
  Shield,
  Calendar,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Leaf
} from 'lucide-react';
import { CurrentUser } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: CurrentUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [birthDay, setBirthDay] = useState('15');
  const [birthMonth, setBirthMonth] = useState('06');
  const [birthYear, setBirthYear] = useState('2000');
  const [gender, setGender] = useState<'male' | 'female' | 'custom'>('male');
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [successUser, setSuccessUser] = useState<CurrentUser | null>(null);

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
  ];

  if (!isOpen) return null;

  const handleInstantDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const demoUser: CurrentUser = {
        name: 'রুপম ইসলাম (GreenShop)',
        phoneOrEmail: '01700-123456',
        avatar: sampleAvatars[0],
        isLoggedIn: true,
        provider: 'manual',
        joinedDate: 'আজকে'
      };
      setIsLoading(false);
      setSuccessUser(demoUser);
      setTimeout(() => {
        onLoginSuccess(demoUser);
        onClose();
        setSuccessUser(null);
      }, 1000);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const fullName = mode === 'signup'
      ? `${firstName.trim()} ${lastName.trim()}`.trim() || 'গ্রিনশপ ইউজার'
      : emailOrPhone.split('@')[0] || 'গ্রিনশপ ইউজার';

    setTimeout(() => {
      const newUser: CurrentUser = {
        name: fullName,
        phoneOrEmail: emailOrPhone || 'user@example.com',
        avatar: sampleAvatars[avatarIndex],
        isLoggedIn: true,
        provider: 'manual',
        joinedDate: 'আজকে'
      };
      setIsLoading(false);
      setSuccessUser(newUser);
      setTimeout(() => {
        onLoginSuccess(newUser);
        onClose();
        setSuccessUser(null);
      }, 1000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#16171d] border border-emerald-500/30 rounded-3xl overflow-hidden shadow-2xl text-neutral-200 my-auto">
        
        {/* GreenShop Signature Emerald Green Header Bar */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 px-5 py-4 text-white flex items-center justify-between shadow-lg shadow-emerald-950/40">
          <div className="flex items-center gap-3">
            {/* GreenShop Shopping Bag Logo */}
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-md">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight flex items-center">
                  Green<span className="text-emerald-100">Shop</span>
                </span>
                <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full text-white uppercase tracking-wider">
                  Member
                </span>
              </div>
              <p className="text-[11px] text-emerald-100 font-medium flex items-center gap-1">
                <Leaf className="w-3 h-3 inline text-emerald-200" />
                <span>{mode === 'signup' ? 'নতুন অ্যাকাউন্ট খুলুন (Sign Up)' : 'গ্রিনশপে লগইন করুন (Log In)'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/20 hover:bg-black/35 text-white transition-colors cursor-pointer"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {successUser ? (
          <div className="p-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border-2 border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">লগইন সফল হয়েছে!</h3>
              <p className="text-xs text-emerald-400 mt-1 font-medium">
                স্বাগতম, {successUser.name}
              </p>
              <p className="text-[11px] text-neutral-400 mt-1">
                আপনার গ্রিনশপ প্রোফাইল নাম ও অ্যাকাউন্ট সম্পূর্ণ সক্রিয় হয়েছে।
              </p>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6 space-y-4">

            {/* Quick 1-Click Instant GreenShop Login Button */}
            <button
              type="button"
              onClick={handleInstantDemoLogin}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 active:scale-[0.99] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-emerald-950/50 cursor-pointer group border border-emerald-400/30"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span>১-ক্লিকে গ্রিনশপ অ্যাকাউন্ট চালু করুন</span>
              <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-[#2b2d39] w-full"></div>
              <span className="bg-[#16171d] px-3 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider shrink-0">
                অথবা বিস্তারিত পূরণ করুন
              </span>
            </div>

            {/* Mode Selector Tabs (Sign Up vs Log In) */}
            <div className="grid grid-cols-2 gap-2 bg-[#101115] p-1 rounded-xl border border-[#262833]">
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                নতুন অ্যাকাউন্ট (Sign Up)
              </button>
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                লগইন (Log In)
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === 'signup' && (
                <>
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-300 mb-1">
                        নামের প্রথম অংশ
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        placeholder="যেমন: রুপম"
                        className="w-full bg-[#101115] text-white text-xs px-3 py-2.5 rounded-xl border border-[#2b2d39] focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-300 mb-1">
                        পদবী (Last name)
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        placeholder="যেমন: ইসলাম"
                        className="w-full bg-[#101115] text-white text-xs px-3 py-2.5 rounded-xl border border-[#2b2d39] focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Avatar Picker Preview */}
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-300 mb-1.5">
                      প্রোফাইল ছবি নির্বাচন করুন
                    </label>
                    <div className="flex items-center gap-2">
                      {sampleAvatars.map((url, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatarIndex(idx)}
                          className={`relative rounded-full overflow-hidden border-2 transition-all p-0.5 cursor-pointer ${
                            avatarIndex === idx
                              ? 'border-emerald-400 scale-110 shadow-md shadow-emerald-500/30'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={url}
                            alt="avatar"
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Mobile number or Email */}
              <div>
                <label className="block text-[11px] font-medium text-neutral-300 mb-1">
                  মোবাইল নম্বর অথবা ইমেইল ঠিকানা
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3 w-4 h-4 text-emerald-500" />
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    required
                    placeholder="017XX-XXXXXX বা email@gmail.com"
                    className="w-full bg-[#101115] text-white text-xs pl-9 pr-3 py-2.5 rounded-xl border border-[#2b2d39] focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-medium text-neutral-300">
                    {mode === 'signup' ? 'নতুন পাসওয়ার্ড' : 'পাসওয়ার্ড'}
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => alert('পাসওয়ার্ড রিকভারি কোড আপনার মোবাইলে পাঠানো হয়েছে।')}
                      className="text-[10px] text-emerald-400 hover:underline"
                    >
                      পাসওয়ার্ড ভুলে গেছেন?
                    </button>
                  )}
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 w-4 h-4 text-emerald-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="পাসওয়ার্ড লিখুন"
                    className="w-full bg-[#101115] text-white text-xs pl-9 pr-9 py-2.5 rounded-xl border border-[#2b2d39] focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-neutral-500 hover:text-neutral-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Date of Birth & Gender in Signup */}
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-300 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-400" />
                      <span>জন্মতারিখ (Date of Birth)</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={birthDay}
                        onChange={(e) => setBirthDay(e.target.value)}
                        className="bg-[#101115] text-white text-xs px-2 py-2 rounded-xl border border-[#2b2d39] focus:border-emerald-500 focus:outline-none cursor-pointer"
                      >
                        {Array.from({ length: 31 }, (_, i) => (
                          <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      <select
                        value={birthMonth}
                        onChange={(e) => setBirthMonth(e.target.value)}
                        className="bg-[#101115] text-white text-xs px-2 py-2 rounded-xl border border-[#2b2d39] focus:border-emerald-500 focus:outline-none cursor-pointer"
                      >
                        <option value="01">জানুয়ারি</option>
                        <option value="02">ফেব্রুয়ারি</option>
                        <option value="03">মার্চ</option>
                        <option value="04">এপ্রিল</option>
                        <option value="05">মে</option>
                        <option value="06">জুন</option>
                        <option value="07">জুলাই</option>
                        <option value="08">আগস্ট</option>
                        <option value="09">সেপ্টেম্বর</option>
                        <option value="10">অক্টোবর</option>
                        <option value="11">নভেম্বর</option>
                        <option value="12">ডিসেম্বর</option>
                      </select>
                      <select
                        value={birthYear}
                        onChange={(e) => setBirthYear(e.target.value)}
                        className="bg-[#101115] text-white text-xs px-2 py-2 rounded-xl border border-[#2b2d39] focus:border-emerald-500 focus:outline-none cursor-pointer"
                      >
                        {Array.from({ length: 45 }, (_, i) => 2015 - i).map((yr) => (
                          <option key={yr} value={String(yr)}>
                            {yr}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Gender Selector */}
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-300 mb-1">
                      লিঙ্গ (Gender)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <label className="flex items-center justify-between p-2 rounded-xl bg-[#101115] border border-[#2b2d39] cursor-pointer text-xs">
                        <span>মহিলা</span>
                        <input
                          type="radio"
                          name="gender"
                          checked={gender === 'female'}
                          onChange={() => setGender('female')}
                          className="accent-emerald-500"
                        />
                      </label>
                      <label className="flex items-center justify-between p-2 rounded-xl bg-[#101115] border border-[#2b2d39] cursor-pointer text-xs">
                        <span>পুরুষ</span>
                        <input
                          type="radio"
                          name="gender"
                          checked={gender === 'male'}
                          onChange={() => setGender('male')}
                          className="accent-emerald-500"
                        />
                      </label>
                      <label className="flex items-center justify-between p-2 rounded-xl bg-[#101115] border border-[#2b2d39] cursor-pointer text-xs">
                        <span>অন্যান্য</span>
                        <input
                          type="radio"
                          name="gender"
                          checked={gender === 'custom'}
                          onChange={() => setGender('custom')}
                          className="accent-emerald-500"
                        />
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 text-white font-black text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/50 cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 active:scale-[0.99] border border-emerald-400/30"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : mode === 'signup' ? (
                    'গ্রিনশপ অ্যাকাউন্ট তৈরি করুন (Sign Up)'
                  ) : (
                    'লগইন করুন (Log In)'
                  )}
                </button>
              </div>
            </form>

            {/* Bottom Security Guarantee */}
            <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 border-t border-[#23252f]">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>GreenShop Secured Authentication & Privacy Guaranteed</span>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
