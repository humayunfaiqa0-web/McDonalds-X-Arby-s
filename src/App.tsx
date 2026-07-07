import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import LovinItSloganizer from './components/LovinItSloganizer';
import McBeastBuilder from './components/McBeastBuilder';
import MenuGrid from './components/MenuGrid';
import BrandFacts from './components/BrandFacts';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { Flame, ShieldAlert, Award, Sparkles, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [sessionCalories, setSessionCalories] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);

  // Sound byte effect simulated visually
  useEffect(() => {
    // Increment some dummy global metrics for dynamic immersion
    const interval = setInterval(() => {
      setSessionCalories(prev => prev + Math.floor(Math.random() * 5));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-brand-black text-white relative selection:bg-brand-yellow selection:text-brand-black wood-texture overflow-x-hidden">
      
      {/* Absolute floating total session calories tracker badge */}
      <div className="fixed bottom-4 left-4 z-40 bg-brand-red border-2 border-black p-3 shadow-[3px_3px_0px_0px_#FFC72C] flex items-center gap-3 max-w-xs transition-transform hover:scale-105">
        <div className="bg-brand-yellow p-1.5 rounded-none border border-black animate-pulse">
          <Flame className="w-5 h-5 text-brand-black fill-brand-black" />
        </div>
        <div>
          <span className="block font-mono text-[8px] text-brand-yellow font-black uppercase tracking-wider leading-none">
            ESTIMATED SECTOR COALITION CALORIES
          </span>
          <span className="font-mono text-base font-black text-white">
            {124503 + sessionCalories} <span className="text-xs font-bold text-gray-300">CALS</span>
          </span>
        </div>
      </div>

      {/* Extreme welcome Gate overlay modal for that heavy-duty energy */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            className="fixed inset-0 bg-brand-black/95 z-50 flex items-center justify-center p-4"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="bg-brand-dark-gray border-8 border-brand-red p-6 sm:p-10 max-w-md text-center relative heavy-outline-yellow"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {/* Absolutes */}
              <div className="absolute top-2 left-2 bg-brand-yellow text-brand-black px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase border border-black">
                LEVEL 1 CONGRUENCE
              </div>

              <div className="w-20 h-20 bg-brand-red mx-auto rounded-lg flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_#FFC72C] mb-6">
                <span className="font-display text-5xl text-brand-yellow drop-shadow-[2px_2px_0px_#000000]">M</span>
              </div>

              <span className="font-mono text-xs text-brand-yellow tracking-widest font-black uppercase">
                SECURITY INTRUSION WARNING
              </span>
              
              <h1 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-tighter leading-none mt-1 mb-4">
                WE HAVE THE <span className="text-brand-red">LOVIN' IT®</span>
              </h1>

              <p className="text-gray-400 text-xs sm:text-sm font-sans leading-relaxed mb-6">
                Welcome to McDonald's. Get ready for towering, hyper-caloric burgers and double beef structures.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => setShowWelcome(false)}
                  className="w-full bg-brand-yellow hover:bg-yellow-400 text-brand-black font-display text-sm uppercase tracking-wider py-4 px-6 border-2 border-black heavy-outline transition-all active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Flame className="w-4 h-4 text-brand-black fill-brand-black" />
                  I CAN HANDLE THE MEATS!
                </button>
                
                <button
                  onClick={() => {
                    alert("A wise choice. Diverting you back to standard soy protein isolates.");
                    window.location.href = "https://www.mcdonalds.com";
                  }}
                  className="w-full bg-brand-black hover:bg-brand-light-gray text-gray-500 hover:text-white font-mono text-xs uppercase tracking-wider py-2 border border-transparent hover:border-black transition-colors"
                >
                  No thanks, send me to standard McDonald's
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App Layout */}
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Slogan ticker element */}
        <div className="bg-brand-yellow text-brand-black p-3.5 border-4 border-black font-display text-xs sm:text-sm tracking-widest uppercase overflow-hidden whitespace-nowrap relative select-none heavy-outline flex items-center skew-x-1">
          <div className="flex shrink-0 animate-marquee gap-8 items-center pr-8">
            <span className="font-black">I'M LOVIN' IT</span>
            <span className="text-brand-red font-black">•</span>
            <span>TWO ALL-BEEF PATTY MONUMENTS</span>
            <span className="text-brand-red font-black">•</span>
            <span className="font-black">WE STACKED THE GOLDEN ARCHES</span>
            <span className="text-brand-red font-black">•</span>
            <span>NO WEAK SALADS ALLOWED</span>
          </div>
          <div className="flex shrink-0 animate-marquee gap-8 items-center pr-8" aria-hidden="true">
            <span className="font-black">I'M LOVIN' IT</span>
            <span className="text-brand-red font-black">•</span>
            <span>TWO ALL-BEEF PATTY MONUMENTS</span>
            <span className="text-brand-red font-black">•</span>
            <span className="font-black">WE STACKED THE GOLDEN ARCHES</span>
            <span className="text-brand-red font-black">•</span>
            <span>NO WEAK SALADS ALLOWED</span>
          </div>
        </div>

        {/* Hero Product Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <HeroCarousel />
        </motion.div>

        {/* Aggressive Sloganizer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <LovinItSloganizer />
        </motion.div>

        {/* Custom Burger Stack builder */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <McBeastBuilder />
        </motion.div>

        {/* Bento stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <BrandFacts />
        </motion.div>

        {/* Full Interactive Menu Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <MenuGrid />
        </motion.div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
