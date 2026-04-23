import Link from 'next/link';
import Image from 'next/image';
import { FaUsers, FaBed, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { getRoomImage } from '@/lib/images';

const statusConfig = {
  available:   { label: 'Available',   cls: 'bg-emerald-500 text-white' },
  occupied:    { label: 'Occupied',    cls: 'bg-red-500 text-white' },
  reserved:    { label: 'Reserved',    cls: 'bg-amber-500 text-white' },
  maintenance: { label: 'Maintenance', cls: 'bg-gray-500 text-white' },
};

export default function RoomCard({ room, index = 0 }) {
  const amenities = Array.isArray(room.amenities) ? room.amenities : JSON.parse(room.amenities || '[]');
  const status = statusConfig[room.status] || statusConfig.available;
  const imgSrc = getRoomImage(room.category_name, index % 2);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={imgSrc}
          alt={room.category_name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.cls}`}>{status.label}</span>
        </div>
        <div className="absolute bottom-3 left-4 text-white">
          <p className="text-xs text-white/70 uppercase tracking-widest">Room {room.room_number}</p>
          <h3 className="font-serif text-lg font-bold">{room.category_name}</h3>
        </div>
        <div className="absolute bottom-3 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1">
          <span className="text-bamboo-700 font-bold text-sm">${parseFloat(room.price_per_night).toFixed(0)}</span>
          <span className="text-gray-400 text-xs">/night</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1.5"><FaBed className="text-bamboo-500" /> Floor {room.floor}</span>
          <span className="flex items-center gap-1.5"><FaUsers className="text-bamboo-500" /> {room.max_occupancy} guests</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {amenities.slice(0, 3).map((a) => (
            <span key={a} className="flex items-center gap-1 text-xs bg-bamboo-50 text-bamboo-700 px-2.5 py-0.5 rounded-full border border-bamboo-100">
              <FaCheckCircle className="text-bamboo-400 text-[10px]" />{a}
            </span>
          ))}
          {amenities.length > 3 && (
            <span className="text-xs bg-gray-50 text-gray-500 px-2.5 py-0.5 rounded-full border border-gray-100">+{amenities.length - 3} more</span>
          )}
        </div>

        <Link href={`/rooms/${room.id}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-bamboo-700 text-bamboo-700 hover:bg-bamboo-700 hover:text-white rounded-lg font-semibold text-sm transition-all duration-200 group/btn">
          View Details <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
