'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatusBadge from '@/components/StatusBadge';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { FaCalendarAlt, FaConciergeBell, FaStar, FaUser, FaBed, FaArrowRight, FaPlus } from 'react-icons/fa';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [reservations, setReservations] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading]);

  useEffect(() => {
    if (user) {
      Promise.all([
        api.get('/reservations/my'),
        api.get('/services/my-requests'),
      ]).then(([resData, svcData]) => {
        setReservations(resData.data.reservations);
        setServiceRequests(svcData.data.serviceRequests);
        setFetching(false);
      }).catch(() => setFetching(false));
    }
  }, [user]);

  if (loading || !user) return null;

  const activeReservation = reservations.find(r => r.status === 'checked_in');
  const upcomingReservations = reservations.filter(r => ['pending', 'confirmed'].includes(r.status));
  const pastReservations = reservations.filter(r => ['checked_out', 'cancelled'].includes(r.status));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-bamboo-800 to-bamboo-600 text-white py-10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-bamboo-200 text-sm mb-1">Welcome back</p>
                <h1 className="font-serif text-3xl font-bold">{user.first_name} {user.last_name}</h1>
                <p className="text-bamboo-200 text-sm mt-1">{user.email}</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">{user.first_name[0]}{user.last_name[0]}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Quick actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { href: '/rooms', icon: <FaBed />, label: 'Book a Room', color: 'bg-bamboo-600 hover:bg-bamboo-700' },
              { href: '/services', icon: <FaConciergeBell />, label: 'Services', color: 'bg-amber-500 hover:bg-amber-600' },
              { href: '/dashboard/reviews', icon: <FaStar />, label: 'My Reviews', color: 'bg-purple-600 hover:bg-purple-700' },
              { href: '/dashboard/profile', icon: <FaUser />, label: 'My Profile', color: 'bg-blue-600 hover:bg-blue-700' },
            ].map((a) => (
              <Link key={a.href} href={a.href}
                className={`${a.color} text-white rounded-xl p-5 flex flex-col items-center gap-2.5 transition-colors shadow-sm`}>
                <span className="text-2xl">{a.icon}</span>
                <span className="text-sm font-semibold">{a.label}</span>
              </Link>
            ))}
          </div>

          {fetching ? <LoadingSpinner /> : (
            <div className="space-y-8">
              {/* Active stay */}
              {activeReservation && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <h2 className="font-semibold text-emerald-800">Currently Checked In</h2>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-gray-800 text-lg">{activeReservation.room_category} — Room {activeReservation.room_number}</p>
                      <p className="text-sm text-gray-500">Check-out: {new Date(activeReservation.check_out_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/dashboard/reservations/${activeReservation.id}`} className="btn-outline text-sm py-2 px-4">View Details</Link>
                      <Link href="/services" className="btn-primary text-sm py-2 px-4">Request Service</Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Upcoming */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-serif text-xl font-bold text-gray-800">Upcoming Reservations</h2>
                  <Link href="/rooms" className="text-bamboo-600 text-sm hover:underline flex items-center gap-1">
                    <FaPlus className="text-xs" /> New Booking
                  </Link>
                </div>
                {upcomingReservations.length === 0 ? (
                  <div className="card p-10 text-center">
                    <FaCalendarAlt className="text-gray-300 text-4xl mx-auto mb-3" />
                    <p className="text-gray-500 mb-4">No upcoming reservations.</p>
                    <Link href="/rooms" className="btn-primary text-sm">Book Your Stay</Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {upcomingReservations.map((r) => (
                      <ReservationRow key={r.id} r={r} />
                    ))}
                  </div>
                )}
              </div>

              {/* Service requests */}
              {serviceRequests.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-bold text-gray-800 mb-4">Recent Service Requests</h2>
                  <div className="space-y-3">
                    {serviceRequests.slice(0, 3).map((sr) => (
                      <div key={sr.id} className="bg-white rounded-xl border border-gray-100 p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800">{sr.service_name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">Room {sr.room_number} · {new Date(sr.requested_at).toLocaleDateString()}</p>
                        </div>
                        <StatusBadge status={sr.status} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Past stays */}
              {pastReservations.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-bold text-gray-800 mb-4">Past Stays</h2>
                  <div className="space-y-3">
                    {pastReservations.slice(0, 3).map((r) => (
                      <ReservationRow key={r.id} r={r} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

function ReservationRow({ r }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-sm transition-shadow">
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <span className="font-mono text-xs text-bamboo-600 font-semibold">{r.reservation_number}</span>
          <StatusBadge status={r.status} />
        </div>
        <p className="font-semibold text-gray-800">{r.room_category} — Room {r.room_number}</p>
        <p className="text-sm text-gray-500 mt-0.5">
          {new Date(r.check_in_date).toLocaleDateString()} → {new Date(r.check_out_date).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-bamboo-700 text-lg">${parseFloat(r.total_amount).toFixed(2)}</span>
        <Link href={`/dashboard/reservations/${r.id}`} className="btn-outline text-sm py-1.5 px-4 flex items-center gap-1">
          View <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </div>
  );
}
