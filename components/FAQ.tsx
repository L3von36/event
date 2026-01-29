"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from './ui/Container';
import { useLanguage } from '@/context/LanguageContext';

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="border-b border-gray-100 dark:border-gray-800 last:border-0 overflow-hidden" itemScope itemType="https://schema.org/Question">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex items-center justify-between w-full py-6 text-left group transition-colors"
      >
        <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors pr-8" itemProp="name">
          {question}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            itemScope itemType="https://schema.org/Answer"
            itemProp="acceptedAnswer"
          >
            <div className="pb-6 pr-12 text-gray-600 dark:text-gray-400 leading-relaxed text-base" itemProp="text">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = ({ initialFaqs }: { initialFaqs?: any[] }) => {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const displayFaqs = initialFaqs || [];

  return (
    <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-950">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-heading">
              {t.faq.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t.faq.description}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            {displayFaqs.map((item, index) => (
              <FAQItem
                key={item.id || index}
                question={language === 'am' ? item.qAm : item.q}
                answer={language === 'am' ? item.aAm : item.a}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
