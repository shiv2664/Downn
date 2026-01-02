import { ChevronLeft, MapPin, Users, Clock, MessageCircle, Share, Calendar } from 'lucide-react';

interface Activity {
  id: number;
  avatar: string;
  userName: string;
  title: string;
  timePosted: string;
  distance: string;
  categoryIcon: React.ReactNode;
  categoryColor: string;
  participantCount: number;
  gradient: string;
  images?: string[];
  description?: string;
  datetime?: string;
  location?: string;
}

interface ActivityDetailProps {
  activity: Activity;
  onClose: () => void;
  onOpenChat: () => void;
}

// Mock participants data
const mockParticipants = [
  { id: 1, name: 'Sarah K.', avatar: 'https://images.unsplash.com/photo-1638996030249-abc99a735463?w=100' },
  { id: 2, name: 'Mike R.', avatar: 'https://images.unsplash.com/photo-1567516364473-233c4b6fcfbe?w=100' },
  { id: 3, name: 'Emma L.', avatar: 'https://images.unsplash.com/flagged/photo-1596479042555-9265a7fa7983?w=100' },
  { id: 4, name: 'Tom W.', avatar: 'https://images.unsplash.com/photo-1763328719057-ff6b03c816d0?w=100' },
  { id: 5, name: 'Lisa M.', avatar: 'https://images.unsplash.com/photo-1661326515801-68c8c192a735?w=100' },
];

// Mock chat messages
const mockChats = [
  { id: 1, user: 'Sarah K.', message: "Can't wait for this! 🎉", time: '2m ago' },
  { id: 2, user: 'Mike R.', message: 'Should I bring anything?', time: '5m ago' },
];

export function ActivityDetail({ activity, onClose, onOpenChat }: ActivityDetailProps) {
  const headerImage = activity.images?.[0] || 'https://images.unsplash.com/photo-1668884405041-aa8963908538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080';

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
      {/* Header Image with Overlay */}
      <div className="relative h-64">
        <img
          src={headerImage}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all">
            <Share className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-20 right-4">
          <div className={`w-14 h-14 rounded-2xl ${activity.categoryColor} flex items-center justify-center shadow-lg`}>
            {activity.categoryIcon}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto">
        {/* Title Section */}
        <div className="px-5 py-6">
          <h1 className="text-3xl font-bold text-white mb-3">{activity.title}</h1>
          
          {/* Info Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/20 rounded-full border border-purple-500/30">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Today, 3:00 PM</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 rounded-full border border-blue-500/30">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">{activity.distance}</span>
            </div>
          </div>
        </div>

        {/* Host Profile */}
        <div className="px-5 pb-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-4 border border-slate-700/50">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Hosted by</p>
            <div className="flex items-center gap-3">
              <img
                src={activity.avatar}
                alt={activity.userName}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/50"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-white">{activity.userName}</h3>
                <p className="text-sm text-slate-400">Member since 2024</p>
              </div>
              <button className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-full text-sm font-medium text-slate-200 hover:bg-slate-700 active:scale-95 transition-all">
                View Profile
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-5 pb-6">
          <h2 className="text-lg font-bold text-white mb-3">About</h2>
          <p className="text-slate-300 leading-relaxed">
            {activity.description || "Join us for an amazing time! This is going to be a great opportunity to meet new people and have fun together. Everyone is welcome! 🌟"}
          </p>
        </div>

        {/* Participants */}
        <div className="px-5 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">
              Participants ({activity.participantCount})
            </h2>
            <button className="text-sm font-medium text-purple-400">See all</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {mockParticipants.slice(0, activity.participantCount).map((participant) => (
              <div key={participant.id} className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                  <img
                    src={participant.avatar}
                    alt={participant.name}
                    className="w-full h-full rounded-full object-cover border-2 border-slate-900"
                  />
                </div>
                <p className="text-xs text-center mt-1.5 font-medium text-slate-300">{participant.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Preview */}
        <div className="px-5 pb-6">
          <h2 className="text-lg font-bold text-white mb-3">Location</h2>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl h-48 relative overflow-hidden border border-slate-700/50">
            {/* Mock map - in a real app, use Google Maps or similar */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-green-900/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-slate-800 rounded-2xl px-4 py-3 shadow-lg border border-slate-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-400 fill-red-400" />
                  <div>
                    <p className="font-semibold text-sm text-white">Downtown Café</p>
                    <p className="text-xs text-slate-400">{activity.distance}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Preview */}
        <div className="px-5 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-white">Group Chat</h2>
            <span className="text-xs font-medium text-slate-400">{mockChats.length} messages</span>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-4 space-y-3 border border-slate-700/50">
            {mockChats.map((chat) => (
              <div key={chat.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-sm text-white">{chat.user}</span>
                    <span className="text-xs text-slate-400">{chat.time}</span>
                  </div>
                  <p className="text-sm text-slate-300 mt-0.5">{chat.message}</p>
                </div>
              </div>
            ))}
            <button className="w-full text-center text-sm font-medium text-purple-400 pt-2">
              View all messages
            </button>
          </div>
        </div>

        <div className="h-24" /> {/* Bottom spacing for fixed buttons */}
      </div>

      {/* Bottom Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50 p-5 shadow-2xl">
        <div className="max-w-md mx-auto flex gap-3">
          <button 
            onClick={onOpenChat}
            className="flex-1 py-4 bg-slate-800 border-2 border-purple-500 text-purple-400 rounded-2xl font-bold hover:bg-slate-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            CHAT
          </button>
          <button className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-500/50 active:scale-[0.98] transition-all">
            JOIN ACTIVITY
          </button>
        </div>
      </div>
    </div>
  );
}