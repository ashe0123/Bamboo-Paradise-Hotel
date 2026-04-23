import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { HOTEL_IMAGES } from '@/lib/images';

const galleryItems = [
  { src: HOTEL_IMAGES.hero, label: 'Hotel Exterior', span: 'md:col-span-2 md:row-span-2' },
  { src: HOTEL_IMAGES.bambooSuite, label: 'Bamboo Suite' },
  { src: HOTEL_IMAGES.deluxeRoom, label: 'Deluxe Room' },
  { src: HOTEL_IMAGES.pool, label: 'Infinity Pool' },
  { src: HOTEL_IMAGES.restaurant, label: 'Fine Dining' },
  { src: HOTEL_IMAGES.spa, label: 'Bamboo Spa' },
  { src: HOTEL_IMAGES.lobby, label: 'Hotel Lobby' },
  { src: HOTEL_IMAGES.gym, label: 'Fitness Center' },
  { src: HOTEL_IMAGES.bar, label: 'Rooftop Bar' },
  { src: HOTEL_IMAGES.juniorSuite, label: 'Junior Suite' },
  { src: HOTEL_IMAGES.garden, label: 'Bamboo Gardens' },
  { src: HOTEL_IMAGES.breakfast, label: 'Breakfast Buffet' },
  { src: HOTEL_IMAGES.familyRoom, label: 'Family Room' },
  { src: HOTEL_IMAGES.poolside, label: 'Poolside' },
  { src: HOTEL_IMAGES.standardRoom, label: 'Standard Room' },
];

export default function GalleryPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative h-64 overflow-hidden">
        <Image src={HOTEL_IMAGES.exterior} alt="Gallery" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-bamboo-900/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-bamboo-300 text-sm font-semibold uppercase tracking-widest mb-2">Visual Tour</p>
          <h1 className="font-serif text-5xl font-bold">Photo Gallery</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryItems.map((item, i) => (
            <div key={i} className={`${item.span || ''} relative rounded-2xl overflow-hidden group cursor-pointer`}>
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width:768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-semibold text-sm">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
