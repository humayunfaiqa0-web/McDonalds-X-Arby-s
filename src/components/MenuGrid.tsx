import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Flame, Star, ShieldAlert, CheckCircle, FlameKindling, Sparkles } from 'lucide-react';
import { INITIAL_MENU_ITEMS } from '../data';
import { MenuItem } from '../types';
import { playSizzle } from '../utils/audio';
import { addToCart } from '../utils/cart';

interface MenuCardProps {
  item: MenuItem;
  key?: string;
}

function MenuCard({ item }: MenuCardProps) {
  const [onionRingsAdded, setOnionRingsAdded] = useState(false);
  const [cheeseAdded, setCheeseAdded] = useState(false);

  // Dynamic additions logic
  let activeCalories = item.calories;
  let activePrice = item.price;
  
  if (onionRingsAdded) {
    activeCalories += 120;
    activePrice += 150;
  }
  if (cheeseAdded) {
    activeCalories += 110;
    activePrice += 90;
  }

  const buyItem = () => {
    playSizzle();
    
    const customization: string[] = [];
    if (onionRingsAdded) customization.push("SIZZLING ONION RINGS");
    if (cheeseAdded) customization.push("CHEDDAR FLOW");

    addToCart({
      id: item.id,
      name: item.name,
      arbyName: item.arbyName,
      price: activePrice,
      calories: activeCalories,
      image: item.image,
      customization: customization
    });
  };

  return (
    <motion.div 
      className="bg-brand-dark-gray border-4 border-black flex flex-col justify-between overflow-hidden relative group heavy-outline-red hover:translate-y-[-4px] transition-transform duration-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Dynamic Background Warning Strip for ultimate mode */}
      <div className="bg-brand-red text-brand-yellow font-mono text-[9px] font-black uppercase text-center py-1 tracking-widest border-b-2 border-black">
        🚨 EXTREME DENSITY ALERT - CHROME SERVED
      </div>

      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        {/* Card Header */}
        <div className="flex justify-between items-start gap-2 mb-3">
          <span className="font-mono text-[10px] text-brand-yellow font-black uppercase tracking-wider bg-brand-black px-2 py-0.5 border border-black">
            {activeCalories} CALS
          </span>
          <span className="font-mono text-xs text-white font-extrabold">
            Rs. {activePrice}
          </span>
        </div>

        {/* Product Image Display */}
        <div className="w-full h-48 bg-brand-black border-2 border-black flex items-center justify-center p-2 mb-4 overflow-hidden relative">
          <img 
            src={item.image} 
            alt={item.name} 
            referrerPolicy="no-referrer"
            className="max-h-40 object-contain drop-shadow-[4px_8px_4px_rgba(0,0,0,0.7)] group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Flame floating indicator */}
          <div className="absolute bottom-2 right-2 bg-brand-red border border-black p-1 text-brand-yellow">
            <Flame className="w-4 h-4 fill-brand-yellow animate-pulse" />
          </div>
        </div>

        {/* Text Details */}
        <h3 className="font-display text-xl sm:text-2xl text-white tracking-tighter uppercase leading-none mb-1 group-hover:text-brand-yellow transition-colors">
          {item.arbyName.replace('THE ', '')}
        </h3>
        
        <p className="font-display text-[10px] text-brand-red tracking-wider uppercase mb-3">
          "{item.tagline}"
        </p>

        <p className="text-gray-300 text-xs font-slab font-bold uppercase leading-tight flex-1 mb-4">
          {item.description}
        </p>

        {/* Ingredients Bullet Point List - Styled Arby's style */}
        <div className="bg-brand-black border border-black p-3 mb-4 rounded-none">
          <span className="font-mono text-[9px] text-brand-yellow uppercase block mb-1.5 tracking-wider font-extrabold">
            INGESTION VECTOR ANALYSIS:
          </span>
          <div className="flex flex-wrap gap-1">
            {item.ingredients.slice(0, 5).map((ing, i) => (
              <span key={i} className="font-mono text-[9px] text-gray-300 bg-brand-light-gray px-1.5 py-0.5 border border-black/50">
                • {ing.replace('Toasted ', '').replace('Flame-Grilled ', '')}
              </span>
            ))}
            {item.ingredients.length > 5 && (
              <span className="font-mono text-[9px] text-brand-red bg-brand-yellow/10 border border-brand-red/30 px-1.5 py-0.5 font-bold">
                + {item.ingredients.length - 5} MORE LAYERS
              </span>
            )}
          </div>
        </div>

        {/* Card Interactive Add-ons */}
        <div className="border-t border-brand-light-gray/40 pt-4 space-y-2 mb-4">
          <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-black block">
            CUSTOM STACK ENHANCEMENT:
          </span>
          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-mono text-gray-300 select-none">
              <input 
                type="checkbox" 
                checked={onionRingsAdded}
                onChange={(e) => {
                  setOnionRingsAdded(e.target.checked);
                  playSizzle();
                }}
                className="accent-brand-red w-4 h-4 rounded-none cursor-pointer"
              />
              <span>SIZZLING ONION RINGS (+120 Cals)</span>
            </label>
            <span className="font-mono text-brand-yellow font-bold">+Rs. 150</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-mono text-gray-300 select-none">
              <input 
                type="checkbox" 
                checked={cheeseAdded}
                onChange={(e) => {
                  setCheeseAdded(e.target.checked);
                  playSizzle();
                }}
                className="accent-brand-yellow w-4 h-4 rounded-none cursor-pointer"
              />
              <span>CHEDDAR FLOW (+110 Cals)</span>
            </label>
            <span className="font-mono text-brand-yellow font-bold">+Rs. 90</span>
          </div>
        </div>

      </div>

      {/* Buy Button */}
      <button 
        onClick={buyItem}
        className="w-full bg-brand-red hover:bg-brand-yellow text-white hover:text-black font-display text-xs sm:text-sm uppercase tracking-widest py-3 border-t-4 border-black transition-all font-black flex items-center justify-center gap-2 cursor-pointer"
      >
        <FlameKindling className="w-4 h-4 text-brand-yellow animate-spin" />
        SECURE THIS MONSTER
      </button>
    </motion.div>
  );
}

