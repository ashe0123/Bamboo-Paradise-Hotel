import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { HOTEL_IMAGES } from '@/lib/images';
import { FaLeaf, FaAward, FaHeart, FaUsers, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <Image src={HOTEL_IMAGES.exterior} alt="Bamboo Paradise Hotel" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-bamboo-900/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-bamboo-300 text-sm font-semibold uppercase tracking-widest mb-2">Our Story</p>
          <h1 className="font-serif text-5xl font-bold mb-3">About Us</h1>
          <p className="text-bamboo-100 text-lg">Our story, our values, our promise</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-bamboo-600 font-semibold text-sm uppercase tracking-widest mb-2">Who We Are</p>
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-5 leading-tight">
              A Sanctuary Born from<br />Love of Nature
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Bamboo Paradise Hotel was founded with a simple vision: to create a sanctuary where guests could reconnect with nature without sacrificing luxury. Nestled among lush bamboo gardens, our hotel has been welcoming travelers from around the world since its founding.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Every corner of our hotel reflects our deep respect for nature and our commitment to sustainable hospitality. From our bamboo-themed interiors to our eco-friendly practices, we strive to offer an experience that is both indulgent and responsible.
            </p>
            <div className="space-y-2.5 mb-7">
              {['Sustainably sourced bamboo materials throughout', 'Solar-powered energy systems', 'Zero-waste kitchen and composting program', 'Local community employment and sourcing'].map(p => (
                <div key={p} className="flex items-center gap-2.5 text-gray-600 text-sm">
                  <FaCheckCircle className="text-bamboo-500 shrink-0" />{p}
                </div>
              ))}
            </div>
            <Link href="/rooms" className="btn-primary inline-flex items-center gap-2">
              Book Your Stay <FaArrowRight className="text-xs" />
            </Link>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] relative">
              <Image src={HOTEL_IMAGES.lobby} alt="Hotel Lobby" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-bamboo-700 text-white rounded-2xl p-5 shadow-xl hidden md:block">
              <p className="font-serif text-3xl font-bold">15+</p>
              <p className="text-bamboo-200 text-sm">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-bamboo-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Values</p>
            <h2 className="font-serif text-4xl font-bold text-gray-900">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FaHeart className="text-red-400 text-4xl" />, title: 'Genuine Hospitality', desc: 'We treat every guest like family, going above and beyond to make your stay truly memorable and personal.' },
              { icon: <FaLeaf className="text-bamboo-500 text-4xl" />, title: 'Sustainability', desc: 'Our operations are guided by eco-conscious practices to protect the natural beauty that surrounds us.' },
              { icon: <FaAward className="text-gold-500 text-4xl" />, title: 'Excellence', desc: 'We hold ourselves to the highest standards in every aspect of our service, facilities, and guest experience.' },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex justify-center mb-4">{v.icon}</div>
                <h3 className="font-serif text-xl font-bold mb-3 text-gray-900">{v.title}</h3>
                <p className="text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-bamboo-800 text-white">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '50+', label: 'Rooms & Suites' },
            { value: '10K+', label: 'Happy Guests' },
            { value: '15+', label: 'Years of Service' },
            { value: '4.9★', label: 'Average Rating' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-serif text-4xl font-bold text-gold-400 mb-1">{s.value}</p>
              <p className="text-bamboo-200 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities image grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-bamboo-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Facilities</p>
            <h2 className="font-serif text-4xl font-bold text-gray-900">A Glimpse Inside</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[HOTEL_IMAGES.pool, HOTEL_IMAGES.restaurant, HOTEL_IMAGES.spa, HOTEL_IMAGES.gym, HOTEL_IMAGES.bar, HOTEL_IMAGES.garden].map((src, i) => (
              <div key={i} className="relative h-48 rounded-2xl overflow-hidden group">
                <Image src={src} alt={`Facility ${i+1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-bamboo-600 font-semibold text-sm uppercase tracking-widest mb-2">Our People</p>
            <h2 className="font-serif text-4xl font-bold text-gray-900">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { name: 'Maria Santos', role: 'General Manager', initial: 'MS', desc: '20 years in luxury hospitality across 3 continents.' },
              { name: 'David Chen', role: 'Executive Chef', initial: 'DC', desc: 'Award-winning chef specializing in Asian fusion cuisine.' },
              { name: 'Aisha Patel', role: 'Spa Director', initial: 'AP', desc: 'Certified wellness expert with 15 years of experience.' },
            ].map((m) => (
              <div key={m.name} className="bg-white rounded-2xl p-7 text-center shadow-md border border-gray-100">
                <div className="w-20 h-20 rounded-full bg-bamboo-100 flex items-center justify-center mx-auto mb-4 border-4 border-bamboo-200">
                  <span className="font-bold text-bamboo-700 text-2xl">{m.initial}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-gray-900">{m.name}</h3>
                <p className="text-bamboo-600 text-sm font-medium mb-2">{m.role}</p>
                <p className="text-gray-500 text-sm">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <Image src={HOTEL_IMAGES.garden} alt="Hotel Garden" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-bamboo-900/80" />
        <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-4">
          <h2 className="font-serif text-4xl font-bold mb-4">Come Experience It Yourself</h2>
          <p className="text-bamboo-100 mb-7 text-lg">Words can only say so much. Book your stay and discover Bamboo Paradise.</p>
          <Link href="/rooms" className="btn-primary text-lg py-3.5 px-10">Book Now</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
