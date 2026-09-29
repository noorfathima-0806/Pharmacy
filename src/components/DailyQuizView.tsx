import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  FileEdit,
  Flame,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
  XCircle,
  Zap,
} from 'lucide-react';
import { HIGH_YIELD_QUESTIONS } from '../data/pharmacyData';
import { Question } from '../types/pharmacy';

interface DailyQuizViewProps {
  onBackToDashboard: () => void;
  onIncrementStreak: () => void;
  onSaveToPersonalNotes: (title: string, subject: string, content: string) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (questionId: string) => void;
}

export const DailyQuizView: React.FC<DailyQuizViewProps> = ({
  onBackToDashboard,
  onIncrementStreak,
  onSaveToPersonalNotes,
  bookmarkedIds,
  onToggleBookmark,
}) => {
  // Use first 10 questions as today's daily quiz set
  const questions: Question[] = HIGH_YIELD_QUESTIONS.slice(0, 10);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isInstantMode, setIsInstantMode] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [noteSaveToast, setNoteSaveToast] = useState<string | null>(null);

  const currentQ = questions[currentIndex];
  const isSelected = selectedAnswers[currentQ.id] !== undefined;
  const userAnswer = selectedAnswers[currentQ.id];
  const isBookmarked = bookmarkedIds.includes(currentQ.id);

  const handleSelectOption = (index: number) => {
    if (selectedAnswers[currentQ.id] !== undefined && isInstantMode) return; // already answered in instant mode
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: index,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const finishQuiz = () => {
    setIsCompleted(true);
    onIncrementStreak();
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  const handleSaveToNotes = (q: Question) => {
    const title = `Key Takeaway: ${q.topic} (${q.subject})`;
    const content = `### Question Concept: ${q.topic}\n**Question:** ${q.question}\n\n**Correct Answer:** ${q.options[q.correctOption]}\n\n**Rationale:** ${q.explanation}\n\n${q.highYieldTip ? `**High-Yield Exam Tip:** ${q.highYieldTip}\n` : ''}${q.referenceFormula ? `**Formula:** \`${q.referenceFormula}\`\n` : ''}`;
    onSaveToPersonalNotes(title, q.subject, content);
    setNoteSaveToast(`Saved to My Notes!`);
    setTimeout(() => setNoteSaveToast(null), 3000);
  };

  // Score calculations (+4 for correct, -1 for incorrect)
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  questions.forEach((q) => {
    const ans = selectedAnswers[q.id];
    if (ans === undefined) {
      unattemptedCount++;
    } else if (ans === q.correctOption) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const totalScore = correctCount * 4 - incorrectCount * 1;
  const maxScore = questions.length * 4;
  const accuracyPct = correctCount + incorrectCount > 0
    ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Toast Notification */}
      {noteSaveToast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 z-50 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{noteSaveToast}</span>
        </div>
      )}

      {/* Top Header & Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Instant Mode Toggle */}
          <button
            onClick={() => setIsInstantMode(!isInstantMode)}
            className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
              isInstantMode
                ? 'bg-teal-50 border-teal-200 text-teal-800 font-semibold'
                : 'bg-white border-slate-200 text-slate-600'
            }`}
            title="Instant Explanation Mode reveals the solution immediately upon picking an option"
          >
            Instant Solution: <span className="font-bold">{isInstantMode ? 'ON' : 'OFF'}</span>
          </button>

          <span className="text-xs font-bold text-slate-500">
            {Object.keys(selectedAnswers).length}/{questions.length} Answered
          </span>
        </div>
      </div>

      {!isCompleted ? (
        /* Active Quiz Question Card */
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          {/* Question Top Bar */}
          <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="font-bold text-slate-900">Question {currentIndex + 1} of {questions.length}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-teal-700">{currentQ.subject}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">{currentQ.topic}</span>
            </div>

            <div className="flex items-center gap-2">
              {currentQ.examSource && (
                <span className="text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                  {currentQ.examSource}
                </span>
              )}
              <button
                onClick={() => onToggleBookmark(currentQ.id)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isBookmarked
                    ? 'bg-amber-50 border-amber-300 text-amber-600'
                    : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
                }`}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark this high-yield question'}
              >
                {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-amber-500" /> : <Bookmark className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="p-6 space-y-6">
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </p>

            {/* Reference Formula if available */}
            {currentQ.referenceFormula && (
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 flex items-center gap-2">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Formula:</span>
                <span>{currentQ.referenceFormula}</span>
              </div>
            )}

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isThisSelected = userAnswer === idx;
                const isCorrect = currentQ.correctOption === idx;
                const showInstantResult = isInstantMode && isSelected;

                let optionStyles = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';
                let indicator = (
                  <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs font-semibold text-slate-500">
                    {String.fromCharCode(65 + idx)}
                  </span>
                );

                if (showInstantResult) {
                  if (isCorrect) {
                    optionStyles = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-semibold shadow-xs';
                    indicator = (
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    );
                  } else if (isThisSelected) {
                    optionStyles = 'border-rose-400 bg-rose-50/70 text-rose-950 font-semibold';
                    indicator = (
                      <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold">
                        <X className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    );
                  }
                } else if (isThisSelected) {
                  optionStyles = 'border-teal-600 bg-teal-50/60 text-teal-950 font-semibold ring-1 ring-teal-600';
                  indicator = (
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  );
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border flex items-center gap-3 transition-all ${optionStyles}`}
                  >
                    {indicator}
                    <span className="text-sm flex-1">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Instant Solution / Explanation Box */}
            {isInstantMode && isSelected && (
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Detailed Solution & Rationale</span>
                  </div>
                  <button
                    onClick={() => handleSaveToNotes(currentQ)}
                    className="flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-2xs hover:bg-slate-50 transition-all"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                    <span>Save to My Notes</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {currentQ.explanation}
                </p>

                {currentQ.highYieldTip && (
                  <div className="p-2.5 bg-amber-50/70 border border-amber-200/60 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                    <span className="font-bold uppercase tracking-wider text-[10px] bg-amber-200/60 text-amber-900 px-1 py-0.5 rounded">
                      High-Yield Tip
                    </span>
                    <span className="flex-1">{currentQ.highYieldTip}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Question Bottom Action Bar */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 border transition-all ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {/* Quick question indicator dots */}
            <div className="hidden sm:flex items-center gap-1.5">
              {questions.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-6 h-6 rounded-full text-[10px] font-bold transition-all ${
                    currentIndex === i
                      ? 'bg-slate-900 text-white ring-2 ring-slate-900/20'
                      : selectedAnswers[q.id] !== undefined
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-xs flex items-center gap-1.5 transition-all"
            >
              <span>{currentIndex === questions.length - 1 ? 'Finish & Submit' : 'Next Question'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Quiz Complete / Score Summary Card */
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto shadow-xs">
              <Trophy className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Daily Quiz Completed!
            </h2>
            <p className="text-xs text-slate-500">
              High-yield practice record saved · Study streak updated 🔥
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
              <p className="text-[11px] font-medium text-slate-500">Score Earned</p>
              <p className="text-xl font-extrabold text-teal-700">{totalScore} / {maxScore}</p>
              <p className="text-[10px] text-slate-400">+4 / -1 Marking</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
              <p className="text-[11px] font-medium text-slate-500">Accuracy</p>
              <p className="text-xl font-extrabold text-slate-900">{accuracyPct}%</p>
              <p className="text-[10px] text-emerald-600">GPAT Benchmark</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
              <p className="text-[11px] font-medium text-slate-500">Correct / Wrong</p>
              <p className="text-xl font-extrabold text-slate-900">
                <span className="text-emerald-600">{correctCount}</span> / <span className="text-rose-600">{incorrectCount}</span>
              </p>
              <p className="text-[10px] text-slate-400">{unattemptedCount} Skipped</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
              <p className="text-[11px] font-medium text-slate-500">Negative Loss</p>
              <p className="text-xl font-extrabold text-rose-600">-{incorrectCount} M</p>
              <p className="text-[10px] text-rose-500">Marks Lost</p>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Review All Solutions</h3>

            <div className="space-y-3">
              {questions.map((q, idx) => {
                const userChoice = selectedAnswers[q.id];
                const isCorrect = userChoice === q.correctOption;
                const isSkipped = userChoice === undefined;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                      isCorrect
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : isSkipped
                        ? 'border-slate-200 bg-slate-50/40'
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
                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> +4 Marks
                          </span>
                        ) : isSkipped ? (
                          <span className="text-slate-400 font-semibold">Unattempted (0 M)</span>
                        ) : (
                          <span className="text-rose-600 font-bold flex items-center gap-1">
                            <X className="w-3.5 h-3.5" /> -1 Mark
                          </span>
                        )}
                        <button
                          onClick={() => handleSaveToNotes(q)}
                          className="text-teal-700 hover:text-teal-900 underline text-[11px] font-semibold"
                        >
                          + Save Note
                        </button>
                      </div>
                    </div>

                    <p className="font-bold text-slate-900">{q.question}</p>

                    <div className="text-[11px] space-y-1">
                      <p>
                        <span className="text-slate-500">Correct Answer:</span>{' '}
                        <span className="font-bold text-emerald-800">{q.options[q.correctOption]}</span>
                      </p>
                      {!isCorrect && !isSkipped && (
                        <p>
                          <span className="text-slate-500">Your Answer:</span>{' '}
                          <span className="font-semibold text-rose-700">{q.options[userChoice]}</span>
                        </p>
                      )}
                    </div>

                    <p className="text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/80 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Daily Quiz</span>
            </button>
            <button
              onClick={onBackToDashboard}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
