import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, ShieldAlert, Award, Star, Share2, Flame, RefreshCcw, ShoppingBag } from 'lucide-react';
import { STACKER_INGREDIENTS } from '../data';
import { StackerIngredient, SavedMcStack } from '../types';
import { playSizzle } from '../utils/audio';
import { addToCart } from '../utils/cart';

export default function McBeastBuilder() {
  // Start with a standard base burger stack (bun bottom, patty, cheese, onion rings, lettuce, sauce, bun top)
  const [stack, setStack] = useState<StackerIngredient[]>([
    STACKER_INGREDIENTS.find(i => i.id === 'bun-bottom')!,
    STACKER_INGREDIENTS.find(i => i.id === 'beef-patty')!,
    STACKER_INGREDIENTS.find(i => i.id === 'cheese')!,
    STACKER_INGREDIENTS.find(i => i.id === 'bacon')!, // This is 'Crispy Sizzling Onion Rings' inside STACKER_INGREDIENTS
    STACKER_INGREDIENTS.find(i => i.id === 'lettuce')!,
    STACKER_INGREDIENTS.find(i => i.id === 'mac-sauce')!,
    STACKER_INGREDIENTS.find(i => i.id === 'bun-top')!,
  ]);

  const [customName, setCustomName] = useState("THE CRUNCHY GRANDEUR");
  const [savedBeasts, setSavedBeasts] = useState<SavedMcStack[]>([
    {
      name: "THE MEAT APOCALYPSE",
      ingredients: ["Bun Bottom", "Beef Patty", "Beef Patty", "Cheese", "Crispy Sizzling Onion Rings", "Crispy Sizzling Onion Rings", "Beef Patty", "Cheese", "Bun Top"],
      totalCalories: 1485,
      totalPrice: 1690,
      rating: 5
    },
    {
      name: "THE GOLDEN ARCH CRUNCHER",
      ingredients: ["Bun Bottom", "Chicken Fillet", "Cheese", "Crispy Sizzling Onion Rings", "Lettuce", "Mac Sauce", "Bun Top"],
      totalCalories: 775,
      totalPrice: 990,
      rating: 4.8
    }
  ]);

  const [activeCategoryTab, setActiveCategoryTab] = useState<'buns' | 'proteins' | 'sauces' | 'extras'>('proteins');

  // Calculate calories and price
  const totalCalories = stack.reduce((sum, ing) => sum + ing.calories, 0);
  const totalPrice = stack.reduce((sum, ing) => sum + ing.price, 0);

  // Dynamically update burger names based on stack elements
  useEffect(() => {
    const meatCount = stack.filter(ing => ing.renderType === 'meat').length;
    const chickenCount = stack.filter(ing => ing.renderType === 'chicken').length;
    const baconCount = stack.filter(ing => ing.renderType === 'bacon').length; // Represents Onion rings now
    const cheeseCount = stack.filter(ing => ing.renderType === 'cheese').length;

    let prefix = "THE";
    if (meatCount >= 3) prefix = "THE APOCALYPTIC TRIPLE";
    else if (meatCount === 2) prefix = "THE DOUBLE-BARRELED";
    else if (chickenCount >= 2) prefix = "THE CLUCKING TITAN";
    else if (baconCount >= 2) prefix = "THE ONION CRUNCHER";

    let body = "MCDONALD'S";
    if (meatCount > 0 && chickenCount > 0) body = "SURF-LESS TURF STACK";
    else if (chickenCount > 0) body = "CHICKEN COLOSSUS";
    else if (meatCount > 0) body = "BEEF BLOCKADE";
    else if (cheeseCount > 0) body = "CHEESE AVALANCHE";

    let suffix = "FORTRESS";
    if (baconCount > 0) suffix = "ONIONEER";
    if (totalCalories > 1500) suffix = "WIDOWMAKER";
    else if (totalCalories < 400) suffix = "LITE";

    setCustomName(`${prefix} ${body} ${suffix}`);
  }, [stack]);

  // Add ingredient
  const addIngredient = (ingredient: StackerIngredient) => {
    playSizzle();
    // Bun Top should ideally sit at the top. Let's insert before bun-top or just append.
    // If we have a bun-top in the stack, we insert right before it. Else, we push.
    const bunTopIndex = stack.findIndex(ing => ing.renderType === 'bun-top');
    
    if (bunTopIndex !== -1) {
      const newStack = [...stack];
      newStack.splice(bunTopIndex, 0, ingredient);
      setStack(newStack);
    } else {
      setStack([...stack, ingredient]);
    }
  };

  // Remove ingredient at specific index
  const removeIngredient = (index: number) => {
    playSizzle();
    const newStack = [...stack];
    newStack.splice(index, 1);
    setStack(newStack);
  };

  // Clear Stack
  const clearStack = () => {
    playSizzle();
    setStack([]);
  };

  // Apply Presets
  const applyPreset = (presetType: 'tower' | 'cluck' | 'heart-stopper') => {
    playSizzle();
    let preset: StackerIngredient[] = [];
    if (presetType === 'tower') {
      preset = [
        STACKER_INGREDIENTS.find(i => i.id === 'bun-bottom')!,
        STACKER_INGREDIENTS.find(i => i.id === 'beef-patty')!,
        STACKER_INGREDIENTS.find(i => i.id === 'cheese')!,
        STACKER_INGREDIENTS.find(i => i.id === 'beef-patty')!,
        STACKER_INGREDIENTS.find(i => i.id === 'cheese')!,
        STACKER_INGREDIENTS.find(i => i.id === 'beef-patty')!,
        STACKER_INGREDIENTS.find(i => i.id === 'cheese')!,
        STACKER_INGREDIENTS.find(i => i.id === 'mac-sauce')!,
        STACKER_INGREDIENTS.find(i => i.id === 'bun-top')!,
      ];
    } else if (presetType === 'cluck') {
      preset = [
        STACKER_INGREDIENTS.find(i => i.id === 'bun-bottom')!,
        STACKER_INGREDIENTS.find(i => i.id === 'chicken-fillet')!,
        STACKER_INGREDIENTS.find(i => i.id === 'cheese')!,
        STACKER_INGREDIENTS.find(i => i.id === 'bacon')!,
        STACKER_INGREDIENTS.find(i => i.id === 'lettuce')!,
        STACKER_INGREDIENTS.find(i => i.id === 'mac-sauce')!,
        STACKER_INGREDIENTS.find(i => i.id === 'bun-top')!,
      ];
    } else if (presetType === 'heart-stopper') {
      preset = [
        STACKER_INGREDIENTS.find(i => i.id === 'bun-bottom')!,
        STACKER_INGREDIENTS.find(i => i.id === 'beef-patty')!,
        STACKER_INGREDIENTS.find(i => i.id === 'cheese')!,
        STACKER_INGREDIENTS.find(i => i.id === 'bacon')!,
        STACKER_INGREDIENTS.find(i => i.id === 'bacon')!,
        STACKER_INGREDIENTS.find(i => i.id === 'beef-patty')!,
        STACKER_INGREDIENTS.find(i => i.id === 'cheese')!,
        STACKER_INGREDIENTS.find(i => i.id === 'bacon')!,
        STACKER_INGREDIENTS.find(i => i.id === 'chicken-fillet')!,
        STACKER_INGREDIENTS.find(i => i.id === 'bun-top')!,
      ];
    }
    setStack(preset);
  };

  // Save creation
  const saveBeast = () => {
    if (stack.length === 0) return;
    const newBeast: SavedMcStack = {
      name: customName,
      ingredients: stack.map(ing => ing.name),
      totalCalories,
      totalPrice,
      rating: parseFloat((4 + Math.random()).toFixed(1))
    };
    setSavedBeasts([newBeast, ...savedBeasts]);
    alert(`⭐ "${customName}" saved to the Stack Archives!`);
  };

  return (
    <section className="py-12 bg-brand-black text-white px-4 border-b-8 border-brand-yellow" id="stack-builder">
      <div className="max-w-7xl mx-auto">
        
        {/* Intro */}
        <div className="flex flex-col items-center text-center mb-10">
          <span className="font-mono text-xs text-brand-black bg-brand-yellow px-2.5 py-1 border-2 border-black font-extrabold uppercase tracking-widest skew-x-3 mb-2">
            INTERACTIVE KITCHEN LABORATORY
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-tighter uppercase leading-none">
            MCSTACK® <span className="text-brand-red">BUILDER</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mt-2 font-mono">
            Unleash your inner food architect. Click ingredients to stack 'em high.
          </p>
        </div>

        {/* Builder Workstation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* LEFT PANEL: The 3D-ish Virtual Burger Stack View (Bigger, taller!) */}
          <div className="bg-brand-dark-gray border-4 border-black p-6 flex flex-col justify-between items-center relative overflow-hidden heavy-outline">
            
            {/* Visual backdrop grill lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none flex flex-col justify-around">
              <div className="h-[2px] bg-brand-red w-full"></div>
              <div className="h-[2px] bg-brand-yellow w-full"></div>
              <div className="h-[2px] bg-brand-red w-full"></div>
              <div className="h-[2px] bg-brand-yellow w-full"></div>
              <div className="h-[2px] bg-brand-red w-full"></div>
            </div>

            {/* Title / Slogan header */}
            <div className="w-full text-center border-b-4 border-black pb-3 mb-4 relative z-10">
              <span className="font-mono text-[9px] text-brand-yellow uppercase tracking-widest font-black">LIVE BLUEPRINT SPECIFICATION</span>
              <h4 className="font-display text-xl sm:text-2xl text-white uppercase tracking-tight font-black animate-pulse">
                {customName}
              </h4>
            </div>

            {/* ARCHITECTURE CHECKLIST: Makes burger construction easy to understand */}
            <div className="w-full bg-brand-black border-2 border-black p-3 mb-4 relative z-10 text-xs font-mono space-y-2">
              <span className="text-brand-yellow font-black text-[10px] tracking-wider block uppercase mb-1">
                📐 BURGER STRUCTURAL COMPLIANCE:
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                {/* Bun Bottom */}
                <div className={`p-1.5 border border-black flex flex-col justify-center items-center ${
                  stack.some(i => i.renderType === 'bun-bottom') ? 'bg-green-950 text-green-400 border-green-500' : 'bg-red-950/40 text-red-400 border-red-900'
                }`}>
                  <span className="text-sm">🍞</span>
                  <span className="font-bold uppercase mt-0.5">Bottom Bun</span>
                  <span className="text-[8px] font-black">{stack.some(i => i.renderType === 'bun-bottom') ? 'SECURED' : 'MISSING'}</span>
                </div>

                {/* Fillings */}
                <div className={`p-1.5 border border-black flex flex-col justify-center items-center ${
                  stack.some(i => i.renderType === 'meat' || i.renderType === 'chicken') ? 'bg-green-950 text-green-400 border-green-500' : 'bg-red-950/40 text-red-400 border-red-900'
                }`}>
                  <span className="text-sm">🥩</span>
                  <span className="font-bold uppercase mt-0.5">Fillings</span>
                  <span className="text-[8px] font-black">
                    {stack.filter(i => i.renderType !== 'bun-top' && i.renderType !== 'bun-bottom').length} LAYERS
                  </span>
                </div>

                {/* Bun Top */}
                <div className={`p-1.5 border border-black flex flex-col justify-center items-center ${
                  stack.some(i => i.renderType === 'bun-top') ? 'bg-green-950 text-green-400 border-green-500' : 'bg-red-950/40 text-red-400 border-red-900'
                }`}>
                  <span className="text-sm">🥯</span>
                  <span className="font-bold uppercase mt-0.5">Top Bun</span>
                  <span className="text-[8px] font-black">{stack.some(i => i.renderType === 'bun-top') ? 'SECURED' : 'MISSING'}</span>
                </div>
              </div>

              {/* Action advice */}
              <div className="text-center pt-1 border-t border-gray-800 text-[10px]">
                {(!stack.some(i => i.renderType === 'bun-bottom') && !stack.some(i => i.renderType === 'bun-top')) ? (
                  <span className="text-brand-yellow font-bold">👉 STEP 1: Add a "Toasted Bun Bottom" and "Sesame Bun Top" first!</span>
                ) : !stack.some(i => i.renderType === 'bun-bottom') ? (
                  <span className="text-brand-red font-bold">⚠️ ALERT: Add a "Bun Bottom" to support the burger foundations!</span>
                ) : !stack.some(i => i.renderType === 'bun-top') ? (
                  <span className="text-brand-red font-bold">⚠️ ALERT: Cap it off with a "Sesame Bun Top" to lock the stack!</span>
                ) : (
                  <span className="text-green-400 font-bold">🔥 ARCHITECTURE PERFECT! Ready to sear onto the grill.</span>
                )}
              </div>
            </div>

            {/* Instruction tooltip badge */}
            <div className="w-full text-center py-1 bg-brand-red/10 border border-brand-red/20 text-brand-yellow font-mono text-[9px] tracking-wider uppercase mb-2 relative z-10">
              ❌ Tip: Click any stacked layer in the burger below to vaporize it!
            </div>

            {/* Burger Visualizer Container (Less elongated, highly mobile responsive!) */}
            <div className="w-full h-[320px] sm:h-[480px] flex flex-col-reverse justify-start items-center gap-1 sm:gap-1.5 relative z-10 py-4 sm:py-6 overflow-y-auto bg-brand-black/40 border-2 border-black rounded shadow-inner">
              
              {stack.length === 0 ? (
                <div className="text-center my-auto flex flex-col items-center p-6">
                  <ShieldAlert className="w-16 h-16 text-brand-red animate-bounce" />
                  <p className="font-display text-base text-white uppercase mt-4">Grill is Cold!</p>
                  <p className="text-gray-400 font-mono text-xs mt-2 max-w-xs">
                    Your architecture matrix is empty! Click the grouped ingredients on the right panel to stack 'em high.
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {stack.map((ingredient, idx) => {
                    // Match rendering styles for different ingredient types
                    let roundedStyle = "rounded-lg";
                    let patternStyle = "";
                    
                    if (ingredient.renderType === 'bun-top') {
                      roundedStyle = "rounded-t-full rounded-b-md shadow-lg";
                      patternStyle = "bg-[radial-gradient(#ffffff_2px,transparent_1px)] bg-[size:14px_14px]";
                    } else if (ingredient.renderType === 'bun-bottom') {
                      roundedStyle = "rounded-b-3xl rounded-t-sm border-t-4 border-brand-red shadow-md";
                    } else if (ingredient.renderType === 'cheese') {
                      roundedStyle = "rounded-sm transform rotate-1 skew-x-3";
                    } else if (ingredient.renderType === 'bacon') {
                      roundedStyle = "rounded-sm bg-[linear-gradient(45deg,#800030_25%,#B7094C_25%,#B7094C_50%,#800030_50%,#800030_75%,#B7094C_75%)] bg-[size:16px_16px]";
                    }

                    // Dynamically scale multiplier (1.35x standard, 1.15x for tall stacks) to fit on phone screens comfortably
                    const heightMultiplier = stack.length > 8 ? 1.15 : 1.35;
                    const displayHeight = Math.round(ingredient.heightPx * heightMultiplier);

                    return (
                      <motion.div
                        key={`${ingredient.id}-${idx}`}
                        initial={{ y: -300, opacity: 0, scale: 1.3 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ x: 200, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                        style={{ 
                          backgroundColor: ingredient.color, 
                          borderColor: ingredient.borderColor,
                          height: `${displayHeight}px`
                        }}
                        className={`w-11/12 sm:w-4/5 border-2 border-black flex items-center justify-between px-3 sm:px-4 text-brand-black text-[9px] sm:text-xs font-mono font-black uppercase select-none shadow-[0px_4px_6px_rgba(0,0,0,0.3)] ${roundedStyle} ${patternStyle} relative cursor-pointer hover:brightness-110 active:scale-95 group transition-transform`}
                        onClick={() => removeIngredient(idx)}
                        title="Click to remove layer"
                      >
                        {/* Sesame detail for bun top */}
                        {ingredient.renderType === 'bun-top' && (
                          <div className="absolute inset-0 opacity-50 rounded-t-full bg-[radial-gradient(#ffffff_2.5px,transparent_0)] bg-[size:16px_16px] bg-center pointer-events-none"></div>
                        )}

                        <span className="text-black drop-shadow-[1px_1px_0px_rgba(255,255,255,0.6)] truncate relative z-10 font-extrabold tracking-tight">
                          {ingredient.name}
                        </span>

                        <div className="flex items-center gap-1.5 relative z-10">
                          <span className="text-black bg-white/60 px-1.5 py-0.2 border border-black/30 text-[9px] rounded-sm font-bold">
                            {ingredient.calories} Cal
                          </span>
                          <Trash2 className="w-4 h-4 text-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}

            </div>

            {/* Quick action: Clear stack */}
            {stack.length > 0 && (
              <button 
                onClick={clearStack}
                className="mt-4 text-xs font-mono uppercase bg-brand-black border border-brand-red hover:bg-brand-red text-white py-1 px-4 flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
              >
                <RefreshCcw className="w-3.5 h-3.5 text-brand-yellow" />
                VAPORIZE TOTAL STACK
              </button>
            )}

          </div>

          {/* RIGHT PANEL: Controls, Stats, and Presets (Perfect half split!) */}
          <div className="flex flex-col justify-between gap-6">
            
            {/* Live Calorie & Price Counter Display */}
            <div className="bg-brand-black border-4 border-black p-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left shadow-lg">
              <div>
                <span className="font-mono text-xs text-gray-500 uppercase font-black tracking-widest leading-none">CUMULATIVE CALORIES</span>
                <div className="flex items-baseline justify-center sm:justify-start gap-1 mt-1">
                  <span className={`font-display text-4xl sm:text-5xl font-black ${totalCalories > 1200 ? 'text-brand-red animate-pulse' : 'text-brand-yellow'}`}>
                    {totalCalories}
                  </span>
                  <span className="font-mono text-sm text-white uppercase font-black">CALS</span>
                </div>
              </div>
              
              <div className="h-[2px] sm:h-12 w-full sm:w-[2px] bg-brand-light-gray"></div>

              <div>
                <span className="font-mono text-xs text-gray-500 uppercase font-black tracking-widest leading-none">TOTAL FINANCIAL DAMAGE</span>
                <div className="flex items-baseline justify-center sm:justify-start gap-1 mt-1">
                  <span className="font-display text-4xl sm:text-5xl font-black text-white">
                    Rs. {totalPrice}
                  </span>
                  <span className="font-mono text-sm text-gray-400">PKR</span>
                </div>
              </div>

              <div className="h-[2px] sm:h-12 w-full sm:w-[2px] bg-brand-light-gray"></div>

              <div className="flex flex-col items-center">
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest leading-none">DENSITY RATING</span>
                <span className="font-display text-lg sm:text-xl text-brand-yellow mt-1 font-black">
                  {totalCalories > 1500 ? "STACK CHAMPION" : totalCalories > 900 ? "MEAT TANK" : totalCalories > 400 ? "MEDIUM TIER" : "SNACK BOY"}
                </span>
              </div>
            </div>

            {/* Category Presets buttons */}
            <div>
              <h4 className="font-display text-xs text-brand-yellow uppercase tracking-wider mb-2 font-black flex items-center gap-1.5">
                <span>🏰</span> OFFICIAL PRESETS (ONE-CLICK ASSEMBLY):
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => applyPreset('tower')}
                  className="bg-brand-dark-gray hover:bg-brand-light-gray text-white border-2 border-black font-display text-[10px] sm:text-xs uppercase py-2.5 px-2 text-center transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                >
                  🏰 BEEF BLOCKADE
                </button>
                <button
                  onClick={() => applyPreset('cluck')}
                  className="bg-brand-dark-gray hover:bg-brand-light-gray text-white border-2 border-black font-display text-[10px] sm:text-xs uppercase py-2.5 px-2 text-center transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                >
                  🐓 CHICKEN TITAN
                </button>
                <button
                  onClick={() => applyPreset('heart-stopper')}
                  className="bg-brand-red hover:bg-red-700 text-white border-2 border-black font-display text-[10px] sm:text-xs uppercase py-2.5 px-2 text-center transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                >
                  🚨 MEAT APOCALYPSE
                </button>
              </div>
            </div>

            {/* Categorized Ingredient Selectors - INFINITELY EASIER TO UNDERSTAND ON PHONES */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black pb-2">
                <h4 className="font-display text-xs text-white uppercase tracking-wider font-black flex items-center gap-1.5">
                  <span>🧪</span> SELECT INGREDIENT INJECTIONS:
                </h4>
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-bold">CLICK TABS TO NAVIGATE CATEGORIES</span>
              </div>

              {/* Dynamic Retro Tabs */}
              <div className="grid grid-cols-4 gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => { playSizzle(); setActiveCategoryTab('buns'); }}
                  className={`py-2 px-1 text-center font-display text-[9px] sm:text-xs uppercase tracking-tighter border-2 border-black transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 ${
                    activeCategoryTab === 'buns' 
                      ? 'bg-brand-yellow text-brand-black font-black' 
                      : 'bg-brand-dark-gray hover:bg-brand-light-gray text-gray-400 hover:text-white'
                  }`}
                >
                  🍞 BUNS
                </button>
                <button
                  type="button"
                  onClick={() => { playSizzle(); setActiveCategoryTab('proteins'); }}
                  className={`py-2 px-1 text-center font-display text-[9px] sm:text-xs uppercase tracking-tighter border-2 border-black transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 ${
                    activeCategoryTab === 'proteins' 
                      ? 'bg-brand-yellow text-brand-black font-black' 
                      : 'bg-brand-dark-gray hover:bg-brand-light-gray text-gray-400 hover:text-white'
                  }`}
                >
                  🥩 MEATS
                </button>
                <button
                  type="button"
                  onClick={() => { playSizzle(); setActiveCategoryTab('sauces'); }}
                  className={`py-2 px-1 text-center font-display text-[9px] sm:text-xs uppercase tracking-tighter border-2 border-black transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 ${
                    activeCategoryTab === 'sauces' 
                      ? 'bg-brand-yellow text-brand-black font-black' 
                      : 'bg-brand-dark-gray hover:bg-brand-light-gray text-gray-400 hover:text-white'
                  }`}
                >
                  🥬 GREENS
                </button>
                <button
                  type="button"
                  onClick={() => { playSizzle(); setActiveCategoryTab('extras'); }}
                  className={`py-2 px-1 text-center font-display text-[9px] sm:text-xs uppercase tracking-tighter border-2 border-black transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 ${
                    activeCategoryTab === 'extras' 
                      ? 'bg-brand-yellow text-brand-black font-black' 
                      : 'bg-brand-dark-gray hover:bg-brand-light-gray text-gray-400 hover:text-white'
                  }`}
                >
                  🧀 EXTRAS
                </button>
              </div>

              {/* Group 1: Bread & Foundation Buns */}
              {activeCategoryTab === 'buns' && (
                <div className="bg-brand-black/30 border-2 border-black p-3 rounded animate-fadeIn">
                  <span className="font-mono text-[9px] text-brand-yellow uppercase font-bold tracking-widest block mb-2">🍞 BREADS & FOUNDATIONS</span>
                  <div className="grid grid-cols-2 gap-2">
                    {STACKER_INGREDIENTS.filter(i => i.renderType === 'bun-top' || i.renderType === 'bun-bottom').map(ingredient => (
                      <button
                        key={ingredient.id}
                        onClick={() => addIngredient(ingredient)}
                        className="bg-brand-dark-gray hover:bg-brand-light-gray text-left p-2.5 border-2 border-black hover:border-brand-yellow transition-all flex flex-col justify-between h-[85px] relative group cursor-pointer"
                      >
                        <div className="flex justify-between items-start w-full">
                          <span 
                            style={{ backgroundColor: ingredient.color }} 
                            className="w-3 h-3 rounded-full border border-black inline-block shadow-sm"
                          ></span>
                          <span className="bg-brand-black text-brand-yellow font-mono text-[8px] sm:text-[9px] px-1 py-0.5 border border-black font-bold">
                            +Rs. {ingredient.price}
                          </span>
                        </div>
                        <div className="mt-1">
                          <p className="font-display text-[10px] sm:text-[11px] text-white leading-tight uppercase group-hover:text-brand-yellow transition-colors truncate">
                            {ingredient.name.replace('Toasted ', '').replace('Rugged ', '').replace('Giant ', '')}
                          </p>
                          <p className="font-mono text-[8px] sm:text-[9px] text-gray-400">{ingredient.calories} Cals</p>
                        </div>
                        <div className="absolute right-2 bottom-2 bg-brand-yellow text-brand-black p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Group 2: Meats & Fillers */}
              {activeCategoryTab === 'proteins' && (
                <div className="bg-brand-black/30 border-2 border-black p-3 rounded animate-fadeIn">
                  <span className="font-mono text-[9px] text-brand-yellow uppercase font-bold tracking-widest block mb-2">🥩 FLAME-SEARED PROTEINS</span>
                  <div className="grid grid-cols-2 gap-2">
                    {STACKER_INGREDIENTS.filter(i => i.renderType === 'meat' || i.renderType === 'chicken').map(ingredient => (
                      <button
                        key={ingredient.id}
                        onClick={() => addIngredient(ingredient)}
                        className="bg-brand-dark-gray hover:bg-brand-light-gray text-left p-2.5 border-2 border-black hover:border-brand-yellow transition-all flex flex-col justify-between h-[85px] relative group cursor-pointer"
                      >
                        <div className="flex justify-between items-start w-full">
                          <span 
                            style={{ backgroundColor: ingredient.color }} 
                            className="w-3 h-3 rounded-full border border-black inline-block shadow-sm"
                          ></span>
                          <span className="bg-brand-black text-brand-yellow font-mono text-[8px] sm:text-[9px] px-1 py-0.5 border border-black font-bold">
                            +Rs. {ingredient.price}
                          </span>
                        </div>
                        <div className="mt-1">
                          <p className="font-display text-[10px] sm:text-[11px] text-white leading-tight uppercase group-hover:text-brand-yellow transition-colors truncate">
                            {ingredient.name.replace('Toasted ', '').replace('Rugged ', '').replace('Giant ', '')}
                          </p>
                          <p className="font-mono text-[8px] sm:text-[9px] text-gray-400">{ingredient.calories} Cals</p>
                        </div>
                        <div className="absolute right-2 bottom-2 bg-brand-yellow text-brand-black p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Group 3: Sauces & Greens */}
              {activeCategoryTab === 'sauces' && (
                <div className="bg-brand-black/30 border-2 border-black p-3 rounded animate-fadeIn">
                  <span className="font-mono text-[9px] text-brand-yellow uppercase font-bold tracking-widest block mb-2">🥬 FRESH LAYERS & SAUCES</span>
                  <div className="grid grid-cols-2 gap-2">
                    {STACKER_INGREDIENTS.filter(i => i.renderType === 'sauce' || i.renderType === 'lettuce').map(ingredient => (
                      <button
                        key={ingredient.id}
                        onClick={() => addIngredient(ingredient)}
                        className="bg-brand-dark-gray hover:bg-brand-light-gray text-left p-2.5 border-2 border-black hover:border-brand-yellow transition-all flex flex-col justify-between h-[85px] relative group cursor-pointer"
                      >
                        <div className="flex justify-between items-start w-full">
                          <span 
                            style={{ backgroundColor: ingredient.color }} 
                            className="w-3 h-3 rounded-full border border-black inline-block shadow-sm"
                          ></span>
                          <span className="bg-brand-black text-brand-yellow font-mono text-[8px] sm:text-[9px] px-1 py-0.5 border border-black font-bold">
                            +Rs. {ingredient.price}
                          </span>
                        </div>
                        <div className="mt-1">
                          <p className="font-display text-[10px] sm:text-[11px] text-white leading-tight uppercase group-hover:text-brand-yellow transition-colors truncate">
                            {ingredient.name.replace('Toasted ', '').replace('Rugged ', '').replace('Giant ', '')}
                          </p>
                          <p className="font-mono text-[8px] sm:text-[9px] text-gray-400">{ingredient.calories} Cals</p>
                        </div>
                        <div className="absolute right-2 bottom-2 bg-brand-yellow text-brand-black p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Group 4: Crunch & Cheese */}
              {activeCategoryTab === 'extras' && (
                <div className="bg-brand-black/30 border-2 border-black p-3 rounded animate-fadeIn">
                  <span className="font-mono text-[9px] text-brand-yellow uppercase font-bold tracking-widest block mb-2">🧀 CRISPY CRUNCH & CHEESE</span>
                  <div className="grid grid-cols-2 gap-2">
                    {STACKER_INGREDIENTS.filter(i => i.renderType === 'cheese' || i.renderType === 'bacon').map(ingredient => (
                      <button
                        key={ingredient.id}
                        onClick={() => addIngredient(ingredient)}
                        className="bg-brand-dark-gray hover:bg-brand-light-gray text-left p-2.5 border-2 border-black hover:border-brand-yellow transition-all flex flex-col justify-between h-[85px] relative group cursor-pointer"
                      >
                        <div className="flex justify-between items-start w-full">
                          <span 
                            style={{ backgroundColor: ingredient.color }} 
                            className="w-3 h-3 rounded-full border border-black inline-block shadow-sm"
                          ></span>
                          <span className="bg-brand-black text-brand-yellow font-mono text-[8px] sm:text-[9px] px-1 py-0.5 border border-black font-bold">
                            +Rs. {ingredient.price}
                          </span>
                        </div>
                        <div className="mt-1">
                          <p className="font-display text-[10px] sm:text-[11px] text-white leading-tight uppercase group-hover:text-brand-yellow transition-colors truncate">
                            {ingredient.name.replace('Toasted ', '').replace('Rugged ', '').replace('Giant ', '')}
                          </p>
                          <p className="font-mono text-[8px] sm:text-[9px] text-gray-400">{ingredient.calories} Cals</p>
                        </div>
                        <div className="absolute right-2 bottom-2 bg-brand-yellow text-brand-black p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Final checkout actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-brand-light-gray">
              <button
                onClick={() => {
                  playSizzle();
                  saveBeast();
                }}
                disabled={stack.length === 0}
                className="flex-1 bg-brand-dark-gray hover:bg-brand-light-gray text-white border-2 border-black font-display text-xs sm:text-sm uppercase tracking-wider py-4 px-6 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Award className="w-5 h-5 text-brand-yellow" />
                SAVE TO ARCHIVES
              </button>

              <button
                onClick={() => {
                  playSizzle();
                  if (stack.length === 0) return;
                  addToCart({
                    id: 'custom-mcstack-' + Date.now(),
                    name: customName,
                    arbyName: 'CUSTOM MCSTACKER BUILD',
                    price: totalPrice,
                    calories: totalCalories,
                    image: '/src/assets/images/big_mac_stack_1783453433593.jpg',
                    customization: stack.map(i => i.name)
                  });
                }}
                disabled={stack.length === 0}
                className="flex-1 bg-brand-yellow hover:bg-yellow-400 text-brand-black font-display text-xs sm:text-sm uppercase tracking-widest py-4 px-6 border-2 border-black heavy-outline transition-all active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-5 h-5" />
                ADD TO BASKET (Rs. {totalPrice})
              </button>
            </div>

            {/* Saved creations list */}
            {savedBeasts.length > 0 && (
              <div className="bg-brand-black border-2 border-black p-4 mt-2">
                <span className="font-mono text-[9px] text-brand-yellow tracking-widest uppercase block mb-3 font-bold">
                  COMMUNITY APPROVED MCSTACK CREATIONS
                </span>
                <div className="space-y-3">
                  {savedBeasts.map((beast, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-brand-dark-gray p-3 border border-black hover:border-brand-red transition-all">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display text-xs text-white uppercase">{beast.name}</span>
                          <div className="flex items-center gap-0.5 text-brand-yellow">
                            <Star className="w-3 h-3 fill-brand-yellow" />
                            <span className="font-mono text-[9px] font-bold">{beast.rating}</span>
                          </div>
                        </div>
                        <p className="text-[10px] font-mono text-gray-500 mt-0.5 truncate max-w-sm">
                          {beast.ingredients.join(' + ')}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mt-2 sm:mt-0 font-mono text-[10px]">
                        <span className="text-brand-red font-bold">{beast.totalCalories} CALS</span>
                        <span className="text-brand-yellow font-bold">Rs. {beast.totalPrice}</span>
                        <button
                          onClick={() => {
                            playSizzle();
                            // Find corresponding items and restore stack
                            const restored: StackerIngredient[] = [];
                            beast.ingredients.forEach(name => {
                              const match = STACKER_INGREDIENTS.find(i => i.name === name || i.name.includes(name) || name.includes(i.name));
                              if (match) restored.push(match);
                            });
                            if (restored.length > 0) setStack(restored);
                          }}
                          className="bg-brand-black hover:bg-brand-red hover:text-white text-brand-yellow border border-black px-2 py-1 uppercase cursor-pointer"
                        >
                          LOAD STACK
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
