import React, { useState } from 'react';
import {
  X,
  Upload,
  Video,
  Image as ImageIcon,
  Tag,
  DollarSign,
  CreditCard,
  Layers,
  Search,
  Check,
  Sparkles,
  ShieldCheck,
  Truck,
  Plus,
  Info,
  Globe,
  Play,
} from 'lucide-react';
import { Product } from '../types';

export interface ProductPostData {
  id: string;
  title: string;
  caption: string;
  tags: string[];
  price: number;
  originalPrice?: number;
  productInfo: string;
  videoUrl?: string;
  image: string;
  category: string;
  keywords: string[];
  paymentMethods: string[];
  sellerNumber?: string;
  deliveryInsideDhaka: number;
  deliveryOutsideDhaka: number;
  stock: number;
  isPublic: boolean;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  shares: number;
}

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: ProductPostData, createdProduct: Product) => void;
  sellerName?: string;
  sellerAvatar?: string;
}

const CATEGORIES = [
  'Indoor Plants',
  'Outdoor & Terrace Plants',
  'Ceramic Pots & Planters',
  'Seeds & Bulbs',
  'Organic Fertilizers',
  'Gardening Tools & Macrame',
  'Succulents & Cacti',
  'Home & Garden',
];

const SUGGESTED_TAGS = [
  '#IndoorPlant',
  '#Monstera',
  '#AirPurifier',
  '#TerraceGarden',
  '#RarePlant',
  '#OrganicFertilizer',
  '#CeramicPot',
  '#BonsaiBD',
  '#HomeDecor',
];

const PAYMENT_OPTIONS = [
  { id: 'bKash', label: 'bKash (বিকাশ)', color: 'bg-pink-500/10 text-pink-600 border-pink-200' },
  { id: 'Nagad', label: 'Nagad (নগদ)', color: 'bg-orange-500/10 text-orange-600 border-orange-200' },
  { id: 'Rocket', label: 'Rocket (রকেট)', color: 'bg-purple-500/10 text-purple-600 border-purple-200' },
  { id: 'COD', label: 'Cash on Delivery (ক্যাশ অন ডেলিভারি)', color: 'bg-emerald-500/10 text-emerald-700 border-emerald-200' },
  { id: 'Bank', label: 'Bank / Card (ব্যাংক ট্রান্সফার)', color: 'bg-blue-500/10 text-blue-600 border-blue-200' },
];

