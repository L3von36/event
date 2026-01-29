"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Briefcase, 
  Image as ImageIcon, 
  MessageSquare, 
  Settings, 
  LogOut,
  HelpCircle,
  Inbox,
  X
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const navItems = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Inquiries', href: '/admin/leads', icon: Inbox },
  { name: 'Services', href: '/admin/services', icon: Briefcase },
  { name: 'Events Portfolio', href: '/admin/events', icon: ImageIcon },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'FAQ', href: '/admin/faq', icon: HelpCircle },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-950 border-r border-white/5 flex flex-col pt-8 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-72
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="px-6 mb-10 flex items-center justify-between">
          <Link href="/" onClick={onClose} className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary-500/10 rounded-xl flex items-center justify-center p-2 shadow-lg group-hover:scale-110 transition-transform">
              <img src="/logo.png" alt="Akirma Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold text-white font-heading tracking-tight">Akirma</span>
          </Link>
          
          <button 
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} onClick={onClose}>
                <div className={`
                  relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                  ${isActive ? 'bg-primary-500/10 text-primary-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                `}>
                  {isActive && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute left-0 w-1 h-6 bg-primary-500 rounded-r-full"
                    />
                  )}
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-500' : 'group-hover:text-primary-400'} transition-colors`} />
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
