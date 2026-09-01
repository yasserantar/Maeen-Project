'use client';

import React, { useState } from 'react';
import { useUserStore } from '@/lib/store';
import { Compass, CheckCircle2, Award, FileEdit, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ProgressTracker() {
  const { progress, togglePageCompletion, saveNote } = useUserStore();
  const isAr = progress.language === 'ar';
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [noteText, setNoteText] = useState<string>(progress.notes[1] || '');
  const [savedNoteSuccess, setSavedNoteSuccess] = useState(false);

  const completedCount = progress.completedPages.length;
  const percentage = ((completedCount / 604) * 100).toFixed(1);

  const handlePageClick = (page: number) => {
    setSelectedPage(page);
    setNoteText(progress.notes[page] || '');
  };

  const handleSaveNote = () => {
    saveNote(selectedPage, noteText);
    setSavedNoteSuccess(true);
    setTimeout(() => setSavedNoteSuccess(false), 2000);
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-8">
      {/* Overall Progress Summary Card */}
      <div className="bg-gradient-to-b from-[#0F382C] via-[#0A261E] to-[#0A1A14] dark:from-[#133F32] dark:via-[#0E2921] dark:to-[#0B1813] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#C9A227]/35 dark:border-[#F0CA50]/40 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#F0CA50] font-bold text-sm uppercase tracking-wider">
              <Compass className="w-5 h-5" />
              <span>{isAr ? 'مختصر ختمة القرآن الكريم' : 'Quran Completion Summary'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              {isAr ? `ختمت ${completedCount} صفحة من أصل 604 صفحة` : `Completed ${completedCount} of 604 pages`}
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-white/10 dark:bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/20 dark:border-[#F0CA50]/30 shadow-xs">
            <Award className="w-8 h-8 text-[#F0CA50]" />
            <div className="flex flex-col">
              <span className="text-2xl font-black text-[#F0CA50]">{percentage}%</span>
              <span className="text-xs text-gray-200/90 dark:text-gray-300">{isAr ? 'نسبة الإنجاز الكلية' : 'Total Completion'}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-black/30 h-4 rounded-full overflow-hidden p-0.5 border border-white/15 dark:border-white/10">
            <div
              className="bg-gradient-to-r from-[#F0CA50] to-[#D4AF37] h-full rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-200/90 dark:text-gray-300 font-medium">
            <span>{isAr ? `المتبقي: ${604 - completedCount} صفحة` : `Remaining: ${604 - completedCount} pages`}</span>
            <span>{isAr ? 'الهدف: ختم المصحف كاملاً (604 صفحة)' : 'Goal: Complete all 604 Quran pages'}</span>
          </div>
        </div>
      </div>

      {/* Grid of 604 Pages */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 border border-[var(--border-color)]">
        <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-color)] pb-3 gap-2">
          <h3 className="font-extrabold text-lg text-[#0A382C] dark:text-[#FFFFFF] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#F0CA50]" />
            <span>{isAr ? 'شبكة متابعة الـ 604 صفحة' : '604 Pages Progress Grid'}</span>
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {isAr ? 'انقر على الصفحات لتعديل حالة القراءة أو كتابة ملاحظة' : 'Click any page square to toggle status or add reflection notes'}
          </span>
        </div>

        <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 gap-2 max-h-80 overflow-y-auto custom-scrollbar p-1">
          {Array.from({ length: 604 }, (_, i) => i + 1).map((page) => {
            const isDone = progress.completedPages.includes(page);
            const isSelected = selectedPage === page;

            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`w-full aspect-square rounded-xl font-mono text-[11px] font-bold flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                  isSelected
                    ? 'ring-2 ring-[#F0CA50] ring-offset-2 dark:ring-offset-black'
                    : ''
                } ${
                  isDone
                    ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-xs'
                    : 'bg-gray-100 dark:bg-[#121C18] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#1C2C26] border border-gray-200/50 dark:border-white/5'
                }`}
                title={isAr ? `صفحة ${page} ${isDone ? '(مكتملة)' : ''}` : `Page ${page} ${isDone ? '(Completed)' : ''}`}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Page Details & Reflection Notes */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 border border-[var(--border-color)]">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center gap-2 text-[#0A382C] dark:text-[#FFFFFF] font-extrabold">
            <FileEdit className="w-5 h-5 text-[#F0CA50]" />
            <h3>{isAr ? `ملاحظات وتدبر صفحة ${selectedPage}` : `Reflection Notes - Page ${selectedPage}`}</h3>
          </div>

          <button
            onClick={() => {
              togglePageCompletion(selectedPage);
              if (!progress.completedPages.includes(selectedPage)) {
                triggerCelebration();
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
              progress.completedPages.includes(selectedPage)
                ? 'bg-emerald-600 dark:bg-emerald-500 text-white'
                : 'bg-gray-100 dark:bg-[#121C18] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#1C2C26] border border-gray-200/50 dark:border-white/10'
            }`}
          >
            {progress.completedPages.includes(selectedPage)
              ? (isAr ? 'صفحة مكتملة ✓' : 'Page Completed ✓')
              : (isAr ? 'تحديد كمكتملة' : 'Mark as Completed')}
          </button>
        </div>

        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder={isAr ? `اكتب تدبراتك الخاصة أو الفوائد التي استنبطتها عند قراءة الصفحة ${selectedPage}...` : `Write your personal reflections or key takeaways for page ${selectedPage}...`}
          rows={4}
          className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-[#101915] border border-gray-200 dark:border-white/10 outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-[#C9A227] dark:focus:border-[#F0CA50] transition-colors"
        />

        <button
          onClick={handleSaveNote}
          className="py-3 px-7 bg-[#0A382C] hover:bg-[#0F4C3A] dark:bg-[#F0CA50] dark:hover:bg-[#D4AF37] text-white dark:text-[#0A261E] font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
        >
          {savedNoteSuccess ? <Check className="w-4 h-4" /> : null}
          <span>{savedNoteSuccess ? (isAr ? 'تم حفظ الملاحظة!' : 'Note Saved!') : (isAr ? 'حفظ الملاحظة' : 'Save Note')}</span>
        </button>
      </div>
    </div>
  );
}
