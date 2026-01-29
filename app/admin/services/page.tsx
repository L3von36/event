"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/app/admin/layout';
import DataTable from '@/components/admin/DataTable';
import { getServices, upsertService, deleteService } from '@/lib/actions';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, AlertCircle, Heart, Star, Briefcase, Music, Palette } from 'lucide-react';
import Button from '@/components/ui/Button';

const iconOptions = [
  { name: 'Heart', icon: Heart },
  { name: 'Star', icon: Star },
  { name: 'Briefcase', icon: Briefcase },
  { name: 'Music', icon: Music },
  { name: 'Palette', icon: Palette },
];

export default function ServicesManager() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    nameAm: '',
    desc: '',
    descAm: '',
    iconName: 'Heart',
    order: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getServices();
    setServices(data);
    setIsLoading(false);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ id: '', name: '', nameAm: '', desc: '', descAm: '', iconName: 'Heart', order: services.length + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await deleteService(id);
      fetchData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await upsertService(formData);
    setIsModalOpen(false);
    fetchData();
  };

  const columns = [
    { key: 'order', label: '#' },
    { key: 'name', label: 'Name (EN)' },
    { key: 'nameAm', label: 'Name (AM)' },
    { 
      key: 'iconName', 
      label: 'Icon',
      render: (val: string) => {
        const Icon = iconOptions.find(o => o.name === val)?.icon || Heart;
        return <Icon className="w-5 h-5 text-emerald-500" />;
      }
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white font-heading">Manage Services</h1>
          <p className="text-slate-400 mt-1">Add, edit, or remove the core services offered by EventEthio.</p>
        </div>
      </div>

      <DataTable 
        title="Services List"
        columns={columns}
        data={services}
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
              className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <h3 className="text-xl font-bold text-white font-heading">
                  {editingItem ? 'Edit Service' : 'Add New Service'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Name (English)</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all"
                      placeholder="e.g. Wedding Planning"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Name (Amharic)</label>
                    <input 
                      type="text" 
                      required
                      value={formData.nameAm}
                      onChange={e => setFormData({...formData, nameAm: e.target.value})}
                      className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all font-ethiopic"
                      placeholder="ለምሳሌ፡ የሰርግ ዝግጅት"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Description (English)</label>
                  <textarea 
                    required
                    value={formData.desc}
                    onChange={e => setFormData({...formData, desc: e.target.value})}
                    rows={3}
                    className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all resize-none"
                    placeholder="Brief description of the service..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Description (Amharic)</label>
                  <textarea 
                    required
                    value={formData.descAm}
                    onChange={e => setFormData({...formData, descAm: e.target.value})}
                    rows={3}
                    className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all font-ethiopic resize-none"
                    placeholder="ስለ አገልግሎቱ አጭር መግለጫ..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Visual Icon</label>
                    <div className="grid grid-cols-5 gap-2">
                      {iconOptions.map(opt => (
                        <button
                          key={opt.name}
                          type="button"
                          onClick={() => setFormData({...formData, iconName: opt.name})}
                          className={`
                            h-12 flex items-center justify-center rounded-xl border transition-all
                            ${formData.iconName === opt.name ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-white/5 text-slate-400 hover:border-white/20'}
                          `}
                        >
                          <opt.icon className="w-6 h-6" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Display Order</label>
                    <input 
                      type="number" 
                      value={formData.order}
                      onChange={e => setFormData({...formData, order: parseInt(e.target.value)})}
                      className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all"
                    />
                  </div>
                </div>
              </form>

              <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-end gap-3">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-white/10 text-slate-400 hover:text-white">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-500 flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Service
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
