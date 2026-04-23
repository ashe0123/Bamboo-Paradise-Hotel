'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FaLeaf, FaTachometerAlt, FaBed, FaCalendarAlt, FaConciergeBell, FaStar, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const navItems = [
  { href: '/admin', icon: <FaTachometerAlt />, label: 'Dashboard' },
  { href: '/admin/rooms', icon: <FaBed />, label: 'Rooms' },
  { href: '/admin/reservations', icon: <FaCalendarAlt />, label: 'Reservations' },
  { href: '/admin/services', icon: <FaConciergeBell />, label: 'Services' },
  { href: '/admin/reviews', icon: <FaStar />, label: 'Reviews' },
  { href: '/admin/messages', icon: <FaEnvelope />, label: 'Messages' },
];

export default function AdminLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !['admin', 'staff'].includes(user.role))) {
      router.push('/login');
    }
  }, [user, loading]);

  if (loading || !user) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-bamboo-900 text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-bamboo-800">
          <div className="flex items-center gap-2">
            <FaLeaf className="text-bamboo-400 text-xl" />
            <span className="font-serif font-bold text-lg">Admin Panel</span>
          </div>
          <p className="text-xs text-bamboo-400 mt-1">{user.first_name} {user.last_name}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-bamboo-200 hover:bg-bamboo-800 hover:text-white transition-colors text-sm">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-bamboo-800">
          <button onClick={logout}
            className="flex items-center gap-2 text-bamboo-300 hover:text-white text-sm transition-colors w-full">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
