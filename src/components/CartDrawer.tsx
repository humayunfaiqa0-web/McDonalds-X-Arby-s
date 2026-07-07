import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2, Flame, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getCartItems, 
  updateQuantity, 
  removeFromCart, 
  clearCart, 
  getCartTotal, 
  getCartCalories, 
  getCartCount,
  CartItem 
} from '../utils/cart';
import { playSizzle } from '../utils/audio';

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [calories, setCalories] = useState(0);
  const [count, setCount] = useState(0);

  // Sync state with Cart utility events
  useEffect(() => {
    const syncCart = () => {
      setItems([...getCartItems()]);
      setTotal(getCartTotal());
      setCalories(getCartCalories());
      setCount(getCartCount());
    };

    // Initial sync
    syncCart();

    // Listen to updates
    if (typeof window !== 'undefined') {
      window.addEventListener('cart-updated', syncCart);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('cart-updated', syncCart);
      }
    };
  }, []);

  const handleToggle = () => {
    playSizzle();
    setIsOpen(!isOpen);
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    playSizzle();
    
    // Format receipt printout
    const receiptItems = items.map(item => {
      const customs = item.customization && item.customization.length > 0 
        ? `\n   Custom: [${item.customization.join(', ')}]` 
        : '';
      return `• ${item.quantity}x ${item.name} (${item.arbyName})${customs}\n   Rs. ${item.price * item.quantity} | ${item.calories * item.quantity} Cals`;
    }).join('\n\n');

    alert(`🎉 ORDER CONGRUENCE CONFIRMED!\n\n-----------------------------------\n          MCDONALD'S ULTIMATE\n-----------------------------------\n\n${receiptItems}\n\n-----------------------------------\nTOTAL INTENSITY:\n🔥 Total Calories: ${calories} Cals\n💰 Grand Bill: Rs. ${total}\n-----------------------------------\n\n"I'm Lovin' It!" - Searing started on Mustafa Town grills!`);
    
    clearCart();
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Cart Trigger Button */}
      <div className="fixed bottom-4 right-4 z-40">
        <button 
          onClick={handleToggle}
          className="bg-brand-yellow hover:bg-yellow-400 text-brand-black border-4 border-black p-4 font-display text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer shadow-[4px_4px_0px_0px_rgba(209,18,38,1)] heavy-outline relative"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6 fill-brand-black text-brand-black" />
            {count > 0 && (
              <span className="absolute -top-3 -right-3 bg-brand-red text-white text-[10px] font-mono font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-black animate-bounce">
                {count}
              </span>
            )}
          </div>
          <span className="hidden sm:inline font-black">MY ORDER</span>
          {count > 0 && (
            <span className="font-mono font-black text-xs text-brand-red">
              (Rs. {total})
            </span>
          )}
        </button>
      </div>

      {/* Cart Sidebar Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={handleToggle}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Sidebar Container */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-brand-dark-gray border-l-8 border-brand-red z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-5 border-b-4 border-black bg-brand-black flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-brand-yellow p-1.5 border border-black">
                    <ShoppingCart className="w-5 h-5 text-brand-black fill-brand-black" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-white tracking-tight uppercase leading-none">YOUR ORDER</h3>
                    <span className="font-mono text-[9px] text-brand-yellow font-bold uppercase tracking-wider">MCDONALD'S INTERACTIVE CHECKOUT</span>
                  </div>
                </div>
                <button 
                  onClick={handleToggle}
                  className="bg-brand-red hover:bg-red-700 text-white border-2 border-black p-1.5 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5 stroke-[3]" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <Flame className="w-16 h-16 text-brand-yellow animate-pulse mb-4" />
                    <h4 className="font-display text-base text-white uppercase">Your Grill is Clean!</h4>
                    <p className="text-gray-400 font-mono text-xs mt-2 max-w-xs uppercase">
                      Add some items from the catalog or build your own custom mega stack to initiate transaction protocols.
                    </p>
                  </div>
                ) : (
                  items.map((item, idx) => {
                    const customKey = (item.customization || []).sort().join(',');
                    return (
                      <motion.div 
                        key={`${item.id}-${customKey}-${idx}`}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-brand-black border-2 border-black p-3 flex gap-3 relative shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      >
                        {/* Image */}
                        <div className="w-16 h-16 shrink-0 bg-brand-dark-gray border border-black flex items-center justify-center p-1 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="object-contain max-h-full max-w-full drop-shadow-md"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <span className="font-mono text-[8px] text-brand-yellow font-bold uppercase block tracking-wider leading-none mb-0.5">
                            {item.arbyName}
                          </span>
                          <h4 className="font-display text-xs text-white uppercase truncate leading-tight">
                            {item.name}
                          </h4>
                          
                          {/* Customizations tags */}
                          {item.customization && item.customization.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.customization.map((c, i) => (
                                <span key={i} className="bg-brand-red/20 text-brand-yellow font-mono text-[8px] px-1 py-0.2 border border-brand-red/30 uppercase">
                                  + {c}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex justify-between items-center mt-2.5">
                            {/* Price / Calories */}
                            <div className="font-mono text-[10px]">
                              <span className="text-brand-yellow font-bold mr-2">Rs. {item.price * item.quantity}</span>
                              <span className="text-gray-400">{item.calories * item.quantity} Cals</span>
                            </div>

                            {/* Quantity buttons */}
                            <div className="flex items-center gap-1.5 border border-black bg-brand-dark-gray overflow-hidden">
                              <button 
                                onClick={() => updateQuantity(item.id, customKey, -1)}
                                className="bg-brand-black hover:bg-brand-red text-white p-1 transition-all cursor-pointer border-r border-black"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-mono text-xs px-1.5 font-bold text-white text-center min-w-[14px]">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, customKey, 1)}
                                className="bg-brand-black hover:bg-brand-yellow hover:text-black text-white p-1 transition-all cursor-pointer border-l border-black"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Remove trash button */}
                        <button 
                          onClick={() => removeFromCart(item.id, customKey)}
                          className="absolute top-2 right-2 text-gray-500 hover:text-brand-red transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Checkout Summary Footer */}
              {items.length > 0 && (
                <div className="p-4 border-t-4 border-black bg-brand-black space-y-4">
                  {/* Stats Summary */}
                  <div className="space-y-1.5 bg-brand-dark-gray border border-black p-3 font-mono text-xs">
                    <div className="flex justify-between text-gray-400">
                      <span>ORDER SUB-ITEMS:</span>
                      <span className="text-white font-bold">{count} items</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>TOTAL CALORIES:</span>
                      <span className="text-brand-red font-black animate-pulse">{calories} Cals</span>
                    </div>
                    <div className="flex justify-between text-white border-t border-brand-light-gray pt-2 text-sm font-black">
                      <span className="text-brand-yellow">GRAND TOTAL:</span>
                      <span className="text-brand-yellow">Rs. {total}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => {
                        playSizzle();
                        clearCart();
                      }}
                      className="bg-brand-dark-gray hover:bg-brand-light-gray text-gray-400 hover:text-white font-mono text-[10px] uppercase border-2 border-black p-3 transition-all cursor-pointer text-center"
                    >
                      CLEAR ALL
                    </button>
                    <button 
                      onClick={handleCheckout}
                      className="col-span-2 bg-brand-yellow hover:bg-yellow-400 text-brand-black font-display text-xs uppercase tracking-widest p-3 border-2 border-black heavy-outline transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-brand-red animate-pulse" />
                      PLACE ORDER (Rs. {total})
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
