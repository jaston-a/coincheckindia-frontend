import React, { useState, useEffect } from 'react';
import Contact from './components/Contact'; // Kept your original import
import axios from 'axios';
import Navbar from './components/Navbar';
import { ShieldCheck, ExternalLink, Sparkles, AlertTriangle, ArrowLeft, Shield, FileText, Info, Mail } from 'lucide-react';

const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_BASE_URL || 'https://coincheckindia-backend.onrender.com').replace(/\/$/, '');

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  let fixedPath = String(imagePath).trim();
  fixedPath = fixedPath.replace(/ /g, '_');
  if (fixedPath.startsWith('http://') || fixedPath.startsWith('https://')) return fixedPath;
  if (!fixedPath.startsWith('/') && !BACKEND_URL.endsWith('/')) fixedPath = `${BACKEND_URL}/${fixedPath}`;
  else fixedPath = `${BACKEND_URL}${fixedPath}`;
  return fixedPath;
};

const FALLBACK_IMAGE = "https://placehold.co/400x400/f1f5f9/475569?text=No+Image+Available";

// --- EXPANDED LEGAL PAGES ---

const PrivacyPolicy = ({ onBack }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6 max-w-4xl mx-auto my-6 text-slate-700">
    <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold mb-4">
      <ArrowLeft className="w-4 h-4" /> Back to Home
    </button>
    <h1 className="text-3xl font-extrabold text-slate-900 border-b pb-4">Privacy Policy</h1>
    <p className="text-sm text-gray-500">Last updated: September 25, 2026</p>
    
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-slate-800">1. Information We Collect</h2>
      <p>We do not collect personal identification information unless you voluntarily contact us via our contact form or email. Standard log files (IP addresses, browser type, timestamps) are logged automatically by our hosting providers for security and analytical purposes.</p>
    </section>

    <section className="space-y-3">
      <h2 className="text-xl font-bold text-slate-800">2. Cookies & Advertising (Google AdSense)</h2>
      <p>CoinCheckIndia uses Google AdSense to serve advertisements. Google uses cookies (including the DoubleClick cookie) to serve ads based on your prior visits to this and other websites. You may opt out of personalized advertising by visiting Google's Ad Settings.</p>
    </section>

    <section className="space-y-3">
      <h2 className="text-xl font-bold text-slate-800">3. Third-Party Links</h2>
      <p>Our website may contain links to third-party websites or marketplaces (like Amazon). We have no control over the content or privacy practices of these external sites and encourage you to read their respective privacy policies.</p>
    </section>

    <section className="space-y-3">
      <h2 className="text-xl font-bold text-slate-800">4. Children's Privacy</h2>
      <p>Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If we discover that a child has provided us with personal information, we will immediately delete such data.</p>
    </section>

    <section className="space-y-3">
      <h2 className="text-xl font-bold text-slate-800">5. Contact Us</h2>
      <p>If you have any questions or concerns about this Privacy Policy, please contact us at: <strong>coincheckindia@gmail.com</strong></p>
    </section>
  </div>
);

const TermsAndConditions = ({ onBack }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6 max-w-4xl mx-auto my-6 text-slate-700">
    <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold mb-4">
      <ArrowLeft className="w-4 h-4" /> Back to Home
    </button>
    <h1 className="text-3xl font-extrabold text-slate-900 border-b pb-4">Terms and Conditions</h1>
    <p className="text-sm text-gray-500">Last updated: September 25, 2026</p>
    
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-slate-800">1. Educational Disclaimer</h2>
      <p>CoinCheckIndia is strictly an independent educational platform. We are NOT official buyers, sellers, dealers, or affiliated with the Reserve Bank of India (RBI). All coin valuations provided are mere estimates based on historical public auction archives.</p>
    </section>

    <section className="space-y-3">
      <h2 className="text-xl font-bold text-slate-800">2. Intellectual Property Rights</h2>
      <p>Unless otherwise stated, CoinCheckIndia owns the intellectual property rights for all content on this website. You may access this for your own personal use, subject to restrictions set in these terms and conditions. You must not republish, sell, rent, or sub-license material from CoinCheckIndia.</p>
    </section>

    <section className="space-y-3">
      <h2 className="text-xl font-bold text-slate-800">3. Limitation of Liability</h2>
      <p>We are not responsible for any financial loss, fraudulent transactions, or deal failures resulting from the information provided on this site. You are strongly advised to consult with certified numismatists before making any financial decisions regarding buying or selling coins.</p>
    </section>

    <section className="space-y-3">
      <h2 className="text-xl font-bold text-slate-800">4. Governing Law</h2>
      <p>These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of India.</p>
    </section>

    <section className="space-y-3">
      <h2 className="text-xl font-bold text-slate-800">5. Changes to Terms</h2>
      <p>We reserve the right to modify these terms at any time. By continuing to use the website after changes are posted, you accept the amended terms.</p>
    </section>
  </div>
);

