import { ExamType, PharmacySubject, StudyPlanDay, TestResult, UserCustomNote } from '../types/pharmacy';

const STORAGE_KEYS = {
  USER_NOTES: 'pharmprep_user_notes',
  TEST_RESULTS: 'pharmprep_test_results',
  TARGET_EXAM: 'pharmprep_target_exam',
  TARGET_EXAM_DATE: 'pharmprep_target_exam_date',
  STUDY_PLAN: 'pharmprep_study_plan',
  DAILY_QUIZ_STREAK: 'pharmprep_daily_streak',
  DAILY_QUIZ_HISTORY: 'pharmprep_daily_history',
  OFFLINE_MODE: 'pharmprep_offline_mode',
  LAST_SYNC: 'pharmprep_last_sync',
  BOOKMARKED_QUESTIONS: 'pharmprep_bookmarked_questions',
};

// Initial default user notes to provide a rich starting experience
export const INITIAL_USER_NOTES: UserCustomNote[] = [
  {
    id: 'user-note-01',
    title: 'High-Yield Antidotes Quick Sheet for GPAT',
    subject: 'Pharmacology',
    topic: 'Toxicology',
    content: `# Essential Antidotes & Mechanism
- **Paracetamol (Acetaminophen)**: N-acetylcysteine (NAC) -> replenishes hepatic glutathione.
- **Organophosphates & Carbamates**: Atropine (blocks muscarinic hyperactivity) + Pralidoxime (2-PAM, reactivates phosphorylated acetylcholinesterase before aging).
- **Digoxin**: Digoxin-specific Fab antibodies (Digibind).
- **Heparin**: Protamine Sulfate (acid-base salt neutralization).
- **Warfarin**: Vitamin K1 (Phytonadione), Fresh Frozen Plasma (FFP), Prothrombin Complex Concentrate (PCC).
- **Opioids (Morphine, Heroin)**: Naloxone (pure competitive antagonist IV).
- **Benzodiazepines**: Flumazenil (competitive antagonist at GABA-A benzodiazepine site).
- **Cyanide**: Hydroxocobalamin or Amyl nitrite + Sodium nitrite + Sodium thiosulfate.
- **Beta-blockers**: Intravenous Glucagon (activates cardiac adenylyl cyclase bypassing beta receptors).
- **Lead / Heavy metals**: Calcium Disodium EDTA, Dimercaprol (BAL), Penicillamine.`,
    tags: ['Antidotes', 'High-Yield', 'GPAT-Hot', 'Toxicology'],
    createdAt: '2025-03-20T10:00:00Z',
    updatedAt: '2025-03-22T14:30:00Z',
    isPinned: true,
  },
  {
    id: 'user-note-02',
    title: 'Schedule M Revised Clean Room Classifications (2024-2025)',
    subject: 'Clinical Pharmacy & Jurisprudence',
    topic: 'GMP & Regulatory',
    content: `# Clean Room Air Classifications (WHO-GMP & Schedule M)
- **Grade A (Class 100)**: Local zone for high-risk operations (filling zone, stopper bowls, open ampoules/vials). Laminar air flow speed: 0.36 to 0.54 m/s.
- **Grade B**: Background environment for Grade A in aseptic preparation.
- **Grade C (Class 10,000)**: Clean areas for carrying out less critical stages of sterile manufacturing (solution preparation, filtration).
- **Grade D (Class 100,000)**: Handling of components after washing, clean packaging area.

### Particle Limits at Rest:
- **Grade A**: Maximum 3,520 particles/m³ for ≥0.5 µm; 20 for ≥5.0 µm.
- **Grade B**: Maximum 3,520 particles/m³ for ≥0.5 µm; 29 for ≥5.0 µm.
- **Grade C**: Maximum 352,000 particles/m³ for ≥0.5 µm; 2,900 for ≥5.0 µm.
- **Grade D**: Maximum 3,520,000 particles/m³ for ≥0.5 µm; 29,000 for ≥5.0 µm.`,
    tags: ['Schedule M', 'Clean Room', 'Jurisprudence', 'DI-Special'],
    createdAt: '2025-03-21T09:15:00Z',
    updatedAt: '2025-03-21T09:15:00Z',
    isPinned: true,
  },
  {
    id: 'user-note-03',
    title: 'NIPER Organic Chemistry: Named Rearrangements Summary',
    subject: 'Pharmaceutical Chemistry',
    topic: 'Organic Mechanisms',
    content: `# Top Named Reactions for NIPER JEE
1. **Beckmann Rearrangement**:
   - Ketoxime + acid catalyst (H2SO4, PCl5, SOCl2) -> N-substituted Amide.
   - Stereospecific: anti-group migrates to N atom.
2. **Curtius Rearrangement**:
   - Acyl azide -> Isocyanate (via nitrene intermediate) -> Amine on hydrolysis.
3. **Baeyer-Villiger Oxidation**:
   - Ketone + Peroxyacid (mCPBA) -> Ester / Lactone.
   - Migratory aptitude: 3° alkyl > 2° alkyl ≈ phenyl > 1° alkyl > methyl.
4. **Hoffmann Bromamide Degradation**:
   - Primary amide + Br2 + 4 KOH -> Primary amine with ONE LESS carbon atom.
   - Intermediate: Isocyanate.
5. **Fries Rearrangement**:
   - Phenolic ester + Lewis acid (AlCl3) -> ortho/para-hydroxyketone.
   - Low temp favours para, high temp favours ortho (due to intramolecular H-bonding).`,
    tags: ['NIPER', 'Name-Reactions', 'Organic-Chemistry', 'Mechanisms'],
    createdAt: '2025-03-22T16:45:00Z',
    updatedAt: '2025-03-24T11:20:00Z',
    isPinned: false,
  },
];

