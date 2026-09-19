import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../ui/BrandLogo';
import { useCafe } from '../../context/CafeContext';
import { Instagram, Facebook, Phone, MapPin, Clock, Mail, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { cafeInfo } = useCafe();

  return (
    <footer className="bg-[#120E0C] text-[#F8F3EC] border-t border-[#C6A15B]/15 relative overflow-hidden">
      {/* Decorative Gold Glow subtle element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-[#C6A15B]/30 blur-sm pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <BrandLogo theme="dark" size="md" />
            <p className="text-sm text-[#A99B8C] leading-relaxed max-w-sm">
              An artisanal culinary sanctuary where fresh ingredients meet boutique hospitality and Indian warmth.
            </p>
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold block mb-1">
                A Venture Of
              </span>
              <span className="text-sm font-serif text-[#F8F3EC]">Purnima Foods</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h3 className="font-serif text-base tracking-wider text-[#D8BC82] uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-[#A99B8C]">
              <li>
                <Link to="/" className="hover:text-[#D8BC82] transition-colors">
                  Home & Experience
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#D8BC82] transition-colors">
                  Signature Menu & Prices
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D8BC82] transition-colors">
                  Our Story & Values
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#D8BC82] transition-colors">
                  Atmosphere & Food Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D8BC82] transition-colors">
                  Location & Directions
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#D8BC82] text-xs transition-colors flex items-center gap-1.5 pt-1 text-[#C6A15B]/70">
                  <Shield className="w-3.5 h-3.5" /> Demo Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="space-y-4">
            <h3 className="font-serif text-base tracking-wider text-[#D8BC82] uppercase">
              Café Sanctuary
            </h3>
            <ul className="space-y-3 text-sm text-[#A99B8C]">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0 mt-1" />
                <span>{cafeInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>{cafeInfo.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>{cafeInfo.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C6A15B] shrink-0 mt-1" />
                <span>{cafeInfo.openingHours}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Socials & Demo Disclaimer */}
          <div className="space-y-4">
            <h3 className="font-serif text-base tracking-wider text-[#D8BC82] uppercase">
              Stay Connected
            </h3>
            <p className="text-xs text-[#A99B8C]">
              Follow our culinary journey and tag us in your memorable moments.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={cafeInfo.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-[#C6A15B]/25 flex items-center justify-center text-[#E9DED0] hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={cafeInfo.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-[#C6A15B]/25 flex items-center justify-center text-[#E9DED0] hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={cafeInfo.whatsapp || 'https://wa.me/'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-[#C6A15B]/25 flex items-center justify-center text-[#E9DED0] hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-sm text-[11px] text-[#A99B8C]">
              <span className="font-semibold text-[#D8BC82]">Demo Notice:</span> All prices, reviews, and items are presented for interactive brand showcase.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-[#A99B8C] gap-4">
          <p>© 2026 Khatti Cafe – Purnima Foods. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-[#D8BC82]">Privacy Policy</Link>
            <Link to="/about" className="hover:text-[#D8BC82]">Terms of Service</Link>
            <Link to="/admin" className="text-[#C6A15B] hover:underline">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
