import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, ChevronLeft, ChevronRight, Zap, Info, TrendingUp, Sparkles, ShoppingCart } from 'lucide-react';
import { INITIAL_MENU_ITEMS } from '../data';
import { playSizzle } from '../utils/audio';
import { addToCart } from '../utils/cart';

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Size level: 'classic' | 'mega' | 'ultimate'
  const [sizeLevel, setSizeLevel] = useState<'classic' | 'mega' | 'ultimate'>('ultimate');
  const [isOrdering, setIsOrdering] = useState(false);

  const activeItem = INITIAL_MENU_ITEMS[currentIndex];

  const handleNext = () => {
    playSizzle();
    setCurrentIndex((prev) => (prev === INITIAL_MENU_ITEMS.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    playSizzle();
    setCurrentIndex((prev) => (prev === 0 ? INITIAL_MENU_ITEMS.length - 1 : prev - 1));
  };

  // Calculate dynamic stats based on size level
  const getDynamicStats = () => {
    let multiplier = 1;
    let titlePrefix = "";
    let colorClass = "text-brand-yellow";
    let descOverride = activeItem.description;

    if (sizeLevel === 'classic') {
      multiplier = 0.5;
      titlePrefix = "STANDARD";
      colorClass = "text-gray-300";
      descOverride = `The standard version of the ${activeItem.name}.`;
    } else if (sizeLevel === 'mega') {
      multiplier = 0.8;
      titlePrefix = "MEGA STACK";
      colorClass = "text-brand-yellow";
      descOverride = `Amplified with extra crispy onion rings and flat-top sear. Built for raw satisfaction.`;
    } else {
      multiplier = 1.0;
      titlePrefix = "TITAN STACK";
      colorClass = "text-brand-red";
      descOverride = activeItem.description; // Fully loaded description
    }

    const calculatedCalories = Math.round(activeItem.calories * multiplier);
    const calculatedPrice = Math.round(activeItem.price * multiplier * 1.2);

    return {
      calories: calculatedCalories,
      price: calculatedPrice,
      titlePrefix,
      colorClass,
      descOverride
    };
  };

  const stats = getDynamicStats();

  const triggerOrder = () => {
    playSizzle();
    setIsOrdering(true);
    
    // Add to interactive cart
    addToCart({
      id: `${activeItem.id}-${sizeLevel}`,
      name: `${stats.titlePrefix} ${activeItem.name}`,
      arbyName: `${stats.titlePrefix} ${activeItem.arbyName}`,
      price: stats.price,
      calories: stats.calories,
      image: activeItem.image,
      customization: [`${sizeLevel.toUpperCase()} SIZE`]
    });

    setTimeout(() => {
      setIsOrdering(false);
    }, 600);
  };

  return (
    <section className="w-full bg-brand-black border-y-8 border-brand-red py-12 px-4 relative overflow-hidden" id="hero-carousel">
      {/* Background visual graphics */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none select-none flex justify-around items-center">
        <span className="font-display text-[15vw] text-white">MEAT</span>
        <span className="font-display text-[15vw] text-brand-red">MCD</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-8">
          <span className="font-mono text-xs sm:text-sm text-brand-yellow tracking-widest font-extrabold uppercase flex items-center gap-1.5 bg-brand-dark-gray px-3 py-1 border border-black mb-3">
            <Flame className="w-4 h-4 text-brand-red fill-brand-red animate-pulse" />
            TODAY'S CHROME-PLATED FEAST SELECTIONS
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-none select-none uppercase">
            THE <span className="text-brand-red drop-shadow-[2px_2px_0px_#FFC72C]">AMPLIFIED</span> MENU
          </h2>
          <p className="text-gray-400 text-xs sm:text-base max-w-xl mt-2 font-mono">
            Our high-powered, towering selection of classic menu items.
          </p>
        </div>

        {/* Carousel Slider Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-brand-dark-gray border-4 border-black p-4 sm:p-8 relative shadow-2xl rounded-none">
          
          {/* Navigation Arrows (Absolute overlay or integrated) */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-20 hidden sm:block">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 bg-brand-red hover:bg-brand-yellow text-white hover:text-black border-4 border-black flex items-center justify-center transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
            >
              <ChevronLeft className="w-8 h-8 stroke-[3]" />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-20 hidden sm:block">
            <button 
              onClick={handleNext}
              className="w-12 h-12 bg-brand-red hover:bg-brand-yellow text-white hover:text-black border-4 border-black flex items-center justify-center transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
            >
              <ChevronRight className="w-8 h-8 stroke-[3]" />
            </button>
          </div>

          {/* Left Column: Extreme Product Image */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative bg-brand-black border-4 border-black p-4 min-h-[300px] sm:min-h-[400px] overflow-hidden group">
            
            {/* Carousel Item Image Frame */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id + sizeLevel}
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ 
                  opacity: 1, 
                  scale: sizeLevel === 'ultimate' ? 1.15 : sizeLevel === 'mega' ? 1.03 : 0.9,
                  rotate: 0 
                }}
                exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 180, damping: 15 }}
                className="relative w-full h-full flex justify-center items-center select-none"
              >
                <img 
                  src={activeItem.image} 
                  alt={activeItem.name} 
                  referrerPolicy="no-referrer"
                  className="max-h-[340px] sm:max-h-[400px] object-contain drop-shadow-[10px_16px_10px_rgba(0,0,0,0.85)] filter contrast-125 brightness-105"
                />
              </motion.div>
            </AnimatePresence>

            {/* Meat Badge Overlay */}
            <div className="absolute top-4 left-4 bg-brand-red border-2 border-black text-white px-3 py-1 font-display text-xs sm:text-sm tracking-widest skew-x-6 shadow-[2px_2px_0px_0px_#000000] uppercase flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow animate-pulse" />
              {activeItem.category}
            </div>

            {/* Mobile navigation overlays */}
            <div className="flex sm:hidden justify-between w-full mt-4 gap-4 relative z-20">
              <button onClick={handlePrev} className="flex-1 bg-brand-red border-2 border-black text-white font-display text-xs py-2 uppercase font-bold">PREV</button>
              <button onClick={handleNext} className="flex-1 bg-brand-red border-2 border-black text-white font-display text-xs py-2 uppercase font-bold">NEXT</button>
            </div>
          </div>

          {/* Right Column: Loud Bold Details */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              {/* Category & Tagline */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs text-brand-yellow font-black uppercase tracking-wider bg-brand-black px-2.5 py-1 border border-black">
                  {stats.titlePrefix}
                </span>
                <span className="text-gray-400 font-mono text-[10px] uppercase">
                  ITEM {currentIndex + 1} OF {INITIAL_MENU_ITEMS.length}
                </span>
              </div>

              {/* Massive Item Title */}
              <h3 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.8] text-white tracking-tighter uppercase select-none mb-4">
                {activeItem.arbyName.split(' ').map((word, i) => (
                  <span key={i} className={word === 'TITAN' || word === 'MEGALODON' || word === 'MONSTER' ? 'text-brand-yellow block' : 'block'}>
                    {word}{' '}
                  </span>
                ))}
              </h3>

              {/* Aggressive Tagline */}
              <h4 className="font-mono text-xs sm:text-sm text-brand-yellow tracking-widest uppercase mb-4 leading-tight skew-x-3">
                "{activeItem.tagline}"
              </h4>

              {/* Description */}
              <p className="text-white text-sm sm:text-base md:text-lg uppercase font-slab font-extrabold leading-tight border-l-[12px] border-black pl-4 py-1 mb-6">
                {stats.descOverride}
              </p>

              {/* Calorie Block & Price Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                
                {/* CALORIC TOWER */}
                <div className="bg-brand-black border-2 border-black p-3 flex flex-col justify-center items-center shadow-[4px_4px_0px_0px_var(--color-brand-red)]">
                  <span className="font-mono text-[10px] text-gray-500 uppercase font-black leading-none tracking-widest">CALORIC INTENSITY</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-mono text-3xl sm:text-4xl font-black text-white leading-none">
                      {stats.calories}
                    </span>
                    <span className="font-mono text-xs text-brand-red font-bold">CALS</span>
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-sans text-gray-400 mt-1 uppercase text-center flex flex-wrap justify-center items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-brand-yellow shrink-0" />
                    <span>{sizeLevel === 'ultimate' ? 'MAX MEAT FUEL' : 'REDUCED MEAT'}</span>
                  </span>
                </div>

                {/* THE COST */}
                <div className="bg-brand-black border-2 border-black p-3 flex flex-col justify-center items-center shadow-[4px_4px_0px_0px_var(--color-brand-yellow)]">
                  <span className="font-mono text-[10px] text-gray-500 uppercase font-black leading-none tracking-widest">DAMAGE DEALT</span>
                  <div className="flex items-baseline gap-0.5 mt-1">
                    <span className="font-mono text-3xl sm:text-4xl font-black text-brand-yellow leading-none">
                      Rs. {stats.price}
                    </span>
                  </div>
                  <span className="text-[9px] font-sans text-gray-400 mt-1 uppercase text-center">
                    + SOLID SATISFACTION TAX
                  </span>
                </div>

              </div>

              {/* INTERACTIVE AMPLIFY SLIDER CONTROL */}
              <div className="bg-brand-light-gray border-2 border-black p-3.5 sm:p-4 mb-6">
                <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                  <label className="font-display text-[10px] sm:text-xs text-white uppercase tracking-widest flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" />
                    MEAT STACK AMPLITUDE:
                  </label>
                  <span className={`font-display text-[9px] sm:text-xs px-2 py-0.5 border border-black uppercase ${
                    sizeLevel === 'ultimate' ? 'bg-brand-red text-white font-black' : 
                    sizeLevel === 'mega' ? 'bg-brand-yellow text-black font-black' : 'bg-gray-700 text-gray-300'
                  }`}>
                    {sizeLevel} mode
                  </span>
                </div>

                {/* Three-step visual slider */}
                <div className="grid grid-cols-3 gap-1.5 mt-3">
                  <button 
                    type="button"
                    onClick={() => {
                      playSizzle();
                      setSizeLevel('classic');
                    }}
                    className={`py-2 px-0.5 text-center border-2 font-display text-[9px] sm:text-xs uppercase tracking-tighter transition-all cursor-pointer truncate ${
                      sizeLevel === 'classic' 
                        ? 'bg-gray-200 text-black border-black font-extrabold shadow-sm' 
                        : 'bg-brand-dark-gray text-gray-500 border-transparent hover:text-gray-300'
                    }`}
                  >
                    CLASSIC
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      playSizzle();
                      setSizeLevel('mega');
                    }}
                    className={`py-2 px-0.5 text-center border-2 font-display text-[9px] sm:text-xs uppercase tracking-tighter transition-all cursor-pointer truncate ${
                      sizeLevel === 'mega' 
                        ? 'bg-brand-yellow text-brand-black border-black font-extrabold shadow-sm' 
                        : 'bg-brand-dark-gray text-gray-500 border-transparent hover:text-gray-300'
                    }`}
                  >
                    MEGA STACK
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      playSizzle();
                      setSizeLevel('ultimate');
                    }}
                    className={`py-2 px-0.5 text-center border-2 font-display text-[9px] sm:text-xs uppercase tracking-tighter transition-all cursor-pointer truncate ${
                      sizeLevel === 'ultimate' 
                        ? 'bg-brand-red text-white border-black font-extrabold shadow-sm' 
                        : 'bg-brand-dark-gray text-gray-500 border-transparent hover:text-gray-300'
                    }`}
                  >
                    ULTIMATE
                  </button>
                </div>
              </div>
            </div>

            {/* ORDER OR CUSTOMIZE */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={triggerOrder}
                disabled={isOrdering}
                className="flex-1 bg-brand-yellow hover:bg-yellow-400 text-brand-black font-display text-sm uppercase tracking-widest py-4 px-6 rounded-none border-2 border-black heavy-outline transition-all active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5 fill-brand-black text-brand-black" />
                {isOrdering ? 'SEARING THE GRILL...' : `BUY ${stats.titlePrefix} (Rs. ${stats.price})`}
              </button>
              
              <a
                href="#stack-builder"
                className="bg-brand-black hover:bg-brand-light-gray text-white font-display text-xs uppercase tracking-wider py-4 px-6 rounded-none border-2 border-brand-red text-center flex items-center justify-center gap-1"
              >
                <Sparkles className="w-4 h-4 text-brand-yellow animate-pulse" />
                BUILD A CUSTOM MONSTER
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
