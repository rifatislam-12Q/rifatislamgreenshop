import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  MessageSquare,
  Bot,
  User,
  Store,
  CheckCheck,
  Sparkles,
  PhoneCall,
  Info,
} from 'lucide-react';
import { ChatMessage, Product } from '../types';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProductForChat?: Product | null;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  selectedProductForChat,
}) => {
  const [activeChannel, setActiveChannel] = useState<'support' | 'seller'>('seller');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'seller',
      senderName: 'Green Valley Farms',
      senderAvatar:
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=80&auto=format&fit=crop&q=80',
      text: 'আসসালামু আলাইকুম! Green Valley Farms এ আপনাকে স্বাগতম। আমাদের অর্গানিক গ্রিন টি এবং মাটির পাত্র সম্পর্কে কোন কিছু জানতে চান? We deliver all over Bangladesh with cash on delivery!',
      time: '10:00 AM',
    },
    {
      id: 'm2',
      sender: 'support',
      senderName: 'GreenShop Helpdesk',
      senderAvatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      text: 'Hello! You can ask us about your orders, bKash/Nagad payment, delivery times, or return policies.',
      time: '10:05 AM',
    },
  ]);

  const quickPrompts = [
    'অর্ডার ডেলিভারি হতে কত দিন লাগে?',
    'ক্যাশ অন ডেলিভারি (COD) বা বিকাশ কি নেওয়া হয়?',
    'গ্রিন টি কি ১০০% অর্গানিক?',
    'মাটির পাত্র কি গরম চায়ে ফাটবে না?',
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // When a product is passed, initiate a chat context
  useEffect(() => {
    if (selectedProductForChat) {
      setMessages((prev) => [
        ...prev,
        {
          id: `prod-inq-${Date.now()}`,
          sender: 'user',
          senderName: 'You',
          senderAvatar:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80',
          text: `Hi! I want to know more about "${selectedProductForChat.title}" (৳ ${selectedProductForChat.price}).`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          productRef: {
            title: selectedProductForChat.title,
            price: selectedProductForChat.price,
            image: selectedProductForChat.image,
          },
        },
      ]);

      // Trigger automatic vendor response
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `reply-${Date.now()}`,
            sender: 'seller',
            senderName: 'Green Valley Farms',
            senderAvatar:
              'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=80&auto=format&fit=crop&q=80',
            text: `জি বন্ধু! "${selectedProductForChat.title}" বর্তমানে আমাদের স্টকে এভেইলেবল আছে। এটি ১০০% প্রাকৃতিক ও অথেনটিক। আপনি চাইলে এখনই অর্ডার কনফার্ম করতে পারেন!`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsTyping(false);
      }, 1200);
    }
  }, [selectedProductForChat]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      senderName: 'You',
      senderAvatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Simulate smart bot response
    setIsTyping(true);
    setTimeout(() => {
      let replyText =
        'ধন্যবাদ আপনার মেসেজের জন্য! আমাদের প্রতিনিধি খুব দ্রুত আপনার সাথে যোগাযোগ করছেন। ঢাকার ভেতরে ২৪-৪৮ ঘণ্টা এবং ঢাকার বাইরে ২-৩ দিনে ডেলিভারি পৌঁছে যাবে।';

      const lower = text.toLowerCase();
      if (lower.includes('ক্যাশ') || lower.includes('cod') || lower.includes('bKash') || lower.includes('বিকাশ') || lower.includes('payment')) {
        replyText =
          'হ্যাঁ, আমরা ক্যাশ অন ডেলিভারি (Cash on Delivery), বিকাশ (bKash), নগদ (Nagad) এবং কার্ড পেমেন্ট সাপোর্ট করি। পণ্য হাতে পেয়ে চেক করে টাকা দিতে পারবেন!';
      } else if (lower.includes('অর্গানিক') || lower.includes('tea') || lower.includes('টি')) {
        replyText =
          'আমাদের সকল গ্রিন টি সরাসরি শ্রীমঙ্গলের বিশ্বস্ত অর্গানিক বাগান থেকে সংগৃহীত। এতে কোন কেমিক্যাল বা আর্টিফিশিয়াল ফ্লেভার নেই!';
      } else if (lower.includes('পাত্র') || lower.includes('pottery') || lower.includes('ফাটবে')) {
        replyText =
          'আমাদের টেরাকোটা ও সিরামিক পট উচ্চ তাপমাত্রায় ওভেন বেকড। এগুলো ফুটন্ত চা ও কফির জন্য সম্পূর্ণ নিরাপদ ও টেকসই। ডেলিভারির সময় নিরাপদ বাবল র‍্যাপে পাঠানো হয়।';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: activeChannel === 'seller' ? 'seller' : 'support',
          senderName:
            activeChannel === 'seller' ? 'Green Valley Farms' : 'GreenShop Support',
          senderAvatar:
            activeChannel === 'seller'
              ? 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=80&auto=format&fit=crop&q=80'
              : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 1100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="chat-modal-window"
        className="relative w-full max-w-lg h-[620px] max-h-[90vh] bg-[#16171b] border border-[#2b2c34] rounded-2xl flex flex-col shadow-2xl overflow-hidden text-neutral-200"
      >
        {/* Header */}
        <div className="p-4 bg-[#1b1c22] border-b border-[#292a33] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#16171b] rounded-full"></span>
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                GreenShop Live Chat
                <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  Online
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Instant reply • Organic Products & Orders
              </p>
            </div>
          </div>

          <button
            id="close-chat-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#252630] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Channel Switcher */}
        <div className="flex items-center px-4 py-2 bg-[#131317] border-b border-[#23242c] gap-2 text-xs">
          <button
            onClick={() => setActiveChannel('seller')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeChannel === 'seller'
                ? 'bg-[#252630] text-emerald-400 shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Green Valley Farms (Seller)</span>
          </button>
          <button
            onClick={() => setActiveChannel('support')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeChannel === 'support'
                ? 'bg-[#252630] text-emerald-400 shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Support Helpdesk</span>
          </button>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-neutral-700">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {!isUser && (
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover mt-1 shrink-0 border border-emerald-500/20"
                  />
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-[#212229] text-neutral-200 border border-[#2e2f3a] rounded-tl-none'
                  }`}
                >
                  {!isUser && (
                    <div className="text-[11px] font-semibold text-emerald-400 mb-1 flex items-center justify-between gap-2">
                      <span>{msg.senderName}</span>
                    </div>
                  )}

                  {/* Optional Product Reference Attachment */}
                  {msg.productRef && (
                    <div className="mb-2 p-2 rounded-lg bg-black/30 flex items-center gap-2 border border-white/10">
                      <img
                        src={msg.productRef.image}
                        alt={msg.productRef.title}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded object-cover"
                      />
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-medium text-white truncate">
                          {msg.productRef.title}
                        </p>
                        <p className="text-[10px] text-emerald-300">
                          ৳ {msg.productRef.price}
                        </p>
                      </div>
                    </div>
                  )}

                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <div
                    className={`mt-1 text-[10px] flex items-center justify-end gap-1 ${
                      isUser ? 'text-emerald-200' : 'text-neutral-400'
                    }`}
                  >
                    <span>{msg.time}</span>
                    {isUser && <CheckCheck className="w-3 h-3 text-emerald-300" />}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-neutral-400 text-xs pl-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[11px] text-neutral-500">GreenShop replying...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 pt-2 pb-1 bg-[#131417] border-t border-[#23242b] overflow-x-auto flex items-center gap-1.5 scrollbar-none">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-[#1e1f26] hover:bg-[#2a2b34] text-neutral-300 border border-[#2d2e37] whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <div className="p-3 bg-[#17181d] border-t border-[#252630]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              id="chat-message-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message in Bangla or English..."
              className="flex-1 bg-[#101114] text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-neutral-700/60 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
            />
            <button
              id="send-chat-msg-btn"
              type="submit"
              disabled={!inputText.trim()}
              className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
