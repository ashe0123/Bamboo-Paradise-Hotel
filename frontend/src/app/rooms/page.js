'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoomCard from '@/components/RoomCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import api from '@/lib/api';
import { FaSearch, FaTimes, FaFilter } from 'react-icons/fa';

function RoomsContent() {
  const searchParams = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    check_in: searchParams.get('check_in') || '',
    check_out: searchParams.get('check_out') || '',
    category_id: '',
    min_price: '',
    max_price: '',
  });

  const fetchRooms = async (params = {}) => {
    setLoading(true);
    try {
      const query = new URLSearchParams(
        Object.fromEntries(Object.entries(params).filter(([, v]) => v))
      ).toString();
      const { data } = await api.get(`/rooms${query ? '?' + query : ''}`);
      setRooms(data.rooms);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms(filters);
    api.get('/rooms/categories').then(({ data }) => setCategories(data.categories));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRooms(filters);
  };

  const clearFilters = () => {
    const empty = { check_in: '', check_out: '', category_id: '', min_price: '', max_price: '' };
    setFilters(empty);
    fetchRooms({});
  };

  const set = (field) => (e) => setFilters({ ...filters, [field]: e.target.value });
  const hasFilters = Object.values(filters).some(v => v);

  return (
    <>
      <Navbar />

      {/* Header */}
      <div className="page-header">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <p className="text-bamboo-300 text-sm font-semibold uppercase tracking-widest mb-2">Accommodations</p>
          <h1 className="font-serif text-5xl font-bold mb-3">Rooms & Suites</h1>
          <p className="text-bamboo-100 text-lg">Find your perfect room at Bamboo Paradise</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md border-b border-gray-100 sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <form onSubmit={handleSearch} className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Check-in</label>
              <input type="date" className="input-field text-sm py-2" value={filters.check_in} onChange={set('check_in')}
                min={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Check-out</label>
              <input type="date" className="input-field text-sm py-2" value={filters.check_out} onChange={set('check_out')}
                min={filters.check_in || new Date().toISOString().split('T')[0]} />
            </div>
            <div className="flex-1 min-w-[160px]">
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Room Type</label>
              <select className="input-field text-sm py-2" value={filters.category_id} onChange={set('category_id')}>
                <option value="">All Types</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[110px]">
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Min Price</label>
              <input type="number" placeholder="$0" className="input-field text-sm py-2" value={filters.min_price} onChange={set('min_price')} />
            </div>
            <div className="flex-1 min-w-[110px]">
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Max Price</label>
              <input type="number" placeholder="$999" className="input-field text-sm py-2" value={filters.max_price} onChange={set('max_price')} />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn-primary py-2 px-5 text-sm flex items-center gap-2">
                <FaSearch className="text-xs" /> Search
              </button>
              {hasFilters && (
                <button type="button" onClick={clearFilters} className="btn-ghost py-2 px-3 text-sm flex items-center gap-1">
                  <FaTimes className="text-xs" /> Clear
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Room grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <LoadingSpinner text="Searching available rooms..." />
        ) : rooms.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-gray-400 text-xl" />
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-700 mb-2">No rooms found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria.</p>
            <button onClick={clearFilters} className="btn-outline text-sm">Clear Filters</button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-500 text-sm">
                <span className="font-semibold text-gray-800">{rooms.length}</span> room{rooms.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room, i) => <RoomCard key={room.id} room={room} index={i} />)}
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default function RoomsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RoomsContent />
    </Suspense>
  );
}
