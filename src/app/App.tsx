import { ActivityCard } from './components/ActivityCard';
import { BottomNav } from './components/BottomNav';
import { CreateActivity } from './components/CreateActivity';
import { ActivityDetail } from './components/ActivityDetail';
import { GroupChat } from './components/GroupChat';
import { UserProfile } from './components/UserProfile';
import { Explore } from './components/Explore';
import { Notifications } from './components/Notifications';
import { Coffee, Dumbbell, Music, MapPin } from 'lucide-react';
import { useState } from 'react';

const activities = [
  {
    id: 1,
    avatar: 'https://images.unsplash.com/photo-1638996030249-abc99a735463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwcGVyc29ufGVufDF8fHx8MTc2NzIwMDczM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    userName: 'Alex Rivera',
    title: 'Morning Coffee Run ☕',
    timePosted: '15 min ago',
    distance: '0.3 mi away',
    categoryIcon: <Coffee className="w-6 h-6 text-white" />,
    categoryColor: 'bg-amber-500',
    participantCount: 3,
    gradient: 'bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600',
    images: ['https://images.unsplash.com/photo-1627741162666-c588fc1689da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwYWVzdGhldGljfGVufDF8fHx8MTc2NzE5MDEwOHww&ixlib=rb-4.1.0&q=80&w=1080'],
  },
  {
    id: 2,
    avatar: 'https://images.unsplash.com/photo-1567516364473-233c4b6fcfbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdpcmwlMjBzbWlsaW5nfGVufDF8fHx8MTc2NzI4NDA1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    userName: 'Maya Chen',
    title: 'Sunset Workout Session 💪',
    timePosted: '32 min ago',
    distance: '0.8 mi away',
    categoryIcon: <Dumbbell className="w-6 h-6 text-white" />,
    categoryColor: 'bg-blue-500',
    participantCount: 7,
    gradient: 'bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600',
    images: [
      'https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrb3V0JTIwZ3ltJTIwZml0bmVzc3xlbnwxfHx8fDE3NjcyODU0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
  },
  {
    id: 3,
    avatar: 'https://images.unsplash.com/flagged/photo-1596479042555-9265a7fa7983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NzE2MDkwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    userName: 'Jordan Lee',
    title: 'Live Music @ The Vault 🎵',
    timePosted: '1 hr ago',
    distance: '1.2 mi away',
    categoryIcon: <Music className="w-6 h-6 text-white" />,
    categoryColor: 'bg-green-500',
    participantCount: 12,
    gradient: 'bg-gradient-to-br from-green-400 via-teal-500 to-blue-600',
    images: ['https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBjb25jZXJ0fGVufDF8fHx8MTc2NzI4NTQ3MHww&ixlib=rb-4.1.0&q=80&w=1080'],
  },
  {
    id: 4,
    avatar: 'https://images.unsplash.com/photo-1763328719057-ff6b03c816d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIweW91bmclMjBwZW9wbGV8ZW58MXx8fHwxNzY3Mjg0MDUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    userName: 'Sam Park',
    title: 'Downtown Food Crawl 🍕',
    timePosted: '2 hr ago',
    distance: '0.5 mi away',
    categoryIcon: <MapPin className="w-6 h-6 text-white" />,
    categoryColor: 'bg-red-500',
    participantCount: 5,
    gradient: 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600',
    images: ['https://images.unsplash.com/photo-1693743387915-7d190a0e636f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcmVzdGF1cmFudCUyMHRhYmxlfGVufDF8fHx8MTc2NzI4NTQ3MHww&ixlib=rb-4.1.0&q=80&w=1080'],
  },
];

export default function App() {
  const [showCreateActivity, setShowCreateActivity] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<typeof activities[0] | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'notifications'>('home');

  const handleOpenChat = () => {
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  const handleCloseDetail = () => {
    setSelectedActivity(null);
    setShowChat(false);
  };

  const handleExploreActivityClick = (activity: any) => {
    // Convert explore activity to the format expected by ActivityDetail
    const convertedActivity = {
      id: activity.id,
      avatar: activity.avatar,
      userName: activity.userName,
      title: activity.title,
      timePosted: activity.timePosted,
      distance: activity.distance,
      categoryIcon: activity.categoryIcon,
      categoryColor: activity.categoryColor,
      participantCount: activity.participantCount,
      gradient: activity.gradient,
    };
    setSelectedActivity(convertedActivity);
  };

  const handleNotificationClick = (notification: any) => {
    // Handle different notification types
    if (notification.type === 'message') {
      // Could open the chat for that activity
    } else if (notification.type === 'invite' || notification.type === 'reminder') {
      // Could open the activity detail
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {activeTab === 'home' && (
        <>
          {/* Header */}
          <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
            <div className="max-w-md mx-auto px-5 py-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Nearby Activities
              </h1>
              <p className="text-slate-400 text-sm">Discover what's happening around you</p>
            </div>
          </header>

          {/* Activity Feed */}
          <main className="max-w-md mx-auto px-5 pt-6 pb-24">
            {activities.map((activity) => (
              <ActivityCard 
                key={activity.id} 
                {...activity} 
                onClick={() => setSelectedActivity(activity)}
              />
            ))}
          </main>
        </>
      )}

      {activeTab === 'explore' && (
        <Explore onActivityClick={handleExploreActivityClick} />
      )}

      {activeTab === 'notifications' && (
        <Notifications onNotificationClick={handleNotificationClick} />
      )}

      {/* Bottom Navigation */}
      <BottomNav 
        activeTab={activeTab}
        onHomeClick={() => setActiveTab('home')}
        onExploreClick={() => setActiveTab('explore')}
        onNotificationsClick={() => setActiveTab('notifications')}
        onCreateClick={() => setShowCreateActivity(true)}
        onProfileClick={() => setShowProfile(true)}
        unreadCount={4}
      />

      {/* Create Activity Modal */}
      {showCreateActivity && (
        <CreateActivity onClose={() => setShowCreateActivity(false)} />
      )}

      {/* Activity Detail Modal */}
      {selectedActivity && !showChat && (
        <ActivityDetail 
          activity={selectedActivity} 
          onClose={handleCloseDetail}
          onOpenChat={handleOpenChat}
        />
      )}

      {/* Group Chat Modal */}
      {selectedActivity && showChat && (
        <GroupChat 
          activity={selectedActivity} 
          onClose={handleCloseChat}
        />
      )}

      {/* User Profile Modal */}
      {showProfile && (
        <UserProfile onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
}