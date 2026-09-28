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
