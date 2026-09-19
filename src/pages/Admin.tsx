import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Utensils,
  Star,
  Image as ImageIcon,
  Building2,
  Tag,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  ExternalLink,
  ArrowLeft,
  Heart,
  Sparkles,
} from 'lucide-react';
import { BrandLogo } from '../components/ui/BrandLogo';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useMenu } from '../context/MenuContext';
import { useReviews } from '../context/ReviewContext';
import { useGallery } from '../context/GalleryContext';
import { useCafe } from '../context/CafeContext';
import { useFavorites } from '../context/FavoritesContext';
import { formatPrice } from '../utils/formatPrice';
import { Food } from '../types/food';
import { MENU_CATEGORIES } from '../components/menu/CategoryTabs';

type AdminTab = 'dashboard' | 'menu' | 'reviews' | 'gallery' | 'offers' | 'cafe';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const { menuItems, addOrUpdateMenuItem, deleteMenuItem, resetMenu } = useMenu();
  const { reviews, toggleApproval, deleteReview, resetReviews } = useReviews();
  const { galleryImages, addImage, deleteImage, updateImageCategory, resetGallery } = useGallery();
  const { cafeInfo, updateCafeInfo, resetCafeInfo } = useCafe();
  const { favoritesCount } = useFavorites();

  // Menu item modal state
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Food | null>(null);
  const [menuFormData, setMenuFormData] = useState({
    name: '',
    category: 'Pizza',
    description: '',
    price: 199,
    image: '',
    isVeg: true,
    isPopular: false,
    isFeatured: false,
  });

  // Gallery item modal state
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryFormData, setGalleryFormData] = useState({
    image: '',
    category: 'Food' as 'Food' | 'Cafe' | 'Moments',
    caption: '',
  });

  // Cafe info form state
  const [cafeFormData, setCafeFormData] = useState(cafeInfo);
  const [cafeSavedNotice, setCafeSavedNotice] = useState(false);

  // Handlers for menu items
  const handleOpenAddFood = () => {
    setEditingItem(null);
    setMenuFormData({
      name: '',
      category: 'Pizza',
      description: '',
      price: 199,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
      isVeg: true,
      isPopular: false,
      isFeatured: false,
    });
    setIsMenuModalOpen(true);
  };

  const handleOpenEditFood = (food: Food) => {
    setEditingItem(food);
    setMenuFormData({
      name: food.name,
      category: food.category,
      description: food.description,
      price: food.price,
      image: food.image,
      isVeg: food.isVeg,
      isPopular: food.isPopular,
      isFeatured: food.isFeatured,
    });
    setIsMenuModalOpen(true);
  };

  const handleSaveFood = (e: React.FormEvent) => {
    e.preventDefault();
    addOrUpdateMenuItem({
      id: editingItem?.id,
      ...menuFormData,
    });
    setIsMenuModalOpen(false);
  };

  // Handlers for gallery
  const handleSaveGalleryImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryFormData.image) return;
    addImage(galleryFormData);
    setIsGalleryModalOpen(false);
    setGalleryFormData({
      image: '',
      category: 'Food',
      caption: '',
    });
  };

  // Handler for cafe info
  const handleSaveCafeInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateCafeInfo(cafeFormData);
    setCafeSavedNotice(true);
    setTimeout(() => setCafeSavedNotice(false), 3000);
  };

  const handleResetAllData = () => {
    if (confirm('Are you sure you want to reset all demo menu items, reviews, gallery photos, and café info to factory defaults?')) {
      resetMenu();
      resetReviews();
      resetGallery();
      resetCafeInfo();
      setCafeFormData(cafeInfo);
      alert('All demo data has been reset successfully.');
    }
  };

  return (
    <div className="min-h-screen bg-[#120E0C] text-[#F8F3EC] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#17120F] border-r border-[#C6A15B]/20 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Brand header */}
          <div className="space-y-2">
            <BrandLogo theme="dark" size="sm" linkToHome={false} />
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C6A15B]/15 text-[#D8BC82] text-[10px] uppercase font-bold tracking-wider">
              <span>Demo Admin Panel</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'menu', label: 'Menu Management', icon: Utensils, count: menuItems.length },
              { id: 'reviews', label: 'Guest Reviews', icon: Star, count: reviews.length },
              { id: 'gallery', label: 'Visual Gallery', icon: ImageIcon, count: galleryImages.length },
              { id: 'offers', label: 'Seasonal Offers', icon: Tag },
              { id: 'cafe', label: 'Café Information', icon: Building2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[#C6A15B] text-[#17120F]'
                      : 'text-[#A99B8C] hover:text-[#F8F3EC] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {typeof tab.count === 'number' && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-[#17120F]/20 text-[#17120F]' : 'bg-white/[0.06] text-[#A99B8C]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-white/[0.08] space-y-3">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-semibold py-2 rounded-sm border border-[#C6A15B]/30 text-[#D8BC82] hover:bg-[#C6A15B]/10 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Website</span>
          </Link>
          <button
            type="button"
            onClick={handleResetAllData}
            className="w-full flex items-center justify-center gap-1.5 text-[11px] text-[#A99B8C] hover:text-rose-400 py-1 transition-colors"
            title="Reset all demo data to initial factory state"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {/* Top Notice Banner */}
        <div className="mb-8 p-3.5 bg-[#241B16] border border-[#C6A15B]/25 rounded-sm flex items-center justify-between text-xs text-[#A99B8C]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive Demo Administration Panel — Powered by LocalStorage Persistence</span>
          </div>
          <Link to="/" className="text-[#C6A15B] hover:text-[#D8BC82] font-semibold flex items-center gap-1">
            <span>View Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F3EC]">
                Café Management Overview
              </h1>
              <p className="text-xs sm:text-sm text-[#A99B8C] mt-1">
                Real-time metrics for Khatti Cafe & Purnima Foods digital catalog.
              </p>
            </div>

            {/* Metric Cards - Compact Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              <div className="p-4 sm:p-4.5 bg-[#17120F] border border-[#C6A15B]/20 rounded-sm space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#A99B8C] font-semibold">
                  Total Menu Items
                </span>
                <div className="font-serif text-2xl font-bold text-[#D8BC82]">
                  {menuItems.length}
                </div>
                <span className="text-[10px] text-emerald-400">Active in menu</span>
              </div>

              <div className="p-4 sm:p-4.5 bg-[#17120F] border border-[#C6A15B]/20 rounded-sm space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#A99B8C] font-semibold">
                  Total Reviews
                </span>
                <div className="font-serif text-2xl font-bold text-[#D8BC82]">
                  {reviews.length}
                </div>
                <span className="text-[10px] text-[#A99B8C]">
                  {reviews.filter((r) => r.approved).length} approved public
                </span>
              </div>

              <div className="p-4 sm:p-4.5 bg-[#17120F] border border-[#C6A15B]/20 rounded-sm space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#A99B8C] font-semibold">
                  Gallery Images
                </span>
                <div className="font-serif text-2xl font-bold text-[#D8BC82]">
                  {galleryImages.length}
                </div>
                <span className="text-[10px] text-[#A99B8C]">Food & Atmosphere</span>
              </div>

              <div className="p-4 sm:p-4.5 bg-[#17120F] border border-[#C6A15B]/20 rounded-sm space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#A99B8C] font-semibold">
                  Saved Favorites
                </span>
                <div className="font-serif text-2xl font-bold text-[#D8BC82] flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#C6A15B] fill-[#C6A15B]" />
                  <span>{favoritesCount}</span>
                </div>
                <span className="text-[10px] text-[#A99B8C]">Bookmarked locally</span>
              </div>
            </div>

            {/* Quick Actions & Recent Items Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Menu Items */}
              <div className="bg-[#17120F] border border-[#C6A15B]/20 rounded-sm p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                  <h3 className="font-serif text-sm font-bold text-[#F8F3EC]">
                    Recent Menu Additions
                  </h3>
                  <button
                    onClick={() => setActiveTab('menu')}
                    className="text-xs text-[#C6A15B] hover:underline"
                  >
                    View all
                  </button>
                </div>
                <div className="divide-y divide-white/[0.06]">
                  {menuItems.slice(0, 4).map((food) => (
                    <div key={food.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={food.image}
                          alt={food.name}
                          className="w-9 h-9 object-cover rounded-sm"
                        />
                        <div>
                          <p className="font-serif font-bold text-[#F8F3EC]">{food.name}</p>
                          <span className="text-[11px] text-[#A99B8C]">{food.category}</span>
                        </div>
                      </div>
                      <span className="font-serif font-bold text-[#D8BC82]">
                        {formatPrice(food.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="bg-[#17120F] border border-[#C6A15B]/20 rounded-sm p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                  <h3 className="font-serif text-sm font-bold text-[#F8F3EC]">
                    Latest Guest Feedback
                  </h3>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className="text-xs text-[#C6A15B] hover:underline"
                  >
                    Manage
                  </button>
                </div>
                <div className="divide-y divide-white/[0.06]">
                  {reviews.slice(0, 3).map((r) => (
                    <div key={r.id} className="py-2.5 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#F8F3EC]">{r.name}</span>
                        <span className="text-[#C6A15B]">{'★'.repeat(r.rating)}</span>
                      </div>
                      <p className="text-[#A99B8C] line-clamp-1 italic font-serif">
                        &ldquo;{r.comment}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MENU MANAGEMENT */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F3EC]">
                  Menu Management
                </h1>
                <p className="text-xs sm:text-sm text-[#A99B8C]">
                  Add, modify, or retire items from the public menu.
                </p>
              </div>
              <Button
                size="sm"
                onClick={handleOpenAddFood}
                icon={<Plus className="w-4 h-4" />}
                className="uppercase tracking-wider text-xs"
              >
                Add Food Item
              </Button>
            </div>

            {/* Menu Items Table */}
            <div className="bg-[#17120F] border border-[#C6A15B]/20 rounded-sm overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-[#C6A15B]/20 bg-[#241B16] text-[#D8BC82] uppercase tracking-wider font-semibold">
                    <th className="p-4">Food</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Diet</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {menuItems.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-sm border border-white/[0.08]"
                        />
                        <div>
                          <div className="font-serif font-bold text-[#F8F3EC] text-sm">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-[#A99B8C] line-clamp-1 max-w-xs">
                            {item.description}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-[#A99B8C]">{item.category}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            item.isVeg
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                              : 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {item.isVeg ? 'Veg' : 'Non-Veg'}
                        </span>
                      </td>
                      <td className="p-4 font-serif font-bold text-[#F8F3EC]">
                        {formatPrice(item.price)}
                      </td>
                      <td className="p-4 space-x-1">
                        {item.isFeatured && (
                          <span className="text-[10px] bg-[#C6A15B]/20 text-[#D8BC82] px-2 py-0.5 rounded border border-[#C6A15B]/30">
                            Featured
                          </span>
                        )}
                        {item.isPopular && (
                          <span className="text-[10px] bg-white/[0.06] text-[#A99B8C] px-2 py-0.5 rounded">
                            Popular
                          </span>
                        )}
                        {!item.isFeatured && !item.isPopular && (
                          <span className="text-[10px] text-[#A99B8C]">Standard</span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditFood(item)}
                          className="p-1.5 text-[#A99B8C] hover:text-[#D8BC82] rounded hover:bg-white/[0.05]"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete ${item.name}?`)) {
                              deleteMenuItem(item.id);
                            }
                          }}
                          className="p-1.5 text-[#A99B8C] hover:text-rose-400 rounded hover:bg-white/[0.05]"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: REVIEWS MANAGEMENT */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F3EC]">
                Guest Review Moderation
              </h1>
              <p className="text-xs sm:text-sm text-[#A99B8C]">
                Approve or hide customer submissions before they appear on the public page.
              </p>
            </div>

            <div className="bg-[#17120F] border border-[#C6A15B]/20 rounded-sm overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-[#C6A15B]/20 bg-[#241B16] text-[#D8BC82] uppercase tracking-wider font-semibold">
                    <th className="p-4">Customer</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4">Feedback</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {reviews.map((rev) => (
                    <tr key={rev.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-[#F8F3EC]">{rev.name}</div>
                        {rev.email && <div className="text-[11px] text-[#A99B8C]">{rev.email}</div>}
                      </td>
                      <td className="p-4 text-[#C6A15B] font-bold">
                        {'★'.repeat(rev.rating)}
                      </td>
                      <td className="p-4 text-[#E9DED0] max-w-sm italic font-serif">
                        &ldquo;{rev.comment}&rdquo;
                      </td>
                      <td className="p-4 text-[#A99B8C] whitespace-nowrap">{rev.date}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            rev.approved
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {rev.approved ? 'Approved' : 'Hidden'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => toggleApproval(rev.id, !rev.approved)}
                          className={`p-1.5 rounded hover:bg-white/[0.05] ${
                            rev.approved ? 'text-[#A99B8C] hover:text-amber-300' : 'text-emerald-400'
                          }`}
                          title={rev.approved ? 'Hide from public' : 'Approve for public'}
                        >
                          {rev.approved ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('Delete this guest review?')) {
                              deleteReview(rev.id);
                            }
                          }}
                          className="p-1.5 text-[#A99B8C] hover:text-rose-400 rounded hover:bg-white/[0.05]"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F3EC]">
                  Gallery Management
                </h1>
                <p className="text-xs sm:text-sm text-[#A99B8C]">
                  Upload new culinary or ambience photos to the public editorial grid.
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => setIsGalleryModalOpen(true)}
                icon={<Plus className="w-4 h-4" />}
                className="uppercase tracking-wider text-xs"
              >
                Add Image
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((img) => (
                <div
                  key={img.id}
                  className="bg-[#17120F] border border-[#C6A15B]/20 rounded-sm overflow-hidden flex flex-col justify-between group"
                >
                  <div className="relative aspect-square">
                    <img
                      src={img.image}
                      alt={img.caption || 'Gallery'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <select
                        value={img.category}
                        onChange={(e) =>
                          updateImageCategory(img.id, e.target.value as 'Food' | 'Cafe' | 'Moments')
                        }
                        className="bg-[#17120F]/90 text-[#D8BC82] text-[10px] uppercase font-bold px-2 py-1 rounded border border-[#C6A15B]/30 focus:outline-none"
                      >
                        <option value="Food">Food</option>
                        <option value="Cafe">Cafe</option>
                        <option value="Moments">Moments</option>
                      </select>
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-between bg-[#241B16]">
                    <span className="text-xs text-[#A99B8C] truncate max-w-[150px]">
                      {img.caption || 'No caption'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Delete this gallery photo?')) {
                          deleteImage(img.id);
                        }
                      }}
                      className="text-[#A99B8C] hover:text-rose-400 p-1"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: OFFERS */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F3EC]">
                Promotional & Chef Pairings
              </h1>
              <p className="text-xs sm:text-sm text-[#A99B8C]">
                Configure the headline banner displayed on the homepage.
              </p>
            </div>

            <div className="p-6 bg-[#17120F] border border-[#C6A15B]/20 rounded-sm max-w-2xl space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-semibold text-[#D8BC82]">
                  Current Active Banner
                </label>
                <div className="p-4 bg-[#241B16] rounded-sm border border-white/[0.08] space-y-2">
                  <h4 className="font-serif text-lg font-bold text-[#F8F3EC]">
                    Your Next Favorite Could Be Waiting.
                  </h4>
                  <p className="text-xs text-[#A99B8C]">
                    Stone-baked Paneer Butter Tikka Pizza + Slow-steeped Arabica Velvet Cold Brew.
                  </p>
                  <span className="inline-block text-[10px] text-emerald-400 uppercase font-bold">
                    Active on Live Website
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#A99B8C]">
                * To change seasonal specials or pairings, customize the culinary pairing card directly or link to seasonal menu items.
              </p>
            </div>
          </div>
        )}

        {/* TAB 6: CAFE INFORMATION SETTINGS */}
        {activeTab === 'cafe' && (
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F3EC]">
                Café Information
              </h1>
              <p className="text-xs sm:text-sm text-[#A99B8C]">
                Update address, phone numbers, concierge hours, and social media handles.
              </p>
            </div>

            <form
              onSubmit={handleSaveCafeInfo}
              className="bg-[#17120F] border border-[#C6A15B]/20 rounded-sm p-6 sm:p-8 max-w-3xl space-y-5 shadow-xl"
            >
              {cafeSavedNotice && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Café information saved to localStorage successfully!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#E9DED0]">
                    Café Brand Name
                  </label>
                  <input
                    type="text"
                    value={cafeFormData.name}
                    onChange={(e) => setCafeFormData({ ...cafeFormData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#E9DED0]">
                    Parent Business Name
                  </label>
                  <input
                    type="text"
                    value={cafeFormData.businessName}
                    onChange={(e) => setCafeFormData({ ...cafeFormData, businessName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#E9DED0]">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={cafeFormData.phone}
                    onChange={(e) => setCafeFormData({ ...cafeFormData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#E9DED0]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={cafeFormData.email}
                    onChange={(e) => setCafeFormData({ ...cafeFormData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#E9DED0]">
                  Address / Enclave Location
                </label>
                <input
                  type="text"
                  value={cafeFormData.address}
                  onChange={(e) => setCafeFormData({ ...cafeFormData, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#E9DED0]">
                  Opening Hours
                </label>
                <input
                  type="text"
                  value={cafeFormData.openingHours}
                  onChange={(e) => setCafeFormData({ ...cafeFormData, openingHours: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#E9DED0]">
                      Google Maps Link (URL)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const generated = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${cafeFormData.name} ${cafeFormData.address}`
                        )}`;
                        setCafeFormData({ ...cafeFormData, googleMapsUrl: generated });
                      }}
                      className="text-[10px] text-[#C6A15B] hover:underline"
                    >
                      Generate from address
                    </button>
                  </div>
                  <input
                    type="url"
                    placeholder="https://maps.google.com/?q=..."
                    value={cafeFormData.googleMapsUrl || ''}
                    onChange={(e) => setCafeFormData({ ...cafeFormData, googleMapsUrl: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#E9DED0]">
                    Google Maps Embed URL (iframe)
                  </label>
                  <input
                    type="url"
                    placeholder="https://maps.google.com/maps?q=...&output=embed"
                    value={cafeFormData.googleMapsEmbedUrl || ''}
                    onChange={(e) => setCafeFormData({ ...cafeFormData, googleMapsEmbedUrl: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#E9DED0]">
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={cafeFormData.instagram || ''}
                    onChange={(e) => setCafeFormData({ ...cafeFormData, instagram: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#E9DED0]">
                    Facebook
                  </label>
                  <input
                    type="text"
                    value={cafeFormData.facebook || ''}
                    onChange={(e) => setCafeFormData({ ...cafeFormData, facebook: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#E9DED0]">
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    value={cafeFormData.whatsapp || ''}
                    onChange={(e) => setCafeFormData({ ...cafeFormData, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#241B16] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" size="md" className="uppercase tracking-wider text-xs">
                  Save Information
                </Button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Modal: Add or Edit Menu Food Item */}
      <Modal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        title={editingItem ? `Edit Dish: ${editingItem.name}` : 'Add New Food Item'}
      >
        <form onSubmit={handleSaveFood} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs uppercase font-semibold text-[#E9DED0]">Food Name</label>
            <input
              required
              type="text"
              value={menuFormData.name}
              onChange={(e) => setMenuFormData({ ...menuFormData, name: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#17120F] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs uppercase font-semibold text-[#E9DED0]">Category</label>
              <select
                value={menuFormData.category}
                onChange={(e) => setMenuFormData({ ...menuFormData, category: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#17120F] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
              >
                {MENU_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase font-semibold text-[#E9DED0]">Price (₹)</label>
              <input
                required
                type="number"
                min="1"
                value={menuFormData.price}
                onChange={(e) => setMenuFormData({ ...menuFormData, price: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-[#17120F] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
              >
              </input>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase font-semibold text-[#E9DED0]">Image URL</label>
            <input
              required
              type="url"
              value={menuFormData.image}
              onChange={(e) => setMenuFormData({ ...menuFormData, image: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#17120F] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase font-semibold text-[#E9DED0]">Description</label>
            <textarea
              required
              rows={3}
              value={menuFormData.description}
              onChange={(e) => setMenuFormData({ ...menuFormData, description: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#17120F] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs text-[#E9DED0] cursor-pointer">
              <input
                type="checkbox"
                checked={menuFormData.isVeg}
                onChange={(e) => setMenuFormData({ ...menuFormData, isVeg: e.target.checked })}
                className="rounded border-[#C6A15B]"
              />
              <span>Vegetarian (Veg)</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-[#E9DED0] cursor-pointer">
              <input
                type="checkbox"
                checked={menuFormData.isPopular}
                onChange={(e) => setMenuFormData({ ...menuFormData, isPopular: e.target.checked })}
                className="rounded border-[#C6A15B]"
              />
              <span>Popular Item</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-[#E9DED0] cursor-pointer">
              <input
                type="checkbox"
                checked={menuFormData.isFeatured}
                onChange={(e) => setMenuFormData({ ...menuFormData, isFeatured: e.target.checked })}
                className="rounded border-[#C6A15B]"
              />
              <span>Signature Featured</span>
            </label>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" className="uppercase tracking-wider text-xs font-bold">
              {editingItem ? 'Save Changes' : 'Add Item'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Add Gallery Photo */}
      <Modal
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
        title="Add Gallery Photograph"
      >
        <form onSubmit={handleSaveGalleryImage} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs uppercase font-semibold text-[#E9DED0]">Image URL</label>
            <input
              required
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={galleryFormData.image}
              onChange={(e) => setGalleryFormData({ ...galleryFormData, image: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#17120F] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase font-semibold text-[#E9DED0]">Category</label>
            <select
              value={galleryFormData.category}
              onChange={(e) =>
                setGalleryFormData({
                  ...galleryFormData,
                  category: e.target.value as 'Food' | 'Cafe' | 'Moments',
                })
              }
              className="w-full px-3.5 py-2 bg-[#17120F] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
            >
              <option value="Food">Food</option>
              <option value="Cafe">Cafe</option>
              <option value="Moments">Moments</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase font-semibold text-[#E9DED0]">Caption (Optional)</label>
            <input
              type="text"
              placeholder="Atmospheric caption..."
              value={galleryFormData.caption}
              onChange={(e) => setGalleryFormData({ ...galleryFormData, caption: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#17120F] border border-[#C6A15B]/30 rounded-sm text-sm text-[#F8F3EC]"
            />
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsGalleryModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" className="uppercase tracking-wider text-xs font-bold">
              Add Photograph
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
