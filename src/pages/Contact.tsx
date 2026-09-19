import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { LocationSection } from '../components/sections/LocationSection';
import { MapPin, Phone, Clock, Mail, MessageSquare, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useCafe } from '../context/CafeContext';

export const ContactPage: React.FC = () => {
  const { cafeInfo } = useCafe();
  const [submitted, setSubmitted] = React.useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageContainer>
      {/* Page Header */}
      <div className="pt-28 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#120E0C] to-[#17120F] text-center border-b border-[#C6A15B]/15 relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6A15B]/10 border border-[#C6A15B]/30 text-[#D8BC82]">
            <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold">
              Reservations & Inquiries
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8F3EC]">
            Contact & Location
          </h1>

          <p className="font-serif italic text-base sm:text-lg text-[#D8BC82]">
            &ldquo;We’d love to host you.&rdquo;
          </p>
        </div>
      </div>

      {/* Main Location Section */}
      <LocationSection />

      {/* Direct Inquiries & Event Booking Section */}
      <div className="bg-[#1D1612] py-14 border-t border-[#C6A15B]/15">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#241B16] border border-[#C6A15B]/25 rounded-sm p-5 sm:p-8 shadow-xl space-y-5">
            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C6A15B]">
                Direct Connect
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F8F3EC]">
                Inquire for Table Reservations or Private Gatherings
              </h2>
              <p className="text-xs text-[#A99B8C]">
                Planning a birthday celebration, business coffee meeting, or community gathering? Let us prepare a tailored experience for you.
              </p>
            </div>

            {submitted ? (
              <div className="p-5 bg-[#17120F] border border-[#C6A15B]/40 rounded-sm text-center space-y-2">
                <h4 className="font-serif text-base font-bold text-[#C6A15B]">
                  Thank You for Reaching Out
                </h4>
                <p className="text-xs text-[#E9DED0]/85">
                  Your inquiry has been received by the Khatti Cafe Concierge team. We will contact you shortly!
                </p>
                <Button
                  size="sm"
                  variant="secondary"
                  className="mt-2 text-xs uppercase"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-[#E9DED0]">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rahul Kapoor"
                      className="w-full px-3.5 py-2 bg-[#17120F] border border-[#C6A15B]/30 rounded-sm text-xs text-[#F8F3EC] focus:outline-none focus:border-[#C6A15B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-[#E9DED0]">
                      Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 00000"
                      className="w-full px-3.5 py-2 bg-[#17120F] border border-[#C6A15B]/30 rounded-sm text-xs text-[#F8F3EC] focus:outline-none focus:border-[#C6A15B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-[#E9DED0]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="rahul@example.com"
                      className="w-full px-3.5 py-2 bg-[#17120F] border border-[#C6A15B]/30 rounded-sm text-xs text-[#F8F3EC] focus:outline-none focus:border-[#C6A15B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-[#E9DED0]">
                      Preferred Date & Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. This Saturday 7:00 PM"
                      className="w-full px-3.5 py-2 bg-[#17120F] border border-[#C6A15B]/30 rounded-sm text-xs text-[#F8F3EC] focus:outline-none focus:border-[#C6A15B]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#E9DED0]">
                    Message / Special Requests
                  </label>
                  <textarea
                    rows={2.5}
                    placeholder="Number of guests, dietary preferences, or table seating request..."
                    className="w-full px-3.5 py-2 bg-[#17120F] border border-[#C6A15B]/30 rounded-sm text-xs text-[#F8F3EC] focus:outline-none focus:border-[#C6A15B] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="sm"
                  className="uppercase tracking-widest text-xs font-bold"
                  icon={<Send className="w-3.5 h-3.5" />}
                >
                  Send Request
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
