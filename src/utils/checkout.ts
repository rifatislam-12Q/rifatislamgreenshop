import { InvoiceData, PaymentMethodType } from '../types';

export const BD_DIVISIONS = [
  'ঢাকা বিভাগ (Dhaka)',
  'চট্টগ্রাম বিভাগ (Chattogram)',
  'রাজশাহী বিভাগ (Rajshahi)',
  'খুলনা বিভাগ (Khulna)',
  'বরিশাল বিভাগ (Barishal)',
  'সিলেট বিভাগ (Sylhet)',
  'রংপুর বিভাগ (Rangpur)',
  'ময়মনসিংহ বিভাগ (Mymensingh)',
];

export const FREE_DELIVERY_THRESHOLD = 1500;

export const PROMO_CODES: Record<
  string,
  { label: string; type: 'percent' | 'flat' | 'free_delivery'; value: number }
> = {
  GREEN10: { label: '১০% বিশেষ ছাড়', type: 'percent', value: 10 },
  WELCOME50: { label: '৳ ৫০ ফ্ল্যাট ছাড়', type: 'flat', value: 50 },
  FREEDEL: { label: 'ফ্রি ডেলিভারি', type: 'free_delivery', value: 0 },
};

export function calculatePromo(
  code: string,
  subtotal: number,
  baseDelivery: number
): {
  valid: boolean;
  normalizedCode: string;
  discount: number;
  delivery: number;
  message: string;
} {
  const normalized = code.trim().toUpperCase();
  if (!normalized) {
    return {
      valid: false,
      normalizedCode: '',
      discount: 0,
      delivery: baseDelivery,
      message: '',
    };
  }

  const rule = PROMO_CODES[normalized];
  if (!rule) {
    return {
      valid: false,
      normalizedCode: normalized,
      discount: 0,
      delivery: baseDelivery,
      message: 'দুঃখিত, এই প্রোমো কোডটি সঠিক নয়। চেষ্টা করুন: GREEN10 বা WELCOME50',
    };
  }

  if (rule.type === 'percent') {
    const discount = Math.round((subtotal * rule.value) / 100);
    return {
      valid: true,
      normalizedCode: normalized,
      discount,
      delivery: baseDelivery,
      message: `${normalized} প্রোমো যুক্ত হয়েছে (${rule.label} · -৳${discount})`,
    };
  }

  if (rule.type === 'flat') {
    const discount = Math.min(subtotal, rule.value);
    return {
      valid: true,
      normalizedCode: normalized,
      discount,
      delivery: baseDelivery,
      message: `${normalized} প্রোমো যুক্ত হয়েছে (${rule.label} · -৳${discount})`,
    };
  }

  return {
    valid: true,
    normalizedCode: normalized,
    discount: 0,
    delivery: 0,
    message: `${normalized} প্রোমো যুক্ত হয়েছে (ফ্রি ডেলিভারি)`,
  };
}

export interface StoredTrackedOrder {
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

export function saveOrderToTracking(order: StoredTrackedOrder): void {
  try {
    const stored = localStorage.getItem('greenshop_tracked_orders_v1');
    const existingOrders: StoredTrackedOrder[] = stored ? JSON.parse(stored) : [];
    localStorage.setItem(
      'greenshop_tracked_orders_v1',
      JSON.stringify([order, ...existingOrders])
    );
  } catch {
    // ignore storage errors
  }
}

export const MERCHANT_WALLET_NUMBER = '01712-987654';
