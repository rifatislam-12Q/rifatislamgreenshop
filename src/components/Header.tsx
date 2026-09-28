import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  ShoppingCart,
  Bell,
  Menu,
  Settings,
  AlertTriangle,
  Headphones,
  ChevronRight
} from 'lucide-react';
import { SidebarTab } from '../types';
import { QuickMenuModal } from './QuickMenuModal';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth?: () => void;
  onOpenChat?: () => void;
  onToggleMobileSidebar: () => void;
  activeTab: SidebarTab;
  onSelectTab: (tab: SidebarTab) => void;
  unreadNotificationCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  onToggleMobileSidebar,
  activeTab,
  onSelectTab,
  unreadNotificationCount = 0,
}) => {
  const isNotificationActive = activeTab === 'notifications';

  // 3-line menu dropdown and modal states
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const [isQuickModalOpen, setIsQuickModalOpen] = useState(false);
  const [modalSection, setModalSection] = useState<'settings' | 'report' | 'customer_service'>('settings');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenSection = (section: 'settings' | 'report' | 'customer_service') => {
    setModalSection(section);
    setIsMenuDropdownOpen(false);
    setIsQuickModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-2 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#121215]/95 backdrop-blur-md border-b border-[#232328] text-white">
      {/* Left: Mobile Menu, Brand Logo & 3-line Options Icon */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        <button
          id="mobile-sidebar-toggle-btn"
          onClick={onToggleMobileSidebar}
          aria-label="Open navigation menu"
          className="lg:hidden p-1.5 sm:p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-[#1f2026] border border-transparent hover:border-neutral-700/50 transition-all active:scale-95 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <a
          href="#"
          id="brand-logo-link"
          className="flex items-center gap-1.5 sm:gap-2.5 group transition-transform active:scale-95 select-none"
        >
          {/* Green shopping bag icon matching branding */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center border border-emerald-500/30 text-emerald-400 group-hover:border-emerald-400/60 group-hover:shadow-md group-hover:shadow-emerald-500/20 transition-all duration-300">
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 group-hover:scale-105 transition-transform" />
          </div>
          <span className="text-base sm:text-xl font-bold tracking-tight text-white hidden min-[380px]:inline-flex items-center">
            Green<span className="text-emerald-400">Shop</span>
          </span>
        </a>

        {/* 3-Line Menu Button Right Beside GreenShop Logo */}
        <div className="relative" ref={dropdownRef}>
          <button
            id="greenshop-3line-menu-btn"
            onClick={() => setIsMenuDropdownOpen(!isMenuDropdownOpen)}
            title="সেটিংস, রিপোর্ট ও কাস্টমার সার্ভিস"
            aria-label="Settings, Report, Customer Service menu"
            className={`p-1.5 sm:p-2 rounded-xl border transition-all active:scale-95 flex items-center justify-center cursor-pointer ${
              isMenuDropdownOpen
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-sm'
                : 'bg-[#1a1b20] hover:bg-[#24252f] text-neutral-300 hover:text-emerald-400 border-[#2b2d37] hover:border-emerald-500/40'
            }`}
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>

          {/* Dropdown Menu Popup */}
          {isMenuDropdownOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-[#16171f] border border-[#2b2d3a] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 p-1.5 space-y-1">
              <div className="px-3 py-2 border-b border-[#242633] text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                সহায়তা ও সেটিংস মেনু
              </div>

              {/* 1. সেটিং (Settings) */}
              <button
                onClick={() => handleOpenSection('settings')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#20222d] text-left text-xs text-neutral-200 hover:text-white transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                    <Settings className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-white">সেটিংস (Settings)</span>
                    <span className="text-[10px] text-neutral-400">ভাষা, কারেন্সি ও নোটিফিকেশন</span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* 2. রিপোর্ট (Report) */}
              <button
                onClick={() => handleOpenSection('report')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#20222d] text-left text-xs text-neutral-200 hover:text-white transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-rose-500/15 text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-white">রিপোর্ট (Report)</span>
                    <span className="text-[10px] text-neutral-400">নকল পণ্য বা সেলারের বিরুদ্ধে অভিযোগ</span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* 3. কাস্টমার সার্ভিস (Customer Service) */}
              <button
                onClick={() => handleOpenSection('customer_service')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#20222d] text-left text-xs text-neutral-200 hover:text-white transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-blue-500/15 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-white">কাস্টমার সার্ভিস (Customer Service)</span>
                    <span className="text-[10px] text-neutral-400">হটলাইন, হোয়াটসঅ্যাপ ও লাইভ সাপোর্ট</span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 min-w-[85px] max-w-xl mx-1.5 sm:mx-4 md:mx-8">
        <div className="relative flex items-center group">
          <input
            id="global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="w-full h-8 sm:h-9 md:h-10 pl-3 sm:pl-4 pr-8 sm:pr-10 text-xs sm:text-sm bg-[#1a1b20] text-neutral-200 placeholder-neutral-500 rounded-full border border-neutral-800 focus:border-emerald-500 focus:bg-[#1e1f25] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
          />
          <button
            id="global-search-btn"
            aria-label="Search"
            className="absolute right-2.5 sm:right-3 p-1 text-neutral-400 hover:text-emerald-400 transition-colors"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Right Controls: Only Notification and Shop Icons (Professional & Clean) */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
        {/* Professional Notification Icon Button */}
        <button
          id="header-notification-btn"
          onClick={() => onSelectTab('notifications')}
          title="বিজ্ঞপ্তি (Notifications)"
          aria-label={`Notifications, ${unreadNotificationCount} unread`}
          className={`relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl transition-all duration-200 active:scale-95 group cursor-pointer ${
            isNotificationActive
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/50 shadow-sm shadow-emerald-500/20'
              : 'bg-[#1a1b20] hover:bg-[#23242c] text-neutral-300 hover:text-white border border-[#2b2d37] hover:border-emerald-500/40 shadow-sm'
          }`}
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12" />
          
          {unreadNotificationCount > 0 && (
            <>
              {/* Subtle pulsing indicator ring */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              </span>
              
              {/* High-visibility counter badge */}
              <span
                id="header-notification-badge"
                className="absolute -top-1.5 -right-1.5 min-w-[18px] sm:min-w-[20px] h-[18px] sm:h-[20px] px-1 bg-gradient-to-r from-rose-500 to-red-600 text-white text-[9px] sm:text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-[#121215] shadow-md shadow-rose-950/60"
              >
                {unreadNotificationCount > 99 ? '99+' : unreadNotificationCount}
              </span>
            </>
          )}
        </button>

        {/* Professional Shop / Cart Icon Button */}
        <button
          id="header-cart-floating-btn"
          onClick={onOpenCart}
          title="শপ কার্ট (Shopping Cart)"
          aria-label={`View shop cart, ${cartCount} items`}
          className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-medium shadow-md shadow-emerald-950/50 hover:shadow-emerald-500/30 border border-emerald-400/30 transition-all duration-200 active:scale-95 group cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:scale-110" />
          
          {cartCount > 0 ? (
            <span
              id="cart-badge-count"
              className="absolute -top-1.5 -right-1.5 min-w-[18px] sm:min-w-[20px] h-[18px] sm:h-[20px] px-1 bg-[#0a1a12] border-2 border-emerald-400 text-emerald-300 text-[9px] sm:text-[10px] font-black rounded-full flex items-center justify-center shadow-lg"
            >
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          ) : (
            /* Subtle active shop indicator dot if cart is empty */
            <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-white/70"></span>
          )}
        </button>
      </div>

      {/* Quick Menu Modal (Settings, Report, Customer Service) */}
      <QuickMenuModal
        isOpen={isQuickModalOpen}
        onClose={() => setIsQuickModalOpen(false)}
        defaultSection={modalSection}
      />
    </header>
  );
};
