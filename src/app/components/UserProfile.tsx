import { ChevronLeft, Settings, BadgeCheck, MapPin, Users, Star, Grid3x3, Heart, Pencil } from 'lucide-react';
import { useState } from 'react';

interface UserProfileProps {
  onClose: () => void;
}

interface PastActivity {
  id: number;
  image: string;
  title: string;
  participants: number;
  likes: number;
  date: string;
  location: string;
}

const interestTags = [
  { id: 1, name: '☕ Coffee', color: 'from-amber-400 to-orange-500' },
  { id: 2, name: '🏔️ Hiking', color: 'from-green-400 to-emerald-600' },
  { id: 3, name: '🎵 Live Music', color: 'from-purple-400 to-pink-500' },
  { id: 4, name: '🍕 Foodie', color: 'from-red-400 to-orange-500' },
  { id: 5, name: '🧘‍♀️ Yoga', color: 'from-blue-400 to-cyan-500' },
  { id: 6, name: '📸 Photography', color: 'from-indigo-400 to-purple-500' },
  { id: 7, name: '✈️ Travel', color: 'from-sky-400 to-blue-600' },
  { id: 8, name: '🎨 Art', color: 'from-pink-400 to-rose-500' },
];

const pastActivities: PastActivity[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1640350408899-9d432cc32bca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    title: 'Beach Sunset Vibes',
    participants: 8,
    likes: 24,
    date: 'Dec 28',
    location: 'Santa Monica',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1595368062405-e4d7840cba14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    title: 'Mountain Hiking',
    participants: 5,
    likes: 31,
    date: 'Dec 20',
    location: 'Yosemite',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1666999842177-682d314a0979?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    title: 'City Night Out',
    participants: 12,
    likes: 42,
    date: 'Dec 15',
    location: 'Downtown SF',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1614287681681-592fe09d78a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    title: 'Brunch Squad',
    participants: 6,
    likes: 18,
    date: 'Dec 10',
    location: 'Mission District',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1758274525134-4b1e9cc67dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    title: 'Morning Yoga',
    participants: 10,
    likes: 27,
    date: 'Dec 5',
    location: 'Golden Gate Park',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1627741162666-c588fc1689da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    title: 'Coffee Crawl',
    participants: 4,
    likes: 15,
    date: 'Dec 1',
    location: 'Hayes Valley',
  },
];

