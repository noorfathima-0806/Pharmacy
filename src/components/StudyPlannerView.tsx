import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  Flame,
  GraduationCap,
  Plus,
  Sparkles,
  Target,
  Trash2,
} from 'lucide-react';
import { ExamType, PharmacySubject, StudyPlanDay } from '../types/pharmacy';

interface StudyPlannerViewProps {
  currentExam: ExamType;
  examDateStr: string;
  onUpdateExamDate: (date: string) => void;
  studyPlan: StudyPlanDay[];
  onToggleTopic: (dayId: string, topicId: string) => void;
  onAddTopic: (dayId: string, topic: { subject: PharmacySubject; title: string; estimatedMinutes: number; examType: ExamType }) => void;
}

export const StudyPlannerView: React.FC<StudyPlannerViewProps> = ({
  currentExam,
  examDateStr,
  onUpdateExamDate,
  studyPlan,
  onToggleTopic,
  onAddTopic,
}) => {
  const [selectedDayId, setSelectedDayId] = useState<string>(studyPlan[0]?.id || '');
  const [showAddModal, setShowAddModal] = useState(false);

  // New topic form
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState<PharmacySubject>('Pharmacology');
  const [newMinutes, setNewMinutes] = useState(45);

  const calculateDaysRemaining = (targetDate: string) => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const daysLeft = calculateDaysRemaining(examDateStr);

  // Total topics & completed stats
  let totalTopics = 0;
  let completedTopics = 0;
  let totalMinutesPlanned = 0;
  let completedMinutes = 0;

  studyPlan.forEach((day) => {
    day.topics.forEach((t) => {
      totalTopics++;
      totalMinutesPlanned += t.estimatedMinutes;
      if (t.completed) {
        completedTopics++;
        completedMinutes += t.estimatedMinutes;
      }
    });
  });

  const completionPct = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTopic(selectedDayId || studyPlan[0].id, {
      title: newTitle.trim(),
      subject: newSubject,
      estimatedMinutes: Number(newMinutes) || 45,
      examType: currentExam,
    });

    setNewTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top Banner with Target Date Configurator */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700">
            <Target className="w-4 h-4 text-teal-600" />
            <span>Personalized Syllabus Tracker</span>
            <span>·</span>
            <span>Targeting {currentExam.replace('_', ' ')}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Adaptive Pharmacy Study Planner
          </h1>
          <p className="text-xs text-slate-500 max-w-xl">
            Stay on schedule with day-by-day high-yield subject milestones. Pacing adjusts dynamically according to your target exam date.
          </p>
        </div>

        {/* Date picker countdown box */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-4">
          <div className="text-center pr-3 border-r border-slate-200">
            <p className="text-3xl font-extrabold text-teal-700">{daysLeft}</p>
            <p className="text-[10px] uppercase font-bold text-slate-500">Days Left</p>
          </div>
          <div className="space-y-1 text-xs">
            <label className="font-semibold text-slate-700 block">Exam Date Target</label>
            <input
              type="date"
              value={examDateStr}
              onChange={(e) => onUpdateExamDate(e.target.value)}
              className="p-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Progress & Study Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
          <p className="text-[11px] font-medium text-slate-500">Syllabus Completed</p>
          <p className="text-2xl font-extrabold text-teal-700">{completionPct}%</p>
          <p className="text-[10px] text-slate-400">{completedTopics} of {totalTopics} tasks done</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
          <p className="text-[11px] font-medium text-slate-500">Study Time Invested</p>
          <p className="text-2xl font-extrabold text-slate-900">{(completedMinutes / 60).toFixed(1)} hrs</p>
          <p className="text-[10px] text-emerald-600">Active revision hours</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
          <p className="text-[11px] font-medium text-slate-500">Remaining Hours</p>
          <p className="text-2xl font-extrabold text-slate-900">{((totalMinutesPlanned - completedMinutes) / 60).toFixed(1)} hrs</p>
          <p className="text-[10px] text-slate-400">Planned study load</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
          <p className="text-[11px] font-medium text-slate-500">Recommended Pace</p>
          <p className="text-2xl font-extrabold text-indigo-700">
            {daysLeft > 0 ? (totalMinutesPlanned / 60 / Math.max(1, daysLeft)).toFixed(1) : '2.5'}h/day
          </p>
          <p className="text-[10px] text-indigo-600">To clear syllabus</p>
        </div>
      </div>

      {/* Daily Task Roadmap Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Schedule by Days */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Daily Study Milestones</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Topic</span>
            </button>
          </div>

          <div className="space-y-3">
            {studyPlan.map((day) => {
              const dayCompletedCount = day.topics.filter((t) => t.completed).length;
              const dayTotalCount = day.topics.length;
              const dayPct = dayTotalCount > 0 ? Math.round((dayCompletedCount / dayTotalCount) * 100) : 0;

              return (
                <div
                  key={day.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-teal-600" />
                      <span className="text-xs font-bold text-slate-900">{day.dayLabel}</span>
                    </div>
                    <span className="text-xs font-semibold text-teal-700">
                      {dayCompletedCount}/{dayTotalCount} done ({dayPct}%)
                    </span>
                  </div>

                  {/* Topic items */}
                  <div className="space-y-2">
                    {day.topics.map((topic) => (
                      <div
                        key={topic.id}
                        onClick={() => onToggleTopic(day.id, topic.id)}
                        className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          topic.completed
                            ? 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                            : 'bg-white border-slate-200 hover:border-teal-400 text-slate-800 shadow-2xs'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={topic.completed}
                          onChange={() => {}}
                          className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold">{topic.title}</p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                            <span className="font-medium text-teal-800">{topic.subject}</span>
                            <span>·</span>
                            <span>{topic.estimatedMinutes} mins</span>
                            <span>·</span>
                            <span>{topic.examType}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Master 5-Week Pharmacy Entrance Blueprint */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Compass className="w-4 h-4 text-teal-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Recommended 5-Week GPAT/NIPER Master Blueprint
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Week 1: Pharmacology & ANS</span>
                  <span className="text-[10px] text-teal-700 font-semibold">Weightage ~30%</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  ANS receptors, CVS, autacoids, chemotherapy, antidotes, and receptor second messenger dynamics.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Week 2: Pharmaceutics & NDDS</span>
                  <span className="text-[10px] text-teal-700 font-semibold">Weightage ~25%</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Tablet defects, dissolution (Noyes-Whitney), rheology, suspensions, liposomes, and sterilization.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Week 3: Pharmacognosy & Phytochem</span>
                  <span className="text-[10px] text-teal-700 font-semibold">Weightage ~15%</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Keller-Kiliani, Borntrager, Vitali-Morin tests, alkaloids, glycosides, and microscopic adulterants.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Week 4: Med Chem & Analysis</span>
                  <span className="text-[10px] text-teal-700 font-semibold">Weightage ~20%</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Woodward-Fieser rules, IR frequencies, NMR chemical shifts, heterocycles, and stereochemistry (CIP).
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Week 5: Jurisprudence & Grand Mocks</span>
                  <span className="text-[10px] text-teal-700 font-semibold">Weightage ~10%</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Schedules A to Z, Revised Schedule M (2024), D&C Act penalties, and 3 full-length timed CBT mocks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Custom Topic Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Add Custom Study Topic</h3>

            <form onSubmit={handleCreateTopic} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Topic Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Liposome preparation & stealth PEGylation"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Subject</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value as PharmacySubject)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  >
                    <option value="Pharmacology">Pharmacology</option>
                    <option value="Pharmaceutics">Pharmaceutics</option>
                    <option value="Pharmaceutical Chemistry">Chemistry</option>
                    <option value="Pharmacognosy">Pharmacognosy</option>
                    <option value="Pharmaceutical Analysis">Analysis</option>
                    <option value="Clinical Pharmacy & Jurisprudence">Jurisprudence</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Est. Minutes</label>
                  <input
                    type="number"
                    value={newMinutes}
                    onChange={(e) => setNewMinutes(Number(e.target.value))}
                    min={15}
                    max={240}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Assign to Day</label>
                <select
                  value={selectedDayId}
                  onChange={(e) => setSelectedDayId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                >
                  {studyPlan.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.dayLabel}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-xs"
                >
                  Add Topic to Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
