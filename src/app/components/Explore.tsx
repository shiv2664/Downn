import { useState, useRef } from 'react';
import { X, ChevronUp, Coffee, Music, MapPin, Users, SlidersHorizontal, Plane, Martini, Utensils } from 'lucide-react';

interface ExploreProps {
  onActivityClick?: (activity: MapActivity) => void;
}

interface MapActivity {
  id: number;
  title: string;
  userName: string;
  avatar: string;
  distance: string;
  participantCount: number;
  categoryIcon: React.ReactNode;
  categoryColor: string;
  gradient: string;
  timePosted: string;
  lat: number;
  lng: number;
  category: 'travel' | 'party' | 'food' | 'hobby';
}

const mapActivities: MapActivity[] = [
  {
    id: 1,
    title: 'Coffee Tasting Downtown',
    userName: 'Alex M.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    distance: '0.2 mi',
    participantCount: 4,
    categoryIcon: <Coffee className="w-4 h-4 text-white" />,
    categoryColor: 'bg-orange-500',
    gradient: 'from-orange-400 to-amber-500',
    timePosted: '30 min ago',
    lat: 37.7849,
    lng: -122.4094,
    category: 'food',
  },
  {
    id: 2,
    title: 'Live Jazz at Blue Note',
    userName: 'Sarah K.',
    avatar: 'https://images.unsplash.com/photo-1566330429822-c413e4bc27a5?w=100',
    distance: '0.5 mi',
    participantCount: 8,
    categoryIcon: <Music className="w-4 h-4 text-white" />,
    categoryColor: 'bg-purple-500',
    gradient: 'from-purple-400 to-pink-500',
    timePosted: '1 hour ago',
    lat: 37.7899,
    lng: -122.4114,
    category: 'party',
  },
  {
    id: 3,
    title: 'Golden Gate Bridge Walk',
    userName: 'Mike R.',
    avatar: 'https://images.unsplash.com/photo-1567516364473-233c4b6fcfbe?w=100',
    distance: '1.2 mi',
    participantCount: 6,
    categoryIcon: <Plane className="w-4 h-4 text-white" />,
    categoryColor: 'bg-blue-500',
    gradient: 'from-blue-400 to-cyan-500',
    timePosted: '2 hours ago',
    lat: 37.7799,
    lng: -122.4174,
    category: 'travel',
  },
  {
    id: 4,
    title: 'Rooftop Cocktails',
    userName: 'Emma L.',
    avatar: 'https://images.unsplash.com/photo-1763328719057-ff6b03c816d0?w=100',
    distance: '0.8 mi',
    participantCount: 10,
    categoryIcon: <Martini className="w-4 h-4 text-white" />,
    categoryColor: 'bg-pink-500',
    gradient: 'from-pink-400 to-rose-500',
    timePosted: '3 hours ago',
    lat: 37.7919,
    lng: -122.4054,
    category: 'party',
  },
  {
    id: 5,
    title: 'Dim Sum Brunch',
    userName: 'Tom W.',
    avatar: 'https://images.unsplash.com/photo-1661326515801-68c8c192a735?w=100',
    distance: '0.4 mi',
    participantCount: 5,
    categoryIcon: <Utensils className="w-4 h-4 text-white" />,
    categoryColor: 'bg-red-500',
    gradient: 'from-red-400 to-orange-500',
    timePosted: '4 hours ago',
    lat: 37.7879,
    lng: -122.4134,
    category: 'food',
  },
  {
    id: 6,
    title: 'Fisherman\'s Wharf Tour',
    userName: 'Lisa M.',
    avatar: 'https://images.unsplash.com/photo-1646845981790-f77fe7ece772?w=100',
    distance: '1.5 mi',
    participantCount: 7,
    categoryIcon: <Plane className="w-4 h-4 text-white" />,
    categoryColor: 'bg-teal-500',
    gradient: 'from-teal-400 to-cyan-500',
    timePosted: '5 hours ago',
    lat: 37.7949,
    lng: -122.4014,
    category: 'travel',
  },
];

const filterCategories = [
  { id: 'all', label: 'All', icon: null },
  { id: 'travel', label: 'Travel', icon: <Plane className="w-4 h-4" /> },
  { id: 'party', label: 'Party', icon: <Martini className="w-4 h-4" /> },
  { id: 'food', label: 'Food', icon: <Utensils className="w-4 h-4" /> },
  { id: 'hobby', label: 'Events', icon: <Music className="w-4 h-4" /> },
];

