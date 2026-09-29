import React, { useState } from 'react';
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  BookMarked,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Eye,
  FileEdit,
  FileText,
  List,
  Pin,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  Tag,
  Trash2,
  X,
} from 'lucide-react';
import { PharmacySubject, UserCustomNote } from '../types/pharmacy';

interface MyNotesViewProps {
  notes: UserCustomNote[];
  onSaveNote: (note: Omit<UserCustomNote, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => void;
  onDeleteNote: (id: string) => void;
  onTogglePin: (id: string) => void;
  onClose?: () => void;
  initialEditingNoteId?: string | null;
}

export const MyNotesView: React.FC<MyNotesViewProps> = ({
  notes,
  onSaveNote,
  onDeleteNote,
  onTogglePin,
  initialEditingNoteId,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(!!initialEditingNoteId);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(initialEditingNoteId || null);

  // Form State
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState<PharmacySubject>('Pharmacology');
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [onTheGoMode, setOnTheGoMode] = useState(false);
  const [onTheGoIndex, setOnTheGoIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter notes
  const filteredNotes = notes.filter((n) => {
    if (selectedSubject !== 'All' && n.subject !== selectedSubject) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = n.title.toLowerCase().includes(q);
      const matchContent = n.content.toLowerCase().includes(q);
      const matchTopic = n.topic.toLowerCase().includes(q);
      const matchTag = n.tags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchContent || matchTopic || matchTag;
    }
    return true;
  });

  // Sort notes: pinned first, then updated at desc
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const handleStartCreate = () => {
    setActiveNoteId(null);
    setTitle('');
    setSubject('Pharmacology');
    setTopic('');
    setContent('# New High-Yield Topic\n- Key mechanism / formula:\n- Essential drug interactions:\n- Exam traps to avoid:');
    setTagsInput('High-Yield, GPAT');
    setIsPinned(false);
    setIsEditing(true);
    setActiveTab('edit');
  };

  const handleStartEdit = (note: UserCustomNote) => {
    setActiveNoteId(note.id);
    setTitle(note.title);
    setSubject(note.subject);
    setTopic(note.topic);
    setContent(note.content);
    setTagsInput(note.tags.join(', '));
    setIsPinned(!!note.isPinned);
    setIsEditing(true);
    setActiveTab('edit');
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please provide a title for your note.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    onSaveNote({
      id: activeNoteId || undefined,
      title: title.trim(),
      subject,
      topic: topic.trim() || 'General Revision',
      content,
      tags: tags.length > 0 ? tags : ['General'],
      isPinned,
    });

    setIsEditing(false);
    setToastMessage(activeNoteId ? 'Note updated successfully!' : 'New note created!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Helper toolbar inserts
  const insertText = (before: string, after: string = '') => {
    setContent((prev) => prev + `\n${before}${after}`);
  };

  const insertFormulaTemplate = () => {
    setContent((prev) => prev + `\n\`\`\`text\nFormula: Clearance (CL) = Vd * Ke = (Dose * F) / AUC\n\`\`\`\n`);
  };

  const insertTableTemplate = () => {
    setContent(
      (prev) =>
        prev +
        `\n| Drug / Category | Mechanism | Key Adverse Effect |\n|---|---|---|\n| Atropine | Competitive muscarinic blocker | Dry mouth, blurred vision |\n| Digoxin | Na+/K+ ATPase inhibitor | Arrhythmias, xanthopsia (yellow vision) |\n`
    );
  };

  // Export all notes as markdown
  const handleExportNotes = () => {
    const markdownData = notes
      .map(
        (n) =>
          `# ${n.title}\n**Subject:** ${n.subject} | **Topic:** ${n.topic}\n**Tags:** ${n.tags.join(', ')}\n\n${n.content}\n\n---\n`
      )
      .join('\n\n');

    const blob = new Blob([markdownData], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PharmPrep_My_Notes_Backup_${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
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

      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 mb-1">
            <span>Seamless Pharmacy Notebook</span>
            <span>·</span>
            <span>Synced for Offline Study</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            My High-Yield Notes & Formula Sheets
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Create, edit, and organize your personal revision notes, chemical test tables, and mock exam takeaways. Switch to "On-The-Go Flashcard Mode" for rapid commutes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setOnTheGoMode(!onTheGoMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              onTheGoMode
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="On-The-Go rapid study card mode"
          >
            <BookMarked className="w-4 h-4" />
            <span>{onTheGoMode ? 'Exit On-The-Go' : 'On-The-Go Mode'}</span>
          </button>

          <button
            onClick={handleExportNotes}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
            title="Export all notes to Markdown file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <button
            onClick={handleStartCreate}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Note</span>
          </button>
        </div>
      </div>

      {/* On-The-Go Mode View (Large rapid flashcard study session) */}
      {onTheGoMode && sortedNotes.length > 0 && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> On-The-Go Study Session
            </span>
            <span>
              Card {onTheGoIndex + 1} of {sortedNotes.length}
            </span>
          </div>

          {/* Active Card Body */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 space-y-4 min-h-[300px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-300 mb-2">
                <span>{sortedNotes[onTheGoIndex].subject}</span>
                <span aria-hidden="true">·</span>
                <span>{sortedNotes[onTheGoIndex].topic}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-4">
                {sortedNotes[onTheGoIndex].title}
              </h2>
              <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line font-mono bg-black/30 p-4 rounded-xl max-h-80 overflow-y-auto">
                {sortedNotes[onTheGoIndex].content}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-white/10">
              <Tag className="w-3.5 h-3.5" />
              <span>Tags: {sortedNotes[onTheGoIndex].tags.join(', ')}</span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setOnTheGoIndex((prev) => Math.max(0, prev - 1))}
              disabled={onTheGoIndex === 0}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-40 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Note</span>
            </button>

            <button
              onClick={() => handleStartEdit(sortedNotes[onTheGoIndex])}
              className="px-3 py-1.5 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 rounded-lg text-xs font-semibold"
            >
              Edit This Note
            </button>

            <button
              onClick={() => setOnTheGoIndex((prev) => Math.min(sortedNotes.length - 1, prev + 1))}
              disabled={onTheGoIndex === sortedNotes.length - 1}
              className="px-5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 disabled:opacity-40"
            >
              <span>Next Note</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Editor Modal / Panel if isEditing */}
      {isEditing && (
        <div className="bg-white border-2 border-teal-500/40 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <FileEdit className="w-4 h-4 text-teal-600" />
              <h2 className="text-sm font-bold text-slate-900">
                {activeNoteId ? 'Edit Study Note' : 'Create New Study Note'}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {/* Tab switcher: Edit vs Preview */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs">
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    activeTab === 'edit' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
                  }`}
                >
                  Write (Markdown)
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    activeTab === 'preview' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
                  }`}
                >
                  Live Preview
                </button>
              </div>

              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Form inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-700">Note Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Schedule M Clean Room Classes & Particle Norms"
                className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Pharmacy Subject *</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as PharmacySubject)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
              >
                <option value="Pharmacology">Pharmacology</option>
                <option value="Pharmaceutics">Pharmaceutics</option>
                <option value="Pharmaceutical Chemistry">Pharmaceutical Chemistry</option>
                <option value="Pharmacognosy">Pharmacognosy</option>
                <option value="Pharmaceutical Analysis">Pharmaceutical Analysis</option>
                <option value="Clinical Pharmacy & Jurisprudence">Jurisprudence & Regulations</option>
                <option value="Biotechnology & Microbiology">Biotechnology & Micro</option>
                <option value="Aptitude & General Pharma">Aptitude & Math</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Specific Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Sterilization kinetics & D-value"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Tags (comma separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="e.g. GPAT, High-Yield, Formulas"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span>Pin to Top of Notebook</span>
              </label>
            </div>
          </div>

          {/* Quick formatting toolbar */}
          {activeTab === 'edit' && (
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400">Quick Insert:</span>
              <button
                onClick={() => insertText('### ')}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
              >
                H3 Header
              </button>
              <button
                onClick={() => insertText('- ')}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
              >
                • Bullet
              </button>
              <button
                onClick={() => insertText('> 💡 **Key Takeaway:** ')}
                className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded font-medium"
              >
                High-Yield Tip
              </button>
              <button
                onClick={insertFormulaTemplate}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-mono"
              >
                Formula Block
              </button>
              <button
                onClick={insertTableTemplate}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
              >
                Table Grid
              </button>
            </div>
          )}

          {/* Editor content / Preview */}
          {activeTab === 'edit' ? (
            <div className="space-y-1">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                placeholder="Write your revision notes in Markdown format..."
                className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
              />
            </div>
          ) : (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl min-h-[250px] max-h-96 overflow-y-auto text-xs leading-relaxed space-y-3 font-sans">
              <div className="whitespace-pre-line text-slate-800">{content}</div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            {activeNoteId ? (
              <button
                onClick={() => {
                  if (confirm('Delete this note permanently?')) {
                    onDeleteNote(activeNoteId);
                    setIsEditing(false);
                  }
                }}
                className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Note</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Save Note</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, formulas, tags..."
            className="w-full text-xs pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Subject Filter pills */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto text-xs pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedSubject('All')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedSubject === 'All' ? 'bg-slate-900 text-white shadow-2xs font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All ({notes.length})
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
            onClick={() => setSelectedSubject('Pharmaceutical Chemistry')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedSubject === 'Pharmaceutical Chemistry' ? 'bg-slate-900 text-white shadow-2xs font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Chemistry
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

      {/* Notes Grid */}
      {sortedNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedNotes.map((note) => (
            <div
              key={note.id}
              className={`bg-white border rounded-2xl p-5 shadow-xs hover:border-teal-400 hover:shadow-sm transition-all flex flex-col justify-between ${
                note.isPinned ? 'border-teal-300 bg-teal-50/10' : 'border-slate-200'
              }`}
            >
              <div>
                {/* Header line */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                      {note.subject}
                    </span>
                    <span>·</span>
                    <span className="truncate max-w-[120px]">{note.topic}</span>
                  </div>

                  <button
                    onClick={() => onTogglePin(note.id)}
                    className={`p-1 rounded-md transition-colors ${
                      note.isPinned ? 'text-teal-700 bg-teal-50' : 'text-slate-300 hover:text-slate-600'
                    }`}
                    title={note.isPinned ? 'Unpin note' : 'Pin note to top'}
                  >
                    <Pin className={`w-3.5 h-3.5 ${note.isPinned ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug line-clamp-2">
                  {note.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-slate-600 line-clamp-4 leading-relaxed font-mono bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-3">
                  {note.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1 mb-4">
                  {note.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="text-[10px] text-slate-400">
                  {new Date(note.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(note)}
                    className="font-semibold text-teal-700 hover:text-teal-900"
                  >
                    Edit Note
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    onClick={() => {
                      if (confirm('Delete this note?')) onDeleteNote(note.id);
                    }}
                    className="text-slate-400 hover:text-rose-600"
                    title="Delete note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <FileText className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900">No notes found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? `No notes matching "${searchQuery}". Try a different keyword.`
              : 'Start building your high-yield pharmacy notebook for GPAT and NIPER!'}
          </p>
          <button
            onClick={handleStartCreate}
            className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-teal-700 transition-colors"
          >
            Create Your First Note
          </button>
        </div>
      )}
    </div>
  );
};
