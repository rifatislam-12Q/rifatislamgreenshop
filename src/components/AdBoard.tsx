import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Megaphone,
  Settings,
  Sparkles,
  ArrowRight,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Eye,
  EyeOff,
  Image as ImageIcon,
  RotateCw,
} from 'lucide-react';
import { AdItem } from '../types';
import { INITIAL_ADS } from '../data/ads';

interface AdBoardProps {
  onSelectCategory?: (category: string) => void;
}

export const AdBoard: React.FC<AdBoardProps> = ({ onSelectCategory }) => {
  const [ads, setAds] = useState<AdItem[]>(() => {
    try {
      const saved = localStorage.getItem('greenshop_ads_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_ADS;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<AdItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // New Ad form state
  const [formData, setFormData] = useState<Partial<AdItem>>({
    badge: 'SPONSORED PROMO',
    title: '',
    subtitle: '',
    discountText: 'SPECIAL DISCOUNT',
    imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=1200&auto=format&fit=crop&q=80',
    actionText: 'Explore Collection',
    targetCategory: 'Home & Garden',
    sponsorName: 'GreenShop Admin Special',
    isActive: true,
  });

  // Only active ads are displayed in the carousel
  const activeAds = ads.filter((ad) => ad.isActive);

  // Auto-rotate every 6 seconds if not paused
  useEffect(() => {
    if (isPaused || activeAds.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAds.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, activeAds.length]);

  // Adjust index if out of bounds
  useEffect(() => {
    if (currentIndex >= activeAds.length && activeAds.length > 0) {
      setCurrentIndex(0);
    }
  }, [activeAds.length, currentIndex]);

  // Save to localStorage
  const saveAds = (newAds: AdItem[]) => {
    setAds(newAds);
    try {
      localStorage.setItem('greenshop_ads_v1', JSON.stringify(newAds));
    } catch {
      // ignore
    }
  };

  const handleNext = () => {
    if (activeAds.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % activeAds.length);
  };

  const handlePrev = () => {
    if (activeAds.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + activeAds.length) % activeAds.length);
  };

  const handleToggleAdStatus = (adId: string) => {
    const updated = ads.map((a) => (a.id === adId ? { ...a, isActive: !a.isActive } : a));
    saveAds(updated);
  };

  const handleDeleteAd = (adId: string) => {
    if (ads.length <= 1) {
      alert('At least one ad must remain in the system.');
      return;
    }
    const updated = ads.filter((a) => a.id !== adId);
    saveAds(updated);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      alert('Please enter an ad title');
      return;
    }

    if (editingAd) {
      // Edit existing
      const updated = ads.map((a) =>
        a.id === editingAd.id ? ({ ...a, ...formData } as AdItem) : a
      );
      saveAds(updated);
      setEditingAd(null);
    } else {
      // Create new
      const newAd: AdItem = {
        id: `ad-${Date.now()}`,
        badge: formData.badge || 'PROMOTION',
        title: formData.title || '',
        subtitle: formData.subtitle || '',
        discountText: formData.discountText || '',
        imageUrl:
          formData.imageUrl ||
          'https://images.unsplash.com/photo-1545241047-6083a3684587?w=1200&auto=format&fit=crop&q=80',
        actionText: formData.actionText || 'Shop Now',
        targetCategory: formData.targetCategory || 'All',
        sponsorName: formData.sponsorName || 'GreenShop Partner',
        isActive: true,
        bgGradient: 'from-emerald-950/90 via-[#0b1d16]/85 to-neutral-950/95',
      };
      saveAds([newAd, ...ads]);
      setIsCreatingNew(false);
    }

    // Reset form
    setFormData({
      badge: 'SPONSORED PROMO',
      title: '',
      subtitle: '',
      discountText: 'SPECIAL DISCOUNT',
      imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=1200&auto=format&fit=crop&q=80',
      actionText: 'Explore Collection',
      targetCategory: 'Home & Garden',
      sponsorName: 'GreenShop Admin Special',
      isActive: true,
    });
  };

  const handleStartEdit = (ad: AdItem) => {
    setEditingAd(ad);
    setFormData(ad);
    setIsCreatingNew(false);
  };

  const handleResetDefaults = () => {
    if (confirm('Reset to default GreenShop promotional campaigns?')) {
      saveAds(INITIAL_ADS);
      setIsAdminOpen(false);
    }
  };

  // Preset image suggestions
  const presetImages = [
    { label: 'Tea Garden', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Monstera Plant', url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Clay Pottery', url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Organic Honey', url: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Mini Succulents', url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&auto=format&fit=crop&q=80' },
  ];

  const currentAd = activeAds[currentIndex] || ads[0];

  return (
    <div className="mb-5 sm:mb-6">
      {/* ============================================================== */}
      {/* AD BOARD MAIN BANNER CAROUSEL */}
      {/* ============================================================== */}
      {currentAd ? (
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full rounded-2xl overflow-hidden border border-[#2c2d38] shadow-2xl group transition-all"
        >
          {/* Subtle Admin Settings Button visible on hover */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="absolute top-3 right-3 z-30 p-2 rounded-xl bg-black/50 hover:bg-black/80 text-white/70 hover:text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-white/10 shadow-sm"
            title="Manage Ads (Admin Control)"
          >
            <Settings className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Background Image with Parallax Style */}
          <div className="absolute inset-0 z-0">
            <img
              src={currentAd.imageUrl}
              alt={currentAd.title}
              className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
            />
            {/* Rich multi-stop dark gradient overlay for optimal readability */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${
                currentAd.bgGradient || 'from-emerald-950/95 via-[#0c1e17]/85 to-neutral-950/95'
              }`}
            />
            {/* Subtle mesh highlight pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
          </div>

          {/* Ad Content */}
          <div className="relative z-10 p-5 sm:p-7 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 min-h-[170px] sm:min-h-[190px]">
            
            {/* Left Content Area */}
            <div className="max-w-2xl space-y-2.5">
              {/* Badge & Sponsor info */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] sm:text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500 text-black shadow-xs tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-black" />
                  {currentAd.badge}
                </span>

                {currentAd.discountText && (
                  <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    {currentAd.discountText}
                  </span>
                )}

                {currentAd.sponsorName && (
                  <span className="text-[11px] text-neutral-300/80 hidden sm:inline">
                    by {currentAd.sponsorName}
                  </span>
                )}
              </div>

              {/* Main Headline */}
              <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-sm">
                {currentAd.title}
              </h2>

              {/* Subtitle / Description */}
              <p className="text-xs sm:text-sm text-neutral-200 line-clamp-2 leading-relaxed max-w-xl">
                {currentAd.subtitle}
              </p>
            </div>

            {/* Right Action Button & Navigation */}
            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-3 shrink-0">
              
              <button
                onClick={() => {
                  if (currentAd.targetCategory && onSelectCategory) {
                    onSelectCategory(currentAd.targetCategory);
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>{currentAd.actionText}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              {/* Slide Counter & Dots */}
              {activeAds.length > 1 && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1.5">
                    {activeAds.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          idx === currentIndex
                            ? 'w-6 bg-emerald-400'
                            : 'w-1.5 bg-white/40 hover:bg-white/70'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] text-neutral-400 font-mono ml-1">
                    {currentIndex + 1}/{activeAds.length}
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* Left / Right Carousel Controls */}
          {activeAds.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/10 cursor-pointer"
                aria-label="Previous Ad"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/10 cursor-pointer"
                aria-label="Next Ad"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

        </div>
      ) : (
        <div className="p-8 text-center bg-[#17181f] rounded-2xl border border-[#2b2c36] text-neutral-400">
          <p className="text-sm">Currently no active ads running on the board.</p>
          <button
            onClick={() => setIsAdminOpen(true)}
            className="mt-2 text-xs text-emerald-400 font-bold hover:underline"
          >
            Open Admin Control to create an ad
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* ADMIN CONTROL MODAL (FOR GREENSHOP ADMIN) */}
      {/* ============================================================== */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-[#181920] border border-[#2c2e3b] text-neutral-100 rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#292b37] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>GreenShop Admin Ad Manager</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-black">
                      Live Control
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400">
                    হোমপেজের অ্যাড বোর্ডে বিজ্ঞাপন চালু, পরিবর্তন বা নতুন অ্যাড যোগ করুন
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsAdminOpen(false);
                  setEditingAd(null);
                  setIsCreatingNew(false);
                }}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto py-4 space-y-6 scrollbar-thin">
              
              {/* Action buttons: Create New vs Manage List */}
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  Active & Scheduled Ads ({ads.length})
                </h4>

                <button
                  onClick={() => {
                    setIsCreatingNew(true);
                    setEditingAd(null);
                    setFormData({
                      badge: 'SPECIAL MEGA PROMO',
                      title: '',
                      subtitle: '',
                      discountText: 'FLAT 30% OFF',
                      imageUrl: presetImages[0].url,
                      actionText: 'Shop Now',
                      targetCategory: 'Organic Food',
                      sponsorName: 'GreenShop Partner',
                      isActive: true,
                    });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Ad</span>
                </button>
              </div>

              {/* Form for Creating / Editing Ad */}
              {(isCreatingNew || editingAd) && (
                <form
                  onSubmit={handleSaveForm}
                  className="p-4 sm:p-5 rounded-2xl bg-[#20222c] border border-emerald-500/40 space-y-3.5"
                >
                  <div className="flex items-center justify-between border-b border-[#2e313f] pb-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {editingAd ? `Editing Ad: "${editingAd.title}"` : 'Create New Promotional Banner'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAd(null);
                        setIsCreatingNew(false);
                      }}
                      className="text-xs text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">
                        Ad Title / Headline *
                      </label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Sreemangal Organic Tea 1kg Combo"
                        className="w-full px-3 py-2 bg-[#17181f] border border-[#2d303f] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">
                        Ad Badge Text
                      </label>
                      <input
                        type="text"
                        value={formData.badge || ''}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                        placeholder="e.g. SPONSORED PROMO / HOT DEAL"
                        className="w-full px-3 py-2 bg-[#17181f] border border-[#2d303f] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                      Ad Description / Offer Details
                    </label>
                    <textarea
                      rows={2}
                      value={formData.subtitle || ''}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="e.g. Pure handpicked organic tea with free delivery across Dhaka. 100% money back guarantee."
                      className="w-full px-3 py-2 bg-[#17181f] border border-[#2d303f] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">
                        Discount / Highlight Pill
                      </label>
                      <input
                        type="text"
                        value={formData.discountText || ''}
                        onChange={(e) => setFormData({ ...formData, discountText: e.target.value })}
                        placeholder="e.g. 20% OFF / BUY 1 GET 1"
                        className="w-full px-3 py-2 bg-[#17181f] border border-[#2d303f] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">
                        Button Action Text
                      </label>
                      <input
                        type="text"
                        value={formData.actionText || ''}
                        onChange={(e) => setFormData({ ...formData, actionText: e.target.value })}
                        placeholder="e.g. Order Now / Explore"
                        className="w-full px-3 py-2 bg-[#17181f] border border-[#2d303f] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">
                        Target Category
                      </label>
                      <select
                        value={formData.targetCategory || 'All'}
                        onChange={(e) => setFormData({ ...formData, targetCategory: e.target.value })}
                        className="w-full px-3 py-2 bg-[#17181f] border border-[#2d303f] rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="All">All Categories</option>
                        <option value="Organic Food">Organic Food</option>
                        <option value="Home & Garden">Home & Garden (Plants & Pottery)</option>
                        <option value="Health">Health</option>
                        <option value="Fashion">Fashion</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                      Banner Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl || ''}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-[#17181f] border border-[#2d303f] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                    />

                    {/* Quick Image Presets */}
                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      <span className="text-[11px] text-neutral-400">Quick presets:</span>
                      {presetImages.map((p, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: p.url })}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#2a2d3a] hover:bg-emerald-600 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                      Sponsor / Shop Name
                    </label>
                    <input
                      type="text"
                      value={formData.sponsorName || ''}
                      onChange={(e) => setFormData({ ...formData, sponsorName: e.target.value })}
                      placeholder="e.g. Green Valley Farms / Rifat Shop"
                      className="w-full px-3 py-2 bg-[#17181f] border border-[#2d303f] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-bold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black shadow-md cursor-pointer"
                    >
                      {editingAd ? 'Save Changes' : 'Publish Ad to Board'}
                    </button>
                  </div>
                </form>
              )}

              {/* List of Ads currently configured */}
              <div className="space-y-2.5">
                {ads.map((ad) => (
                  <div
                    key={ad.id}
                    className={`p-3 sm:p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      ad.isActive
                        ? 'bg-[#1e2029] border-[#2e3140]'
                        : 'bg-[#15161c] border-[#22242e] opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-16 h-12 rounded-xl overflow-hidden shrink-0 border border-neutral-700 bg-neutral-900">
                        <img
                          src={ad.imageUrl}
                          alt={ad.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 uppercase">
                            {ad.badge}
                          </span>
                          <span className="text-xs font-bold text-white truncate max-w-xs sm:max-w-md">
                            {ad.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                          {ad.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Toggle Active status */}
                      <button
                        onClick={() => handleToggleAdStatus(ad.id)}
                        className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 border transition-colors cursor-pointer ${
                          ad.isActive
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white'
                        }`}
                        title={ad.isActive ? 'Pause Ad' : 'Activate Ad'}
                      >
                        {ad.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">{ad.isActive ? 'Active' : 'Paused'}</span>
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => handleStartEdit(ad)}
                        className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
                        title="Edit ad"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteAd(ad.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                        title="Delete ad"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-[#292b37] flex items-center justify-between shrink-0">
              <button
                onClick={handleResetDefaults}
                className="text-xs text-neutral-500 hover:text-neutral-300 underline cursor-pointer"
              >
                Reset to default ads
              </button>

              <button
                onClick={() => {
                  setIsAdminOpen(false);
                  setEditingAd(null);
                  setIsCreatingNew(false);
                }}
                className="px-4 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
