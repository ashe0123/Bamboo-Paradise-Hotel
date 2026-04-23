'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { FaUsers, FaBed, FaCheck, FaArrowLeft, FaCalendarAlt, FaLeaf, FaWifi, FaShieldAlt } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { getRoomImage, HOTEL_IMAGES } from '@/lib/images';

export default function RoomDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [booking, setBooking] = useState({
    check_in_date: '', check_out_date: '', adults: 1, children: 0, special_requests: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [nights, setNights] = useState(0);

  useEffect(() => {
    api.get(`/rooms/${id}`)
      .then(({ data }) => { setRoom(data.room); setLoading(false); })
      .catch(() => { setLoading(false); router.push('/rooms'); });
  }, [id]);

  useEffect(() => {
    if (booking.check_in_date && booking.check_out_date) {
      const diff = (new Date(booking.check_out_date) - new Date(booking.check_in_date)) / (1000 * 60 * 60 * 24);
      setNights(diff > 0 ? diff : 0);
    }
  }, [booking.check_in_date, booking.check_out_date]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!user) { router.push('/login'); return; }
    if (nights <= 0) { toast.error('Please select valid dates'); return; }
    setSubmitting(true);
    try {
      const { data } = await api.post('/reservations', { room_id: id, ...booking });
      toast.success('Reservation created! Proceed to payment.');
      router.push(`/dashboard/reservations/${data.reservation.id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  const set = (field) => (e) => setBooking({ ...booking, [field]: e.target.value });

  if (loading) return (
    <><Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-bamboo-200 border-t-bamboo-600 rounded-full animate-spin" />
      </div>
    </>
  );
  if (!room) return null;

  const amenities = Array.isArray(room.amenities) ? room.amenities : JSON.parse(room.amenities || '[]');
  const isAvailable = room.status === 'available';

  // Build image gallery for this room
  const galleryImages = [
    getRoomImage(room.category_name, 0),
    getRoomImage(room.category_name, 1),
    HOTEL_IMAGES.pool,
    HOTEL_IMAGES.lobby,
  ];

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <Link href="/rooms" className="inline-flex items-center gap-2 text-bamboo-600 hover:text-bamboo-800 text-sm font-medium mb-6 transition-colors">
          <FaArrowLeft className="text-xs" /> Back to Rooms
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Room info */}
          <div className="lg:col-span-2">
            {/* Main image */}
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden mb-3 shadow-lg">
              <Image
                src={galleryImages[activeImg]}
                alt={room.category_name}
                fill
                className="object-cover transition-all duration-500"
                sizes="(max-width:1024px) 100vw, 66vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-4 right-4">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${isAvailable ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                  {room.status}
                </span>
              </div>
              <div className="absolute bottom-4 left-5 text-white">
                <p className="text-white/70 text-xs uppercase tracking-widest mb-0.5">Room {room.room_number} · Floor {room.floor}</p>
                <h1 className="font-serif text-3xl font-bold drop-shadow">{room.category_name}</h1>
              </div>
            </div>

            {/* Thumbnail gallery */}
            <div className="flex gap-2 mb-8">
              {galleryImages.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`relative h-16 w-24 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? 'border-bamboo-500 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                  <Image src={img} alt={`View ${i+1}`} fill className="object-cover" sizes="96px" />
                </button>
              ))}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-bamboo-50 rounded-xl p-4 text-center border border-bamboo-100">
                <FaUsers className="text-bamboo-600 text-xl mx-auto mb-1" />
                <p className="text-xs text-gray-500 mb-0.5">Max Guests</p>
                <p className="font-bold text-gray-800">{room.max_occupancy}</p>
              </div>
              <div className="bg-bamboo-50 rounded-xl p-4 text-center border border-bamboo-100">
                <FaBed className="text-bamboo-600 text-xl mx-auto mb-1" />
                <p className="text-xs text-gray-500 mb-0.5">Floor</p>
                <p className="font-bold text-gray-800">{room.floor}</p>
              </div>
              <div className="bg-bamboo-50 rounded-xl p-4 text-center border border-bamboo-100">
                <FaLeaf className="text-bamboo-600 text-xl mx-auto mb-1" />
                <p className="text-xs text-gray-500 mb-0.5">Price / Night</p>
                <p className="font-bold text-bamboo-700">${parseFloat(room.price_per_night).toFixed(0)}</p>
              </div>
            </div>

            {/* Description */}
            {(room.description || room.category_description) && (
              <div className="mb-8">
                <h2 className="font-serif text-xl font-bold text-gray-900 mb-3">About This Room</h2>
                <p className="text-gray-600 leading-relaxed">{room.description || room.category_description}</p>
              </div>
            )}

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Room Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2.5 bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-100">
                    <FaCheck className="text-bamboo-500 text-xs shrink-0" />
                    <span className="text-sm text-gray-700">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FaShieldAlt className="text-amber-500" /> Hotel Policies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                {[
                  'Check-in: 2:00 PM', 'Check-out: 12:00 PM',
                  'No smoking in rooms', 'Pets not allowed',
                  'Free cancellation before check-in', 'ID required at check-in',
                ].map(p => (
                  <div key={p} className="flex items-center gap-2">
                    <FaCheck className="text-amber-500 text-xs shrink-0" />{p}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking form */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24 border border-gray-100 shadow-lg">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <p className="text-3xl font-bold text-bamboo-700">${parseFloat(room.price_per_night).toFixed(0)}</p>
                  <p className="text-sm text-gray-400">per night · taxes included</p>
                </div>
                <FaCalendarAlt className="text-bamboo-400 text-2xl" />
              </div>

              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Check-in Date</label>
                  <input type="date" required className="input-field"
                    min={new Date().toISOString().split('T')[0]}
                    value={booking.check_in_date} onChange={set('check_in_date')} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Check-out Date</label>
                  <input type="date" required className="input-field"
                    min={booking.check_in_date || new Date().toISOString().split('T')[0]}
                    value={booking.check_out_date} onChange={set('check_out_date')} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Adults</label>
                    <select className="input-field" value={booking.adults} onChange={set('adults')}>
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Children</label>
                    <select className="input-field" value={booking.children} onChange={set('children')}>
                      {[0,1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Special Requests</label>
                  <textarea rows={3} className="input-field resize-none text-sm" placeholder="Any special requests..."
                    value={booking.special_requests} onChange={set('special_requests')} />
                </div>

                {nights > 0 && (
                  <div className="bg-bamboo-50 rounded-xl p-4 space-y-2 border border-bamboo-100">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${parseFloat(room.price_per_night).toFixed(0)} × {nights} night{nights > 1 ? 's' : ''}</span>
                      <span>${(parseFloat(room.price_per_night) * nights).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Taxes & fees</span><span>Included</span>
                    </div>
                    <div className="flex justify-between font-bold text-bamboo-800 border-t border-bamboo-200 pt-2">
                      <span>Total</span>
                      <span>${(parseFloat(room.price_per_night) * nights).toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <button type="submit" disabled={submitting || !isAvailable}
                  className="btn-primary w-full py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? 'Creating Reservation...' : !isAvailable ? 'Not Available' : 'Reserve Now'}
                </button>

                {!user && (
                  <p className="text-center text-xs text-gray-500">
                    <Link href="/login" className="text-bamboo-600 font-semibold hover:underline">Sign in</Link> to complete your booking
                  </p>
                )}
              </form>

              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                {['Free cancellation before check-in', 'No hidden fees', 'Instant confirmation', 'Best price guarantee'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-gray-500">
                    <FaCheck className="text-bamboo-500 shrink-0" />{t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
