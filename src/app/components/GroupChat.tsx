import { useState } from 'react';
import { ChevronLeft, Send, Smile, Image, MapPin, Clock, Users, EllipsisVertical, Pin } from 'lucide-react';

interface Activity {
  id: number;
  title: string;
  categoryColor: string;
  categoryIcon: React.ReactNode;
  datetime?: string;
  location?: string;
  participantCount: number;
}

interface GroupChatProps {
  activity: Activity;
  onClose: () => void;
}

interface Message {
  id: number;
  userId: number;
  userName: string;
  avatar: string;
  message: string;
  timestamp: string;
  isCurrentUser?: boolean;
}

const mockMessages: Message[] = [
  {
    id: 1,
    userId: 2,
    userName: 'Sarah K.',
    avatar: 'https://images.unsplash.com/photo-1638996030249-abc99a735463?w=100',
    message: "Hey everyone! Super excited for this! 🎉",
    timestamp: '10:23 AM',
  },
  {
    id: 2,
    userId: 3,
    userName: 'Mike R.',
    avatar: 'https://images.unsplash.com/photo-1567516364473-233c4b6fcfbe?w=100',
    message: "Same here! Should I bring anything?",
    timestamp: '10:25 AM',
  },
  {
    id: 3,
    userId: 1,
    userName: 'You',
    avatar: 'https://images.unsplash.com/flagged/photo-1596479042555-9265a7fa7983?w=100',
    message: "Just bring yourself! We're all set ✨",
    timestamp: '10:27 AM',
    isCurrentUser: true,
  },
  {
    id: 4,
    userId: 4,
    userName: 'Emma L.',
    avatar: 'https://images.unsplash.com/photo-1763328719057-ff6b03c816d0?w=100',
    message: "What time are we meeting exactly?",
    timestamp: '10:30 AM',
  },
  {
    id: 5,
    userId: 1,
    userName: 'You',
    avatar: 'https://images.unsplash.com/flagged/photo-1596479042555-9265a7fa7983?w=100',
    message: "3:00 PM at the main entrance!",
    timestamp: '10:31 AM',
    isCurrentUser: true,
  },
  {
    id: 6,
    userId: 5,
    userName: 'Tom W.',
    avatar: 'https://images.unsplash.com/photo-1661326515801-68c8c192a735?w=100',
    message: "Perfect! See you all there 👍",
    timestamp: '10:35 AM',
  },
];

const quickReplies = [
  { id: 1, icon: <MapPin className="w-4 h-4" />, text: "Share location" },
  { id: 2, icon: <Clock className="w-4 h-4" />, text: "I'm on my way!" },
  { id: 3, text: "Running 5 min late" },
  { id: 4, text: "I'm here! 👋" },
];

export function GroupChat({ activity, onClose }: GroupChatProps) {
  const [message, setMessage] = useState('');
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [isTyping, setIsTyping] = useState(true);

  const handleSend = () => {
    if (message.trim()) {
      // In a real app, send message to backend
      setMessage('');
    }
  };

  const handleQuickReply = (reply: string) => {
    setMessage(reply);
    setShowQuickReplies(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header with Pinned Activity Info */}
      <div className="bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 shadow-sm">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-slate-800 flex items-center justify-center active:scale-95 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-xl ${activity.categoryColor} flex items-center justify-center shadow-sm`}>
                {activity.categoryIcon}
              </div>
              <div>
                <h1 className="font-bold text-white">{activity.title}</h1>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Users className="w-3 h-3" />
                  <span>{activity.participantCount} members</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full hover:bg-slate-800 flex items-center justify-center active:scale-95 transition-all">
            <EllipsisVertical className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        {/* Pinned Activity Details */}
        <div className="px-4 pb-3">
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-3 border border-purple-500/30 backdrop-blur-sm">
            <div className="flex items-start gap-2">
              <Pin className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-purple-300 mb-1">Activity Details</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Today at 3:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Downtown Café, 0.3 mi away</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-slate-950">
        {mockMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.isCurrentUser ? 'flex-row-reverse' : ''}`}
          >
            {!msg.isCurrentUser && (
              <img
                src={msg.avatar}
                alt={msg.userName}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-2 ring-slate-700"
              />
            )}
            <div className={`flex flex-col ${msg.isCurrentUser ? 'items-end' : 'items-start'} max-w-[75%]`}>
              {!msg.isCurrentUser && (
                <span className="text-xs font-medium text-slate-400 mb-1 px-1">
                  {msg.userName}
                </span>
              )}
              <div
                className={`rounded-2xl px-4 py-2.5 ${
                  msg.isCurrentUser
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-md shadow-lg'
                    : 'bg-slate-800 text-slate-100 rounded-bl-md shadow-sm border border-slate-700/50'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.message}</p>
              </div>
              <span className="text-xs text-slate-500 mt-1 px-1">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <img
              src="https://images.unsplash.com/photo-1661326515801-68c8c192a735?w=100"
              alt="Lisa M."
              className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-2 ring-slate-700"
            />
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium text-slate-400 mb-1 px-1">Lisa M.</span>
              <div className="bg-slate-800 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-slate-700/50">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Replies */}
      {showQuickReplies && (
        <div className="px-4 py-3 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {quickReplies.map((reply) => (
              <button
                key={reply.id}
                onClick={() => handleQuickReply(reply.text)}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 border border-purple-500/30 rounded-full text-sm font-medium hover:from-purple-600/30 hover:to-pink-600/30 active:scale-95 transition-all whitespace-nowrap"
              >
                {reply.icon}
                {reply.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50 px-4 py-3 shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex items-end gap-2">
            <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 active:scale-95 transition-all flex-shrink-0">
              <Image className="w-5 h-5 text-slate-300" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="w-full px-4 py-3 pr-12 bg-slate-800 text-white placeholder-slate-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500 border border-slate-700 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full hover:bg-slate-700 flex items-center justify-center active:scale-95 transition-all">
                <Smile className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className={`w-12 h-12 rounded-full flex items-center justify-center active:scale-95 transition-all shadow-lg flex-shrink-0 ${
                message.trim()
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-purple-500/50'
                  : 'bg-slate-800'
              }`}
            >
              <Send className={`w-5 h-5 ${message.trim() ? 'text-white' : 'text-slate-600'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}