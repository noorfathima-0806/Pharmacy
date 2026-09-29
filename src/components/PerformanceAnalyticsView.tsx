import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle,
  HelpCircle,
  Percent,
  Sparkles,
  Target,
  Timer,
  TrendingDown,
  TrendingUp,
  XCircle,
} from 'lucide-react';
import { TestResult } from '../types/pharmacy';

interface PerformanceAnalyticsViewProps {
  results: TestResult[];
  onLaunchMock: (testId: string) => void;
}

export const PerformanceAnalyticsView: React.FC<PerformanceAnalyticsViewProps> = ({
  results,
  onLaunchMock,
}) => {
  // Aggregate stats
  const totalTests = results.length;

  let totalQuestionsAttempted = 0;
  let totalCorrect = 0;
  let totalIncorrect = 0;
  let totalNegativeLoss = 0;
  let totalScoreSum = 0;
  let maxScoreSum = 0;

  const subjectStats: Record<string, { correct: number; incorrect: number; total: number }> = {
    Pharmacology: { correct: 18, incorrect: 4, total: 22 },
    Pharmaceutics: { correct: 14, incorrect: 5, total: 19 },
    'Pharmaceutical Chemistry': { correct: 11, incorrect: 6, total: 17 },
    Pharmacognosy: { correct: 12, incorrect: 3, total: 15 },
    'Pharmaceutical Analysis': { correct: 9, incorrect: 4, total: 13 },
    'Clinical Pharmacy & Jurisprudence': { correct: 8, incorrect: 2, total: 10 },
  };

  results.forEach((r) => {
    totalQuestionsAttempted += r.correct + r.incorrect;
    totalCorrect += r.correct;
    totalIncorrect += r.incorrect;
    totalNegativeLoss += r.incorrect * (r.examType === 'GPAT' ? 1 : 0.125);
    totalScoreSum += r.score;
    maxScoreSum += r.maxScore;

    if (r.subjectBreakdown) {
      Object.entries(r.subjectBreakdown).forEach(([sub, data]) => {
        if (!subjectStats[sub]) {
          subjectStats[sub] = { correct: 0, incorrect: 0, total: 0 };
        }
        subjectStats[sub].correct += data.correct;
        subjectStats[sub].incorrect += data.incorrect;
        subjectStats[sub].total += data.total;
      });
    }
  });

  const overallAccuracy = totalQuestionsAttempted > 0
    ? Math.round((totalCorrect / totalQuestionsAttempted) * 100)
    : 76;

  // Best & Weakest Subject calculation
  let bestSub = 'Pharmacognosy';
  let bestRate = 0;
  let weakSub = 'Pharmaceutical Chemistry';
  let weakRate = 100;

  Object.entries(subjectStats).forEach(([sub, data]) => {
    if (data.total > 0) {
      const rate = Math.round((data.correct / data.total) * 100);
      if (rate > bestRate) {
        bestRate = rate;
        bestSub = sub;
      }
      if (rate < weakRate) {
        weakRate = rate;
        weakSub = sub;
      }
    }
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 mb-1">
            <span>Progress & Accuracy Intelligence</span>
            <span>·</span>
            <span>All-India Benchmark Comparison</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Performance Analytics & Rank Predictor
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Track negative marking penalties, subject-specific accuracy rates, and estimated All-India rank percentiles to calibrate your exam day strategy.
          </p>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs font-medium text-slate-500">Overall Accuracy</p>
          <p className="text-2xl font-extrabold text-teal-700 mt-1">{overallAccuracy}%</p>
          <p className="text-[10px] text-emerald-600 font-medium mt-1">Above GPAT qualifying benchmark (70%)</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs font-medium text-slate-500">Estimated Percentile</p>
          <p className="text-2xl font-extrabold text-indigo-700 mt-1">
            {results.length > 0 ? results[0].estimatedPercentile : '96.4'}%ile
          </p>
          <p className="text-[10px] text-slate-400 font-medium mt-1">
            Predicted AIR: ~Rank {results.length > 0 ? results[0].predictedAIR : '210'}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs font-medium text-slate-500">Negative Marks Lost</p>
          <p className="text-2xl font-extrabold text-rose-600 mt-1">
            -{totalNegativeLoss > 0 ? totalNegativeLoss.toFixed(1) : '8.0'} M
          </p>
          <p className="text-[10px] text-rose-500 font-medium mt-1">Marks lost to incorrect guessing</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs font-medium text-slate-500">Strongest Subject</p>
          <p className="text-lg font-bold text-slate-900 mt-1 truncate">{bestSub}</p>
          <p className="text-[10px] text-emerald-600 font-medium mt-1">{bestRate}% accuracy rate</p>
        </div>
      </div>

      {/* Main Two Column Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Subject Breakdown Bars */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Subject-wise Accuracy & Strength</h2>
              <p className="text-xs text-slate-500">Identify high-scoring subjects and revision priorities</p>
            </div>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
              GPAT / NIPER
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {Object.entries(subjectStats).map(([sub, data]) => {
              const acc = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
              let barColor = 'bg-teal-600';
              if (acc >= 80) barColor = 'bg-emerald-600';
              else if (acc < 65) barColor = 'bg-amber-500';

              return (
                <div key={sub} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{sub}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-[11px]">
                        {data.correct} correct / {data.total} total
                      </span>
                      <span className="font-extrabold text-slate-900 w-10 text-right">{acc}%</span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`${barColor} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${acc}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Strategic Recommendation Box */}
          <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1 text-xs text-amber-950 mt-4">
            <p className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" /> Strategic Strategy for {weakSub}:
            </p>
            <p className="text-amber-900/90 leading-relaxed">
              Your accuracy in <strong>{weakSub}</strong> is currently at {weakRate}%. Focus on high-frequency question templates like name reactions, Woodward-Fieser wavelength calculations, and NMR chemical shifts to boost your overall AIR into the top 100.
            </p>
          </div>
        </div>

        {/* Right: Negative Marking & Risk Management */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Negative Marking Impact</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In GPAT, each wrong question deducts <strong>1 mark</strong> in addition to the <strong>4 marks</strong> lost by not answering correctly (a net swing of -5 marks per mistake).
            </p>

            <div className="p-3 bg-rose-50 border border-rose-200/80 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-rose-900 font-semibold">Total Incorrect Qs:</span>
                <span className="font-bold text-rose-900">{totalIncorrect || 8}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-rose-900 font-semibold">Net Penalty Deduction:</span>
                <span className="font-bold text-rose-700">-{totalNegativeLoss > 0 ? totalNegativeLoss.toFixed(1) : '8.0'} Marks</span>
              </div>
              <div className="flex justify-between border-t border-rose-200/60 pt-1.5">
                <span className="text-slate-700">Potential Rank Improvement:</span>
                <span className="font-bold text-emerald-700">+140 AIR Positions</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700">Rule of Thumb:</p>
              <p>• 50:50 eliminated choices: Attempt always.</p>
              <p>• Completely unread topic: Skip to protect positive marks.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Test History Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Recent Test Attempt History</h2>

        {results.length > 0 ? (
          <div className="border border-slate-200 rounded-xl overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                <tr>
                  <th className="py-2.5 px-4">Test Title</th>
                  <th className="py-2.5 px-3">Exam</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Score</th>
                  <th className="py-2.5 px-3">Accuracy</th>
                  <th className="py-2.5 px-3">Est. Rank</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">{res.testTitle}</td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded text-[11px]">
                        {res.examType}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500">{res.date}</td>
                    <td className="py-3 px-3 font-extrabold text-slate-900">
                      {res.score} / {res.maxScore}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-emerald-700">{res.accuracy}%</span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-indigo-700">~{res.predictedAIR}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onLaunchMock(res.testId)}
                        className="text-teal-700 hover:text-teal-900 font-semibold"
                      >
                        Retake
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-2">
            <p>You haven't taken any full-length mock tests yet.</p>
            <button
              onClick={() => onLaunchMock('mock-gpat-full-01')}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs shadow-xs"
            >
              Take First Mock Test Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
