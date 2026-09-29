import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  FileEdit,
  Lightbulb,
  Search,
  Sparkles,
  Table,
} from 'lucide-react';
import { STUDY_NOTES } from '../data/pharmacyData';
import { PharmacySubject, StudyNote } from '../types/pharmacy';

interface StudyNotesViewProps {
  onSaveToPersonalNotes: (title: string, subject: string, content: string) => void;
  activeNoteId?: string | null;
  onClearActiveNote?: () => void;
}

export const StudyNotesView: React.FC<StudyNotesViewProps> = ({
  onSaveToPersonalNotes,
  activeNoteId,
  onClearActiveNote,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(activeNoteId || null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedNote: StudyNote | undefined = STUDY_NOTES.find((n) => n.id === currentNoteId);

  const filteredNotes = STUDY_NOTES.filter((note) => {
    if (selectedSubject !== 'All' && note.subject !== selectedSubject) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = note.title.toLowerCase().includes(q);
      const matchTopic = note.topic.toLowerCase().includes(q);
      const matchContent = note.contentMarkdown.toLowerCase().includes(q);
      const matchHighlights = note.keyHighlights.some((h) => h.toLowerCase().includes(q));
      return matchTitle || matchTopic || matchContent || matchHighlights;
    }
    return true;
  });

  const handleCopyExcerpt = (note: StudyNote) => {
    const title = `Excerpt: ${note.title}`;
    const content = `### ${note.title}\n**Subject:** ${note.subject} | **Topic:** ${note.topic}\n\n**Key Highlights:**\n${note.keyHighlights.map((h) => `- ${h}`).join('\n')}\n\n${note.contentMarkdown}`;
    onSaveToPersonalNotes(title, note.subject, content);
    setToastMessage(`Saved to My Notes!`);
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

      {/* Reader Mode if note selected */}
      {selectedNote ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Top Return Navigation */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <button
              onClick={() => {
                setCurrentNoteId(null);
                if (onClearActiveNote) onClearActiveNote();
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Study Notes Catalog</span>
            </button>

            <button
              onClick={() => handleCopyExcerpt(selectedNote)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold transition-colors"
            >
              <FileEdit className="w-3.5 h-3.5" />
              <span>Save to My Notes</span>
            </button>
          </div>

          {/* Note Title & Meta */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                {selectedNote.subject}
              </span>
              <span>·</span>
              <span>{selectedNote.topic}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {selectedNote.readTimeMinutes} min read
              </span>
              <span>·</span>
              <span>Updated {selectedNote.lastUpdated}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
              {selectedNote.title}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">{selectedNote.summary}</p>
          </div>

          {/* Key High-Yield Bullet Highlights */}
          <div className="p-4 bg-teal-50/60 border border-teal-200/70 rounded-xl space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-700" /> High-Yield Pointers for GPAT & NIPER
            </p>
            <ul className="space-y-1.5 text-xs text-teal-950 font-medium list-disc list-inside">
              {selectedNote.keyHighlights.map((hl, idx) => (
                <li key={idx} className="leading-relaxed">
                  {hl}
                </li>
              ))}
            </ul>
          </div>

          {/* Mnemonics if available */}
          {selectedNote.mnemonics && selectedNote.mnemonics.length > 0 && (
            <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-xl space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" /> High-Yield Mnemonics
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {selectedNote.mnemonics.map((mnem, idx) => (
                  <div key={idx} className="p-2.5 bg-white rounded-lg border border-amber-200 shadow-2xs">
                    <p className="font-bold text-amber-950 text-sm">{mnem.mnemonic}</p>
                    <p className="text-[11px] text-amber-800 font-mono mt-0.5">{mnem.expansion}</p>
                    <p className="text-[11px] text-slate-600 mt-1">{mnem.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Content Markdown */}
          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-sans border-t border-slate-100 pt-4">
            {selectedNote.contentMarkdown}
          </div>

          {/* High-Yield Diagnostic Comparative Tables */}
          {selectedNote.tables && selectedNote.tables.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              {selectedNote.tables.map((tbl, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Table className="w-3.5 h-3.5 text-teal-600" />
                    <span>{tbl.title}</span>
                  </h3>
                  <div className="border border-slate-200 rounded-xl overflow-x-auto text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                        <tr>
                          {tbl.headers.map((h, hIdx) => (
                            <th key={hIdx} className="py-2.5 px-3 whitespace-nowrap">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {tbl.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/50">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-2.5 px-3 text-slate-800 font-medium">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Notes Catalog Grid */
        <>
          {/* Top Catalog Banner */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 mb-1">
                <span>Core Pharmacy Curricula</span>
                <span>·</span>
                <span>Offline Cached Content</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Comprehensive Study Notes & Tables
              </h1>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                High-yield revision notes, reaction mechanisms, phytochemical tests, and drug tables curated specifically for GPAT, NIPER JEE, and Drug Inspector entrance examinations.
              </p>
            </div>
          </div>

          {/* Search & Subject Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, mnemonics, tables..."
                className="w-full text-xs pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto text-xs pb-1 sm:pb-0">
              <button
                onClick={() => setSelectedSubject('All')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedSubject === 'All' ? 'bg-slate-900 text-white shadow-2xs font-semibold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                All Subjects
              </button>
              <button
                onClick={() => setSelectedSubject('Pharmacology')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedSubject === 'Pharmacology' ? 'bg-slate-900 text-white shadow-2xs font-semibold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Pharmacology
              </button>
              <button
                onClick={() => setSelectedSubject('Pharmaceutics')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedSubject === 'Pharmaceutics' ? 'bg-slate-900 text-white shadow-2xs font-semibold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Pharmaceutics
              </button>
              <button
                onClick={() => setSelectedSubject('Pharmacognosy')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedSubject === 'Pharmacognosy' ? 'bg-slate-900 text-white shadow-2xs font-semibold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Pharmacognosy
              </button>
              <button
                onClick={() => setSelectedSubject('Clinical Pharmacy & Jurisprudence')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedSubject === 'Clinical Pharmacy & Jurisprudence' ? 'bg-slate-900 text-white shadow-2xs font-semibold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Jurisprudence
              </button>
            </div>
          </div>

          {/* Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setCurrentNoteId(note.id)}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-teal-400 hover:shadow-sm cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                      {note.subject}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" /> {note.readTimeMinutes} min
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1.5 leading-snug">
                    {note.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                    {note.summary}
                  </p>

                  {/* Highlights Pill */}
                  <div className="space-y-1 mb-3">
                    {note.keyHighlights.slice(0, 2).map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <span className="text-[11px] text-slate-400">{note.topic}</span>
                  <span className="font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1">
                    <span>Read Study Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
