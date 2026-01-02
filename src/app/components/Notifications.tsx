import { useState } from 'react';
import { BellRing, UserPlus, MessageCircle, Heart, MapPin, Calendar, Award, TrendingUp, Check, X } from 'lucide-react';

interface NotificationsProps {
  onNotificationClick?: (notification: Notification) => void;
}

interface Notification {
  id: number;
  type: 'invite' | 'follow' | 'message' | 'like' | 'reminder' | 'achievement' | 'trending';
  title: string;
  description: string;
  time: string;
  avatar?: string;
  icon: React.ReactNode;
  iconBg: string;
  gradient: string;
  isUnread: boolean;
  actionable?: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: 'invite',
    title: 'Sarah invited you to join',
    description: 'Beach Sunset Vibes happening tonight at 7 PM',
    time: '5 min ago',
    avatar: 'https://images.unsplash.com/photo-1566330429822-c413e4bc27a5?w=100',
    icon: <MapPin className="w-5 h-5 text-white" />,
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
    gradient: 'from-purple-400 to-pink-500',
    isUnread: true,
    actionable: true,
  },
  {
    id: 2,
    type: 'follow',
    title: 'Alex Rivera started following you',
    description: 'Check out their profile and follow back!',
    time: '15 min ago',
    avatar: 'https://images.unsplash.com/photo-1638996030249-abc99a735463?w=100',
    icon: <UserPlus className="w-5 h-5 text-white" />,
    iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    gradient: 'from-blue-400 to-cyan-500',
    isUnread: true,
    actionable: true,
  },
  {
    id: 3,
    type: 'message',
    title: 'New message in Coffee Crawl',
    description: 'Jordan: "See you all at 3pm! Can\'t wait 🎉"',
    time: '32 min ago',
    avatar: 'https://images.unsplash.com/flagged/photo-1596479042555-9265a7fa7983?w=100',
    icon: <MessageCircle className="w-5 h-5 text-white" />,
    iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500',
    gradient: 'from-green-400 to-emerald-500',
    isUnread: true,
    actionable: false,
  },
  {
    id: 4,
    type: 'reminder',
    title: 'Activity starting in 1 hour',
    description: 'Morning Coffee Run with Alex and 2 others',
    time: '1 hr ago',
    icon: <Calendar className="w-5 h-5 text-white" />,
    iconBg: 'bg-gradient-to-br from-orange-500 to-amber-500',
    gradient: 'from-orange-400 to-amber-500',
    isUnread: true,
    actionable: false,
  },
  {
    id: 5,
    type: 'like',
    title: 'Maya and 12 others liked your activity',
    description: 'Downtown Food Crawl is getting popular!',
    time: '2 hr ago',
    avatar: 'https://images.unsplash.com/photo-1567516364473-233c4b6fcfbe?w=100',
    icon: <Heart className="w-5 h-5 text-white fill-white" />,
    iconBg: 'bg-gradient-to-br from-pink-500 to-rose-500',
    gradient: 'from-pink-400 to-rose-500',
    isUnread: false,
    actionable: false,
  },
  {
    id: 6,
    type: 'achievement',
    title: 'Achievement Unlocked: Social Butterfly! 🦋',
    description: 'You\'ve joined 50 activities this month',
    time: '3 hr ago',
    icon: <Award className="w-5 h-5 text-white" />,
    iconBg: 'bg-gradient-to-br from-yellow-500 to-orange-500',
    gradient: 'from-yellow-400 to-orange-500',
    isUnread: false,
    actionable: false,
  },
  {
    id: 7,
    type: 'trending',
    title: 'Trending near you: Rooftop Yoga 🧘‍♀️',
    description: '24 people are interested. Join before it fills up!',
    time: '5 hr ago',
    icon: <TrendingUp className="w-5 h-5 text-white" />,
    iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-500',
    gradient: 'from-indigo-400 to-purple-500',
    isUnread: false,
    actionable: false,
  },
  {
    id: 8,
    type: 'follow',
    title: 'Tom Wilson started following you',
    description: 'You have 5 mutual friends',
    time: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1661326515801-68c8c192a735?w=100',
    icon: <UserPlus className="w-5 h-5 text-white" />,
    iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    gradient: 'from-blue-400 to-cyan-500',
    isUnread: false,
    actionable: true,
  },
  {
    id: 9,
    type: 'message',
    title: 'New message in Live Music Group',
    description: 'Emma: "This band is amazing! 🎸"',
    time: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1763328719057-ff6b03c816d0?w=100',
    icon: <MessageCircle className="w-5 h-5 text-white" />,
    iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500',
    gradient: 'from-green-400 to-emerald-500',
    isUnread: false,
    actionable: false,
  },
  {
    id: 10,
    type: 'like',
    title: '8 new reactions to your activity',
    description: 'Sunset Workout Session',
    time: '2 days ago',
    icon: <Heart className="w-5 h-5 text-white fill-white" />,
    iconBg: 'bg-gradient-to-br from-pink-500 to-rose-500',
    gradient: 'from-pink-400 to-rose-500',
    isUnread: false,
    actionable: false,
  },
];

