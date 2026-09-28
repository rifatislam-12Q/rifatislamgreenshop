import React, { useState, useRef, useEffect } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  Play,
  ShoppingBag,
  Plus,
  Check,
  Music2,
  Send,
  X,
  Bookmark,
  Film
} from 'lucide-react';
import { Product } from '../../types';

export interface ProductReel {
  id: string;
  productTitle: string;
  productPrice: number;
  originalPrice?: number;
  sellerName: string;
  sellerAvatar: string;
  sellerBadge: string;
  videoUrl: string;
  posterImage: string;
  description: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  audioTrack: string;
  tags: string[];
  product: Product;
  commentsList: { id: string; author: string; text: string; time: string; avatar: string }[];
}

const REELS_DATA: ProductReel[] = [
  {
    id: 'reel-monstera',
    productTitle: 'Premium Potted Monstera Deliciosa',
    productPrice: 650,
    originalPrice: 850,
    sellerName: 'Rifat Green Nursery',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    sellerBadge: 'Verified Nursery',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-watering-a-potted-plant-with-a-spray-bottle-41584-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&auto=format&fit=crop&q=80',
    description: '🌿 ঘরের বাতাস বিশুদ্ধ রাখতে মনস্টেরা প্ল্যান্টের জুড়ি নেই! সরাসরি নার্সারি থেকে ফ্রেশ ও হেলদি কন্ডিশনে কুরিয়ারে সারাদেশে ডেলিভারি দেওয়া হচ্ছে।',
    likesCount: 1420,
    commentsCount: 68,
    sharesCount: 142,
    audioTrack: 'GreenShop Acoustic Breeze • Original Plant Sound',
    tags: ['#IndoorPlant', '#Monstera', '#GreenShop', '#UrbanGardening'],
    product: {
      id: 'prod-monstera-reel',
      title: 'Premium Potted Monstera Deliciosa',
      vendor: 'Rifat Green Nursery',
      vendorLogo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      price: 650,
      originalPrice: 850,
      rating: 5,
      reviewsCount: 114,
      category: 'Home & Garden',
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80',
      description: 'Healthy potted indoor Monstera with lush fenestrated leaves. Sourced directly from local nursery with ceramic soil pot.',
      stock: 24,
      isOrganic: true,
    },
    commentsList: [
      { id: 'c1', author: 'Tanvir Ahmed', text: 'গাছের সাইজ কত বড় ভাই? ডেলিভারি কতদিন লাগবে?', time: '2h ago', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&auto=format&fit=crop&q=80' },
      { id: 'c2', author: 'Sadia Rahman', text: 'গত সপ্তাহে নিয়েছিলাম, মাশাল্লাহ পাতাগুলো খুব ফ্রেশ এসেছে!', time: '5h ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80' },
      { id: 'c3', author: 'Nusrat Jahan', text: 'পানি দেওয়ার নিয়মটা একটু বলে দিলে ভালো হত।', time: '1d ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 'reel-tea',
    productTitle: 'Sylhet Estate Organic Green Tea (First Flush)',
    productPrice: 450,
    originalPrice: 520,
    sellerName: 'Riyad Agro Tea Garden',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    sellerBadge: 'Organic Certified',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-fresh-tea-leaves-41618-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    description: '☕ শ্রীমঙ্গলের উঁচু চা বাগান থেকে হাতে তোলা সম্পূর্ণ অর্গানিক গ্রিন টি। কোনো ক্যামিকাল বা রঙ মেশানো নেই, আসল চা পাতার মিষ্টি সুবাস ও হাই অ্যান্টিঅক্সিডেন্ট।',
    likesCount: 2380,
    commentsCount: 94,
    sharesCount: 310,
    audioTrack: 'Sylhet Rain & Tea Leaves ASMR • Pure Audio',
    tags: ['#OrganicTea', '#SylhetTea', '#GreenTea', '#HealthyLiving'],
    product: {
      id: 'prod-tea-reel',
      title: 'Organic Green Tea (Sylhet First Flush)',
      vendor: 'Riyad Agro Tea Garden',
      vendorLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      price: 450,
      originalPrice: 520,
      rating: 5,
      reviewsCount: 156,
      category: 'Organic Food',
      image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&auto=format&fit=crop&q=80',
      description: '100% whole leaf organic green tea sourced from Sreemangal gardens. Boosts metabolism and refreshes mind.',
      stock: 45,
      isOrganic: true,
    },
    commentsList: [
      { id: 'c4', author: 'Kamrul Hasan', text: '১ কেজি অর্ডার করতে চাই, কোনো ডিসকাউন্ট আছে?', time: '1h ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80' },
      { id: 'c5', author: 'Farhana Boby', text: 'লিকারের কালার আর টেস্ট আসলেই অরিজিনাল গ্রিন টির মতো!', time: '3h ago', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 'reel-pottery',
    productTitle: 'Handcrafted Terracotta Clay Teapot Set',
    productPrice: 480,
    originalPrice: 580,
    sellerName: 'Raju Traditional Pottery',
    sellerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    sellerBadge: 'Master Artisan',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-artisan-sculpting-clay-pottery-on-a-wheel-41489-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=80',
    description: '🏺 ঐতিহ্যবাহী ধামরাইয়ের মাটির তৈরি হ্যান্ডমেড টি-পট। চায়ের আসল স্বাদ ও মাটির প্রাকৃতিক সুবাস পেতে আজই অর্ডার করুন। সম্পূর্ণ পরিবেশবান্ধব।',
    likesCount: 3120,
    commentsCount: 142,
    sharesCount: 420,
    audioTrack: 'Artisan Wheel ASMR • Clay Symphony',
    tags: ['#Terracotta', '#HandmadePottery', '#EcoFriendly', '#ClayCraft'],
    product: {
      id: 'prod-pottery-reel',
      title: 'Handcrafted Terracotta Clay Teapot Set',
      vendor: 'Raju Traditional Pottery',
      vendorLogo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=80',
      price: 480,
      originalPrice: 580,
      rating: 5,
      reviewsCount: 98,
      category: 'Home & Garden',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&auto=format&fit=crop&q=80',
      description: 'Artisanal terracotta teapot meticulously sculpted by master potters. Naturally retains heat and imparts earthy fragrance.',
      stock: 18,
      isHandmade: true,
    },
    commentsList: [
      { id: 'c6', author: 'Mehedi Hasan', text: 'কুরিয়ারে ভেঙে যাওয়ার কোনো রিস্ক আছে কি?', time: '40m ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&auto=format&fit=crop&q=80' },
      { id: 'c7', author: 'Raju Pottery (Seller)', text: 'জি না ভাই, ৩ লেয়ার বাবল র‍্যাপ এবং কাঠের ফোম দিয়ে সেফ প্যাকেজিং করি। কোনো ক্ষতি হলে রিপ্লেসমেন্ট গ্যারান্টি!', time: '25m ago', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=60&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 'reel-succulents',
    productTitle: 'Exotic Miniature Succulent & Cactus Trio',
    productPrice: 520,
    originalPrice: 650,
    sellerName: 'Onnorome Plant House',
    sellerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    sellerBadge: 'Top Rated Nursery',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-repotting-a-houseplant-41582-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80',
    description: '🌵 পড়ার টেবিল বা অফিসের ডেস্ক সাজাতে ৩টি আকর্ষণীয় সাকুলেন্ট ও ক্যাকটাসের কম্বো প্যাক। কম আলো ও অল্প পানিতেই দীর্ঘদিন সতেজ থাকে।',
    likesCount: 1890,
    commentsCount: 52,
    sharesCount: 189,
    audioTrack: 'Cozy Morning Lofi • Green Vibes',
    tags: ['#Succulents', '#DeskPlant', '#Cactus', '#GreenDecor'],
    product: {
      id: 'prod-succulent-reel',
      title: 'Exotic Miniature Succulent & Cactus Trio',
      vendor: 'Onnorome Plant House',
      vendorLogo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80',
      price: 520,
      originalPrice: 650,
      rating: 5,
      reviewsCount: 77,
      category: 'Home & Garden',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80',
      description: 'Set of 3 healthy acclimated succulents planted in mini ceramic pots. Low maintenance desk plants.',
      stock: 30,
      isOrganic: true,
    },
    commentsList: [
      { id: 'c8', author: 'Sumaiya Akter', text: 'দাম অনুযায়ী ৩ টা গাছ পেয়ে সত্যিই খুব খুশি। খুব সুন্দর প্যাক ছিল।', time: '4h ago', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 'reel-greenhouse',
    productTitle: 'Fresh Organic Wild Forest Honey (Sundarban)',
    productPrice: 680,
    originalPrice: 850,
    sellerName: 'Green Valley Organic',
    sellerAvatar: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=120&auto=format&fit=crop&q=80',
    sellerBadge: 'Pure Agro',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-tending-to-plants-in-a-greenhouse-41583-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=800&auto=format&fit=crop&q=80',
    description: '🍯 সুন্দরবনের প্রাকৃতিক চাক ভাঙা খাঁটি মধু। কোনো প্রক্রিয়াজাতকরণ বা চিনি মিশ্রণ ছাড়া সরাসরি কাঁচের বোতলে প্যাক করা। ল্যাব টেস্টে ১০০% খাঁটি প্রমাণিত।',
    likesCount: 2750,
    commentsCount: 110,
    sharesCount: 380,
    audioTrack: 'Nature Birds & Gentle Stream • Soundscape',
    tags: ['#SundarbanHoney', '#OrganicHoney', '#NaturalFood', '#GreenShop'],
    product: {
      id: 'prod-honey-reel',
      title: 'Fresh Organic Wild Forest Honey (Sundarban)',
      vendor: 'Green Valley Organic',
      vendorLogo: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=80&auto=format&fit=crop&q=80',
      price: 680,
      originalPrice: 850,
      rating: 5,
      reviewsCount: 142,
      category: 'Organic Food',
      image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=600&auto=format&fit=crop&q=80',
      description: 'Raw unfiltered honey harvested by traditional Mouwals from Sundarban deep mangrove forests.',
      stock: 22,
      isOrganic: true,
    },
    commentsList: [
      { id: 'c9', author: 'Monir Hossain', text: 'অর্ডার করলাম ভাই, যেন একদম খাঁটি মধুটা পাই।', time: '15m ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80' },
    ],
  },
];

interface ProductReelsViewProps {
  onAddToCart: (product: Product) => void;
  onViewProduct?: (product: Product) => void;
}

export const ProductReelsView: React.FC<ProductReelsViewProps> = ({
  onAddToCart,
  onViewProduct,
}) => {
  const [activeReelId, setActiveReelId] = useState<string>(REELS_DATA[0].id);
  const [isMuted, setIsMuted] = useState(true);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});
  const [likesCountMap, setLikesCountMap] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    REELS_DATA.forEach((r) => {
      initial[r.id] = r.likesCount;
    });
    return initial;
  });

  const [savedReels, setSavedReels] = useState<Record<string, boolean>>({});
  const [addedToCartMap, setAddedToCartMap] = useState<Record<string, boolean>>({});
  const [activeCommentReel, setActiveCommentReel] = useState<ProductReel | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [reelsList, setReelsList] = useState(REELS_DATA);
  const [pausedMap, setPausedMap] = useState<Record<string, boolean>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // IntersectionObserver to auto-play whichever video is currently scrolled into view (TikTok / Facebook Reels style)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.reel-video-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const reelId = entry.target.getAttribute('data-reel-id');
          if (!reelId) return;

          const videoEl = videoRefs.current[reelId];

          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            setActiveReelId(reelId);
            if (videoEl && !pausedMap[reelId]) {
              videoEl.play().catch(() => {});
            }
          } else {
            if (videoEl) {
              videoEl.pause();
            }
          }
        });
      },
      {
        root: container,
        threshold: [0.3, 0.55, 0.8],
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, [pausedMap, reelsList]);

  // Keyboard navigation (Arrow Up / Down) to snap between reels smoothly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const currentIndex = reelsList.findIndex((r) => r.id === activeReelId);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, reelsList.length - 1);
        const nextCard = containerRef.current.querySelector(
          `[data-reel-id="${reelsList[nextIndex].id}"]`
        );
        nextCard?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        const prevCard = containerRef.current.querySelector(
          `[data-reel-id="${reelsList[prevIndex].id}"]`
        );
        prevCard?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeReelId, reelsList]);

  const handleTogglePlay = (reelId: string) => {
    const videoEl = videoRefs.current[reelId];
    if (!videoEl) return;

    if (videoEl.paused) {
      videoEl.play().catch(() => {});
      setPausedMap((prev) => ({ ...prev, [reelId]: false }));
    } else {
      videoEl.pause();
      setPausedMap((prev) => ({ ...prev, [reelId]: true }));
    }
  };

  const handleToggleLike = (reelId: string) => {
    const isCurrentlyLiked = !!likedReels[reelId];
    setLikedReels((prev) => ({ ...prev, [reelId]: !isCurrentlyLiked }));
    setLikesCountMap((prev) => ({
      ...prev,
      [reelId]: (prev[reelId] || 0) + (isCurrentlyLiked ? -1 : 1),
    }));
  };

  const handleAddToCartClick = (e: React.MouseEvent, product: Product, reelId: string) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedToCartMap((prev) => ({ ...prev, [reelId]: true }));
    setTimeout(() => {
      setAddedToCartMap((prev) => ({ ...prev, [reelId]: false }));
    }, 2500);
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activeCommentReel) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: 'You (Ursports)',
      text: newCommentText.trim(),
      time: 'Just now',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&auto=format&fit=crop&q=80',
    };

    setReelsList((prev) =>
      prev.map((r) =>
        r.id === activeCommentReel.id
          ? {
              ...r,
              commentsCount: r.commentsCount + 1,
              commentsList: [newComment, ...r.commentsList],
            }
          : r
      )
    );

    setActiveCommentReel((prev) =>
      prev
        ? {
            ...prev,
            commentsCount: prev.commentsCount + 1,
            commentsList: [newComment, ...prev.commentsList],
          }
        : null
    );

    setNewCommentText('');
  };

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-80px)] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth flex flex-col items-center py-2 sm:py-4 select-none"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {reelsList.map((reel) => {
        const isCurrentActive = reel.id === activeReelId;
        const isPaused = pausedMap[reel.id];

        return (
          <div
            key={reel.id}
            data-reel-id={reel.id}
            className="reel-video-card relative w-full max-w-[420px] sm:max-w-[440px] h-[calc(100vh-90px)] min-h-[580px] max-h-[820px] snap-center snap-always shrink-0 rounded-3xl overflow-hidden bg-black shadow-2xl border border-neutral-800 my-2 flex flex-col justify-between"
          >
            {/* Working HTML5 Video Stream */}
            <div
              onClick={() => handleTogglePlay(reel.id)}
              className="absolute inset-0 z-0 cursor-pointer bg-neutral-950 flex items-center justify-center"
            >
              <video
                ref={(el) => {
                  videoRefs.current[reel.id] = el;
                }}
                src={reel.videoUrl}
                poster={reel.posterImage}
                loop
                playsInline
                muted={isMuted}
                autoPlay={isCurrentActive}
                className="w-full h-full object-cover object-center"
              />

              {/* Dark Gradient Overlay for optimal contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent via-55% to-black/90 pointer-events-none" />

              {/* Pause Indicator overlay */}
              {isPaused && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-2xs">
                  <div className="w-16 h-16 rounded-full bg-black/60 text-white flex items-center justify-center border border-white/20 animate-in zoom-in-75">
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Top Header Bar inside Reel */}
            <div className="relative z-20 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-black tracking-wide">
                  <Film className="w-3.5 h-3.5 text-emerald-400" />
                  <span>GreenShop Reels</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-black">
                  LIVE
                </span>
              </div>

              {/* Global Mute/Unmute Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/15 cursor-pointer transition-all active:scale-90"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-neutral-300" />
                ) : (
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                )}
              </button>
            </div>

            {/* ============================================================== */}
            {/* RIGHT SIDE FLOATING SOCIAL ACTION BUTTONS (TIKTOK / REELS STYLE) */}
            {/* ============================================================== */}
            <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4">
              {/* Seller Avatar Pill */}
              <div className="relative mb-2">
                <img
                  src={reel.sellerAvatar}
                  alt={reel.sellerName}
                  className="w-11 h-11 rounded-full object-cover border-2 border-emerald-400 shadow-lg"
                />
                <button className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-xs">
                  <Plus className="w-3 h-3 stroke-[3]" />
                </button>
              </div>

              {/* Like Button */}
              <button
                onClick={() => handleToggleLike(reel.id)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div
                  className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                    likedReels[reel.id]
                      ? 'bg-rose-500/80 text-white shadow-lg shadow-rose-950/40 scale-110'
                      : 'bg-black/50 text-white hover:bg-black/70'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 transition-transform ${
                      likedReels[reel.id]
                        ? 'fill-white stroke-white scale-110'
                        : 'group-hover:scale-110'
                    }`}
                  />
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow-md">
                  {(likesCountMap[reel.id] || reel.likesCount).toLocaleString()}
                </span>
              </button>

              {/* Comments Button */}
              <button
                onClick={() => setActiveCommentReel(reel)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-transform group-hover:scale-110">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow-md">
                  {reel.commentsList.length}
                </span>
              </button>

              {/* Bookmark / Save */}
              <button
                onClick={() =>
                  setSavedReels((prev) => ({ ...prev, [reel.id]: !prev[reel.id] }))
                }
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div
                  className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                    savedReels[reel.id]
                      ? 'bg-amber-500 text-black shadow-lg scale-110'
                      : 'bg-black/50 text-white hover:bg-black/70'
                  }`}
                >
                  <Bookmark
                    className={`w-5 h-5 ${savedReels[reel.id] ? 'fill-black' : ''}`}
                  />
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow-md">Save</span>
              </button>

              {/* Share Button */}
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Video Reel link copied to clipboard!');
                  }
                }}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-transform group-hover:scale-110">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow-md">Share</span>
              </button>
            </div>

            {/* ============================================================== */}
            {/* BOTTOM METADATA & BUY NOW QUICK PRODUCT BAR */}
            {/* ============================================================== */}
            <div className="relative z-20 p-4 space-y-3">
              {/* Seller & Description */}
              <div className="pr-14 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-white flex items-center gap-1 drop-shadow-md">
                    @{reel.sellerName}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {reel.sellerBadge}
                  </span>
                </div>

                <p className="text-xs text-neutral-100 line-clamp-2 leading-relaxed drop-shadow-md font-medium">
                  {reel.description}
                </p>

                {/* Audio Ticker */}
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 font-medium">
                  <Music2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="truncate max-w-[240px]">{reel.audioTrack}</span>
                </div>
              </div>

              {/* QUICK "BUY NOW / ADD TO CART" FLOATING PRODUCT PILL */}
              <div className="p-2.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/15 flex items-center justify-between gap-3 shadow-2xl">
                <div
                  onClick={() => onViewProduct && onViewProduct(reel.product)}
                  className="flex items-center gap-2.5 min-w-0 cursor-pointer group/item flex-1"
                >
                  <img
                    src={reel.posterImage}
                    alt={reel.productTitle}
                    className="w-11 h-11 rounded-xl object-cover shrink-0 border border-white/20"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-black text-white truncate group-hover/item:text-emerald-400 transition-colors">
                      {reel.productTitle}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-emerald-400">
                        ৳{reel.productPrice}
                      </span>
                      {reel.originalPrice && (
                        <span className="text-[10px] text-neutral-400 line-through">
                          ৳{reel.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => handleAddToCartClick(e, reel.product, reel.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0 ${
                    addedToCartMap[reel.id]
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-black hover:scale-105 active:scale-95'
                  }`}
                >
                  {addedToCartMap[reel.id] ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Buy Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* ============================================================== */}
      {/* COMMENTS DRAWER / MODAL */}
      {/* ============================================================== */}
      {activeCommentReel && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#181920] border border-[#2b2d3a] text-white w-full max-w-md rounded-t-3xl sm:rounded-3xl h-[70vh] sm:h-[600px] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#282a36] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">
                  Comments ({activeCommentReel.commentsList.length})
                </h3>
              </div>
              <button
                onClick={() => setActiveCommentReel(null)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
              {activeCommentReel.commentsList.map((c) => (
                <div key={c.id} className="flex items-start gap-2.5 text-xs">
                  <img
                    src={c.avatar}
                    alt={c.author}
                    className="w-8 h-8 rounded-full object-cover shrink-0 border border-neutral-700"
                  />
                  <div className="bg-[#20222c] p-2.5 rounded-2xl flex-1 border border-[#2d303f]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white">{c.author}</span>
                      <span className="text-[10px] text-neutral-500">{c.time}</span>
                    </div>
                    <p className="text-neutral-300 leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Input */}
            <form
              onSubmit={handleSendComment}
              className="p-3 border-t border-[#282a36] flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-3.5 py-2 bg-[#20222c] border border-[#2d303f] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
