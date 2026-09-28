export interface ChatMsg {
  id: string;
  sender: 'store' | 'customer' | 'system';
  senderName: string;
  text: string;
  time?: string;
  productRef?: {
    title: string;
    price: number;
    image: string;
  };
}

export interface StoreConversation {
  id: string;
  storeName: string;
  avatar?: string;
  letterAvatar?: string;
  isOnline: boolean;
  isVerified?: boolean;
  role?: string;
  category?: string;
  location?: string;
  systemNotice?: string;
  messages: ChatMsg[];
}

export const INITIAL_CONVERSATIONS: StoreConversation[] = [
  {
    id: 'conv-rifat-1',
    storeName: 'Rifat Shop',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    isOnline: true,
    isVerified: true,
    role: 'Verified Seller & Nursery Specialist',
    category: 'Indoor & Bonsai Plants',
    location: 'Mirpur, Dhaka',
    systemNotice: 'Welcome to Greenshop.com Chat. You are connected with Rifat Shop.',
    messages: [
      {
        id: 'rif-1',
        sender: 'system',
        senderName: 'System',
        text: 'Welcome to Greenshop.com Chat. You are connected with Rifat Shop.',
        time: '10:00 AM',
      },
      {
        id: 'rif-2',
        sender: 'store',
        senderName: 'Rifat Shop',
        text: 'Hello! Welcome to my shop. How can I help you today with your plant purchase? 🌿',
        time: '10:01 AM',
      },
      {
        id: 'rif-3',
        sender: 'customer',
        senderName: 'Customer',
        text: "Hi! I'm interested in the Potted Monstera. Is it still available?",
        time: '10:03 AM',
      },
      {
        id: 'rif-4',
        sender: 'store',
        senderName: 'Rifat Shop',
        text: 'Yes, it is available! Would you like to see more photos of this specific plant?',
        time: '10:04 AM',
      },
    ],
  },
  {
    id: 'conv-riyad-1',
    storeName: 'Riyad Shop',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    isOnline: true,
    isVerified: true,
    role: 'Sylhet Organic Agro & Tea Supplier',
    category: 'Organic Green Tea & Herbs',
    location: 'Sreemangal, Sylhet',
    systemNotice: 'Welcome to Greenshop.com Chat. You are connected with Riyad Shop.',
    messages: [
      {
        id: 'riy-1',
        sender: 'system',
        senderName: 'System',
        text: 'Welcome to Greenshop.com Chat. You are connected with Riyad Shop.',
        time: '09:30 AM',
      },
      {
        id: 'riy-2',
        sender: 'store',
        senderName: 'Riyad Shop',
        text: 'আসসালামু আলাইকুম! শ্রীমঙ্গল টি এস্টেট থেকে সরাসরি তাজা গ্রিন টি এবং অর্গানিক হার্বাল প্রোডাক্টের অর্ডার নিচ্ছি।',
        time: '09:31 AM',
      },
      {
        id: 'riy-3',
        sender: 'customer',
        senderName: 'Customer',
        text: '১ কেজি অর্গানিক গ্রিন টি কি আজকেই কুরিয়ারে দেওয়া যাবে?',
        time: '09:35 AM',
      },
      {
        id: 'riy-4',
        sender: 'store',
        senderName: 'Riyad Shop',
        text: 'জ্বী অবশ্যই! পাঠাও বা সুন্দরবন কুরিয়ারে ক্যাশ অন ডেলিভারিতে পাঠানো যাবে।',
        time: '09:36 AM',
      },
    ],
  },
  {
    id: 'conv-raju-1',
    storeName: 'Raju',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    isOnline: true,
    isVerified: false,
    role: 'Traditional Terracotta Artisan',
    category: 'Handmade Clay Pottery & Pots',
    location: 'Rayer Bazar, Dhaka',
    systemNotice: 'Welcome to Greenshop.com Chat. You are connected with Raju.',
    messages: [
      {
        id: 'raj-1',
        sender: 'system',
        senderName: 'System',
        text: 'Welcome to Greenshop.com Chat. You are connected with Raju.',
        time: 'Yesterday',
      },
      {
        id: 'raj-2',
        sender: 'store',
        senderName: 'Raju',
        text: 'নমস্কার! আমাদের ১০০% হাতে তৈরি মাটির টব ও চায়ের কাপের সম্ভার দেখতে পারেন। কোনো কাস্টম সাইজ লাগবে?',
        time: 'Yesterday',
      },
    ],
  },
  {
    id: 'conv-onnorome-1',
    storeName: 'Onnorome Shop',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    isOnline: true,
    isVerified: true,
    role: 'Rare Exotic Succulents & Cacti',
    category: 'Succulents & Glass Terrariums',
    location: 'Uttara, Dhaka',
    systemNotice: 'Welcome to Greenshop.com Chat. You are connected with Onnorome Shop.',
    messages: [
      {
        id: 'onn-1',
        sender: 'system',
        senderName: 'System',
        text: 'Welcome to Greenshop.com Chat. You are connected with Onnorome Shop.',
        time: 'Yesterday',
      },
      {
        id: 'onn-2',
        sender: 'store',
        senderName: 'Onnorome Shop',
        text: 'Hey plant lover! Check out our new miniature succulent sets and desk-friendly terrariums! 🌱',
        time: 'Yesterday',
      },
    ],
  },
  {
    id: 'conv-rifat-letter',
    storeName: 'Rifat Shop',
    letterAvatar: 'R',
    isOnline: false,
    isVerified: true,
    role: 'Secondary Plant Outlet',
    category: 'Fertilizers & Garden Tools',
    location: 'Dhaka',
    systemNotice: 'Welcome to Greenshop.com Chat. You are connected with Rifat Shop.',
    messages: [
      {
        id: 'rifl-1',
        sender: 'system',
        senderName: 'System',
        text: 'Welcome to Greenshop.com Chat. You are connected with Rifat Shop.',
        time: '2 days ago',
      },
      {
        id: 'rifl-2',
        sender: 'store',
        senderName: 'Rifat Shop',
        text: 'অর্গানিক ভার্মিকম্পোস্ট সার ৫ কেজি ব্যাগ রেডি আছে।',
        time: '2 days ago',
      },
    ],
  },
  {
    id: 'conv-riyad-letter',
    storeName: 'Riyad Shop',
    letterAvatar: 'Ri',
    isOnline: false,
    isVerified: false,
    role: 'Wholesale Tea Consignment',
    category: 'Wholesale',
    location: 'Sylhet',
    systemNotice: 'Welcome to Greenshop.com Chat. You are connected with Riyad Shop.',
    messages: [
      {
        id: 'riyl-1',
        sender: 'system',
        senderName: 'System',
        text: 'Welcome to Greenshop.com Chat. You are connected with Riyad Shop.',
        time: '3 days ago',
      },
      {
        id: 'riyl-2',
        sender: 'store',
        senderName: 'Riyad Shop',
        text: 'ক্যাফে এবং হোটেলের জন্য স্পেশাল হোলসেল রেট লিস্ট পাঠানো হয়েছে।',
        time: '3 days ago',
      },
    ],
  },
  {
    id: 'conv-raju-letter',
    storeName: 'Raju',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    isOnline: false,
    isVerified: false,
    role: 'Clay Flower Pots',
    category: 'Outdoor Planters',
    location: 'Dhamrai',
    systemNotice: 'Welcome to Greenshop.com Chat. You are connected with Raju.',
    messages: [
      {
        id: 'rajl-1',
        sender: 'system',
        senderName: 'System',
        text: 'Welcome to Greenshop.com Chat. You are connected with Raju.',
        time: '4 days ago',
      },
      {
        id: 'rajl-2',
        sender: 'store',
        senderName: 'Raju',
        text: '১০ ইঞ্চি পোড়া মাটির টব ডেলিভারির জন্য প্রস্তুত।',
        time: '4 days ago',
      },
    ],
  },
  {
    id: 'conv-onnorome-letter',
    storeName: 'Onnorome Shop',
    letterAvatar: 'O',
    isOnline: false,
    isVerified: true,
    role: 'Hanging Plants & Vines',
    category: 'Hanging Decor',
    location: 'Dhaka',
    systemNotice: 'Welcome to Greenshop.com Chat. You are connected with Onnorome Shop.',
    messages: [
      {
        id: 'onnl-1',
        sender: 'system',
        senderName: 'System',
        text: 'Welcome to Greenshop.com Chat. You are connected with Onnorome Shop.',
        time: '5 days ago',
      },
      {
        id: 'onnl-2',
        sender: 'store',
        senderName: 'Onnorome Shop',
        text: 'ম্যাক্রামে হ্যাঙ্গার সহ মানিপ্ল্যান্টের নতুন স্টক যোগ হয়েছে।',
        time: '5 days ago',
      },
    ],
  },
];