export default function MenuGrid() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'burgers' | 'chicken' | 'sides' | 'desserts'>('all');

  // Hardcoded epic ultimate style McDonald's items (sides and desserts)
  const additionalItems: MenuItem[] = [
    {
      id: 'oreo-flurry-volcano',
      name: 'McFlurry',
      arbyName: 'MCFLURRY VOLCANO',
      tagline: 'CREAMY SOFT SERVE LOADED WITH CRUSHED OREO COOKIES.',
      description: 'Thick vanilla soft serve blended with a heavy serving of crushed Oreo cookies and warm chocolate fudge.',
      baseCalories: 510,
      calories: 820,
      price: 550,
      image: '/src/assets/images/mcflurry_dessert_1783454080370.jpg',
      category: 'desserts',
      ingredients: ['Thick Vanilla Soft Serve Core', 'Crushed Oreo Cookie Shrapnel', 'Decadent Hot Fudge Lava', 'More Oreo Cookies'],
      level: 'ultimate'
    },
    {
      id: 'hot-apple-coal',
      name: 'McApplePie',
      arbyName: 'MCAPPLEPIE TURNOVER',
      tagline: 'CRISPY PIE BAKED AND SERVED HOT.',
      description: 'Crispy, golden pastry lattice filled with hot spiced apple filling.',
      baseCalories: 240,
      calories: 480,
      price: 380,
      image: '/src/assets/images/mcapplepie_dessert_1783454093120.jpg',
      category: 'desserts',
      ingredients: ['Flaky Pastry Lattice', 'Boiling Cinnamon Apple Lava', 'Powdered Coal Sugar Dust'],
      level: 'ultimate'
    },
    {
      id: 'mcnugget-barrage',
      name: 'McNugget',
      arbyName: 'MCNUGGET CLUSTER',
      tagline: 'TWENTY CRISPY GOLDEN MCNUGGETS.',
      description: 'Twenty crispy, white-meat chicken McNuggets served with BBQ, Sweet & Sour, and Spicy Honey Mustard dipping sauces.',
      baseCalories: 450,
      calories: 950,
      price: 1190,
      image: '/src/assets/images/crispy_chicken_stack_1783453473246.jpg', // Use our generated high-quality chicken asset
      category: 'chicken',
      ingredients: ['Tempura Batter Outer Armoring', 'Premium Sourced White Meat', 'Dipping Sauce Weaponry pods'],
      level: 'ultimate'
    }
  ];

  // Combine initial menu items and our extra items
  const allItems = [...INITIAL_MENU_ITEMS, ...additionalItems];

  const filteredItems = activeCategory === 'all' 
    ? allItems 
    : allItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-16 bg-brand-black text-white px-4 border-b-8 border-brand-red" id="menu-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation & Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b-4 border-black pb-6">
          <div>
            <span className="font-mono text-xs text-brand-red tracking-widest font-black uppercase flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-brand-yellow animate-pulse" />
              THE FULL NUTRITIONAL ARSENAL
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tighter leading-none">
              THE FULL <span className="text-brand-yellow">MCDONALD'S</span> REGISTRY
            </h2>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2">
            {(['all', 'burgers', 'chicken', 'sides', 'desserts'] as const).map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`py-2 px-4 font-display text-xs uppercase tracking-widest transition-all cursor-pointer border-2 border-black ${
                  activeCategory === category 
                    ? 'bg-brand-red text-white font-extrabold heavy-outline' 
                    : 'bg-brand-dark-gray hover:bg-brand-light-gray text-gray-400 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map(item => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}
