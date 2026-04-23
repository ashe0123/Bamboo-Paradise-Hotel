'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import StatusBadge from '@/components/StatusBadge';
import LoadingSpinner from '@/components/LoadingSpinner';
import { FaPlus, FaTimes } from 'react-icons/fa';

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [form, setForm] = useState({ room_number: '', category_id: '', floor: '', price_per_night: '', description: '' });

  const fetchRooms = (status = '') => {
    api.get(`/rooms${status ? `?status=${status}` : ''}`).then(({ data }) => {
      setRooms(data.rooms);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchRooms();
    api.get('/rooms/categories').then(({ data }) => setCategories(data.categories));
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const room = rooms.find(r => r.id === id);
      await api.put(`/rooms/${id}`, { status, price_per_night: room.price_per_night, description: room.description });
      toast.success('Room status updated');
      fetchRooms(filterStatus);
    } catch {
      toast.error('Update failed');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/rooms', form);
      toast.success('Room created successfully');
      setShowForm(false);
      setForm({ room_number: '', category_id: '', floor: '', price_per_night: '', description: '' });
      fetchRooms(filterStatus);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create room');
    }
  };

  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  const statusCounts = rooms.reduce((acc, r) => { acc[r.status] = (acc[r.status] || 0) + 1; return acc; }, {});

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-serif text-3xl font-bold text-gray-900">Rooms Management</h1>
        <button onClick={() => setShowForm(!showForm)}
          className={showForm ? 'btn-ghost text-sm flex items-center gap-2' : 'btn-primary text-sm flex items-center gap-2'}>
          {showForm ? <><FaTimes /> Cancel</> : <><FaPlus /> Add Room</>}
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Available', key: 'available', color: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
          { label: 'Occupied', key: 'occupied', color: 'border-red-200 bg-red-50 text-red-700' },
          { label: 'Reserved', key: 'reserved', color: 'border-amber-200 bg-amber-50 text-amber-700' },
          { label: 'Maintenance', key: 'maintenance', color: 'border-gray-200 bg-gray-50 text-gray-600' },
        ].map((s) => (
          <div key={s.key} className={`rounded-xl border p-4 text-center cursor-pointer transition-all ${s.color} ${filterStatus === s.key ? 'ring-2 ring-offset-1 ring-bamboo-400' : ''}`}
            onClick={() => { const next = filterStatus === s.key ? '' : s.key; setFilterStatus(next); fetchRooms(next); }}>
            <p className="text-2xl font-bold">{statusCounts[s.key] || 0}</p>
            <p className="text-xs font-medium mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Add room form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-gray-800 mb-4">Add New Room</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wide">Room Number</label>
              <input required className="input-field text-sm" value={form.room_number} onChange={set('room_number')} placeholder="e.g. 601" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wide">Category</label>
              <select required className="input-field text-sm" value={form.category_id} onChange={set('category_id')}>
                <option value="">Select category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wide">Floor</label>
              <input type="number" required min={1} className="input-field text-sm" value={form.floor} onChange={set('floor')} placeholder="1" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wide">Price / Night ($)</label>
              <input type="number" required min={0} step="0.01" className="input-field text-sm" value={form.price_per_night} onChange={set('price_per_night')} placeholder="99.00" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wide">Description</label>
              <input className="input-field text-sm" value={form.description} onChange={set('description')} placeholder="Optional description" />
            </div>
            <div className="md:col-span-3">
              <button type="submit" className="btn-primary text-sm">Create Room</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr className="text-left text-gray-500">
              <th className="px-5 py-3.5 font-medium">Room</th>
              <th className="px-5 py-3.5 font-medium">Category</th>
              <th className="px-5 py-3.5 font-medium">Floor</th>
              <th className="px-5 py-3.5 font-medium">Price/Night</th>
              <th className="px-5 py-3.5 font-medium">Status</th>
              <th className="px-5 py-3.5 font-medium">Change Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={6} className="py-10"><LoadingSpinner /></td></tr>
            ) : rooms.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5 font-semibold text-gray-800">Room {r.room_number}</td>
                <td className="px-5 py-3.5 text-gray-600">{r.category_name}</td>
                <td className="px-5 py-3.5 text-gray-600">Floor {r.floor}</td>
                <td className="px-5 py-3.5 font-semibold text-bamboo-700">${parseFloat(r.price_per_night).toFixed(0)}</td>
                <td className="px-5 py-3.5"><StatusBadge status={r.status} /></td>
                <td className="px-5 py-3.5">
                  <select value={r.status} onChange={(e) => handleStatusChange(r.id, e.target.value)}
                    className="text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-bamboo-400 bg-white">
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="reserved">Reserved</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
