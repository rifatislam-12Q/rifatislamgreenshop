import React from 'react';
import { Star, Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  isInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewProduct,
  isInCart = false,
}) => {
  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onViewProduct(product)}
      className="group relative flex flex-col bg-[#1a1b20] hover:bg-[#202128] rounded-xl overflow-hidden border border-[#262730] hover:border-neutral-600/60 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#131316]">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />

        {/* Quick Add to Cart Button floating on image */}
        <button
          id={`quick-add-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          title={isInCart ? 'Added to Cart' : 'Add to Cart'}
          className={`absolute bottom-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center transition-all shadow-md ${
            isInCart
              ? 'bg-emerald-600 text-white'
              : 'bg-[#121215]/80 hover:bg-emerald-600 text-white backdrop-blur-xs border border-white/10'
          }`}
        >
          {isInCart ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>

        {/* Optional Tag: Organic / Handmade */}
        {product.isOrganic && (
          <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-[10px] font-medium backdrop-blur-xs">
            Organic
          </span>
        )}
        {product.isHandmade && (
          <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30 text-[10px] font-medium backdrop-blur-xs">
            Handmade
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-2.5 sm:p-3 flex flex-col justify-between flex-1">
        {/* Title */}
        <h3
          title={product.title}
          className="text-xs sm:text-sm font-medium text-neutral-100 truncate mb-1.5"
        >
          {product.title}
        </h3>

        {/* Vendor Info with circular logo */}
        <div className="flex items-center gap-1.5 mb-2">
          <img
            src={product.vendorLogo}
            alt={product.vendor}
            referrerPolicy="no-referrer"
            className="w-4 h-4 rounded-full object-cover ring-1 ring-emerald-500/40"
          />
          <span className="text-[11px] text-neutral-400 truncate">
            {product.vendor}
          </span>
        </div>

        {/* Price and Rating Row */}
        <div className="flex items-center justify-between mt-auto pt-1 border-t border-neutral-800/60">
          {/* Price with Bangladeshi Taka (৳) symbol */}
          <div className="flex items-baseline gap-1">
            <span className="text-emerald-400 font-bold text-xs sm:text-sm">
              ৳ {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-neutral-500 line-through">
                ৳{product.originalPrice}
              </span>
            )}
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < product.rating
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-neutral-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
