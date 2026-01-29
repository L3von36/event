"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from './ui/Container';
import Button from './ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';

const EventCard = ({ event }: { event: any }) => {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div className="group cursor-pointer">
      <div 
        ref={ref}
        className={`aspect-[4/5] bg-gray-100 dark:bg-gray-800 rounded-xl mb-4 overflow-hidden relative`}
      >
        <motion.div style={{ y }} className="absolute inset-0 h-[120%] -top-[10%] w-full">
          <Image
            src={event.image || '/images/placeholder.png'}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
        
        <Link href="#gallery" className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 text-center">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.events.view_gallery}</p>
        </Link>
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            {language === 'am' ? event.categoryAm : event.category}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{event.year}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
          {language === 'am' ? event.titleAm : event.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {language === 'am' ? event.locationAm : event.location}
        </p>
      </div>
    </div>
  );
};

const FeaturedEvents = ({ initialEvents }: { initialEvents?: any[] }) => {
  const { t } = useLanguage();
  const displayEvents = initialEvents || [];

  return (
    <section id="events" className="py-20 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-heading">
              {t.events.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t.events.description}
            </p>
          </div>
          <Button variant="outline" className="dark:text-white dark:border-gray-700">{t.events.cta}</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayEvents.map((event, index) => (
            <EventCard key={event.id || index} event={event} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedEvents;
