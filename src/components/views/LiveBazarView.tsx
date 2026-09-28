import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Send, 
  User, 
  Search, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Check, 
  X, 
  Radio,
  Clock,
  ShieldCheck,
  Truck,
  Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../../types';

interface LiveBazarViewProps {
  onAddToCart: (product: Product) => void;
  onOpenChat: () => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  color: string;
  size: number;
}

interface LiveChatMessage {
  id: string;
  user: string;
  text: string;
  isHost?: boolean;
  isSelf?: boolean;
}

export const LiveBazarView: React.FC<LiveBazarViewProps> = ({ onAddToCart }) => {
  // Live State
  const [isFollowing, setIsFollowing] = useState(false);
  const [likesCount, setLikesCount] = useState(1124);
  const [viewerCount, setViewerCount] = useState(1248);
  const [isMuted, setIsMuted] = useState(false);
  const [inputChat, setInputChat] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Live Chat stream matching Bangladesh / organic plant market
  const [liveChat, setLiveChat] = useState<LiveChatMessage[]>([
    { id: '1', user: 'Tanvir Hossain', text: 'গাছটার সাইজ কত ইঞ্চি ভাই?' },
    { id: '2', user: 'Rifat Islam 123', text: 'এটা ১৮ ইঞ্চি বুশি মনস্টেরা আপু/ভাইয়া, হোয়াইট সিরামিক পট সহ পাবেন 🌿', isHost: true },
    { id: '3', user: 'Farzana Karim', text: 'Direct indoor living room e rakha jabe?' },
    { id: '4', user: 'Shakil Ahmed', text: 'Delivery charge ki free live bazar e?' },
    { id: '5', user: 'Nusrat Jahan', text: 'Just ordered 1 piece! Ceramic pot ta darun dekhte.' }
  ]);

  // Featured Monstera Product shown in Live Stream
  const featuredMonsteraProduct: Product = {
    id: 'live-monstera-deliciosa',
    title: 'Monstera Deliciosa (Swiss Cheese Plant) in White Ceramic Planter',
    vendor: 'Rifat Greens & Botanics',
    vendorLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    price: 1450,
    originalPrice: 1950,
    rating: 5,
    reviewsCount: 284,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80',
    description: 'Live Bazar Exclusive: Mature split-leaf Monstera Deliciosa planted in premium organic coco-peat blend with an artisanal white glazed ceramic pot. Includes 1-month plant care fertilizer.',
    stock: 12,
    isOrganic: true,
    isLive: true,
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Real-time viewer & like fluctuation simulation
  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setViewerCount((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4;
        return Math.max(1210, Math.min(1310, prev + delta));
      });
    }, 4000);

    const autoLikeInterval = setInterval(() => {
      setLikesCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
      // Occasionally spawn automated heart
      if (Math.random() > 0.4) {
        spawnHeart(false);
      }
    }, 2500);

    // Incoming viewer messages
    const incomingMessages = [
      { user: 'Mahmudul H.', text: 'Dhaka Dhanmondi te ajkei delivery pabo?' },
      { user: 'Sultana Razia', text: 'Pata gulo onek shundor ebong fresh!' },
      { user: 'Ahsan Habib', text: 'Buy now click kore order complete korlam bhai.' },
      { user: 'Kamrul Islam', text: 'Soil mix ki organic?' },
      { user: 'Mehedi Hasan', text: 'Watering kotodin por por korte hobe?' },
    ];

    const messageInterval = setInterval(() => {
      const randomMsg = incomingMessages[Math.floor(Math.random() * incomingMessages.length)];
      setLiveChat((prev) => [...prev.slice(-14), { id: String(Date.now()), ...randomMsg }]);
    }, 5500);

    return () => {
      clearInterval(viewerInterval);
      clearInterval(autoLikeInterval);
      clearInterval(messageInterval);
    };
  }, []);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [liveChat]);

  // Spawn animated hearts
  const spawnHeart = (userTriggered = true) => {
    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x: userTriggered ? 70 + (Math.random() * 20 - 10) : 60 + Math.random() * 30,
      color: ['#ef4444', '#10b981', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 4)],
      size: Math.floor(Math.random() * 12) + 18,
    };

    setFloatingHearts((prev) => [...prev.slice(-15), newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2200);
  };

  const handleLikeClick = () => {
    setLikesCount((prev) => prev + 1);
    spawnHeart(true);
  };

  const handleFollowToggle = () => {
    setIsFollowing((prev) => !prev);
    showToast(isFollowing ? 'Unfollowed Rifat Islam 123' : 'You are now following Rifat Islam 123! ✓');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('https://greenshop.com/live/rifat-islam-123');
      showToast('Live Bazar stream link copied to clipboard! 🌿');
    } else {
      showToast('Sharing Live Bazar: Rifat Islam 123');
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputChat.trim()) return;

    const newMsg: LiveChatMessage = {
      id: String(Date.now()),
      user: 'You',
      text: inputChat.trim(),
      isSelf: true,
    };

    setLiveChat((prev) => [...prev, newMsg]);
    setInputChat('');
    spawnHeart(true);
  };

  const handleBuyNow = () => {
    onAddToCart(featuredMonsteraProduct);
    setShowBuyModal(true);
  };

  return (
    <div className="min-h-screen bg-[#f7faf8] -m-4 sm:-m-6 p-3 sm:p-6 font-sans text-neutral-800 transition-colors flex flex-col justify-between">
      
      {/* Container sizing matches mobile/desktop clean stream container in screenshot */}
      <div className="max-w-xl mx-auto w-full">
        
        {/* ========================================================================= */}
        {/* 1. TOP HEADER matching Greenshop.com branding in screenshot */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between py-2.5 px-2 mb-3 border-b border-emerald-900/10">
          
          {/* Logo with Green Leaf Icon */}
          <div className="flex items-center gap-1.5 cursor-pointer">
            <div className="w-6 h-6 rounded-full bg-emerald-700 flex items-center justify-center text-white shadow-xs">
              <Leaf className="w-3.5 h-3.5 fill-emerald-200 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#143d30]">
              Greenshop<span className="text-emerald-700">.com</span>
            </span>
          </div>

          {/* Right Header Controls: Profile & Search */}
          <div className="flex items-center gap-2">
            <button 
              className="p-1.5 rounded-full hover:bg-emerald-100/60 text-[#143d30] transition-colors"
              title="Profile"
            >
              <User className="w-5 h-5 stroke-[1.8]" />
            </button>
            <button 
              className="p-1.5 rounded-full hover:bg-emerald-100/60 text-[#143d30] transition-colors"
              title="Search"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SUB-HEADER: "Live Bazar" Title + Share button */}
        {/* ========================================================================= */}
        <div className="relative flex items-center justify-between px-2 mb-3.5">
          {/* Invisible spacer to balance Share button */}
          <div className="w-16"></div>

          {/* Centered Page Title */}
          <h1 className="text-xl sm:text-2xl font-bold text-[#143d30] tracking-tight text-center">
            Live Bazar
          </h1>

          {/* Share Button with Share icon */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md border border-neutral-300 bg-white hover:bg-emerald-50/60 text-xs font-semibold text-neutral-700 transition-all shadow-xs active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5 text-neutral-600" />
            <span>Share</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 3. MAIN LIVE STREAM CARD (Visual matches exact screenshot) */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/90 shadow-lg overflow-hidden flex flex-col">
          
          {/* Live Video / Broadcast Viewport */}
          <div 
            className="relative w-full aspect-[4/5] bg-[#112a21] overflow-hidden select-none"
            onDoubleClick={handleLikeClick}
          >
            
            {/* Realistic Live Studio Broadcast Background Layer */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#133227] via-[#1b4334] to-[#0f241c]" />

            {/* Simulated Live Ambient Studio Lighting & Plants Background */}
            <div className="absolute inset-0 opacity-45 mix-blend-screen pointer-events-none">
              <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl"></div>
              <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-emerald-400/15 blur-3xl"></div>
            </div>

            {/* High Definition Visual Representation of Rifat Islam holding the potted Monstera */}
            <div className="absolute inset-0 flex flex-col items-center justify-end overflow-hidden">
              
              {/* Background Nursery Plants Shelves */}
              <div className="absolute inset-x-0 top-0 bottom-0 opacity-40">
                <img 
                  src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1000&auto=format&fit=crop&q=80" 
                  alt="Plant studio background"
                  className="w-full h-full object-cover filter blur-[2px] brightness-75 scale-105"
                />
              </div>

              {/* Central Visual: Young Bearded Man in Forest Green Shirt holding Potted Monstera */}
              <motion.div 
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full h-full flex items-end justify-center pointer-events-none"
              >
                {/* Host Rifat Portrait Composition */}
                <div className="relative w-full h-full flex flex-col items-center justify-end">
                  
                  {/* Portrait of Host in Dark Green Shirt */}
                  <div className="relative w-72 sm:w-80 h-[82%] mb-0">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80" 
                      alt="Rifat Islam 123" 
                      className="w-full h-full object-cover object-top rounded-t-full mask-linear-gradient"
                      style={{
                        maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                      }}
                    />
                    {/* Dark forest green shirt tint overlay matching screenshot */}
                    <div className="absolute inset-0 bg-[#163f31]/30 mix-blend-color pointer-events-none"></div>
                  </div>

                  {/* Foreground: Potted Lush Monstera in White Ceramic Pot held with hands */}
                  <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                    className="absolute bottom-4 z-10 w-52 sm:w-60 flex flex-col items-center drop-shadow-2xl"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80" 
                      alt="Monstera Deliciosa in White Ceramic Pot" 
                      className="w-full h-44 sm:h-52 object-contain filter contrast-110 drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Subtle camera scanline & broadcast gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
            </div>

            {/* ========================================================================= */}
            {/* OVERLAY TOP ROW (Matching exact positions in screenshot) */}
            {/* ========================================================================= */}
            <div className="absolute top-3 inset-x-3 flex items-start justify-between z-20 pointer-events-auto">
              
              {/* Top-Left: Host Avatar + Host Name + 'live' Badge */}
              <div className="flex items-center gap-2.5 bg-black/35 backdrop-blur-sm p-1.5 pr-3 rounded-full border border-white/10">
                {/* Avatar with circular border */}
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/90 shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" 
                    alt="Rifat Islam" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Host Name & 'live' Badge */}
                <div className="flex flex-col">
                  <span className="text-white text-xs sm:text-sm font-bold tracking-tight drop-shadow-xs">
                    Rifat Islam 123
                  </span>
                  
                  {/* 'live' Badge matching bronze/olive pill badge in screenshot */}
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="px-2 py-0.2 text-[10px] font-semibold text-amber-300 bg-amber-950/70 border border-amber-500/50 rounded-md tracking-wider flex items-center gap-1 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      live
                    </span>
                  </div>
                </div>
              </div>

              {/* Top-Right: 'Follow' Button, Eye 1.2K Viewers, Heart 1.1K Likes */}
              <div className="flex flex-col items-end gap-1.5">
                
                {/* Follow Button */}
                <button
                  onClick={handleFollowToggle}
                  className={`px-3.5 py-1 rounded-md text-xs font-semibold tracking-wide transition-all shadow-md ${
                    isFollowing 
                      ? 'bg-emerald-600 text-white border border-emerald-400' 
                      : 'bg-black/45 backdrop-blur-sm text-white hover:bg-black/65 border border-white/40 active:scale-95'
                  }`}
                >
                  {isFollowing ? 'Following ✓' : 'Follow'}
                </button>

                {/* Viewer Count & Likes Counter */}
                <div className="flex items-center gap-3 text-white/90 text-xs font-semibold bg-black/35 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10 shadow-xs">
                  {/* Viewers with Eye icon */}
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-white/80" />
                    <span>{(viewerCount / 1000).toFixed(1)}K</span>
                  </div>

                  {/* Likes with Heart icon */}
                  <button 
                    onClick={handleLikeClick}
                    className="flex items-center gap-1.5 hover:text-rose-400 transition-colors group cursor-pointer"
                    title="Tap to like"
                  >
                    <Heart className="w-3.5 h-3.5 text-white/80 fill-transparent group-hover:fill-rose-500 group-hover:text-rose-500 transition-all" />
                    <span>{(likesCount / 1000).toFixed(1)}K</span>
                  </button>
                </div>

                {/* Sound Mute/Unmute Toggle */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-full bg-black/35 backdrop-blur-sm text-white/80 hover:text-white border border-white/10 transition-colors"
                  title={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                </button>

              </div>
            </div>

            {/* ========================================================================= */}
            {/* FLOATING LIVE AUDIENCE CHAT (Bottom-Left of Video Viewport) */}
            {/* ========================================================================= */}
            <div 
              ref={chatScrollRef}
              className="absolute bottom-3 left-3 w-[72%] sm:w-[65%] max-h-36 overflow-y-auto space-y-1.5 z-20 pointer-events-auto pr-1 scrollbar-none"
              style={{ scrollbarWidth: 'none' }}
            >
              <AnimatePresence>
                {liveChat.slice(-4).map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`p-1.5 px-2.5 rounded-xl text-[11px] leading-tight backdrop-blur-md border ${
                      msg.isHost 
                        ? 'bg-amber-950/80 border-amber-500/40 text-amber-200 font-medium'
                        : msg.isSelf
                        ? 'bg-emerald-900/80 border-emerald-400/40 text-emerald-100 font-medium'
                        : 'bg-black/45 border-white/10 text-white'
                    }`}
                  >
                    <span className={`font-bold mr-1 ${msg.isHost ? 'text-amber-300' : msg.isSelf ? 'text-emerald-300' : 'text-neutral-300'}`}>
                      {msg.user}:
                    </span>
                    <span>{msg.text}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* ========================================================================= */}
            {/* FLOATING ANIMATED HEARTS (Stream rising upwards on double-click/like) */}
            {/* ========================================================================= */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
              <AnimatePresence>
                {floatingHearts.map((heart) => (
                  <motion.div
                    key={heart.id}
                    initial={{ opacity: 0.9, y: '85%', x: `${heart.x}%`, scale: 0.7 }}
                    animate={{ 
                      opacity: 0, 
                      y: '20%', 
                      x: `${heart.x + (Math.sin(heart.id) * 15)}%`, 
                      scale: 1.3 
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, ease: 'easeOut' }}
                    className="absolute"
                    style={{ color: heart.color }}
                  >
                    <Heart className="fill-current stroke-white/50" style={{ width: heart.size, height: heart.size }} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* 4. BOTTOM ACTION BAR (Matching exact screenshot layout) */}
          {/* ========================================================================= */}
          <div className="p-3 bg-white border-t border-neutral-200 flex items-center justify-between gap-2.5">
            
            {/* Left: Chat Input with green "Send" button */}
            <form 
              onSubmit={handleSendChat}
              className="flex-1 flex items-center justify-between border border-neutral-300 rounded-lg px-2.5 py-1 bg-white focus-within:border-emerald-600 transition-colors shadow-xs"
            >
              <input
                type="text"
                value={inputChat}
                onChange={(e) => setInputChat(e.target.value)}
                placeholder="Chat..."
                className="w-full bg-transparent text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none pr-2"
              />
              <button
                type="submit"
                disabled={!inputChat.trim()}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  inputChat.trim() 
                    ? 'bg-[#18794e] hover:bg-[#136841] text-white active:scale-95 shadow-xs' 
                    : 'bg-[#18794e]/80 text-white cursor-pointer'
                }`}
              >
                Send
              </button>
            </form>

            {/* Right: Golden/Caramel "Buy Now" button with Shopping Cart icon */}
            <button
              onClick={handleBuyNow}
              className="flex-shrink-0 flex items-center justify-center gap-2 px-5 sm:px-6 py-2 rounded-lg bg-[#caa250] hover:bg-[#b89142] text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <span>Buy Now</span>
              <ShoppingCart className="w-4 h-4" />
            </button>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 5. FOOTER LINKS matching screenshot ("About Us   Contact   Help Center") */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-center gap-8 text-xs text-neutral-500 font-medium mt-6 pb-2">
          <button 
            onClick={() => showToast('Greenshop.com: Sustainable Green & Organic Nursery')}
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            About Us
          </button>
          <button 
            onClick={() => showToast('Helpline: +880 1712-345678 (24/7 Support)')}
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            Contact
          </button>
          <button 
            onClick={() => showToast('Help Center: Plant Care Guidelines & Return Policy')}
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            Help Center
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 6. INSTANT BUY NOW MODAL / DRAWER */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showBuyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-md w-full p-5 border border-emerald-950/15 shadow-2xl relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowBuyModal(false)}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Flash Deal Header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-[11px] border border-red-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-red-500 animate-spin" />
                  Live Flash Special
                </span>
                <span className="text-xs text-neutral-500">Host: Rifat Islam 123</span>
              </div>

              {/* Product preview */}
              <div className="flex gap-3.5 items-center p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 mb-4">
                <img 
                  src={featuredMonsteraProduct.image} 
                  alt={featuredMonsteraProduct.title} 
                  className="w-20 h-20 rounded-lg object-cover bg-white shadow-xs"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-neutral-900 leading-tight">
                    {featuredMonsteraProduct.title}
                  </h3>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Includes White Ceramic Planter & Nutrient Mix
                  </p>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span className="text-base font-extrabold text-emerald-700">
                      ৳ {featuredMonsteraProduct.price}
                    </span>
                    <span className="text-xs text-neutral-400 line-through">
                      ৳ {featuredMonsteraProduct.originalPrice}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                      25% OFF LIVE
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                  <Truck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span className="text-[10px] font-medium text-neutral-600 block">Fast Delivery</span>
                </div>
                <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span className="text-[10px] font-medium text-neutral-600 block">Plant Guarantee</span>
                </div>
                <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                  <Clock className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span className="text-[10px] font-medium text-neutral-600 block">12 Stock Left</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={() => {
                  setShowBuyModal(false);
                  showToast('Monstera Deliciosa added to Cart! Proceed to checkout.');
                }}
                className="w-full py-3 bg-[#caa250] hover:bg-[#b89142] text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Confirm Live Order (৳ 1,450)</span>
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 7. TOAST NOTIFICATION */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#143d30] text-white text-xs font-semibold shadow-xl border border-emerald-400/40 flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
