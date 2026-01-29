"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock, 
  Plus,
  ChevronRight,
  Star,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { getLeads, getServices, getEvents, getTestimonials } from '@/lib/actions';

export default function AdminPage() {
  const [inquiryCount, setInquiryCount] = React.useState('0');
  const [eventCount, setEventCount] = React.useState('0');
  const [serviceCount, setServiceCount] = React.useState('0');
  const [clientSatisfaction, setClientSatisfaction] = React.useState('98%');

  React.useEffect(() => {
    getLeads().then(data => setInquiryCount(data.length.toString()));
    getEvents().then(data => setEventCount(data.length.toString()));
    getServices().then(data => setServiceCount(data.length.toString()));
  }, []);

  const stats = [
    { name: 'Total Events', value: eventCount, change: 'All time', icon: Calendar, color: 'emerald' },
    { name: 'Services Active', value: serviceCount, change: 'Stable', icon: CheckCircle2, color: 'blue' },
    { name: 'New Inquiries', value: inquiryCount, change: 'Total', icon: TrendingUp, color: 'purple' },
    { name: 'Happy Clients', value: clientSatisfaction, change: '+2%', icon: Star, color: 'amber' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white font-heading">Dashboard Overview</h1>
        <p className="text-slate-400 mt-1">Manage your event portal's dynamic content and track performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all"
          >
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">{stat.name}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-slate-600 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
              </div>
            </div>
            
            {/* Decoration */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-${stat.color}-500/5 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700`} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Updates */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                Recent Activity
              </h2>
              <button className="text-xs font-semibold text-emerald-500 hover:text-emerald-400 flex items-center gap-1 transition-colors">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="divide-y divide-white/5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 flex items-center gap-4 hover:bg-white/5 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-500 transition-all">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">New event added: "Royal Highland Wedding"</p>
                    <p className="text-xs text-slate-500 mt-1">2 hours ago • by Admin</p>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    Live
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 rounded-2xl shadow-xl shadow-emerald-500/10 relative overflow-hidden group">
            <h3 className="text-xl font-bold text-white mb-4 relative z-10">Quick Launch</h3>
            <p className="text-emerald-100/80 text-sm mb-6 relative z-10">Ready to showcase a new event in your portfolio?</p>
            <button className="w-full bg-white text-emerald-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-50 relative z-10 transition-all active:scale-95 shadow-lg">
              <Plus className="w-5 h-5" />
              Add New Event
            </button>
            <ImageIcon className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-6 rounded-2xl">
            <h3 className="font-bold text-white mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Database Status</span>
                <span className="text-emerald-400 flex items-center gap-1 font-medium">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Optimal
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Public Changes</span>
                <span className="text-blue-400 font-medium">Synced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
