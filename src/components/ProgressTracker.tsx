'use client';

import React, { useState } from 'react';
import { useUserStore } from '@/lib/store';
import { Compass, CheckCircle2, Award, FileEdit, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ProgressTracker() {
  const { progress, togglePageCompletion, saveNote } = useUserStore();
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
      <div className="bg-gradient-to-r from-[#0F4C3A] to-[#16634d] text-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#C9A227] font-bold text-sm uppercase tracking-wider">
              <Compass className="w-5 h-5" />
              <span>مختصر ختمة القرآن الكريم</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              ختمت {completedCount} صفحة من أصل 604 صفحة
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/20">
            <Award className="w-8 h-8 text-[#C9A227]" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-[#C9A227]">{percentage}%</span>
              <span className="text-xs text-gray-200">نسبة الإنجاز الكلية</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-black/20 h-4 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="bg-[#C9A227] h-full rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-200 font-medium">
            <span>المتبقي: {604 - completedCount} صفحة</span>
            <span>الهدف: ختم المصحف كاملاً (604 صفحة)</span>
          </div>
        </div>
      </div>

      {/* Grid of 604 Pages */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
          <h3 className="font-bold text-lg text-[#0F4C3A] dark:text-[#C9A227] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>شبكة متابعة الـ 604 صفحة</span>
          </h3>
          <span className="text-xs text-gray-500">انقر على الصفحات لتعديل حالة القراءة أو كتابة ملاحظة</span>
        </div>

        <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 gap-1.5 max-h-72 overflow-y-auto custom-scrollbar p-1">
          {Array.from({ length: 604 }, (_, i) => i + 1).map((page) => {
            const isDone = progress.completedPages.includes(page);
            const isSelected = selectedPage === page;

            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`w-full aspect-square rounded-lg font-mono text-[10px] font-bold flex items-center justify-center transition-transform hover:scale-105 ${
                  isSelected
                    ? 'ring-2 ring-[#C9A227] ring-offset-2'
                    : ''
                } ${
                  isDone
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                title={`صفحة ${page} ${isDone ? '(مكتملة)' : ''}`}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Page Details & Reflection Notes */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center gap-2 text-[#0F4C3A] dark:text-[#C9A227] font-bold">
            <FileEdit className="w-5 h-5" />
            <h3>ملاحظات وتدبر صفحة {selectedPage}</h3>
          </div>

          <button
            onClick={() => {
              togglePageCompletion(selectedPage);
              if (!progress.completedPages.includes(selectedPage)) {
                triggerCelebration();
              }
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              progress.completedPages.includes(selectedPage)
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            {progress.completedPages.includes(selectedPage) ? 'صفحة مكتملة ✓' : 'تحديد كمكتملة'}
          </button>
        </div>

        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder={`اكتب تدبراتك الخاصة أو الفوائد التي استنبطتها عند قراءة الصفحة ${selectedPage}...`}
          rows={4}
          className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-[#0F4C3A] dark:focus:border-[#C9A227]"
        />

        <button
          onClick={handleSaveNote}
          className="py-2.5 px-6 bg-[#0F4C3A] hover:bg-[#0a382b] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          {savedNoteSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : null}
          <span>{savedNoteSuccess ? 'تم حفظ الملاحظة!' : 'حفظ الملاحظة'}</span>
        </button>
      </div>
    </div>
  );
}
