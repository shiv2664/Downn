import { MapPin, Users, Clock } from 'lucide-react';

interface ActivityCardProps {
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
  onClick?: () => void; // Add onClick handler
}

export function ActivityCard({
  avatar,
  userName,
  title,
  timePosted,
  distance,
  categoryIcon,
  categoryColor,
  participantCount,
  gradient,
  images,
  onClick,
}: ActivityCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-3xl p-5 mb-4 relative overflow-hidden ${gradient} cursor-pointer active:scale-[0.98] transition-transform`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={avatar}
          alt={userName}
          className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
        />
        <div className="flex-1">
          <h3 className="text-white font-semibold">{userName}</h3>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>{timePosted}</span>
          </div>
        </div>
        <div
          className={`w-12 h-12 rounded-2xl ${categoryColor} flex items-center justify-center bg-white/20 backdrop-blur-sm`}
        >
          {categoryIcon}
        </div>
      </div>

      {/* Activity Title */}
      <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>

      {/* User Uploaded Images */}
      {images && images.length > 0 && (
        <div className="mb-4">
          {images.length === 1 ? (
            <img
              src={images[0]}
              alt="Activity"
              className="w-full h-48 object-cover rounded-2xl"
            />
          ) : images.length === 2 ? (
            <div className="grid grid-cols-2 gap-2">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Activity ${idx + 1}`}
                  className="w-full h-40 object-cover rounded-2xl"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <img
                src={images[0]}
                alt="Activity 1"
                className="w-full h-40 object-cover rounded-2xl"
              />
              <div className="grid grid-rows-2 gap-2">
                <img
                  src={images[1]}
                  alt="Activity 2"
                  className="w-full h-[4.75rem] object-cover rounded-2xl"
                />
                <div className="relative">
                  <img
                    src={images[2]}
                    alt="Activity 3"
                    className="w-full h-[4.75rem] object-cover rounded-2xl"
                  />
                  {images.length > 3 && (
                    <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
                      <span className="text-white text-xl font-bold">
                        +{images.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Info Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-white/90">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{distance}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/90">
            <Users className="w-4 h-4" />
            <span className="text-sm">{participantCount} joined</span>
          </div>
        </div>
      </div>

      {/* JOIN Button */}
      <button className="w-full bg-white text-black py-3.5 rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform">
        JOIN
      </button>
    </div>
  );
}