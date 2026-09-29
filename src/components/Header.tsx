import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  HelpCircle,
  Menu,
  Moon,
  Search,
  Sparkles,
  Wifi,
  WifiOff,
  Zap,
} from 'lucide-react';
import { ExamType } from '../types/pharmacy';
import { AppDownloadButton } from './AppDownloadButton';

interface HeaderProps {
  currentExam: ExamType;
  onSelectExam: (exam: ExamType) => void;
  examDateStr: string;
  onUpdateExamDate: (date: string) => void;
  streak: number;
  isOffline: boolean;
  onToggleOffline: () => void;
  onOpenQuickQuiz: () => void;
  onOpenNewNote: () => void;
  onOpenDownloadModal: () => void;
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentExam,
  onSelectExam,
  examDateStr,
  onUpdateExamDate,
  streak,
  isOffline,
  onToggleOffline,
  onOpenQuickQuiz,
  onOpenNewNote,
  onOpenDownloadModal,
  onToggleMobileMenu,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Calculate days remaining
  const calculateDaysRemaining = (targetDate: string) => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const daysRemaining = calculateDaysRemaining(examDateStr);

  const examLabels: Record<ExamType, { name: string; full: string; badge: string }> = {
    GPAT: { name: 'GPAT', full: 'Graduate Pharmacy Aptitude Test (NTA/NBEMS)', badge: '125 MCQs · 500 Marks' },
    NIPER_JEE: { name: 'NIPER JEE', full: 'National Inst. of Pharmaceutical Edu. & Research', badge: '200 MCQs · 100 Marks' },
    DRUG_INSPECTOR: { name: 'Drug Inspector', full: 'State PSC & UPSC Drug Inspector Examination', badge: 'D&C Act & QA Focus' },
    PHARMACIST: { name: 'Govt Pharmacist', full: 'ESIC, RRB, AIIMS & State Health Pharmacist', badge: 'Hospital & Dispensing' },
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-600 flex items-center justify-center text-white shadow-sm shadow-teal-700/20 font-bold tracking-tight">
              <span className="text-base">Rx</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">PharmPrep</span>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-1.5 py-0.5 rounded">Pro</span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block leading-none">GPAT · NIPER JEE · Drug Inspector Prep</p>
            </div>
          </div>
        </div>

        {/* Center: Target Exam Selector & Countdown */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Target Exam Dropdown */}
          <div className="relative">
            <select
              value={currentExam}
              onChange={(e) => onSelectExam(e.target.value as ExamType)}
              className="appearance-none bg-slate-100 hover:bg-slate-200/80 text-slate-900 text-xs sm:text-sm font-semibold rounded-lg pl-3 pr-8 py-1.5 border border-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
            >
              <option value="GPAT">🎯 GPAT 2026</option>
              <option value="NIPER_JEE">🔬 NIPER JEE 2026</option>
              <option value="DRUG_INSPECTOR">⚖️ Drug Inspector</option>
              <option value="PHARMACIST">💊 Govt Pharmacist</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Countdown Pill with quick edit */}
          <div className="relative hidden lg:flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-1">
            <Calendar className="w-3.5 h-3.5 text-teal-600" />
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="hover:text-slate-900 font-medium text-left"
              title="Click to change target exam date"
            >
              <span className="font-bold text-slate-900">{daysRemaining}</span> days left
            </button>

            {showDatePicker && (
              <div className="absolute top-full right-0 mt-2 p-3 bg-white rounded-xl shadow-xl border border-slate-200 z-50 w-64">
                <p className="text-xs font-semibold text-slate-900 mb-1">Set Target Exam Date</p>
                <p className="text-[11px] text-slate-500 mb-2">Countdown will adapt your study plan pacing.</p>
                <input
                  type="date"
                  value={examDateStr}
                  onChange={(e) => {
                    onUpdateExamDate(e.target.value);
                    setShowDatePicker(false);
                  }}
                  className="w-full text-xs p-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            )}
          </div>

          {/* Daily Streak */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 bg-amber-50/80 border border-amber-200/70 rounded-lg text-amber-900 text-xs font-bold"
            title="Daily Study & Quiz Streak"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{streak}</span>
            <span className="hidden sm:inline font-normal text-amber-700">Days</span>
          </div>
        </div>

        {/* Right: Offline Mode Toggle & Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Offline Learning Toggle */}
          <button
            onClick={onToggleOffline}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border transition-all ${
              isOffline
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title={isOffline ? 'Offline Mode Active: Content cached locally' : 'Click to enable Offline Access Mode for studying on the go'}
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold text-emerald-700">Offline Active</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Offline Ready</span>
              </>
            )}
          </button>

          {/* Download App CTA Button */}
          <AppDownloadButton onOpenModal={onOpenDownloadModal} variant="header" />

          {/* Quick Note CTA */}
          <button
            onClick={onOpenNewNote}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <span>+ Note</span>
          </button>

          {/* Quick Quiz CTA */}
          <button
            onClick={onOpenQuickQuiz}
            className="flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white hover:bg-teal-700 rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Daily Quiz</span>
          </button>
        </div>
      </div>
    </header>
  );
};