export const INITIAL_STUDY_PLAN: StudyPlanDay[] = [
  {
    id: 'plan-day-1',
    dateString: '2025-03-28',
    dayLabel: 'Day 1: Pharmacology & ANS Foundation',
    topics: [
      { id: 't1', subject: 'Pharmacology', title: 'Adrenergic & Cholinergic receptors, G-protein pathways', estimatedMinutes: 60, completed: true, examType: 'GPAT' },
      { id: 't2', subject: 'Pharmacology', title: 'Antidotes & Toxicology flashcards review', estimatedMinutes: 30, completed: true, examType: 'GPAT' },
      { id: 't3', subject: 'Pharmaceutics', title: 'Tablet compression defects (Capping, Lamination, Mottling)', estimatedMinutes: 45, completed: false, examType: 'GPAT' },
    ],
  },
  {
    id: 'plan-day-2',
    dateString: '2025-03-29',
    dayLabel: 'Day 2: Pharmaceutics & Kinetics',
    topics: [
      { id: 't4', subject: 'Pharmaceutics', title: 'Stokes Law, Noyes-Whitney dissolution & Rheology', estimatedMinutes: 50, completed: false, examType: 'GPAT' },
      { id: 't5', subject: 'Pharmaceutical Analysis', title: 'UV-Vis spectroscopy: Woodward-Fieser rules practice', estimatedMinutes: 60, completed: false, examType: 'NIPER_JEE' },
      { id: 't6', subject: 'Aptitude & General Pharma', title: 'Pharmacokinetic half-life and clearance numericals', estimatedMinutes: 35, completed: false, examType: 'GPAT' },
    ],
  },
  {
    id: 'plan-day-3',
    dateString: '2025-03-30',
    dayLabel: 'Day 3: Pharmacognosy Chemical Tests & Alkaloids',
    topics: [
      { id: 't7', subject: 'Pharmacognosy', title: 'Vitali-Morin, Keller-Kiliani, Borntrager tests', estimatedMinutes: 45, completed: false, examType: 'GPAT' },
      { id: 't8', subject: 'Pharmacognosy', title: 'Vinca, Rauwolfia, Cinchona biological sources & uses', estimatedMinutes: 40, completed: false, examType: 'GPAT' },
      { id: 't9', subject: 'Clinical Pharmacy & Jurisprudence', title: 'D&C Act 1940: Schedules H, H1, X, M revision', estimatedMinutes: 45, completed: false, examType: 'DRUG_INSPECTOR' },
    ],
  },
  {
    id: 'plan-day-4',
    dateString: '2025-03-31',
    dayLabel: 'Day 4: Pharmaceutical Chemistry & Stereochemistry',
    topics: [
      { id: 't10', subject: 'Pharmaceutical Chemistry', title: 'R/S CIP nomenclature & Diastereomers', estimatedMinutes: 60, completed: false, examType: 'NIPER_JEE' },
      { id: 't11', subject: 'Pharmaceutical Chemistry', title: 'Heterocycles in PPIs, Antifungals & Antibiotics', estimatedMinutes: 45, completed: false, examType: 'GPAT' },
    ],
  },
  {
    id: 'plan-day-5',
    dateString: '2025-04-01',
    dayLabel: 'Day 5: Full Mock Simulation & Test Review',
    topics: [
      { id: 't12', subject: 'Pharmacology', title: 'Take NTA GPAT All-India Mock Test 01 (180 mins)', estimatedMinutes: 180, completed: false, examType: 'GPAT' },
      { id: 't13', subject: 'Clinical Pharmacy & Jurisprudence', title: 'Review negative marks & save mistakes to My Notes', estimatedMinutes: 45, completed: false, examType: 'GPAT' },
    ],
  },
];

