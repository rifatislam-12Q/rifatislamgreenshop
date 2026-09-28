import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CategoryChips } from './components/CategoryChips';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { ChatModal } from './components/ChatModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AuthModal } from './components/AuthModal';
import { LiveBazarView } from './components/views/LiveBazarView';
import { TrackingView } from './components/views/TrackingView';
import { DashboardView } from './components/views/DashboardView';
import { LocalMarketView } from './components/views/LocalMarketView';
import { ProfileView } from './components/views/ProfileView';
import { NotificationsView } from './components/views/NotificationsView';
import { ChatView } from './components/views/ChatView';
import { ProductReelsView } from './components/views/ProductReelsView';
import { AdBoard } from './components/AdBoard';
import { INITIAL_PRODUCTS } from './data/products';
import { INITIAL_NOTIFICATIONS } from './data/notifications';
import { Product, CartItem, SidebarTab, AppNotification } from './types';
import { MessageSquare, Briefcase, Sparkles, Check, Phone, ArrowRight } from 'lucide-react';

export default function App() {
  // State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<SidebarTab>('home');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Initial cart with 3 items matching screenshot badge "3"
  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 1 },
    { product: INITIAL_PRODUCTS[1], quantity: 1 },
    { product: INITIAL_PRODUCTS[2], quantity: 1 },
  ]);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [selectedProductForChat, setSelectedProductForChat] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Garden', 'Health', 'Organic Food'];

  // Notifications state helpers
  const unreadNotificationCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    triggerToast('সকল নোটিফিকেশন পড়া হয়েছে হিসেবে চিহ্নিত করা হয়েছে');
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
    triggerToast('নোটিফিকেশন মুছে ফেলা হয়েছে');
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    triggerToast('সকল নোটিফিকেশন ক্লিয়ার করা হয়েছে');
  };

  const handleAddNotification = (
    notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'> & { timestamp?: string }
  ) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: notif.timestamp || 'এইমাত্র',
      read: false,
      ...notif,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    triggerToast(`🔔 নতুন নোটিফিকেশন: ${notif.title}`);
  };

  const handleAddTestNotification = (presetType?: string) => {
    const samplePresets: Record<string, Omit<AppNotification, 'id' | 'timestamp' | 'read'>> = {
      order: {
        type: 'order',
        title: '📦 নতুন অর্ডার প্লেস হয়েছে (#GS-9021)',
        message: 'কাস্টমার রহিম (মিরপুর, ঢাকা) ২টি অর্গানিক হানি জার অর্ডার করেছেন। মোট বিল: ৳ ১,১৫০।',
        linkTab: 'tracking',
        actionLabel: 'অর্ডার ট্র্যাক করুন',
        priority: 'high',
      },
      product: {
        type: 'product',
        title: '🌿 নতুন পণ্য মার্কেটপ্লেসে যুক্ত হয়েছে!',
        message: 'রংপুর গ্রিন নার্সারি "ন্যাচারাল বনসাই ফাইকাস" আপলোড করেছে। স্টক সীমিত!',
        linkTab: 'marketplace',
        actionLabel: 'মার্কেটপ্লেস দেখুন',
        priority: 'normal',
      },
      live: {
        type: 'live',
        title: '🔴 নতুন লাইভ বাজার শুরু হয়েছে!',
        message: 'সিলেট ব্লেন্ডস স্টোর সরাসরি শ্রীমঙ্গল চা বাগান থেকে লাইভ সেলিং শুরু করেছে। এখনই যুক্ত হোন!',
        linkTab: 'live-bazar',
        actionLabel: 'লাইভ দেখুন',
        priority: 'normal',
      },
      chat: {
        type: 'chat',
        title: '💬 সেলারের নতুন উত্তর এসেছে',
        message: 'গ্রিন নার্সারি সাপোর্ট: "আপনার বনসাই আজই বিশেষ প্যাকেজিংয়ে পাঠানো হবে।"',
        linkTab: 'chat',
        actionLabel: 'চ্যাট অপেন করুন',
        priority: 'normal',
      },
    };

    const chosenKey = presetType || (['order', 'product', 'live', 'chat'][Math.floor(Math.random() * 4)]);
    const preset = samplePresets[chosenKey] || samplePresets['order'];
    handleAddNotification(preset);
  };

  // Toast notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    triggerToast(`Added "${product.title}" to cart`);

    // Add notification to notification center
    const cartNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'order',
      title: `কার্টে আইটেম যুক্ত হয়েছে: ${product.title}`,
      message: `৳ ${product.price.toLocaleString()} মূল্যের "${product.title}" সফলভাবে আপনার কার্টে যুক্ত হয়েছে।`,
      timestamp: 'এইমাত্র',
      read: false,
      priority: 'normal',
    };
    setNotifications((prev) => [cartNotif, ...prev]);
  };

  const handleCheckoutSuccess = (orderId: string, total: number, itemCount: number) => {
    const orderNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'order',
      title: `অর্ডার নিশ্চিত হয়েছে! (#${orderId}) 🎉`,
      message: `আপনার মোট ৳ ${total.toLocaleString()} টাকার (${itemCount}টি আইটেম) অর্ডার সফলভাবে নিশ্চিত হয়েছে। পার্সেল ট্র্যাক করুন।`,
      timestamp: 'এইমাত্র',
      read: false,
      linkTab: 'tracking',
      actionLabel: 'ট্র্যাকিং দেখুন',
      priority: 'high',
    };
    setNotifications((prev) => [orderNotif, ...prev]);
    triggerToast(`অর্ডার #${orderId} সফলভাবে সম্পন্ন হয়েছে!`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Handle Chat with seller from product modal
  const handleChatWithSeller = (product: Product) => {
    setSelectedProductForChat(product);
    setActiveTab('chat');
  };

  // Sidebar tab click handler
  const handleSelectTab = (tab: SidebarTab) => {
    setActiveTab(tab);
  };

  // Filtered products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        product.category === selectedCategory ||
        (selectedCategory === 'Home & Garden' && product.isHandmade) ||
        (selectedCategory === 'Organic Food' && product.isOrganic);

      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const isDashboard = activeTab === 'dashboard';
  const isChat = activeTab === 'chat';
  const isTracking = activeTab === 'tracking';

  return (
    <div
      className={`min-h-screen ${
        isDashboard || isChat || isTracking
          ? 'bg-[#ebf3fa] text-neutral-900'
          : 'bg-[#111113] text-neutral-100'
      } flex flex-col font-sans selection:bg-emerald-500 selection:text-black transition-colors duration-200`}
    >
      {/* Top Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenChat={() => setActiveTab('chat')}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        unreadNotificationCount={unreadNotificationCount}
      />

      {/* Main Layout: Left Sidebar + Content Area */}
      <div className="flex-1 flex w-full max-w-[1920px] mx-auto">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          unreadChatCount={2}
          unreadNotificationCount={unreadNotificationCount}
        />

        {/* Center/Right Content Area */}
        <main
          className={`flex-1 ${
            isDashboard || isChat || isTracking
              ? 'p-0 overflow-y-auto bg-[#ebf3fa]'
              : 'px-3 sm:px-5 lg:px-6 py-4 overflow-y-auto'
          } max-w-full`}
        >
          {/* Main Content Router */}
          {activeTab === 'chat' ? (
            <ChatView
              onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              selectedProductForChat={selectedProductForChat}
              onAddToCart={handleAddToCart}
              onViewProduct={setSelectedProductForDetail}
            />
          ) : activeTab === 'video' ? (
            <ProductReelsView
              onAddToCart={handleAddToCart}
              onViewProduct={setSelectedProductForDetail}
            />
          ) : activeTab === 'home' || activeTab === 'marketplace' ? (
            <div>
              {/* Ad Board (Admin Controlled) in the gap between Header Search and Categories */}
              <AdBoard onSelectCategory={setSelectedCategory} />

              {/* Category Filter Chips */}
              <CategoryChips
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />

              {/* Product Grid Header info if searching */}
              {searchQuery && (
                <div className="mb-4 flex items-center justify-between text-xs text-neutral-400">
                  <span>
                    Showing results for <strong className="text-white">"{searchQuery}"</strong> ({filteredProducts.length} items found)
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-emerald-400 hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
              )}

              {/* 6-Column Grid matching the screenshot */}
              {filteredProducts.length > 0 ? (
                <div
                  id="products-grid-container"
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5"
                >
                  {filteredProducts.map((product) => {
                    const isInCart = cart.some((i) => i.product.id === product.id);
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        onViewProduct={setSelectedProductForDetail}
                        isInCart={isInCart}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="py-16 text-center text-neutral-400 bg-[#16171c] rounded-2xl border border-[#252630] p-8">
                  <p className="text-sm font-medium text-white mb-1">
                    No products found matching your search.
                  </p>
                  <p className="text-xs text-neutral-500 mb-4">
                    Try another category or search term like "Tea", "Pottery", or "Handmade".
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-[#252630] hover:bg-[#30323e] text-emerald-400 rounded-xl text-xs font-semibold"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          ) : activeTab === 'live-bazar' ? (
            <LiveBazarView
              onAddToCart={handleAddToCart}
              onOpenChat={() => setIsChatOpen(true)}
            />
          ) : activeTab === 'tracking' ? (
            <TrackingView onBackToOrders={() => setActiveTab('marketplace')} />
          ) : activeTab === 'dashboard' ? (
            <DashboardView />
          ) : activeTab === 'local-market' ? (
            <LocalMarketView
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setActiveTab('home');
              }}
              onAddToCart={handleAddToCart}
            />
          ) : activeTab === 'business-deal' ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">B2B Wholesale & Business Deals</h2>
                <p className="text-xs text-neutral-400">
                  Direct bulk supply of Sylhet organic whole tea and terracotta restaurant pottery at trade rates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#17181e] rounded-xl p-5 border border-[#282933] flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide">
                      Bulk Wholesale • 25kg+
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">Sylhet Garden Direct Tea Consignment</h3>
                    <p className="text-xs text-neutral-400 mt-2">
                      Supplying premium cafes, resorts, and eco-brands. Vacuum packed with laboratory test certificates and traceability.
                    </p>
                    <div className="mt-4 p-3 bg-[#121317] rounded-lg text-xs space-y-1">
                      <div className="flex justify-between text-neutral-300">
                        <span>Wholesale Rate:</span>
                        <span className="font-bold text-emerald-400">৳ 1,200 / kg</span>
                      </div>
                      <div className="flex justify-between text-neutral-400 text-[11px]">
                        <span>MOQ:</span>
                        <span>10 kg</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProductForChat(INITIAL_PRODUCTS[0]);
                      setActiveTab('chat');
                    }}
                    className="mt-4 w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire via B2B Chat</span>
                  </button>
                </div>

                <div className="bg-[#17181e] rounded-xl p-5 border border-[#282933] flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                      Artisan Contract • 100+ Pieces
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">Custom Embossed Terracotta Crockery</h3>
                    <p className="text-xs text-neutral-400 mt-2">
                      Custom brand stamp on artisanal clay tea sets, cups, and bowls for restaurants, corporate gifts, and export.
                    </p>
                    <div className="mt-4 p-3 bg-[#121317] rounded-lg text-xs space-y-1">
                      <div className="flex justify-between text-neutral-300">
                        <span>Unit Rate:</span>
                        <span className="font-bold text-amber-400">৳ 280 / set</span>
                      </div>
                      <div className="flex justify-between text-neutral-400 text-[11px]">
                        <span>MOQ:</span>
                        <span>50 sets</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProductForChat(INITIAL_PRODUCTS[1]);
                      setActiveTab('chat');
                    }}
                    className="mt-4 w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire via B2B Chat</span>
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === 'profile' ? (
            <ProfileView
              onAddToCart={handleAddToCart}
              onOpenChat={() => setActiveTab('chat')}
              onViewProduct={setSelectedProductForDetail}
              onProductPublished={(newProd) => {
                setProducts((prev) => [newProd, ...prev]);
                const publishNotif: AppNotification = {
                  id: `notif-${Date.now()}`,
                  type: 'product',
                  title: `নতুন প্রোডাক্ট পোস্ট: ${newProd.title} 🚀`,
                  message: `আপনার পোস্ট সফলভাবে পাবলিশ হয়েছে (৳ ${newProd.price})। এটি প্রোফাইল ও মার্কেটপ্লেসে লাইভ প্রদর্শিত হচ্ছে।`,
                  timestamp: 'এইমাত্র',
                  read: false,
                  linkTab: 'profile',
                  actionLabel: 'পোস্ট দেখুন',
                  priority: 'high',
                };
                setNotifications((prev) => [publishNotif, ...prev]);
                triggerToast(`🎉 "${newProd.title}" is now published on GreenShop!`);
              }}
            />
          ) : activeTab === 'notifications' ? (
            <NotificationsView
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onDeleteNotification={handleDeleteNotification}
              onClearAll={handleClearAllNotifications}
              onNavigateTab={(tab) => {
                handleSelectTab(tab);
              }}
              onAddTestNotification={handleAddTestNotification}
            />
          ) : null}
        </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#1b1c23] border border-emerald-500/50 text-white text-xs font-medium shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals and Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      <ChatModal
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setSelectedProductForChat(null);
        }}
        selectedProductForChat={selectedProductForChat}
      />

      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
        onChatWithSeller={handleChatWithSeller}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}
