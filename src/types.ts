export interface Product {
  id: string;
  title: string;
  vendor: string;
  vendorLogo: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: 'All' | 'Electronics' | 'Fashion' | 'Home & Garden' | 'Health' | 'Organic Food';
  image: string;
  galleryImages?: string[];
  videoUrl?: string;
  description: string;
  stock: number;
  isOrganic?: boolean;
  isHandmade?: boolean;
  isLive?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export type QuickFilter = 'all' | 'organic' | 'handmade' | 'under-500';

export type PaymentMethodType = 'cash_on_delivery' | 'bkash' | 'nagad' | 'rocket';

export interface InvoiceItem {
  title: string;
  vendor: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceData {
  orderNumber: string;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: PaymentMethodType;
  trxId?: string;
  promoCode?: string;
  discountAmount?: number;
  deliveryCharge: number;
  subtotal: number;
  totalAmount: number;
  items: InvoiceItem[];
}

export type SidebarTab =
  | 'home'
  | 'profile'
  | 'dashboard'
  | 'live-bazar'
  | 'local-market'
  | 'video'
  | 'marketplace'
  | 'business-deal'
  | 'tracking'
  | 'chat'
  | 'notifications';

export interface AppNotification {
  id: string;
  type: 'order' | 'product' | 'deal' | 'live' | 'chat' | 'system' | 'payment';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  linkTab?: SidebarTab;
  actionLabel?: string;
  avatar?: string;
  imageUrl?: string;
  priority?: 'normal' | 'high';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'seller' | 'support';
  senderName: string;
  senderAvatar: string;
  text: string;
  time: string;
  productRef?: {
    title: string;
    price: number;
    image: string;
  };
}

export interface AdItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  discountText?: string;
  imageUrl: string;
  actionText: string;
  targetCategory?: string;
  sponsorName?: string;
  isActive: boolean;
  bgGradient?: string;
}

export interface CurrentUser {
  name: string;
  phoneOrEmail: string;
  avatar?: string;
  isLoggedIn: boolean;
  provider?: 'facebook' | 'manual';
  joinedDate?: string;
}
