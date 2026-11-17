import React, { useState, useEffect } from 'react';
import {
  Check,
  ChevronLeft,
  Package,
  MapPin,
  Clock,
  Truck,
  Building,
  Store,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Search,
  Plus,
  FileText,
  RotateCcw,
  X
} from 'lucide-react';
import { InvoiceData, PaymentMethodType } from '../../types';
import { InvoiceModal } from '../InvoiceModal';

export interface TrackedProductOrder {
  id: string;
  orderNumber: string;
  productTitle: string;
  productImage: string;
  vendor: string;
  price: number;
  quantity: number;
  recipient: string;
  phone?: string;
  address: string;
  paymentMethod?: PaymentMethodType;
  trxId?: string;
  promoCode?: string;
  discountAmount?: number;
  deliveryCharge?: number;
  subtotal?: number;
  items?: InvoiceData['items'];
  stage: 1 | 2 | 3 | 4 | 5;
  stageLabel: string;
  currentLocationNote: string;
  estimatedDelivery: string;
  placedTime: string;
}

interface ReturnRequestItem {
  ticketId: string;
  orderNumber: string;
  reason: string;
  refundMethod: string;
  accountNumber: string;
  notes: string;
  createdAt: string;
}

const DEFAULT_TRACKED_ORDERS: TrackedProductOrder[] = [
  {
    id: 'track-1',
    orderNumber: 'GS-894217',
    productTitle: 'Potted Monstera Deliciosa Plant',
    productImage: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500&auto=format&fit=crop&q=80',
    vendor: 'Rifat Shop',
    price: 650,
    quantity: 1,
    recipient: 'Ursports Skillhub',
    address: 'House 42, Road 9, Mirpur DOHS, Dhaka',
    stage: 3,
    stageLabel: 'In Transit (Rod)',
    currentLocationNote: 'গাড়িতে করে ঢাকা এক্সপ্রেসওয়ে দিয়ে মিরপুর ডেলিভারি সেন্টারের দিকে যাচ্ছে। কুরিয়ার: পাঠাও লজিস্টিকস।',
    estimatedDelivery: 'আজ বিকাল ৪:৩০ মিনিটে',
    placedTime: 'আজ সকাল ৯:১৫',
  },
  {
    id: 'track-2',
    orderNumber: 'GS-742190',
    productTitle: 'Organic Green Tea (Sylhet Direct)',
    productImage: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&auto=format&fit=crop&q=80',
    vendor: 'Riyad Shop',
    price: 450,
    quantity: 2,
    recipient: 'Ursports Skillhub',
    address: 'Mirpur 10, Dhaka',
    stage: 4,
    stageLabel: 'Office (Hub)',
    currentLocationNote: 'মিরপুর কেন্দ্রীয় সর্টিং হাবে পার্সেলটি রিসিভ করা হয়েছে। স্থানীয় রাইডারের কাছে হস্তান্তরের প্রস্তুতি চলছে।',
    estimatedDelivery: 'আগামীকাল সকাল ১১:০০ টায়',
    placedTime: 'গতকাল দুপুর ২:৩০',
  },
  {
    id: 'track-3',
    orderNumber: 'GS-631084',
    productTitle: 'Handmade Terracotta Clay Teapot',
    productImage: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&auto=format&fit=crop&q=80',
    vendor: 'Raju Pottery',
    price: 480,
    quantity: 1,
    recipient: 'Ursports Skillhub',
    address: 'Mirpur, Dhaka',
    stage: 2,
    stageLabel: 'Office',
    currentLocationNote: 'মাটির পাত্রটি কোয়ালিটি চেকিং ও বাবোল র‍্যাপ সেফটি প্যাকেজিং সম্পন্ন করে সেন্ট্রাল অফিসে প্রস্তুত রাখা হয়েছে।',
    estimatedDelivery: '২৯ সেপ্টেম্বর, ২০২৬',
    placedTime: 'গতকাল সন্ধ্যা ৬:০০',
  },
  {
    id: 'track-4',
    orderNumber: 'GS-958214',
    productTitle: 'Exotic Succulent & Miniature Bonsai',
    productImage: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&auto=format&fit=crop&q=80',
    vendor: 'Onnorome Shop',
    price: 520,
    quantity: 1,
    recipient: 'Ursports Skillhub',
    address: 'Mirpur, Dhaka',
    stage: 5,
    stageLabel: 'Out for Delivery',
    currentLocationNote: 'ডেলিভারি রাইডার কবির হোসেন পার্সেলটি নিয়ে বের হয়েছেন। আপনার ঠিকানায় পৌঁছাতে আনুমানিক ১৫-২০ মিনিট লাগবে।',
    estimatedDelivery: 'আজ দুপুর ২:১৫ মিনিটে (শীঘ্রই পৌঁছাবে)',
    placedTime: '২৬ সেপ্টেম্বর',
  },
  {
    id: 'track-5',
    orderNumber: 'GS-520199',
    productTitle: 'Artisanal Clay Earthen Spice Jars',
    productImage: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&auto=format&fit=crop&q=80',
    vendor: 'Green Valley Farms',
    price: 450,
    quantity: 2,
    recipient: 'Ursports Skillhub',
    address: 'Dhaka',
    stage: 1,
    stageLabel: 'Seller',
    currentLocationNote: 'সেলার অর্ডারটি কনফার্ম করেছেন এবং কারখানা থেকে ফ্রেশ ক্লে জার প্যাকিংয়ের কাজ শুরু হয়েছে।',
    estimatedDelivery: '০১ অক্টোবর, ২০২৬',
    placedTime: 'আজ সকাল ১১:২০',
  },
];

