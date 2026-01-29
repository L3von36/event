"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { 
  Target, 
  Rocket, 
  Award, 
  CheckCircle2, 
  Lightbulb,
  ShieldCheck,
  Zap,
  BarChart3
} from 'lucide-react';

const VisionMission = () => {
  const { language } = useLanguage();
  const t = translations[language].identity;

  const goalIcons = [ShieldCheck, Zap, Award, BarChart3, Rocket];

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-[#050914]">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Target className="w-4 h-4" />
            <span>{t.title}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-heading"
          >
            {t.subtitle}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group p-8 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 backdrop-blur-xl relative overflow-hidden hover:border-emerald-500/50 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Target className="w-32 h-32 text-emerald-500" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t.vision.title}</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed italic">
                "{t.vision.content}"
              </p>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group p-8 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 backdrop-blur-xl relative overflow-hidden hover:border-blue-500/50 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Rocket className="w-32 h-32 text-blue-500" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Rocket className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t.mission.title}</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed italic">
                "{t.mission.content}"
              </p>
            </div>
          </motion.div>
        </div>

        {/* Goals Grid */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white whitespace-nowrap px-4 tracking-tight">
              {t.goals.title}
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {t.goals.items.map((goal: any, index: number) => {
              const Icon = goalIcons[index % goalIcons.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900/20 border border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group"
                >
                  <Icon className="w-8 h-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{goal.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-500 line-clamp-3 leading-relaxed">
                    {goal.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Objectives Section */}
        <div className="bg-emerald-600 dark:bg-emerald-500/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {t.objectives.title}
                </h3>
                <p className="text-emerald-50/80 dark:text-emerald-400/80">
                  Our roadmap to becoming the undisputed market leader in Ethiopian event management.
                </p>
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.objectives.items.map((obj: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3 bg-white/10 dark:bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-200 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-white font-medium leading-tight">
                        {obj}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
