import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  Check,
  CheckCircle2,
  HelpCircle,
  RotateCw,
  Sparkles,
  Zap,
} from 'lucide-react';
import { FLASHCARDS_DECK } from '../data/pharmacyData';
import { Flashcard, PharmacySubject } from '../types/pharmacy';

export const FlashcardsView: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  const filteredCards = FLASHCARDS_DECK.filter((c) => {
    if (selectedSubject !== 'All' && c.subject !== selectedSubject) return false;
    return true;
  });

  const currentCard: Flashcard | undefined = filteredCards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleToggleMastered = (id: string) => {
    if (masteredIds.includes(id)) {
      setMasteredIds((prev) => prev.filter((i) => i !== id));
    } else {
      setMasteredIds((prev) => [...prev, id]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 mb-1">
            <span>Rapid Memory Recall Deck</span>
            <span>·</span>
            <span>High-Yield Active Revision</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Pharmacy High-Yield Flashcards
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Ideal for quick transit & on-the-go reviews. Master essential antidotes, heterocyclic rings, USP dissolution apparatus, and Noyes-Whitney equations.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Mastered</p>
            <p className="text-base font-bold text-emerald-700">
              {masteredIds.length} / {FLASHCARDS_DECK.length}
            </p>
          </div>
        </div>
      </div>

      {/* Subject Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto text-xs bg-white p-3 rounded-xl border border-slate-200">
        <button
          onClick={() => {
            setSelectedSubject('All');
            setCurrentIndex(0);
            setIsFlipped(false);
          }}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            selectedSubject === 'All' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Topics ({FLASHCARDS_DECK.length})
        </button>
        <button
          onClick={() => {
            setSelectedSubject('Pharmacology');
            setCurrentIndex(0);
            setIsFlipped(false);
          }}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            selectedSubject === 'Pharmacology' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Pharmacology
        </button>
        <button
          onClick={() => {
            setSelectedSubject('Pharmaceutics');
            setCurrentIndex(0);
            setIsFlipped(false);
          }}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            selectedSubject === 'Pharmaceutics' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Pharmaceutics
        </button>
        <button
          onClick={() => {
            setSelectedSubject('Pharmacognosy');
            setCurrentIndex(0);
            setIsFlipped(false);
          }}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            selectedSubject === 'Pharmacognosy' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Pharmacognosy
        </button>
        <button
          onClick={() => {
            setSelectedSubject('Pharmaceutical Chemistry');
            setCurrentIndex(0);
            setIsFlipped(false);
          }}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            selectedSubject === 'Pharmaceutical Chemistry' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Chemistry
        </button>
      </div>

      {/* Main Flashcard Flip Area */}
      {currentCard ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="font-semibold">
              Card {currentIndex + 1} of {filteredCards.length}
            </span>
            <span className="text-[11px] text-slate-400">Click anywhere on card or flip button</span>
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer select-none min-h-[320px] rounded-2xl p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 relative shadow-sm border"
            style={{
              backgroundColor: isFlipped ? '#042f2e' : '#ffffff',
              color: isFlipped ? '#ffffff' : '#0f172a',
              borderColor: isFlipped ? '#0d9488' : '#e2e8f0',
            }}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    isFlipped ? 'bg-teal-900/60 text-teal-200' : 'bg-teal-50 text-teal-800'
                  }`}
                >
                  {currentCard.subject}
                </span>
                <span className="text-xs opacity-70">{currentCard.topic}</span>
              </div>

              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${isFlipped ? 'bg-white/10' : 'bg-slate-100'}`}>
                {isFlipped ? 'Answer & Explanation' : 'Question Prompt'}
              </span>
            </div>

            {/* Card Content Body */}
            <div className="my-auto py-6 text-center">
              {!isFlipped ? (
                <div className="space-y-3">
                  <p className="text-lg sm:text-2xl font-bold tracking-tight leading-snug">
                    {currentCard.front}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">Click to reveal answer</p>
                </div>
              ) : (
                <div className="space-y-4 text-left sm:text-center max-w-xl mx-auto">
                  <p className="text-base sm:text-lg font-semibold leading-relaxed whitespace-pre-line text-teal-50">
                    {currentCard.back}
                  </p>
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-100/20">
              <span className="text-[11px] opacity-60">Tag: #{currentCard.tag}</span>

              <div className="flex items-center gap-2">
                <RotateCw className="w-3.5 h-3.5 opacity-60 animate-spin-slow" />
                <span className="font-semibold text-[11px]">Flip Card</span>
              </div>
            </div>
          </div>

          {/* Navigation & Mastered Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => handleToggleMastered(currentCard.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                masteredIds.includes(currentCard.id)
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{masteredIds.includes(currentCard.id) ? 'Mastered!' : 'Mark as Mastered'}</span>
            </button>

            <button
              onClick={handleNext}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <span>Next Card</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-500">No flashcards found for this topic.</p>
        </div>
      )}
    </div>
  );
};
