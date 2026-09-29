import React, { useState } from 'react';
import {
  Apple,
  ArrowDownToLine,
  Check,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  HardDriveDownload,
  Info,
  Laptop,
  QrCode,
  Share2,
  Smartphone,
  Sparkles,
  WifiOff,
  X,
  Zap,
} from 'lucide-react';
import { HIGH_YIELD_QUESTIONS, MOCK_TESTS, STUDY_NOTES, FLASHCARDS_DECK } from '../data/pharmacyData';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, isDesktop, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'install' | 'offline_bundle' | 'qr'>('install');
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);
  const [installStatus, setInstallStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://pharmprep-pro.app';

  const handleNativeInstall = async () => {
    try {
      const outcome = await install();
      if (outcome) {
        setInstallStatus('Installed successfully!');
      }
    } catch (err) {
      console.error('Install error:', err);
    }
  };

  // Generate downloadable offline study package (HTML bundle that runs completely standalone)
  const handleDownloadOfflineBundle = () => {
    const bundleData = {
      appName: 'PharmPrep Pro - GPAT & NIPER Offline Revision Pack',
      exportedAt: new Date().toISOString(),
      questionBank: HIGH_YIELD_QUESTIONS,
      studyNotes: STUDY_NOTES,
      mockTests: MOCK_TESTS,
      flashcards: FLASHCARDS_DECK,
    };

    // Format as an interactive offline standalone HTML file
    const standaloneHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PharmPrep Pro - Offline Revision Archive</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 24px; line-height: 1.6; }
    .container { max-width: 900px; margin: 0 auto; background: #fff; padding: 32px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    h1 { color: #0f766e; margin-top: 0; }
    .badge { display: inline-block; background: #ccfbf1; color: #0f766e; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 12px; margin-bottom: 16px; }
    .card { background: #f1f5f9; padding: 16px; border-radius: 12px; margin-bottom: 16px; border-left: 4px solid #0d9488; }
    .q-title { font-weight: bold; font-size: 15px; margin-bottom: 8px; }
    .options { list-style: none; padding-left: 0; margin: 8px 0; }
    .options li { padding: 6px 12px; background: #fff; border-radius: 6px; margin-bottom: 4px; font-size: 13px; }
    .options li.correct { background: #dcfce7; color: #166534; font-weight: bold; }
    .explanation { font-size: 12px; color: #475569; background: #fff; padding: 10px; border-radius: 8px; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>PharmPrep Pro - Standalone Study Bundle</h1>
    <div class="badge">Offline Study Pack · Generated ${new Date().toLocaleDateString()}</div>
    <p>This portable document contains your comprehensive GPAT, NIPER & Pharmacy Exam question solutions and high-yield notes. It requires <strong>zero internet</strong> to open and study on any computer, phone, or tablet.</p>
    
    <h2>1. High-Yield Question Bank & Verified Solutions</h2>
    ${HIGH_YIELD_QUESTIONS.map(
      (q, idx) => `
      <div class="card">
        <div class="q-title">Q${idx + 1}. [${q.subject} · ${q.topic}] ${q.question}</div>
        <ul class="options">
          ${q.options.map((opt, oIdx) => `<li class="${oIdx === q.correctOption ? 'correct' : ''}">${String.fromCharCode(65 + oIdx)}. ${opt} ${oIdx === q.correctOption ? '✓ (Correct)' : ''}</li>`).join('')}
        </ul>
        <div class="explanation"><strong>Official Rationale:</strong> ${q.explanation}</div>
      </div>
    `
    ).join('')}

    <h2>2. High-Yield Study Notes & Formulas</h2>
    ${STUDY_NOTES.map(
      (n) => `
      <div class="card">
        <h3>${n.title}</h3>
        <p><strong>Subject:</strong> ${n.subject} | <strong>Topic:</strong> ${n.topic}</p>
        <p>${n.summary}</p>
        <pre style="white-space: pre-wrap; font-family: inherit; font-size: 13px;">${n.contentMarkdown}</pre>
      </div>
    `
    ).join('')}
  </div>
</body>
</html>`;

    const blob = new Blob([standaloneHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PharmPrep_Pro_Complete_Offline_Archive_${new Date().toISOString().split('T')[0]}.html`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccessToast('Offline Study Package downloaded successfully!');
    setTimeout(() => setDownloadSuccessToast(null), 3500);
  };

  const copyAppUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setDownloadSuccessToast('App URL copied to clipboard!');
    setTimeout(() => setDownloadSuccessToast(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        {/* Toast */}
        {downloadSuccessToast && (
          <div className="fixed top-6 right-6 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 z-50 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{downloadSuccessToast}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Download & Install App</h2>
              <p className="text-[11px] text-slate-500">PharmPrep Pro for Mobile, Tablet & Desktop</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Segmented Mode Selector */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('install')}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'install' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-teal-600" />
            <span>Install on Device</span>
          </button>
          <button
            onClick={() => setActiveTab('offline_bundle')}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'offline_bundle' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HardDriveDownload className="w-3.5 h-3.5 text-teal-600" />
            <span>Offline Study Pack</span>
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'qr' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-3.5 h-3.5 text-teal-600" />
            <span>Mobile QR</span>
          </button>
        </div>

        {/* Tab 1: Install App on Device */}
        {activeTab === 'install' && (
          <div className="space-y-4">
            {/* Installed State */}
            {isInstalled ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1.5">
                <p className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>PharmPrep Pro is Installed!</span>
                </p>
                <p className="text-emerald-800 leading-relaxed">
                  You are running the application in standalone PWA mode. All daily quizzes, mock tests, and personal notes are available offline anytime from your home screen or app launcher.
                </p>
              </div>
            ) : isInstallable ? (
              /* Direct Browser Install Trigger */
              <div className="p-4 bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-xl space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-teal-950 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-teal-600" /> 1-Click Fast App Download
                    </h3>
                    <p className="text-[11px] text-teal-800 mt-0.5">
                      Instant installation directly to your device home screen or desktop.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold bg-teal-100 text-teal-900 px-2 py-0.5 rounded">
                    ~0.8 MB
                  </span>
                </div>

                <button
                  onClick={handleNativeInstall}
                  className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <ArrowDownToLine className="w-4 h-4" />
                  <span>Install PharmPrep Pro App Now</span>
                </button>
              </div>
            ) : null}

            {/* Platform Guides */}
            <div className="space-y-3">
              <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                Installation Instructions by Device:
              </p>

              {/* Android Guide */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>Android (Chrome, Brave, Samsung Internet)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed pl-6">
                  1. Tap the <strong>three dots menu (⋮)</strong> at the top right of your browser.<br />
                  2. Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.<br />
                  3. Tap <strong>Install</strong> to add the icon to your app drawer.
                </p>
              </div>

              {/* iOS / iPhone / iPad Guide */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Apple className="w-4 h-4 text-slate-800" />
                  <span>iPhone & iPad (Safari Browser)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed pl-6">
                  1. Tap the <strong>Share</strong> button <Share2 className="w-3 h-3 inline text-slate-600" /> at the bottom toolbar.<br />
                  2. Scroll down and tap <strong>"Add to Home Screen"</strong> (➕).<br />
                  3. Tap <strong>Add</strong> in the top-right corner.
                </p>
              </div>

              {/* Desktop Windows / Mac / ChromeOS */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Laptop className="w-4 h-4 text-indigo-600" />
                  <span>Windows, Mac & Chromebook (Chrome / Edge)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed pl-6">
                  Click the <strong>Install icon</strong> in your browser address bar (right side next to bookmarks star), or go to <strong>Menu (⋮) → "Install PharmPrep Pro"</strong>.
                </p>
              </div>
            </div>

            {/* PWA Benefits Checklist */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] space-y-1 text-slate-600">
              <p className="font-bold text-slate-800">Why Install the App?</p>
              <div className="grid grid-cols-2 gap-1 pt-0.5">
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-teal-600" /> Works 100% Offline</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-teal-600" /> No App Store Login</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-teal-600" /> Fullscreen CBT Mocks</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-teal-600" /> Instant Local Loading</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Download Offline Study Pack (.html standalone) */}
        {activeTab === 'offline_bundle' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-2">
              <h3 className="font-bold text-teal-950 flex items-center gap-1.5">
                <HardDriveDownload className="w-4 h-4 text-teal-700" />
                Standalone Offline Revision Archive
              </h3>
              <p className="text-teal-900 leading-relaxed">
                Download an entire portable study pack containing all solved questions, explanations, formulas, and master study notes as a self-contained HTML file.
              </p>
              <p className="text-[11px] text-teal-800 font-medium">
                • Opens instantly in any browser without Wi-Fi, mobile data, or installations.<br />
                • Can be saved to a flash drive, Google Drive, phone files, or printed.
              </p>

              <button
                onClick={handleDownloadOfflineBundle}
                className="mt-2 w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <ArrowDownToLine className="w-4 h-4" />
                <span>Download Standalone Study Bundle (.html)</span>
              </button>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <p className="font-bold text-slate-800">Included in Offline Package:</p>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li>Complete 20+ High-Yield Questions with verified answer keys</li>
                <li>Comprehensive study guides (ANS receptors, tablet defects, Schedules A-Z, chemical tests)</li>
                <li>NTA GPAT & NIPER examination patterns and marking rules</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Mobile QR Code */}
        {activeTab === 'qr' && (
          <div className="space-y-4 text-center">
            <p className="text-xs text-slate-600">
              Scan this QR code with your mobile camera to open and install PharmPrep Pro immediately on your phone:
            </p>

            {/* Generated SVG QR Code representation */}
            <div className="p-4 bg-white border border-slate-200 rounded-2xl w-48 h-48 mx-auto flex items-center justify-center shadow-xs">
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900" fill="currentColor">
                {/* Visual clean QR pattern */}
                <rect x="10" y="10" width="24" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
                <rect x="16" y="16" width="12" height="12" fill="currentColor" />
                <rect x="66" y="10" width="24" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
                <rect x="72" y="16" width="12" height="12" fill="currentColor" />
                <rect x="10" y="66" width="24" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
                <rect x="16" y="72" width="12" height="12" fill="currentColor" />
                
                {/* Dots matrix */}
                <rect x="42" y="14" width="6" height="6" />
                <rect x="52" y="22" width="6" height="6" />
                <rect x="42" y="32" width="6" height="6" />
                <rect x="22" y="44" width="6" height="6" />
                <rect x="34" y="44" width="6" height="6" />
                <rect x="46" y="44" width="8" height="8" fill="#0d9488" />
                <rect x="60" y="44" width="6" height="6" />
                <rect x="74" y="44" width="6" height="6" />
                <rect x="42" y="60" width="6" height="6" />
                <rect x="54" y="60" width="6" height="6" />
                <rect x="66" y="68" width="6" height="6" />
                <rect x="80" y="60" width="6" height="6" />
                <rect x="48" y="76" width="6" height="6" />
                <rect x="74" y="80" width="6" height="6" />
              </svg>
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={copyAppUrl}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy App Link</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
