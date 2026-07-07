import React from 'react';
import { Flame, Trophy, Shield, HelpCircle, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-brand-black border-t-8 border-brand-red text-gray-400 py-12 px-4 relative" id="app-footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        
        {/* Brand Callout */}
        <div className="md:col-span-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-brand-red text-brand-yellow font-display text-xl flex items-center justify-center border-2 border-black rounded-sm shadow-[2px_2px_0px_#FFC72C]">
                M
              </div>
              <span className="font-display text-lg text-white uppercase tracking-tighter">
                MCDONALD'S <span className="text-brand-yellow">ULTIMATE</span>
              </span>
            </div>
            <p className="text-xs font-mono leading-relaxed max-w-sm">
              The ultimate compilation of high-powered, towering classic menu items. Built for pure satisfaction.
            </p>
          </div>
          
          <div className="mt-6 flex gap-3 text-xs font-mono text-gray-500">
            <span>Sect-9 Node-A</span>
            <span>•</span>
            <span>Est. 2026</span>
            <span>•</span>
            <span>Ultimate Stacks</span>
          </div>
        </div>

        {/* Dynamic Quicklinks */}
        <div className="md:col-span-3">
          <h4 className="font-display text-xs text-white uppercase tracking-wider mb-4 border-b border-brand-light-gray pb-1">
            SECTIONS OF POWER
          </h4>
          <ul className="space-y-2 font-mono text-xs">
            <li>
              <a href="#hero-carousel" className="hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                <Flame className="w-3 h-3 text-brand-red" />
                AMPLIFIED SLIDER
              </a>
            </li>
            <li>
              <a href="#sloganizer" className="hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                <Trophy className="w-3 h-3 text-brand-yellow" />
                SLOGANIZER VOXBOX
              </a>
            </li>
            <li>
              <a href="#stack-builder" className="hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-brand-red" />
                MCSTACK BUILDER
              </a>
            </li>
            <li>
              <a href="#menu-grid" className="hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                <HelpCircle className="w-3 h-3 text-brand-yellow" />
                FULL NUTRITION REGISTRY
              </a>
            </li>
          </ul>
        </div>

        {/* Faux disclaimers and legal jokes */}
        <div className="md:col-span-5">
          <h4 className="font-display text-xs text-white uppercase tracking-wider mb-4 border-b border-brand-light-gray pb-1">
            CONSTITUTIONAL LEGAL DISCLAIMER
          </h4>
          <p className="text-[10px] font-mono leading-relaxed text-gray-500">
            This is a highly-stylized, high-octane tribute to the legendary, timeless, world-famous menu items of McDonald's®, re-imagined with extreme, towering culinary aesthetics. All trademarks, service marks, logos, and taglines belong strictly to their respective owners. We do not actually weld iron arches on standard corporate burgers, nor do we encourage eating 10,000 calories in a single sitting unless you are a certified heavy-machinery operator. Proceed with absolute, unapologetic satisfaction.
          </p>
        </div>

      </div>

      {/* Massive I'M LOVIN' IT Banner at the absolute bottom */}
      <div className="max-w-7xl mx-auto border-t-4 border-black pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Giant "I'M LOVIN' IT!" Banner */}
        <div className="bg-brand-yellow text-brand-black p-4 border-4 border-black heavy-outline flex items-center justify-center skew-x-3 w-full md:w-auto">
          <span className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-shadow-sm select-none">
            I'M LOVIN' IT!®
          </span>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="bg-brand-red hover:bg-brand-yellow text-white hover:text-black border-2 border-black p-3.5 rounded-none cursor-pointer transition-all active:translate-y-1"
          title="Scroll To Summit"
        >
          <ArrowUp className="w-6 h-6 stroke-[3]" />
        </button>

      </div>
    </footer>
  );
}