// Helper functions
export const getTargetExam = (): ExamType => {
  const saved = localStorage.getItem(STORAGE_KEYS.TARGET_EXAM);
  return (saved as ExamType) || 'GPAT';
};

export const setTargetExam = (exam: ExamType): void => {
  localStorage.setItem(STORAGE_KEYS.TARGET_EXAM, exam);
};

export const getTargetExamDate = (): string => {
  const saved = localStorage.getItem(STORAGE_KEYS.TARGET_EXAM_DATE);
  if (saved) return saved;
  // Default to upcoming GPAT/NIPER tentative date (e.g. May 15, 2026)
  const defaultDate = '2026-05-15';
  localStorage.setItem(STORAGE_KEYS.TARGET_EXAM_DATE, defaultDate);
  return defaultDate;
};

export const setTargetExamDate = (dateStr: string): void => {
  localStorage.setItem(STORAGE_KEYS.TARGET_EXAM_DATE, dateStr);
};

export const getUserNotes = (): UserCustomNote[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_NOTES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.USER_NOTES, JSON.stringify(INITIAL_USER_NOTES));
      return INITIAL_USER_NOTES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_USER_NOTES;
  }
};

export const saveUserNote = (note: Omit<UserCustomNote, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): UserCustomNote => {
  const current = getUserNotes();
  const now = new Date().toISOString();

  if (note.id) {
    const updated = current.map(n =>
      n.id === note.id
        ? {
            ...n,
            title: note.title,
            subject: note.subject,
            topic: note.topic,
            content: note.content,
            tags: note.tags,
            isPinned: note.isPinned,
            updatedAt: now,
          }
        : n
    );
    localStorage.setItem(STORAGE_KEYS.USER_NOTES, JSON.stringify(updated));
    return updated.find(n => n.id === note.id)!;
  } else {
    const newNote: UserCustomNote = {
      id: 'user-note-' + Date.now(),
      title: note.title,
      subject: note.subject,
      topic: note.topic,
      content: note.content,
      tags: note.tags || ['Personal'],
      createdAt: now,
      updatedAt: now,
      isPinned: !!note.isPinned,
    };
    const updated = [newNote, ...current];
    localStorage.setItem(STORAGE_KEYS.USER_NOTES, JSON.stringify(updated));
    return newNote;
  }
};

