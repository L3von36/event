"use client";

import React from 'react';
import Container from './ui/Container';
import { Quote } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

const Testimonials = ({ initialTestimonials }: { initialTestimonials?: any[] }) => {
  const { t, language } = useLanguage();
  const displayTestimonials = initialTestimonials || [];

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-950">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-heading">
            {t.testimonials.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.testimonials.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.map((item, index) => (
            <motion.div 
              key={item.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 relative"
            >
              <Quote className="absolute top-8 left-8 text-primary-500/10 w-12 h-12 -z-0" />
              <div className="relative z-10">
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed">
                  "{language === 'am' ? item.quoteAm : item.quote}"
                </p>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white font-heading">
                    {language === 'am' ? item.authorAm : item.author}
                  </h4>
                  <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                    {language === 'am' ? item.roleAm : item.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