const AboutUs = ({ onBack }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6 max-w-4xl mx-auto my-6 text-slate-700">
    <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold mb-4">
      <ArrowLeft className="w-4 h-4" /> Back to Home
    </button>
    <h1 className="text-3xl font-extrabold text-slate-900 border-b pb-4">About Us</h1>
    
    <div className="space-y-4 leading-relaxed">
      <p>Welcome to <strong>CoinCheckIndia</strong>, your trusted educational resource for Indian numismatics.</p>
      
      <p>Founded by passionate coin collectors and researchers, our mission is to provide accurate, highly analyzed data regarding rare Indian coins, currency notes, and their historical significance. We noticed a growing gap in reliable information and a rise in online scams within the coin collecting community. To combat this, we created CoinCheckIndia as a free, transparent educational tool.</p>
      
      <p><strong>What We Do:</strong></p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Provide detailed information on mint marks, varieties, and rarities of Indian coins.</li>
        <li>Offer estimated market valuations based on verified historical auction data.</li>
        <li>Educate new collectors on how to identify genuine coins and avoid fraudulent schemes.</li>
      </ul>

      <p><strong>What We Do NOT Do:</strong></p>
      <ul className="list-disc pl-5 space-y-2">
        <li>We do not buy or sell coins directly.</li>
        <li>We do not charge money for valuation services.</li>
        <li>We have no official affiliation with the Reserve Bank of India (RBI) or the Government of India.</li>
      </ul>

      <p>Whether you are a seasoned numismatist or someone who just found an old coin in their grandfather's trunk, CoinCheckIndia is here to guide you with authentic knowledge. Happy collecting!</p>
    </div>
  </div>
);

const ContactPage = ({ onBack }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6 max-w-4xl mx-auto my-6 text-slate-700">
    <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold mb-4">
      <ArrowLeft className="w-4 h-4" /> Back to Home
    </button>
    <h1 className="text-3xl font-extrabold text-slate-900 border-b pb-4">Contact Us</h1>
    
    <div className="space-y-4 leading-relaxed">
      <p>We'd love to hear from you! Whether you have a question about a specific coin's mint mark, a suggestion for the website, or general feedback, feel free to reach out.</p>
      
      <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl mt-6">
        <h3 className="font-bold text-slate-800 text-lg mb-2">Get in Touch</h3>
        <p className="text-slate-600 mb-4">The best way to reach the CoinCheckIndia team is via email. We strive to respond to all inquiries within 48-72 hours.</p>
        <p className="flex items-center gap-2 text-emerald-800 font-semibold text-lg">
          <Mail className="w-5 h-5" /> coincheckindia@gmail.com
        </p>
      </div>

      <p className="text-sm text-gray-500 mt-6 border-t pt-4">
        *Please note: We do not offer direct buying or selling services, and we cannot guarantee the exact value of your coin via email images alone. Always consult a certified physical grader for high-value transactions.
      </p>
    </div>
  </div>
);

// --- MAIN COMPONENTS ---

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
      
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center py-4">
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

      <button 
        onClick={() => setShowAd(!showAd)}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
      >
        <ShieldCheck className="w-5 h-5 text-emerald-400" /> Verify Mint Mark Guidelines
      </button>

      {showAd && (
        <div className="p-4 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-center text-xs text-gray-500 space-y-1">
          <p className="font-semibold text-slate-700">[ Advertisement Space ]</p>
          <p>Official auction archive guidelines and grading parameters.</p>
        </div>
      )}

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
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'privacy', 'terms', 'about', 'contact'

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
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <main className="max-w-4xl mx-auto px-4 pt-6 space-y-6">
          {activeTab === 'privacy' && <PrivacyPolicy onBack={() => setActiveTab('home')} />}
          {activeTab === 'terms' && <TermsAndConditions onBack={() => setActiveTab('home')} />}
          {activeTab === 'about' && <AboutUs onBack={() => setActiveTab('home')} />}
          {activeTab === 'contact' && <ContactPage onBack={() => setActiveTab('home')} />}

          {activeTab === 'home' && (
            <>
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

              <div className="space-y-3 mb-6">
                <div className="bg-slate-100 border border-slate-200 rounded-lg p-3 inline-block w-full">
                   <h3 className="text-sm font-bold text-slate-700">Select your coin to check its real market value:</h3>
                </div>
                <div className="flex flex-wrap gap-2.5 mt-2">
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

              {!selectedCategory && !searchQuery && (
                <div className="bg-white border-2 border-red-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                    Important Collector Guidelines & Safety Warning
                  </h2>
                  <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                    <p><strong>✓ Highly Analyzed Real Data:</strong> All listed coins are highly analysed for authenticity before publishing.</p>
                    <p><strong>⚠ Beware of Scams:</strong> Never pay money online upfront.</p>
                  </div>
                </div>
              )}

              {(selectedCategory || searchQuery) && (
                <div className="flex justify-start mb-4">
                  <button 
                    onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Safety Guide
                  </button>
                </div>
              )}

              <section>
                {categories
                  .filter(cat => searchQuery ? true : cat.id === selectedCategory)
                  .map((cat) => {
                    const filteredVariants = (cat.variants || []).filter(v => 
                      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      v.mint_mark.toLowerCase().includes(searchQuery.toLowerCase())
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

              {/* Removing old general Contact form from home page since we have a dedicated Contact Us page now */}
            </>
          )}
        </main>
      </div>

      {/* FOOTER WITH ALL 4 ADSENSE COMPLIANT LINKS */}
      <footer className="bg-slate-900 text-gray-400 py-8 mt-12 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-xs sm:text-sm">
          <div>© 2026 CoinCheckIndia. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 font-medium">
            <button onClick={() => setActiveTab('about')} className="hover:text-emerald-400 transition flex items-center gap-1 cursor-pointer">
              <Info className="w-4 h-4" /> About Us
            </button>
            <button onClick={() => setActiveTab('contact')} className="hover:text-emerald-400 transition flex items-center gap-1 cursor-pointer">
              <Mail className="w-4 h-4" /> Contact Us
            </button>
            <button onClick={() => setActiveTab('privacy')} className="hover:text-emerald-400 transition flex items-center gap-1 cursor-pointer">
              <Shield className="w-4 h-4" /> Privacy Policy
            </button>
            <button onClick={() => setActiveTab('terms')} className="hover:text-emerald-400 transition flex items-center gap-1 cursor-pointer">
              <FileText className="w-4 h-4" /> Terms & Conditions
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}