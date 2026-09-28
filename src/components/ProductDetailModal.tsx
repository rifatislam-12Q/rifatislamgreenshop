import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  ShoppingCart,
  MessageSquare,
  ShieldCheck,
  Truck,
  RefreshCw,
  Check,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  Send,
  Sparkles,
  Award,
  Box,
  CheckCircle2,
  MapPin,
  Phone,
  User as UserIcon,
  CreditCard,
  Building,
  Home,
  CheckCircle,
  Package,
  Video,
  Play,
  Film
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onChatWithSeller: (product: Product) => void;
}

interface CustomerReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
  likes: number;
  userLiked?: boolean;
}

const BD_DIVISIONS = [
  'ঢাকা বিভাগ (Dhaka)',
  'চট্টগ্রাম বিভাগ (Chattogram)',
  'রাজশাহী বিভাগ (Rajshahi)',
  'খুলনা বিভাগ (Khulna)',
  'বরিশাল বিভাগ (Barishal)',
  'সিলেট বিভাগ (Sylhet)',
  'রংপুর বিভাগ (Rangpur)',
  'ময়মনসিংহ বিভাগ (Mymensingh)',
];

// Helper to provide 3-4 gallery photos for any product
const getProductGallery = (product: Product): string[] => {
  if (product.galleryImages && product.galleryImages.length > 0) {
    return [product.image, ...product.galleryImages];
  }

  const titleLower = product.title.toLowerCase();
  const descLower = product.description.toLowerCase();

  if (titleLower.includes('tea') || descLower.includes('tea')) {
    return [
      product.image,
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80',
    ];
  }

  if (titleLower.includes('pottery') || titleLower.includes('clay') || titleLower.includes('teapot')) {
    return [
      product.image,
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=80',
    ];
  }

  if (titleLower.includes('plant') || titleLower.includes('monstera') || titleLower.includes('succulent')) {
    return [
      product.image,
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&auto=format&fit=crop&q=80',
    ];
  }

  if (titleLower.includes('honey')) {
    return [
      product.image,
      'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1471943311424-646960669fbc?w=800&auto=format&fit=crop&q=80',
    ];
  }

  return [
    product.image,
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=800&auto=format&fit=crop&q=80',
  ];
};

