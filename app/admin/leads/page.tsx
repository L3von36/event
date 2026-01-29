"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Inbox, 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  MoreVertical
} from 'lucide-react';
import { getLeads } from '@/lib/actions';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getLeads().then(data => {
      setLeads(data);
      setLoading(false);
    });
  }, []);

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.eventType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-heading">Event Inquiries</h1>
          <p className="text-slate-400 mt-1">Review and manage incoming client leads and service requests.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-slate-900/50 border border-white/5 px-4 py-2 rounded-xl w-full md:w-80 group focus-within:border-emerald-500/50 transition-all">
          <Search className="w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search inquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-slate-200 text-sm w-full"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredLeads.length > 0 ? (
            filteredLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden group hover:border-white/10 transition-all"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <Inbox className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-3">
                          {lead.name}
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
                            {lead.eventType}
                          </span>
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Mail className="w-4 h-4" />
                            {lead.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Phone className="w-4 h-4" />
                            {lead.phone}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                            <Clock className="w-4 h-4" />
                            {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {new Date(lead.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex-1 lg:max-w-md">
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500 uppercase tracking-tighter">
                        <MessageSquare className="w-3 h-3" />
                        Inquiry Message
                      </div>
                      <p className="text-sm text-slate-300 line-clamp-2 md:line-clamp-none">
                        {lead.message || "No specific message provided."}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="flex-1 lg:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-lg transition-colors">
                        Mark as Read
                      </button>
                      <button className="p-2 text-slate-500 hover:text-white transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-slate-900/50 border border-dashed border-white/10 rounded-2xl p-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No inquiries found</h3>
              <p className="text-slate-500 max-w-sm">No contact requests match your search criteria or the database is empty.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
