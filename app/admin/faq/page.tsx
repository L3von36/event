"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import { getFAQs, upsertFAQ } from '@/lib/actions';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, HelpCircle, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function FAQManager() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    id: '',
    q: '',
    qAm: '',
    a: '',
    aAm: '',
    order: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getFAQs();
    setFaqs(data);
    setIsLoading(false);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ id: '', q: '', qAm: '', a: '', aAm: '', order: faqs.length + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await upsertFAQ(formData);
    setIsModalOpen(false);
    fetchData();
  };

  const columns = [
    { key: 'order', label: '#' },
    { 
      key: 'q', 
      label: 'Question',
      render: (val: string) => <span className="font-medium line-clamp-1">{val}</span>
    },
    { 
      key: 'a', 
      label: 'Answer Preview',
      render: (val: string) => <span className="text-slate-500 line-clamp-1 text-xs italic">{val}</span>
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white font-heading">Manage FAQ</h1>
        <p className="text-slate-400 mt-1">Answer common questions from your clients in both English and Amharic.</p>
      </div>

      <DataTable 
        title="FAQ List"
        columns={columns}
        data={faqs}
        onAdd={handleOpenAdd}
        onEdit={handleOpenEdit}
        onDelete={() => {}} // Add delete later if needed
        isLoading={isLoading}
      />

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <h3 className="text-xl font-bold text-white font-heading">
                  {editingItem ? 'Edit FAQ Entry' : 'Create FAQ Entry'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Question (English)</label>
                    <input 
                      type="text" 
                      required
                      value={formData.q}
                      onChange={e => setFormData({...formData, q: e.target.value})}
                      className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all font-semibold"
                      placeholder="e.g. How far in advance should I book?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Question (Amharic)</label>
                    <input 
                      type="text" 
                      required
                      value={formData.qAm}
                      onChange={e => setFormData({...formData, qAm: e.target.value})}
                      className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all font-ethiopic"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Answer (English)</label>
                    <textarea 
                      required
                      value={formData.a}
                      onChange={e => setFormData({...formData, a: e.target.value})}
                      rows={4}
                      className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Answer (Amharic)</label>
                    <textarea 
                      required
                      value={formData.aAm}
                      onChange={e => setFormData({...formData, aAm: e.target.value})}
                      rows={4}
                      className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all font-ethiopic resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Sort Order</label>
                  <input 
                    type="number" 
                    value={formData.order}
                    onChange={e => setFormData({...formData, order: parseInt(e.target.value)})}
                    className="w-24 bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all"
                  />
                </div>
              </form>

              <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-end gap-3">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-white/10 text-slate-400 hover:text-white">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-500 flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save FAQ
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
