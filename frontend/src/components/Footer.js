import Link from 'next/link';
import { FaLeaf, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaTripadvisor } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-bamboo-600 rounded-lg flex items-center justify-center">
                <FaLeaf className="text-white text-lg" />
              </div>
              <div>
                <span className="font-serif text-white text-lg font-bold block leading-tight">Bamboo Paradise</span>
                <span className="text-xs text-bamboo-400 tracking-widest uppercase">Hotel & Resort</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-5">
              A serene escape where luxury meets nature. Experience the finest hospitality surrounded by lush bamboo gardens.
            </p>
            <div className="flex gap-3">
              {[FaFacebook, FaInstagram, FaTwitter, FaTripadvisor].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 hover:bg-bamboo-600 rounded-lg flex items-center justify-center transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[['/', 'Home'], ['/rooms', 'Rooms & Suites'], ['/services', 'Hotel Services'], ['/gallery', 'Photo Gallery'], ['/about', 'About Us'], ['/contact', 'Contact Us'], ['/faq', 'FAQ']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-bamboo-400 transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-bamboo-500 rounded-full" />{label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2.5 text-sm">
              {['Restaurant & Dining', 'Bamboo Spa & Wellness', 'Airport Transfer', 'City Tours', 'Laundry Service', 'Concierge Service'].map((s) => (
                <li key={s} className="text-gray-400 flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-bamboo-500 rounded-full" />{s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-bamboo-400 mt-0.5 shrink-0" />
                <span className="text-gray-400">123 Bamboo Garden Road, Paradise City, PC 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-bamboo-400 shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-bamboo-400 shrink-0" />
                <span className="text-gray-400">info@bambooparadise.com</span>
              </li>
            </ul>
            <div className="mt-5 p-3 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-400">Front Desk</p>
              <p className="text-white font-semibold text-sm">24 Hours / 7 Days</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Bamboo Paradise Hotel. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
