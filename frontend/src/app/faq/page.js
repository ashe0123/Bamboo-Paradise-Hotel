'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { HOTEL_IMAGES } from '@/lib/images';
import { FaChevronDown, FaLeaf } from 'react-icons/fa';
import Link from 'next/link';

const faqs = [
  {
    category: 'Reservations',
    items: [
      { q: 'How do I make a reservation?', a: 'You can book directly on our website by browsing available rooms, selecting your dates, and completing the reservation form. You\'ll need to create an account or sign in to complete your booking.' },
      { q: 'Can I modify or cancel my reservation?', a: 'Yes, you can cancel your reservation from your dashboard before check-in. We offer free cancellation on all bookings. Modifications can be made by cancelling and rebooking.' },
      { q: 'What is the minimum stay?', a: 'Our minimum stay is 1 night. For peak seasons and special events, a minimum of 2 nights may apply.' },
      { q: 'Is a deposit required?', a: 'Full payment is required at the time of booking to confirm your reservation. We accept credit cards, debit cards, and bank transfers.' },
    ],
  },
  {
    category: 'Check-in & Check-out',
    items: [
      { q: 'What are the check-in and check-out times?', a: 'Check-in is from 2:00 PM and check-out is by 12:00 PM (noon). Early check-in and late check-out may be available upon request, subject to availability.' },
      { q: 'What do I need to bring for check-in?', a: 'Please bring a valid government-issued photo ID (passport or national ID) and the credit/debit card used for payment. Your reservation confirmation number will also be required.' },
      { q: 'Is there a 24-hour front desk?', a: 'Yes, our front desk is staffed 24 hours a day, 7 days a week to assist you with any needs.' },
    ],
  },
  {
    category: 'Rooms & Amenities',
    items: [
      { q: 'Is WiFi included?', a: 'Yes, complimentary high-speed fiber WiFi is available throughout the entire property, including all rooms, common areas, and the pool area.' },
      { q: 'Are rooms air-conditioned?', a: 'All rooms are equipped with individually controlled air conditioning and heating systems.' },
      { q: 'Do you have accessible rooms?', a: 'Yes, we have fully accessible rooms available for guests with disabilities. Please mention your requirements when booking.' },
      { q: 'Is breakfast included?', a: 'Breakfast is not automatically included but can be added to your booking. Our breakfast buffet is available daily from 6:30 AM to 10:30 AM.' },
    ],
  },
  {
    category: 'Services & Facilities',
    items: [
      { q: 'How do I request hotel services?', a: 'Once you have a confirmed reservation, you can request services (spa, laundry, room service, etc.) from your guest dashboard or by calling the front desk.' },
      { q: 'Is there parking available?', a: 'Yes, we offer complimentary secure parking for all hotel guests, including EV charging stations.' },
      { q: 'Do you offer airport transfers?', a: 'Yes, we offer private airport transfer services. You can book this through our services page or contact the concierge.' },
      { q: 'Are pets allowed?', a: 'We are a pet-free property to maintain the comfort of all our guests. Service animals are welcome with proper documentation.' },
    ],
  },
  {
    category: 'Payments & Policies',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, American Express, debit cards, and bank transfers. Cash payments are accepted at the hotel.' },
      { q: 'Is the hotel smoke-free?', a: 'Yes, Bamboo Paradise Hotel is a 100% smoke-free property. Designated outdoor smoking areas are available.' },
      { q: 'What is your child policy?', a: 'Children of all ages are welcome. Children under 5 stay free when using existing bedding. Extra beds and cribs are available upon request.' },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition-colors">
        <span className="font-semibold text-gray-800 pr-4">{q}</span>
        <FaChevronDown className={`text-bamboo-500 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Navbar />

      <section className="relative h-64 overflow-hidden">
        <Image src={HOTEL_IMAGES.lobby} alt="FAQ" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-bamboo-900/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-bamboo-300 text-sm font-semibold uppercase tracking-widest mb-2">Help Center</p>
          <h1 className="font-serif text-5xl font-bold">Frequently Asked Questions</h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {faqs.map((section) => (
          <div key={section.category} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <FaLeaf className="text-bamboo-500" />
              <h2 className="font-serif text-xl font-bold text-bamboo-800">{section.category}</h2>
            </div>
            <div className="space-y-3">
              {section.items.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}

        <div className="bg-bamboo-50 border border-bamboo-100 rounded-2xl p-8 text-center mt-10">
          <h3 className="font-serif text-xl font-bold text-bamboo-800 mb-2">Still have questions?</h3>
          <p className="text-gray-500 mb-4">Our team is available 24/7 to help you.</p>
          <Link href="/contact" className="btn-primary text-sm">Contact Us</Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
