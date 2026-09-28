import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Users,
  MessageSquare,
  Share2,
  ShoppingCart,
  Image as ImageIcon,
  Check,
  Heart,
  Video,
  Radio,
  Tag,
  Sparkles,
  Plus,
  FileText,
  CreditCard,
  Truck,
  Globe,
  Trash2,
  Play,
  Pause,
  ExternalLink,
  MessageCircle,
  Clock,
  ShieldCheck,
  Layers,
  Search,
} from 'lucide-react';
import { Product } from '../../types';
import { CreatePostModal, ProductPostData } from '../CreatePostModal';

interface ProfileViewProps {
  onAddToCart: (product: Product) => void;
  onOpenChat: () => void;
  onViewProduct?: (product: Product) => void;
  onProductPublished?: (product: Product) => void;
}

interface ProfileProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
}

const DEFAULT_POSTS: ProductPostData[] = [
  {
    id: 'post-1',
    title: 'Rare Variegated Monstera Deliciosa with Ivory Ceramic Planter',
    caption:
      '🌿 Special nursery propagation batch! Healthy fenestrated foliage with established root system and organic potting mix. Comes ready in an 8-inch ivory glazed terracotta pot. Best suited for living room corners and bright rooms. Free organic fertilizer packet included! 🌱✨',
    tags: ['#IndoorPlant', '#Monstera', '#AirPurifier', '#TerraceGarden', '#DiscountDeal'],
    price: 450,
    originalPrice: 550,
    productInfo:
      'Variegated Monstera deliciosa. Height: 14 inches. Light: Medium to bright indirect sunlight. Water: Once weekly. Comes with ivory ceramic drainage pot and slow-release organic compost.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-small-monstera-plant-41121-large.mp4',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&auto=format&fit=crop&q=80',
    category: 'Indoor Plants',
    keywords: ['monstera', 'indoor plant', 'ceramic pot', 'air purifier', 'variegated'],
    paymentMethods: ['bKash', 'Nagad', 'COD'],
    sellerNumber: '01712-987654',
    deliveryInsideDhaka: 60,
    deliveryOutsideDhaka: 120,
    stock: 12,
    isPublic: true,
    createdAt: '2 hours ago',
    likes: 48,
    isLiked: false,
    shares: 14,
  },
  {
    id: 'post-2',
    title: 'Natural Terracotta Air-Purifying Snake Plant',
    caption:
      '🍃 Clean your indoor air naturally! Low-maintenance Sansevieria trifasciata in artisan baked terracotta clay pot. Thrives on neglect and produces oxygen throughout the night. Perfect gift for green living! 🪴',
    tags: ['#AirPurifier', '#SnakePlant', '#LowLight', '#Terracotta', '#GreenDecor'],
    price: 320,
    originalPrice: 400,
    productInfo:
      'Snake Plant (Laurentii). Height: 16 inches. Tolerates low light conditions. Baked terracotta pot with matching drainage dish included. 100% natural organic soil.',
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?w=800&auto=format&fit=crop&q=80',
    category: 'Indoor Plants',
    keywords: ['snake plant', 'sansevieria', 'terracotta pot', 'air purifying', 'indoor'],
    paymentMethods: ['bKash', 'Nagad', 'Rocket', 'COD'],
    sellerNumber: '01712-987654',
    deliveryInsideDhaka: 60,
    deliveryOutsideDhaka: 120,
    stock: 25,
    isPublic: true,
    createdAt: '1 day ago',
    likes: 35,
    isLiked: false,
    shares: 8,
  },
];

