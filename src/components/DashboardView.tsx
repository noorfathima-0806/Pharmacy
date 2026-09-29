import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  BookMarked,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileEdit,
  Flame,
  GraduationCap,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { ExamType, MockTest, PharmacyUpdate, StudyPlanDay, TestResult, UserCustomNote } from '../types/pharmacy';
import { AppDownloadButton } from './AppDownloadButton';
import { NavTab } from './Sidebar';

interface DashboardViewProps {
  currentExam: ExamType;
  examDateStr: string;
  onNavigate: (tab: NavTab) => void;
  onStartDailyQuiz: () => void;
  onStartMock: (mockId: string) => void;
  streak: number;
  studyPlan: StudyPlanDay[];
  onTogglePlanTask: (dayId: string, topicId: string) => void;
  recentResults: TestResult[];
  userNotes: UserCustomNote[];
  updates: PharmacyUpdate[];
  onOpenNewNote: () => void;
  onOpenStudyNote: (noteId: string) => void;
  onOpenDownloadModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentExam,
  examDateStr,
  onNavigate,
  onStartDailyQuiz,
  onStartMock,
  streak,
  studyPlan,
  onTogglePlanTask,
  recentResults,
  userNotes,
  updates,
  onOpenNewNote,
  onOpenStudyNote,
  onOpenDownloadModal,
}) => {
  const calculateDaysRemaining = (targetDate: string) => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const daysLeft = calculateDaysRemaining(examDateStr);

  // Overall performance stats
  const totalTests = recentResults.length;
  const avgAccuracy = totalTests > 0
    ? Math.round(recentResults.reduce((acc, r) => acc + r.accuracy, 0) / totalTests)
    : 78;
  const totalQuestionsSolved = totalTests > 0
    ? recentResults.reduce((acc, r) => acc + r.totalQuestions, 0)
    : 45;

  // Today's study plan topics
  const todayPlan = studyPlan[0] || null;
  const completedTodayCount = todayPlan?.topics.filter((t) => t.completed).length || 0;
  const totalTodayCount = todayPlan?.topics.length || 0;
  const planProgressPct = totalTodayCount > 0 ? Math.round((completedTodayCount / totalTodayCount) * 100) : 0;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* 1. Hero Countdown & Status Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 shadow-sm">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>Targeting {currentExam.replace('_', ' ')} 2026</span>
              <span aria-hidden="true">·</span>
              <span>All-India Pharmacy Exam Track</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Accelerate Your Pharmacy Entrance Rank
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Solve NTA-pattern mock tests, revise high-yield pharmacotherapy and pharmaceutics tables, and capture your personal flash notes.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onStartDailyQuiz}
                className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Solve Today's Daily Quiz</span>
              </button>
              <button
                onClick={() => onNavigate('mock-tests')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
              >
                <Timer className="w-4 h-4 text-teal-300" />
                <span>Open CBT Mock Simulator</span>
              </button>
            </div>
          </div>

          {/* Exam Countdown Box */}
          <div className="flex flex-col sm:flex-row md:flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 text-center min-w-[200px]">
            <div className="text-3xl sm:text-4xl font-extrabold text-teal-300 tracking-tight">
              {daysLeft}
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-200 mt-1">Days Remaining</p>
            <p className="text-[11px] text-slate-400 mt-1">Target Date: {examDateStr}</p>
            <div className="w-full bg-white/20 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-teal-400 h-full rounded-full" style={{ width: `${Math.min(100, Math.max(10, 100 - daysLeft / 3))}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Overall Accuracy</p>
            <p className="text-lg sm:text-xl font-bold text-slate-900">{avgAccuracy}%</p>
            <p className="text-[10px] text-teal-600 font-medium">GPAT Cutoff Benchmark</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Daily Study Streak</p>
            <p className="text-lg sm:text-xl font-bold text-slate-900">{streak} Days</p>
            <p className="text-[10px] text-amber-700 font-medium">Active Consistency</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Questions Solved</p>
            <p className="text-lg sm:text-xl font-bold text-slate-900">{totalQuestionsSolved}</p>
            <p className="text-[10px] text-indigo-600 font-medium">{totalTests} Mock Sessions</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <FileEdit className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Personal Notes</p>
            <p className="text-lg sm:text-xl font-bold text-slate-900">{userNotes.length}</p>
            <p className="text-[10px] text-emerald-600 font-medium">Offline Cached</p>
          </div>
        </div>
      </div>

      {/* App Download Callout Banner */}
      <AppDownloadButton onOpenModal={onOpenDownloadModal} variant="banner" />

      {/* 3. Main Dashboard Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols wide on desktop): Quick Quizzes & Tests & Plan */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Daily Challenge Banner Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                  <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Today's High-Yield Daily Quiz</h2>
                  <p className="text-[11px] text-slate-500">Pharmacology & Pharmaceutics Mix · 10 Questions · +4 / -1 Marking</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                10 mins
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Test your grasp on ANS receptor cascades, paracetamol toxic kinetics, tablet defects, and Woodward-Fieser wavelength calculations.
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                <span>Earn +40 marks towards today's target</span>
              </div>
              <button
                onClick={onStartDailyQuiz}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Start Quiz Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Today's Personalized Study Planner Checklist */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-600" />
                <h2 className="text-sm font-bold text-slate-900">Today's Study Checklist</h2>
              </div>
              <button
                onClick={() => onNavigate('study-planner')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-0.5"
              >
                <span>Full Planner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span>Progress: {completedTodayCount} of {totalTodayCount} topics completed</span>
                <span className="font-bold text-teal-700">{planProgressPct}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-teal-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${planProgressPct}%` }}
                />
              </div>
            </div>

            {/* Checklist */}
            {todayPlan && todayPlan.topics.length > 0 ? (
              <div className="space-y-2">
                {todayPlan.topics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => onTogglePlanTask(todayPlan.id, topic.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      topic.completed
                        ? 'bg-slate-50 border-slate-200/80 text-slate-400 line-through'
                        : 'bg-white border-slate-200 hover:border-teal-300 text-slate-800 shadow-2xs'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={topic.completed}
                      onChange={() => {}} // handled by parent onClick
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 font-medium">
                        <span className="truncate">{topic.title}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                        <span>{topic.subject}</span>
                        <span aria-hidden="true">·</span>
                        <span>{topic.estimatedMinutes} min</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">No scheduled tasks for today. Add one from Study Planner.</p>
            )}
          </div>

          {/* Quick Mock Tests Grid */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Recommended Exam Simulations</h2>
                <p className="text-xs text-slate-500">Official pattern CBT tests with timer and question palette</p>
              </div>
              <button
                onClick={() => onNavigate('mock-tests')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-0.5"
              >
                <span>View All (6)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span>NTA GPAT Pattern</span>
                    <span>180 mins · 500 M</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 mb-1">All-India Grand Mock Test - 01</h3>
                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    Comprehensive full test with +4 and -1 marking covering all 5 core subjects.
                  </p>
                </div>
                <button
                  onClick={() => onStartMock('mock-gpat-full-01')}
                  className="mt-3 w-full py-1.5 px-3 bg-white border border-slate-300 hover:bg-slate-900 hover:text-white hover:border-slate-900 text-slate-800 rounded-lg text-xs font-semibold transition-all text-center"
                >
                  Launch CBT Test
                </button>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span>NIPER JEE Pattern</span>
                    <span>120 mins · 100 M</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 mb-1">NIPER JEE Master Mock - 01</h3>
                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    High-speed test focused on stereochemistry, mechanisms, natural products & aptitude.
                  </p>
                </div>
                <button
                  onClick={() => onStartMock('mock-niper-full-01')}
                  className="mt-3 w-full py-1.5 px-3 bg-white border border-slate-300 hover:bg-slate-900 hover:text-white hover:border-slate-900 text-slate-800 rounded-lg text-xs font-semibold transition-all text-center"
                >
                  Launch CBT Test
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-Yield Notes & Updates & Personal Notes */}
        <div className="space-y-6">
          {/* Quick Note Taking Box */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200/80 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileEdit className="w-4 h-4 text-teal-700" />
                <h3 className="text-xs font-bold text-teal-900">On-The-Go Study Notes</h3>
              </div>
              <button
                onClick={onOpenNewNote}
                className="text-xs font-bold text-teal-800 hover:text-teal-950 underline underline-offset-2"
              >
                + Create
              </button>
            </div>
            <p className="text-xs text-teal-800/80 mb-3">
              Capture mnemonics, reaction shortcuts, and test mistakes. Seamlessly synced for offline revisions.
            </p>

            <div className="space-y-2">
              {userNotes.slice(0, 2).map((note) => (
                <div
                  key={note.id}
                  onClick={() => onNavigate('my-notes')}
                  className="p-2.5 bg-white/90 hover:bg-white rounded-xl border border-teal-200/60 cursor-pointer shadow-2xs transition-all"
                >
                  <p className="text-xs font-bold text-slate-900 truncate">{note.title}</p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                    <span>{note.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span>{note.tags.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('my-notes')}
              className="mt-3 w-full py-1.5 text-center text-xs font-semibold text-teal-800 hover:text-teal-950"
            >
              Open Pharmacy Notebook ({userNotes.length} notes) →
            </button>
          </div>

          {/* High Yield Pharmacy Guide Highlight */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal-600" />
                <h3 className="text-xs font-bold text-slate-900">High-Yield Revision Notes</h3>
              </div>
              <button
                onClick={() => onNavigate('study-notes')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800"
              >
                Library →
              </button>
            </div>

            <div className="space-y-2.5">
              <div
                onClick={() => onOpenStudyNote('note-ans-receptors')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/20 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-0.5">
                  <span className="font-semibold text-teal-700">Pharmacology</span>
                  <span>8 min read</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                  ANS Receptor Subtypes, G-Proteins & Second Messengers
                </h4>
              </div>

              <div
                onClick={() => onOpenStudyNote('note-tablet-defects')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/20 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-0.5">
                  <span className="font-semibold text-teal-700">Pharmaceutics</span>
                  <span>10 min read</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                  Tablet Defects: Capping, Lamination, Picking & Mottling
                </h4>
              </div>

              <div
                onClick={() => onOpenStudyNote('note-pharma-schedules')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/20 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-0.5">
                  <span className="font-semibold text-teal-700">Jurisprudence</span>
                  <span>12 min read</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                  Drugs & Cosmetics Rules Schedules A to Z Master Table
                </h4>
              </div>
            </div>
          </div>

          {/* New Topics & Regulatory Updates mini ticker */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-bold text-slate-900">Pharma Updates & Alerts</h3>
              </div>
              <button
                onClick={() => onNavigate('updates')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800"
              >
                All →
              </button>
            </div>

            <div className="space-y-3">
              {updates.slice(0, 2).map((item) => (
                <div key={item.id} className="text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <span className="font-semibold text-slate-700">{item.tag}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.date}</span>
                  </div>
                  <p className="font-semibold text-slate-900 hover:text-teal-700 cursor-pointer" onClick={() => onNavigate('updates')}>
                    {item.title}
                  </p>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
