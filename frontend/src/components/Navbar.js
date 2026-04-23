'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FaBars, FaTimes, FaLeaf, FaUser, FaChevronDown, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Rooms & Suites' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href) => pathname === href;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-bamboo-700 rounded-lg flex items-center justify-center group-hover:bg-bamboo-800 transition-colors">
              <FaLeaf className="text-white text-lg" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-bamboo-800 block leading-tight">Bamboo Paradise</span>
              <span className="text-xs text-bamboo-500 tracking-widest uppercase">Hotel & Resort</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(l.href)
                    ? 'text-bamboo-700 bg-bamboo-50'
                    : 'text-gray-600 hover:text-bamboo-700 hover:bg-bamboo-50'
                }`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-bamboo-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{user.first_name[0]}{user.last_name[0]}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.first_name}</span>
                  <FaChevronDown className={`text-gray-400 text-xs transition-transform ${userMenu ? 'rotate-180' : ''}`} />
                </button>
                {userMenu && (
                  <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{user.first_name} {user.last_name}</p>
                      <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                    </div>
                    {(user.role === 'admin' || user.role === 'staff') && (
                      <Link href="/admin" onClick={() => setUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-bamboo-700 hover:bg-bamboo-50 font-medium">
                        <FaTachometerAlt className="text-xs" /> Admin Dashboard
                      </Link>
                    )}
                    <Link href="/dashboard" onClick={() => setUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <FaUser className="text-xs" /> My Account
                    </Link>
                    <button onClick={() => { logout(); setUserMenu(false); }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                      <FaSignOutAlt className="text-xs" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="btn-ghost text-sm">Sign In</Link>
                <Link href="/register" className="btn-primary text-sm py-2 px-5">Book Now</Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100" onClick={() => setOpen(!open)}>
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(l.href) ? 'text-bamboo-700 bg-bamboo-50' : 'text-gray-700 hover:bg-gray-50'
              }`}>
              {l.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">My Account</Link>
                {(user.role === 'admin' || user.role === 'staff') && (
                  <Link href="/admin" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-bamboo-700 font-semibold hover:bg-bamboo-50 rounded-lg">Admin Dashboard</Link>
                )}
                <button onClick={() => { logout(); setOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg">Sign Out</button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" onClick={() => setOpen(false)} className="btn-outline flex-1 text-center text-sm py-2">Sign In</Link>
                <Link href="/register" onClick={() => setOpen(false)} className="btn-primary flex-1 text-center text-sm py-2">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
