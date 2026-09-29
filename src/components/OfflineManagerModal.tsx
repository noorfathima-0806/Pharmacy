import React, { useState } from 'react';
import {
  Check,
  CheckCircle2,
  Database,
  DownloadCloud,
  HardDrive,
  RefreshCw,
  Trash2,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react';
import { getLastSyncTime } from '../utils/storage';

interface OfflineManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  userNotesCount: number;
}

export const OfflineManagerModal: React.FC<OfflineManagerModalProps> = ({
  isOpen,
  onClose,
  isOffline,
  onToggleOffline,
  userNotesCount,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const lastSync = getLastSyncTime();

  if (!isOpen) return null;

  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-teal-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Offline Learning & Cache Manager
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Offline Mode Master Toggle */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              {isOffline ? <WifiOff className="w-4 h-4 text-emerald-600" /> : <Wifi className="w-4 h-4 text-teal-600" />}
              <span>Offline Mode: {isOffline ? 'Active' : 'Standby'}</span>
            </p>
            <p className="text-[11px] text-slate-500">
              {isOffline
                ? 'App runs entirely from local cache without web connectivity.'
                : 'Cache is ready. Toggle on to simulate offline subway/commute study.'}
            </p>
          </div>

          <button
            onClick={onToggleOffline}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isOffline
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isOffline ? 'Enabled' : 'Enable'}
          </button>
        </div>

        {/* Cached Content Inventory */}
        <div className="space-y-2 text-xs">
          <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
            Locally Cached Content Packages
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl divide-y divide-slate-100">
            <div className="p-2.5 flex items-center justify-between">
              <span className="text-slate-600">GPAT & NIPER Questions Bank</span>
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> 20 Solved Qs
              </span>
            </div>
            <div className="p-2.5 flex items-center justify-between">
              <span className="text-slate-600">Full CBT Mock Exam Papers</span>
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> 6 Papers
              </span>
            </div>
            <div className="p-2.5 flex items-center justify-between">
              <span className="text-slate-600">High-Yield Subject Study Notes</span>
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> 5 Master Guides
              </span>
            </div>
            <div className="p-2.5 flex items-center justify-between">
              <span className="text-slate-600">My Personal Pharmacy Notes</span>
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> {userNotesCount} Notes
              </span>
            </div>
            <div className="p-2.5 flex items-center justify-between">
              <span className="text-slate-600">Rapid Flashcards & Mnemonics</span>
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> 8 Cards Deck
              </span>
            </div>
          </div>
        </div>

        {/* Cache Storage Size & Last Sync */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Local Storage: <strong>~1.4 MB</strong></span>
          <span>Last Synced: <strong>{lastSync}</strong></span>
        </div>

        {/* Sync Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              if (confirm('Clear local mock test history?')) {
                localStorage.removeItem('pharmprep_test_results');
                window.location.reload();
              }
            }}
            className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset History</span>
          </button>

          <button
            onClick={handleSyncNow}
            disabled={isSyncing}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Synchronizing...' : syncSuccess ? 'Synced!' : 'Sync All Content'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
