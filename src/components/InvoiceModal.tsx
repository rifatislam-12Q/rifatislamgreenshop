import React from 'react';
import { X, Printer, ShoppingBag, CheckCircle2, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { InvoiceData, PaymentMethodType } from '../types';

interface InvoiceModalProps {
  invoice: InvoiceData | null;
  onClose: () => void;
}

const getPaymentLabel = (method: PaymentMethodType): string => {
  switch (method) {
    case 'bkash':
      return 'bKash Digital Payment';
    case 'nagad':
      return 'Nagad Digital Payment';
    case 'rocket':
      return 'Rocket Mobile Banking';
    default:
      return 'Cash on Delivery (COD)';
  }
};

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose }) => {
  if (!invoice) return null;

  const isDigitalPaid = invoice.paymentMethod !== 'cash_on_delivery';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-70 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        id="greenshop-printable-invoice"
        className="relative w-full max-w-2xl bg-white text-neutral-900 rounded-2xl shadow-2xl overflow-hidden my-auto border border-neutral-200"
      >
        {/* Top Action Bar (Hidden in Print) */}
        <div className="no-print flex items-center justify-between px-5 py-3.5 bg-neutral-100 border-b border-neutral-200">
          <span className="text-xs font-bold text-neutral-700">
            অফিসিয়াল ডিজিটাল ইনভয়েস / ক্যাশ মেমো
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট / PDF সেভ</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 cursor-pointer transition-colors"
              aria-label="Close invoice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Content */}
        <div className="p-5 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight text-neutral-900">
                  Green<span className="text-emerald-600">Shop</span>
                </h2>
                <p className="text-xs text-neutral-500">
                  ১০০% অর্গানিক ও হস্তশিল্প মার্কেটপ্লেস, বাংলাদেশ
                </p>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  হটলাইন: ০১৭১২-৯৮৭৬৫৪ · support@greenshop.com
                </p>
              </div>
            </div>

            <div className="sm:text-right">
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                Cash Memo / Invoice
              </p>
              <p className="text-base font-black font-mono text-neutral-900 mt-0.5 tabular-nums">
                #{invoice.orderNumber}
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">{invoice.date}</p>
            </div>
          </div>

          {/* Customer & Payment Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1">
              <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">
                গ্রাহকের তথ্য (Bill & Ship To)
              </p>
              <p className="font-bold text-neutral-900 text-sm">{invoice.customerName}</p>
              <p className="text-neutral-600 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="tabular-nums">{invoice.phone}</span>
              </p>
              <p className="text-neutral-600 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{invoice.address}</span>
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1.5">
              <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">
                পেমেন্টের বিবরণ (Payment Info)
              </p>
              <p className="font-bold text-neutral-900">{getPaymentLabel(invoice.paymentMethod)}</p>
              {invoice.trxId && (
                <p className="text-neutral-600 font-mono text-[11px]">
                  TrxID: <strong className="text-neutral-900">{invoice.trxId}</strong>
                </p>
              )}
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold pt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isDigitalPaid ? 'পেমেন্ট ভেরিফিকেশন সম্পন্ন' : 'হাতে পেয়ে পরিশোধযোগ্য (COD)'}</span>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto border border-neutral-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100 text-neutral-600 border-b border-neutral-200">
                <tr>
                  <th className="py-2.5 px-3.5 font-bold">পণ্য (Product)</th>
                  <th className="py-2.5 px-3 text-center font-bold">পরিমাণ</th>
                  <th className="py-2.5 px-3 text-right font-bold">একক মূল্য</th>
                  <th className="py-2.5 px-3.5 text-right font-bold">মোট</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {invoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-3.5">
                      <p className="font-bold text-neutral-900">{item.title}</p>
                      <p className="text-[11px] text-neutral-500">{item.vendor}</p>
                    </td>
                    <td className="py-3 px-3 text-center font-semibold tabular-nums">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-3 text-right text-neutral-700 tabular-nums">
                      ৳ {item.unitPrice.toLocaleString()}
                    </td>
                    <td className="py-3 px-3.5 text-right font-bold text-neutral-900 tabular-nums">
                      ৳ {(item.unitPrice * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="flex justify-end">
            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>সাব-টোটাল (Subtotal)</span>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  ৳ {invoice.subtotal.toLocaleString()}
                </span>
              </div>

              {invoice.discountAmount && invoice.discountAmount > 0 ? (
                <div className="flex justify-between text-emerald-700">
                  <span>
                    প্রোমো ছাড় {invoice.promoCode ? `(${invoice.promoCode})` : ''}
                  </span>
                  <span className="font-bold tabular-nums">
                    - ৳ {invoice.discountAmount.toLocaleString()}
                  </span>
                </div>
              ) : null}

              <div className="flex justify-between text-neutral-600">
                <span>ডেলিভারি চার্জ</span>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  {invoice.deliveryCharge === 0
                    ? 'ফ্রি (৳ 0)'
                    : `৳ ${invoice.deliveryCharge.toLocaleString()}`}
                </span>
              </div>

              <div className="flex justify-between text-sm font-black text-neutral-900 pt-2 border-t border-neutral-300">
                <span>সর্বমোট বিল (Grand Total)</span>
                <span className="text-emerald-700 tabular-nums">
                  ৳ {invoice.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-neutral-500">
            <span className="flex items-center gap-1.5 text-neutral-600 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>৭ দিনের সহজ রিটার্ন গ্যারান্টি ও ১০০% অথেনটিক পণ্যের নিশ্চয়তা</span>
            </span>
            <span>GreenShop থেকে কেনাকাটার জন্য ধন্যবাদ!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
