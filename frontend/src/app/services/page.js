'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { HOTEL_IMAGES } from '@/lib/images';
import { FaUtensils, FaSpa, FaTshirt, FaCar, FaBroom, FaEllipsisH, FaConciergeBell, FaTimes, FaCheck, FaClock, FaDollarSign } from 'react-icons/fa';

const categoryConfig = {
  restaurant: { icon: <FaUtensils />, label: 'Restaurant & Dining', color: 'bg-orange-50 text-orange-600 border-orange-100', img: HOTEL_IMAGES.restaurant },
  spa:        { icon: <FaSpa />,      label: 'Spa & Wellness',       color: 'bg-purple-50 text-purple-600 border-purple-100', img: HOTEL_IMAGES.spa },
  laundry:    { icon: <FaTshirt />,   label: 'Laundry',              color: 'bg-blue-50 text-blue-600 border-blue-100',       img: HOTEL_IMAGES.lobby },
  transport:  { icon: <FaCar />,      label: 'Transport',            color: 'bg-green-50 text-green-600 border-green-100',    img: HOTEL_IMAGES.exterior },
  housekeeping:{ icon: <FaBroom />,   label: 'Housekeeping',         color: 'bg-yellow-50 text-yellow-600 border-yellow-100', img: HOTEL_IMAGES.deluxeRoom },
  other:      { icon: <FaEllipsisH />,label: 'Other Services',       color: 'bg-gray-50 text-gray-600 border-gray-100',       img: HOTEL_IMAGES.lobby },
};

export default function ServicesPage() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ reservation_id: '', quantity: 1, notes: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get('/services').then(({ data }) => { setServices(data.services); setLoading(false); });
    if (user) {
      api.get('/reservations/my').then(({ data }) => {
        setReservations(data.reservations.filter(r => ['confirmed', 'checked_in'].includes(r.status)));
      });
    }
  }, [user]);

  const openModal = (service) => {
    if (!user) { toast.error('Please sign in to request services'); return; }
    if (reservations.length === 0) {
      toast.error('You need a confirmed or active reservation to request services');
      return;
    }
    setForm({ reservation_id: reservations[0]?.id || '', quantity: 1, notes: '' });
    setModal(service);
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/services/request', {
        reservation_id: form.reservation_id,
        service_id: modal.id,
        quantity: form.quantity,
        notes: form.notes,
      });
      toast.success(`${modal.name} requested successfully!`);
      setModal(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Request failed');
    } finally {
      setSubmitting(false);
    }
  };

  const grouped = services.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative h-72 overflow-hidden">
        <Image src={HOTEL_IMAGES.spa} alt="Hotel Services" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-bamboo-900/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-bamboo-300 text-sm font-semibold uppercase tracking-widest mb-2">Hotel Services</p>
          <h1 className="font-serif text-5xl font-bold mb-3">Our Services</h1>
          <p className="text-bamboo-100 text-lg">Everything you need for a perfect stay</p>
        </div>
      </section>

      {/* Category highlights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(categoryConfig).map(([key, cfg]) => (
              <a key={key} href={`#${key}`}
                className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mx-auto mb-2 ${cfg.color} group-hover:scale-110 transition-transform`}>
                  {cfg.icon}
                </div>
                <p className="text-xs font-semibold text-gray-700">{cfg.label}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services by category */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading services...</div>
        ) : (
          Object.entries(grouped).map(([category, items]) => {
            const cfg = categoryConfig[category] || categoryConfig.other;
            return (
              <div key={category} id={category} className="mb-16 scroll-mt-24">
                {/* Category header with image */}
                <div className="relative h-40 rounded-2xl overflow-hidden mb-8 shadow-md">
                  <Image src={cfg.img} alt={cfg.label} fill className="object-cover" sizes="100vw" />
                  <div className="absolute inset-0 bg-bamboo-900/60" />
                  <div className="absolute inset-0 flex items-center px-8 gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border bg-white/20 backdrop-blur-sm text-white text-xl`}>
                      {cfg.icon}
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-white">{cfg.label}</h2>
                      <p className="text-white/70 text-sm">{items.length} service{items.length !== 1 ? 's' : ''} available</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((s) => (
                    <div key={s.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800">{s.name}</h3>
                        <div className="flex items-center gap-1 text-bamboo-700 font-bold">
                          <FaDollarSign className="text-xs" />
                          <span>{s.price > 0 ? parseFloat(s.price).toFixed(0) : 'Free'}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-4 leading-relaxed">{s.description}</p>
                      <button onClick={() => openModal(s)}
                        className="w-full py-2 border-2 border-bamboo-600 text-bamboo-600 hover:bg-bamboo-600 hover:text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2">
                        <FaConciergeBell className="text-xs" /> Request Service
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}

        {!user && (
          <div className="bg-bamboo-50 border border-bamboo-100 rounded-2xl p-10 text-center mt-8">
            <FaConciergeBell className="text-bamboo-500 text-5xl mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-bamboo-800 mb-2">Sign In to Request Services</h3>
            <p className="text-gray-500 mb-5">You need an active reservation to request hotel services.</p>
            <a href="/login" className="btn-primary">Sign In</a>
          </div>
        )}
      </div>

      {/* Request Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-32">
              <Image src={categoryConfig[modal.category]?.img || HOTEL_IMAGES.lobby} alt={modal.name} fill className="object-cover" sizes="448px" />
              <div className="absolute inset-0 bg-bamboo-900/60" />
              <div className="absolute inset-0 flex items-end p-5">
                <div>
                  <h2 className="font-serif text-xl font-bold text-white">{modal.name}</h2>
                  <p className="text-bamboo-200 text-sm">{modal.price > 0 ? `$${parseFloat(modal.price).toFixed(2)} per request` : 'Complimentary'}</p>
                </div>
              </div>
              <button onClick={() => setModal(null)} className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 text-white rounded-full p-1.5 transition-colors">
                <FaTimes className="text-sm" />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleRequest} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Reservation</label>
                  <select required className="input-field" value={form.reservation_id}
                    onChange={(e) => setForm({ ...form, reservation_id: e.target.value })}>
                    {reservations.map((r) => (
                      <option key={r.id} value={r.id}>
                        Room {r.room_number} — {r.reservation_number} ({r.status.replace('_', ' ')})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Quantity</label>
                  <input type="number" min={1} max={10} className="input-field" value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Notes (optional)</label>
                  <textarea rows={3} className="input-field resize-none text-sm" placeholder="Any special instructions..."
                    value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </div>
                {modal.price > 0 && (
                  <div className="bg-bamboo-50 rounded-lg p-3 text-sm text-bamboo-700 flex justify-between">
                    <span>Total charge</span>
                    <span className="font-bold">${(parseFloat(modal.price) * form.quantity).toFixed(2)}</span>
                  </div>
                )}
                <button type="submit" disabled={submitting} className="btn-primary w-full py-3">
                  {submitting ? 'Requesting...' : 'Confirm Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