const INITIAL_PROFILE_PRODUCTS: ProfileProduct[] = [
  {
    id: 'prof-p1',
    name: 'Potted Snake Plant',
    price: 120,
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?w=400&auto=format&fit=crop&q=80',
    category: 'Plants',
    description: 'Hardy air-purifying indoor snake plant housed in an ivory ceramic pot. Thrives in low light.',
  },
  {
    id: 'prof-p2',
    name: 'Mini Succulent Collection',
    price: 200,
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&auto=format&fit=crop&q=80',
    category: 'Plants',
    description: 'Assorted set of three drought-tolerant miniature succulents in natural textured cement bowls.',
  },
  {
    id: 'prof-p3',
    name: 'Fern in Macrame Hanger',
    price: 500,
    image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400&auto=format&fit=crop&q=80',
    category: 'Decor',
    description: 'Vibrant Boston fern suspended in a 100% hand-knotted bohemian cotton macrame rope hanger.',
  },
  {
    id: 'prof-p4',
    name: 'Fern in Macrame Hanger',
    price: 300,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&auto=format&fit=crop&q=80',
    category: 'Decor',
    description: 'Indoor Monstera plant potted in minimalist white terracotta planter with water catchment dish.',
  },
  {
    id: 'prof-p5',
    name: 'Fern in Macrame Hanger',
    price: 100,
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&auto=format&fit=crop&q=80',
    category: 'Plants',
    description: 'Compact tabletop foliage plant in polished ceramic mug with organic slow-release compost.',
  },
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  onAddToCart,
  onOpenChat,
  onViewProduct,
  onProductPublished,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(1200);
  const [activeSubTab, setActiveSubTab] = useState<'Posts' | 'Home' | 'Products' | 'Videos' | 'Live' | 'Offers'>('Posts');
  const [coverUrl, setCoverUrl] = useState(
    'https://images.unsplash.com/photo-1545241047-6083a3684587?w=1600&auto=format&fit=crop&q=80'
  );
  const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // User Profile Data
  const userProfile = {
    name: 'Rifat Islam 123',
    uid: '0000129619',
    role: 'Verified Seller & Nursery Specialist',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    bio: 'Your trusted source for quality green plants & gardening tools. 🌱 Same-day shipping available in Dhaka. 🌿 Organic compost and terracotta pottery.',
  };

  // Posts State (persisted with fallback)
  const [posts, setPosts] = useState<ProductPostData[]>(() => {
    try {
      const saved = localStorage.getItem('greenshop_seller_posts');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_POSTS;
  });

  // Profile Products State
  const [profileProducts, setProfileProducts] = useState<ProfileProduct[]>(() => {
    try {
      const savedProds = localStorage.getItem('greenshop_seller_products');
      if (savedProds) {
        return JSON.parse(savedProds);
      }
    } catch {
      // fallback
    }
    return INITIAL_PROFILE_PRODUCTS;
  });

  // Active playing video id
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  // Post comments state
  const [postComments, setPostComments] = useState<{ [postId: string]: string[] }>({
    'post-1': [
      'Shahid: ভাইয়া মনস্টেরা গাছটার শিকড় কি হেলদি? ডেলিভারি কতদিন লাগবে?',
      'Rifat (Seller): জ্বী ভাইয়া একদম ফ্রেশ রুট সিস্টেম, ইনবক্সে মেসেজ দিন ২ দিনের মধ্যে পাবেন!',
    ],
  });
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});
  const [activeCommentSection, setActiveCommentSection] = useState<{ [postId: string]: boolean }>({});

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 2800);
  };

  const handleFollowToggle = () => {
    setIsFollowing((prev) => !prev);
    setFollowersCount((prev) => (isFollowing ? prev - 1 : prev + 1));
    showToast(!isFollowing ? 'You followed Rifat Islam 123' : 'Unfollowed');
  };

  const handleAddProduct = (item: ProfileProduct | ProductPostData) => {
    const isPost = 'caption' in item;
    const p: Product = {
      id: item.id,
      title: isPost ? (item as ProductPostData).title : (item as ProfileProduct).name,
      vendor: userProfile.name,
      vendorLogo: userProfile.avatar,
      price: item.price,
      originalPrice: (item as ProductPostData).originalPrice,
      rating: 5,
      reviewsCount: 48,
      category: 'Home & Garden',
      image: item.image,
      description: isPost
        ? `${(item as ProductPostData).caption}\n\n${(item as ProductPostData).productInfo}`
        : (item as ProfileProduct).description,
      stock: (item as ProductPostData).stock || 25,
      isOrganic: true,
      isHandmade: true,
    };
    onAddToCart(p);
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    showToast(`Added "${p.title}" to cart! 🛒`);
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  const handleViewItem = (item: ProfileProduct | ProductPostData) => {
    if (onViewProduct) {
      const isPost = 'caption' in item;
      onViewProduct({
        id: item.id,
        title: isPost ? (item as ProductPostData).title : (item as ProfileProduct).name,
        vendor: userProfile.name,
        vendorLogo: userProfile.avatar,
        price: item.price,
        originalPrice: (item as ProductPostData).originalPrice,
        rating: 5,
        reviewsCount: 48,
        category: 'Home & Garden',
        image: item.image,
        description: isPost
          ? `${(item as ProductPostData).caption}\n\n${(item as ProductPostData).productInfo}`
          : (item as ProfileProduct).description,
        stock: (item as ProductPostData).stock || 25,
        isOrganic: true,
        isHandmade: true,
        videoUrl: isPost ? (item as ProductPostData).videoUrl : undefined,
      });
    }
  };

  // Like interaction
  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  // Share post
  const handleSharePost = (post: ProductPostData) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Check out "${post.title}" by ${userProfile.name} on GreenShop! Price: ৳${post.price}`
      );
      showToast('Post link copied to clipboard! 📋');
    } else {
      showToast('Post shared! 🌿');
    }
  };

  // Delete post
  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to remove this product post?')) {
      const updated = posts.filter((p) => p.id !== postId);
      setPosts(updated);
      try {
        localStorage.setItem('greenshop_seller_posts', JSON.stringify(updated));
      } catch {
        // ignore
      }
      showToast('Product post deleted');
    }
  };

  // Add Comment
  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    const current = postComments[postId] || [];
    const updated = [...current, `You: ${text}`];
    setPostComments({ ...postComments, [postId]: updated });
    setCommentInputs({ ...commentInputs, [postId]: '' });
    showToast('Comment posted! 💬');
  };

  // Submit New Post from Modal
  const handlePostSubmit = (newPost: ProductPostData, createdProduct: Product) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    try {
      localStorage.setItem('greenshop_seller_posts', JSON.stringify(updatedPosts));
    } catch {
      // ignore
    }

    // Also add to profile products list
    const newProfileProd: ProfileProduct = {
      id: createdProduct.id,
      name: createdProduct.title,
      price: createdProduct.price,
      originalPrice: createdProduct.originalPrice,
      image: createdProduct.image,
      category: createdProduct.category,
      description: createdProduct.description,
    };
    const updatedProfileProds = [newProfileProd, ...profileProducts];
    setProfileProducts(updatedProfileProds);
    try {
      localStorage.setItem('greenshop_seller_products', JSON.stringify(updatedProfileProds));
    } catch {
      // ignore
    }

    // Call optional callback to propagate to global app
    if (onProductPublished) {
      onProductPublished(createdProduct);
    }

    setActiveSubTab('Posts');
    showToast('🎉 Product post published successfully! Now live on marketplace & profile.');
  };

  const subTabs = [
    { name: 'Posts', icon: FileText, count: posts.length },
    { name: 'Home', icon: Sparkles },
    { name: 'Products', icon: Tag, count: profileProducts.length },
    { name: 'Videos', icon: Video },
    { name: 'Live', icon: Radio },
    { name: 'Offers', icon: Heart },
  ] as const;

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white px-5 py-2.5 rounded-2xl shadow-2xl border border-neutral-700 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Profile Card Container */}
      <div className="bg-white text-neutral-900 rounded-3xl shadow-xl border border-neutral-200/80 overflow-hidden">
        {/* Cover Image Section */}
        <div className="relative w-full h-56 sm:h-72 bg-neutral-100 overflow-hidden">
          <img
            src={coverUrl}
            alt="Profile Cover"
            className="w-full h-full object-cover"
          />
          {/* Change Cover Button */}
          <button
            onClick={() => {
              setCoverUrl((cur) =>
                cur.includes('1545241047')
                  ? 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1600&auto=format&fit=crop&q=80'
                  : 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=1600&auto=format&fit=crop&q=80'
              );
              showToast('Cover photo updated! 🌿');
            }}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white text-xs font-medium backdrop-blur-xs transition-colors shadow-md cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Change Cover</span>
          </button>
        </div>

        {/* Profile Info Header */}
        <div className="px-5 sm:px-8 pt-3 pb-5 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            {/* Avatar + Name + Badges */}
            <div className="flex items-start gap-4 -mt-16 sm:-mt-20">
              {/* Circular Avatar */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1 shadow-lg ring-4 ring-white overflow-hidden">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-full h-full rounded-full object-cover bg-emerald-100"
                  />
                </div>
                {/* Verified badge */}
                <div className="mt-1 flex items-center justify-center gap-1 text-[11px] font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 fill-sky-100" />
                  <span>Verified</span>
                </div>
              </div>

              {/* Text Info */}
              <div className="pt-1 sm:pt-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                    {userProfile.name}
                  </h1>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Seller
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">
                  UID: {userProfile.uid}
                </p>

                {/* Follower Stats Row */}
                <div className="flex items-center gap-3 mt-1.5 text-xs text-neutral-600 flex-wrap">
                  <span className="flex items-center gap-1 font-medium text-neutral-700">
                    <Users className="w-3.5 h-3.5 text-neutral-500" />
                    Customer:
                  </span>
                  <span className="font-bold text-neutral-900">
                    {(followersCount / 1000).toFixed(1)}K Followers
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    {posts.length} Active Posts
                  </span>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-neutral-700 mt-2 max-w-xl leading-relaxed">
                  {userProfile.bio}
                </p>
              </div>
            </div>

            {/* Right Action Buttons: Follow and Message */}
            <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
              <button
                id="profile-follow-btn"
                onClick={handleFollowToggle}
                className={`py-2 px-4 sm:px-5 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
                  isFollowing
                    ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-300'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-900 shadow-sm'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>

              <button
                id="profile-message-btn"
                onClick={onOpenChat}
                className="py-2 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 flex items-center justify-center gap-1.5 border border-neutral-300/80 transition-colors shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Message</span>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* SELLER POST CREATOR BAR (What are you selling today? / Post Section) */}
        {/* ============================================================== */}
        <div className="mx-5 sm:mx-8 mb-5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-50/70 via-white to-neutral-50 border border-emerald-100 shadow-xs">
          <div className="flex items-center gap-3">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500 shrink-0"
            />
            {/* Clickable fake input to open form modal */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-neutral-300/80 hover:border-emerald-500 text-left text-xs sm:text-sm text-neutral-500 hover:text-neutral-700 transition-all shadow-xs flex items-center justify-between group cursor-pointer"
            >
              <span className="truncate">
                Rifat, sell a plant or product today... (নতুন প্রোডাক্ট পোস্ট করুন)
              </span>
              <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 shrink-0">
                <span>Open Form</span>
                <span>→</span>
              </span>
            </button>
          </div>

          {/* Quick Action Badges beneath composer */}
          <div className="mt-3 pt-2.5 border-t border-neutral-200/70 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-1.5 text-neutral-600 hover:text-emerald-700 font-medium py-1 px-2 rounded-lg hover:bg-white transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>Photos</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-1.5 text-neutral-600 hover:text-emerald-700 font-medium py-1 px-2 rounded-lg hover:bg-white transition-colors"
              >
                <Video className="w-3.5 h-3.5 text-purple-600" />
                <span>Video Clip</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-1.5 text-neutral-600 hover:text-emerald-700 font-medium py-1 px-2 rounded-lg hover:bg-white transition-colors"
              >
                <Tag className="w-3.5 h-3.5 text-amber-600" />
                <span>Tags & Price</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-1.5 text-neutral-600 hover:text-emerald-700 font-medium py-1 px-2 rounded-lg hover:bg-white transition-colors"
              >
                <CreditCard className="w-3.5 h-3.5 text-pink-600" />
                <span>bKash / COD</span>
              </button>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="ml-auto flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post Product</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Posts, Home, Products, Videos, Live, Offers) */}
        <div className="px-5 sm:px-8 border-b border-neutral-200 flex gap-6 sm:gap-8 overflow-x-auto scrollbar-none">
          {subTabs.map((tab) => {
            const isActive = activeSubTab === tab.name;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveSubTab(tab.name as any)}
                className={`pb-3 text-sm font-semibold transition-colors relative whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'text-emerald-600'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{tab.name}</span>
                {'count' in tab && tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Section */}
        <div className="p-4 sm:p-6 bg-neutral-50/70">
          {/* ============================================================== */}
          {/* POSTS TAB (User Requested Post Section with Form & Product Post Details) */}
          {/* ============================================================== */}
          {activeSubTab === 'Posts' ? (
            <div className="space-y-6">
              {/* Top Action Bar in Posts Feed */}
              <div className="flex items-center justify-between pb-2">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                    <span>Seller Product Posts</span>
                    <span className="text-xs font-normal text-neutral-500">
                      ({posts.length} published)
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Live seller announcements, product videos, pricing & direct checkout
                  </p>
                </div>

                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>+ New Post</span>
                </button>
              </div>

              {/* Feed of Posts */}
              {posts.map((post) => {
                const isJustAdded = addedItems[post.id];
                const comments = postComments[post.id] || [];
                const isCommentOpen = activeCommentSection[post.id];
                const isVideoPlaying = playingVideoId === post.id;

                return (
                  <div
                    key={post.id}
                    id={`profile-post-card-${post.id}`}
                    className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    {/* Post Header */}
                    <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={userProfile.avatar}
                          alt={userProfile.name}
                          className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/80"
                        />
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-sm font-bold text-neutral-900">
                              {userProfile.name}
                            </h4>
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 fill-sky-100" />
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Seller
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-neutral-400" />
                              {post.createdAt}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-emerald-600">
                              <Globe className="w-3 h-3" />
                              Public Market
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-neutral-400">
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          title="Delete this post"
                          aria-label="Delete post"
                          className="p-1.5 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Post Caption */}
                    <div className="px-4 sm:px-5 pb-3">
                      <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal whitespace-pre-line">
                        {post.caption}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md hover:bg-emerald-100 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Media Display: Video or Image */}
                    <div className="relative bg-neutral-950 overflow-hidden">
                      {post.videoUrl ? (
                        <div className="relative aspect-video max-h-96 w-full">
                          <video
                            id={`video-${post.id}`}
                            src={post.videoUrl}
                            controls={isVideoPlaying}
                            poster={post.image}
                            className="w-full h-full object-cover"
                            onPlay={() => setPlayingVideoId(post.id)}
                            onPause={() => setPlayingVideoId(null)}
                          />
                          {!isVideoPlaying && (
                            <button
                              onClick={() => {
                                const v = document.getElementById(
                                  `video-${post.id}`
                                ) as HTMLVideoElement;
                                if (v) {
                                  v.play();
                                  setPlayingVideoId(post.id);
                                }
                              }}
                              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group cursor-pointer"
                            >
                              <div className="w-14 h-14 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                <Play className="w-6 h-6 fill-white ml-0.5" />
                              </div>
                              <span className="absolute bottom-3 left-3 bg-black/70 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg backdrop-blur-xs flex items-center gap-1.5">
                                <Video className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Product Video Available • Click to Play</span>
                              </span>
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="relative aspect-video max-h-96 w-full group overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                    </div>

                    {/* ============================================================== */}
                    {/* EMBEDDED PRODUCT DETAILS & PAYMENT SPECIFICATION BOX */}
                    {/* ============================================================== */}
                    <div className="p-4 sm:p-5 bg-gradient-to-b from-white to-neutral-50/90 border-t border-b border-neutral-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {/* Title, Category & Price */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                              {post.category}
                            </span>
                            {post.stock > 0 && (
                              <span className="text-[10px] font-bold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md">
                                In Stock: {post.stock} units
                              </span>
                            )}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                            {post.title}
                          </h3>

                          {/* Price Display in T.K. */}
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-lg sm:text-xl font-extrabold text-emerald-700">
                              {post.price} T.K.
                            </span>
                            {post.originalPrice && post.originalPrice > post.price && (
                              <>
                                <span className="text-xs text-neutral-400 line-through">
                                  {post.originalPrice} T.K.
                                </span>
                                <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                                  {Math.round(
                                    ((post.originalPrice - post.price) / post.originalPrice) * 100
                                  )}
                                  % OFF
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Order & Buy Now Buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleViewItem(post)}
                            className="px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl border border-neutral-300 transition-colors cursor-pointer"
                          >
                            Details
                          </button>

                          <button
                            onClick={() => handleAddProduct(post)}
                            className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer ${
                              isJustAdded
                                ? 'bg-emerald-600 text-white'
                                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-700/20'
                            }`}
                          >
                            {isJustAdded ? (
                              <>
                                <Check className="w-4 h-4 stroke-[3]" />
                                <span>Added ✓</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-4 h-4" />
                                <span>Buy Now (অর্ডার)</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Product Information specs */}
                      <p className="text-xs text-neutral-600 mt-2.5 pt-2.5 border-t border-neutral-200/80 leading-relaxed">
                        <strong className="text-neutral-800">Product Info: </strong>
                        {post.productInfo}
                      </p>

                      {/* Payment System & Delivery Specifications Bar */}
                      <div className="mt-3.5 p-3 rounded-2xl bg-neutral-100/90 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        {/* Payment Badges */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] font-bold text-neutral-700 flex items-center gap-1 mr-1">
                            <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                            Payment:
                          </span>
                          {post.paymentMethods.map((m) => (
                            <span
                              key={m}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                                m === 'bKash'
                                  ? 'bg-pink-50 text-pink-700 border-pink-200'
                                  : m === 'Nagad'
                                  ? 'bg-orange-50 text-orange-700 border-orange-200'
                                  : m === 'COD'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                              }`}
                            >
                              {m === 'COD' ? 'Cash on Delivery' : m}
                            </span>
                          ))}
                          {post.sellerNumber && (
                            <span className="text-[11px] text-neutral-500 font-mono">
                              ({post.sellerNumber})
                            </span>
                          )}
                        </div>

                        {/* Delivery Info */}
                        <div className="flex items-center gap-2 text-[11px] text-neutral-600 font-medium shrink-0">
                          <Truck className="w-3.5 h-3.5 text-neutral-500" />
                          <span>Dhaka: ৳{post.deliveryInsideDhaka}</span>
                          <span>•</span>
                          <span>Outside: ৳{post.deliveryOutsideDhaka}</span>
                        </div>
                      </div>

                      {/* Keywords display */}
                      {post.keywords && post.keywords.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-neutral-500 flex-wrap">
                          <span className="text-neutral-400 font-medium">Keywords:</span>
                          {post.keywords.map((kw) => (
                            <span
                              key={kw}
                              className="bg-neutral-200/70 text-neutral-600 px-2 py-0.2 rounded text-[10px]"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Post Social Interactions Bar */}
                    <div className="px-4 sm:px-5 py-3 flex items-center justify-between text-xs text-neutral-600">
                      <div className="flex items-center gap-4">
                        {/* Like Button */}
                        <button
                          onClick={() => handleLikePost(post.id)}
                          className={`flex items-center gap-1.5 font-semibold transition-colors cursor-pointer ${
                            post.isLiked ? 'text-rose-600' : 'hover:text-rose-600'
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              post.isLiked ? 'fill-rose-600 stroke-rose-600' : ''
                            }`}
                          />
                          <span>{post.likes}</span>
                        </button>

                        {/* Comment Button */}
                        <button
                          onClick={() =>
                            setActiveCommentSection({
                              ...activeCommentSection,
                              [post.id]: !isCommentOpen,
                            })
                          }
                          className="flex items-center gap-1.5 font-semibold hover:text-emerald-700 transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{comments.length} Comments</span>
                        </button>

                        {/* Share Button */}
                        <button
                          onClick={() => handleSharePost(post)}
                          className="flex items-center gap-1.5 font-semibold hover:text-emerald-700 transition-colors cursor-pointer"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </button>
                      </div>

                      <button
                        onClick={onOpenChat}
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat with Seller</span>
                      </button>
                    </div>

                    {/* Expandable Comments Section */}
                    {isCommentOpen && (
                      <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-neutral-100 bg-neutral-50/50">
                        {/* Comment list */}
                        <div className="space-y-2 mb-3">
                          {comments.map((cmt, idx) => (
                            <div
                              key={idx}
                              className="text-xs p-2 rounded-xl bg-white border border-neutral-200 text-neutral-800 leading-relaxed"
                            >
                              {cmt}
                            </div>
                          ))}
                        </div>

                        {/* Comment input */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={commentInputs[post.id] || ''}
                            onChange={(e) =>
                              setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleAddComment(post.id);
                              }
                            }}
                            placeholder="Write a comment or ask seller..."
                            className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-300 text-xs outline-none focus:border-emerald-500 bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddComment(post.id)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                          >
                            Comment
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : activeSubTab === 'Home' || activeSubTab === 'Products' ? (
            /* Vertical Product Cards List */
            <div className="space-y-3">
              {/* Quick post banner above products */}
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-emerald-900">
                    Seller Inventory: {profileProducts.length} Items Listed
                  </span>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Product</span>
                </button>
              </div>

              {profileProducts.map((item) => {
                const isJustAdded = addedItems[item.id];
                return (
                  <div
                    key={item.id}
                    id={`profile-item-${item.id}`}
                    className="bg-white rounded-2xl p-3 sm:p-4 border border-neutral-200/90 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3 group"
                  >
                    {/* Left: Thumbnail Image + Title & T.K. Price */}
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200/60">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-bold text-neutral-800 mt-1">
                          {item.price} T.K.
                        </p>
                        <p className="hidden sm:block text-[11px] text-neutral-500 truncate max-w-sm mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: View Details Button & Shopping Cart Icon Button */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleViewItem(item)}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl border border-neutral-300/80 transition-colors cursor-pointer"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => handleAddProduct(item)}
                        aria-label={`Add ${item.name} to cart`}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                          isJustAdded
                            ? 'bg-emerald-600 text-white'
                            : 'text-neutral-700 hover:text-emerald-700 hover:bg-emerald-50 border border-neutral-300/70'
                        }`}
                      >
                        {isJustAdded ? (
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <ShoppingCart className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : activeSubTab === 'Videos' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <div className="bg-white p-3 rounded-2xl border border-neutral-200 shadow-xs">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&auto=format&fit=crop&q=80"
                    alt="Video preview"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg">
                      ▶
                    </span>
                  </div>
                </div>
                <h4 className="text-xs font-bold text-neutral-900">How to Repot Snake Plants at Home</h4>
                <p className="text-[11px] text-neutral-500">4.2K views • 2 days ago</p>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-neutral-200 shadow-xs">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&auto=format&fit=crop&q=80"
                    alt="Video preview"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg">
                      ▶
                    </span>
                  </div>
                </div>
                <h4 className="text-xs font-bold text-neutral-900">Best Watering Routine for Succulents</h4>
                <p className="text-[11px] text-neutral-500">8.9K views • 1 week ago</p>
              </div>
            </div>
          ) : activeSubTab === 'Live' ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-neutral-200">
              <Radio className="w-10 h-10 text-emerald-600 mx-auto mb-2 animate-pulse" />
              <h3 className="text-sm font-bold text-neutral-900">Next Live Stream Scheduled</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1">
                Rifat Islam 123 will go live tomorrow at 8:00 PM displaying fresh terrace plants & discount coupons.
              </p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 text-center">
              <Heart className="w-8 h-8 text-rose-500 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-neutral-900">Special Garden Bundle Offer</h3>
              <p className="text-xs text-neutral-600 mt-1">
                Get free organic fertilizer on all orders above 600 T.K.!
              </p>
            </div>
          )}
        </div>

        {/* Footer row: About Us, Contact, Help Center */}
        <div className="py-4 px-6 border-t border-neutral-200 bg-white flex items-center justify-center gap-8 text-xs text-neutral-500 font-medium">
          <a href="#" className="hover:text-emerald-700 transition-colors">About Us</a>
          <a href="#" className="hover:text-emerald-700 transition-colors">Contact</a>
          <a href="#" className="hover:text-emerald-700 transition-colors">Help Center</a>
        </div>
      </div>

      {/* CREATE PRODUCT POST MODAL */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handlePostSubmit}
        sellerName={userProfile.name}
        sellerAvatar={userProfile.avatar}
      />
    </div>
  );
};
