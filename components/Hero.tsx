"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Container from './ui/Container';
import Button from './ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <section ref={ref} className="relative w-full h-[600px] sm:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <Image
          src="/images/hero-bg.png"
          alt="Vibrant Ethiopian cultural celebration"
          fill
          className="object-cover"
          priority
          
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-black/50 to-blue-900/60 mix-blend-multiply" />
      </motion.div>

      <Container className="relative z-10 text-center px-4">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 font-heading tracking-tight leading-[1.1]">
            {t.hero.headline_main}
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            {t.hero.subheadline}
          </p>


          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t.hero.cta_primary}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-white text-white hover:bg-white/10 hover:text-white"
              onClick={() => {
                document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t.hero.cta_secondary}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