export const deleteUserNote = (id: string): void => {
  const current = getUserNotes();
  const filtered = current.filter(n => n.id !== id);
  localStorage.setItem(STORAGE_KEYS.USER_NOTES, JSON.stringify(filtered));
};

export const togglePinUserNote = (id: string): void => {
  const current = getUserNotes();
  const updated = current.map(n => (n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  localStorage.setItem(STORAGE_KEYS.USER_NOTES, JSON.stringify(updated));
};

export const getTestResults = (): TestResult[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TEST_RESULTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveTestResult = (result: TestResult): void => {
  const current = getTestResults();
  const updated = [result, ...current];
  localStorage.setItem(STORAGE_KEYS.TEST_RESULTS, JSON.stringify(updated));
};

export const getStudyPlan = (): StudyPlanDay[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDY_PLAN);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.STUDY_PLAN, JSON.stringify(INITIAL_STUDY_PLAN));
      return INITIAL_STUDY_PLAN;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_STUDY_PLAN;
  }
};

export const toggleStudyTopicCompleted = (dayId: string, topicId: string): StudyPlanDay[] => {
  const current = getStudyPlan();
  const updated = current.map(day => {
    if (day.id === dayId) {
      return {
        ...day,
        topics: day.topics.map(top => (top.id === topicId ? { ...top, completed: !top.completed } : top)),
      };
    }
    return day;
  });
  localStorage.setItem(STORAGE_KEYS.STUDY_PLAN, JSON.stringify(updated));
  return updated;
};

export const addStudyTopic = (dayId: string, topic: { subject: PharmacySubject; title: string; estimatedMinutes: number; examType: ExamType }): StudyPlanDay[] => {
  const current = getStudyPlan();
  const updated = current.map(day => {
    if (day.id === dayId) {
      return {
        ...day,
        topics: [
          ...day.topics,
          {
            id: 'topic-' + Date.now(),
            subject: topic.subject,
            title: topic.title,
            estimatedMinutes: topic.estimatedMinutes,
            completed: false,
            examType: topic.examType,
          },
        ],
      };
    }
    return day;
  });
  localStorage.setItem(STORAGE_KEYS.STUDY_PLAN, JSON.stringify(updated));
  return updated;
};

export const getDailyStreak = (): { streak: number; lastActiveDate: string } => {
  try {
    const streak = parseInt(localStorage.getItem(STORAGE_KEYS.DAILY_QUIZ_STREAK) || '3', 10);
    const lastActive = localStorage.getItem(STORAGE_KEYS.DAILY_QUIZ_HISTORY) || new Date().toISOString().split('T')[0];
    return { streak, lastActiveDate: lastActive };
  } catch {
    return { streak: 3, lastActiveDate: new Date().toISOString().split('T')[0] };
  }
};

export const incrementStreak = (): number => {
  const { streak } = getDailyStreak();
  const newStreak = streak + 1;
  localStorage.setItem(STORAGE_KEYS.DAILY_QUIZ_STREAK, newStreak.toString());
  localStorage.setItem(STORAGE_KEYS.DAILY_QUIZ_HISTORY, new Date().toISOString().split('T')[0]);
  return newStreak;
};

export const getOfflineStatus = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.OFFLINE_MODE) === 'true';
};

export const setOfflineStatus = (enabled: boolean): void => {
  localStorage.setItem(STORAGE_KEYS.OFFLINE_MODE, enabled ? 'true' : 'false');
  if (enabled) {
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
  }
};

export const getLastSyncTime = (): string => {
  return localStorage.getItem(STORAGE_KEYS.LAST_SYNC) || 'Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const getBookmarkedQuestions = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKED_QUESTIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const toggleBookmarkQuestion = (questionId: string): string[] => {
  const current = getBookmarkedQuestions();
  let updated: string[];
  if (current.includes(questionId)) {
    updated = current.filter(id => id !== questionId);
  } else {
    updated = [...current, questionId];
  }
  localStorage.setItem(STORAGE_KEYS.BOOKMARKED_QUESTIONS, JSON.stringify(updated));
  return updated;
};
