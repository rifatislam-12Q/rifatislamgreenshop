import React from 'react';
import { Star, Plus, Check, Heart, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  onQuickBuy?: (product: Product) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
  isInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewProduct,
  onQuickBuy,
  isFavorite = false,
  onToggleFavorite,
  isInCart = false,
}) => {
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onViewProduct(product)}
      className="group relative flex flex-col bg-[#181920] hover:bg-[#1e1f28] rounded-2xl overflow-hidden border border-[#272834] hover:border-emerald-500/50 transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl hover:shadow-emerald-950/20"
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#121216]">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top Badges (Organic / Handmade / Discount) */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black shadow-md tracking-wider">
              -{discountPercent}%
            </span>
          )}
          {product.isOrganic && (
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold backdrop-blur-xs">
              🌿 Organic
            </span>
          )}
          {product.isHandmade && (
            <span className="px-1.5 py-0.5 rounded-md bg-amber-950/90 text-amber-300 border border-amber-500/40 text-[9px] font-bold backdrop-blur-xs">
              🏺 Handmade
            </span>
          )}
        </div>

        {/* Top Right: Favorite / Wishlist Heart Button */}
        {onToggleFavorite && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product.id);
            }}
            title={isFavorite ? 'পছন্দের তালিকা থেকে সরান' : 'পছন্দের তালিকায় রাখুন'}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 active:scale-90 z-10 border border-white/10 shadow-md cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite
                  ? 'fill-rose-500 text-rose-500 stroke-[2.5]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            />
          </button>
        )}

        {/* Quick Add Floating Button */}
        <button
          id={`quick-add-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          title={isInCart ? 'কার্টে যোগ করা হয়েছে' : 'কার্টে যোগ করুন'}
          className={`absolute bottom-2 right-2 w-8 h-8 rounded-xl flex items-center justify-center transition-all shadow-md z-10 cursor-pointer ${
            isInCart
              ? 'bg-emerald-600 text-white shadow-emerald-950/50'
              : 'bg-[#121215]/85 hover:bg-emerald-600 text-white backdrop-blur-xs border border-white/15'
          }`}
        >
          {isInCart ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
        </button>

        {/* Stock tag on bottom left */}
        {product.stock <= 5 && (
          <span className="absolute bottom-2 left-2 text-[9px] font-bold text-amber-300 bg-black/75 px-1.5 py-0.5 rounded backdrop-blur-xs border border-amber-500/30">
            মাত্র {product.stock}টি বাকি
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-2.5 sm:p-3 flex flex-col justify-between flex-1">
        {/* Title */}
        <h3
          title={product.title}
          className="text-xs sm:text-sm font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors truncate mb-1"
        >
          {product.title}
        </h3>

        {/* Vendor & Rating Row */}
        <div className="flex items-center justify-between gap-1 mb-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <img
              src={product.vendorLogo}
              alt={product.vendor}
              referrerPolicy="no-referrer"
              className="w-3.5 h-3.5 rounded-full object-cover ring-1 ring-emerald-500/40 shrink-0"
            />
            <span className="text-[10px] text-neutral-400 truncate">
              {product.vendor}
            </span>
          </div>

          <div className="flex items-center gap-0.5 shrink-0">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-bold text-amber-300 tabular-nums">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[9px] text-neutral-500">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80 mt-auto">
          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-emerald-400 font-black text-sm sm:text-base tabular-nums">
              ৳ {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-neutral-500 line-through tabular-nums">
                ৳{product.originalPrice}
              </span>
            )}
          </div>

          {/* Quick Buy Now Button */}
          {onQuickBuy && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickBuy(product);
              }}
              className="px-2 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-black text-[10px] font-bold transition-all border border-emerald-500/30 flex items-center gap-1 cursor-pointer"
              title="সরাসরি ক্যাশ অন ডেলিভারিতে অর্ডার করুন"
            >
              <Zap className="w-2.5 h-2.5" />
              <span>কিনুন</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
