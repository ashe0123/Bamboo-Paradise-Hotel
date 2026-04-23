import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { HOTEL_IMAGES } from '@/lib/images';
import {
  FaLeaf, FaSpa, FaUtensils, FaCar, FaStar, FaShieldAlt,
  FaConciergeBell, FaArrowRight, FaPhone, FaCheckCircle,
  FaSwimmingPool, FaDumbbell, FaWifi, FaParking,
  FaQuoteLeft, FaAward, FaHeart
} from 'react-icons/fa';

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src={HOTEL_IMAGES.hero}
          alt="Bamboo Paradise Hotel"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <FaLeaf className="text-bamboo-300 text-sm" />
            <span className="text-sm text-white tracking-widest uppercase">Luxury Eco Resort</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4 leading-tight drop-shadow-lg">
            Bamboo Paradise<br />
            <span className="text-bamboo-300">Hotel & Resort</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-3 font-light">Where Luxury Meets Nature</p>
          <p className="text-base text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Escape to a world of tranquility and elegance. Nestled in lush bamboo gardens, we offer an unforgettable experience of comfort, serenity, and world-class hospitality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rooms" className="btn-secondary text-base py-3.5 px-10 shadow-xl">
              Book Your Stay
            </Link>
            <Link href="/about" className="inline-flex items-center justify-center border-2 border-white/50 text-white hover:bg-white/10 font-semibold py-3.5 px-8 rounded-lg transition-all duration-200 backdrop-blur-sm">
              Explore Hotel
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-white/70">
            {['Best Eco Hotel 2024', '4.9★ Guest Rating', '10,000+ Happy Guests', 'Free Cancellation'].map((b) => (
              <div key={b} className="flex items-center gap-1.5">
                <FaCheckCircle className="text-bamboo-400 text-xs" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── QUICK BOOKING BAR ── */}
      <section className="bg-bamboo-800 py-0">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 -mt-10 relative z-10">
            <h2 className="text-center font-serif text-xl font-bold text-gray-800 mb-5">Check Availability</h2>
            <form action="/rooms" method="get" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Check-in</label>
                <input type="date" name="check_in" className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Check-out</label>
                <input type="date" name="check_out" className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Adults</label>
                <select name="adults" className="input-field">
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Adult{n>1?'s':''}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Room Type</label>
                <select name="type" className="input-field">
                  <option value="">Any Type</option>
                  <option>Standard Room</option>
                  <option>Deluxe Room</option>
                  <option>Junior Suite</option>
                  <option>Bamboo Suite</option>
                  <option>Family Room</option>
                </select>
              </div>
              <div className="flex items-end">
                <button type="submit" className="btn-primary w-full py-2.5">Search Rooms</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image src={HOTEL_IMAGES.lobby} alt="Hotel Lobby" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-bamboo-700 text-white rounded-2xl p-5 shadow-xl hidden md:block">
              <p className="font-serif text-3xl font-bold">15+</p>
              <p className="text-bamboo-200 text-sm">Years of Excellence</p>
            </div>
          </div>
          <div>
            <p className="text-bamboo-600 font-semibold text-sm uppercase tracking-widest mb-2">Welcome to Paradise</p>
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-5 leading-tight">
              A Sanctuary Where<br />Nature Meets Luxury
            </h2>
            <p className="text-gray-500 leading-relaxed mb-5">
              Bamboo Paradise Hotel is a world-class eco-luxury resort nestled among lush bamboo gardens. Every detail — from our sustainably sourced furnishings to our farm-to-table dining — reflects our deep commitment to nature and exceptional hospitality.
            </p>
            <p className="text-gray-500 leading-relaxed mb-7">
              Whether you're here for a romantic getaway, a family vacation, or a business retreat, our dedicated team ensures every moment of your stay is extraordinary.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-7">
              {[
                { value: '50+', label: 'Rooms & Suites' },
                { value: '10K+', label: 'Happy Guests' },
                { value: '4.9★', label: 'Average Rating' },
                { value: '24/7', label: 'Concierge Service' },
              ].map(s => (
                <div key={s.label} className="bg-bamboo-50 rounded-xl p-4">
                  <p className="font-serif text-2xl font-bold text-bamboo-700">{s.value}</p>
                  <p className="text-sm text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
            <Link href="/about" className="btn-primary inline-flex items-center gap-2">
              Discover Our Story <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ROOMS SHOWCASE ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-bamboo-600 font-semibold text-sm uppercase tracking-widest mb-2">Accommodations</p>
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-3">Rooms & Suites</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">From cozy standard rooms to lavish bamboo suites — every space is a sanctuary</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Standard Room', price: 89, img: HOTEL_IMAGES.standardRoom, features: ['King Bed', 'City View', 'Free WiFi', 'Smart TV'], desc: 'Comfortable and well-appointed with all essential amenities.' },
              { name: 'Deluxe Room', price: 149, img: HOTEL_IMAGES.deluxeRoom, features: ['King Bed', 'Garden View', 'Mini Bar', 'Bathtub'], desc: 'Spacious rooms with premium furnishings and garden views.', featured: true },
              { name: 'Junior Suite', price: 229, img: HOTEL_IMAGES.juniorSuite, features: ['Living Area', 'Balcony', 'Bathtub', 'Mini Bar'], desc: 'Elegant suite with a separate living area and balcony.' },
              { name: 'Bamboo Suite', price: 349, img: HOTEL_IMAGES.bambooSuite, features: ['Private Balcony', 'Jacuzzi', 'Butler Service', 'Full Bar'], desc: 'Our signature suite with panoramic views and butler service.' },
              { name: 'Family Room', price: 199, img: HOTEL_IMAGES.familyRoom, features: ['Bunk Beds', 'Kids Corner', 'Mini Bar', 'Smart TV'], desc: 'Spacious family room designed for comfort and fun.' },
              { name: 'Penthouse', price: 499, img: HOTEL_IMAGES.bambooSuite2, features: ['Rooftop Terrace', 'Private Pool', 'Chef Service', 'Panoramic View'], desc: 'The ultimate luxury experience at the top of the hotel.' },
            ].map((r, i) => (
              <div key={r.name} className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group ${r.featured ? 'ring-2 ring-bamboo-500' : ''}`}>
                {r.featured && (
                  <div className="bg-bamboo-600 text-white text-center py-1.5 text-xs font-bold tracking-widest uppercase">Most Popular</div>
                )}
                <div className="relative h-52 overflow-hidden">
                  <Image src={r.img} alt={r.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <p className="font-serif text-lg font-bold">{r.name}</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1">
                    <span className="text-bamboo-700 font-bold text-sm">${r.price}</span>
                    <span className="text-gray-400 text-xs">/night</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-500 text-sm mb-3 leading-relaxed">{r.desc}</p>
                  <div className="grid grid-cols-2 gap-1.5 mb-4">
                    {r.features.map(f => (
                      <div key={f} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <FaCheckCircle className="text-bamboo-500 shrink-0" />{f}
                      </div>
                    ))}
                  </div>
                  <Link href="/rooms" className={`block text-center py-2.5 rounded-lg font-semibold text-sm transition-all ${r.featured ? 'btn-primary' : 'btn-outline'}`}>
                    View Room
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/rooms" className="btn-primary inline-flex items-center gap-2 text-base py-3 px-8">
              View All Rooms <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── AMENITIES GRID ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-bamboo-600 font-semibold text-sm uppercase tracking-widest mb-2">Hotel Facilities</p>
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-3">World-Class Amenities</h2>
            <p className="text-gray-500 text-lg">Everything you need for a perfect stay</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: HOTEL_IMAGES.pool, title: 'Infinity Pool', desc: 'Swim in our stunning infinity pool overlooking the bamboo gardens, open daily from 6 AM to 10 PM.' },
              { img: HOTEL_IMAGES.restaurant, title: 'Fine Dining Restaurant', desc: 'Award-winning cuisine crafted from locally sourced ingredients. Open for breakfast, lunch, and dinner.' },
              { img: HOTEL_IMAGES.spa, title: 'Bamboo Spa & Wellness', desc: 'Rejuvenate with our signature bamboo oil treatments, massages, and holistic wellness programs.' },
              { img: HOTEL_IMAGES.gym, title: 'Fitness Center', desc: 'State-of-the-art gym with personal trainers available. Open 24 hours for hotel guests.' },
              { img: HOTEL_IMAGES.bar, title: 'Rooftop Bar & Lounge', desc: 'Enjoy handcrafted cocktails and panoramic views from our stunning rooftop bar.' },
              { img: HOTEL_IMAGES.breakfast, title: 'Breakfast Buffet', desc: 'Start your day with our lavish breakfast buffet featuring local and international favorites.' },
            ].map((a) => (
              <div key={a.title} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image src={a.img} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 text-white font-serif text-lg font-bold">{a.title}</h3>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-gray-500 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES / WHY US ── */}
      <section className="py-24 bg-bamboo-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-bamboo-300 font-semibold text-sm uppercase tracking-widest mb-2">Why Choose Us</p>
            <h2 className="font-serif text-4xl font-bold mb-3">An Experience Like No Other</h2>
            <p className="text-bamboo-200 text-lg">We go beyond accommodation — we create memories</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FaLeaf className="text-3xl" />, title: 'Eco-Friendly', desc: 'Sustainable practices throughout — solar energy, bamboo materials, zero-waste kitchen.' },
              { icon: <FaSpa className="text-3xl" />, title: 'Luxury Spa', desc: 'Signature bamboo oil treatments and holistic wellness programs for mind and body.' },
              { icon: <FaConciergeBell className="text-3xl" />, title: '24/7 Concierge', desc: 'Dedicated concierge team available around the clock for all your needs.' },
              { icon: <FaShieldAlt className="text-3xl" />, title: 'Safe & Secure', desc: 'Round-the-clock security, CCTV, and in-room safe for complete peace of mind.' },
              { icon: <FaWifi className="text-3xl" />, title: 'High-Speed WiFi', desc: 'Complimentary high-speed fiber internet throughout the entire property.' },
              { icon: <FaSwimmingPool className="text-3xl" />, title: 'Infinity Pool', desc: 'Stunning infinity pool with panoramic views of the bamboo gardens.' },
              { icon: <FaParking className="text-3xl" />, title: 'Free Parking', desc: 'Complimentary secure parking for all hotel guests, including EV charging.' },
              { icon: <FaAward className="text-3xl" />, title: 'Award Winning', desc: 'Recognized as Best Eco Hotel 2024 by the International Hospitality Awards.' },
            ].map((f) => (
              <div key={f.title} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-200">
                <div className="text-bamboo-400 mb-4">{f.icon}</div>
                <h3 className="font-serif text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-bamboo-200 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POOL / GARDEN VISUAL BREAK ── */}
      <section className="relative h-96 overflow-hidden">
        <Image src={HOTEL_IMAGES.poolside} alt="Hotel Pool" fill className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <FaHeart className="text-bamboo-400 text-3xl mb-4" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Your Perfect Escape Awaits</h2>
          <p className="text-white/80 text-lg mb-7 max-w-xl">Unwind by our infinity pool, explore the bamboo gardens, or indulge in a spa treatment. Paradise is closer than you think.</p>
          <Link href="/rooms" className="btn-secondary text-base py-3.5 px-10">Reserve Your Room</Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-bamboo-600 font-semibold text-sm uppercase tracking-widest mb-2">Guest Reviews</p>
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-3">What Our Guests Say</h2>
            <div className="flex justify-center gap-1 mt-2">
              {[1,2,3,4,5].map(i => <FaStar key={i} className="text-gold-500 text-lg" />)}
              <span className="text-gray-500 text-sm ml-2 self-center">4.9 / 5 from 2,400+ reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Mitchell', country: 'United States', rating: 5, stay: 'Bamboo Suite', text: 'Absolutely stunning hotel! The bamboo theme is carried throughout beautifully. The staff was incredibly attentive and the spa treatments were world-class. Will definitely return.' },
              { name: 'James Kowalski', country: 'United Kingdom', rating: 5, stay: 'Deluxe Room', text: 'Best hotel experience I\'ve ever had. Woke up to bamboo gardens every morning. The food was exceptional and the rooms were immaculate. The infinity pool is breathtaking.' },
              { name: 'Priya Sharma', country: 'India', rating: 5, stay: 'Junior Suite', text: 'A true paradise. Every detail was perfect — from the welcome drink to the turndown service. The concierge arranged everything flawlessly. Highly recommend for couples.' },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-7 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <FaQuoteLeft className="text-bamboo-200 text-3xl mb-4" />
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => <FaStar key={i} className="text-gold-500 text-sm" />)}
                </div>
                <p className="text-gray-600 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 bg-bamboo-100 rounded-full flex items-center justify-center">
                    <span className="text-bamboo-700 font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.country} · Stayed in {t.stay}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY STRIP ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-bamboo-600 font-semibold text-sm uppercase tracking-widest mb-2">Photo Gallery</p>
            <h2 className="font-serif text-4xl font-bold text-gray-900">A Glimpse of Paradise</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: HOTEL_IMAGES.exterior, span: 'md:col-span-2 md:row-span-2', h: 'h-64 md:h-full' },
              { src: HOTEL_IMAGES.deluxeRoom, span: '', h: 'h-40' },
              { src: HOTEL_IMAGES.spa, span: '', h: 'h-40' },
              { src: HOTEL_IMAGES.restaurant, span: '', h: 'h-40' },
              { src: HOTEL_IMAGES.pool, span: '', h: 'h-40' },
            ].map((img, i) => (
              <div key={i} className={`${img.span} ${img.h} rounded-xl overflow-hidden relative group`}>
                <Image src={img.src} alt={`Gallery ${i+1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 overflow-hidden">
        <Image src={HOTEL_IMAGES.garden} alt="Hotel Garden" fill className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-bamboo-900/80" />
        <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-4">
          <FaLeaf className="text-bamboo-300 text-4xl mx-auto mb-4" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Ready for Your Paradise Escape?</h2>
          <p className="text-bamboo-100 mb-8 text-lg">Book directly with us for the best rates and exclusive perks. Free cancellation on all bookings.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rooms" className="btn-secondary text-base py-3.5 px-10">Book Now</Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 font-semibold py-3.5 px-8 rounded-lg transition-all">
              <FaPhone className="text-sm" /> Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