export function UserProfile({ onClose }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'recent' | 'stats'>('recent');

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
      {/* Floating Header */}
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-xl border-b border-white/50">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl hover:bg-white/80 flex items-center justify-center active:scale-95 transition-all shadow-sm"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-semibold hover:shadow-lg active:scale-95 transition-all">
              Follow
            </button>
            <button className="w-10 h-10 rounded-2xl hover:bg-white/80 flex items-center justify-center active:scale-95 transition-all shadow-sm">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Card Section */}
      <div className="max-w-md mx-auto px-5 pt-6 pb-6">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          {/* Cover Image with Gradient Overlay */}
          <div className="relative h-40 bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600')] bg-cover bg-center opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            
            {/* Floating Stats Bubbles */}
            <div className="absolute top-4 right-4 flex gap-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-sm text-gray-900">4.9</span>
                </div>
                <p className="text-xs text-gray-600">Host Score</p>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            {/* Profile Photo - Overlapping */}
            <div className="absolute -top-16 left-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 p-1.5 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1566330429822-c413e4bc27a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300"
                    alt="Sarah K."
                    className="w-full h-full rounded-[20px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl px-3 py-1 shadow-lg flex items-center gap-1">
                  <BadgeCheck className="w-4 h-4 text-white fill-white" />
                  <span className="text-xs font-bold text-white">Verified</span>
                </div>
              </div>
            </div>

            {/* Name & Location */}
            <div className="pt-20">
              <div className="mb-3">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Sarah Kim</h2>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Adventure seeker making friends one activity at a time ✨ Marathon runner & coffee enthusiast
                </p>
              </div>

              {/* Quick Stats Bar */}
              <div className="flex gap-2 mb-4">
                <div className="flex-1 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-3 text-center">
                  <div className="text-2xl font-bold text-gray-900">127</div>
                  <div className="text-xs text-gray-600 font-medium">Activities</div>
                </div>
                <div className="flex-1 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-3 text-center">
                  <div className="text-2xl font-bold text-gray-900">2.4K</div>
                  <div className="text-xs text-gray-600 font-medium">Friends</div>
                </div>
                <div className="flex-1 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-3 text-center">
                  <div className="text-2xl font-bold text-gray-900">89%</div>
                  <div className="text-xs text-gray-600 font-medium">Join Rate</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-lg active:scale-[0.98] transition-all">
                  Message
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-900 rounded-2xl font-semibold hover:bg-gray-200 active:scale-[0.98] transition-all">
                  <Users className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interests Section */}
      <div className="max-w-md mx-auto px-5 pb-6">
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-white/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-900">Interests & Vibes</h3>
            <button className="text-sm text-purple-600 font-semibold">Edit</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {interestTags.map((tag) => (
              <div
                key={tag.id}
                className={`px-4 py-2.5 bg-gradient-to-r ${tag.color} text-white rounded-2xl text-sm font-semibold shadow-md`}
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Carousel */}
      <div className="max-w-md mx-auto px-5 pb-6">
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-white/50">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Achievements</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
            <div className="flex-shrink-0 text-center w-24">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-xl mb-2 mx-auto transform hover:scale-110 transition-transform">
                <Star className="w-10 h-10 text-white fill-white" />
              </div>
              <p className="text-xs font-bold text-gray-900">Top Host</p>
              <p className="text-xs text-gray-500">Level 10</p>
            </div>
            <div className="flex-shrink-0 text-center w-24">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl mb-2 mx-auto transform hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-white" />
              </div>
              <p className="text-xs font-bold text-gray-900">Connector</p>
              <p className="text-xs text-gray-500">Level 8</p>
            </div>
            <div className="flex-shrink-0 text-center w-24">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl flex items-center justify-center shadow-xl mb-2 mx-auto transform hover:scale-110 transition-transform">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <p className="text-xs font-bold text-gray-900">Explorer</p>
              <p className="text-xs text-gray-500">100+ spots</p>
            </div>
            <div className="flex-shrink-0 text-center w-24">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center shadow-xl mb-2 mx-auto transform hover:scale-110 transition-transform">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <p className="text-xs font-bold text-gray-900">Most Loved</p>
              <p className="text-xs text-gray-500">500+ likes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Section */}
      <div className="max-w-md mx-auto px-5 pb-4">
        <div className="bg-white rounded-full p-1.5 shadow-xl border border-white/50 flex gap-1">
          <button
            onClick={() => setActiveTab('recent')}
            className={`flex-1 py-3 rounded-full font-semibold text-sm transition-all ${
              activeTab === 'recent'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Recent Activities
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-3 rounded-full font-semibold text-sm transition-all ${
              activeTab === 'stats'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            My Stats
          </button>
        </div>
      </div>

      {/* Content Based on Tab */}
      {activeTab === 'recent' && (
        <div className="max-w-md mx-auto px-5 pb-6 space-y-4">
          {pastActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer border border-white/50"
            >
              <div className="flex gap-4 p-4">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-24 h-24 rounded-2xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 mb-1 truncate">{activity.title}</h4>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 rounded-full">
                      <Users className="w-3.5 h-3.5 text-purple-600" />
                      <span className="text-xs font-semibold text-purple-700">{activity.participants}</span>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 bg-pink-100 rounded-full">
                      <Heart className="w-3.5 h-3.5 text-pink-600" />
                      <span className="text-xs font-semibold text-pink-700">{activity.likes}</span>
                    </div>
                    <span className="text-xs text-gray-500 ml-auto">{activity.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="max-w-md mx-auto px-5 pb-6 space-y-4">
          {/* Activity Breakdown */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-white/50">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Activity Breakdown</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Coffee Meetups</span>
                  <span className="text-sm font-bold text-purple-600">45</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Outdoor Adventures</span>
                  <span className="text-sm font-bold text-purple-600">32</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Nightlife & Events</span>
                  <span className="text-sm font-bold text-purple-600">28</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" style={{ width: '48%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Food & Dining</span>
                  <span className="text-sm font-bold text-purple-600">22</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-400 to-orange-500 rounded-full" style={{ width: '38%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Activity */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-white/50">
            <h3 className="font-bold text-lg text-gray-900 mb-4">This Month</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">18</div>
                <div className="text-xs text-gray-600 font-medium">Activities Joined</div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
                <div className="text-xs text-gray-600 font-medium">Activities Hosted</div>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">64</div>
                <div className="text-xs text-gray-600 font-medium">New Connections</div>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">142</div>
                <div className="text-xs text-gray-600 font-medium">Total Reactions</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile FAB */}
      <button className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-purple-500/50 active:scale-95 transition-all flex items-center justify-center">
        <Pencil className="w-7 h-7 text-white" />
      </button>
    </div>
  );
}