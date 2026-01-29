"use client";

import React, { useState } from 'react';
import { MessageSquare, X, Send, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const chatLinks = [
    {
      name: 'Telegram',
      icon: Send,
      href: 'https://t.me/yourusername', // Replace with actual
      color: 'bg-[#229ED9]',
      label: t.chat.telegram
    },
    {
      name: 'WhatsApp',
      icon: Phone,
      href: 'https://wa.me/251911234567', // Replace with actual
      color: 'bg-[#25D366]',
      label: t.chat.whatsapp
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="bg-primary p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">EventEthio</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-white/80">{t.chat.we_are_online}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {t.chat.greeting}
              </p>
              
              {chatLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 w-full p-3 rounded-xl text-white font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] ${link.color}`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:scale-95 relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
        )}
      </button>
    </div>
  );
};

export default FloatingChat;
