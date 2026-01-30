"use client";

import React from 'react';
import Container from './ui/Container';
import { Heart, Briefcase, Star, Music, Palette, Megaphone, Calendar, Home, Lightbulb, Armchair, UtensilsCrossed, Baby } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

const iconMap: Record<string, any> = { 
  Heart, Briefcase, Star, Music, Palette, 
  Megaphone, Calendar, Home, Lightbulb, Armchair, UtensilsCrossed, Baby 
};

import Link from 'next/link';
import Button from './ui/Button';

const Services = ({ initialServices, limit, showSeeMore }: { initialServices?: any[], limit?: number, showSeeMore?: boolean }) => {
  const { t, language } = useLanguage();
  const allServices = initialServices || [];
  const displayServices = limit ? allServices.slice(0, limit) : allServices;

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-950">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-heading">
            {t.services.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.services.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, index) => {
            const Icon = iconMap[service.iconName] || Heart;
            return (
              <motion.div 
                key={service.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-800 group"
              >
                <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">
                  {language === 'am' ? service.nameAm : service.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {language === 'am' ? service.descAm : service.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {showSeeMore && (
          <div className="mt-12 text-center">
            <Link href="/services">
              <Button size="lg" variant="outline">
                {language === 'am' ? 'ሁሉንም አገልግሎቶች ይመልከቱ' : 'See All Services'}
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Services;
