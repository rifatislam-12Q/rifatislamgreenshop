import React from 'react';
import {
  ShoppingBag,
  User,
  LayoutDashboard,
  Radio,
  Store,
  Film,
  Handshake,
  TrendingUp,
  MessageSquare,
  Bell,
  X,
} from 'lucide-react';
import { SidebarTab } from '../types';

interface SidebarProps {
  activeTab: SidebarTab;
  onSelectTab: (tab: SidebarTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  unreadChatCount?: number;
  unreadNotificationCount?: number;
}

interface NavItem {
  id: SidebarTab;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  unreadChatCount = 2,
  unreadNotificationCount = 0,
}) => {
  const navItems: NavItem[] = [
    { id: 'home', label: 'Marketplace', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'live-bazar',
      label: 'Live Bazar',
      icon: Radio,
      badge: 'LIVE',
      badgeColor: 'bg-red-500/20 text-red-400 border border-red-500/30',
    },
    { id: 'local-market', label: 'Local Market', icon: Store },
    {
      id: 'video',
      label: 'Video',
      icon: Film,
      badge: 'REELS',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    },
    { id: 'business-deal', label: 'Business Deal', icon: Handshake },
    { id: 'tracking', label: 'Tracking', icon: TrendingUp },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: unreadNotificationCount > 0 ? unreadNotificationCount : undefined,
      badgeColor: 'bg-rose-500 text-white font-bold',
    },
    {
      id: 'chat',
      label: 'Chat',
      icon: MessageSquare,
      badge: unreadChatCount > 0 ? unreadChatCount : undefined,
      badgeColor: 'bg-emerald-500 text-black font-bold',
    },
  ];

  const handleItemClick = (id: SidebarTab) => {
    onSelectTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="main-sidebar"
        className={`fixed lg:sticky top-0 lg:top-[61px] left-0 z-50 lg:z-10 h-screen lg:h-[calc(100vh-61px)] w-60 sm:w-64 bg-[#111113] border-r border-[#202025] flex flex-col transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile Header in Drawer */}
        <div className="flex items-center justify-between p-4 border-b border-[#202025] lg:hidden">
          <span className="font-bold text-base text-white">GreenShop Menu</span>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-md text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                  isActive
                    ? 'bg-[#222329] text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-[#19191d]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-emerald-400'
                        : 'text-neutral-400 group-hover:text-neutral-200'
                    }`}
                  />
                  <span className={isActive ? 'font-semibold text-white' : ''}>
                    {item.label}
                  </span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      item.badgeColor || 'bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
};
