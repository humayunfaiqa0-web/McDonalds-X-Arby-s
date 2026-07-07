import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Megaphone, RefreshCw, Volume2, ShieldAlert } from 'lucide-react';
import { AGGRESSIVE_SLOGANS } from '../data';

export default function LovinItSloganizer() {
  const [slogan, setSlogan] = useState(AGGRESSIVE_SLOGANS[0]);
  const [isShaking, setIsShaking] = useState(false);
  const [count, setCount] = useState(1);

  const getNewSlogan = () => {
    setIsShaking(true);
    let randomSlogan = slogan;
    while (randomSlogan === slogan) {
      randomSlogan = AGGRESSIVE_SLOGANS[Math.floor(Math.random() * AGGRESSIVE_SLOGANS.length)];
    }
    setSlogan(randomSlogan);
    setCount(prev => prev + 1);
    
    // Play a subtle high-impact sound (visualized) and reset shake
    setTimeout(() => {
      setIsShaking(false);
    }, 600);
  };

  return (
    <section className="bg-brand-dark-gray border-4 border-black p-6 relative overflow-hidden wood-texture heavy-outline-yellow rounded-none mb-12" id="sloganizer">
      {/* Visual background badges */}
      <div className="absolute -right-12 -bottom-12 opacity-5 select-none pointer-events-none">
        <Megaphone className="w-64 h-64 text-brand-yellow transform rotate-12" />
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-6 justify-between relative z-10">
        
        {/* Call to Action */}
        <div className="max-w-md text-center md:text-left">
          <div className="inline-flex items-center gap-1 bg-brand-red text-brand-yellow text-xs font-mono font-bold px-2.5 py-1 border border-black mb-2 uppercase tracking-widest rounded-none">
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
            VOICEBOX AMPLIFIED
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-white tracking-tighter uppercase leading-none">
            THE AGGRESSIVE <span className="text-brand-yellow">SLOGANIZER®</span>
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Tap to generate hyper-charged, high-powered slogans for your McDonald's cravings.
          </p>
        </div>

        {/* Display and Generator Button */}
        <div className="w-full md:w-auto flex-1 flex flex-col items-center gap-4">
          <motion.div 
            className={`w-full bg-brand-black border-4 ${isShaking ? 'border-brand-yellow bg-brand-red' : 'border-brand-red'} p-6 relative flex flex-col justify-center items-center min-h-[140px] text-center`}
            animate={isShaking ? {
              x: [0, -10, 10, -10, 10, -5, 5, 0],
              y: [0, 5, -5, 5, -5, 2, -2, 0],
              scale: [1, 1.05, 0.95, 1.05, 1, 1],
            } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Absolute indicator */}
            <span className="absolute top-2 left-2 font-mono text-[9px] text-brand-red bg-brand-yellow border border-black px-1 uppercase font-bold tracking-widest">
              BROADCAST #{count}
            </span>
            <Volume2 className={`absolute top-2 right-2 w-4 h-4 ${isShaking ? 'text-brand-yellow animate-ping' : 'text-gray-600'}`} />

            <AnimatePresence mode="wait">
              <motion.p 
                key={slogan}
                initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.2, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="font-slab text-lg sm:text-xl md:text-2xl text-white uppercase tracking-tight font-black leading-tight drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] selection:bg-brand-yellow selection:text-black"
              >
                "{slogan}"
              </motion.p>
            </AnimatePresence>
            
            {/* Decorative soundwaves */}
            <div className="flex gap-1 mt-4 items-center h-4">
              <div className={`w-1 bg-brand-yellow transition-all duration-300 ${isShaking ? 'h-4' : 'h-1'}`}></div>
              <div className={`w-1 bg-brand-red transition-all duration-300 ${isShaking ? 'h-3' : 'h-1'}`}></div>
              <div className={`w-1 bg-brand-yellow transition-all duration-300 ${isShaking ? 'h-5' : 'h-2'}`}></div>
              <div className={`w-1 bg-brand-red transition-all duration-300 ${isShaking ? 'h-2' : 'h-1'}`}></div>
              <div className={`w-1 bg-brand-yellow transition-all duration-300 ${isShaking ? 'h-4' : 'h-1'}`}></div>
            </div>
          </motion.div>

          {/* Trigger button */}
          <button
            onClick={getNewSlogan}
            className="w-full sm:w-auto bg-brand-red hover:bg-red-700 text-white font-display text-sm uppercase tracking-wider py-3.5 px-8 rounded-none border-2 border-black heavy-outline-yellow transition-all active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-3 cursor-pointer group"
          >
            <RefreshCw className="w-5 h-5 text-brand-yellow group-hover:rotate-180 transition-transform duration-500" />
            UNLEASH BEEF SLOGAN
          </button>
        </div>

      </div>
    </section>
  );
}
