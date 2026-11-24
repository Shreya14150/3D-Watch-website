import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SignatureCollection from './components/SignatureCollection';
import ExploreByStyle from './components/ExploreByStyle';
import WatchmakingSection from './components/WatchmakingSection';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import Preloader from './components/Preloader';
import { SIGNATURE_PRODUCTS } from './data/products';
import { playLuxuryClick, playChime } from './utils/audio';

export default function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to your Shopping Bag.`);
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCustomOrder = (config) => {
    const bespokeItem = {
      id: `bespoke-${Date.now()}`,
      name: 'ÉVÉRA BESPOKE CALIBRE 8200',
      subtitle: `${config.case.replace('-', ' ')} • ${config.strap.replace('-', ' ')}`,
      priceINR: parseInt(config.price.replace(/[^0-9]/g, ''), 10) || 385000,
      priceFormatted: config.price,
      quantity: 1
    };
    setCartItems((prev) => [...prev, bespokeItem]);
    setIsCartOpen(true);
    showToast('Your bespoke timepiece configuration has been added to your bag.');
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08080A] text-[#FAF8F5] relative selection:bg-[#B76E79]/40 selection:text-white">
      {/* Luxury Initial Preloader */}
      {!preloaderComplete && (
        <Preloader onComplete={() => setPreloaderComplete(true)} />
      )}

      {/* Transparent Minimal Navigation Bar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}
      />

      {/* Main Experience: Exactly Four Sections */}
      <main>
        {/* SECTION 1: CINEMATIC 3D HERO */}
        <HeroSection
          onExploreCollection={() => scrollTo('collection')}
          onDiscoverCraft={() => scrollTo('craftsmanship')}
        />

        {/* SECTION 2: THE SIGNATURE COLLECTION */}
        <SignatureCollection
          onSelectProduct={(prod) => setSelectedProduct(prod)}
          onQuickView={(prod) => setSelectedProduct(prod)}
          onAddToCart={handleAddToCart}
        />

        {/* SECTION 3: EXPLORE BY STYLE */}
        <ExploreByStyle
          onSelectCategory={(catId) => {
            scrollTo('collection');
          }}
        />

        {/* SECTION 4: THE ART OF WATCHMAKING & BESPOKE CUSTOMIZER */}
        <WatchmakingSection
          onCustomOrder={handleCustomOrder}
        />
      </main>

      {/* Refined Luxury Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onSelectCategory={() => scrollTo('categories')}
      />

      {/* Luxury Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#16161D] border border-[#D4AF37]/40 text-[#FAF8F5] px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md text-xs uppercase tracking-wider animate-fadeIn flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
