"use client";

import React, { useEffect, useState, use } from 'react';
import { getLead } from '@/lib/actions';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare,
  Clock,
  User,
  Tag
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLead(resolvedParams.id).then(data => {
      if (!data) {
        notFound();
      }
      setLead(data);
      setLoading(false);
    });
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!lead) return null;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/leads"
          className="p-2 rounded-xl bg-slate-800/50 border border-white/5 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white font-heading">Inquiry Details</h1>
          <p className="text-slate-400 text-sm">View complete information about this request.</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden"
      >
        {/* Header Section */}
        <div className="p-8 border-b border-white/5 bg-gradient-to-r from-emerald-500/5 to-transparent">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center shadow-inner">
                <User className="w-8 h-8 text-emerald-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{lead.name}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4" />
                    {new Date(lead.createdAt).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    })}
                  </span>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest rounded-full">
                    New Inquiry
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-emerald-500 rounded-full" />
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div className="group bg-slate-800/30 p-4 rounded-xl border border-white/5 hover:border-emerald-500/20 transition-colors">
                  <div className="flex items-center gap-3 mb-1 text-slate-400 text-sm font-medium">
                    <Mail className="w-4 h-4 text-emerald-500" />
                    Email Address
                  </div>
                  <div className="text-white pl-7 select-all">{lead.email}</div>
                </div>

                <div className="group bg-slate-800/30 p-4 rounded-xl border border-white/5 hover:border-emerald-500/20 transition-colors">
                  <div className="flex items-center gap-3 mb-1 text-slate-400 text-sm font-medium">
                    <Phone className="w-4 h-4 text-emerald-500" />
                    Phone Number
                  </div>
                  <div className="text-white pl-7 select-all">{lead.phone}</div>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-500 rounded-full" />
                Event Requirements
              </h3>
              
              <div className="group bg-slate-800/30 p-4 rounded-xl border border-white/5 hover:border-blue-500/20 transition-colors">
                <div className="flex items-center gap-3 mb-1 text-slate-400 text-sm font-medium">
                  <Tag className="w-4 h-4 text-blue-500" />
                  Event Type
                </div>
                <div className="text-white pl-7">{lead.eventType}</div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-purple-500 rounded-full" />
              Detailed Message
            </h3>
            
            <div className="bg-slate-800/30 p-6 rounded-2xl border border-white/5 min-h-[120px] relative overflow-hidden">
              <MessageSquare className="absolute top-6 right-6 w-24 h-24 text-white/[0.02] -rotate-12" />
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap relative z-10">
                {lead.message || "No additional details provided."}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
