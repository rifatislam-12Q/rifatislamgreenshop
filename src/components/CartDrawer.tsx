import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckoutSuccess?: (orderId: string, total: number, itemCount: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckoutSuccess,
}) => {
  const [deliveryArea, setDeliveryArea] = useState<'dhaka' | 'outside'>('dhaka');
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const deliveryCharge = items.length === 0 ? 0 : deliveryArea === 'dhaka' ? 60 : 120;
  const total = subtotal + deliveryCharge;

  const handleCheckout = () => {
    const orderId = `GS-${Math.floor(1000 + Math.random() * 9000)}`;
    setIsOrdered(true);
    if (onCheckoutSuccess) {
      onCheckoutSuccess(orderId, total, items.length);
    }
    setTimeout(() => {
      onClearCart();
      setIsOrdered(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          id="cart-drawer-panel"
          className="w-screen max-w-md bg-[#16171b] border-l border-[#282932] flex flex-col text-neutral-200 shadow-2xl"
        >
          {/* Header */}
          <div className="p-4 bg-[#1b1c22] border-b border-[#2a2b34] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-white">Your Shopping Cart</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#252630] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success screen after order placement */}
          {isOrdered ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Order Placed Successfully!
              </h3>
              <p className="text-xs text-neutral-400 max-w-xs mb-3">
                ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে। অর্ডার ট্র্যাকিং কোড: #GS-
                {Math.floor(100000 + Math.random() * 900000)}
              </p>
              <p className="text-xs text-emerald-400 font-medium">
                Our team is preparing your organic and handmade package.
              </p>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
                    <ShoppingBag className="w-12 h-12 text-neutral-600 mb-3" />
                    <p className="text-sm font-medium text-neutral-300">
                      Your cart is empty
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Browse organic green teas and handmade potteries to add items.
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3 bg-[#1e1f26] rounded-xl border border-[#2b2c36] flex gap-3 items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-lg object-cover bg-neutral-800 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-white truncate">
                          {item.product.title}
                        </h4>
                        <p className="text-[11px] text-neutral-400 truncate">
                          {item.product.vendor}
                        </p>
                        <p className="text-xs font-bold text-emerald-400 mt-1">
                          ৳ {item.product.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-[#141418] px-2 py-1 rounded-lg border border-neutral-700/50">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="text-neutral-400 hover:text-white p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-medium text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="text-neutral-400 hover:text-white p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Delivery & Summary Footer */}
              {items.length > 0 && (
                <div className="p-4 bg-[#1b1c22] border-t border-[#2a2b34] space-y-3">
                  {/* Delivery Location Selector */}
                  <div className="bg-[#141519] p-2.5 rounded-xl border border-[#272832]">
                    <span className="text-[11px] font-medium text-neutral-400 block mb-1.5">
                      Delivery Location (বাংলাদেশ)
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => setDeliveryArea('dhaka')}
                        className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-all ${
                          deliveryArea === 'dhaka'
                            ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/50'
                            : 'bg-[#1e1f26] text-neutral-400 border-transparent hover:text-neutral-200'
                        }`}
                      >
                        Inside Dhaka (৳60)
                      </button>
                      <button
                        onClick={() => setDeliveryArea('outside')}
                        className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-all ${
                          deliveryArea === 'outside'
                            ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/50'
                            : 'bg-[#1e1f26] text-neutral-400 border-transparent hover:text-neutral-200'
                        }`}
                      >
                        Outside Dhaka (৳120)
                      </button>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-neutral-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-neutral-200 font-medium">৳ {subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className="text-neutral-200 font-medium">৳ {deliveryCharge}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                      <span>Total Amount</span>
                      <span className="text-emerald-400">৳ {total}</span>
                    </div>
                  </div>

                  {/* Payment Methods Info */}
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Safe Cash on Delivery / বিকাশ
                    </span>
                    <span className="text-[10px] text-neutral-500">100% Genuine</span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    id="checkout-confirm-btn"
                    onClick={handleCheckout}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all active:scale-98"
                  >
                    <span>Proceed to Checkout (৳ {total})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
