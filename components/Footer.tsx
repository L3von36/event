"use client";

import React from 'react';
import Container from './ui/Container';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Send, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold font-heading text-primary-500 mb-4 block group">
              <div className="flex items-center gap-2 mb-2">
                <img src="/logo.png" alt="Akirma Logo" className="w-8 h-8 object-contain" />
                <span>Akirma</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.footer.description}
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">{t.footer.quick_links}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-primary-500 transition-colors">{t.nav.home}</Link></li>
              <li><Link href="#services" className="hover:text-primary-500 transition-colors">{t.nav.services}</Link></li>
              <li><Link href="#events" className="hover:text-primary-500 transition-colors">{t.nav.events}</Link></li>
              <li><Link href="#testimonials" className="hover:text-primary-500 transition-colors">{t.nav.testimonials}</Link></li>
              <li><Link href="#contact" className="hover:text-primary-500 transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">{t.footer.services_title}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {t.services.items.map((service, index) => (
                <li key={index}>{service.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">{t.footer.connect}</h3>
            <div className="flex space-x-4">
              <a href="https://wa.me/251915843131" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#25D366] transition-colors group">
                <Phone className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="https://www.facebook.com/share/1CFo9pz9T1/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#1877F2] transition-colors group">
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="https://www.instagram.com/akirmaevents?igsh=dXBmdmRnZHpjbDBm&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors group">
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="https://t.me/akirmaeventsplc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#229ED9] transition-colors group">
                <Send className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-500">{t.footer.newsletter}</p>
              <div className="mt-2 flex">
                <input 
                  type="email" 
                  placeholder={t.footer.email_placeholder}
                  className="bg-gray-800 border-none rounded-l-md px-4 py-2 text-sm w-full focus:ring-1 focus:ring-primary-500 outline-none"
                />
                <button className="bg-primary-600 px-4 py-2 rounded-r-md hover:bg-primary-700 transition-colors text-sm font-bold">
                  {t.footer.go}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>{t.footer.rights}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white">{t.footer.terms}</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
