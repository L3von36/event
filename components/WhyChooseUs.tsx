"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Container from './ui/Container';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';

const WhyChooseUs = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section ref={ref} className="py-20 bg-primary-900 text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform translate-x-1/3" 
      />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-primary-400">
              <Sparkles className="w-3 h-3" />
              Trusted Authority in Ethiopia
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-6 font-heading leading-tight">
              {t.why_us.title}
            </h2>
            <div className="prose prose-invert mb-8">
              <p className="text-primary-100 text-lg leading-relaxed">
                Akirma (አኪርማ የዝግጅት አዘጋጅ) is the leading <strong>event organizer in Ethiopia</strong>. 
                We bring cultural excellence to every celebration, from traditional Habesha weddings to high-scale corporate events in Addis Ababa.
              </p>
            </div>
            
            <div className="space-y-4">
              {t.why_us.reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary-400 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-primary-50">{reason}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <div className="hidden lg:block relative">
            <motion.div 
              style={{ y }}
              className="aspect-square bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20 relative overflow-hidden"
            >
               <Image
                 src="/images/why-us.png"
                 alt="Professional event planning team"
                 fill
                 className="object-cover rounded-xl"
               />
               <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
