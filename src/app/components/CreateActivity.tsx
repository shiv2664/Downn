import { useState } from 'react';
import { X, Plane, PartyPopper, Utensils, Palette, Calendar, MapPin, Image } from 'lucide-react';

interface CreateActivityProps {
  onClose: () => void;
}

const categories = [
  { id: 'travel', name: 'Travel', icon: Plane, color: 'from-blue-500 to-cyan-500' },
  { id: 'party', name: 'Party', icon: PartyPopper, color: 'from-pink-500 to-purple-500' },
  { id: 'food', name: 'Food', icon: Utensils, color: 'from-orange-500 to-red-500' },
  { id: 'hobby', name: 'Hobby', icon: Palette, color: 'from-green-500 to-teal-500' },
];

export function CreateActivity({ onClose }: CreateActivityProps) {
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const handlePost = () => {
    // Handle post logic here
    console.log({ title, selectedCategory, time, location });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <header className="sticky top-0 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 px-5 py-4 flex items-center justify-between">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 active:scale-95 transition-all"
        >
          <X className="w-5 h-5 text-slate-300" />
        </button>
        <h1 className="font-bold text-lg text-white">Create Activity</h1>
        <div className="w-10" /> {/* Spacer for alignment */}
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-5 py-6 pb-32">
        {/* Title Input */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            What's happening?
          </label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Let's grab coffee at that new spot! ☕"
            className="w-full px-4 py-4 text-lg bg-slate-800/50 border-2 border-slate-700 text-white placeholder-slate-500 rounded-2xl focus:border-purple-500 focus:outline-none resize-none transition-colors"
            rows={4}
          />
        </div>

        {/* Category Selector */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Category
          </label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    relative p-4 rounded-2xl border-2 transition-all
                    ${
                      isSelected
                        ? 'border-transparent bg-gradient-to-br ' + category.color
                        : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`
                      w-12 h-12 rounded-xl flex items-center justify-center
                      ${isSelected ? 'bg-white/20' : 'bg-slate-700/50'}
                    `}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isSelected ? 'text-white' : 'text-slate-300'
                        }`}
                      />
                    </div>
                    <span
                      className={`font-medium ${
                        isSelected ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      {category.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Picker */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            When?
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="datetime-local"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border-2 border-slate-700 text-white rounded-2xl focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Location Field */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Where?
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Add location"
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border-2 border-slate-700 text-white placeholder-slate-500 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Add Photos Button */}
        <button className="w-full py-4 border-2 border-dashed border-slate-700 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:border-slate-600 hover:text-slate-300 transition-all active:scale-[0.99]">
          <Image className="w-5 h-5" />
          <span className="font-medium">Add Photos</span>
        </button>
      </main>

      {/* Floating POST Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900 to-transparent p-5 pb-8">
        <div className="max-w-md mx-auto">
          <button
            onClick={handlePost}
            disabled={!title || !selectedCategory || !time || !location}
            className={`
              w-full py-5 rounded-2xl font-bold text-lg shadow-2xl
              transition-all transform active:scale-[0.98]
              ${
                title && selectedCategory && time && location
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-purple-500/50'
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed'
              }
            `}
          >
            POST ACTIVITY
          </button>
        </div>
      </div>
    </div>
  );
}