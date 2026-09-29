import React from 'react';
import { ArrowDownToLine, Check, Download, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface AppDownloadButtonProps {
  onOpenModal: () => void;
  variant?: 'header' | 'sidebar' | 'banner';
}

export const AppDownloadButton: React.FC<AppDownloadButtonProps> = ({
  onOpenModal,
  variant = 'header',
}) => {
  const { isInstalled, isInstallable, install } = usePWAInstall();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If browser prompt is ready, trigger it directly or open modal
    if (isInstallable) {
      install().then((success) => {
        if (!success) onOpenModal();
      });
    } else {
      onOpenModal();
    }
  };

  if (variant === 'header') {
    return (
      <button
        onClick={handleClick}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer"
        title="Download / Install PharmPrep Pro app on your phone, tablet, or PC"
      >
        {isInstalled ? (
          <>
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span className="hidden sm:inline">Installed</span>
          </>
        ) : (
          <>
            <ArrowDownToLine className="w-3.5 h-3.5 animate-bounce" />
            <span>Download App</span>
          </>
        )}
      </button>
    );
  }

  if (variant === 'sidebar') {
    return (
      <button
        onClick={onOpenModal}
        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-teal-50/80 hover:bg-teal-100/80 border border-teal-200/80 text-teal-950 transition-all text-left shadow-2xs group cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Download className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-xs font-bold text-teal-950 leading-tight">Download App</p>
            <p className="text-[10px] text-teal-700">Install for Offline Study</p>
          </div>
        </div>
        <span className="text-[10px] font-bold bg-teal-200/70 text-teal-900 px-1.5 py-0.5 rounded">
          PWA
        </span>
      </button>
    );
  }

  // Banner variant
  return (
    <div className="p-4 bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 text-white rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center flex-shrink-0 text-teal-300">
          <Smartphone className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Study On The Go with PharmPrep Pro App</h3>
          <p className="text-xs text-teal-100/80">
            Install on your home screen or download offline study packs for zero-internet revision.
          </p>
        </div>
      </div>
      <button
        onClick={onOpenModal}
        className="px-4 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer"
      >
        <ArrowDownToLine className="w-4 h-4" />
        <span>Install / Download App</span>
      </button>
    </div>
  );
};
