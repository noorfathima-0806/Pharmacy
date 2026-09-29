/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AppDownloadModal } from './components/AppDownloadModal';
import { DailyQuizView } from './components/DailyQuizView';
import { DashboardView } from './components/DashboardView';
import { FlashcardsView } from './components/FlashcardsView';
import { Header } from './components/Header';
import { MockExamScreen } from './components/MockExamScreen';
import { MockTestView } from './components/MockTestView';
import { MyNotesView } from './components/MyNotesView';
import { OfflineManagerModal } from './components/OfflineManagerModal';
import { PerformanceAnalyticsView } from './components/PerformanceAnalyticsView';
import { PreviousPapersView } from './components/PreviousPapersView';
import { NavTab, Sidebar } from './components/Sidebar';
import { StudyNotesView } from './components/StudyNotesView';
import { StudyPlannerView } from './components/StudyPlannerView';
import { UpdatesView } from './components/UpdatesView';
import { MOCK_TESTS, PHARMACY_UPDATES } from './data/pharmacyData';
import { ExamType, MockTest, PharmacySubject, StudyPlanDay, TestResult, UserCustomNote } from './types/pharmacy';
import {
  addStudyTopic,
  deleteUserNote,
  getBookmarkedQuestions,
  getDailyStreak,
  getOfflineStatus,
  getStudyPlan,
  getTargetExam,
  getTargetExamDate,
  getTestResults,
  getUserNotes,
  incrementStreak,
  saveTestResult,
  saveUserNote,
  setOfflineStatus,
  setTargetExam,
  setTargetExamDate,
  toggleBookmarkQuestion,
  togglePinUserNote,
  toggleStudyTopicCompleted,
} from './utils/storage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [currentExam, setCurrentExamState] = useState<ExamType>('GPAT');
  const [examDateStr, setExamDateState] = useState<string>('2026-05-15');
  const [streak, setStreak] = useState<number>(3);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [userNotes, setUserNotes] = useState<UserCustomNote[]>([]);
  const [studyPlan, setStudyPlan] = useState<StudyPlanDay[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [activeMockTest, setActiveMockTest] = useState<MockTest | null>(null);
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedStudyNoteId, setSelectedStudyNoteId] = useState<string | null>(null);
  const [initialEditingNoteId, setInitialEditingNoteId] = useState<string | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Initialize storage states
  useEffect(() => {
    setCurrentExamState(getTargetExam());
    setExamDateState(getTargetExamDate());
    const streakInfo = getDailyStreak();
    setStreak(streakInfo.streak);
    setIsOffline(getOfflineStatus());
    setUserNotes(getUserNotes());
    setStudyPlan(getStudyPlan());
    setTestResults(getTestResults());
    setBookmarkedIds(getBookmarkedQuestions());
  }, []);

  const handleSelectExam = (exam: ExamType) => {
    setCurrentExamState(exam);
    setTargetExam(exam);
  };

  const handleUpdateExamDate = (date: string) => {
    setExamDateState(date);
    setTargetExamDate(date);
  };

  const handleToggleOffline = () => {
    const next = !isOffline;
    setIsOffline(next);
    setOfflineStatus(next);
  };

  const handleIncrementStreak = () => {
    const newStreak = incrementStreak();
    setStreak(newStreak);
  };

  const handleSaveUserNote = (note: Omit<UserCustomNote, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => {
    const saved = saveUserNote(note);
    setUserNotes(getUserNotes());
    return saved;
  };

  const handleDeleteUserNote = (id: string) => {
    deleteUserNote(id);
    setUserNotes(getUserNotes());
  };

  const handleTogglePinNote = (id: string) => {
    togglePinUserNote(id);
    setUserNotes(getUserNotes());
  };

  const handleSaveResult = (result: TestResult) => {
    saveTestResult(result);
    setTestResults(getTestResults());
  };

  const handleToggleStudyTopic = (dayId: string, topicId: string) => {
    const updated = toggleStudyTopicCompleted(dayId, topicId);
    setStudyPlan(updated);
  };

  const handleAddStudyTopic = (
    dayId: string,
    topic: { subject: PharmacySubject; title: string; estimatedMinutes: number; examType: ExamType }
  ) => {
    const updated = addStudyTopic(dayId, topic);
    setStudyPlan(updated);
  };

  const handleToggleBookmark = (qId: string) => {
    const updated = toggleBookmarkQuestion(qId);
    setBookmarkedIds(updated);
  };

  const handleLaunchMock = (testId: string) => {
    const target = MOCK_TESTS.find((t) => t.id === testId);
    if (target) {
      setActiveMockTest(target);
    }
  };

  const handleSaveToPersonalNotes = (title: string, subject: string, content: string) => {
    handleSaveUserNote({
      title,
      subject: (subject as PharmacySubject) || 'Pharmacology',
      topic: 'High-Yield Takeaways',
      content,
      tags: ['Revision', currentExam],
      isPinned: false,
    });
  };

  const handleOpenStudyNoteFromDashboard = (noteId: string) => {
    setSelectedStudyNoteId(noteId);
    setCurrentTab('study-notes');
  };

  const handleOpenNewNote = () => {
    setInitialEditingNoteId(null);
    setCurrentTab('my-notes');
  };

  // Count uncompleted plan tasks
  const uncompletedPlanTasks = studyPlan.reduce(
    (acc, day) => acc + day.topics.filter((t) => !t.completed).length,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* 1. Header */}
      <Header
        currentExam={currentExam}
        onSelectExam={handleSelectExam}
        examDateStr={examDateStr}
        onUpdateExamDate={handleUpdateExamDate}
        streak={streak}
        isOffline={isOffline}
        onToggleOffline={handleToggleOffline}
        onOpenQuickQuiz={() => setCurrentTab('daily-quiz')}
        onOpenNewNote={handleOpenNewNote}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* 2. Main Layout (Sidebar + Content View) */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            if (tab !== 'study-notes') setSelectedStudyNoteId(null);
          }}
          currentExam={currentExam}
          userNotesCount={userNotes.length}
          uncompletedPlanTasks={uncompletedPlanTasks}
          onOpenOfflineModal={() => setIsOfflineModalOpen(true)}
          onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
          isOffline={isOffline}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {currentTab === 'dashboard' && (
            <DashboardView
              currentExam={currentExam}
              examDateStr={examDateStr}
              onNavigate={(tab) => setCurrentTab(tab)}
              onStartDailyQuiz={() => setCurrentTab('daily-quiz')}
              onStartMock={handleLaunchMock}
              streak={streak}
              studyPlan={studyPlan}
              onTogglePlanTask={handleToggleStudyTopic}
              recentResults={testResults}
              userNotes={userNotes}
              updates={PHARMACY_UPDATES}
              onOpenNewNote={handleOpenNewNote}
              onOpenStudyNote={handleOpenStudyNoteFromDashboard}
              onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
            />
          )}

          {currentTab === 'daily-quiz' && (
            <DailyQuizView
              onBackToDashboard={() => setCurrentTab('dashboard')}
              onIncrementStreak={handleIncrementStreak}
              onSaveToPersonalNotes={handleSaveToPersonalNotes}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {currentTab === 'mock-tests' && (
            <MockTestView
              currentExam={currentExam}
              onLaunchMock={handleLaunchMock}
              pastResults={testResults}
            />
          )}

          {currentTab === 'study-notes' && (
            <StudyNotesView
              onSaveToPersonalNotes={handleSaveToPersonalNotes}
              activeNoteId={selectedStudyNoteId}
              onClearActiveNote={() => setSelectedStudyNoteId(null)}
            />
          )}

          {currentTab === 'pyq-papers' && (
            <PreviousPapersView
              onLaunchMock={handleLaunchMock}
              onSaveToPersonalNotes={handleSaveToPersonalNotes}
            />
          )}

          {currentTab === 'my-notes' && (
            <MyNotesView
              notes={userNotes}
              onSaveNote={handleSaveUserNote}
              onDeleteNote={handleDeleteUserNote}
              onTogglePin={handleTogglePinNote}
              initialEditingNoteId={initialEditingNoteId}
            />
          )}

          {currentTab === 'flashcards' && <FlashcardsView />}

          {currentTab === 'study-planner' && (
            <StudyPlannerView
              currentExam={currentExam}
              examDateStr={examDateStr}
              onUpdateExamDate={handleUpdateExamDate}
              studyPlan={studyPlan}
              onToggleTopic={handleToggleStudyTopic}
              onAddTopic={handleAddStudyTopic}
            />
          )}

          {currentTab === 'analytics' && (
            <PerformanceAnalyticsView
              results={testResults}
              onLaunchMock={handleLaunchMock}
            />
          )}

          {currentTab === 'updates' && <UpdatesView />}
        </main>
      </div>

      {/* 3. Full-Screen CBT Mock Exam Simulation Modal */}
      {activeMockTest && (
        <MockExamScreen
          mockTest={activeMockTest}
          onExit={() => setActiveMockTest(null)}
          onSaveResult={handleSaveResult}
          onSaveToPersonalNotes={handleSaveToPersonalNotes}
        />
      )}

      {/* 4. Offline Manager Modal */}
      <OfflineManagerModal
        isOpen={isOfflineModalOpen}
        onClose={() => setIsOfflineModalOpen(false)}
        isOffline={isOffline}
        onToggleOffline={handleToggleOffline}
        userNotesCount={userNotes.length}
      />

      {/* 5. App Download & Installation Modal */}
      <AppDownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
}