export function Notifications({ onNotificationClick }: NotificationsProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notificationList, setNotificationList] = useState(notifications);

  const filteredNotifications = filter === 'unread' 
    ? notificationList.filter(n => n.isUnread) 
    : notificationList;

  // Group notifications by time
  const todayNotifications = filteredNotifications.filter(n => 
    n.time.includes('min ago') || n.time.includes('hr ago')
  );
  const yesterdayNotifications = filteredNotifications.filter(n => 
    n.time === 'Yesterday'
  );
  const earlierNotifications = filteredNotifications.filter(n => 
    n.time.includes('days ago')
  );

  const handleAccept = (id: number) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
  };

  const handleDecline = (id: number) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  const unreadCount = notificationList.filter(n => n.isUnread).length;

  const renderNotification = (notification: Notification) => (
    <div
      key={notification.id}
      onClick={() => onNotificationClick?.(notification)}
      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border-2 ${
        notification.isUnread ? 'border-purple-200' : 'border-gray-100'
      }`}
    >
      <div className="p-4">
        <div className="flex gap-3">
          {/* Icon or Avatar */}
          <div className="flex-shrink-0">
            {notification.avatar ? (
              <div className="relative">
                <img
                  src={notification.avatar}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${notification.iconBg} flex items-center justify-center shadow-lg`}>
                  {notification.icon}
                </div>
              </div>
            ) : (
              <div className={`w-12 h-12 rounded-2xl ${notification.iconBg} flex items-center justify-center shadow-lg`}>
                {notification.icon}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className={`font-bold text-gray-900 ${notification.isUnread ? 'text-gray-900' : 'text-gray-700'}`}>
                {notification.title}
              </h3>
              {notification.isUnread && (
                <div className="w-2.5 h-2.5 bg-purple-600 rounded-full flex-shrink-0 mt-1.5"></div>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-1 line-clamp-2">
              {notification.description}
            </p>
            <p className="text-xs text-gray-500 font-medium">{notification.time}</p>

            {/* Action Buttons */}
            {notification.actionable && (
              <div className="flex gap-2 mt-3">
                {notification.type === 'invite' && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAccept(notification.id);
                      }}
                      className={`flex-1 py-2 bg-gradient-to-r ${notification.gradient} text-white rounded-xl font-semibold text-sm hover:shadow-lg active:scale-[0.98] transition-all`}
                    >
                      Accept
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDecline(notification.id);
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 active:scale-[0.98] transition-all"
                    >
                      Decline
                    </button>
                  </>
                )}
                {notification.type === 'follow' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAccept(notification.id);
                    }}
                    className={`flex-1 py-2 bg-gradient-to-r ${notification.gradient} text-white rounded-xl font-semibold text-sm hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-1`}
                  >
                    <UserPlus className="w-4 h-4" />
                    Follow Back
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-purple-50 to-pink-50 min-h-screen overflow-y-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-md mx-auto px-5 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BellRing className="w-7 h-7 text-purple-600" />
                Notifications
              </h1>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold hover:bg-purple-200 active:scale-95 transition-all"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                filter === 'unread'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  filter === 'unread' ? 'bg-white/25' : 'bg-purple-600 text-white'
                }`}>
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-md mx-auto px-5 pt-6 pb-6">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BellRing className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">All caught up! 🎉</h3>
            <p className="text-gray-600">You have no {filter === 'unread' ? 'unread' : ''} notifications</p>
          </div>
        ) : (
          <>
            {/* Today */}
            {todayNotifications.length > 0 && (
              <div className="mb-6">
                <h2 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-3 px-1">
                  Today
                </h2>
                <div className="space-y-3">
                  {todayNotifications.map(renderNotification)}
                </div>
              </div>
            )}

            {/* Yesterday */}
            {yesterdayNotifications.length > 0 && (
              <div className="mb-6">
                <h2 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-3 px-1">
                  Yesterday
                </h2>
                <div className="space-y-3">
                  {yesterdayNotifications.map(renderNotification)}
                </div>
              </div>
            )}

            {/* Earlier */}
            {earlierNotifications.length > 0 && (
              <div className="mb-6">
                <h2 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-3 px-1">
                  Earlier
                </h2>
                <div className="space-y-3">
                  {earlierNotifications.map(renderNotification)}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Quick Stats Card */}
      {filteredNotifications.length > 0 && (
        <div className="max-w-md mx-auto px-5 pb-6">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-white font-bold text-lg mb-4">This Week's Activity</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">12</div>
                <div className="text-xs text-purple-100">New Invites</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">28</div>
                <div className="text-xs text-purple-100">New Followers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">64</div>
                <div className="text-xs text-purple-100">Reactions</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}