const SAMPLE_IMAGES = [
  {
    name: 'Variegated Monstera',
    url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Terracotta Snake Plant',
    url: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Ceramic Succulent Trio',
    url: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Macrame Hanging Fern',
    url: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Tabletop Ficus Bonsai',
    url: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Lush Calathea Peacock',
    url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80',
  },
];

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  sellerName = 'Rifat Islam 123',
  sellerAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
}) => {
  // Form States
  const [caption, setCaption] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [price, setPrice] = useState<string>('350');
  const [originalPrice, setOriginalPrice] = useState<string>('450');
  const [productInfo, setProductInfo] = useState('');
  const [category, setCategory] = useState('Indoor Plants');
  const [videoUrl, setVideoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState(SAMPLE_IMAGES[0].url);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['#IndoorPlant', '#OrganicCare']);
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState<string[]>([
    'monstera',
    'indoor plant',
    'ceramic pot',
    'air purifier',
  ]);
  const [paymentMethods, setPaymentMethods] = useState<string[]>(['bKash', 'Nagad', 'COD']);
  const [sellerNumber, setSellerNumber] = useState('01712-345678');
  const [deliveryInsideDhaka, setDeliveryInsideDhaka] = useState('60');
  const [deliveryOutsideDhaka, setDeliveryOutsideDhaka] = useState('120');
  const [stock, setStock] = useState('20');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVideoPreview, setShowVideoPreview] = useState(false);

  if (!isOpen) return null;

  const handleAddTag = (tagToAdd: string) => {
    let clean = tagToAdd.trim();
    if (!clean) return;
    if (!clean.startsWith('#')) clean = `#${clean}`;
    if (!tags.includes(clean)) {
      setTags([...tags, clean]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleAddKeyword = (kwToAdd: string) => {
    const clean = kwToAdd.trim().toLowerCase();
    if (clean && !keywords.includes(clean)) {
      setKeywords([...keywords, clean]);
    }
    setKeywordInput('');
  };

  const handleRemoveKeyword = (kwToRemove: string) => {
    setKeywords(keywords.filter((k) => k !== kwToRemove));
  };

  const togglePaymentMethod = (methodId: string) => {
    if (paymentMethods.includes(methodId)) {
      if (paymentMethods.length > 1) {
        setPaymentMethods(paymentMethods.filter((m) => m !== methodId));
      }
    } else {
      setPaymentMethods([...paymentMethods, methodId]);
    }
  };

  const handleQuickFillDemo = () => {
    setProductTitle('Rare Variegated Monstera Deliciosa in Ivory Ceramic');
    setCaption(
      '🌿 Special Terrace Nursery Batch! Freshly propagated variegated Monstera with high chlorophyll balance, established root system, and premium ivory drainage pot. Order today for free organic compost packet! 🌱'
    );
    setPrice('450');
    setOriginalPrice('550');
    setProductInfo(
      'Species: Monstera deliciosa variegated. Height: 14 inches with 4 mature fenestrated leaves. Pot: 6-inch hand-finished terracotta with ceramic glaze. Care: Bright indirect sunlight, water once weekly. Ideal for living rooms and office desks.'
    );
    setCategory('Indoor Plants');
    setImageUrl(SAMPLE_IMAGES[0].url);
    setVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-small-monstera-plant-41121-large.mp4');
    setTags(['#IndoorPlant', '#Monstera', '#AirPurifier', '#TerraceGarden', '#DiscountDeal']);
    setKeywords(['monstera', 'indoor plant', 'variegated', 'ceramic pot', 'air purifying', 'nursery plant']);
    setPaymentMethods(['bKash', 'Nagad', 'COD']);
    setSellerNumber('01799-887766');
    setStock('12');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productTitle.trim() && !caption.trim()) {
      alert('Please enter a product title or caption');
      return;
    }

    setIsSubmitting(true);
    const parsedPrice = parseFloat(price) || 250;
    const parsedOriginalPrice = parseFloat(originalPrice) || parsedPrice + 100;
    const postId = `post-${Date.now()}`;
    const prodId = `prod-posted-${Date.now()}`;
    const finalTitle = productTitle.trim() || caption.slice(0, 40) + '...';

    const newPost: ProductPostData = {
      id: postId,
      title: finalTitle,
      caption: caption || `New botanical listing: ${finalTitle}`,
      tags: tags.length > 0 ? tags : ['#IndoorPlant', '#GreenShop'],
      price: parsedPrice,
      originalPrice: parsedOriginalPrice,
      productInfo: productInfo || 'High quality botanical product curated with organic care.',
      videoUrl: videoUrl.trim() || undefined,
      image: imageUrl,
      category,
      keywords: keywords.length > 0 ? keywords : ['plant', 'garden', 'green'],
      paymentMethods,
      sellerNumber: sellerNumber.trim() || undefined,
      deliveryInsideDhaka: parseFloat(deliveryInsideDhaka) || 60,
      deliveryOutsideDhaka: parseFloat(deliveryOutsideDhaka) || 120,
      stock: parseInt(stock, 10) || 10,
      isPublic,
      createdAt: 'Just now',
      likes: 1,
      isLiked: false,
      shares: 0,
    };

    const newProduct: Product = {
      id: prodId,
      title: finalTitle,
      vendor: sellerName,
      vendorLogo: sellerAvatar,
      price: parsedPrice,
      originalPrice: parsedOriginalPrice,
      rating: 5.0,
      reviewsCount: 1,
      category: 'Home & Garden',
      image: imageUrl,
      description: `${newPost.caption}\n\n${newPost.productInfo}`,
      stock: newPost.stock,
      isOrganic: true,
      isHandmade: true,
      videoUrl: newPost.videoUrl,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(newPost, newProduct);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl my-8 bg-white text-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-200/90 flex items-center justify-between bg-gradient-to-r from-emerald-50/80 via-white to-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 flex items-center gap-2">
                <span>Create Product Post</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Seller Portal
                </span>
              </h2>
              <p className="text-xs text-neutral-500">
                পোস্ট ফর্ম পূরণ করে লাইভ মার্কেট ও প্রোফাইলে প্রোডাক্টটি পাবলিক করুন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQuickFillDemo}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200 transition-colors"
              title="Click to fill form with high quality sample plant details"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-Fill Sample</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto px-5 sm:px-8 py-6 space-y-6 flex-1">
          {/* Seller Preview Strip */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <div className="flex items-center gap-3">
              <img
                src={sellerAvatar}
                alt={sellerName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500"
              />
              <div>
                <p className="text-xs font-bold text-neutral-900">{sellerName}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                  <Globe className="w-3 h-3 text-emerald-600" />
                  <span>Public Listing • Visible on Profile & Local Market</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleQuickFillDemo}
              className="sm:hidden px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200"
            >
              Auto-Fill
            </button>
          </div>

          {/* Section 1: Product Title & Caption */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                Product Title / নাম <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                placeholder="e.g. Rare Variegated Monstera Deliciosa in Ivory Ceramic Planter"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                Post Caption / ক্যাপশন <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write an engaging caption for your post (e.g. 🌱 Fresh arrival from nursery! Healthy foliage, organic soil, and decorative planter included...)"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm outline-none transition-all resize-none"
              />
              {/* Emoji quick insertion */}
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-neutral-500">
                <span className="text-[11px]">Quick emojis:</span>
                {['🌱', '🌿', '🪴', '🌸', '✨', '🍃', '🔥', '৳'].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setCaption((prev) => prev + ' ' + emoji)}
                    className="hover:scale-125 transition-transform"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                Price / মূল্য (T.K.) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 font-bold text-sm">
                  ৳
                </span>
                <input
                  type="number"
                  min="1"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="350"
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm font-bold text-neutral-900 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                Regular / Old Price (T.K.)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 font-bold text-sm">
                  ৳
                </span>
                <input
                  type="number"
                  min="1"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="450"
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm text-neutral-600 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                Category / ক্যাটাগরি <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs sm:text-sm text-neutral-800 bg-white outline-none transition-all cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Product Image (URL or Presets) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>Product Image / ছবি <span className="text-rose-500">*</span></span>
              </label>
              <span className="text-[11px] text-neutral-500">Pick preset or paste URL</span>
            </div>

            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-none">
              {SAMPLE_IMAGES.map((img) => (
                <button
                  key={img.name}
                  type="button"
                  onClick={() => setImageUrl(img.url)}
                  className={`shrink-0 flex items-center gap-2 p-1.5 rounded-xl border transition-all ${
                    imageUrl === img.url
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/30'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <span className="text-[11px] font-medium text-neutral-700 pr-1">
                    {img.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/... or image link"
                className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs sm:text-sm outline-none transition-all"
              />
              {imageUrl && (
                <div className="w-11 h-11 rounded-xl overflow-hidden border border-neutral-200 shrink-0 shadow-xs">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Product Video */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-emerald-600" />
                <span>Product Video / ভিডিও লিংক</span>
                <span className="text-[10px] text-neutral-400 font-normal">(Optional)</span>
              </label>
              {videoUrl && (
                <button
                  type="button"
                  onClick={() => setShowVideoPreview(!showVideoPreview)}
                  className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <Play className="w-3 h-3" />
                  <span>{showVideoPreview ? 'Hide Preview' : 'Test Preview'}</span>
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="e.g. MP4 video link or YouTube/Reel URL (e.g. nursery showcase)"
                className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs sm:text-sm outline-none transition-all"
              />
              <button
                type="button"
                onClick={() =>
                  setVideoUrl(
                    'https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-small-monstera-plant-41121-large.mp4'
                  )
                }
                className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap"
              >
                Sample Video
              </button>
            </div>

            {showVideoPreview && videoUrl && (
              <div className="mt-2 rounded-2xl overflow-hidden bg-black aspect-video max-h-48 border border-neutral-300">
                <video
                  src={videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Section 5: Product Information (Detailed Specs) */}
          <div>
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
              Product Information / বিস্তারিত বিবরণ <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={productInfo}
              onChange={(e) => setProductInfo(e.target.value)}
              placeholder="Include size, pot details, light requirements, water frequency, organic care instructions, nursery guarantee..."
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm outline-none transition-all"
            />
          </div>

          {/* Section 6: Tags & Keywords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tags */}
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                Product Tags / ট্যাগ (#tag)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag(tagInput);
                    }
                  }}
                  placeholder="Type tag & Enter (e.g. #Monstera)"
                  className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-300 focus:border-emerald-500 text-xs outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleAddTag(tagInput)}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Add
                </button>
              </div>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-1.5 min-h-[30px]">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-rose-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Suggested Tags */}
              <div className="flex flex-wrap gap-1 mt-2">
                <span className="text-[10px] text-neutral-400 self-center">Suggestions:</span>
                {SUGGESTED_TAGS.slice(0, 4).map((stag) => (
                  <button
                    key={stag}
                    type="button"
                    onClick={() => handleAddTag(stag)}
                    className="text-[10px] text-neutral-600 hover:text-emerald-700 bg-neutral-100 hover:bg-emerald-50 px-2 py-0.5 rounded-md border border-neutral-200 transition-colors"
                  >
                    {stag}
                  </button>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                Keywords / সার্চ কি-ওয়ার্ড
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddKeyword(keywordInput);
                    }
                  }}
                  placeholder="Type keyword & Enter"
                  className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-300 focus:border-emerald-500 text-xs outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleAddKeyword(keywordInput)}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Add
                </button>
              </div>

              {/* Keyword Chips */}
              <div className="flex flex-wrap gap-1.5 min-h-[30px]">
                {keywords.map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700 border border-neutral-200 text-[11px] font-medium"
                  >
                    <span>{kw}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(kw)}
                      className="hover:text-rose-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 7: Payment System (পেমেন্ট সিস্টেম) */}
          <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                <span>Payment System / অনুমোদিত পেমেন্ট পদ্ধতি <span className="text-rose-500">*</span></span>
              </label>
              <span className="text-[11px] text-neutral-500">Select acceptable methods</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PAYMENT_OPTIONS.map((method) => {
                const isSelected = paymentMethods.includes(method.id);
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => togglePaymentMethod(method.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      isSelected
                        ? `${method.color} ring-2 ring-emerald-500/20 shadow-xs font-bold`
                        : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-emerald-600 text-white' : 'border border-neutral-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="truncate">{method.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                  bKash / Nagad Seller Number
                </label>
                <input
                  type="text"
                  value={sellerNumber}
                  onChange={(e) => setSellerNumber(e.target.value)}
                  placeholder="017XX-XXXXXX"
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs outline-none focus:border-emerald-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                  Stock Units Available
                </label>
                <input
                  type="number"
                  min="1"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="10"
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs outline-none focus:border-emerald-500 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 8: Delivery & Visibility */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-700 mb-1 flex items-center gap-1">
                <Truck className="w-3 h-3 text-neutral-500" />
                <span>Inside Dhaka Delivery (৳)</span>
              </label>
              <input
                type="number"
                value={deliveryInsideDhaka}
                onChange={(e) => setDeliveryInsideDhaka(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-700 mb-1 flex items-center gap-1">
                <Truck className="w-3 h-3 text-neutral-500" />
                <span>Outside Dhaka Delivery (৳)</span>
              </label>
              <input
                type="number"
                value={deliveryOutsideDhaka}
                onChange={(e) => setDeliveryOutsideDhaka(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-end">
              <label className="w-full flex items-center gap-2 p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <div className="text-left">
                  <span className="text-xs font-bold text-emerald-950 block">Public Listing</span>
                  <span className="text-[10px] text-emerald-700">Immediate live display</span>
                </div>
              </label>
            </div>
          </div>

          {/* Modal Footer Buttons */}
          <div className="pt-4 border-t border-neutral-200 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sticky bottom-0 bg-white py-2">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe seller guarantee • 100% verified garden product</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-100 text-xs sm:text-sm font-semibold transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-700/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Publish Product (পাবলিক করুন)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
