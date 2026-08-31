'use client';

import React from 'react';
import { ProgressTracker } from '@/components/ProgressTracker';
import { useUserStore } from '@/lib/store';
import { Compass } from 'lucide-react';

export default function JourneyPage() {
  const { progress } = useUserStore();
  const isAr = progress.language === 'ar';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0F4C3A] text-[#C9A227] flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#0F4C3A] dark:text-[#C9A227]">
              {isAr ? 'رحلة ختم القرآن (604 صفحة)' : 'Quran Journey (604 Pages)'}
            </h1>
            <p className="text-xs text-gray-500">
              {isAr ? 'تابع قراءتك وتدبرك لصفحات المصحف الشريف صفحة بصفحة' : 'Track your daily reading progress and log your reflection notes'}
            </p>
          </div>
        </div>
      </div>

      <ProgressTracker />
    </div>
  );
}
