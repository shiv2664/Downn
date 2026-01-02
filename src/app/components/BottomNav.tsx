import { House, Search, Plus, Bell, User } from 'lucide-react';

interface BottomNavProps {
  onCreateClick?: () => void;
  onProfileClick?: () => void;
  onExploreClick?: () => void;
  onHomeClick?: () => void;
  onNotificationsClick?: () => void;
  activeTab?: 'home' | 'explore' | 'notifications' | 'profile';
  unreadCount?: number;
}

export function BottomNav({
  onCreateClick,
  onProfileClick,
  onExploreClick,
  onHomeClick,
  onNotificationsClick,
  activeTab = 'home',
  unreadCount = 0
}: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50 safe-area-inset-bottom z-30">
      <div className="max-w-md mx-auto px-6 py-3 flex items-center justify-between">

        <button
          onClick={onHomeClick}
          className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${
            activeTab === 'home'
              ? 'text-purple-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <House className="w-6 h-6" fill={activeTab === 'home' ? 'currentColor' : 'none'} />
          <span className="text-xs font-medium">Home</span>
        </button>

        <button
          onClick={onExploreClick}
          className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${
            activeTab === 'explore'
              ? 'text-purple-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <Search className="w-6 h-6" />
          <span className="text-xs font-medium">Explore</span>
        </button>

        <button
          onClick={onCreateClick}
          className="flex flex-col items-center gap-1 -mt-6 transition-transform active:scale-90"
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50 ring-4 ring-slate-900">
            <Plus className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
        </button>

        <button
          onClick={onNotificationsClick}
          className={`flex flex-col items-center gap-1 transition-all active:scale-90 relative ${
            activeTab === 'notifications'
              ? 'text-purple-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <Bell className="w-6 h-6" fill={activeTab === 'notifications' ? 'currentColor' : 'none'} />
          <span className="text-xs font-medium">Alerts</span>

          {unreadCount > 0 && (
            <div className="absolute -top-1 right-0 w-5 h-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-xs font-bold text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            </div>
          )}
        </button>

        <button
          onClick={onProfileClick}
          className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${
            activeTab === 'profile'
              ? 'text-purple-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">Profile</span>
        </button>

      </div>
    </nav>
  );
}
