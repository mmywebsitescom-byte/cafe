import React from 'react';
import { MapPin, Phone, Clock, Mail, Navigation, ExternalLink, Star, Share2, Compass, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCafe } from '../../context/CafeContext';
import { Button } from '../ui/Button';

export const LocationSection: React.FC = () => {
  const { cafeInfo } = useCafe();
  const [copied, setCopied] = React.useState(false);

  const handleDirections = () => {
    if (cafeInfo.googleMapsUrl) {
      window.open(cafeInfo.googleMapsUrl, '_blank', 'noopener,noreferrer');
    } else {
      const query = encodeURIComponent(`${cafeInfo.name} ${cafeInfo.address}`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${cafeInfo.phone.replace(/[^0-9+]/g, '')}`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Khatti Cafe (Purnima foods)',
          text: 'Visit Khatti Cafe in Sector-05 VIP Market, Rourkela. Great food & cozy vibes!',
          url: window.location.href,
        });
      } catch {
        // ignore share cancellation
      }
    } else {
      navigator.clipboard.writeText(`${cafeInfo.name} (Purnima foods) - ${cafeInfo.address}. Phone: ${cafeInfo.phone}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-[#17120F] relative border-t border-[#C6A15B]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Verified Google Profile Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6A15B]/15 border border-[#C6A15B]/30 text-[#D8BC82]">
                <Star className="w-3.5 h-3.5 fill-[#C6A15B] text-[#C6A15B]" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">
                  4.7 ★ (342 Reviews) • ₹1–200 / person
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#F8F3EC]">
                {cafeInfo.name} <span className="font-normal text-[#D8BC82] text-xl sm:text-2xl">({cafeInfo.businessName})</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#A99B8C] font-light leading-relaxed">
                Located in the heart of Sector-05 VIP Market in Rourkela, right in front of the Public Health Office. Enjoy a warm, welcoming ambiance with fast service and mouth-watering bites.
              </p>
            </div>

            {/* Service Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {['Order online', 'Dine-in', 'Takeaway', 'Delivery'].map((srv) => (
                <span
                  key={srv}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#241B16] border border-[#C6A15B]/25 text-xs text-[#F8F3EC]"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#C6A15B]" />
                  <span>{srv}</span>
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6A15B]/10 border border-[#C6A15B]/30 text-xs text-[#D8BC82] font-medium">
                ₹1–200 per person (Reported by 98 people)
              </span>
            </div>

            {/* Info Cards */}
            <div className="space-y-3">
              {/* Address with Landmark */}
              <div className="flex items-start gap-3 p-3.5 bg-[#241B16] border border-[#C6A15B]/20 rounded-sm">
                <div className="w-8 h-8 rounded-full bg-[#17120F] border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[11px] uppercase tracking-wider font-semibold text-[#D8BC82]">
                    Address & Landmark
                  </h4>
                  <p className="text-xs sm:text-sm text-[#F8F3EC] mt-0.5 font-medium leading-relaxed">
                    {cafeInfo.address}
                  </p>
                  {cafeInfo.plusCode && (
                    <p className="text-[11px] text-[#A99B8C] mt-1 font-mono">
                      Plus Code: <span className="text-[#D8BC82]">{cafeInfo.plusCode}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Phone */}
                <div className="flex items-start gap-3 p-3 bg-[#241B16] border border-[#C6A15B]/20 rounded-sm">
                  <div className="w-8 h-8 rounded-full bg-[#17120F] border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-wider font-semibold text-[#D8BC82]">
                      Phone / Takeaway Call
                    </h4>
                    <p className="text-xs font-mono font-medium text-[#F8F3EC] mt-0.5">{cafeInfo.phone}</p>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">Available for orders</span>
                  </div>
                </div>

                {/* Timing */}
                <div className="flex items-start gap-3 p-3 bg-[#241B16] border border-[#C6A15B]/20 rounded-sm">
                  <div className="w-8 h-8 rounded-full bg-[#17120F] border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-wider font-semibold text-[#D8BC82]">
                      Hours
                    </h4>
                    <p className="text-xs text-[#F8F3EC] mt-0.5 font-medium">{cafeInfo.openingHours}</p>
                    <span className="text-[10px] text-[#A99B8C] block mt-0.5">All 7 Days</span>
                  </div>
                </div>
              </div>

              {/* Email / Concierge */}
              <div className="flex items-center gap-3 p-3 bg-[#241B16] border border-[#C6A15B]/20 rounded-sm">
                <div className="w-7 h-7 rounded-full bg-[#17120F] border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider font-semibold text-[#D8BC82]">
                    Email & Event Bookings
                  </h4>
                  <p className="text-xs text-[#F8F3EC] mt-0.5">{cafeInfo.email}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                onClick={handleDirections}
                size="sm"
                className="uppercase tracking-wider text-xs font-bold"
                icon={<Navigation className="w-3.5 h-3.5" />}
              >
                Directions
              </Button>
              <Button
                onClick={handleCall}
                variant="secondary"
                size="sm"
                className="uppercase tracking-wider text-xs font-medium"
                icon={<Phone className="w-3.5 h-3.5" />}
              >
                Call: {cafeInfo.phone}
              </Button>
              <a
                href={cafeInfo.whatsapp || `https://wa.me/91${cafeInfo.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  className="uppercase tracking-wider text-xs font-medium"
                  icon={<ShoppingBag className="w-3.5 h-3.5" />}
                >
                  Order on WhatsApp
                </Button>
              </a>
              <button
                type="button"
                onClick={handleShare}
                className="px-3 py-2 rounded-sm border border-white/10 hover:border-[#C6A15B] text-xs text-[#A99B8C] hover:text-[#F8F3EC] transition-colors flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied Details!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Right: Interactive Google Maps Frame */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-[#C6A15B]/30 shadow-xl bg-[#241B16] flex flex-col">
              {/* Google Maps Embed */}
              <iframe
                title="Khatti Cafe Sector 5 VIP Market Rourkela"
                src={cafeInfo.googleMapsEmbedUrl}
                className="w-full h-full border-0 grayscale contrast-125 opacity-85 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Bottom Quick Map Action Bar */}
              <div className="bg-[#17120F]/95 backdrop-blur-md p-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <MapPin className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                  <span className="text-[#A99B8C] truncate max-w-[180px] sm:max-w-xs text-[11px]">
                    Sector 05, VIP Market, Rourkela
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleDirections}
                  className="text-[#C6A15B] hover:text-[#D8BC82] font-semibold flex items-center gap-1 shrink-0 ml-2"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Summary Card */}
            <div className="p-4 bg-[#241B16] border border-[#C6A15B]/20 rounded-sm text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#F8F3EC]">Quick Summary</span>
                <span className="text-emerald-400 font-medium">Open Now</span>
              </div>
              <p className="text-[#A99B8C] text-[11px] leading-relaxed">
                Infront of Public Health Office, VIP Market, Sector-05. Ample parking, both indoor cozy seating & takeaway counter available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
