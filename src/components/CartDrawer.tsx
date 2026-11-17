import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Tag,
  Truck,
  CreditCard,
  Smartphone,
  FileText,
  MapPin,
  User as UserIcon,
  Phone,
  Building,
  Home,
  AlertCircle,
} from 'lucide-react';
import { CartItem, CurrentUser, InvoiceData, PaymentMethodType } from '../types';
import {
  BD_DIVISIONS,
  FREE_DELIVERY_THRESHOLD,
  MERCHANT_WALLET_NUMBER,
  calculatePromo,
  saveOrderToTracking,
} from '../utils/checkout';
import { InvoiceModal } from './InvoiceModal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckoutSuccess?: (orderId: string, total: number, itemCount: number) => void;
  currentUser?: CurrentUser | null;
  onOpenTracking?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckoutSuccess,
  currentUser = null,
  onOpenTracking,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [deliveryArea, setDeliveryArea] = useState<'dhaka' | 'outside'>('dhaka');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('cash_on_delivery');
  const [trxId, setTrxId] = useState('');
  const [formError, setFormError] = useState('');

  const [shipping, setShipping] = useState({
    fullName: '',
    phone: '',
    division: BD_DIVISIONS[0],
    district: '',
    thana: '',
    union: '',
    village: '',
  });

  const [confirmedInvoice, setConfirmedInvoice] = useState<InvoiceData | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // Sync default customer name/phone when drawer opens
  useEffect(() => {
    if (isOpen && currentUser?.isLoggedIn) {
      setShipping((prev) => ({
        ...prev,
        fullName: prev.fullName || currentUser.name,
        phone:
          prev.phone ||
          (/^01\d{8,9}$/.test(currentUser.phoneOrEmail.replace(/\s+/g, ''))
            ? currentUser.phoneOrEmail
            : ''),
      }));
    }
  }, [isOpen, currentUser]);

  // Reset step when closed after confirmation
  const handleCloseDrawer = () => {
    if (step === 'confirmed') {
      setStep('cart');
      setConfirmedInvoice(null);
      setAppliedPromo('');
      setPromoInput('');
      setPromoFeedback(null);
      setTrxId('');
    }
    setFormError('');
    onClose();
  };

  if (!isOpen && !showInvoiceModal) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const qualifiesFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const baseDelivery =
    items.length === 0 || qualifiesFreeDelivery ? 0 : deliveryArea === 'dhaka' ? 60 : 120;

  const promoResult = calculatePromo(appliedPromo, subtotal, baseDelivery);
  const discountAmount = promoResult.discount;
  const deliveryCharge = promoResult.delivery;
  const total = Math.max(0, subtotal - discountAmount + deliveryCharge);

  const handleApplyPromo = (codeOverride?: string) => {
    const targetCode = (codeOverride ?? promoInput).trim();
    if (!targetCode) {
      setAppliedPromo('');
      setPromoFeedback(null);
      return;
    }
    const res = calculatePromo(targetCode, subtotal, baseDelivery);
    if (res.valid) {
      setAppliedPromo(res.normalizedCode);
      setPromoInput(res.normalizedCode);
      setPromoFeedback({ ok: true, text: res.message });
    } else {
      setAppliedPromo('');
      setPromoFeedback({ ok: false, text: res.message });
    }
  };

  const handleDivisionChange = (div: string) => {
    setShipping((prev) => ({ ...prev, division: div }));
    setDeliveryArea(div.includes('Dhaka') ? 'dhaka' : 'outside');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (
      !shipping.fullName.trim() ||
      !shipping.phone.trim() ||
      !shipping.district.trim() ||
      !shipping.thana.trim() ||
      !shipping.village.trim()
    ) {
      setFormError('দয়া করে আপনার নাম, মোবাইল নম্বর, জেলা, থানা এবং গ্রামের ঠিকানা পূরণ করুন।');
      return;
    }

    if (paymentMethod !== 'cash_on_delivery' && trxId.trim().length < 5) {
      setFormError('অনলাইন পেমেন্ট নিশ্চিত করতে সঠিক Transaction ID (TrxID) লিখুন।');
      return;
    }

    const orderId = `GS-${Math.floor(100000 + Math.random() * 900000)}`;
    const fullAddress = `${shipping.village}, ${shipping.union ? shipping.union + ', ' : ''}${shipping.thana}, ${shipping.district}, ${shipping.division.split(' ')[0]}`;
    const itemCount = items.reduce((s, i) => s + i.quantity, 0);

    const invoice: InvoiceData = {
      orderNumber: orderId,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      customerName: shipping.fullName.trim(),
      phone: shipping.phone.trim(),
      address: fullAddress,
      paymentMethod,
      trxId: paymentMethod !== 'cash_on_delivery' ? trxId.trim().toUpperCase() : undefined,
      promoCode: appliedPromo || undefined,
      discountAmount,
      deliveryCharge,
      subtotal,
      totalAmount: total,
      items: items.map((i) => ({
        title: i.product.title,
        vendor: i.product.vendor,
        quantity: i.quantity,
        unitPrice: i.product.price,
      })),
    };

    const firstItem = items[0];
    saveOrderToTracking({
      id: `track-${Date.now()}`,
      orderNumber: orderId,
      productTitle:
        items.length > 1
          ? `${firstItem.product.title} (+${items.length - 1}টি আরও)`
          : firstItem.product.title,
      productImage: firstItem.product.image,
      vendor: firstItem.product.vendor,
      price: total,
      quantity: itemCount,
      recipient: shipping.fullName.trim(),
      phone: shipping.phone.trim(),
      address: fullAddress,
      paymentMethod,
      trxId: invoice.trxId,
      promoCode: invoice.promoCode,
      discountAmount,
      deliveryCharge,
      subtotal,
      items: invoice.items,
      stage: 1,
      stageLabel: 'Seller',
      currentLocationNote:
        paymentMethod === 'cash_on_delivery'
          ? 'অর্ডার গ্রহণ করা হয়েছে (ক্যাশ অন ডেলিভারি)। সেলার প্যাকেজিং শুরু করেছেন।'
          : `পেমেন্ট (${paymentMethod.toUpperCase()} · ${invoice.trxId}) ভেরিফাইড। সেলার প্যাকেজিং শুরু করেছেন।`,
      estimatedDelivery: deliveryArea === 'dhaka' ? '২৪-৪৮ ঘণ্টার মধ্যে' : '৪৮-৭২ ঘণ্টার মধ্যে',
      placedTime: 'এইমাত্র',
    });

    setConfirmedInvoice(invoice);
    setStep('confirmed');
    onCheckoutSuccess?.(orderId, total, itemCount);
    onClearCart();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={handleCloseDrawer}
            className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <div
              id="cart-drawer-panel"
              className="w-screen max-w-md bg-[#16171b] border-l border-[#282932] flex flex-col text-neutral-200 shadow-2xl"
            >
              {/* Header */}
              <div className="p-4 bg-[#1b1c22] border-b border-[#2a2b34] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {step === 'checkout' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setStep('cart');
                        setFormError('');
                      }}
                      className="p-1.5 rounded-lg bg-[#252630] hover:bg-emerald-600 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      title="কার্টে ফিরে যান"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-white leading-tight">
                      {step === 'cart'
                        ? 'আপনার শপিং কার্ট'
                        : step === 'checkout'
                        ? 'ঠিকানা ও পেমেন্ট'
                        : 'অর্ডার সম্পন্ন হয়েছে'}
                    </h2>
                    {step === 'cart' && (
                      <p className="text-[11px] text-neutral-400 tabular-nums">
                        {items.reduce((s, i) => s + i.quantity, 0)}টি আইটেম নির্বাচিত
                      </p>
                    )}
                  </div>
                </div>
                <button
                  id="close-cart-drawer-btn"
                  onClick={handleCloseDrawer}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#252630] transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* STEP 3: CONFIRMED SCREEN WITH INVOICE & TRACKING ACTIONS */}
              {step === 'confirmed' && confirmedInvoice ? (
                <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-white">
                      অভিনন্দন! অর্ডার নিশ্চিত হয়েছে
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      অর্ডার ট্র্যাকিং কোড:{' '}
                      <span className="font-mono font-bold text-emerald-400">
                        #{confirmedInvoice.orderNumber}
                      </span>
                    </p>
                  </div>

                  <div className="w-full p-3.5 rounded-xl bg-[#1e1f26] border border-[#2b2c36] text-left text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">গ্রাহক:</span>
                      <span className="font-semibold text-white">
                        {confirmedInvoice.customerName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">পেমেন্ট:</span>
                      <span className="font-semibold text-emerald-400">
                        {confirmedInvoice.paymentMethod === 'cash_on_delivery'
                          ? 'Cash on Delivery'
                          : `${confirmedInvoice.paymentMethod.toUpperCase()} (${confirmedInvoice.trxId})`}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1.5 border-t border-neutral-800">
                      <span className="text-neutral-400">সর্বমোট বিল:</span>
                      <span className="font-black text-emerald-400 tabular-nums">
                        ৳ {confirmedInvoice.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="w-full space-y-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowInvoiceModal(true)}
                      className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span>ডিজিটাল ইনভয়েস / ক্যাশ মেমো দেখুন</span>
                    </button>

                    {onOpenTracking && (
                      <button
                        type="button"
                        onClick={() => {
                          handleCloseDrawer();
                          onOpenTracking();
                        }}
                        className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <Truck className="w-4 h-4" />
                        <span>অর্ডার ট্র্যাক করুন</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleCloseDrawer}
                      className="w-full py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                      মার্কেটপ্লেসে ফিরে যান
                    </button>
                  </div>
                </div>
              ) : step === 'checkout' ? (
                /* STEP 2: FULL BANGLADESH SHIPPING & PAYMENT CHECKOUT */
                <form
                  onSubmit={handlePlaceOrder}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
                    {formError && (
                      <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{formError}</span>
                      </div>
                    )}

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[11px] font-bold text-neutral-300 mb-1 flex items-center gap-1">
                          <UserIcon className="w-3.5 h-3.5 text-emerald-400" />
                          <span>আপনার নাম *</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="যেমন: মোঃ সাব্বির আহমেদ"
                          value={shipping.fullName}
                          onChange={(e) =>
                            setShipping({ ...shipping, fullName: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-[#111216] border border-[#2b2d39] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-neutral-300 mb-1 flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <span>মোবাইল নম্বর *</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="017XXXXXXXX"
                          value={shipping.phone}
                          onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                          className="w-full px-3 py-2 bg-[#111216] border border-[#2b2d39] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Division & District */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[11px] font-bold text-neutral-300 mb-1 flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-emerald-400" />
                          <span>বিভাগ *</span>
                        </label>
                        <select
                          value={shipping.division}
                          onChange={(e) => handleDivisionChange(e.target.value)}
                          className="w-full px-3 py-2 bg-[#111216] border border-[#2b2d39] rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                        >
                          {BD_DIVISIONS.map((div) => (
                            <option key={div} value={div} className="bg-[#181920]">
                              {div}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-neutral-300 mb-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                          <span>জেলা *</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="যেমন: ঢাকা, সিলেট"
                          value={shipping.district}
                          onChange={(e) =>
                            setShipping({ ...shipping, district: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-[#111216] border border-[#2b2d39] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Thana & Union */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[11px] font-bold text-neutral-300 mb-1 block">
                          থানা / উপজেলা *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="যেমন: মিরপুর, সাভার"
                          value={shipping.thana}
                          onChange={(e) => setShipping({ ...shipping, thana: e.target.value })}
                          className="w-full px-3 py-2 bg-[#111216] border border-[#2b2d39] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-neutral-300 mb-1 block">
                          ইউনিয়ন / ওয়ার্ড
                        </label>
                        <input
                          type="text"
                          placeholder="ওয়ার্ড বা ইউনিয়ন"
                          value={shipping.union}
                          onChange={(e) => setShipping({ ...shipping, union: e.target.value })}
                          className="w-full px-3 py-2 bg-[#111216] border border-[#2b2d39] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Village / House */}
                    <div>
                      <label className="text-[11px] font-bold text-neutral-300 mb-1 flex items-center gap-1">
                        <Home className="w-3.5 h-3.5 text-emerald-400" />
                        <span>গ্রাম / মহল্লা / বাসা নং *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: বাড়ি ১২, রোড ৪, মিরপুর ১০"
                        value={shipping.village}
                        onChange={(e) => setShipping({ ...shipping, village: e.target.value })}
                        className="w-full px-3 py-2 bg-[#111216] border border-[#2b2d39] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    {/* Payment Method Selector */}
                    <div className="p-3 rounded-xl bg-[#111216] border border-[#2b2d39] space-y-2.5">
                      <span className="text-[11px] font-bold text-neutral-300 flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                        <span>পেমেন্ট মেথড নির্বাচন করুন:</span>
                      </span>

                      <div className="grid grid-cols-2 gap-2">
                        {(
                          [
                            { id: 'cash_on_delivery', label: 'Cash on Delivery', sub: 'হাতে পেয়ে টাকা' },
                            { id: 'bkash', label: 'bKash', sub: 'সেন্ড মানি / পেমেন্ট' },
                            { id: 'nagad', label: 'Nagad', sub: 'সেন্ড মানি / পেমেন্ট' },
                            { id: 'rocket', label: 'Rocket', sub: 'মোবাইল ব্যাংকিং' },
                          ] as { id: PaymentMethodType; label: string; sub: string }[]
                        ).map((pm) => (
                          <button
                            key={pm.id}
                            type="button"
                            onClick={() => setPaymentMethod(pm.id)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              paymentMethod === pm.id
                                ? 'bg-emerald-600/20 border-emerald-500 text-white'
                                : 'bg-[#1a1b22] border-[#292b36] text-neutral-400 hover:text-neutral-200'
                            }`}
                          >
                            <span className="text-xs font-bold block">{pm.label}</span>
                            <span className="text-[10px] opacity-80">{pm.sub}</span>
                          </button>
                        ))}
                      </div>

                      {paymentMethod !== 'cash_on_delivery' && (
                        <div className="p-2.5 rounded-xl bg-[#191a22] border border-emerald-500/30 space-y-2">
                          <p className="text-[11px] text-neutral-300 leading-relaxed">
                            আমাদের মার্চেন্ট/পার্সোনাল{' '}
                            <strong className="text-emerald-400 uppercase">{paymentMethod}</strong>{' '}
                            নম্বরে{' '}
                            <strong className="text-white tabular-nums">
                              ৳{total.toLocaleString()}
                            </strong>{' '}
                            সেন্ড মানি করুন:{' '}
                            <span className="font-mono font-bold text-emerald-300 select-all">
                              {MERCHANT_WALLET_NUMBER}
                            </span>
                          </p>
                          <div className="flex items-center gap-2">
                            <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                            <input
                              type="text"
                              required
                              placeholder="Transaction ID লিখুন (যেমন: 9K7A2B1C)"
                              value={trxId}
                              onChange={(e) => setTrxId(e.target.value)}
                              className="w-full px-3 py-1.5 bg-[#111216] border border-[#2f3240] rounded-lg text-xs text-white font-mono placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Checkout Submit Footer */}
                  <div className="p-4 bg-[#1b1c22] border-t border-[#2a2b34] space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">পরিশোধযোগ্য মোট মূল্য:</span>
                      <span className="text-base font-black text-emerald-400 tabular-nums">
                        ৳ {total.toLocaleString()}
                      </span>
                    </div>
                    <button
                      id="checkout-confirm-btn"
                      type="submit"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>অর্ডার কনফার্ম করুন (৳ {total.toLocaleString()})</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* STEP 1: CART ITEMS + PROMO CODE + DELIVERY BAR */
                <>
                  {/* Free delivery progress strip */}
                  {items.length > 0 && (
                    <div className="px-4 py-2.5 bg-[#121318] border-b border-[#252630] text-[11px]">
                      {qualifiesFreeDelivery ? (
                        <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 shrink-0" />
                          <span>অভিনন্দন! আপনার অর্ডারে ফ্রি ডেলিভারি চালু হয়েছে।</span>
                        </p>
                      ) : (
                        <div className="space-y-1.5">
                          <p className="text-neutral-300 flex items-center justify-between">
                            <span>
                              আর{' '}
                              <strong className="text-emerald-400 tabular-nums">
                                ৳{(FREE_DELIVERY_THRESHOLD - subtotal).toLocaleString()}
                              </strong>{' '}
                              যোগ করলে ফ্রি ডেলিভারি
                            </span>
                            <span className="text-neutral-500 tabular-nums">
                              {Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100))}%
                            </span>
                          </p>
                          <div className="w-full h-1.5 rounded-full bg-[#242632] overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 transition-all duration-300"
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100)
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Items List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {items.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
                        <ShoppingBag className="w-12 h-12 text-neutral-600 mb-3" />
                        <p className="text-sm font-medium text-neutral-300">
                          আপনার কার্ট এখন খালি
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">
                          অর্গানিক চা, মধু ও হ্যান্ডমেড পণ্য কার্টে যোগ করুন।
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
                            <p className="text-xs font-bold text-emerald-400 mt-1 tabular-nums">
                              ৳ {item.product.price.toLocaleString()}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1.5 bg-[#141418] px-2 py-1 rounded-lg border border-neutral-700/50">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="text-neutral-400 hover:text-white p-0.5 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-medium text-white px-1 tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="text-neutral-400 hover:text-white p-0.5 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-neutral-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                            title="আইটেম সরান"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Delivery, Promo & Summary Footer */}
                  {items.length > 0 && (
                    <div className="p-4 bg-[#1b1c22] border-t border-[#2a2b34] space-y-3">
                      {/* Promo Code Box */}
                      <div className="bg-[#141519] p-2.5 rounded-xl border border-[#272832] space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-medium text-neutral-300 flex items-center gap-1">
                            <Tag className="w-3 h-3 text-emerald-400" />
                            <span>কুপন / প্রোমো কোড</span>
                          </span>
                          <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                            <button
                              type="button"
                              onClick={() => handleApplyPromo('GREEN10')}
                              className="text-emerald-400 hover:underline cursor-pointer"
                            >
                              GREEN10
                            </button>
                            <button
                              type="button"
                              onClick={() => handleApplyPromo('WELCOME50')}
                              className="text-emerald-400 hover:underline cursor-pointer"
                            >
                              WELCOME50
                            </button>
                          </div>
                        </div>

                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            placeholder="কোড লিখুন (যেমন: GREEN10)"
                            className="flex-1 px-2.5 py-1.5 bg-[#1b1c23] border border-[#2b2d39] rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 uppercase font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => handleApplyPromo()}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-colors"
                          >
                            প্রয়োগ
                          </button>
                        </div>

                        {promoFeedback && (
                          <p
                            className={`text-[11px] ${
                              promoFeedback.ok ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {promoFeedback.text}
                          </p>
                        )}
                      </div>

                      {/* Delivery Location Selector */}
                      <div className="bg-[#141519] p-2.5 rounded-xl border border-[#272832]">
                        <span className="text-[11px] font-medium text-neutral-400 block mb-1.5">
                          ডেলিভারি এলাকা (বাংলাদেশ)
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => setDeliveryArea('dhaka')}
                            className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-all cursor-pointer ${
                              deliveryArea === 'dhaka'
                                ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/50'
                                : 'bg-[#1e1f26] text-neutral-400 border-transparent hover:text-neutral-200'
                            }`}
                          >
                            ঢাকার ভেতরে ({qualifiesFreeDelivery ? 'ফ্রি' : '৳৬০'})
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeliveryArea('outside')}
                            className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-all cursor-pointer ${
                              deliveryArea === 'outside'
                                ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/50'
                                : 'bg-[#1e1f26] text-neutral-400 border-transparent hover:text-neutral-200'
                            }`}
                          >
                            ঢাকার বাইরে ({qualifiesFreeDelivery ? 'ফ্রি' : '৳১২০'})
                          </button>
                        </div>
                      </div>

                      {/* Pricing Breakdown */}
                      <div className="space-y-1 text-xs text-neutral-400">
                        <div className="flex justify-between">
                          <span>সাব-টোটাল</span>
                          <span className="text-neutral-200 font-medium tabular-nums">
                            ৳ {subtotal.toLocaleString()}
                          </span>
                        </div>
                        {discountAmount > 0 && (
                          <div className="flex justify-between text-emerald-400">
                            <span>প্রোমো ছাড় ({appliedPromo})</span>
                            <span className="font-semibold tabular-nums">
                              - ৳ {discountAmount.toLocaleString()}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>ডেলিভারি চার্জ</span>
                          <span className="text-neutral-200 font-medium tabular-nums">
                            {deliveryCharge === 0 ? 'ফ্রি (৳ 0)' : `৳ ${deliveryCharge}`}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-white pt-1.5 border-t border-neutral-800">
                          <span>সর্বমোট বিল</span>
                          <span className="text-emerald-400 tabular-nums">
                            ৳ {total.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Payment Methods Info */}
                      <div className="flex items-center justify-between text-[11px] text-neutral-400">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          Cash on Delivery / bKash / Nagad / Rocket
                        </span>
                      </div>

                      {/* Proceed Button */}
                      <button
                        id="proceed-to-checkout-btn"
                        type="button"
                        onClick={() => setStep('checkout')}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
                      >
                        <span>চেকআউটে যান (৳ {total.toLocaleString()})</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Printable Invoice Modal */}
      {showInvoiceModal && (
        <InvoiceModal
          invoice={confirmedInvoice}
          onClose={() => setShowInvoiceModal(false)}
        />
      )}
    </>
  );
};
