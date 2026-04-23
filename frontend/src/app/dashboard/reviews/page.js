'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { FaArrowLeft, FaStar, FaPlus } from 'react-icons/fa';

export default function MyReviewsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [reservations, setReservations] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading]);

  useEffect(() => {
    if (user) {
      api.get('/reservations/my').then(({ data }) => {
        // Only checked-out reservations can be reviewed
        setReservations(data.reservations.filter(r => r.status === 'checked_out'));
        setFetching(false);
      }).catch(() => setFetching(false));
    }
  }, [user]);

  if (loading || !user) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-bamboo-600 hover:text-bamboo-800 text-sm font-medium mb-6 transition-colors">
            <FaArrowLeft className="text-xs" /> Back to Dashboard
          </Link>

          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-8">My Reviews</h1>

          {fetching ? (
            <div className="text-center py-10 text-gray-400">Loading...</div>
          ) : reservations.length === 0 ? (
            <div className="card p-12 text-center">
              <FaStar className="text-gray-300 text-5xl mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold text-gray-700 mb-2">No stays to review yet</h3>
              <p className="text-gray-500 mb-5">Complete a stay to leave a review.</p>
              <Link href="/rooms" className="btn-primary text-sm">Book a Room</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.map((r) => (
                <div key={r.id} className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-800">{r.room_category} — Room {r.room_number}</p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {new Date(r.check_in_date).toLocaleDateString()} → {new Date(r.check_out_date).toLocaleDateString()}
                    </p>
                    <p className="font-mono text-xs text-bamboo-600 mt-1">{r.reservation_number}</p>
                  </div>
                  <Link href={`/dashboard/reviews/new?reservation=${r.id}`}
                    className="btn-primary text-sm py-2 px-4 flex items-center gap-2 whitespace-nowrap">
                    <FaPlus className="text-xs" /> Write Review
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
