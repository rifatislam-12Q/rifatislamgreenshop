import React, { useState } from 'react';
import { Truck, ShieldCheck, RefreshCw, PhoneCall, X, Sparkles } from 'lucide-react';

export const TrustBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(() => {
    try {
      return localStorage.getItem('greenshop_trust_dismissed') !== 'true';
    } catch {
      return true;
    }
  });

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem('greenshop_trust_dismissed', 'true');
    } catch {
      // fallback
    }
  };

  if (!isVisible) return null;

  return (
    <div className="relative mb-5 bg-gradient-to-r from-[#14161c] via-[#171a22] to-[#14161c] border border-emerald-500/20 rounded-2xl p-3 sm:p-3.5 shadow-lg shadow-black/40 overflow-hidden">
      {/* Background Accent Shimmer */}
      <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Left Badge & Tagline */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-white text-xs sm:text-sm">
            গ্রিনশপ প্রিমিয়াম সার্ভিস গ্যারান্টি:
          </span>
        </div>

        {/* 4 Feature Items */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 flex-1 w-full md:w-auto">
          
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <Truck className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-bold text-neutral-200 text-[11px] leading-tight">ক্যাশ অন ডেলিভারি</p>
              <p className="text-[10px] text-neutral-500">পণ্য হাতে পেয়ে মূল্য দিন</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-bold text-neutral-200 text-[11px] leading-tight">১০০% অর্গানিক</p>
              <p className="text-[10px] text-neutral-500">খাঁটি ও প্রাকৃতিক পণ্য</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <RefreshCw className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-bold text-neutral-200 text-[11px] leading-tight">৭ দিনের রিটার্ন</p>
              <p className="text-[10px] text-neutral-500">সহজ রিপ্লেসমেন্ট পলিসি</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <PhoneCall className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-bold text-neutral-200 text-[11px] leading-tight">হটলাইন সাপোর্ট</p>
              <p className="text-[10px] text-emerald-400 font-mono font-bold">01712-987654</p>
            </div>
          </div>

        </div>

        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="p-1 rounded-lg text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/60 transition-colors shrink-0 ml-auto md:ml-0 cursor-pointer"
          title="হাইড করুন"
        >
          <X className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
