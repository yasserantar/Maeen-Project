'use client';

import React from 'react';
import { QuranReader } from '@/components/QuranReader';
import { useUserStore } from '@/lib/store';
import { BookOpen } from 'lucide-react';

export default function QuranPage() {
  const { progress } = useUserStore();
  const isAr = progress.language === 'ar';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0F4C3A] text-[#C9A227] flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#0F4C3A] dark:text-[#C9A227]">
              {isAr ? 'قراءة القرآن الكريم والتفسير' : 'Daily Quran Page & Tafsir'}
            </h1>
            <p className="text-xs text-gray-500">
              {isAr ? 'تلاوة موثوقة بمصف المدينة النبوية وتفسير السعدي وابن كثير' : 'Verified Medina Mushaf text with Tafsir As-Sa\'di & Ibn Kathir'}
            </p>
          </div>
        </div>
      </div>

      <QuranReader initialPage={progress.currentPage || 1} />
    </div>
  );
}
