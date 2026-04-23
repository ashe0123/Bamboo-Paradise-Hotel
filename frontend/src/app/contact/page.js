'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { HOTEL_IMAGES } from '@/lib/images';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', form);
      toast.success('Message sent! We\'ll get back to you within 24 hours.');
      setSent(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative h-64 overflow-hidden">
        <Image src={HOTEL_IMAGES.lobby} alt="Contact Us" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-bamboo-900/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-bamboo-300 text-sm font-semibold uppercase tracking-widest mb-2">Get In Touch</p>
          <h1 className="font-serif text-5xl font-bold mb-2">Contact Us</h1>
          <p className="text-bamboo-100">We'd love to hear from you</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Info */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-5">Reach Us Anytime</h2>
            <div className="space-y-4">
              {[
                { icon: <FaMapMarkerAlt className="text-bamboo-500 text-lg mt-0.5" />, label: 'Address', value: '123 Bamboo Garden Road, Paradise City, PC 10001' },
                { icon: <FaPhone className="text-bamboo-500 text-lg" />, label: 'Phone', value: '+1 (555) 123-4567' },
                { icon: <FaWhatsapp className="text-bamboo-500 text-lg" />, label: 'WhatsApp', value: '+1 (555) 123-4568' },
                { icon: <FaEnvelope className="text-bamboo-500 text-lg" />, label: 'Email', value: 'info@bambooparadise.com' },
                { icon: <FaClock className="text-bamboo-500 text-lg" />, label: 'Front Desk', value: '24 Hours / 7 Days a Week' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <span className="shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{item.label}</p>
                    <p className="text-gray-700 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map placeholder with real image */}
          <div className="relative h-52 rounded-2xl overflow-hidden shadow-md">
            <Image src={HOTEL_IMAGES.garden} alt="Hotel Location" fill className="object-cover" sizes="(max-width:1024px) 100vw, 40vw" />
            <div className="absolute inset-0 bg-bamboo-900/50 flex items-center justify-center">
              <div className="text-center text-white">
                <FaMapMarkerAlt className="text-4xl mx-auto mb-2 text-bamboo-300" />
                <p className="font-semibold">Bamboo Paradise Hotel</p>
                <p className="text-sm text-white/70">Paradise City, PC 10001</p>
              </div>
            </div>
          </div>

          <div className="bg-bamboo-50 border border-bamboo-100 rounded-xl p-5">
            <h3 className="font-semibold text-bamboo-800 mb-2">Reservations Hotline</h3>
            <p className="text-sm text-gray-600 mb-2">For faster service, call our dedicated reservations line:</p>
            <p className="text-bamboo-700 font-bold text-lg">+1 (555) 123-4568</p>
            <p className="text-xs text-gray-400 mt-1">Available 24/7</p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Send a Message</h2>
            <p className="text-gray-500 text-sm mb-6">We typically respond within 2–4 hours during business hours.</p>

            {sent ? (
              <div className="text-center py-12">
                <FaCheckCircle className="text-emerald-500 text-5xl mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                <p className="text-gray-500 mb-5">Thank you for reaching out. We'll get back to you soon.</p>
                <button onClick={() => setSent(false)} className="btn-outline text-sm">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Full Name *</label>
                    <input type="text" required className="input-field" value={form.name} onChange={set('name')} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Phone</label>
                    <input type="tel" className="input-field" value={form.phone} onChange={set('phone')} placeholder="Optional" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Email Address *</label>
                  <input type="email" required className="input-field" value={form.email} onChange={set('email')} placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Subject</label>
                  <select className="input-field" value={form.subject} onChange={set('subject')}>
                    <option value="">Select a subject</option>
                    <option>Reservation Inquiry</option>
                    <option>Room Information</option>
                    <option>Special Occasions</option>
                    <option>Group Bookings</option>
                    <option>Feedback & Complaints</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Message *</label>
                  <textarea rows={5} required className="input-field resize-none" value={form.message} onChange={set('message')} placeholder="How can we help you?" />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
