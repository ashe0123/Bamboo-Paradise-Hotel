'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import StatusBadge from '@/components/StatusBadge';
import LoadingSpinner from '@/components/LoadingSpinner';
import {
  FaBed, FaCalendarAlt, FaUsers, FaEnvelope, FaDollarSign,
  FaCheckCircle, FaSignInAlt, FaSignOutAlt, FaChartLine, FaArrowRight
} from 'react-icons/fa';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentReservations, setRecentReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/contact/dashboard/stats'),
    ]).then(([statsRes]) => {
      setStats(statsRes.data.stats);
      setRecentReservations(statsRes.data.recentReservations || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8"><LoadingSpinner /></div>;

  const statCards = stats ? [
    { label: 'Total Rooms', value: stats.totalRooms, icon: <FaBed />, color: 'bg-blue-500', sub: `${stats.availableRooms} available` },
    { label: 'Occupied Rooms', value: stats.occupiedRooms, icon: <FaCheckCircle />, color: 'bg-emerald-500', sub: `${stats.confirmedReservations} confirmed` },
    { label: "Today's Check-ins", value: stats.todayCheckIns, icon: <FaSignInAlt />, color: 'bg-bamboo-600', sub: 'Expected today' },
    { label: "Today's Check-outs", value: stats.todayCheckOuts, icon: <FaSignOutAlt />, color: 'bg-orange-500', sub: 'Expected today' },
    { label: 'Pending Bookings', value: stats.pendingReservations, icon: <FaCalendarAlt />, color: 'bg-amber-500', sub: 'Awaiting confirmation' },
    { label: 'Total Guests', value: stats.totalGuests, icon: <FaUsers />, color: 'bg-purple-500', sub: 'Registered guests' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: <FaEnvelope />, color: 'bg-red-500', sub: 'Contact messages' },
    { label: 'Monthly Revenue', value: `$${parseFloat(stats.monthlyRevenue || 0).toLocaleString()}`, icon: <FaDollarSign />, color: 'bg-teal-500', sub: `$${parseFloat(stats.totalRevenue || 0).toLocaleString()} total` },
  ] : [];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-emerald-700 text-sm font-medium">System Online</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className={`${s.color} text-white p-2.5 rounded-xl text-lg`}>{s.icon}</div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-0.5">{s.value}</p>
            <p className="text-xs font-medium text-gray-600">{s.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Occupancy bar */}
      {stats && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">Room Occupancy</h3>
            <span className="text-bamboo-600 font-bold">{stats.occupancyRate}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div className="bg-bamboo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(stats.occupancyRate, 100)}%` }} />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>{stats.occupiedRooms} occupied</span>
            <span>{stats.availableRooms} available</span>
          </div>
        </div>
      )}

      {/* Recent reservations */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-serif text-xl font-bold text-gray-900">Recent Reservations</h2>
          <Link href="/admin/reservations" className="text-bamboo-600 text-sm hover:underline flex items-center gap-1">
            View all <FaArrowRight className="text-xs" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-3 font-medium">Booking #</th>
                <th className="pb-3 font-medium">Guest</th>
                <th className="pb-3 font-medium">Room</th>
                <th className="pb-3 font-medium">Check-in</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentReservations.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">No reservations yet</td></tr>
              ) : recentReservations.map((r) => (
                <tr key={r.reservation_number} className="hover:bg-gray-50">
                  <td className="py-3 font-mono text-xs text-bamboo-600 font-semibold">{r.reservation_number}</td>
                  <td className="py-3 font-medium">{r.first_name} {r.last_name}</td>
                  <td className="py-3 text-gray-600">Room {r.room_number}</td>
                  <td className="py-3 text-gray-600">{new Date(r.check_in_date).toLocaleDateString()}</td>
                  <td className="py-3"><StatusBadge status={r.status} /></td>
                  <td className="py-3 font-bold text-right">${parseFloat(r.total_amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