export function Explore({ onActivityClick }: ExploreProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedPin, setSelectedPin] = useState<number | null>(null);
  const [sheetHeight, setSheetHeight] = useState<'collapsed' | 'half' | 'full'>('collapsed');
  const startY = useRef(0);
  const currentHeight = useRef(0);

  const filteredActivities = selectedFilter === 'all' 
    ? mapActivities 
    : mapActivities.filter(a => a.category === selectedFilter);

  const handlePinClick = (activityId: number) => {
    setSelectedPin(activityId);
    setSheetHeight('half');
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const diff = startY.current - currentY;
    
    if (diff > 50 && sheetHeight === 'collapsed') {
      setSheetHeight('half');
    } else if (diff > 50 && sheetHeight === 'half') {
      setSheetHeight('full');
    } else if (diff < -50 && sheetHeight === 'full') {
      setSheetHeight('half');
    } else if (diff < -50 && sheetHeight === 'half') {
      setSheetHeight('collapsed');
    }
  };

  const getSheetClass = () => {
    switch (sheetHeight) {
      case 'full':
        return 'h-[85vh]';
      case 'half':
        return 'h-[50vh]';
      case 'collapsed':
        return 'h-32';
      default:
        return 'h-32';
    }
  };

  return (
    <div className="h-screen flex flex-col pb-16">
      {/* Map Container */}
      <div className="relative flex-1 overflow-hidden">
        {/* Map Background - Using styled image to simulate map */}
        <div className="absolute inset-0 bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1590393820812-8a2ed3ece96f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
            alt="Map"
            className="w-full h-full object-cover opacity-90"
          />
          {/* Map Overlay for Google Maps feel */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/30"></div>
        </div>

        {/* Filter Chips */}
        <div className="absolute top-4 left-0 right-0 z-10 px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filterCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedFilter(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap shadow-lg transition-all active:scale-95 ${
                  selectedFilter === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.icon}
                {category.label}
              </button>
            ))}
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap shadow-lg bg-white text-gray-700 hover:bg-gray-50 active:scale-95 transition-all">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Map Pins */}
        {filteredActivities.map((activity) => {
          // Convert lat/lng to pixel position (simplified for demo)
          const x = ((activity.lng + 122.42) / 0.02) * 100;
          const y = ((37.80 - activity.lat) / 0.02) * 100;

          return (
            <button
              key={activity.id}
              onClick={() => handlePinClick(activity.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-full transition-all duration-200 ${
                selectedPin === activity.id ? 'scale-125 z-20' : 'z-10 hover:scale-110'
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {/* Pin Shadow */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-black/30 rounded-full blur-sm"></div>
              
              {/* Pin */}
              <div className={`relative ${selectedPin === activity.id ? 'animate-bounce' : ''}`}>
                <div className={`w-12 h-12 rounded-full ${activity.categoryColor} shadow-xl border-4 border-white flex items-center justify-center`}>
                  {activity.categoryIcon}
                </div>
                {/* Pin Pointer */}
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] ${activity.categoryColor}`}></div>
                
                {/* Participant Count Badge */}
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-md">
                  {activity.participantCount}
                </div>
              </div>
            </button>
          );
        })}

        {/* Current Location Button */}
        <button className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all">
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
        </button>
      </div>

      {/* Bottom Sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transition-all duration-300 ${getSheetClass()}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        {/* Sheet Header */}
        <div className="px-5 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-xl text-gray-900">
                {filteredActivities.length} Activities Nearby
              </h2>
              <p className="text-sm text-gray-600">Tap a pin to see details</p>
            </div>
            {sheetHeight !== 'collapsed' && (
              <button
                onClick={() => setSheetHeight('collapsed')}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Activity Cards */}
        <div className="overflow-y-auto px-5 pb-6" style={{ maxHeight: 'calc(100% - 100px)' }}>
          <div className="space-y-3 pt-4">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                onClick={() => onActivityClick?.(activity)}
                className={`bg-white border-2 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer ${
                  selectedPin === activity.id
                    ? 'border-purple-600 shadow-lg shadow-purple-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <img
                      src={activity.avatar}
                      alt={activity.userName}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 truncate">
                            {activity.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {activity.userName} · {activity.timePosted}
                          </p>
                        </div>
                        <div className={`w-10 h-10 rounded-xl ${activity.categoryColor} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                          {activity.categoryIcon}
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm font-medium">{activity.distance}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span className="text-sm font-medium">{activity.participantCount} joined</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Join Button */}
                  <button className={`w-full mt-3 py-2.5 bg-gradient-to-r ${activity.gradient} text-white rounded-xl font-semibold hover:shadow-lg active:scale-[0.98] transition-all`}>
                    Join Activity
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expand Button (when collapsed) */}
        {sheetHeight === 'collapsed' && (
          <button
            onClick={() => setSheetHeight('half')}
            className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all"
          >
            <ChevronUp className="w-5 h-5" />
            View {filteredActivities.length} Activities
          </button>
        )}
      </div>
    </div>
  );
}