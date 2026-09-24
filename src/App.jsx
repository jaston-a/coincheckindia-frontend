import React, { useState, useEffect } from 'react';
import Contact from './components/Contact';
import axios from 'axios';
import Navbar from './components/Navbar';
import { ShieldCheck, ExternalLink, Sparkles, AlertTriangle, ArrowLeft } from 'lucide-react';

// DYNAMIC BACKEND URL CONFIGURATION
const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_BASE_URL || 'https://coincheckindia-backend.onrender.com').replace(/\/$/, '');

// HELPER FUNCTION: ROBUST URL ENCODING WITH SPACE REPLACEMENT
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  let fixedPath = String(imagePath).trim();

  // Explicitly replace spaces with %20 so browsers and Cloudinary parse names correctly
  fixedPath = fixedPath.replace(/ /g, '%20');

  // If it's already a full external URL, return it directly
  if (fixedPath.startsWith('http://') || fixedPath.startsWith('https://')) {
    return fixedPath;
  }

  // Otherwise append to backend URL safely
  if (!fixedPath.startsWith('/') && !BACKEND_URL.endsWith('/')) {
    fixedPath = `${BACKEND_URL}/${fixedPath}`;
  } else {
    fixedPath = `${BACKEND_URL}${fixedPath}`;
  }

  return fixedPath;
};

// FALLBACK PLACEHOLDER
const FALLBACK_IMAGE = "https://placehold.co/400x400/f1f5f9/475569?text=No+Image+Available";

// INDIVIDUAL COIN COMPONENT WITH GLASS ZOOM EFFECT
const VariantCard = ({ variant }) => {
  const [showAd, setShowAd] = useState(false);
  
  const [frontZoom, setFrontZoom] = useState(false);
  const [frontPos, setFrontPos] = useState({ x: 0, y: 0 });

  const [backZoom, setBackZoom] = useState(false);
  const [backPos, setBackPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e, setImagePos) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setImagePos({ x, y });
  };

  const frontImgSrc = getImageUrl(variant.front_image) || FALLBACK_IMAGE;
  const backImgSrc = getImageUrl(variant.back_image) || FALLBACK_IMAGE;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 mb-8">
      <div>
        <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md uppercase tracking-wider">
          {variant.rarity || 'Rare Variant'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">{variant.title}</h2>
      </div>
      
      {/* Front & Back Images with Glass Zoom Effect */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center py-4">
        
        {/* FRONT IMAGE CONTAINER */}
        <div className="text-center space-y-2">
          <div 
            className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto rounded-2xl border border-gray-200 shadow-md overflow-hidden cursor-crosshair bg-slate-100 flex items-center justify-center p-2"
            onMouseEnter={() => setFrontZoom(true)}
            onMouseLeave={() => setFrontZoom(false)}
            onMouseMove={(e) => handleMouseMove(e, setFrontPos)}
          >
            <img 
              src={frontImgSrc} 
              alt="Front Side" 
              onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
              className={`w-full h-full object-contain rounded-xl transition-opacity duration-150 ${frontZoom ? 'opacity-0' : 'opacity-100'}`} 
            />
            {frontZoom && (
              <div 
                className="absolute inset-0 w-full h-full bg-no-repeat pointer-events-none scale-150"
                style={{
                  backgroundImage: `url("${frontImgSrc}")`,
                  backgroundPosition: `${frontPos.x}% ${frontPos.y}%`,
                  backgroundSize: '250%'
                }}
              />
            )}
          </div>
          <span className="text-sm text-gray-500 font-semibold block">Obverse (Front) <span className="text-xs text-emerald-600 font-normal">🔍 Hover to Zoom</span></span>
        </div>

        {/* BACK IMAGE CONTAINER */}
        <div className="text-center space-y-2">
          <div 
            className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto rounded-2xl border border-gray-200 shadow-md overflow-hidden cursor-crosshair bg-slate-100 flex items-center justify-center p-2"
            onMouseEnter={() => setBackZoom(true)}
            onMouseLeave={() => setBackZoom(false)}
            onMouseMove={(e) => handleMouseMove(e, setBackPos)}
          >
            <img 
              src={backImgSrc} 
              alt="Back Side" 
              onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
              className={`w-full h-full object-contain rounded-xl transition-opacity duration-150 ${backZoom ? 'opacity-0' : 'opacity-100'}`} 
            />
            {backZoom && (
              <div 
                className="absolute inset-0 w-full h-full bg-no-repeat pointer-events-none scale-150"
                style={{
                  backgroundImage: `url("${backImgSrc}")`,
                  backgroundPosition: `${backPos.x}% ${backPos.y}%`,
                  backgroundSize: '250%'
                }}
              />
            )}
          </div>
          <span className="text-sm text-gray-500 font-semibold block">Reverse (Back) <span className="text-xs text-emerald-600 font-normal">🔍 Hover to Zoom</span></span>
        </div>
      </div>

      {/* Valuation Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200/80">
          <span className="text-sm text-gray-500 font-medium block mb-1">Estimated Value</span>
          <span className="text-3xl font-black text-emerald-600">{variant.estimated_value || '₹1,000 - ₹5,000'}</span>
        </div>
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200/80">
          <span className="text-sm text-gray-500 font-medium block mb-1">Mint Mark</span>
          <span className="text-base font-bold text-slate-800">{variant.mint_mark || 'Special Mint'}</span>
        </div>
      </div>

      <div className="bg-amber-50/60 border border-amber-200/60 p-4 rounded-xl text-sm text-slate-700 leading-relaxed">
        <span className="font-semibold text-amber-900 block mb-0.5">Verification Key:</span>
        {variant.description || 'Check the coin mint mark near the year to identify authenticity.'}
      </div>

      {/* AdSense Button */}
      <button 
        onClick={() => setShowAd(!showAd)}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
      >
        <ShieldCheck className="w-5 h-5 text-emerald-400" /> Verify Mint Mark Guidelines
      </button>

      {/* AdSense Space */}
      {showAd && (
        <div className="p-4 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-center text-xs text-gray-500 space-y-1">
          <p className="font-semibold text-slate-700">[ Advertisement Space ]</p>
          <p>Official auction archive guidelines and grading parameters.</p>
        </div>
      )}

      {/* Affiliate Link */}
      <a 
        href="https://amazon.in" 
        target="_blank" 
        rel="noreferrer"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition shadow-sm"
      >
        <ExternalLink className="w-5 h-5" /> Get Valuation Assessment / Sell Listing
      </a>
    </div>
  );
};

