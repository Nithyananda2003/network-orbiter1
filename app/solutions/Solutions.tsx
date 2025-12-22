'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ElectricBorder from '@/components/ui/ElectricBorder';
import { solutions, type SolutionNavItem } from './solutionsData';

const AlternatingSolutionCard: React.FC<SolutionNavItem & { index: number }> = ({ id, navShortText, pageH1, headIntro, datasheet, icon: Icon, index }) => {
  const reverse = index % 2 === 1;
  return (
    <section id={id} className={`scroll-mt-24 bg-neutral-900 rounded-lg overflow-hidden shadow-sm transition-all duration-300 ${reverse ? '' : ''}`}>
      <div className={`grid grid-cols-1 lg:grid-cols-2 ${reverse ? 'lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1' : ''}`}>
        <div className="relative h-56 md:h-72 lg:h-full flex items-center justify-center bg-neutral-950">
          <motion.div
            initial={{ scale: 0.95, opacity: 0.85 }}
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex items-center justify-center w-full h-full"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent" />
            <Icon className="w-24 h-24 md:w-32 md:h-32 text-green-400" />
          </motion.div>
        </div>
        <div className="p-6 md:p-8 flex items-center">
          <div>
            <p className="text-xs md:text-sm text-green-400 mb-2">{navShortText}</p>
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{pageH1}</h3>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">{headIntro}</p>
            {datasheet && (
              <span className="mt-4 inline-block text-xs md:text-sm px-3 py-1 rounded border border-green-700 bg-green-500/10 text-green-400">
                Datasheet: {datasheet}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};


const Solutions: React.FC = () => {
  return (
    <div className="w-full bg-black py-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="mb-12 text-left">
          <p className="text-xs md:text-sm text-gray-400 mb-2">
            Home &gt; <span className="text-green-500 font-medium">Solutions</span>
          </p>

          <h1 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-3">
            NETWORK ORBITER WIRELESS SOLUTIONS
          </h1>

          <p className="text-sm md:text-base text-gray-300 max-w-2xl">
            Proven deployment scenarios for rural connectivity, WISP infrastructure,
            enterprise networks, and mission-critical wireless systems.
          </p>
        </div>

        {/* Alternating Cards */}
        <div className="space-y-10">
          {solutions.map((solution, idx) => (
            <AlternatingSolutionCard key={solution.navLabel} index={idx} {...solution} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Solutions;
