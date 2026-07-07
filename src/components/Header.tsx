import React, { useState } from 'react';
import { Flame, MapPin, Utensils, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';
import { playSizzle, getSoundEnabled, setSoundEnabled } from '../utils/audio';

export default function Header() {
  const [soundOn, setSoundOn] = useState(getSoundEnabled());

  const toggleSound = () => {
    const nextSoundState = !soundOn;
    setSoundOn(nextSoundState);
    setSoundEnabled(nextSoundState);
    if (nextSoundState) {
      setTimeout(() => {
        playSizzle();
      }, 50);
    }
  };

  const handleOrderTheMeat = () => {
    playSizzle();
    alert("🔥 ORDER DISPATCHED TO THE MAIN GRILL!\nSizzling process engaged on Mustafa Town flat-top grill.");
  };
  return (
    <header className="w-full bg-brand-black border-b-8 border-brand-red text-white sticky top-0 z-50 shadow-2xl" id="app-header">
      {/* Top Banner Row */}
      <div className="bg-brand-red text-brand-yellow font-display text-xs sm:text-sm tracking-widest text-center py-2 px-4 flex items-center justify-center gap-2 overflow-hidden border-b border-black">
        <span className="text-base sm:text-lg animate-bounce select-none">🍔</span>
        <span className="uppercase font-black text-shadow-sm">
          INCOMING MEAT OVERLOAD
        </span>
        <span className="text-base sm:text-lg animate-bounce select-none">🍔</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-4">
          <div className="relative group cursor-pointer">
            {/* A heavy, thick Golden Arch inside a white box with black borders */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-md flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_var(--color-brand-yellow)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
              <span className="font-display text-4xl sm:text-5xl text-brand-red select-none">M</span>
            </div>
            {/* Decorative flame indicator */}
            <div className="absolute -top-2 -right-2 bg-brand-yellow border-2 border-black rounded-full p-1 animate-pulse">
              <Flame className="w-4 h-4 text-brand-black fill-brand-black" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-1">
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tighter text-brand-yellow select-none">
                MCDONALD'S
              </h1>
            </div>
            
            <p className="font-mono text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-brand-yellow animate-spin" />
              <strong className="text-brand-yellow font-extrabold font-slab">MEATIER THAN EVER BEFORE</strong>
            </p>
          </div>
        </div>

        {/* Central Slogan Area (The Signature Tagline styled giant) */}
        <div className="hidden lg:flex flex-col items-center justify-center text-center max-w-sm">
          <span className="font-mono text-[10px] text-brand-yellow tracking-widest uppercase font-bold">THE ULTIMATE MANIFESTO</span>
          <h2 className="font-display text-2xl text-white tracking-tight leading-none">
            WE HAVE THE <span className="text-brand-red bg-brand-yellow px-2 py-0.5 border-2 border-black inline-block skew-x-3 text-shadow-sm">LOVIN' IT®</span>
          </h2>
        </div>

        {/* Action Controls & Navigation Info */}
        <div className="flex items-center flex-wrap justify-between md:justify-end gap-3 sm:gap-4 border-t border-brand-light-gray pt-4 md:pt-0 md:border-none">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-gray-300">
            <MapPin className="w-4 h-4 text-brand-red animate-pulse" />
            <div>
              <span className="block text-gray-500 text-[9px] uppercase leading-none">NEAREST MEAT FORTRESS</span>
              <span className="font-bold text-white uppercase">MUSTAFA TOWN, WAHDAT ROAD</span>
            </div>
          </div>
          
          <button 
            onClick={toggleSound}
            className={`font-mono text-xs uppercase tracking-wider py-2.5 px-4 border-2 border-black transition-all flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 ${
              soundOn 
                ? 'bg-brand-red text-white hover:bg-brand-yellow hover:text-black font-black' 
                : 'bg-brand-dark-gray text-gray-500 hover:text-white'
            }`}
            title="Toggle Sizzling Sound FX"
          >
            {soundOn ? <Volume2 className="w-4 h-4 animate-pulse text-brand-yellow" /> : <VolumeX className="w-4 h-4" />}
            <span>{soundOn ? "SIZZLE: ON" : "SIZZLE: MUTED"}</span>
          </button>

          <button 
            onClick={handleOrderTheMeat}
            className="bg-brand-yellow hover:bg-yellow-400 text-brand-black font-display text-xs sm:text-sm uppercase tracking-wider py-2.5 px-4 sm:px-6 rounded-none border-2 border-black heavy-outline transition-all active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center gap-2 cursor-pointer"
          >
            <Utensils className="w-4 h-4" />
            ORDER THE MEAT
          </button>
        </div>
      </div>
      
      {/* Visual Accents (Bold Red/Yellow Split Bar) */}
      <div className="h-2 w-full flex">
        <div className="bg-brand-yellow w-1/3 h-full"></div>
        <div className="bg-brand-red w-2/3 h-full"></div>
      </div>
    </header>
  );
}
