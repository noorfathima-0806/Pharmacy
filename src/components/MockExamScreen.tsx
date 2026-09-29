import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileEdit,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
  XCircle,
} from 'lucide-react';
import { ExamType, MockTest, PharmacySubject, Question, QuestionStatus, TestResult } from '../types/pharmacy';

interface MockExamScreenProps {
  mockTest: MockTest;
  onExit: () => void;
  onSaveResult: (result: TestResult) => void;
  onSaveToPersonalNotes: (title: string, subject: string, content: string) => void;
}

export const MockExamScreen: React.FC<MockExamScreenProps> = ({
  mockTest,
  onExit,
  onSaveResult,
  onSaveToPersonalNotes,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [questionStatuses, setQuestionStatuses] = useState<Record<string, QuestionStatus>>({});
  const [selectedSection, setSelectedSection] = useState<string>('All');
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(mockTest.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [noteSaveToast, setNoteSaveToast] = useState<string | null>(null);

  const questions = mockTest.questions;
  const currentQ = questions[currentQuestionIndex];

  // Distinct subjects in this mock
  const subjects = Array.from(new Set(questions.map((q) => q.subject)));

  // Countdown timer
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  // Set initial status to 'not_answered' when visiting a question for first time
  useEffect(() => {
    if (!questionStatuses[currentQ.id]) {
      setQuestionStatuses((prev) => ({
        ...prev,
        [currentQ.id]: 'not_answered',
      }));
    }
  }, [currentQuestionIndex, currentQ.id]);

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (idx: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: idx,
    }));
  };

  const handleClearResponse = () => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQ.id]: 'not_answered',
    }));
  };

  const handleSaveAndNext = () => {
    const hasAnswer = userAnswers[currentQ.id] !== undefined;
    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQ.id]: hasAnswer ? 'answered' : 'not_answered',
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleMarkForReviewAndNext = () => {
    const hasAnswer = userAnswers[currentQ.id] !== undefined;
    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQ.id]: hasAnswer ? 'answered_marked_for_review' : 'marked_for_review',
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Submit test and generate score card
  const handleSubmitTest = () => {
    setShowConfirmModal(false);
    setIsSubmitted(true);

    const timeSpent = mockTest.durationMinutes * 60 - timeLeftSeconds;

    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    let markedCount = 0;

    const subjectBreakdown: Record<string, { correct: number; incorrect: number; total: number; score: number }> = {};

    questions.forEach((q) => {
      if (!subjectBreakdown[q.subject]) {
        subjectBreakdown[q.subject] = { correct: 0, incorrect: 0, total: 0, score: 0 };
      }
      subjectBreakdown[q.subject].total++;

      const userPick = userAnswers[q.id];
      const st = questionStatuses[q.id];
      if (st === 'marked_for_review' || st === 'answered_marked_for_review') {
        markedCount++;
      }

      if (userPick === undefined) {
        unattempted++;
      } else if (userPick === q.correctOption) {
        correct++;
        subjectBreakdown[q.subject].correct++;
        subjectBreakdown[q.subject].score += mockTest.positiveMarks;
      } else {
        incorrect++;
        subjectBreakdown[q.subject].incorrect++;
        subjectBreakdown[q.subject].score -= mockTest.negativeMarks;
      }
    });

    const totalRawScore = +(correct * mockTest.positiveMarks - incorrect * mockTest.negativeMarks).toFixed(2);
    const attempted = correct + incorrect;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

    // Realistic percentile estimation algorithm for GPAT/NIPER
    const scoreFraction = Math.max(0, totalRawScore / mockTest.totalMarks);
    const estimatedPercentile = +(Math.min(99.98, Math.max(50.0, scoreFraction * 40 + 60))).toFixed(2);
    const predictedAIR = Math.max(1, Math.round((100 - estimatedPercentile) * 550 + 1));

    const result: TestResult = {
      id: 'res-' + Date.now(),
      testId: mockTest.id,
      testTitle: mockTest.title,
      examType: mockTest.examType,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      score: totalRawScore,
      maxScore: mockTest.totalMarks,
      accuracy,
      totalQuestions: questions.length,
      correct,
      incorrect,
      unattempted,
      markedForReview: markedCount,
      timeSpentSeconds: timeSpent,
      userAnswers,
      questionStatuses,
      subjectBreakdown,
      estimatedPercentile,
      predictedAIR,
    };

    setTestResult(result);
    onSaveResult(result);
  };

  const handleSaveNote = (q: Question) => {
    const title = `Mock Review: ${q.topic} (${q.subject})`;
    const content = `### Test Question Concept: ${q.topic}\n**Question:** ${q.question}\n\n**Correct Answer:** ${q.options[q.correctOption]}\n\n**Detailed Explanation:** ${q.explanation}\n\n${q.highYieldTip ? `**Tip:** ${q.highYieldTip}\n` : ''}${q.referenceFormula ? `**Formula:** \`${q.referenceFormula}\`\n` : ''}`;
    onSaveToPersonalNotes(title, q.subject, content);
    setNoteSaveToast(`Saved to My Notes!`);
    setTimeout(() => setNoteSaveToast(null), 3000);
  };

  // Status counts for palette
  const answeredCount = Object.values(questionStatuses).filter((s) => s === 'answered').length;
  const notAnsweredCount = Object.values(questionStatuses).filter((s) => s === 'not_answered').length;
  const markedReviewCount = Object.values(questionStatuses).filter((s) => s === 'marked_for_review').length;
  const ansMarkedCount = Object.values(questionStatuses).filter((s) => s === 'answered_marked_for_review').length;
  const notVisitedCount = questions.length - (answeredCount + notAnsweredCount + markedReviewCount + ansMarkedCount);

  // Status button style helper for palette
  const getPaletteStyle = (idx: number, qId: string) => {
    const st = questionStatuses[qId] || 'not_visited';
    const isCurrent = idx === currentQuestionIndex;

    const base = 'w-8 h-8 text-xs font-bold rounded-lg transition-all flex items-center justify-center relative ';
    const ring = isCurrent ? 'ring-2 ring-slate-900 ring-offset-1 ' : '';

    switch (st) {
      case 'answered':
        return base + ring + 'bg-emerald-600 text-white';
      case 'not_answered':
        return base + ring + 'bg-rose-500 text-white';
      case 'marked_for_review':
        return base + ring + 'bg-purple-600 text-white';
      case 'answered_marked_for_review':
        return base + ring + 'bg-purple-700 text-white after:content-[""] after:w-2 after:h-2 after:bg-emerald-400 after:rounded-full after:absolute after:top-0.5 after:right-0.5';
      default:
        return base + ring + 'bg-slate-200 text-slate-700 hover:bg-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 flex flex-col overflow-hidden">
      {/* Toast Notification */}
      {noteSaveToast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 z-50 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{noteSaveToast}</span>
        </div>
      )}

      {/* CBT Top Bar */}
      <header className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
            title="Exit Mock Exam"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold tracking-wider bg-teal-600 text-white px-1.5 py-0.5 rounded">
                NTA CBT SIMULATOR
              </span>
              <span className="font-bold text-xs sm:text-sm text-slate-100 truncate max-w-xs sm:max-w-md">
                {mockTest.title}
              </span>
            </div>
          </div>
        </div>

        {/* Timer & Submit button */}
        <div className="flex items-center gap-3 sm:gap-4">
          {!isSubmitted && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs sm:text-sm font-mono font-bold ${
                timeLeftSeconds < 600
                  ? 'bg-rose-950 text-rose-300 border-rose-800 animate-pulse'
                  : 'bg-slate-800 text-teal-300 border-slate-700'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTimer(timeLeftSeconds)}</span>
            </div>
          )}

          {!isSubmitted ? (
            <button
              onClick={() => setShowConfirmModal(true)}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-xs transition-colors"
            >
              Submit Exam
            </button>
          ) : (
            <button
              onClick={onExit}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg"
            >
              Close Exam
            </button>
          )}
        </div>
      </header>

      {/* Main Examination Screen or Result Screen */}
      {!isSubmitted ? (
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left: Question Area (takes 75% on desktop) */}
          <div className="flex-1 flex flex-col justify-between bg-white border-r border-slate-200 overflow-y-auto">
            {/* Subject / Section Selector Tabs */}
            <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Sections:</span>
              <button
                onClick={() => setSelectedSection('All')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                  selectedSection === 'All' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                All Sections ({questions.length})
              </button>
              {subjects.map((sub) => {
                const count = questions.filter((q) => q.subject === sub).length;
                return (
                  <button
                    key={sub}
                    onClick={() => setSelectedSection(sub)}
                    className={`px-3 py-1 rounded-md font-semibold whitespace-nowrap transition-colors ${
                      selectedSection === sub ? 'bg-teal-700 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {sub} ({count})
                  </button>
                );
              })}
            </div>

            {/* Question Card Content */}
            <div className="p-6 sm:p-8 space-y-6 flex-1">
              {/* Question metadata */}
              <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900">Question {currentQuestionIndex + 1}</span>
                  <span aria-hidden="true" className="text-slate-300">|</span>
                  <span className="font-semibold text-teal-700">{currentQ.subject}</span>
                  <span aria-hidden="true" className="text-slate-300">|</span>
                  <span className="text-slate-500">{currentQ.topic}</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Marks: <span className="text-emerald-600 font-bold">+{mockTest.positiveMarks}</span> / <span className="text-rose-500 font-bold">-{mockTest.negativeMarks}</span>
                </div>
              </div>

              {/* Question statement */}
              <div className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentQ.question}
              </div>

              {currentQ.referenceFormula && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-700">
                  <span className="text-slate-400 uppercase text-[10px] font-bold">Reference Formula: </span>
                  {currentQ.referenceFormula}
                </div>
              )}

              {/* Options Radio List */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((option, idx) => {
                  const isChecked = userAnswers[currentQ.id] === idx;
                  return (
                    <label
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`flex items-start gap-3.5 p-4 rounded-xl border text-sm cursor-pointer transition-all ${
                        isChecked
                          ? 'border-teal-600 bg-teal-50/50 text-slate-950 font-semibold shadow-xs ring-1 ring-teal-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${currentQ.id}`}
                        checked={isChecked}
                        onChange={() => handleSelectOption(idx)}
                        className="mt-0.5 text-teal-600 focus:ring-teal-500 cursor-pointer"
                      />
                      <span className="w-5 text-xs font-bold text-slate-400">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <span className="flex-1">{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions Bar (NTA Pattern) */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMarkForReviewAndNext}
                  className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-lg font-bold transition-colors"
                >
                  Mark for Review & Next
                </button>
                <button
                  onClick={handleClearResponse}
                  className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg font-medium transition-colors"
                >
                  Clear Response
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-lg font-semibold disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  onClick={handleSaveAndNext}
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold shadow-xs transition-colors"
                >
                  Save & Next
                </button>
              </div>
            </div>
          </div>

          {/* Right: Question Palette (takes 25% on desktop) */}
          <div className="w-full md:w-80 bg-slate-50 border-l border-slate-200 flex flex-col justify-between overflow-y-auto p-4 space-y-4">
            {/* Candidate Box */}
            <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                Rx
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">Candidate Examination</p>
                <p className="text-[11px] text-slate-500">{mockTest.examType} Aspirant</p>
              </div>
            </div>

            {/* Legend */}
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-[11px] space-y-2">
              <p className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Question Status Legend</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-emerald-600 text-white font-bold flex items-center justify-center text-[9px]">{answeredCount}</span>
                  <span className="text-slate-600">Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-rose-500 text-white font-bold flex items-center justify-center text-[9px]">{notAnsweredCount}</span>
                  <span className="text-slate-600">Not Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-[9px]">{notVisitedCount}</span>
                  <span className="text-slate-600">Not Visited</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-purple-600 text-white font-bold flex items-center justify-center text-[9px]">{markedReviewCount}</span>
                  <span className="text-slate-600">Marked for Review</span>
                </div>
              </div>
            </div>

            {/* Question Palette Matrix */}
            <div className="bg-white border border-slate-200 rounded-xl p-3 flex-1">
              <p className="font-bold text-slate-800 text-xs mb-3">Choose a Question:</p>
              <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  if (selectedSection !== 'All' && q.subject !== selectedSection) return null;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={getPaletteStyle(idx, q.id)}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Submit CTA */}
            <button
              onClick={() => setShowConfirmModal(true)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Submit Test & View Analysis
            </button>
          </div>
        </div>
      ) : (
        /* Results & In-Depth Analytics Screen */
        testResult && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-5xl mx-auto w-full space-y-6">
            {/* Top Score Banner */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 mb-1">
                    <span>Performance Report</span>
                    <span>·</span>
                    <span>{mockTest.examType} Official Pattern</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {mockTest.title}
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">Submitted on {testResult.date}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center p-3 bg-teal-50 border border-teal-200/80 rounded-xl min-w-[120px]">
                    <p className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider">Score</p>
                    <p className="text-2xl font-extrabold text-teal-900">
                      {testResult.score} <span className="text-sm font-normal text-teal-700">/ {testResult.maxScore}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 Performance Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <p className="text-[11px] font-medium text-slate-500">Predicted Percentile</p>
                  <p className="text-xl font-extrabold text-indigo-700">{testResult.estimatedPercentile}%ile</p>
                  <p className="text-[10px] text-slate-400">All India Norm</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <p className="text-[11px] font-medium text-slate-500">Estimated AIR</p>
                  <p className="text-xl font-extrabold text-emerald-700">~ Rank {testResult.predictedAIR}</p>
                  <p className="text-[10px] text-emerald-600">Based on 50k cohort</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <p className="text-[11px] font-medium text-slate-500">Test Accuracy</p>
                  <p className="text-xl font-extrabold text-slate-900">{testResult.accuracy}%</p>
                  <p className="text-[10px] text-slate-400">{testResult.correct} Right / {testResult.incorrect} Wrong</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <p className="text-[11px] font-medium text-slate-500">Negative Loss</p>
                  <p className="text-xl font-extrabold text-rose-600">
                    -{(testResult.incorrect * mockTest.negativeMarks).toFixed(1)} M
                  </p>
                  <p className="text-[10px] text-rose-500">Penalty marks deducted</p>
                </div>
              </div>

              {/* Subject Breakdown Table */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-slate-900">Subject-wise Mastery Breakdown</h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                      <tr>
                        <th className="py-2.5 px-4">Subject</th>
                        <th className="py-2.5 px-3">Total Qs</th>
                        <th className="py-2.5 px-3 text-emerald-700">Correct</th>
                        <th className="py-2.5 px-3 text-rose-600">Incorrect</th>
                        <th className="py-2.5 px-3 text-right">Net Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {Object.entries(testResult.subjectBreakdown).map(([subject, data]) => (
                        <tr key={subject} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-4 font-semibold text-slate-900">{subject}</td>
                          <td className="py-2.5 px-3 text-slate-600">{data.total}</td>
                          <td className="py-2.5 px-3 text-emerald-700 font-bold">{data.correct}</td>
                          <td className="py-2.5 px-3 text-rose-600 font-bold">{data.incorrect}</td>
                          <td className="py-2.5 px-3 text-right font-extrabold text-slate-900">{data.score.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Question by Question Comprehensive Review */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Step-by-Step Question Review</h3>
                  <span className="text-xs text-slate-500">Click "+ Save to Notes" to capture doubts</span>
                </div>

                <div className="space-y-3">
                  {questions.map((q, idx) => {
                    const pick = testResult.userAnswers[q.id];
                    const isRight = pick === q.correctOption;
                    const isSkipped = pick === undefined;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl border text-xs space-y-2.5 ${
                          isRight
                            ? 'border-emerald-200 bg-emerald-50/20'
                            : isSkipped
                            ? 'border-slate-200 bg-slate-50/30'
                            : 'border-rose-200 bg-rose-50/20'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">Q{idx + 1}.</span>
                            <span className="font-semibold text-teal-700">{q.subject}</span>
                            <span>·</span>
                            <span>{q.topic}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            {isRight ? (
                              <span className="text-emerald-700 font-bold flex items-center gap-1">
                                <Check className="w-3.5 h-3.5 stroke-[3]" /> +{mockTest.positiveMarks} M
                              </span>
                            ) : isSkipped ? (
                              <span className="text-slate-400 font-medium">Unattempted (0 M)</span>
                            ) : (
                              <span className="text-rose-600 font-bold flex items-center gap-1">
                                <X className="w-3.5 h-3.5 stroke-[3]" /> -{mockTest.negativeMarks} M
                              </span>
                            )}
                            <button
                              onClick={() => handleSaveNote(q)}
                              className="text-teal-700 hover:text-teal-900 underline text-[11px] font-semibold flex items-center gap-1"
                            >
                              <FileEdit className="w-3 h-3" />
                              <span>+ Note</span>
                            </button>
                          </div>
                        </div>

                        <p className="font-bold text-slate-900 text-sm">{q.question}</p>

                        <div className="space-y-1 text-xs">
                          <p>
                            <span className="text-slate-500 font-medium">Correct Option: </span>
                            <span className="font-bold text-emerald-800">{q.options[q.correctOption]}</span>
                          </p>
                          {!isRight && !isSkipped && (
                            <p>
                              <span className="text-slate-500 font-medium">Your Pick: </span>
                              <span className="font-semibold text-rose-700">{q.options[pick]}</span>
                            </p>
                          )}
                        </div>

                        <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-700 leading-relaxed text-xs">
                          <p className="font-semibold text-slate-900 mb-1">Official Solution:</p>
                          <p>{q.explanation}</p>
                          {q.highYieldTip && (
                            <p className="mt-2 text-amber-800 bg-amber-50 p-1.5 rounded font-medium">
                              💡 <strong>Key Takeaway:</strong> {q.highYieldTip}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom buttons */}
              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  onClick={onExit}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Back to Mock Catalog
                </button>
              </div>
            </div>
          </div>
        )
      )}

      {/* Confirmation Modal before Final Submit */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Confirm Exam Submission</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to finish the exam? You cannot change responses after submission.
            </p>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Questions:</span>
                <span className="font-bold text-slate-900">{questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700">Answered:</span>
                <span className="font-bold text-emerald-700">{Object.keys(userAnswers).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Unanswered / Skipped:</span>
                <span className="font-bold text-slate-700">{questions.length - Object.keys(userAnswers).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700">Marked for Review:</span>
                <span className="font-bold text-purple-700">{markedReviewCount + ansMarkedCount}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Resume Exam
              </button>
              <button
                onClick={handleSubmitTest}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
