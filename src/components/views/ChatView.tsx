import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Check,
  Send,
  Phone,
  Search,
  ArrowLeft,
  Smile,
  Paperclip,
  CheckCheck,
  Store,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { INITIAL_CONVERSATIONS, StoreConversation, ChatMsg } from '../../data/conversations';
import { Product } from '../../types';

interface ChatViewProps {
  onToggleMobileSidebar?: () => void;
  initialSelectedStoreId?: string;
  selectedProductForChat?: Product | null;
  onViewProduct?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  onToggleMobileSidebar,
  initialSelectedStoreId,
  selectedProductForChat,
  onAddToCart,
}) => {
  const [conversations, setConversations] = useState<StoreConversation[]>(() => {
    try {
      const saved = localStorage.getItem('greenshop_conversations_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_CONVERSATIONS;
  });

  const [activeStoreId, setActiveStoreId] = useState<string>(
    initialSelectedStoreId || 'conv-rifat-1'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Active store conversation object
  const activeConversation =
    conversations.find((c) => c.id === activeStoreId) || conversations[0];

  // Auto-scroll when messages change or store switches
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, activeStoreId, isTyping]);

  // Handle selectedProductForChat if passed from outside
  useEffect(() => {
    if (selectedProductForChat && activeConversation) {
      const productMsgText = `Hi! I'm interested in "${selectedProductForChat.title}" (৳ ${selectedProductForChat.price}). Is this in stock? 🌿`;
      const alreadyHasInquiry = activeConversation.messages.some((m) =>
        m.text.includes(selectedProductForChat.title)
      );

      if (!alreadyHasInquiry) {
        const newMsg: ChatMsg = {
          id: `inq-${Date.now()}`,
          sender: 'customer',
          senderName: 'Customer',
          text: productMsgText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          productRef: {
            title: selectedProductForChat.title,
            price: selectedProductForChat.price,
            image: selectedProductForChat.image,
          },
        };

        const updatedConversations = conversations.map((conv) => {
          if (conv.id === activeStoreId) {
            return {
              ...conv,
              messages: [...conv.messages, newMsg],
            };
          }
          return conv;
        });

        setConversations(updatedConversations);
        triggerBotReply(activeConversation.storeName, `জি হ্যাঁ! "${selectedProductForChat.title}" এখন স্টকে এভেইলেবল আছে। আপনি চাইলে হোম ডেলিভারিতে নিতে পারেন।`);
      }
    }
  }, [selectedProductForChat]);

  // Persist conversations
  const saveConversations = (updated: StoreConversation[]) => {
    setConversations(updated);
    try {
      localStorage.setItem('greenshop_conversations_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Bot response simulator
  const triggerBotReply = (storeName: string, replyText?: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        `Thanks for reaching out to ${storeName}! We provide 100% genuine plants and handmade pottery across Bangladesh.`,
        `অবশ্যই! আমাদের পণ্যগুলো সম্পূর্ণ ফ্রেশ এবং ক্যাশ অন ডেলিভারিতে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে পেয়ে যাবেন।`,
        `You can place your order directly, or let me know if you need customized packaging or plant care instructions! 🌱`,
        `জি বন্ধু, বিকাশ বা পাঠাও কুরিয়ারের মাধ্যমে আমরা সারাদেশেই নিরাপদ প্যাকিংয়ে ডেলিভারি করছি।`,
      ];

      const chosenReply = replyText || responses[Math.floor(Math.random() * responses.length)];

      const storeReplyMsg: ChatMsg = {
        id: `reply-${Date.now()}`,
        sender: 'store',
        senderName: storeName,
        text: chosenReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setConversations((prev) => {
        const next = prev.map((conv) => {
          if (conv.id === activeStoreId) {
            return {
              ...conv,
              messages: [...conv.messages, storeReplyMsg],
            };
          }
          return conv;
        });
        try {
          localStorage.setItem('greenshop_conversations_v1', JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    }, 1000);
  };

  // Send message
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newMsg: ChatMsg = {
      id: `cust-${Date.now()}`,
      sender: 'customer',
      senderName: 'Customer',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = conversations.map((conv) => {
      if (conv.id === activeStoreId) {
        return {
          ...conv,
          messages: [...conv.messages, newMsg],
        };
      }
      return conv;
    });

    saveConversations(updated);
    setInputText('');

    // Trigger vendor response
    triggerBotReply(activeConversation.storeName);
  };

  // Quick suggestion prompts
  const quickSuggestions = [
    'Is this plant currently in stock? 🌿',
    'ঢাকার ভেতর ডেলিভারি চার্জ কত?',
    'ক্যাশ অন ডেলিভারি (COD) কি নেওয়া হয়?',
    'Will you provide original photos before shipping?',
  ];

  // Filtered conversation list
  const filteredConversations = conversations.filter(
    (c) =>
      c.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-65px)] min-h-[580px] w-full bg-[#f4f7f4] flex flex-col font-sans overflow-hidden text-neutral-900 border-t border-neutral-300/40">
      <div className="flex-1 flex w-full h-full overflow-hidden">
        {/* ============================================================ */}
        {/* LEFT PANEL: CONVERSATIONS LIST (Matching WhatsApp / Messenger) */}
        {/* ============================================================ */}
        <div
          className={`w-full md:w-80 lg:w-96 bg-white border-r border-neutral-200/80 flex flex-col shrink-0 ${
            mobileView === 'chat' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Header */}
          <div className="p-4 border-b border-neutral-200/70 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={onToggleMobileSidebar}
                aria-label="Open sidebar menu"
                className="p-1.5 -ml-1 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold tracking-tight text-neutral-900">
                Conversations
              </h2>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {conversations.length} Stores
            </span>
          </div>

          {/* Search Bar */}
          <div className="px-4 py-2.5 bg-white border-b border-neutral-100 shrink-0">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search store or seller..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-100 text-neutral-800 placeholder-neutral-400 rounded-xl border border-transparent focus:border-emerald-500 focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Stores Conversation List */}
          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 divide-y divide-neutral-50 scrollbar-thin">
            {filteredConversations.map((store) => {
              const isSelected = store.id === activeStoreId;

              return (
                <button
                  key={store.id}
                  onClick={() => {
                    setActiveStoreId(store.id);
                    setMobileView('chat');
                  }}
                  className={`w-full flex items-center gap-3.5 p-3 rounded-2xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#eaefe9] text-emerald-950 font-semibold shadow-xs'
                      : 'hover:bg-neutral-100/70 text-neutral-700'
                  }`}
                >
                  {/* Avatar with Online Green Dot */}
                  <div className="relative shrink-0">
                    {store.avatar ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-100 ring-2 ring-white shadow-xs">
                        <img
                          src={store.avatar}
                          alt={store.storeName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-neutral-200/90 text-neutral-700 font-bold text-base flex items-center justify-center ring-2 ring-white shadow-xs">
                        {store.letterAvatar || store.storeName.charAt(0)}
                      </div>
                    )}

                    {/* Online indicator dot beside avatar (matching screenshot) */}
                    {store.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full ring-1 ring-emerald-500/20"></span>
                    )}
                  </div>

                  {/* Name and Online Status */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-neutral-900 truncate">
                        {store.storeName}
                      </span>
                      {store.isVerified && (
                        <span className="text-[10px] text-emerald-700 font-semibold shrink-0 ml-1">
                          Verified
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 mt-0.5">
                      {store.isOnline ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                          <span className="text-xs text-neutral-600 font-medium">Online</span>
                        </>
                      ) : (
                        <span className="text-xs text-neutral-400">Offline</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT PANEL: ACTIVE CHAT CONVERSATION VIEW (Pixel-matched) */}
        {/* ============================================================ */}
        <div
          className={`flex-1 flex flex-col bg-[#f4f7f4] h-full overflow-hidden ${
            mobileView === 'list' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Active Store Header */}
          <div className="px-4 sm:px-6 py-3.5 bg-white border-b border-neutral-200/80 flex items-center justify-between shrink-0 shadow-2xs">
            <div className="flex items-center gap-3">
              {/* Mobile Back Button */}
              <button
                onClick={() => setMobileView('list')}
                className="md:hidden p-1.5 -ml-1 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
                aria-label="Back to conversations"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              {/* Store Avatar */}
              <div className="relative shrink-0">
                {activeConversation.avatar ? (
                  <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-emerald-500/30">
                    <img
                      src={activeConversation.avatar}
                      alt={activeConversation.storeName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-full bg-neutral-200 text-neutral-800 font-bold flex items-center justify-center">
                    {activeConversation.letterAvatar || activeConversation.storeName.charAt(0)}
                  </div>
                )}
                {activeConversation.isOnline && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                )}
              </div>

              {/* Store Name & Verified Badge */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight flex items-center gap-2">
                  <span>{activeConversation.storeName}</span>
                </h3>

                {activeConversation.isVerified && (
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 w-fit mt-0.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-700 flex items-center justify-center text-white text-[9px]">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  alert(`Direct phone assistance for ${activeConversation.storeName}: +880 1712-987654`)
                }
                title="Call seller"
                className="p-2 rounded-xl text-neutral-600 hover:text-emerald-700 hover:bg-emerald-50 border border-neutral-200 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ============================================================ */}
          {/* MESSAGES FEED AREA (Matching exact bubbles & system notice) */}
          {/* ============================================================ */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#f4f7f4]">
            {activeConversation.messages.map((msg) => {
              if (msg.sender === 'system') {
                return (
                  <div key={msg.id} className="flex justify-center my-3">
                    <div className="bg-[#e4ece4] text-neutral-700 text-xs sm:text-sm font-medium px-4 py-2 rounded-xl shadow-2xs text-center max-w-md border border-[#d6e2d6]">
                      {msg.text}
                    </div>
                  </div>
                );
              }

              if (msg.sender === 'customer') {
                // Sent Message: Customer (Dark Forest Green `#1e4738`, White text)
                return (
                  <div key={msg.id} className="flex flex-col items-end max-w-xl ml-auto">
                    <span className="text-xs font-semibold text-neutral-800 mb-1 mr-1">
                      Customer
                    </span>

                    <div className="bg-[#1e4738] text-white px-4 py-3 rounded-2xl rounded-tr-xs shadow-sm text-sm sm:text-[15px] leading-relaxed break-words">
                      {/* Attached Product Card if inquiry */}
                      {msg.productRef && (
                        <div className="mb-2 p-2 rounded-xl bg-black/20 border border-white/20 flex items-center gap-2.5">
                          <img
                            src={msg.productRef.image}
                            alt={msg.productRef.title}
                            className="w-10 h-10 rounded-lg object-cover bg-white"
                          />
                          <div className="text-left text-xs">
                            <p className="font-bold text-white line-clamp-1">
                              {msg.productRef.title}
                            </p>
                            <p className="text-emerald-300 font-semibold">
                              ৳ {msg.productRef.price}
                            </p>
                          </div>
                        </div>
                      )}

                      <p>{msg.text}</p>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-neutral-400 mt-1 mr-1">
                      {msg.time && <span>{msg.time}</span>}
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-700" />
                    </div>
                  </div>
                );
              }

              // Received Message: Store (White bubble, dark text, shadow)
              return (
                <div key={msg.id} className="flex flex-col items-start max-w-xl">
                  <span className="text-xs font-semibold text-neutral-800 mb-1 ml-1">
                    {msg.senderName}
                  </span>

                  <div className="bg-white text-neutral-900 px-4 py-3 rounded-2xl rounded-tl-xs shadow-sm border border-neutral-200/60 text-sm sm:text-[15px] leading-relaxed break-words">
                    <p>{msg.text}</p>
                  </div>

                  {msg.time && (
                    <span className="text-[10px] text-neutral-400 mt-1 ml-1">
                      {msg.time}
                    </span>
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex flex-col items-start max-w-xs animate-in fade-in duration-200">
                <span className="text-xs font-semibold text-neutral-600 mb-1 ml-1">
                  {activeConversation.storeName} is typing...
                </span>
                <div className="bg-white text-neutral-600 px-4 py-2.5 rounded-2xl shadow-sm border border-neutral-200/60 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-4 py-2 bg-white/70 border-t border-neutral-200/50 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-semibold text-neutral-500 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Quick:
            </span>
            {quickSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputText(suggestion);
                }}
                className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 text-neutral-700 hover:text-emerald-900 border border-neutral-200 transition-colors shadow-2xs cursor-pointer"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 sm:p-4 bg-white border-t border-neutral-200/80 shrink-0">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setInputText((prev) => `${prev} 🌱 `)
                }
                title="Add plant emoji"
                className="p-2 text-neutral-500 hover:text-emerald-600 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer"
              >
                <Smile className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setInputText(
                    (prev) =>
                      `${prev} [Product Inquiry: Potted Monstera / Variegated Bonsai] `
                  );
                }}
                title="Attach product query"
                className="p-2 text-neutral-500 hover:text-emerald-600 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Write a message to ${activeConversation.storeName}...`}
                className="flex-1 px-4 py-2.5 text-sm bg-neutral-100/90 text-neutral-900 placeholder-neutral-500 rounded-xl border border-transparent focus:border-emerald-500 focus:bg-white focus:outline-none transition-all shadow-2xs"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                aria-label="Send Message"
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white shadow-md shadow-emerald-800/20 transition-all cursor-pointer active:scale-95"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
