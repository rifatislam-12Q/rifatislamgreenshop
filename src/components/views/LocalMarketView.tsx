import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart,
  Star, 
  Check, 
  Sparkles,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../../types';

interface LocalMarketViewProps {
  onSelectCategory?: (category: string) => void;
  onAddToCart: (product: Product) => void;
}

interface MarketItem {
  id: string;
  name: string;
  subName: string;
  price: number;
  rating: number;
  image: string;
  description: string;
}

export const LocalMarketView: React.FC<LocalMarketViewProps> = ({ onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  // 8 Exact plant products displayed in the 2-column screenshot
  const marketPlants: MarketItem[] = [
    {
      id: 'lm-succelade',
      name: 'Succelade',
      subName: 'Succekreld',
      price: 120,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&auto=format&fit=crop&q=80',
      description: 'Compact rosette succulent potted in a smooth minimalist ceramic container.',
    },
    {
      id: 'lm-snake-meted',
      name: 'Snake Meted',
      subName: 'Plant Niame',
      price: 220,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?w=400&auto=format&fit=crop&q=80',
      description: 'Air-purifying Sansevieria trifasciata snake plant in pure white planter.',
    },
    {
      id: 'lm-yare-fernever',
      name: 'Yare Fernever',
      subName: 'Plant Plant',
      price: 120,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400&auto=format&fit=crop&q=80',
      description: 'Vibrant feathery Boston fern delivering rich indoor greenery.',
    },
    {
      id: 'lm-boncal-boncal',
      name: 'Boncal Boncal ...',
      subName: 'Bonzai',
      price: 300,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop&q=80',
      description: 'Sculpted miniature Bonsai tree in a traditional glazed ceramic tray.',
    },
    {
      id: 'lm-spider-prinfery',
      name: 'Spider Prinfery...',
      subName: 'Plant Piarle',
      price: 120,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&auto=format&fit=crop&q=80',
      description: 'Chlorophytum spider plant known for resilience and indoor oxygen release.',
    },
    {
      id: 'lm-calatahea-cala',
      name: 'Calatahea Cala...',
      subName: 'Plant Phea',
      price: 200,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&auto=format&fit=crop&q=80',
      description: 'Exotic prayer plant / Calathea with distinctive patterned leaves.',
    },
    {
      id: 'lm-aloe-aloe-joet',
      name: 'Aloe Aloe Joet...',
      subName: 'Aloe',
      price: 120,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400&auto=format&fit=crop&q=80',
      description: 'Medicinal fresh Aloe Vera potted with nutrient-rich organic soil.',
    },
    {
      id: 'lm-string-dream',
      name: 'String Dream ....',
      subName: 'Plant Plant',
      price: 200,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1604762524889-3e2fccbc95f8?w=400&auto=format&fit=crop&q=80',
      description: 'Cascading string-of-pearls succulent trailing from an artisan white pot.',
    },
  ];

  const handleBuy = (item: MarketItem) => {
    // Map to App Product model
    const product: Product = {
      id: item.id,
      title: item.name,
      vendor: 'GreenShop Local Market',
      vendorLogo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      price: item.price,
      originalPrice: Math.round(item.price * 1.3),
      rating: item.rating,
      reviewsCount: 142,
      category: 'Home & Garden',
      image: item.image,
      description: item.description,
      stock: 25,
      isOrganic: true,
      isHandmade: true,
    };

    onAddToCart(product);

    // Provide visual feedback on button & toast
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);

    setNotification(`${item.name} (${item.price} T.K.) কার্টে যুক্ত করা হয়েছে! 🌿`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const filteredItems = marketPlants.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f7f2] -m-4 sm:-m-6 p-3 sm:p-6 font-sans text-neutral-800 transition-colors">
      
      <div className="max-w-3xl mx-auto w-full">
        
        {/* ========================================================================= */}
        {/* 1. TOP HEADER (ONLY SEARCH ICON) */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-end pb-3 mb-4 border-b border-emerald-950/10 min-h-[44px]">
          
          {/* Expandable Search Input (Opens only when Search Icon is clicked) */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, width: 0 }}
                animate={{ opacity: 1, scale: 1, width: '100%' }}
                exit={{ opacity: 0, scale: 0.95, width: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full relative"
              >
                <div className="flex items-center bg-[#eaece6] hover:bg-[#e2e7dd] transition-colors rounded-full px-3.5 py-1.5 border border-emerald-600/30 shadow-xs">
                  <Search className="w-4 h-4 text-emerald-700 mr-2 flex-shrink-0" />
                  <input 
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search any product..."
                    className="w-full bg-transparent text-xs sm:text-sm text-neutral-800 placeholder-neutral-500 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="p-1 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                      title="Clear"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-1 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-300/50 transition-colors ml-1 cursor-pointer"
                    title="Close Search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Icon Button - Visible when search is not open */}
          {!isSearchOpen && (
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-emerald-100/60 rounded-full transition-all cursor-pointer text-[#164332] active:scale-95"
              title="Search Products"
              aria-label="Open Search"
            >
              <Search className="w-5 h-5 stroke-[2]" />
            </button>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 3. 2-COLUMN PRODUCT CARDS GRID (Matches exact screenshot structure) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {filteredItems.map((item, idx) => {
            const isAdded = !!addedItemIds[item.id];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Top Half: Image Container on Left, Details & Buy Button on Right */}
                <div className="flex gap-3.5 items-start">
                  
                  {/* Plant Image Box with warm-neutral background as in screenshot */}
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-[#f2ede4] flex items-center justify-center p-2 flex-shrink-0 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Details Column */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-28 sm:h-32 py-0.5">
                    <div>
                      {/* Plant Title */}
                      <h3 className="text-sm sm:text-base font-semibold text-[#183b2e] leading-snug truncate">
                        {item.name}
                      </h3>

                      {/* Sub-label (e.g., "Plant Niame", "Succekreld") */}
                      <span className="text-[11px] text-neutral-400 block font-normal">
                        {item.subName}
                      </span>

                      {/* 5 Yellow Stars matching screenshot */}
                      <div className="flex items-center gap-0.5 mt-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-3 h-3 text-[#eab308] fill-[#eab308]" 
                          />
                        ))}
                      </div>
                    </div>

                    {/* Dark Forest Green "Buy" Button with Cart Icon */}
                    <button
                      onClick={() => handleBuy(item)}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 ${
                        isAdded 
                          ? 'bg-emerald-700 text-white' 
                          : 'bg-[#1b5842] hover:bg-[#154634] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Buy</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>

                {/* Bottom Row: Price tag (e.g. "120 T.K.", "220 T.K.") */}
                <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-sm sm:text-base font-bold text-[#18533e] tracking-tight">
                    {item.price} T.K.
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Local Nursery
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Empty Search Fallback */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200 mt-4">
            <p className="text-neutral-500 text-sm">কোনো গাছ খুঁজে পাওয়া যায়নি "{searchQuery}" এর জন্য।</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-2 text-xs font-bold text-emerald-700 underline"
            >
              সব গাছ দেখুন
            </button>
          </div>
        )}

      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#18533e] text-white text-xs font-semibold shadow-xl border border-emerald-400/40 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
