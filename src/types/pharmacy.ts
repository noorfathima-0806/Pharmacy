export type ExamType = 'GPAT' | 'NIPER_JEE' | 'DRUG_INSPECTOR' | 'PHARMACIST';

export type PharmacySubject =
  | 'Pharmacology'
  | 'Pharmaceutics'
  | 'Pharmaceutical Chemistry'
  | 'Pharmacognosy'
  | 'Pharmaceutical Analysis'
  | 'Clinical Pharmacy & Jurisprudence'
  | 'Biotechnology & Microbiology'
  | 'Aptitude & General Pharma';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctOption: number; // 0-indexed
  explanation: string;
  subject: PharmacySubject;
  topic: string;
  examSource?: string; // e.g. "GPAT 2024", "NIPER JEE 2023", "NTA Model"
  difficulty: 'Easy' | 'Medium' | 'Hard';
  highYieldTip?: string;
  referenceFormula?: string;
}

export type QuestionStatus = 'not_visited' | 'not_answered' | 'answered' | 'marked_for_review' | 'answered_marked_for_review';

export interface MockTest {
  id: string;
  title: string;
  examType: ExamType;
  durationMinutes: number;
  totalMarks: number;
  positiveMarks: number;
  negativeMarks: number;
  description: string;
  questions: Question[];
  isPYQ?: boolean;
  year?: number;
  sections?: {
    name: PharmacySubject;
    questionCount: number;
  }[];
}

export interface StudyNote {
  id: string;
  title: string;
  subject: PharmacySubject;
  topic: string;
  readTimeMinutes: number;
  keyHighlights: string[];
  summary: string;
  contentMarkdown: string;
  tables?: {
    title: string;
    headers: string[];
    rows: string[][];
  }[];
  mnemonics?: {
    mnemonic: string;
    expansion: string;
    explanation: string;
  }[];
  isHighYield: boolean;
  lastUpdated: string;
}

export interface UserCustomNote {
  id: string;
  title: string;
  subject: PharmacySubject;
  topic: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPinned?: boolean;
  associatedQuestionId?: string;
}

export interface PharmacyUpdate {
  id: string;
  title: string;
  category: 'Syllabus' | 'Exam Notification' | 'New Drug Approval' | 'Pharmacopoeia' | 'Regulatory';
  date: string;
  summary: string;
  detailedNotes: string;
  impactOnExams: string;
  tag: string;
  readMoreUrl?: string;
}

export interface StudyPlanDay {
  id: string;
  dateString: string;
  dayLabel: string;
  topics: {
    id: string;
    subject: PharmacySubject;
    title: string;
    estimatedMinutes: number;
    completed: boolean;
    examType: ExamType;
  }[];
}

export interface TestResult {
  id: string;
  testId: string;
  testTitle: string;
  examType: ExamType;
  date: string;
  score: number;
  maxScore: number;
  accuracy: number;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  markedForReview: number;
  timeSpentSeconds: number;
  userAnswers: Record<string, number>; // questionId -> option index
  questionStatuses: Record<string, QuestionStatus>;
  subjectBreakdown: Record<string, { correct: number; incorrect: number; total: number; score: number }>;
  estimatedPercentile: number;
  predictedAIR: number;
}

export interface DailyQuizRecord {
  date: string;
  score: number;
  totalQuestions: number;
  completed: boolean;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: PharmacySubject;
  topic: string;
  tag: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}
