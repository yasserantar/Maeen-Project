'use client';

import React, { useState } from 'react';
import { HadithCard } from '@/components/HadithCard';
import { VERIFIED_HADITHS } from '@/lib/hadith-api';
import { useUserStore } from '@/lib/store';
import { Scroll, Filter } from 'lucide-react';

export default function HadithPage() {
  const { progress } = useUserStore();
  const isAr = progress.language === 'ar';
  const [selectedCollection, setSelectedCollection] = useState<string>('all');

  const collections = [
    { id: 'all', name_ar: 'جميع كتب السنة', name_en: 'All Canonical Collections' },
    { id: 'Sahih al-Bukhari', name_ar: 'صحيح البخاري', name_en: 'Sahih al-Bukhari' },
    { id: 'Sahih Muslim', name_ar: 'صحيح مسلم', name_en: 'Sahih Muslim' },
    { id: 'Jami` at-Tirmidhi', name_ar: 'جامع الترمذي', name_en: 'Jami` at-Tirmidhi' },
  ];

  const filteredHadiths = selectedCollection === 'all'
    ? VERIFIED_HADITHS
    : VERIFIED_HADITHS.filter(h => h.collection === selectedCollection);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-color)] pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0F4C3A] text-[#C9A227] flex items-center justify-center font-bold">
            <Scroll className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#0F4C3A] dark:text-[#C9A227]">
              {isAr ? 'الأحاديث النبوية الصحيحة' : 'Authentic Daily Hadith'}
            </h1>
            <p className="text-xs text-gray-500">
              {isAr ? 'أحاديث نبوية موثقة ومخرجة من كتب الصحاح مع التفسير والشرح' : 'Verified narrations from Sahih Al-Bukhari, Muslim, and canonical Sunnah books'}
            </p>
          </div>
        </div>

        {/* Collection Filter */}
        <div className="flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--border-color)] p-1 rounded-xl text-xs font-bold">
          <Filter className="w-4 h-4 ml-1 text-[#0F4C3A] dark:text-[#C9A227]" />
          {collections.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCollection(c.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedCollection === c.id
                  ? 'bg-[#0F4C3A] text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {isAr ? c.name_ar : c.name_en}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredHadiths.map(hadith => (
          <HadithCard key={hadith.id} hadith={hadith} />
        ))}
      </div>
    </div>
  );
}
