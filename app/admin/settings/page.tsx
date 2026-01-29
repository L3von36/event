"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Languages, 
  Database,
  Save,
  Lock,
  X,
  Key
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { useSession } from 'next-auth/react';
import { getGlobalSettings, updateGlobalSettings, exportDatabaseData, changePassword } from '@/lib/actions';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [isYellowTheme, setIsYellowTheme] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);

  // Password Management State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);
  const [passwords, setPasswords] = React.useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [isPasswordChanging, setIsPasswordChanging] = React.useState(false);

  React.useEffect(() => {
    getGlobalSettings().then(settings => {
      setIsYellowTheme(settings.isYellowTheme);
    });
  }, []);

  const handleThemeToggle = async () => {
    setIsSaving(true);
    const newStatus = !isYellowTheme;
    setIsYellowTheme(newStatus);
    const res = await updateGlobalSettings(newStatus);
    if (!res.success) {
      setIsYellowTheme(isYellowTheme); // Rollback
      alert('Failed to update theme setting');
    }
    setIsSaving(false);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const res = await exportDatabaseData();
      if (res.success) {
        const dataStr = JSON.stringify(res.data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `akirma_backup_${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert("Failed to export data.");
    }
    setIsExporting(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match!");
      return;
    }
    
    setIsPasswordChanging(true);
    const res = await changePassword({
      currentPassword: passwords.current,
      newPassword: passwords.new
    });
    
    if (res.success) {
      alert("Password updated successfully!");
      setIsPasswordModalOpen(false);
      setPasswords({ current: '', new: '', confirm: '' });
    } else {
      alert(res.message);
    }
    setIsPasswordChanging(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white font-heading">Portal Settings</h1>
        <p className="text-slate-400 mt-1">Configure your administrative preferences and system defaults.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-500" />
              <h2 className="font-bold text-white">Administrative Profile</h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Display Name</label>
                  <input 
                    type="text" 
                    defaultValue={session?.user?.name || 'Admin User'}
                    className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    readOnly
                    value={session?.user?.email || 'admin@akirma.com'}
                    className="w-full bg-slate-800/50 border border-white/5 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Admin Bio</label>
                <textarea 
                  rows={3}
                  placeholder="Primary manager for Akirma event portal."
                  className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500/50 transition-all resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="bg-emerald-600 hover:bg-emerald-500 flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Update Profile
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              <h2 className="font-bold text-white">Security & Access</h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                <div>
                  <p className="text-white font-medium">Password Management</p>
                  <p className="text-xs text-slate-500">Securely update your admin credentials</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="border-white/10"
                >
                  Change Password
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl text-slate-400 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  High-Encryption Protocols Active
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Languages className="w-5 h-5 text-purple-500" />
              <h3 className="font-bold text-white">Visual Branding</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm text-white font-medium">Yellow Theme</p>
                  <p className="text-xs text-slate-500">Switch global accent to Yellow</p>
                </div>
                <button 
                  onClick={handleThemeToggle}
                  disabled={isSaving}
                  className={`w-12 h-6 rounded-full transition-colors relative ${isYellowTheme ? 'bg-amber-500' : 'bg-slate-700'}`}
                >
                  <motion.div 
                    animate={{ x: isYellowTheme ? 26 : 4 }}
                    className="w-4 h-4 bg-white rounded-full absolute top-1"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-white">System Data</h3>
            </div>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Prisma Client v7.3.0 is running with SQLite database. All records are currently synced with local storage.
            </p>
            <Button 
              variant="outline" 
              onClick={handleExport}
              disabled={isExporting}
              className="w-full border-white/10 text-xs text-slate-400 hover:text-white flex items-center justify-center gap-2"
            >
              {isExporting ? (
                <>
                  <div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                  Aggregating Data...
                </>
              ) : (
                'Export Database Snapshot'
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-blue-400" />
                  Change Password
                </h3>
                <button onClick={() => setIsPasswordModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handlePasswordChange} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400 ml-1">Current Password</label>
                  <input 
                    type="password" 
                    required
                    value={passwords.current}
                    onChange={e => setPasswords({...passwords, current: e.target.value})}
                    className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500/50 transition-all font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400 ml-1">New Password</label>
                  <input 
                    type="password" 
                    required
                    value={passwords.new}
                    onChange={e => setPasswords({...passwords, new: e.target.value})}
                    className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500/50 transition-all font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400 ml-1">Confirm New Password</label>
                  <input 
                    type="password" 
                    required
                    value={passwords.confirm}
                    onChange={e => setPasswords({...passwords, confirm: e.target.value})}
                    className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500/50 transition-all font-mono"
                  />
                </div>
                
                <div className="pt-4 flex gap-3">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="flex-1 border-white/10 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-[2] bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20"
                    disabled={isPasswordChanging}
                  >
                    {isPasswordChanging ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Updating...
                      </span>
                    ) : (
                      'Update Password'
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
