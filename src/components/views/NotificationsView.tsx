import React, { useState } from 'react';
import {
  Bell,
  CheckCheck,
  Trash2,
  Package,
  Radio,
  Tag,
  Handshake,
  CreditCard,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Filter,
  CheckCircle2,
  Clock,
  PlusCircle,
  Search,
  AlertCircle,
} from 'lucide-react';
import { AppNotification, SidebarTab } from '../../types';

interface NotificationsViewProps {
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onClearAll: () => void;
  onNavigateTab: (tab: SidebarTab) => void;
  onAddTestNotification: (presetType?: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onClearAll,
  onNavigateTab,
  onAddTestNotification,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((item) => {
    // Type filter
    if (filterType === 'unread' && item.read) return false;
    if (filterType === 'orders' && item.type !== 'order') return false;
    if (filterType === 'products' && item.type !== 'product') return false;
    if (filterType === 'deals' && item.type !== 'deal' && item.type !== 'live') return false;
    if (filterType === 'messages' && item.type !== 'chat') return false;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getNotificationIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'order':
        return <Package className="w-4 h-4 text-emerald-400" />;
      case 'live':
        return <Radio className="w-4 h-4 text-rose-400 animate-pulse" />;
      case 'product':
        return <Tag className="w-4 h-4 text-sky-400" />;
      case 'deal':
        return <Handshake className="w-4 h-4 text-amber-400" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-purple-400" />;
      case 'chat':
        return <MessageSquare className="w-4 h-4 text-teal-400" />;
      default:
        return <Bell className="w-4 h-4 text-neutral-400" />;
    }
  };

  const getNotificationBadgeColor = (type: AppNotification['type']) => {
    switch (type) {
      case 'order':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'live':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'product':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'deal':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'payment':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'chat':
        return 'bg-teal-500/10 text-teal-400 border-teal-500/30';
      default:
        return 'bg-neutral-800 text-neutral-400 border-neutral-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Banner / Header Card */}
      <div className="bg-[#17181f] border border-[#262733] rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 border-2 border-[#17181f] rounded-full animate-ping"></span>
              )}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 border-2 border-[#17181f] rounded-full"></span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  নোটিফিকেশন সেন্টার
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-[#22232d] text-emerald-400 border border-[#303240]">
                  {unreadCount} নতুন
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                আপনার অর্ডার, নতুন প্রোডাক্ট পোস্ট, লাইভ বাজার ও মেসেজের সমস্ত আপডেট এখানে সংরক্ষিত থাকে
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#22232c] hover:bg-[#2c2d38] text-xs font-semibold text-neutral-200 border border-[#323342] transition-colors"
                title="Mark all as read"
              >
                <CheckCheck className="w-4 h-4 text-emerald-400" />
                <span>সব পড়া হয়েছে</span>
              </button>
            )}

            <button
              onClick={() => onAddTestNotification()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 text-xs font-semibold transition-colors"
              title="Send a sample notification to test"
            >
              <PlusCircle className="w-4 h-4" />
              <span>টেস্ট নোটিফিকেশন</span>
            </button>

            {notifications.length > 0 && (
              <button
                onClick={onClearAll}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-medium transition-colors"
                title="Clear all notifications"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>সব মুছুন</span>
              </button>
            )}
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-5 pt-4 border-t border-[#252633] flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                filterType === 'all'
                  ? 'bg-emerald-500 text-black font-bold shadow-md'
                  : 'bg-[#20212b] text-neutral-400 hover:text-white'
              }`}
            >
              সকল ({notifications.length})
            </button>
            <button
              onClick={() => setFilterType('unread')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                filterType === 'unread'
                  ? 'bg-emerald-500 text-black font-bold shadow-md'
                  : 'bg-[#20212b] text-neutral-400 hover:text-white'
              }`}
            >
              <span>অপঠিত</span>
              {unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              )}
            </button>
            <button
              onClick={() => setFilterType('orders')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                filterType === 'orders'
                  ? 'bg-emerald-500 text-black font-bold shadow-md'
                  : 'bg-[#20212b] text-neutral-400 hover:text-white'
              }`}
            >
              অর্ডার ও ডেলিভারি
            </button>
            <button
              onClick={() => setFilterType('products')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                filterType === 'products'
                  ? 'bg-emerald-500 text-black font-bold shadow-md'
                  : 'bg-[#20212b] text-neutral-400 hover:text-white'
              }`}
            >
              প্রোডাক্ট পোস্ট
            </button>
            <button
              onClick={() => setFilterType('deals')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                filterType === 'deals'
                  ? 'bg-emerald-500 text-black font-bold shadow-md'
                  : 'bg-[#20212b] text-neutral-400 hover:text-white'
              }`}
            >
              ডিল ও লাইভ
            </button>
            <button
              onClick={() => setFilterType('messages')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                filterType === 'messages'
                  ? 'bg-emerald-500 text-black font-bold shadow-md'
                  : 'bg-[#20212b] text-neutral-400 hover:text-white'
              }`}
            >
              মেসেজ
            </button>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="নোটিফিকেশন খুঁজুন..."
              className="w-full text-xs pl-8 pr-3 py-1.5 bg-[#121317] border border-[#2a2b38] rounded-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500/60"
            />
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => {
            const isUnread = !item.read;

            return (
              <div
                key={item.id}
                id={`notification-item-${item.id}`}
                className={`relative group rounded-xl p-4 sm:p-5 transition-all border ${
                  isUnread
                    ? 'bg-[#1b1c24] border-emerald-500/40 shadow-lg shadow-black/20'
                    : 'bg-[#15161b] border-[#24252e] hover:border-[#323340]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Left: Icon & Content */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${getNotificationBadgeColor(
                        item.type
                      )}`}
                    >
                      {getNotificationIcon(item.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getNotificationBadgeColor(
                            item.type
                          )}`}
                        >
                          {item.type}
                        </span>

                        {isUnread && (
                          <span className="flex items-center gap-1 text-[10px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                            নতুন
                          </span>
                        )}

                        <span className="text-[11px] text-neutral-500 flex items-center gap-1 ml-auto">
                          <Clock className="w-3 h-3 text-neutral-500" />
                          {item.timestamp}
                        </span>
                      </div>

                      <h3
                        className={`text-sm sm:text-base font-semibold leading-snug ${
                          isUnread ? 'text-white' : 'text-neutral-300'
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        {item.message}
                      </p>

                      {/* Action buttons (if any navigation or deep link exists) */}
                      <div className="mt-3 flex flex-wrap items-center gap-2.5">
                        {item.linkTab && (
                          <button
                            onClick={() => {
                              onMarkAsRead(item.id);
                              onNavigateTab(item.linkTab!);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all"
                          >
                            <span>{item.actionLabel || 'বিস্তারিত দেখুন'}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => onMarkAsRead(item.id)}
                          className={`text-xs px-2.5 py-1.5 rounded-lg transition-colors border ${
                            isUnread
                              ? 'bg-[#22232c] text-neutral-300 hover:text-white border-[#323340]'
                              : 'bg-transparent text-neutral-500 hover:text-neutral-300 border-transparent'
                          }`}
                        >
                          {isUnread ? 'পড়া হয়েছে হিসেবে চিহ্নিত করুন' : 'পড়া হয়েছে ✓'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions: Delete button */}
                  <div className="shrink-0 flex items-center">
                    <button
                      onClick={() => onDeleteNotification(item.id)}
                      className="p-1.5 text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          /* Empty State */
          <div className="py-16 text-center bg-[#15161b] rounded-2xl border border-[#24252e] p-8">
            <div className="w-14 h-14 rounded-2xl bg-[#202129] border border-[#2c2d3a] flex items-center justify-center mx-auto mb-3.5 text-neutral-400">
              <Bell className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              {searchQuery ? 'কোনো ফলাফল পাওয়া যায়নি' : 'কোনো নোটিফিকেশন নেই'}
            </h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-4">
              {searchQuery
                ? 'আপনার সার্চ কুয়েরির সাথে মিল পাওয়া কোনো নোটিফিকেশন নেই।'
                : 'সব নোটিফিকেশন পড়া হয়ে গেছে অথবা ক্লিয়ার করা হয়েছে। নতুন কোনো অর্ডার বা আপডেট আসলে সাথে সাথে এখানে চলে আসবে!'}
            </p>
            <div className="flex items-center justify-center gap-3">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3.5 py-2 bg-[#22232c] text-neutral-300 hover:text-white rounded-xl text-xs font-semibold"
                >
                  সার্চ মুছুন
                </button>
              )}
              <button
                onClick={() => onAddTestNotification()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>টেস্ট নোটিফিকেশন তৈরি করুন</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Simulator Card to satisfy "jate kore je kno notificetion okhane ase" */}
      <div className="mt-8 p-4 rounded-xl bg-[#14151a] border border-[#24252d] text-xs text-neutral-400">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-neutral-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            লাইভ নোটিফিকেশন সিমুলেশন
          </span>
          <span className="text-[11px] text-emerald-400">অটো-সিঙ্ক সক্রিয়</span>
        </div>
        <p className="text-[11px] text-neutral-400 mb-3">
          যেকোনো সময় প্ল্যাটফর্মে প্রোডাক্ট যুক্ত করা, কার্টে আইটেম রাখা, চ্যাট মেসেজ অথবা অর্ডার সম্পন্ন হলে সরাসরি এই নোটিফিকেশন সেন্টারে ইনস্ট্যান্ট এলার্ট যুক্ত হয়। নিচের বাটনগুলো দিয়ে টেস্ট করতে পারেন:
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onAddTestNotification('order')}
            className="px-2.5 py-1.5 bg-[#1e1f27] hover:bg-[#282a35] text-emerald-400 border border-emerald-500/20 rounded-lg text-[11px] font-medium"
          >
            + অর্ডার নোটিফিকেশন
          </button>
          <button
            onClick={() => onAddTestNotification('product')}
            className="px-2.5 py-1.5 bg-[#1e1f27] hover:bg-[#282a35] text-sky-400 border border-sky-500/20 rounded-lg text-[11px] font-medium"
          >
            + প্রোডাক্ট পোস্ট নোটিফিকেশন
          </button>
          <button
            onClick={() => onAddTestNotification('live')}
            className="px-2.5 py-1.5 bg-[#1e1f27] hover:bg-[#282a35] text-rose-400 border border-rose-500/20 rounded-lg text-[11px] font-medium"
          >
            + লাইভ বাজার এলার্ট
          </button>
          <button
            onClick={() => onAddTestNotification('chat')}
            className="px-2.5 py-1.5 bg-[#1e1f27] hover:bg-[#282a35] text-teal-400 border border-teal-500/20 rounded-lg text-[11px] font-medium"
          >
            + কাস্টমার মেসেজ নোটিফিকেশন
          </button>
        </div>
      </div>
    </div>
  );
};