interface TrackingViewProps {
  onBackToOrders?: () => void;
}

export const TrackingView: React.FC<TrackingViewProps> = ({ onBackToOrders }) => {
  const [orders, setOrders] = useState<TrackedProductOrder[]>(() => {
    try {
      const saved = localStorage.getItem('greenshop_tracked_orders_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_TRACKED_ORDERS;
  });

  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || 'track-1');
  const [showTrackModal, setShowTrackModal] = useState<boolean>(false);
  const [inputOrderCode, setInputOrderCode] = useState<string>('');
  const [invoiceForView, setInvoiceForView] = useState<InvoiceData | null>(null);

  // Return / Refund Request state
  const [showReturnModal, setShowReturnModal] = useState<boolean>(false);
  const [returnReason, setReturnReason] = useState<string>('ভাঙা বা ক্ষতিগ্রস্ত পণ্য');
  const [refundChannel, setRefundChannel] = useState<string>('bKash');
  const [refundAccount, setRefundAccount] = useState<string>('');
  const [returnNotes, setReturnNotes] = useState<string>('');
  const [returnTicketCreated, setReturnTicketCreated] = useState<string | null>(null);
  const [returnRequests, setReturnRequests] = useState<ReturnRequestItem[]>(() => {
    try {
      const saved = localStorage.getItem('greenshop_return_requests_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const activeOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];
  const currentStage = activeOrder.stage;
  const activeOrderReturn = returnRequests.find(
    (r) => r.orderNumber === activeOrder.orderNumber
  );

  const updateOrderStage = (stage: 1 | 2 | 3 | 4 | 5, stageLabel: string) => {
    const updated = orders.map((o) =>
      o.id === activeOrder.id ? { ...o, stage, stageLabel } : o
    );
    setOrders(updated);
    try {
      localStorage.setItem('greenshop_tracked_orders_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleOpenInvoice = () => {
    const fallbackItems: InvoiceData['items'] = activeOrder.items || [
      {
        title: activeOrder.productTitle,
        vendor: activeOrder.vendor,
        quantity: activeOrder.quantity || 1,
        unitPrice: Math.round(activeOrder.price / Math.max(1, activeOrder.quantity || 1)),
      },
    ];
    const subtotalCalc =
      activeOrder.subtotal ??
      fallbackItems.reduce((s, it) => s + it.unitPrice * it.quantity, 0);

    setInvoiceForView({
      orderNumber: activeOrder.orderNumber,
      date: activeOrder.placedTime,
      customerName: activeOrder.recipient,
      phone: activeOrder.phone || '০১৭১২-০০০০০০',
      address: activeOrder.address,
      paymentMethod: activeOrder.paymentMethod || 'cash_on_delivery',
      trxId: activeOrder.trxId,
      promoCode: activeOrder.promoCode,
      discountAmount: activeOrder.discountAmount,
      deliveryCharge: activeOrder.deliveryCharge ?? 0,
      subtotal: subtotalCalc,
      totalAmount: activeOrder.price,
      items: fallbackItems,
    });
  };

  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = `RET-${Math.floor(100000 + Math.random() * 900000)}`;
    const newReq: ReturnRequestItem = {
      ticketId,
      orderNumber: activeOrder.orderNumber,
      reason: returnReason,
      refundMethod: refundChannel,
      accountNumber: refundAccount.trim() || 'N/A',
      notes: returnNotes.trim(),
      createdAt: 'এইমাত্র',
    };
    const nextList = [newReq, ...returnRequests];
    setReturnRequests(nextList);
    try {
      localStorage.setItem('greenshop_return_requests_v1', JSON.stringify(nextList));
    } catch {
      // ignore
    }
    setReturnTicketCreated(ticketId);
  };

  const handleTrackNewOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const code = inputOrderCode.trim().toUpperCase();
    if (!code) return;

    // Check if order already exists
    const existing = orders.find((o) => o.orderNumber.toUpperCase() === code);
    if (existing) {
      setSelectedOrderId(existing.id);
      setShowTrackModal(false);
      setInputOrderCode('');
      return;
    }

    // Otherwise create a new tracked order
    const newOrder: TrackedProductOrder = {
      id: `track-${Date.now()}`,
      orderNumber: code,
      productTitle: `Ordered Item (${code})`,
      productImage: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=500&auto=format&fit=crop&q=80',
      vendor: 'GreenShop Verified Seller',
      price: 550,
      quantity: 1,
      recipient: 'GreenShop Customer',
      address: 'Mirpur, Dhaka',
      stage: 3,
      stageLabel: 'In Transit (Rod)',
      currentLocationNote: `Order ${code} is currently dispatched and en route to the regional hub.`,
      estimatedDelivery: 'Within 24-48 Hours',
      placedTime: 'Just now',
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    setSelectedOrderId(newOrder.id);
    try {
      localStorage.setItem('greenshop_tracked_orders_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setShowTrackModal(false);
    setInputOrderCode('');
  };

  return (
    <div className="min-h-full w-full bg-gradient-to-b from-[#ebf3fa] via-[#f0f6fc] to-[#ebf3fa] p-4 sm:p-6 lg:p-8 font-sans text-neutral-900 flex flex-col justify-start">
      
      {/* ============================================================== */}
      {/* TOP: TRACKING PRODUCT LIST (REPLACING THE STATIC TEXT) */}
      {/* ============================================================== */}
      <div className="max-w-5xl mx-auto w-full mb-6">
        
        {/* Header title & counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-600 text-white shadow-xs">
                <Package className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight">
                Tracking Product List
              </h2>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {orders.length} Products
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 font-normal mt-1">
              যে প্রোডাক্টটির অবস্থান দেখতে চান সেটি সিলেক্ট করুন (Click on any ordered product to see its real-time location)
            </p>
          </div>

          <button
            onClick={() => setShowTrackModal(true)}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 shadow-2xs hover:border-neutral-400 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-600" />
            <span>Add New Tracking ID</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* HORIZONTAL PRODUCT SELECTOR CARDS */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
          {orders.map((order) => {
            const isSelected = order.id === selectedOrderId;

            // Stage color helper
            const stageBadge =
              order.stage === 5
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                : order.stage === 4
                ? 'bg-purple-100 text-purple-800 border-purple-200'
                : order.stage === 3
                ? 'bg-sky-100 text-sky-800 border-sky-200 font-bold'
                : order.stage === 2
                ? 'bg-blue-100 text-blue-800 border-blue-200'
                : 'bg-amber-100 text-amber-800 border-amber-200';

            return (
              <button
                key={order.id}
                onClick={() => setSelectedOrderId(order.id)}
                className={`relative flex flex-col p-2.5 rounded-xl sm:rounded-2xl text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white ring-2 ring-emerald-500 shadow-md shadow-emerald-950/5 scale-[1.02]'
                    : 'bg-white/80 hover:bg-white border border-neutral-200/80 hover:shadow-xs'
                }`}
              >
                {/* Active check pill on top right */}
                {isSelected && (
                  <span className="absolute top-2 right-2 w-4 h-4 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px]">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-neutral-100 border border-neutral-200">
                    <img
                      src={order.productImage}
                      alt={order.productTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 pr-3">
                    <p className="text-[11px] font-bold text-neutral-900 truncate">
                      {order.productTitle}
                    </p>
                    <p className="text-[10px] text-neutral-500 font-mono">
                      #{order.orderNumber}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-1 flex items-center justify-between border-t border-neutral-100">
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md border ${stageBadge} truncate max-w-full`}>
                    {order.stageLabel}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-700">
                    ৳ {order.price}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* ============================================================== */}
      {/* MAIN TRACKING CARD (SCREENSHOT REPLICA WITH DYNAMIC DATA) */}
      {/* ============================================================== */}
      <div className="max-w-5xl mx-auto w-full bg-white rounded-2xl sm:rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-neutral-200/60 p-5 sm:p-8 lg:p-10 relative overflow-hidden">
        
        {/* Selected Product Live Info Banner */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-[#f4f8fc] border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <img
              src={activeOrder.productImage}
              alt={activeOrder.productTitle}
              className="w-14 h-14 rounded-xl object-cover border border-neutral-200 bg-white shadow-2xs shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-neutral-900">
                  {activeOrder.productTitle}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200/60">
                  {activeOrder.vendor}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-600 mt-0.5">
                <span className="flex items-center gap-1 font-medium text-emerald-800">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  {activeOrder.currentLocationNote}
                </span>
              </div>
            </div>
          </div>

          <div className="sm:text-right shrink-0 flex flex-col sm:items-end gap-2">
            <div className="bg-white sm:bg-transparent p-2 sm:p-0 rounded-xl border sm:border-0 border-neutral-200/50">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wide">
                Estimated Delivery
              </span>
              <span className="text-xs sm:text-sm font-bold text-emerald-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeOrder.estimatedDelivery}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleOpenInvoice}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                <span>ইনভয়েস / মেমো</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setReturnTicketCreated(activeOrderReturn?.ticketId || null);
                  setReturnNotes('');
                  setShowReturnModal(true);
                }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer ${
                  activeOrderReturn
                    ? 'bg-amber-50 border-amber-300 text-amber-800'
                    : 'bg-white hover:bg-rose-50 border-neutral-300 hover:border-rose-300 text-neutral-700 hover:text-rose-700'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>
                  {activeOrderReturn
                    ? `রিটার্ন (#${activeOrderReturn.ticketId})`
                    : 'রিটার্ন / রিফান্ড'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Top Details: Order Number & Recipient */}
        <div className="space-y-3 mb-10 sm:mb-14">
          <div className="flex items-center gap-4">
            <span className="text-sm sm:text-base font-medium text-neutral-800 w-32 shrink-0">
              Order Number
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-block h-4 w-28 sm:w-36 bg-[#dde4ed] rounded-sm"></span>
              <span className="text-xs font-bold text-neutral-700">
                ({activeOrder.orderNumber})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm sm:text-base font-medium text-neutral-800 w-32 shrink-0">
              Recipient
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-block h-4 w-44 sm:w-56 bg-[#dde4ed] rounded-sm"></span>
              <span className="text-xs text-neutral-600 hidden sm:inline truncate max-w-sm">
                ({activeOrder.recipient} • {activeOrder.address})
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* HORIZONTAL TIMELINE MATCHING SCREENSHOT EXACTLY */}
        {/* ============================================================== */}
        <div className="my-6 sm:my-10 overflow-x-auto pb-4">
          <div className="min-w-[620px] max-w-4xl mx-auto relative px-6">
            
            {/* Connecting Base Background Line (Grey) */}
            <div className="absolute top-7 left-12 right-12 h-1 bg-[#e5e7eb] -z-0"></div>

            {/* Connecting Active Progress Line (Green) */}
            <div
              className="absolute top-7 left-12 h-1 bg-[#22c55e] transition-all duration-500 -z-0"
              style={{
                width:
                  currentStage === 1
                    ? '0%'
                    : currentStage === 2
                    ? '25%'
                    : currentStage === 3
                    ? '50%'
                    : currentStage === 4
                    ? '75%'
                    : '100%',
              }}
            ></div>

            {/* 5 Milestone Columns */}
            <div className="grid grid-cols-5 relative z-10 text-center items-start">
              
              {/* STAGE 1: Seller */}
              <div
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => updateOrderStage(1, 'Seller')}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform ${
                    currentStage >= 1
                      ? 'bg-[#22c55e] text-white shadow-sm'
                      : 'bg-[#e2e8f0] text-neutral-400'
                  }`}
                >
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-neutral-800 mt-4">
                  Seller
                </span>
              </div>

              {/* STAGE 2: Office */}
              <div
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => updateOrderStage(2, 'Office')}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform ${
                    currentStage >= 2
                      ? 'bg-[#22c55e] text-white shadow-sm'
                      : 'bg-[#e2e8f0] text-neutral-400'
                  }`}
                >
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>

                {/* Warehouse / Office Icon illustration matching screenshot */}
                <div className="mt-2 text-neutral-700">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 18L24 6L42 18V42H6V18Z"
                      fill="#CBD5E1"
                      stroke="#1E293B"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 24H31V42H17V24Z"
                      fill="#3B82F6"
                      stroke="#1E293B"
                      strokeWidth="2.5"
                    />
                    <line x1="17" y1="28" x2="31" y2="28" stroke="#1E293B" strokeWidth="2" />
                    <line x1="17" y1="33" x2="31" y2="33" stroke="#1E293B" strokeWidth="2" />
                    <line x1="17" y1="38" x2="31" y2="38" stroke="#1E293B" strokeWidth="2" />
                    <rect x="9" y="32" width="5" height="10" fill="#F59E0B" />
                  </svg>
                </div>

                <span className="text-sm sm:text-base font-semibold text-neutral-800 mt-1">
                  Office
                </span>
              </div>

              {/* STAGE 3: In Transit (Rod) - WITH GLOWING HALO WHEN ACTIVE */}
              <div
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => updateOrderStage(3, 'In Transit (Rod)')}
              >
                <div className="relative">
                  {/* Glowing Blue/Cyan Halo Effect if stage 3 */}
                  {currentStage === 3 && (
                    <div className="absolute inset-0 rounded-full bg-[#38bdf8] blur-md opacity-60 scale-125 animate-pulse"></div>
                  )}

                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-white relative z-10 transition-all ${
                      currentStage >= 3
                        ? currentStage === 3
                          ? 'bg-[#10b981] border-2 border-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.7)]'
                          : 'bg-[#22c55e]'
                        : 'bg-[#e2e8f0] text-neutral-500'
                    }`}
                  >
                    {/* Delivery Truck with motion speed lines */}
                    <svg
                      className="w-7 h-7"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                      <path d="M15 18H9" />
                      <path d="M19 18h2a1 1 0 0 0 1-1v-5.28a2 2 0 0 0-.68-1.51l-3.64-3.03A2 2 0 0 0 16.38 6H14v12" />
                      <circle cx="7" cy="18" r="2" fill="white" />
                      <circle cx="17" cy="18" r="2" fill="white" />
                      <line x1="1" y1="9" x2="4" y2="9" />
                      <line x1="1" y1="13" x2="3" y2="13" />
                    </svg>
                  </div>
                </div>

                {/* Truck illustration with wheels below matching screenshot */}
                <div className="mt-2 text-neutral-700">
                  <svg
                    className="w-9 h-8"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="4"
                      y="16"
                      width="26"
                      height="18"
                      rx="2"
                      fill="#E2E8F0"
                      stroke="#1E293B"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M30 20H38L44 26V34H30V20Z"
                      fill="#60A5FA"
                      stroke="#1E293B"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    <circle cx="14" cy="36" r="4" fill="#334155" stroke="#1E293B" strokeWidth="2" />
                    <circle cx="37" cy="36" r="4" fill="#334155" stroke="#1E293B" strokeWidth="2" />
                    <circle cx="10" cy="16" r="4" fill="#475569" stroke="#1E293B" strokeWidth="2" />
                  </svg>
                </div>

                <span className="text-sm sm:text-base font-bold text-neutral-900 mt-1">
                  In Transit (Rod)
                </span>
              </div>

              {/* STAGE 4: Office (Hub) */}
              <div
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => updateOrderStage(4, 'Office (Hub)')}
              >
                <div className="relative">
                  {currentStage === 4 && (
                    <div className="absolute inset-0 rounded-full bg-[#38bdf8] blur-md opacity-60 scale-125 animate-pulse"></div>
                  )}

                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                      currentStage >= 4
                        ? currentStage === 4
                          ? 'bg-[#10b981] border-2 border-[#38bdf8] text-white shadow-[0_0_20px_rgba(56,189,248,0.7)]'
                          : 'bg-[#22c55e] text-white'
                        : 'bg-[#e2e8f0] text-neutral-700'
                    }`}
                  >
                    {currentStage > 4 ? (
                      <Check className="w-7 h-7 stroke-[3]" />
                    ) : (
                      <svg
                        className="w-7 h-7 text-current"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 21h18" />
                        <path d="M5 21V7l7-4 7 4v14" />
                        <path d="M9 21v-8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v8" />
                      </svg>
                    )}
                  </div>
                </div>

                <span className="text-sm sm:text-base font-semibold text-neutral-800 mt-4">
                  Office (Hub)
                </span>
              </div>

              {/* STAGE 5: Out for Delivery */}
              <div
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => updateOrderStage(5, 'Out for Delivery')}
              >
                <div className="relative">
                  {currentStage === 5 && (
                    <div className="absolute inset-0 rounded-full bg-[#38bdf8] blur-md opacity-60 scale-125 animate-pulse"></div>
                  )}

                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                      currentStage >= 5
                        ? 'bg-[#10b981] border-2 border-[#38bdf8] text-white shadow-[0_0_20px_rgba(56,189,248,0.7)]'
                        : 'bg-[#e2e8f0] text-neutral-700'
                    }`}
                  >
                    {currentStage === 5 ? (
                      <Check className="w-7 h-7 stroke-[3]" />
                    ) : (
                      <svg
                        className="w-7 h-7 text-current"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="7" r="4" />
                        <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" />
                        <rect x="14" y="12" width="7" height="6" rx="1" fill="#F59E0B" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    )}
                  </div>
                </div>

                <span className="text-sm sm:text-base font-semibold text-neutral-800 mt-4">
                  Out for Delivery
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Interactive Modal for "Track More" */}
      {showTrackModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-neutral-900 mb-2">Track Any Consignment</h3>
            <p className="text-xs text-neutral-600 mb-4">
              Enter your GreenShop invoice ID or parcel number to get live status updates.
            </p>

            <form onSubmit={handleTrackNewOrder} className="space-y-4">
              <input
                type="text"
                value={inputOrderCode}
                onChange={(e) => setInputOrderCode(e.target.value)}
                placeholder="e.g. GS-902148 or BD-TREE-77"
                autoFocus
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-emerald-600"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTrackModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-lg shadow-sm cursor-pointer"
                >
                  Track Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Return & Refund Request Modal */}
      {showReturnModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-neutral-200 text-neutral-900 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
              <div>
                <h3 className="text-base font-extrabold text-neutral-900">
                  রিটার্ন ও রিফান্ড রিকোয়েস্ট
                </h3>
                <p className="text-xs text-neutral-500 font-mono">
                  Order #{activeOrder.orderNumber} · {activeOrder.productTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowReturnModal(false)}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {returnTicketCreated ? (
              <div className="py-4 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-neutral-900">
                  রিটার্ন রিকোয়েস্ট সফলভাবে গৃহীত হয়েছে
                </h4>
                <p className="text-xs text-neutral-600">
                  রিকোয়েস্ট টিকিট নম্বর:{' '}
                  <span className="font-mono font-bold text-emerald-700">
                    #{returnTicketCreated}
                  </span>
                </p>
                <p className="text-xs text-neutral-500">
                  আমাদের সাপোর্ট প্রতিনিধি ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করে পিকআপ ও রিফান্ড সম্পন্ন করবেন।
                </p>
                <button
                  type="button"
                  onClick={() => setShowReturnModal(false)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                >
                  ঠিক আছে
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReturn} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">
                    রিটার্নের কারণ নির্বাচন করুন *
                  </label>
                  <select
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="ভাঙা বা ক্ষতিগ্রস্ত পণ্য">ভাঙা বা ক্ষতিগ্রস্ত পণ্য ডেলিভারি</option>
                    <option value="ভুল প্রোডাক্ট ডেলিভারি">অর্ডার করা পণ্যের বদলে ভুল পণ্য এসেছে</option>
                    <option value="কোয়ালিটি সমস্যার কারণে রিটার্ন">কোয়ালিটি আশানুরূপ নয়</option>
                    <option value="এক্সচেঞ্জ / সাইজ পরিবর্তন">এক্সচেঞ্জ বা পরিবর্তন করতে চাই</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">
                      রিফান্ড মাধ্যম *
                    </label>
                    <select
                      value={refundChannel}
                      onChange={(e) => setRefundChannel(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-emerald-600"
                    >
                      <option value="bKash">bKash</option>
                      <option value="Nagad">Nagad</option>
                      <option value="Rocket">Rocket</option>
                      <option value="Replacement">নতুন পণ্য রিপ্লেসমেন্ট</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">
                      মোবাইল নম্বর *
                    </label>
                    <input
                      type="tel"
                      required={refundChannel !== 'Replacement'}
                      placeholder="017XXXXXXXX"
                      value={refundAccount}
                      onChange={(e) => setRefundAccount(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-neutral-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">
                    বিস্তারিত বর্ণনা *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="সমস্যার সংক্ষিপ্ত বিবরণ লিখুন..."
                    value={returnNotes}
                    onChange={(e) => setReturnNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-neutral-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReturnModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm cursor-pointer"
                  >
                    রিকোয়েস্ট পাঠান
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Printable Invoice Modal */}
      {invoiceForView && (
        <InvoiceModal
          invoice={invoiceForView}
          onClose={() => setInvoiceForView(null)}
        />
      )}
    </div>
  );
};
