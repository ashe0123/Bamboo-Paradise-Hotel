'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { HOTEL_IMAGES } from '@/lib/images';
import toast from 'react-hot-toast';
import { FaLeaf, FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success('Account created! Welcome to Bamboo Paradise.');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image src={HOTEL_IMAGES.pool} alt="Bamboo Paradise Hotel" fill className="object-cover" sizes="50vw" />
        <div className="absolute inset-0 bg-bamboo-900/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <FaLeaf className="text-bamboo-300 text-5xl mb-4" />
          <h2 className="font-serif text-4xl font-bold mb-3 text-center">Join Bamboo Paradise</h2>
          <p className="text-bamboo-100 text-center text-lg">Create your account and start your journey</p>
          <div className="mt-8 space-y-3 w-full max-w-xs">
            {['Exclusive member rates', 'Easy online booking', 'Track all your reservations', 'Request services anytime'].map(f => (
              <div key={f} className="flex items-center gap-2 text-bamboo-100 text-sm">
                <div className="w-1.5 h-1.5 bg-bamboo-400 rounded-full" />{f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-9 h-9 bg-bamboo-700 rounded-lg flex items-center justify-center">
                <FaLeaf className="text-white" />
              </div>
              <span className="font-serif text-lg font-bold text-bamboo-800">Bamboo Paradise</span>
            </Link>
            <h1 className="font-serif text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500 mt-1">Join Bamboo Paradise today</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">First Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <input type="text" required className="input-field pl-8 text-sm" value={form.first_name} onChange={set('first_name')} placeholder="John" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Last Name</label>
                  <input type="text" required className="input-field text-sm" value={form.last_name} onChange={set('last_name')} placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input type="email" required className="input-field pl-9" value={form.email} onChange={set('email')} placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Phone Number</label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input type="tel" className="input-field pl-9" value={form.phone} onChange={set('phone')} placeholder="+1 234 567 8900" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input type="password" required minLength={6} className="input-field pl-9" value={form.password} onChange={set('password')} placeholder="Min. 6 characters" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base mt-2">
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-bamboo-600 font-semibold hover:underline">Sign in</Link>
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            <Link href="/" className="hover:text-bamboo-600 transition-colors">← Back to website</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
