import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Settings2, Check, RefreshCw, X, Store, ChevronRight, MapPin, Clock, Phone } from 'lucide-react';
import { useCafe } from '../../context/CafeContext';
import { DEMO_CAFE_PRESETS } from '../../data/cafe';
import { Button } from '../ui/Button';

export const DemoCafeSwitcher: React.FC = () => {
  const { cafeInfo, updateCafeInfo, resetCafeInfo } = useCafe();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [editForm, setEditForm] = useState(cafeInfo);
  const [saveToast, setSaveToast] = useState(false);

  // Synchronize editForm when cafeInfo changes
  React.useEffect(() => {
    setEditForm(cafeInfo);
  }, [cafeInfo]);

  const handleSelectPreset = (presetInfo: typeof DEMO_CAFE_PRESETS[0]['info']) => {
    updateCafeInfo(presetInfo);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    updateCafeInfo(editForm);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  return (
    <>
      {/* Floating Demo Trigger Pill */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#17120F]/95 backdrop-blur-md border border-[#C6A15B] text-[#F8F3EC] shadow-2xl shadow-black/80 hover:bg-[#241B16] transition-all group"
          aria-label="Open Demo Cafe Switcher"
        >
          <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-pulse" />
          <Sparkles className="w-4 h-4 text-[#D8BC82]" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#C6A15B] font-bold leading-none">
              Demo Mode
            </span>
            <span className="text-xs font-serif font-bold text-[#F8F3EC] truncate max-w-[130px] leading-tight mt-0.5">
              {cafeInfo.name}
            </span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#C6A15B]/20 text-[#D8BC82] font-mono ml-1">
            Switch
          </span>
        </motion.button>
      </div>

      {/* Demo Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl bg-[#17120F] border border-[#C6A15B]/40 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-5 bg-gradient-to-r from-[#241B16] to-[#17120F] border-b border-[#C6A15B]/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B]/40 flex items-center justify-center text-[#D8BC82]">
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#F8F3EC]">
                      Demo Cafe Switcher & Customizer
                    </h3>
                    <p className="text-xs text-[#A99B8C]">
                      Showcase this website for any café in 1 click
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-sm hover:bg-white/10 text-[#A99B8C] hover:text-[#F8F3EC] transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Toast Feedback */}
              {saveToast && (
                <div className="bg-emerald-950/90 border-b border-emerald-500/50 px-4 py-2 text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn">
                  <Check className="w-3.5 h-3.5" />
                  <span>Cafe details applied live across the entire website!</span>
                </div>
              )}

              {/* Tab Navigation */}
              <div className="flex border-b border-white/[0.08] px-5 pt-3 gap-4 bg-[#1F1713]">
                <button
                  type="button"
                  onClick={() => setActiveTab('presets')}
                  className={`pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
                    activeTab === 'presets'
                      ? 'border-[#C6A15B] text-[#D8BC82]'
                      : 'border-transparent text-[#A99B8C] hover:text-[#F8F3EC]'
                  }`}
                >
                  1-Click Presets
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('custom')}
                  className={`pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
                    activeTab === 'custom'
                      ? 'border-[#C6A15B] text-[#D8BC82]'
                      : 'border-transparent text-[#A99B8C] hover:text-[#F8F3EC]'
                  }`}
                >
                  Custom Live Details
                </button>
              </div>

              {/* Body */}
              <div className="p-5 overflow-y-auto space-y-4 flex-1">
                {activeTab === 'presets' && (
                  <div className="space-y-3">
                    <p className="text-xs text-[#A99B8C]">
                      Pick any cafe preset to instantly transform all branding, headings, timings, reviews, and story on the page:
                    </p>

                    <div className="grid grid-cols-1 gap-2.5">
                      {DEMO_CAFE_PRESETS.map((preset) => {
                        const isCurrent = cafeInfo.name === preset.info.name;
                        return (
                          <div
                            key={preset.id}
                            onClick={() => handleSelectPreset(preset.info)}
                            className={`p-3.5 rounded-sm border transition-all cursor-pointer flex items-center justify-between group ${
                              isCurrent
                                ? 'bg-[#241B16] border-[#C6A15B] shadow-md'
                                : 'bg-[#1D1612] border-white/[0.08] hover:border-[#C6A15B]/50 hover:bg-[#241B16]'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-serif font-bold text-sm text-[#F8F3EC] group-hover:text-[#D8BC82] transition-colors">
                                  {preset.name}
                                </span>
                                {isCurrent && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 font-medium">
                                    Active Demo
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#C6A15B] font-medium">
                                {preset.tag}
                              </p>
                              <p className="text-[11px] text-[#A99B8C] flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#C6A15B]" />
                                <span className="truncate max-w-sm">{preset.info.address}</span>
                              </p>
                            </div>

                            <Button
                              size="sm"
                              variant={isCurrent ? 'primary' : 'secondary'}
                              className="shrink-0 text-xs uppercase tracking-wider ml-3"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectPreset(preset.info);
                              }}
                            >
                              {isCurrent ? 'Selected' : 'Apply'}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'custom' && (
                  <form onSubmit={handleSaveCustom} className="space-y-4">
                    <p className="text-xs text-[#A99B8C]">
                      Type in your prospective client&apos;s real café details to demo a tailored website live:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-wider font-semibold text-[#E9DED0]">
                          Café Name
                        </label>
                        <input
                          type="text"
                          required
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-3 py-2 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-xs text-[#F8F3EC] focus:outline-none focus:border-[#C6A15B]"
                          placeholder="e.g. Costa Del Sol Cafe"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-wider font-semibold text-[#E9DED0]">
                          Business Subtitle
                        </label>
                        <input
                          type="text"
                          value={editForm.businessName}
                          onChange={(e) => setEditForm({ ...editForm, businessName: e.target.value })}
                          className="w-full px-3 py-2 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-xs text-[#F8F3EC] focus:outline-none focus:border-[#C6A15B]"
                          placeholder="e.g. Specialty Roasters"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-wider font-semibold text-[#E9DED0]">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="w-full px-3 py-2 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-xs text-[#F8F3EC] focus:outline-none focus:border-[#C6A15B]"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-wider font-semibold text-[#E9DED0]">
                          Opening Hours
                        </label>
                        <input
                          type="text"
                          value={editForm.openingHours}
                          onChange={(e) => setEditForm({ ...editForm, openingHours: e.target.value })}
                          className="w-full px-3 py-2 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-xs text-[#F8F3EC] focus:outline-none focus:border-[#C6A15B]"
                          placeholder="Open · Closes 11:00 PM (9:00 AM – 11:00 PM)"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider font-semibold text-[#E9DED0]">
                        Full Address & City
                      </label>
                      <input
                        type="text"
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        className="w-full px-3 py-2 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-xs text-[#F8F3EC] focus:outline-none focus:border-[#C6A15B]"
                        placeholder="Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-wider font-semibold text-[#E9DED0]">
                          Price Range
                        </label>
                        <input
                          type="text"
                          value={editForm.priceRange || '₹200–500 per person'}
                          onChange={(e) => setEditForm({ ...editForm, priceRange: e.target.value })}
                          className="w-full px-3 py-2 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-xs text-[#F8F3EC] focus:outline-none focus:border-[#C6A15B]"
                          placeholder="₹200–500 per person"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-wider font-semibold text-[#E9DED0]">
                          Star Rating
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="1"
                          max="5"
                          value={editForm.rating || 4.8}
                          onChange={(e) => setEditForm({ ...editForm, rating: parseFloat(e.target.value) || 4.8 })}
                          className="w-full px-3 py-2 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-xs text-[#F8F3EC] focus:outline-none focus:border-[#C6A15B]"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2">
                      <Button
                        type="submit"
                        size="sm"
                        className="uppercase tracking-widest text-xs font-bold"
                      >
                        Apply Live to Website
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              {/* Footer Bar */}
              <div className="p-4 bg-[#140F0D] border-t border-white/[0.08] flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => {
                    resetCafeInfo();
                    setSaveToast(true);
                    setTimeout(() => setSaveToast(false), 2000);
                  }}
                  className="flex items-center gap-1.5 text-[#A99B8C] hover:text-[#D8BC82] transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset to Default</span>
                </button>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setIsOpen(false)}
                  className="text-xs uppercase"
                >
                  Done
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
