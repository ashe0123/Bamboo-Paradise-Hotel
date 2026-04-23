'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaStar } from 'react-icons/fa';

function NewReviewContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const reservationId = searchParams.get('reservation');

  const [reservation, setReservation] = useState(null);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading]);

  useEffect(() => {
    if (reservationId) {
      api.get(`/reservations/${reservationId}`)
        .then(({ data }) => setReservation(data.reservation))
        .catch(() => router.push('/dashboard/reviews'));
    }
  }, [reservationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) { toast.error('Please select a rating'); return; }
    setSubmitting(true);
    try {
      await api.post('/reviews', { reservation_id: reservationId, rating, comment });
      toast.success('Review submitted! Thank you for your feedback.');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  if (loading || !user) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-xl mx-auto px-4">
          <Link href="/dashboard/reviews" className="inline-flex items-center gap-2 text-bamboo-600 hover:text-bamboo-800 text-sm font-medium mb-6 transition-colors">
            <FaArrowLeft className="text-xs" /> Back to Reviews
          </Link>

          <div className="card p-8">
            <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Write a Review</h1>
            {reservation && (
              <p className="text-gray-500 text-sm mb-6">
                {reservation.room_category} — Room {reservation.room_number} ·{' '}
                {new Date(reservation.check_in_date).toLocaleDateString()} to {new Date(reservation.check_out_date).toLocaleDateString()}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Overall Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                      className="text-3xl transition-transform hover:scale-110">
                      <FaStar className={star <= (hovered || rating) ? 'text-gold-500' : 'text-gray-200'} />
                    </button>
                  ))}
                </div>
                {(hovered || rating) > 0 && (
                  <p className="text-sm text-bamboo-600 font-medium mt-2">{ratingLabels[hovered || rating]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Review</label>
                <textarea rows={5} required className="input-field resize-none"
                  placeholder="Share your experience — what did you love? What could be improved?"
                  value={comment} onChange={(e) => setComment(e.target.value)} />
                <p className="text-xs text-gray-400 mt-1">{comment.length}/500 characters</p>
              </div>

              <button type="submit" disabled={submitting || rating === 0} className="btn-primary w-full py-3">
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function NewReviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-bamboo-200 border-t-bamboo-600 rounded-full animate-spin" /></div>}>
      <NewReviewContent />
    </Suspense>
  );
}
