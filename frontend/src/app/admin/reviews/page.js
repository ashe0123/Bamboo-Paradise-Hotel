'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get('/reviews/all').then(({ data }) => setReviews(data.reviews));
  }, []);

  const togglePublish = async (id) => {
    try {
      const { data } = await api.put(`/reviews/${id}/publish`);
      setReviews(reviews.map(r => r.id === id ? data.review : r));
      toast.success(data.review.is_published ? 'Review published' : 'Review unpublished');
    } catch {
      toast.error('Failed to update review');
    }
  };

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-bold text-gray-800 mb-6">Guest Reviews</h1>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-400 text-center py-10">No reviews yet</p>
        ) : reviews.map((r) => (
          <div key={r.id} className="bg-white rounded-xl shadow p-5">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-800">{r.first_name} {r.last_name}</span>
                  <span className="text-xs text-gray-400">{r.email}</span>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} className={i < r.rating ? 'text-gold-500' : 'text-gray-200'} />
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{r.comment}</p>
                <p className="text-xs text-gray-400 mt-2">{new Date(r.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${r.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {r.is_published ? 'Published' : 'Hidden'}
                </span>
                <button onClick={() => togglePublish(r.id)}
                  className={`text-xs px-3 py-1 rounded-lg border font-medium transition-colors ${r.is_published ? 'border-red-300 text-red-500 hover:bg-red-50' : 'border-bamboo-400 text-bamboo-600 hover:bg-bamboo-50'}`}>
                  {r.is_published ? 'Unpublish' : 'Publish'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
