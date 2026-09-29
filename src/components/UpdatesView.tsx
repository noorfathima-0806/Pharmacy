import React, { useState } from 'react';
import {
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Filter,
  Info,
  Lightbulb,
  Search,
  Sparkles,
} from 'lucide-react';
import { PHARMACY_UPDATES } from '../data/pharmacyData';
import { PharmacyUpdate } from '../types/pharmacy';

export const UpdatesView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUpdates = PHARMACY_UPDATES.filter((upd) => {
    if (selectedCategory !== 'All' && upd.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = upd.title.toLowerCase().includes(q);
      const matchSummary = upd.summary.toLowerCase().includes(q);
      const matchNotes = upd.detailedNotes.toLowerCase().includes(q);
      const matchTag = upd.tag.toLowerCase().includes(q);
      return matchTitle || matchSummary || matchNotes || matchTag;
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 mb-1">
            <span>Regulatory & Pharmacopoeia Intelligence</span>
            <span>·</span>
            <span>Syllabus Updates 2024-2025</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            New Topics & Pharmacy Exam Updates
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Keep pace with the latest Schedule M GMP guidelines, IP 2024 addendum monographs, CDSCO/USFDA drug approvals, and official NBEMS GPAT notifications.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search updates, drugs, regulations..."
            className="w-full text-xs pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto text-xs pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedCategory === 'All' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Updates ({PHARMACY_UPDATES.length})
          </button>
          <button
            onClick={() => setSelectedCategory('Regulatory')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedCategory === 'Regulatory' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Schedule M & Rules
          </button>
          <button
            onClick={() => setSelectedCategory('Pharmacopoeia')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedCategory === 'Pharmacopoeia' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            IP 2024 Monographs
          </button>
          <button
            onClick={() => setSelectedCategory('New Drug Approval')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedCategory === 'New Drug Approval' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            New Approvals
          </button>
          <button
            onClick={() => setSelectedCategory('Exam Notification')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedCategory === 'Exam Notification' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Exam Notices
          </button>
        </div>
      </div>

      {/* Updates Cards List */}
      <div className="space-y-4">
        {filteredUpdates.map((update) => (
          <div
            key={update.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-teal-300 transition-all space-y-4"
          >
            {/* Top metadata */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                  {update.tag}
                </span>
                <span className="text-slate-400">·</span>
                <span className="font-medium text-slate-500">{update.category}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500">{update.date}</span>
              </div>
            </div>

            {/* Title & summary */}
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {update.title}
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{update.summary}</p>
            </div>

            {/* Detailed Notes */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
              <p className="font-semibold text-slate-900 mb-1">Detailed Analysis & Key Facts:</p>
              <p>{update.detailedNotes}</p>
            </div>

            {/* Exam Impact Box */}
            <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-950 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Probable Exam Questions: </span>
                <span>{update.impactOnExams}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
