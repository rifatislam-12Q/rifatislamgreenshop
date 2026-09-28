import React, { useState } from 'react';
import {
  X,
  Settings,
  AlertTriangle,
  Headphones,
  CheckCircle2,
  Phone,
  MessageCircle,
  Mail,
  ChevronRight,
  ShieldAlert,
  Globe,
  Bell,
  Moon,
  Send,
  HelpCircle,
  ExternalLink,
  Save,
  ArrowLeft
} from 'lucide-react';

interface QuickMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSection?: 'settings' | 'report' | 'customer_service';
}

export const QuickMenuModal: React.FC<QuickMenuModalProps> = ({
  isOpen,
  onClose,
  defaultSection = 'settings',
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'report' | 'customer_service'>(defaultSection);

  // Settings State
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [currency, setCurrency] = useState<'bdt' | 'usd'>('bdt');
  const [orderNotifs, setOrderNotifs] = useState(true);
  const [promoSms, setPromoSms] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Report State
  const [reportType, setReportType] = useState('fake_product');
  const [reportOrderNo, setReportOrderNo] = useState('');
  const [reportText, setReportText] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportTicketId, setReportTicketId] = useState('');

  // Customer Service State
  const [supportMessage, setSupportMessage] = useState('');
  const [supportMessageSent, setSupportMessageSent] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;

    const ticket = `REP-${Math.floor(100000 + Math.random() * 900000)}`;
    setReportTicketId(ticket);
    setReportSubmitted(true);
  };

  const handleSendSupportMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setSupportMessageSent(true);
    setTimeout(() => {
      setSupportMessage('');
      setSupportMessageSent(false);
    }, 3500);
  };

  const faqs = [
    {
      q: 'অর্ডার করার কতদিনের মধ্যে ডেলিভারি পাবো?',
      a: 'ঢাকা সিটির মধ্যে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে সর্বোচ্চ ৭২ ঘণ্টার মধ্যে সারাদেশে ডেলিভারি সম্পন্ন হয়।',
    },
    {
      q: 'পণ্য পছন্দ না হলে কীভাবে রিটার্ন বা রিফান্ড পাবো?',
      a: 'পণ্য পাওয়ার পর ৭ দিনের মধ্যে আমাদের কাস্টমার সার্ভিসে জানালে পণ্য রিটার্ন নিয়ে পুরো মূল্য বিকাশ বা ব্যাংকের মাধ্যমে ফেরত দেওয়া হয়।',
    },
    {
      q: 'ক্যাশ অন ডেলিভারিতে চেক করে টাকা দেওয়া যাবে?',
      a: 'হ্যাঁ, ডেলিভারি ম্যানের সামনে প্যাকেট খুলে চেক করে আপনি পণ্য বুঝে নিয়ে টাকা পরিশোধ করতে পারবেন।',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#14151a] border border-[#2b2d38] rounded-3xl overflow-hidden shadow-2xl text-neutral-200 flex flex-col max-h-[90vh]">
        
        {/* Header Bar with Back Button */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-[#23242c] bg-[#17181f]">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Back Button Icon */}
            <button
              id="back-from-settings-btn"
              onClick={onClose}
              className="p-2 -ml-1 rounded-xl bg-[#20212a] hover:bg-emerald-600 text-neutral-200 hover:text-black transition-all flex items-center gap-1.5 cursor-pointer border border-[#2d2f3d] hover:border-emerald-500 shadow-sm group"
              title="ব্যাকে যান (Back)"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-xs font-bold hidden sm:inline">Back</span>
            </button>

            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white leading-tight">
                  {activeTab === 'settings'
                    ? 'সেটিংস (Settings)'
                    : activeTab === 'report'
                    ? 'রিপোর্ট (Report)'
                    : 'কাস্টমার সার্ভিস (Customer Service)'}
                </h2>
                <p className="text-[10px] sm:text-[11px] text-neutral-400">
                  GreenShop কন্ট্রোল ও সহায়তা কেন্দ্র
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            title="বন্ধ করুন (Close)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Nav Tabs: Settings, Report, Customer Service */}
        <div className="flex items-center p-1.5 sm:p-2 bg-[#101115] border-b border-[#202128] gap-1 sm:gap-2">
          
          {/* Tab 1: Settings */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 sm:py-2.5 px-1.5 sm:px-3 rounded-xl font-bold text-[11px] sm:text-xs md:text-sm flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                : 'text-neutral-400 hover:text-white hover:bg-[#1a1b22]'
            }`}
          >
            <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>সেটিংস</span>
            <span className="hidden md:inline">(Settings)</span>
          </button>

          {/* Tab 2: Report */}
          <button
            onClick={() => setActiveTab('report')}
            className={`flex-1 py-2 sm:py-2.5 px-1.5 sm:px-3 rounded-xl font-bold text-[11px] sm:text-xs md:text-sm flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
              activeTab === 'report'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-950/50'
                : 'text-neutral-400 hover:text-white hover:bg-[#1a1b22]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>রিপোর্ট</span>
            <span className="hidden md:inline">(Report)</span>
          </button>

          {/* Tab 3: Customer Service */}
          <button
            onClick={() => setActiveTab('customer_service')}
            className={`flex-1 py-2 sm:py-2.5 px-1.5 sm:px-3 rounded-xl font-bold text-[11px] sm:text-xs md:text-sm flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
              activeTab === 'customer_service'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-950/50'
                : 'text-neutral-400 hover:text-white hover:bg-[#1a1b22]'
            }`}
          >
            <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>সার্ভিস</span>
            <span className="hidden sm:inline"> (Help)</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin">
          
          {/* ============================================================== */}
          {/* SECTION 1: SETTINGS (সেটিংস) */}
          {/* ============================================================== */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-4 animate-in fade-in">
              
              {/* Language & Currency */}
              <div className="p-4 rounded-2xl bg-[#191a22] border border-[#2b2d39] space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  <span>ভাষা ও কারেন্সি (Language & Currency)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">ভাষা নির্বাচন করুন:</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as 'bn' | 'en')}
                      className="w-full px-3 py-2 bg-[#121317] border border-[#2f3140] rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="bn">বাংলা (Bengali)</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">কারেন্সি:</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as 'bdt' | 'usd')}
                      className="w-full px-3 py-2 bg-[#121317] border border-[#2f3140] rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="bdt">৳ BDT (বাংলাদেশি টাকা)</option>
                      <option value="usd">$ USD (US Dollar)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="p-4 rounded-2xl bg-[#191a22] border border-[#2b2d39] space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Bell className="w-4 h-4" />
                  <span>নোটিফিকেশন ও অ্যালার্ট (Notifications)</span>
                </h3>

                <div className="space-y-2 pt-1">
                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#131418] border border-[#262833] cursor-pointer">
                    <div>
                      <span className="text-xs font-semibold text-white block">অর্ডার স্ট্যাটাস আপডেট নোটিফিকেশন</span>
                      <span className="text-[11px] text-neutral-400">ডেলিভারি এবং ট্র্যাকিং সংক্রান্ত রিয়েলটাইম মেসেজ</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={orderNotifs}
                      onChange={(e) => setOrderNotifs(e.target.checked)}
                      className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#131418] border border-[#262833] cursor-pointer">
                    <div>
                      <span className="text-xs font-semibold text-white block">অফার ও ডিসকাউন্ট এসএমএস</span>
                      <span className="text-[11px] text-neutral-400">সাপ্তাহিক স্পেশাল ডিসকাউন্ট অ্যালার্ট</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={promoSms}
                      onChange={(e) => setPromoSms(e.target.checked)}
                      className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#131418] border border-[#262833] cursor-pointer">
                    <div>
                      <span className="text-xs font-semibold text-white block">সাউন্ড ও ক্লিক ইফেক্টস</span>
                      <span className="text-[11px] text-neutral-400">কার্ট ও বাটনে চাপ দিলে সাউন্ড প্লে হবে</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={soundEnabled}
                      onChange={(e) => setSoundEnabled(e.target.checked)}
                      className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {/* Save & Back Buttons */}
              <div className="flex items-center justify-between pt-2">
                {settingsSaved ? (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>সেটিংস সফলভাবে সংরক্ষিত হয়েছে!</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-neutral-400">
                    পরিবর্তনগুলো স্বয়ংক্রিয়ভাবে সংরক্ষিত থাকে
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 bg-[#20212a] hover:bg-[#282a35] text-neutral-300 hover:text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-all border border-[#2e303d]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-lg transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>সেভ করুন</span>
                  </button>
                </div>
              </div>

            </form>
          )}

          {/* ============================================================== */}
          {/* SECTION 2: REPORT (রিপোর্ট) */}
          {/* ============================================================== */}
          {activeTab === 'report' && (
            <div className="space-y-4 animate-in fade-in">
              
              {!reportSubmitted ? (
                <form onSubmit={handleReportSubmit} className="space-y-3.5">
                  <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex items-center gap-3">
                    <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-rose-300">কোনো সমস্যা বা অনিয়ম লক্ষ্য করেছেন?</h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        ভুল তথ্য, নকল পণ্য, সেলারের প্রতারণা বা অ্যাপ সংক্রান্ত সমস্যা জানাতে রিপোর্ট করুন। ২৪ ঘণ্টার মধ্যে ব্যবস্থা নেওয়া হবে।
                      </p>
                    </div>
                  </div>

                  {/* Report Type */}
                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">
                      রিপোর্টের ধরন নির্বাচন করুন: *
                    </label>
                    <select
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#121317] border border-[#2f3140] rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                    >
                      <option value="fake_product">নকল বা ভেজাল পণ্য (Counterfeit Item)</option>
                      <option value="seller_fraud">সেলার যোগাযোগ করছে না বা প্রতারণা</option>
                      <option value="damaged_item">ভাঙা বা নষ্ট পণ্য ডেলিভারি</option>
                      <option value="payment_issue">বিকাশ বা পেমেন্ট সংক্রান্ত সমস্যা</option>
                      <option value="technical_bug">অ্যাপে বাগ বা টেকনিক্যাল ত্রুটি</option>
                      <option value="other">অন্যান্য সমস্যা (Other Issue)</option>
                    </select>
                  </div>

                  {/* Order Number / Seller ID */}
                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">
                      অর্ডার নম্বর বা সেলারের নাম (ঐচ্ছিক):
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: #GS-849201 অথবা Green Valley Farms"
                      value={reportOrderNo}
                      onChange={(e) => setReportOrderNo(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#121317] border border-[#2f3140] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  {/* Details textarea */}
                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">
                      সমস্যার বিস্তারিত বিবরণ দিন: *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="সমস্যাটি কী ঘটেছিল স্পষ্ট করে লিখুন..."
                      value={reportText}
                      onChange={(e) => setReportText(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#121317] border border-[#2f3140] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-lg transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>রিপোর্ট জমা দিন</span>
                    </button>
                  </div>

                </form>
              ) : (
                /* Report Success Receipt */
                <div className="py-6 text-center space-y-4 animate-in zoom-in-95">
                  <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border-2 border-rose-500 shadow-xl">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      আপনার রিপোর্ট সফলভাবে গ্রহণ করা হয়েছে
                    </h3>
                    <p className="text-xs text-neutral-300 mt-1">
                      টিকিট নম্বর: <span className="font-mono text-rose-400 font-bold px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30">{reportTicketId}</span>
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-2 max-w-sm mx-auto">
                      আমাদের তদন্তকারী দল দ্রুত বিষয়টি খতিয়ে দেখে প্রয়োজনীয় আইনি ও পলিসি অনুযায়ী ব্যবস্থা নেবে।
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setReportSubmitted(false);
                      setReportText('');
                      setReportOrderNo('');
                    }}
                    className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl cursor-pointer transition-all"
                  >
                    আরেকটি রিপোর্ট করুন
                  </button>
                </div>
              )}

            </div>
          )}

          {/* ============================================================== */}
          {/* SECTION 3: CUSTOMER SERVICE (কাস্টমার সার্ভিস) */}
          {/* ============================================================== */}
          {activeTab === 'customer_service' && (
            <div className="space-y-4 animate-in fade-in">
              
              {/* Quick Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Helpline Call */}
                <a
                  href="tel:+8801700000000"
                  className="p-3.5 rounded-2xl bg-[#191a22] border border-[#2b2d39] hover:border-emerald-500/50 flex flex-col justify-between group transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-400 block">২৪/৭ হটলাইন</span>
                    <span className="text-xs font-bold text-white group-hover:text-emerald-400">০১৭০০-১২৩৪৫৬</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 mt-1 block">সরাসরি কল দিন →</span>
                </a>

                {/* WhatsApp Support */}
                <a
                  href="https://wa.me/8801700000000"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-[#191a22] border border-[#2b2d39] hover:border-emerald-500/50 flex flex-col justify-between group transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-400 block">হোয়াটসঅ্যাপ চ্যাট</span>
                    <span className="text-xs font-bold text-white group-hover:text-green-400">তাৎক্ষণিক সমাধান</span>
                  </div>
                  <span className="text-[10px] text-green-400 mt-1 block">মেসেজ পাঠান →</span>
                </a>

                {/* Email Support */}
                <a
                  href="mailto:support@greenshop.com"
                  className="p-3.5 rounded-2xl bg-[#191a22] border border-[#2b2d39] hover:border-blue-500/50 flex flex-col justify-between group transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-400 block">অফিসিয়াল ইমেইল</span>
                    <span className="text-xs font-bold text-white group-hover:text-blue-400">support@greenshop.com</span>
                  </div>
                  <span className="text-[10px] text-blue-400 mt-1 block">মেইল পাঠান →</span>
                </a>

              </div>

              {/* Direct Support Message Box */}
              <div className="p-4 rounded-2xl bg-[#191a22] border border-[#2b2d39] space-y-3">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Headphones className="w-4 h-4" />
                  <span>কাস্টমার কেয়ারে সরাসরি বার্তা পাঠান</span>
                </h4>

                {supportMessageSent ? (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ধন্যবাদ! আপনার বার্তাটি প্রতিনিধি টিমে পৌঁছেছে। ১০ মিনিটের মধ্যে রিপ্লাই দেওয়া হবে।</span>
                  </div>
                ) : (
                  <form onSubmit={handleSendSupportMessage} className="space-y-2">
                    <textarea
                      rows={2}
                      required
                      placeholder="আপনার প্রশ্ন বা যে কোনো সাহায্যের জন্য লিখুন..."
                      value={supportMessage}
                      onChange={(e) => setSupportMessage(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#121317] border border-[#2f3140] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>সেন্ড করুন</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Frequently Asked Questions (FAQ) Accordion */}
              <div className="p-4 rounded-2xl bg-[#191a22] border border-[#2b2d39] space-y-2.5">
                <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <HelpCircle className="w-4 h-4 text-emerald-400" />
                  <span>সাধারণ প্রশ্নোত্তর (FAQ)</span>
                </h4>

                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-[#131418] border border-[#262833] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full p-3 text-left text-xs font-semibold text-white flex items-center justify-between cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronRight
                        className={`w-4 h-4 text-neutral-400 transition-transform ${
                          activeFaq === idx ? 'rotate-90 text-emerald-400' : ''
                        }`}
                      />
                    </button>
                    {activeFaq === idx && (
                      <div className="px-3 pb-3 text-[11px] text-neutral-400 leading-relaxed border-t border-[#22242e] pt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
