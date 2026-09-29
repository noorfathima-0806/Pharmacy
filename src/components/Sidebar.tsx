import React from 'react';
import {
  BarChart3,
  Bell,
  BookMarked,
  BookOpen,
  Calendar,
  CheckCircle,
  FileEdit,
  GraduationCap,
  HardDriveDownload,
  HelpCircle,
  Layers,
  Sparkles,
  Timer,
  Zap,
} from 'lucide-react';
import { ExamType } from '../types/pharmacy';

export type NavTab =
  | 'dashboard'
  | 'daily-quiz'
  | 'mock-tests'
  | 'study-notes'
  | 'pyq-papers'
  | 'my-notes'
  | 'flashcards'
  | 'study-planner'
  | 'analytics'
  | 'updates';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentExam: ExamType;
  userNotesCount: number;
  uncompletedPlanTasks: number;
  onOpenOfflineModal: () => void;
  isOffline: boolean;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  currentExam,
  userNotesCount,
  uncompletedPlanTasks,
  onOpenOfflineModal,
  isOffline,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string | number; accent?: string }[] = [
    { id: 'dashboard', label: 'Overview', icon: Layers },
    { id: 'daily-quiz', label: 'Daily Quiz', icon: Zap, badge: 'New', accent: 'text-amber-500' },
    { id: 'mock-tests', label: 'Mock Test Simulator', icon: Timer, badge: 'CBT' },
    { id: 'study-notes', label: 'Comprehensive Notes', icon: BookOpen },
    { id: 'pyq-papers', label: 'Previous Papers (PYQ)', icon: GraduationCap, badge: '2020-24' },
    { id: 'my-notes', label: 'My Notes & Editor', icon: FileEdit, badge: userNotesCount > 0 ? userNotesCount : undefined },
    { id: 'flashcards', label: 'Rapid Flashcards', icon: BookMarked },
    { id: 'study-planner', label: 'Study Planner', icon: Calendar, badge: uncompletedPlanTasks > 0 ? `${uncompletedPlanTasks} left` : undefined },
    { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 },
    { id: 'updates', label: 'New Topics & Alerts', icon: Bell, badge: 'IP 2024' },
  ];

  const handleSelect = (tab: NavTab) => {
    onSelectTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 md:top-[57px] left-0 h-full md:h-[calc(100vh-57px)] w-64 bg-white border-r border-slate-200 z-50 md:z-20 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top: Navigation list */}
        <div className="py-4 px-3 overflow-y-auto flex-1">
          {/* Active Exam context kicker */}
          <div className="mb-4 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Exam Target</p>
            <p className="text-xs font-bold text-teal-900 truncate">
              {currentExam === 'GPAT' && 'Graduate Pharmacy Aptitude Test'}
              {currentExam === 'NIPER_JEE' && 'NIPER JEE M.S. / M.Pharm'}
              {currentExam === 'DRUG_INSPECTOR' && 'Drug Inspector PSC / CDSCO'}
              {currentExam === 'PHARMACIST' && 'Central & State Pharmacist'}
            </p>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-teal-600 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 transition-colors ${
                        isActive ? 'text-white' : item.accent || 'text-slate-400 group-hover:text-slate-700'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-bold tracking-tight ${
                        isActive
                          ? 'bg-teal-700 text-teal-100'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Offline Storage & Sync Info */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/50">
          <button
            onClick={onOpenOfflineModal}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm text-left transition-all group"
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-emerald-500 animate-pulse' : 'bg-teal-500'}`} />
              <div>
                <p className="text-[11px] font-semibold text-slate-800 flex items-center gap-1">
                  Offline Learning
                </p>
                <p className="text-[10px] text-slate-500">
                  {isOffline ? 'Local storage active' : 'Full storage synced'}
                </p>
              </div>
            </div>
            <HardDriveDownload className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 transition-colors" />
          </button>
        </div>
      </aside>
    </>
  );
};
