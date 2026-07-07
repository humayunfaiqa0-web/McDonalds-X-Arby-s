import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldAlert, Thermometer, TrendingUp, Zap } from 'lucide-react';
import { BRAND_FACTS } from '../data';

export default function BrandFacts() {
  return (
    <section className="py-12 bg-brand-black text-white px-4 border-b-8 border-brand-yellow" id="brand-facts">
      <div className="max-w-7xl mx-auto">
        
        {/* Bento header */}
        <div className="text-center mb-10">
          <span className="font-mono text-xs text-brand-red tracking-widest font-black uppercase bg-brand-dark-gray border border-black px-2.5 py-1">
            LABORATORY SPECIFICATIONS
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tighter mt-2">
            WHY OUR LOVIN' IT IS <span className="text-brand-yellow">HEAVIER</span>
          </h2>
        </div>

        {/* Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRAND_FACTS.map((fact, index) => {
            // Pick a distinctive icon based on the index
            const icons = [
              <Thermometer className="w-10 h-10 text-brand-red fill-brand-red/10 animate-bounce" />,
              <TrendingUp className="w-10 h-10 text-brand-yellow animate-pulse" />,
              <Zap className="w-10 h-10 text-brand-red fill-brand-yellow/10" />
            ];

            return (
              <motion.div
                key={index}
                className="bg-brand-dark-gray border-4 border-black p-6 flex flex-col justify-between relative group heavy-outline"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Visual grid numbers */}
                <span className="absolute top-4 right-4 font-display text-4xl text-black select-none pointer-events-none opacity-20">
                  0{index + 1}
                </span>

                <div className="mb-6">
                  {icons[index]}
                  <h3 className="font-display text-lg sm:text-xl text-white uppercase mt-4 tracking-tighter group-hover:text-brand-yellow transition-colors">
                    {fact.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm font-sans mt-2 leading-relaxed">
                    {fact.desc}
                  </p>
                </div>

                <div className="border-t-2 border-black pt-4 mt-auto">
                  <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-black text-brand-yellow drop-shadow-[2px_2px_0px_#000000]">
                    {fact.value}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Safety Warning */}
        <div className="mt-8 bg-brand-red/10 border-2 border-brand-red p-4 flex items-center gap-4 text-xs font-mono">
          <ShieldAlert className="w-8 h-8 text-brand-red shrink-0" />
          <div>
            <span className="text-brand-red font-black uppercase">MEAT OVERLOAD WARNING:</span>
            <span className="text-gray-300 block sm:inline sm:ml-2">
              High-calorie, heavy-duty burgers. Consume with absolute care.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
