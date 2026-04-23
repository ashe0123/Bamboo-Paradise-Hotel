'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import StatusBadge from '@/components/StatusBadge';
import LoadingSpinner from '@/components/LoadingSpinner';
import { FaSearch } from 'react-icons/fa';

const statusOptions = ['', 'pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'];

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchReservations = async (status = '', q = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (status) params.set('status', status);
      if (q) params.set('search', q);
      const { data } = await api.get(`/reservations?${params}`);
      setReservations(data.reservations);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReservations(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/reservations/${id}/status`, { status });
      toast.success('Status updated');
      fetchReservations(filter, search);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-bold text-gray-900 mb-6">Reservations</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map((s) => (
            <button key={s} onClick={() => { setFilter(s); fetchReservations(s, search); }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${filter === s ? 'bg-bamboo-700 text-white border-bamboo-700' : 'border-gray-300 text-gray-600 hover:border-bamboo-400'}`}>
              {s ? s.replace('_', ' ') : 'All'}
            </button>
          ))}
        </div>
        <div className="flex-1 min-w-[200px] relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input type="text" placeholder="Search guest, email, booking #..."
            className="input-field pl-9 text-sm py-2"
            value={search}
            onChange={(e) => { setSearch(e.target.value); fetchReservations(filter, e.target.value); }} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-gray-500">
                <th className="px-5 py-3.5 font-medium">Booking #</th>
                <th className="px-5 py-3.5 font-medium">Guest</th>
                <th className="px-5 py-3.5 font-medium">Room</th>
                <th className="px-5 py-3.5 font-medium">Check-in</th>
                <th className="px-5 py-3.5 font-medium">Check-out</th>
                <th className="px-5 py-3.5 font-medium">Amount</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={8} className="py-10"><LoadingSpinner /></td></tr>
              ) : reservations.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-10 text-gray-400">No reservations found</td></tr>
              ) : reservations.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-bamboo-600 font-semibold">{r.reservation_number}</td>
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-gray-800">{r.first_name} {r.last_name}</p>
                    <p className="text-xs text-gray-400">{r.email}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-medium">Room {r.room_number}</p>
                    <p className="text-xs text-gray-400">{r.room_category}</p>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">{new Date(r.check_in_date).toLocaleDateString()}</td>
                  <td className="px-5 py-3.5 text-gray-600">{new Date(r.check_out_date).toLocaleDateString()}</td>
                  <td className="px-5 py-3.5 font-bold text-gray-800">${parseFloat(r.total_amount).toFixed(2)}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={r.status} /></td>
                  <td className="px-5 py-3.5">
                    <select value={r.status} onChange={(e) => handleStatusChange(r.id, e.target.value)}
                      className="text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-bamboo-400 bg-white">
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="checked_in">Check In</option>
                      <option value="checked_out">Check Out</option>
                      <option value="cancelled">Cancel</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && (
          <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
            {reservations.length} reservation{reservations.length !== 1 ? 's' : ''} found
          </div>
        )}
      </div>
    </div>
  );
}
