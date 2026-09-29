import React, { useState } from 'react';
import {
  AlertCircle,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  GraduationCap,
  Play,
  RotateCcw,
  Sparkles,
  Timer,
  TrendingUp,
} from 'lucide-react';
import { MOCK_TESTS } from '../data/pharmacyData';
import { ExamType, MockTest, TestResult } from '../types/pharmacy';

interface MockTestViewProps {
  currentExam: ExamType;
  onLaunchMock: (testId: string) => void;
  pastResults: TestResult[];
}

export const MockTestView: React.FC<MockTestViewProps> = ({
  currentExam,
  onLaunchMock,
  pastResults,
}) => {
  const [filterType, setFilterType] = useState<'All' | 'Full' | 'PYQ' | 'Subject'>('All');
  const [selectedExamFilter, setSelectedExamFilter] = useState<string>('All');

  // Filter tests
  const filteredTests = MOCK_TESTS.filter((test) => {
    if (selectedExamFilter !== 'All' && test.examType !== selectedExamFilter) return false;
    if (filterType === 'Full' && test.isPYQ) return false;
    if (filterType === 'PYQ' && !test.isPYQ) return false;
    if (filterType === 'Subject' && !test.title.toLowerCase().includes('subject')) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 mb-1">
            <span>Official Computer Based Test (CBT) Environment</span>
            <span>·</span>
            <span>Negative Marking Active</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Mock Tests & Exam Simulators
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Simulate the exact NTA GPAT (+4, -1) and NIPER JEE (+0.5, -0.125) computer-based interfaces with real question palettes and detailed post-exam AIR predictions.
          </p>
        </div>

        {/* Quick summary of taken tests */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3 rounded-xl">
          <div className="text-center px-2">
            <p className="text-[10px] uppercase font-bold text-slate-400">Attempted</p>
            <p className="text-lg font-bold text-slate-900">{pastResults.length}</p>
          </div>
          <div className="h-8 w-[1px] bg-slate-200" />
          <div className="text-center px-2">
            <p className="text-[10px] uppercase font-bold text-slate-400">Available</p>
            <p className="text-lg font-bold text-teal-700">{MOCK_TESTS.length}</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => setFilterType('All')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterType === 'All' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Tests ({MOCK_TESTS.length})
          </button>
          <button
            onClick={() => setFilterType('Full')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterType === 'Full' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Grand Mocks
          </button>
          <button
            onClick={() => setFilterType('PYQ')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterType === 'PYQ' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Previous Year Papers (PYQ)
          </button>
          <button
            onClick={() => setFilterType('Subject')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterType === 'Subject' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Subject Drills
          </button>
        </div>

        {/* Exam Type Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Exam:</span>
          <select
            value={selectedExamFilter}
            onChange={(e) => setSelectedExamFilter(e.target.value)}
            className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-none"
          >
            <option value="All">All Exams</option>
            <option value="GPAT">GPAT</option>
            <option value="NIPER_JEE">NIPER JEE</option>
            <option value="DRUG_INSPECTOR">Drug Inspector</option>
          </select>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTests.map((test) => {
          // Check if this test was already attempted
          const pastAttempt = pastResults.find((r) => r.testId === test.id);

          return (
            <div
              key={test.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-teal-400 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                      {test.examType.replace('_', ' ')}
                    </span>
                    {test.isPYQ && (
                      <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        PYQ {test.year}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{test.durationMinutes} mins</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  {test.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                  {test.description}
                </p>

                {/* Test specs pill */}
                <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center text-xs mb-4">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Questions</p>
                    <p className="font-extrabold text-slate-900">{test.questions.length}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Max Marks</p>
                    <p className="font-extrabold text-slate-900">{test.totalMarks}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Marking</p>
                    <p className="font-bold text-emerald-700">+{test.positiveMarks} / -{test.negativeMarks}</p>
                  </div>
                </div>

                {/* Past Attempt Badge if available */}
                {pastAttempt && (
                  <div className="p-2.5 bg-teal-50/70 border border-teal-200/60 rounded-xl text-xs flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5 text-teal-900 font-medium">
                      <CheckCircle className="w-4 h-4 text-teal-600" />
                      <span>Last Score: <strong>{pastAttempt.score} / {pastAttempt.maxScore}</strong></span>
                    </div>
                    <span className="text-[11px] font-bold text-teal-700">{pastAttempt.accuracy}% Accuracy</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={() => onLaunchMock(test.id)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{pastAttempt ? 'Retake Exam Simulation' : 'Start Official CBT Simulation'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
