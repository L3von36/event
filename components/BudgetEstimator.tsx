"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, Users, Shield, Sparkles, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from './ui/Container';
import { useLanguage } from '@/context/LanguageContext';
import Button from './ui/Button';

const BudgetEstimator = () => {
  const { t } = useLanguage();
  const [guests, setGuests] = useState(100);
  const [levelIndex, setLevelIndex] = useState(1); // Premium by default

  const estimates = useMemo(() => {
    // Base rates per guest (ETB)
    const baseRates = [800, 1500, 3000]; // Essential, Premium, Elite
    const baseRate = baseRates[levelIndex];
    
    const total = guests * baseRate;
    const min = total * 0.9;
    const max = total * 1.15;

    return {
      total: total.toLocaleString(),
      range: `${min.toLocaleString()} - ${max.toLocaleString()}`
    };
  }, [guests, levelIndex]);

  const levels = [
    { icon: Shield, name: t.estimator.levels[0], desc: 'Quality essentials covered' },
    { icon: Sparkles, name: t.estimator.levels[1], desc: 'Enhanced decor & premium catering' },
    { icon: Award, name: t.estimator.levels[2], desc: 'Luxurious details & VIP services' }
  ];

  return (
    <section id="estimator" className="py-20 bg-white dark:bg-gray-900">
      <Container>
        <div className="max-w-4xl mx-auto bg-primary-50/50 dark:bg-primary-950/10 p-8 md:p-12 rounded-[2.5rem] border border-primary-100 dark:border-primary-900/30">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Controls */}
            <div className="flex-1 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">
                    {t.estimator.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {t.estimator.description}
                </p>
              </div>

              {/* Guest Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label htmlFor="guest-slider" className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {t.estimator.labels.guests}
                  </label>
                  <span className="text-3xl font-bold text-primary">{guests}</span>
                </div>
                <input
                  id="guest-slider"
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  aria-label="Number of guests"
                  className="w-full h-2 bg-primary-200 dark:bg-primary-900/50 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Service Levels */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  {t.estimator.labels.service_level}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {levels.map((level, index) => {
                    const Icon = level.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => setLevelIndex(index)}
                        className={`p-4 rounded-2xl border-2 transition-all text-left ${
                          levelIndex === index
                            ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                            : 'border-white dark:border-gray-800 bg-white dark:bg-gray-800 hover:border-primary-200'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-2 ${levelIndex === index ? 'text-primary' : 'text-gray-400'}`} />
                        <h4 className={`text-sm font-bold mb-1 ${levelIndex === index ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                          {level.name}
                        </h4>
                        <p className="text-[10px] text-gray-500 leading-tight">{level.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex-shrink-0 w-full md:w-80 bg-white dark:bg-gray-950 p-8 rounded-3xl border border-primary-100 dark:border-primary-900/30 flex flex-col justify-between shadow-xl shadow-primary-900/5">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">
                    {t.estimator.labels.total}
                  </span>
                  <motion.div
                    key={estimates.total}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl font-black text-gray-900 dark:text-white font-heading"
                  >
                    {estimates.total}
                    <span className="text-lg font-bold ml-1 text-primary">ETB</span>
                  </motion.div>
                </div>

                <div className="p-4 bg-primary-50 dark:bg-primary-950/30 rounded-2xl">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">
                    {t.estimator.labels.range}
                  </span>
                  <div className="text-sm font-bold text-primary-800 dark:text-primary-400">
                    {estimates.range}
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Button className="w-full shadow-lg shadow-primary/20">{t.nav.book}</Button>
                <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                  {t.estimator.labels.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BudgetEstimator;
