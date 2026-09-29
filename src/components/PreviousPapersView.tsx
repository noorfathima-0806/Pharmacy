import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Download,
  FileEdit,
  GraduationCap,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { HIGH_YIELD_QUESTIONS, MOCK_TESTS } from '../data/pharmacyData';
import { ExamType, MockTest, Question } from '../types/pharmacy';

interface PreviousPapersViewProps {
  onLaunchMock: (testId: string) => void;
  onSaveToPersonalNotes: (title: string, subject: string, content: string) => void;
}

export const PreviousPapersView: React.FC<PreviousPapersViewProps> = ({
  onLaunchMock,
  onSaveToPersonalNotes,
}) => {
  const [selectedExam, setSelectedExam] = useState<'All' | 'GPAT' | 'NIPER_JEE'>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [browsePaper, setBrowsePaper] = useState<MockTest | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter PYQ mock tests
  const pyqPapers = MOCK_TESTS.filter((t) => t.isPYQ);

  const filteredPapers = pyqPapers.filter((p) => {
    if (selectedExam !== 'All' && p.examType !== selectedExam) return false;
    if (selectedYear !== 'All' && p.year?.toString() !== selectedYear) return false;
    return true;
  });

  const handleSaveQuestion = (q: Question) => {
    const title = `PYQ (${q.examSource || 'Official'}): ${q.topic}`;
    const content = `### Previous Year Question: ${q.examSource}\n**Topic:** ${q.topic} (${q.subject})\n\n**Question:** ${q.question}\n\n**Correct Option:** ${q.options[q.correctOption]}\n\n**Detailed Rationale:** ${q.explanation}\n\n${q.highYieldTip ? `**Tip:** ${q.highYieldTip}\n` : ''}`;
    onSaveToPersonalNotes(title, q.subject, content);
    setToastMessage(`Saved question to My Notes!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 z-50 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 mb-1">
            <span>Verified Official Solved Papers</span>
            <span>·</span>
            <span>NTA & NIPER Answer Keys</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Previous Year Question Papers (PYQ)
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Analyze repeat trends, high-yield question templates, and authentic NTA marking standards. Attempt as timed mock exams or explore answers with full rationales.
          </p>
        </div>
      </div>

      {browsePaper ? (
        /* Detailed browse paper mode */
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <button
              onClick={() => setBrowsePaper(null)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Papers Catalog</span>
            </button>

            <button
              onClick={() => onLaunchMock(browsePaper.id)}
              className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Solve in Timed CBT Mode</span>
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">{browsePaper.examType}</span>
              <span>·</span>
              <span>Year {browsePaper.year}</span>
              <span>·</span>
              <span>{browsePaper.questions.length} Solved Questions</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{browsePaper.title}</h2>
            <p className="text-xs text-slate-500 mt-1">{browsePaper.description}</p>
          </div>

          {/* Questions list with solutions */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            {browsePaper.questions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 text-xs">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">Q{idx + 1}.</span>
                    <span className="font-semibold text-teal-700">{q.subject}</span>
                    <span>·</span>
                    <span>{q.topic}</span>
                  </div>

                  <button
                    onClick={() => handleSaveQuestion(q)}
                    className="text-teal-700 hover:text-teal-900 underline text-[11px] font-semibold flex items-center gap-1"
                  >
                    <FileEdit className="w-3 h-3" />
                    <span>+ Add to My Notes</span>
                  </button>
                </div>

                <p className="font-bold text-slate-900 text-sm leading-snug">{q.question}</p>

                {/* Options display with correct highlighted */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = optIdx === q.correctOption;
                    return (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 ${
                          isCorrect
                            ? 'bg-emerald-50 border-emerald-300 font-semibold text-emerald-950'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="w-5 text-slate-400 font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                        <span className="flex-1">{opt}</span>
                        {isCorrect && <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="p-3 bg-white border border-slate-200 rounded-lg text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">Official Rationale:</p>
                  <p className="leading-relaxed">{q.explanation}</p>
                  {q.highYieldTip && (
                    <p className="text-amber-800 bg-amber-50 p-1.5 rounded text-[11px] font-medium mt-1">
                      💡 {q.highYieldTip}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Papers grid */
        <>
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setSelectedExam('All')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedExam === 'All' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                All Papers
              </button>
              <button
                onClick={() => setSelectedExam('GPAT')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedExam === 'GPAT' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                GPAT Official
              </button>
              <button
                onClick={() => setSelectedExam('NIPER_JEE')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedExam === 'NIPER_JEE' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                NIPER JEE
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-none"
              >
                <option value="All">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPapers.map((paper) => (
              <div
                key={paper.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-teal-400 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                      {paper.examType}
                    </span>
                    <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                      Year {paper.year}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1.5">
                    {paper.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {paper.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center text-xs mb-4">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Questions</p>
                      <p className="font-extrabold text-slate-900">{paper.questions.length}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Duration</p>
                      <p className="font-extrabold text-slate-900">{paper.durationMinutes}m</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Total Marks</p>
                      <p className="font-extrabold text-teal-700">{paper.totalMarks}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => setBrowsePaper(paper)}
                    className="py-2 px-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-semibold text-center transition-colors"
                  >
                    Browse Solutions
                  </button>
                  <button
                    onClick={() => onLaunchMock(paper.id)}
                    className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Timed CBT Test</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
