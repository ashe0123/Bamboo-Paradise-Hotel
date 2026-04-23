'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatusBadge from '@/components/StatusBadge';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaCheck, FaCreditCard, FaUniversity, FaMoneyBill } from 'react-icons/fa';

const paymentMethods = [
  { value: 'credit_card', label: 'Credit Card', icon: <FaCreditCard /> },
  { value: 'debit_card', label: 'Debit Card', icon: <FaCreditCard /> },
  { value: 'bank_transfer', label: 'Bank Transfer', icon: <FaUniversity /> },
  { value: 'cash', label: 'Cash at Hotel', icon: <FaMoneyBill /> },
];

export default function ReservationDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [reservation, setReservation] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payMethod, setPayMethod] = useState('credit_card');
  const [paying, setPaying] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    api.get(`/reservations/${id}`)
      .then(({ data }) => {
        setReservation(data.reservation);
        setPayment(data.payment);
        setLoading(false);
      })
      .catch(() => { setLoading(false); router.push('/dashboard'); });
  }, [id]);

  const handlePay = async () => {
    setPaying(true);
    try {
      const { data } = await api.post('/payments', { reservation_id: id, payment_method: payMethod });
      toast.success(data.message);
      setReservation(prev => ({ ...prev, status: 'confirmed' }));
      setPayment(data.payment);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed');
    } finally {
      setPaying(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this reservation?')) return;
    setCancelling(true);
    try {
      await api.put(`/reservations/${id}/cancel`);
      toast.success('Reservation cancelled successfully');
      setReservation(prev => ({ ...prev, status: 'cancelled' }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cancellation failed');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return (
    <><Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-bamboo-200 border-t-bamboo-600 rounded-full animate-spin" />
      </div>
    </>
  );
  if (!reservation) return null;

  const nights = Math.ceil(
    (new Date(reservation.check_out_date) - new Date(reservation.check_in_date)) / (1000 * 60 * 60 * 24)
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-bamboo-600 hover:text-bamboo-800 text-sm font-medium mb-6 transition-colors">
            <FaArrowLeft className="text-xs" /> Back to Dashboard
          </Link>

          <div className="card p-8 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="font-serif text-2xl font-bold text-gray-900 mb-1">Reservation Details</h1>
                <p className="font-mono text-sm text-bamboo-600 font-semibold">{reservation.reservation_number}</p>
              </div>
              <StatusBadge status={reservation.status} />
            </div>

            <div className="grid grid-cols-2 gap-5 mb-6">
              {[
                { label: 'Room', value: `${reservation.room_category} — Room ${reservation.room_number}` },
                { label: 'Floor', value: `Floor ${reservation.floor}` },
                { label: 'Check-in', value: new Date(reservation.check_in_date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) },
                { label: 'Check-out', value: new Date(reservation.check_out_date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) },
                { label: 'Duration', value: `${nights} night${nights > 1 ? 's' : ''}` },
                { label: 'Guests', value: `${reservation.adults} Adult${reservation.adults > 1 ? 's' : ''}${reservation.children > 0 ? `, ${reservation.children} Child${reservation.children > 1 ? 'ren' : ''}` : ''}` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="font-semibold text-gray-800">{value}</p>
                </div>
              ))}
            </div>

            {reservation.special_requests && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
                <p className="text-xs text-amber-600 uppercase tracking-wide font-semibold mb-1">Special Requests</p>
                <p className="text-gray-700 text-sm">{reservation.special_requests}</p>
              </div>
            )}

            {/* Price breakdown */}
            <div className="bg-gray-50 rounded-xl p-5 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Price Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>${parseFloat(reservation.price_per_night).toFixed(0)} × {nights} night{nights > 1 ? 's' : ''}</span>
                  <span>${parseFloat(reservation.total_amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Taxes & fees</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 border-t pt-2 text-base">
                  <span>Total</span>
                  <span className="text-bamboo-700">${parseFloat(reservation.total_amount).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment info */}
            {payment && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <FaCheck className="text-emerald-600" />
                  <span className="font-semibold text-emerald-800">Payment Confirmed</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-400">Transaction ID</p>
                    <p className="font-mono font-semibold text-gray-700">{payment.transaction_id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Method</p>
                    <p className="font-semibold text-gray-700 capitalize">{payment.payment_method.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Amount Paid</p>
                    <p className="font-bold text-emerald-700">${parseFloat(payment.amount).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Paid On</p>
                    <p className="font-semibold text-gray-700">{new Date(payment.paid_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Payment form */}
            {reservation.status === 'pending' && !payment && (
              <div className="border-t pt-6">
                <h3 className="font-serif text-lg font-bold text-gray-800 mb-4">Complete Your Payment</h3>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {paymentMethods.map((m) => (
                    <label key={m.value}
                      className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-xl border-2 transition-all ${payMethod === m.value ? 'border-bamboo-500 bg-bamboo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="radio" name="payment" value={m.value} checked={payMethod === m.value}
                        onChange={() => setPayMethod(m.value)} className="hidden" />
                      <span className="text-bamboo-600">{m.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{m.label}</span>
                    </label>
                  ))}
                </div>
                <button onClick={handlePay} disabled={paying}
                  className="btn-primary w-full py-3.5 text-base">
                  {paying ? 'Processing Payment...' : `Pay $${parseFloat(reservation.total_amount).toFixed(2)}`}
                </button>
                <p className="text-center text-xs text-gray-400 mt-2">🔒 Secure payment processing</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t">
              {['pending', 'confirmed'].includes(reservation.status) && (
                <button onClick={handleCancel} disabled={cancelling}
                  className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors">
                  {cancelling ? 'Cancelling...' : 'Cancel Reservation'}
                </button>
              )}
              {reservation.status === 'checked_out' && (
                <Link href={`/dashboard/reviews/new?reservation=${id}`} className="btn-secondary text-sm py-2 px-4">
                  Leave a Review
                </Link>
              )}
              {reservation.status === 'checked_in' && (
                <Link href="/services" className="btn-primary text-sm py-2 px-4">
                  Request a Service
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
