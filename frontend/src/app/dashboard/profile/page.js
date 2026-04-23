'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState({ first_name: '', last_name: '', phone: '' });
  const [passwords, setPasswords] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
    if (user) {
      setProfile({ first_name: user.first_name, last_name: user.last_name, phone: user.phone || '' });
    }
  }, [user, loading]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await api.put('/auth/profile', profile);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.new_password !== passwords.confirm_password) {
      toast.error('New passwords do not match');
      return;
    }
    setSavingPassword(true);
    try {
      await api.put('/auth/change-password', {
        current_password: passwords.current_password,
        new_password: passwords.new_password,
      });
      toast.success('Password changed successfully');
      setPasswords({ current_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password change failed');
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading || !user) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-2xl mx-auto px-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-bamboo-600 hover:text-bamboo-800 text-sm font-medium mb-6 transition-colors">
            <FaArrowLeft className="text-xs" /> Back to Dashboard
          </Link>

          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

          {/* Profile info */}
          <div className="card p-7 mb-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 bg-bamboo-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">{user.first_name[0]}{user.last_name[0]}</span>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-gray-900">{user.first_name} {user.last_name}</h2>
                <p className="text-gray-500 text-sm capitalize">{user.role} · Member since {new Date(user.created_at || Date.now()).getFullYear()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-1">
              <FaUser className="text-bamboo-500 text-sm" />
              <h3 className="font-semibold text-gray-800">Personal Information</h3>
            </div>
            <p className="text-sm text-gray-500 mb-5">Update your personal details</p>

            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">First Name</label>
                  <input type="text" required className="input-field"
                    value={profile.first_name}
                    onChange={(e) => setProfile({ ...profile, first_name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Last Name</label>
                  <input type="text" required className="input-field"
                    value={profile.last_name}
                    onChange={(e) => setProfile({ ...profile, last_name: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input type="email" disabled className="input-field pl-9 bg-gray-50 text-gray-400 cursor-not-allowed" value={user.email} />
                </div>
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Phone Number</label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input type="tel" className="input-field pl-9" placeholder="+1 234 567 8900"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                </div>
              </div>
              <button type="submit" disabled={savingProfile} className="btn-primary">
                {savingProfile ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Change password */}
          <div className="card p-7">
            <div className="flex items-center gap-2 mb-1">
              <FaLock className="text-bamboo-500 text-sm" />
              <h3 className="font-semibold text-gray-800">Change Password</h3>
            </div>
            <p className="text-sm text-gray-500 mb-5">Keep your account secure with a strong password</p>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Current Password</label>
                <input type="password" required className="input-field" placeholder="••••••••"
                  value={passwords.current_password}
                  onChange={(e) => setPasswords({ ...passwords, current_password: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">New Password</label>
                <input type="password" required minLength={6} className="input-field" placeholder="Min. 6 characters"
                  value={passwords.new_password}
                  onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Confirm New Password</label>
                <input type="password" required className="input-field" placeholder="Repeat new password"
                  value={passwords.confirm_password}
                  onChange={(e) => setPasswords({ ...passwords, confirm_password: e.target.value })} />
              </div>
              <button type="submit" disabled={savingPassword} className="btn-primary">
                {savingPassword ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