export default function App() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); 

  const colorThemes = [
    { default: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300', active: 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200' },
    { default: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300', active: 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-200' },
    { default: 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300', active: 'bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-200' },
    { default: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300', active: 'bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-200' },
    { default: 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100 hover:border-rose-300', active: 'bg-rose-600 border-rose-600 text-white shadow-md shadow-rose-200' },
    { default: 'bg-cyan-50 border-cyan-200 text-cyan-700 hover:bg-cyan-100 hover:border-cyan-300', active: 'bg-cyan-600 border-cyan-600 text-white shadow-md shadow-cyan-200' },
    { default: 'bg-orange-50 border-orange-200 text-orange-800 hover:bg-orange-100 hover:border-orange-300', active: 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-200' }
  ];

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/categories/`)
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans pb-16">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      <main className="max-w-4xl mx-auto px-4 pt-6 space-y-6">
        
        {/* Banner Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Official Indian Numismatic Valuation
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Indian Rare Coin & Currency Valuation
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            Hover over coin photos to inspect mint marks closely with magic glass zoom.
          </p>
        </div>

        {/* DENOMINATION BUTTONS BAR */}
        <div className="space-y-2 mb-6">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block px-1">
            Select Denomination:
          </label>
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat, index) => {
                const color = colorThemes[index % colorThemes.length];
                const isActive = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition cursor-pointer ${
                      isActive ? color.active : color.default
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
          </div>
        </div>

        {/* WELCOME / DISCLAIMER NOTE */}
        {!selectedCategory && !searchQuery && (
          <div className="bg-white border-2 border-red-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              Important Collector Guidelines & Safety Warning
            </h2>
            
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Highly Analyzed Real Data:</strong> We never add fake coins. Every item displayed here is meticulously analyzed and reflects real marketplace value.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">ℹ</span>
                <span><strong>Price Variations:</strong> The final price can be different based on condition, buyer demand, and market trends.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">⚠</span>
                <span><strong>Beware of Scams:</strong> Be extremely careful with scams! Protect your identity at all times.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">🔍</span>
                <span><strong>Check Photo Clarity:</strong> If the photo provided by a seller/buyer is not clear, DO NOT proceed. Always verify using another platform or consult an expert.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-red-500 font-bold">🚫</span>
                <span><strong>Safe Transactions:</strong> DO NOT pay money online upfront. Always meet in a safe, public, and real physical location to exchange the coin and money.</span>
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-sm text-red-800 leading-relaxed font-medium">
              <p className="flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <span>
                  <strong>Disclaimer:</strong> CoinCheckIndia is an independent educational platform only. We are NOT a buyer, seller, or affiliated with RBI / Government of India. All valuations shown are for educational / reference purpose based on public market data. We do NOT guarantee any buying/selling. Users are solely responsible for their own transactions. Please verify with a certified numismatist before making any deal. Use at your own risk.
                </span>
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 text-center">
              <p className="text-emerald-700 font-semibold text-sm">
                👆 Select any denomination button above to start exploring!
              </p>
            </div>
          </div>
        )}

        {/* 🔙 BACK TO HOME BUTTON */}
        {(selectedCategory || searchQuery) && (
          <div className="flex justify-start mb-4">
            <button 
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Safety Guide
            </button>
          </div>
        )}

        {/* DIRECT FULL DETAILS LIST */}
        <section>
          {categories
            .filter(cat => searchQuery ? true : cat.id === selectedCategory)
            .map((cat) => {
              const filteredVariants = (cat.variants || []).filter(v => 
                v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                v.mint_mark.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (v.year && v.year.toString().includes(searchQuery))
              );

              return (
                <div key={cat.id}>
                  {filteredVariants.length > 0 ? (
                    filteredVariants.map((variant) => (
                      <VariantCard key={variant.id} variant={variant} />
                    ))
                  ) : (
                    selectedCategory && (
                      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-400 text-sm">
                        No coin information listed under this category yet.
                      </div>
                    )
                  )}
                </div>
              );
            })}
        </section>

        {/* CONTACT US COMPONENT */}
        <Contact />

      </main>
    </div>
  );
}