'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import StatusBadge from '@/components/StatusBadge';
import LoadingSpinner from '@/components/LoadingSpinner';
import { FaPlus, FaTimes } from 'react-icons/fa';

const statusOptions = ['', 'pending', 'in_progress', 'completed', 'cancelled'];

export default function AdminServicesPage() {
  const [requests, setRequests] = useState([]);
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('requests'); // 'requests' | 'manage'
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', category: 'restaurant', description: '', price: '' });

  const fetchRequests = (status = '') => {
    setLoading(true);
    api.get(`/services/requests${status ? `?status=${status}` : ''}`)
      .then(({ data }) => { setRequests(data.serviceRequests); setLoading(false); });
  };

  const fetchServices = () => {
    api.get('/services').then(({ data }) => setServices(data.services));
  };

  useEffect(() => { fetchRequests(); fetchServices(); }, []);

  const handleUpdate = async (id, status) => {
    try {
      await api.put(`/services/requests/${id}`, { status });
      toast.success('Updated');
      fetchRequests(filter);
    } catch { toast.error('Update failed'); }
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      await api.post('/services', form);
      toast.success('Service created');
      setShowForm(false);
      setForm({ name: '', category: 'restaurant', description: '', price: '' });
      fetchServices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-bold text-gray-900 mb-6">Services</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-6">
        {[['requests', 'Service Requests'], ['manage', 'Manage Services']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${tab === key ? 'bg-white shadow text-bamboo-700' : 'text-gray-500 hover:text-gray-700'}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'requests' && (
        <>
          <div className="flex gap-2 mb-5 flex-wrap">
            {statusOptions.map((s) => (
              <button key={s} onClick={() => { setFilter(s); fetchRequests(s); }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${filter === s ? 'bg-bamboo-700 text-white border-bamboo-700' : 'border-gray-300 text-gray-600 hover:border-bamboo-400'}`}>
                {s ? s.replace('_', ' ') : 'All'}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-left text-gray-500">
                  <th className="px-5 py-3.5 font-medium">Guest</th>
                  <th className="px-5 py-3.5 font-medium">Room</th>
                  <th className="px-5 py-3.5 font-medium">Service</th>
                  <th className="px-5 py-3.5 font-medium">Qty</th>
                  <th className="px-5 py-3.5 font-medium">Requested</th>
                  <th className="px-5 py-3.5 font-medium">Status</th>
                  <th className="px-5 py-3.5 font-medium">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan={7} className="py-10"><LoadingSpinner /></td></tr>
                ) : requests.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-10 text-gray-400">No service requests</td></tr>
                ) : requests.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3.5">
                      <p className="font-medium">{r.first_name} {r.last_name}</p>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">Room {r.room_number}</td>
                    <td className="px-5 py-3.5">
                      <p className="font-medium">{r.service_name}</p>
                      <p className="text-xs text-gray-400 capitalize">{r.category}</p>
                    </td>
                    <td className="px-5 py-3.5">{r.quantity}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{new Date(r.requested_at).toLocaleString()}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={r.status} /></td>
                    <td className="px-5 py-3.5">
                      <select value={r.status} onChange={(e) => handleUpdate(r.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-bamboo-400 bg-white">
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'manage' && (
        <>
          <div className="flex justify-end mb-4">
            <button onClick={() => setShowForm(!showForm)}
              className={showForm ? 'btn-ghost text-sm flex items-center gap-2' : 'btn-primary text-sm flex items-center gap-2'}>
              {showForm ? <><FaTimes /> Cancel</> : <><FaPlus /> Add Service</>}
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-5">
              <h3 className="font-semibold text-gray-800 mb-4">New Service</h3>
              <form onSubmit={handleCreateService} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wide">Name</label>
                  <input required className="input-field text-sm" value={form.name} onChange={set('name')} placeholder="Service name" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wide">Category</label>
                  <select required className="input-field text-sm" value={form.category} onChange={set('category')}>
                    {['restaurant', 'spa', 'laundry', 'transport', 'housekeeping', 'other'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wide">Price ($)</label>
                  <input type="number" min={0} step="0.01" required className="input-field text-sm" value={form.price} onChange={set('price')} placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wide">Description</label>
                  <input className="input-field text-sm" value={form.description} onChange={set('description')} placeholder="Brief description" />
                </div>
                <div className="col-span-2">
                  <button type="submit" className="btn-primary text-sm">Create Service</button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <div key={s.id} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-800">{s.name}</h3>
                  <span className="text-bamboo-700 font-bold">{s.price > 0 ? `$${parseFloat(s.price).toFixed(0)}` : 'Free'}</span>
                </div>
                <p className="text-xs text-gray-400 capitalize mb-1">{s.category}</p>
                <p className="text-sm text-gray-500">{s.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