const getProductVideo = (product: Product): string => {
  if (product.videoUrl) return product.videoUrl;

  const titleLower = product.title.toLowerCase();
  const descLower = product.description.toLowerCase();

  if (titleLower.includes('tea') || descLower.includes('tea')) {
    return 'https://assets.mixkit.co/videos/preview/mixkit-fresh-tea-leaves-in-a-cup-41126-large.mp4';
  }
  if (titleLower.includes('pottery') || titleLower.includes('clay') || titleLower.includes('teapot')) {
    return 'https://assets.mixkit.co/videos/preview/mixkit-potter-working-with-clay-on-a-wheel-41129-large.mp4';
  }
  if (titleLower.includes('plant') || titleLower.includes('monstera') || titleLower.includes('succulent')) {
    return 'https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-small-monstera-plant-41121-large.mp4';
  }
  if (titleLower.includes('honey')) {
    return 'https://assets.mixkit.co/videos/preview/mixkit-honey-falling-from-a-wooden-spoon-41125-large.mp4';
  }

  return 'https://assets.mixkit.co/videos/preview/mixkit-fresh-tea-leaves-in-a-cup-41126-large.mp4';
};

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onChatWithSeller,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'reviews'>('info');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAddedCart, setJustAddedCart] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [selectedFilter, setSelectedFilter] = useState<'all' | '5star' | 'verified'>('all');

  // Checkout modal / step state
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [generatedOrderNumber, setGeneratedOrderNumber] = useState('');

  // Form Fields as explicitly requested:
  // "apnar bivag, jela, thana, uniyon, gram esob pron kore oder confom korbe"
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    division: 'ঢাকা বিভাগ (Dhaka)',
    district: '',
    thana: '',
    union: '',
    village: '',
    paymentMethod: 'cash_on_delivery',
    notes: '',
  });

  const [reviews, setReviews] = useState<CustomerReview[]>([
    {
      id: 'rev-1',
      author: 'Tanvir Hossain',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80',
      rating: 5,
      date: 'গতকাল',
      verified: true,
      comment: 'অসাধারণ কোয়ালিটি! প্যাকেজিং খুব নিখুঁত ছিল এবং সময়মতো ডেলিভারি পেয়েছি। প্রোডাক্টের ফিনিশিং একদম ছবির মতো। ধন্যবাদ GreenShop!',
      likes: 14,
      userLiked: false,
    },
    {
      id: 'rev-2',
      author: 'Sadia Rahman',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      rating: 5,
      date: '৩ দিন আগে',
      verified: true,
      comment: '১০০% খাঁটি ও অর্গানিক জিনিস। সেলারের ব্যবহারও অনেক অমায়িক ছিল। সবার কাছে রেকমেন্ড করব।',
      likes: 8,
      userLiked: false,
    },
    {
      id: 'rev-3',
      author: 'Rashid Al Mamun',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      rating: 4,
      date: '১ সপ্তাহ আগে',
      verified: true,
      comment: 'খুব ভালো প্রোডাক্ট। ডেলিভারি ২ দিনের মধ্যে চলে এসেছে। মাটির গন্ধ ও ন্যাচারাল ভাবটা খুব সুন্দর।',
      likes: 5,
      userLiked: false,
    },
    {
      id: 'rev-4',
      author: 'Nusrat Jahan',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80',
      rating: 5,
      date: '২ সপ্তাহ আগে',
      verified: true,
      comment: 'একদম অথেনটিক ও ফ্রেশ জিনিস। ছবিতে যেমন দেখিয়েছে বাস্তবেও তেমন পেয়েছি। ডেলিভারি বয় খুব হেল্পফুল ছিল।',
      likes: 11,
      userLiked: false,
    },
  ]);

  // Reset when product changes
  useEffect(() => {
    setActiveTab('info');
    setCurrentImageIndex(0);
    setQuantity(1);
    setShowBuyNowModal(false);
    setOrderConfirmed(false);
    setJustAddedCart(false);
  }, [product]);

  if (!product) return null;

  const gallery = getProductGallery(product);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCartOnly = () => {
    onAddToCart(product, quantity);
    setJustAddedCart(true);
    setTimeout(() => setJustAddedCart(false), 2000);
  };

  const handleLikeReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              likes: r.userLiked ? r.likes - 1 : r.likes + 1,
              userLiked: !r.userLiked,
            }
          : r
      )
    );
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim() || 'Verified Buyer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      rating: newReviewRating,
      date: 'এইমাত্র',
      verified: true,
      comment: newReviewText.trim(),
      likes: 0,
      userLiked: false,
    };

    setReviews([newRev, ...reviews]);
    setNewReviewText('');
    setNewReviewAuthor('');
    setShowReviewForm(false);
  };

  // Form submit to confirm order
  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.district.trim() || !formData.thana.trim() || !formData.village.trim()) {
      alert('দয়া করে আপনার নাম, মোবাইল নম্বর, জেলা, থানা এবং গ্রামের নাম পূরণ করুন!');
      return;
    }

    const orderNum = `GS-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedOrderNumber(orderNum);

    // Save to tracking storage so TrackingView immediately picks it up
    try {
      const stored = localStorage.getItem('greenshop_tracked_orders_v1');
      const existingOrders = stored ? JSON.parse(stored) : [];
      const newTrackedOrder = {
        id: `track-${Date.now()}`,
        orderNumber: orderNum,
        productTitle: product.title,
        productImage: product.image,
        vendor: product.vendor,
        price: product.price,
        quantity: quantity,
        recipient: formData.fullName,
        address: `${formData.village}, ${formData.union ? formData.union + ', ' : ''}${formData.thana}, ${formData.district}, ${formData.division.split(' ')[0]}`,
        stage: 1,
        stageLabel: 'Processing',
        currentLocationNote: `অর্ডার গৃহীত হয়েছে। প্যাকেজিং চলছে।`,
        estimatedDelivery: 'Within 24-48 Hours',
        placedTime: 'এইমাত্র',
      };
      localStorage.setItem('greenshop_tracked_orders_v1', JSON.stringify([newTrackedOrder, ...existingOrders]));
    } catch {
      // ignore
    }

    setOrderConfirmed(true);
  };

  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === '5star') return r.rating === 5;
    if (selectedFilter === 'verified') return r.verified;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      
      {/* Outer Modal Container */}
      <div
        id="product-detail-modal"
        className="relative w-full max-w-4xl bg-[#14151a] border border-[#2b2d38] rounded-3xl overflow-hidden shadow-2xl text-neutral-200 my-auto max-h-[92vh] flex flex-col"
      >
        
        {/* Close Button Top Right */}
        <button
          id="close-product-detail-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 hover:bg-black text-white hover:text-emerald-400 transition-all shadow-lg border border-white/10 cursor-pointer"
          title="Close Modal"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-3 sm:p-5 space-y-4 scrollbar-thin">
          
          {/* ============================================================== */}
          {/* TOP SECTION: PRODUCT PIK (IMAGE SLIDER WITH < AND > ARROWS) */}
          {/* ============================================================== */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-950 border-2 border-emerald-500/40 shadow-xl group">
            
            {/* Main Picture Box */}
            <div className="relative w-full h-60 sm:h-72 md:h-80 flex items-center justify-center bg-black/40">
              <img
                src={gallery[currentImageIndex]}
                alt={`${product.title} view ${currentImageIndex + 1}`}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent via-50% to-black/40 pointer-events-none" />

              {/* Left Arrow Button [<] */}
              <button
                onClick={handlePrevImage}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/65 hover:bg-emerald-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
                title="Previous Image"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 stroke-[3]" />
              </button>

              {/* Right Arrow Button [>] */}
              <button
                onClick={handleNextImage}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/65 hover:bg-emerald-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
                title="Next Image"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 stroke-[3]" />
              </button>

              {/* Top Left Feature Badges */}
              <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-2">
                {product.isOrganic && (
                  <span className="px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 text-xs font-bold backdrop-blur-md flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>100% Certified Organic</span>
                  </span>
                )}
                {product.isHandmade && (
                  <span className="px-3 py-1 rounded-full bg-amber-950/90 text-amber-300 border border-amber-500/50 text-xs font-bold backdrop-blur-md shadow-md">
                    🏺 Traditional Handcrafted
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-3 py-1 rounded-full bg-rose-950/90 text-rose-300 border border-rose-500/50 text-xs font-black shadow-md">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Bottom Image Carousel Thumbnails / Dots Indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`transition-all rounded-full overflow-hidden cursor-pointer ${
                      idx === currentImageIndex
                        ? 'w-7 h-7 ring-2 ring-emerald-400 scale-105'
                        : 'w-5 h-5 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Photo Counter Pill (e.g. 1 / 4) */}
              <div className="absolute bottom-3 right-3 z-20 px-2.5 py-1 rounded-md bg-black/70 border border-white/10 text-[11px] font-mono text-neutral-300">
                {currentImageIndex + 1} / {gallery.length}
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* TAB BUTTONS (OPOR A SUDU BUTTON THAKBE) */}
          {/* ============================================================== */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-2.5 bg-[#181920] p-1.5 rounded-2xl border border-[#2b2d38]">
            
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 flex-1">
              {/* Button 1: Product Information */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('info');
                  setShowBuyNowModal(false);
                }}
                className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                  activeTab === 'info'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50 scale-[1.01]'
                    : 'bg-[#20222a] text-neutral-400 hover:text-white hover:bg-[#282a35]'
                }`}
              >
                <Box className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${activeTab === 'info' ? 'text-white' : 'text-emerald-400'}`} />
                <span>PRODUCT INFO</span>
                <span className={`text-[10px] sm:text-[11px] font-mono px-1.5 sm:px-2 py-0.5 rounded-md ${
                  activeTab === 'info' ? 'bg-black/30 text-white' : 'bg-black/20 text-emerald-400'
                }`}>
                  Stock: {product.stock}
                </span>
              </button>

              {/* Button 2: Customer Reviews */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('reviews');
                  setShowBuyNowModal(false);
                }}
                className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50 scale-[1.01]'
                    : 'bg-[#20222a] text-neutral-400 hover:text-white hover:bg-[#282a35]'
                }`}
              >
                <Star className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${activeTab === 'reviews' ? 'fill-amber-300 text-amber-300' : 'text-amber-400'}`} />
                <span>REVIEWS ({product.reviewsCount + reviews.length})</span>
                <span className={`text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md ${
                  activeTab === 'reviews' ? 'bg-black/30 text-amber-300' : 'bg-black/20 text-neutral-300'
                }`}>
                  4.9 ★
                </span>
              </button>
            </div>

            {/* If on Reviews tab, quick button to write review */}
            {activeTab === 'reviews' && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-4 py-2.5 bg-[#20222a] hover:bg-[#282a35] text-emerald-400 border border-[#323545] rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all self-center sm:self-auto"
              >
                {showReviewForm ? '✕ Close Form' : '+ Write Review'}
              </button>
            )}

          </div>

          {/* ============================================================== */}
          {/* SINGLE FULL-WIDTH CARD (NICER 2TA CARD MILE EKTA PAGE) */}
          {/* ============================================================== */}
          <div className="w-full bg-[#181920] border-2 border-emerald-500/30 rounded-2xl p-4 sm:p-6 shadow-xl relative">
            
            {/* ------------------------------------------------------------ */}
            {/* VIEW 1: PRODUCT INFORMATION FULL PAGE */}
            {/* ------------------------------------------------------------ */}
            {activeTab === 'info' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                
                {/* Vendor / Official Store Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#1e2029] border border-[#2b2d3a]">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.vendorLogo}
                      alt={product.vendor}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{product.vendor}</span>
                        <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                          Official Store
                        </span>
                      </div>
                      <span className="text-xs text-neutral-400">Response time: within 15 minutes • Fast dispatch</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onChatWithSeller(product);
                    }}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#282a36] hover:bg-emerald-600 hover:text-black text-emerald-400 text-xs font-bold transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat with Seller</span>
                  </button>
                </div>

                {/* Title & Price Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#282a36]">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                      {product.title}
                    </h2>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-emerald-400">
                      ৳ {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-base text-neutral-500 line-through">
                        ৳ {product.originalPrice}
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                        Save ৳{product.originalPrice - product.price}
                      </span>
                    )}
                  </div>
                </div>

                {/* Full Description */}
                <div>
                  <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    Product Description
                  </h3>
                  <p className="text-sm text-neutral-200 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Product Video Section (Post video attached to product) */}
                <div className="p-4 rounded-2xl bg-[#1e2029] border border-emerald-500/40 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#2b2d39]">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <Video className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                          <span>প্রোডাক্ট ভিডিও রিভিউ ও ডেমো (Product Video Demo)</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            HD 1080p
                          </span>
                        </h4>
                        <p className="text-[11px] text-neutral-400">
                          পোস্ট করার সময় সেলারের আপলোডকৃত আসল ভিডিও - কেনার আগে প্রোডাক্টের সাইজ ও আসল রূপ দেখে নিন
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Video player container */}
                  <div className="relative w-full rounded-xl overflow-hidden bg-black border border-[#2d303f] shadow-lg aspect-video max-h-72 flex items-center justify-center">
                    <video
                      src={getProductVideo(product)}
                      controls
                      poster={product.image}
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400 px-1 pt-1">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>ভিডিওতে যেমন দেখছেন ঠিক তেমন প্রোডাক্ট ডেলিভারি পাবেন</span>
                    </span>
                    <span className="text-neutral-500 hidden sm:inline">সাউন্ড অন করে ভিডিও শুনুন 🔊</span>
                  </div>
                </div>

                {/* Detailed Specifications & Guarantees Grid (Full width 4 columns) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-[#1e2029] border border-[#2b2d39] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <Truck className="w-4 h-4 text-emerald-400" />
                      <span>Delivery Time</span>
                    </div>
                    <p className="text-sm font-bold text-white">24-48 Hours</p>
                    <p className="text-[11px] text-neutral-500">Nationwide courier</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#1e2029] border border-[#2b2d39] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Payment Method</span>
                    </div>
                    <p className="text-sm font-bold text-white">Cash / bKash</p>
                    <p className="text-[11px] text-neutral-500">Pay on delivery</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#1e2029] border border-[#2b2d39] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <RefreshCw className="w-4 h-4 text-emerald-400" />
                      <span>Return Policy</span>
                    </div>
                    <p className="text-sm font-bold text-white">7 Days Easy</p>
                    <p className="text-[11px] text-neutral-500">Hassle-free return</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#1e2029] border border-[#2b2d39] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span>Quality Grade</span>
                    </div>
                    <p className="text-sm font-bold text-white">100% Authentic</p>
                    <p className="text-[11px] text-neutral-500">Direct producer</p>
                  </div>
                </div>

                {/* Bottom Purchase Bar: Quantity Selector, Add to Cart & Prominent BUY NOW Button */}
                <div className="p-4 rounded-2xl bg-[#1e2029] border border-[#2e3140] flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-xs font-semibold text-neutral-300">পরিমাণ:</span>
                    <div className="flex items-center bg-[#14151a] border border-[#303342] rounded-xl overflow-hidden">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3.5 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer text-sm font-bold"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-xs font-bold text-white min-w-8 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                        className="px-3.5 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-neutral-400">
                      (Total: <strong className="text-emerald-400 font-mono">৳{product.price * quantity}</strong>)
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    {/* Add to Cart secondary button */}
                    <button
                      onClick={handleAddToCartOnly}
                      className={`px-4 py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-emerald-500/30 cursor-pointer ${
                        justAddedCart
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#181920] hover:bg-[#20222b] text-emerald-400 hover:text-emerald-300'
                      }`}
                      title="Add to Cart"
                    >
                      {justAddedCart ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                      <span>{justAddedCart ? 'Added!' : 'Cart'}</span>
                    </button>

                    {/* MAIN "BUY NOW" BUTTON AS SPECIFIED */}
                    <button
                      onClick={() => setShowBuyNowModal(true)}
                      className="flex-1 sm:flex-initial px-8 py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:from-[#16a34a] hover:to-[#15803d] text-black hover:text-white shadow-xl shadow-emerald-950/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Package className="w-4 h-4 stroke-[2.5]" />
                      <span>Buy Now (৳{product.price * quantity})</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* VIEW 2: CUSTOMER REVIEWS FULL PAGE */}
            {/* ------------------------------------------------------------ */}
            {activeTab === 'reviews' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                
                {/* Rating Overview Summary (Wide Banner) */}
                <div className="p-4 sm:p-5 bg-[#1e2029] rounded-2xl border border-[#2b2d3a] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-black text-amber-400">4.9</div>
                    <div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-neutral-300 mt-1">
                        সব কাস্টমারের <strong className="text-emerald-400">৯৮% রেকমেন্ডেশন রেটিং</strong>
                      </p>
                      <span className="text-[11px] text-neutral-400">
                        মোট {product.reviewsCount + reviews.length} জন ভেরিফাইড ক্রেতার মতামত
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedFilter('all')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedFilter === 'all'
                          ? 'bg-emerald-500 text-black font-bold'
                          : 'bg-[#282a36] text-neutral-400 hover:text-white'
                      }`}
                    >
                      All ({reviews.length})
                    </button>
                    <button
                      onClick={() => setSelectedFilter('5star')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                        selectedFilter === '5star'
                          ? 'bg-emerald-500 text-black font-bold'
                          : 'bg-[#282a36] text-neutral-400 hover:text-white'
                      }`}
                    >
                      <span>5 Star</span>
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    </button>
                    <button
                      onClick={() => setSelectedFilter('verified')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedFilter === 'verified'
                          ? 'bg-emerald-500 text-black font-bold'
                          : 'bg-[#282a36] text-neutral-400 hover:text-white'
                      }`}
                    >
                      Verified Only
                    </button>
                  </div>
                </div>

                {/* Review Form if opened */}
                {showReviewForm && (
                  <form onSubmit={handleAddReview} className="p-4 bg-[#1e202a] rounded-2xl border border-emerald-500/50 space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-white">আপনার মতামত ও রেটিং প্রদান করুন:</p>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewReviewRating(star)}
                            className="p-1 cursor-pointer"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                star <= newReviewRating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-neutral-600'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="আপনার নাম (যেমন: তানভীর আহমেদ)"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        className="sm:col-span-1 px-3.5 py-2 bg-[#14151a] border border-[#2e3140] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                      />
                      <input
                        type="text"
                        placeholder="প্রোডাক্টটি কেমন লেগেছে? আপনার সৎ অভিজ্ঞতা শেয়ার করুন..."
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                        className="sm:col-span-2 px-3.5 py-2 bg-[#14151a] border border-[#2e3140] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white rounded-xl"
                      >
                        বাতিল
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>রিভিউ পোস্ট করুন</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Reviews List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
                  {filteredReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-3.5 rounded-xl bg-[#1e2029] border border-[#2b2d39] text-xs space-y-2 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={rev.avatar}
                              alt={rev.author}
                              className="w-8 h-8 rounded-full object-cover border border-emerald-500/50"
                            />
                            <div>
                              <span className="font-bold text-white text-xs block leading-tight">
                                {rev.author}
                              </span>
                              <div className="flex items-center gap-0.5 mt-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < rev.rating
                                        ? 'fill-amber-400 text-amber-400'
                                        : 'text-neutral-700'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-[10px] text-neutral-400">
                            <span className="text-emerald-400 flex items-center gap-0.5 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              Verified
                            </span>
                            <span>• {rev.date}</span>
                          </div>
                        </div>

                        <p className="text-neutral-300 leading-relaxed text-xs pt-1">
                          {rev.comment}
                        </p>
                      </div>

                      <div className="flex items-center justify-end pt-2 border-t border-[#282a36]">
                        <button
                          onClick={() => handleLikeReview(rev.id)}
                          className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                            rev.userLiked
                              ? 'bg-emerald-500/20 text-emerald-400 font-bold'
                              : 'text-neutral-400 hover:text-white bg-[#16171d]'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Helpful ({rev.likes})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* ============================================================== */}
      {/* BANGLADESH ADDRESS CHECKOUT FORM MODAL (BUY NOW FLOW) */}
      {/* "apnar bivag, jela, thana, uniyon, gram esob pron kore oder confom korbe" */}
      {/* ============================================================== */}
      {showBuyNowModal && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#181920] border-2 border-emerald-500/50 text-white w-full max-w-xl rounded-3xl p-5 sm:p-6 shadow-2xl animate-in zoom-in-95 duration-150 my-auto">
            
            {!orderConfirmed ? (
              <>
                {/* Form Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#282a36] mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500 text-black flex items-center justify-center font-black">
                      <Package className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-white">
                        অর্ডার কনফার্ম করুন (Confirm Order)
                      </h3>
                      <p className="text-[11px] text-neutral-400">
                        নিচের ঠিকানার তথ্যগুলো পূরণ করে সরাসরি ক্যাশ অন ডেলিভারিতে অর্ডার করুন
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowBuyNowModal(false)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Selected Product Summary Mini Card */}
                <div className="p-3 rounded-2xl bg-[#1f212b] border border-[#2d303f] flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 rounded-xl object-cover border border-emerald-500/40 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">
                        {product.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400">
                        পরিমাণ: <strong className="text-white">{quantity} টি</strong> • রেট: ৳{product.price}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-emerald-400">
                      ৳{product.price * quantity}
                    </div>
                    <span className="text-[10px] text-neutral-400">ডেলিভারি: ফ্রি</span>
                  </div>
                </div>

                {/* Form Inputs */}
                <form onSubmit={handleConfirmOrder} className="space-y-3.5">
                  
                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1 flex items-center gap-1">
                        <UserIcon className="w-3.5 h-3.5 text-emerald-400" />
                        <span>আপনার নাম (Full Name) *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: মোঃ সাব্বির আহমেদ"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#121317] border border-[#2b2d39] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>মোবাইল নম্বর (Phone) *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="যেমন: 017XXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#121317] border border-[#2b2d39] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* বিভাগ (Division) & জেলা (District) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1 flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-emerald-400" />
                        <span>বিভাগ (Division) *</span>
                      </label>
                      <select
                        value={formData.division}
                        onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                        className="w-full px-3 py-2.5 bg-[#121317] border border-[#2b2d39] rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        {BD_DIVISIONS.map((div) => (
                          <option key={div} value={div} className="bg-[#181920] text-white">
                            {div}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>জেলা (District) *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: ঢাকা, সিলেট, কুমিল্লা..."
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#121317] border border-[#2b2d39] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* থানা (Thana) & ইউনিয়ন (Union) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>থানা / উপজেলা (Thana / Upazila) *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: মিরপুর, সাভার, শ্রীমঙ্গল..."
                        value={formData.thana}
                        onChange={(e) => setFormData({ ...formData, thana: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#121317] border border-[#2b2d39] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1 flex items-center gap-1">
                        <Home className="w-3.5 h-3.5 text-emerald-400" />
                        <span>ইউনিয়ন / ওয়ার্ড (Union / Ward) *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="যেমন: ইউনিয়ন পরিষদ / ওয়ার্ড নং"
                        value={formData.union}
                        onChange={(e) => setFormData({ ...formData, union: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#121317] border border-[#2b2d39] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* গ্রাম (Village) & বাসা/রোড */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1 flex items-center gap-1">
                      <Home className="w-3.5 h-3.5 text-emerald-400" />
                      <span>গ্রাম / মহল্লা / বাসা ও রোড নং (Village Address) *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: গ্রাম: শান্তিপুর, ডাকঘর: বাজার, বাড়ি নং ১২"
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#121317] border border-[#2b2d39] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Payment Method Badge */}
                  <div className="p-3 rounded-xl bg-[#121317] border border-[#2b2d39] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-semibold text-white">পেমেন্ট মেথড:</span>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      💵 Cash on Delivery (হাতে পেয়ে টাকা দিন)
                    </span>
                  </div>

                  {/* Total and Action Buttons */}
                  <div className="pt-3 border-t border-[#282a36] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="flex items-center justify-between sm:block">
                      <span className="text-[11px] text-neutral-400 block">পরিশোধযোগ্য মোট মূল্য:</span>
                      <span className="text-xl font-black text-emerald-400">
                        ৳{product.price * quantity}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowBuyNowModal(false)}
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        বাতিল
                      </button>

                      <button
                        type="submit"
                        className="flex-2 sm:flex-initial px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm bg-[#22c55e] hover:bg-[#16a34a] text-black hover:text-white shadow-lg shadow-emerald-950/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>অর্ডার কনফার্ম করুন</span>
                      </button>
                    </div>
                  </div>

                </form>
              </>
            ) : (
              /* Success confirmation view */
              <div className="py-6 text-center space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500 shadow-xl animate-bounce">
                  <CheckCircle className="w-9 h-9 stroke-[2.5]" />
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    🎉 অভিনন্দন! আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1">
                    অর্ডার ট্র্যাকিং আইডি: <span className="font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">{generatedOrderNumber}</span>
                  </p>
                </div>

                {/* Order Summary Box */}
                <div className="bg-[#121317] border border-[#2b2d39] rounded-2xl p-4 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between pb-1.5 border-b border-neutral-800">
                    <span className="text-neutral-400">প্রোডাক্ট:</span>
                    <span className="font-bold text-white">{product.title} ({quantity} টি)</span>
                  </div>
                  <div className="flex justify-between pb-1.5 border-b border-neutral-800">
                    <span className="text-neutral-400">প্রাপকের নাম:</span>
                    <span className="font-bold text-white">{formData.fullName} ({formData.phone})</span>
                  </div>
                  <div className="flex justify-between pb-1.5 border-b border-neutral-800">
                    <span className="text-neutral-400">ডেলিভারি ঠিকানা:</span>
                    <span className="font-semibold text-emerald-300 text-right max-w-[220px]">
                      {formData.village}, {formData.union ? formData.union + ', ' : ''}{formData.thana}, {formData.district}, {formData.division.split(' ')[0]}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-neutral-400">পেমেন্ট (ক্যাশ অন ডেলিভারি):</span>
                    <span className="font-black text-emerald-400 text-sm">৳{product.price * quantity}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setShowBuyNowModal(false);
                      onClose();
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-lg transition-all cursor-pointer"
                  >
                    ঠিক আছে, মার্কেটপ্লেসে ফিরে যান
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
