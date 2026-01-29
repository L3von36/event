"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import { getEvents, upsertEvent, deleteEvent } from '@/lib/actions';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, ImageIcon, MapPin, Calendar as CalendarIcon, Tag } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function EventsManager() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    titleAm: '',
    category: 'Wedding',
    categoryAm: 'ሰርግ',
    location: '',
    locationAm: '',
    year: new Date().getFullYear().toString(),
    image: '',
    featured: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getEvents();
    setEvents(data);
    setIsLoading(false);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ 
      id: '', 
      title: '', 
      titleAm: '', 
      category: 'Wedding', 
      categoryAm: 'ሰርግ', 
      location: '', 
      locationAm: '', 
      year: new Date().getFullYear().toString(), 
      image: '', 
      featured: true 
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      await deleteEvent(id);
      fetchData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await upsertEvent(formData);
    setIsModalOpen(false);
    fetchData();
  };

  const columns = [
    { 
      key: 'image', 
      label: 'Preview',
      render: (val: string) => (
        <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 bg-slate-800">
          {val ? (
            <img src={val} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-slate-600" />
            </div>
          )}
        </div>
      )
    },
    { key: 'title', label: 'Title (EN)' },
    { key: 'category', label: 'Category' },
    { key: 'location', label: 'Location' },
    { key: 'year', label: 'Year' },
    { 
      key: 'featured', 
      label: 'Featured',
      render: (val: boolean) => (
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${val ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-400'}`}>
          {val ? 'Yes' : 'No'}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white font-heading">Events Portfolio</h1>
        <p className="text-slate-400 mt-1">Showcase your best work. These events appear in the featured gallery on the homepage.</p>
      </div>

      <DataTable 
        title="Events List"
        columns={columns}
        data={events}
        onAdd={handleOpenAdd}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <h3 className="text-xl font-bold text-white font-heading">
                  {editingItem ? 'Edit Portfolio Event' : 'Add to Portfolio'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {/* Image URL & Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Cover Image Source</label>
                    <div className="relative group">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500" />
                      <input 
                        type="url" 
                        required
                        value={formData.image}
                        onChange={e => setFormData({...formData, image: e.target.value})}
                        className="w-full bg-slate-800 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all font-mono text-xs"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 ml-1 italic">* Use high-quality Unsplash URLs or relative local paths like /images/event-1.png</p>
                  </div>
                  <div className="h-full min-h-[140px] bg-slate-800 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center relative group">
                    {formData.image ? (
                      <img src={formData.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Preview" />
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                        <span className="text-[10px] text-slate-600 font-bold uppercase">No Preview</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Event Title (English)</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Event Title (Amharic)</label>
                    <input 
                      type="text" 
                      required
                      value={formData.titleAm}
                      onChange={e => setFormData({...formData, titleAm: e.target.value})}
                      className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all font-ethiopic"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1 flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Category (EN)
                    </label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all appearance-none"
                    >
                      <option value="Wedding">Wedding</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Concert">Concert</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Category (Amharic)</label>
                    <input 
                      type="text" 
                      required
                      value={formData.categoryAm}
                      onChange={e => setFormData({...formData, categoryAm: e.target.value})}
                      className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all font-ethiopic"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Location (EN)
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all"
                      placeholder="e.g. Addis Ababa"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Location (Amharic)</label>
                    <input 
                      type="text" 
                      required
                      value={formData.locationAm}
                      onChange={e => setFormData({...formData, locationAm: e.target.value})}
                      className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all font-ethiopic"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1 flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3" /> Event Year
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.year}
                      onChange={e => setFormData({...formData, year: e.target.value})}
                      className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-4 pt-8">
                    <input 
                      type="checkbox" 
                      id="featured"
                      checked={formData.featured}
                      onChange={e => setFormData({...formData, featured: e.target.checked})}
                      className="w-5 h-5 rounded-md border-white/10 bg-slate-800 text-emerald-500 focus:ring-emerald-500"
                    />
                    <label htmlFor="featured" className="text-sm font-semibold text-white cursor-pointer">Show in Featured Gallery</label>
                  </div>
                </div>
              </form>

              <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-end gap-3">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-white/10 text-slate-400 hover:text-white">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-500 flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Event
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
