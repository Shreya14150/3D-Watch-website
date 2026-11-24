import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Gift, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playLuxuryClick, playChime } from '../utils/audio';

export default function CartDrawer({ isOpen, onClose, cartItems = [], onRemoveItem, onUpdateQuantity, onClearCart }) {
  const [giftWrapping, setGiftWrapping] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.priceINR * (item.quantity || 1)), 0);
  const subtotalFormatted = `₹${subtotal.toLocaleString('en-IN')}`;

  const handleCheckout = () => {
    playChime();
    setIsCheckingOut(true);

    // Launch luxury gold confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#DFBE79', '#B76E79', '#FFFFFF']
    });

    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      setTimeout(() => {
        onClearCart();
        setOrderComplete(false);
        onClose();
      }, 4000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#08080A]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0E0E14] border-l border-[#D4AF37]/20 shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-xl tracking-[0.1em] text-[#FAF8F5]">
                Your Shopping Bag
              </span>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37]">
                ({cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)})
              </span>
            </div>

            <button
              onClick={() => {
                playLuxuryClick();
                onClose();
              }}
              className="p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderComplete ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#FAF8F5]">Bespoke Order Confirmed</h3>
                <p className="text-xs text-[#E8DCC0]/80 leading-relaxed max-w-xs font-light">
                  Your dedicated ÉVÉRA horological concierge has received your commission and will reach out promptly to confirm delivery arrangements.
                </p>
                <div className="pt-2 text-[10px] uppercase tracking-widest text-[#D4AF37]">
                  Geneva Atelier Ref: #EVR-{Math.floor(100000 + Math.random() * 900000)}
                </div>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-white/50 space-y-3">
                <p className="font-serif text-lg text-[#FAF8F5]/70">Your bag is currently empty.</p>
                <p className="text-xs max-w-xs text-white/40 font-light">
                  Explore our Signature Collection to select a timepiece crafted for eternity.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex space-x-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5"
                >
                  <div className="w-20 h-24 rounded-xl bg-[#15151C] flex items-center justify-center p-2 border border-white/5 overflow-hidden">
                    <span className="font-serif text-xs text-[#D4AF37] text-center leading-tight">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-base text-[#FAF8F5] tracking-wide">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => {
                            playLuxuryClick();
                            onRemoveItem(item.id);
                          }}
                          className="text-white/30 hover:text-rose-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] uppercase tracking-wider text-[#D4AF37]/80 mt-0.5">
                        {item.subtitle || 'Haute Horlogerie'}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center space-x-2 border border-white/10 rounded-full px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="text-white/60 hover:text-white px-1 text-xs"
                        >
                          -
                        </button>
                        <span className="text-xs text-white px-1">{item.quantity || 1}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="text-white/60 hover:text-white px-1 text-xs"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif text-sm tracking-wider text-[#FAF8F5]">
                        ₹{((item.priceINR || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Gift wrap option */}
            {cartItems.length > 0 && !orderComplete && (
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Gift className="w-4 h-4 text-[#D4AF37]" />
                  <div>
                    <span className="text-xs text-[#FAF8F5] block font-light">Luxury Presentation Box</span>
                    <span className="text-[10px] text-white/40 block">Handcrafted lacquer & ribbon</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={giftWrapping}
                  onChange={(e) => setGiftWrapping(e.target.checked)}
                  className="accent-[#D4AF37] w-4 h-4 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && !orderComplete && (
            <div className="p-6 border-t border-white/10 bg-[#0A0A0E] space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-widest text-white/50">Total Amount</span>
                <span className="font-serif text-2xl tracking-wider text-[#FAF8F5]">
                  {subtotalFormatted}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-[10px] text-white/40">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Complimentary white-glove insured delivery worldwide</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#DFBE79] to-[#C98D83] text-[#08080A] font-medium text-xs tracking-[0.25em] uppercase rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.55)] transition-all flex items-center justify-center space-x-2 active:scale-[0.98]"
              >
                {isCheckingOut ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Proceed to Concierge Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
