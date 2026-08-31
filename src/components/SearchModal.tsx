'use client';

import React, { useState } from 'react';
import { Search, X, BookOpen, Scroll } from 'lucide-react';
import Link from 'next/link';
import { SURAH_NAMES } from '@/lib/quran-api';
import { VERIFIED_HADITHS } from '@/lib/hadith-api';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const surahResults = Object.entries(SURAH_NAMES)
    .filter(([_, info]) => 
      info.ar.includes(query) || info.en.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5);

  const hadithResults = VERIFIED_HADITHS.filter(h =>
    h.text_ar.includes(query) || 
    h.text_en.toLowerCase().includes(query.toLowerCase()) ||
    h.narrator_ar.includes(query) ||
    h.collection.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[var(--card-bg)] w-full max-w-2xl rounded-2xl p-4 sm:p-6 border border-[var(--border-color)] shadow-2xl space-y-4">
        {/* Search Header */}
        <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-3">
          <Search className="w-5 h-5 text-[#0F4C3A] dark:text-[#C9A227]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في السور، الآيات، الأحاديث، أو الموضعات..."
            className="flex-1 bg-transparent border-none outline-none text-base text-gray-900 dark:text-gray-100 placeholder-gray-400"
            autoFocus
          />
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto custom-scrollbar space-y-4 pt-2">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-sm text-gray-400">
              اكتب كلمة للبحث في القرآن الكريم والتفسير المعتمد والأحاديث الصحيحة...
            </div>
          ) : (
            <>
              {/* Surah Matches */}
              {surahResults.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#0F4C3A] dark:text-[#C9A227] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>سور القرآن الكريم</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {surahResults.map(([id, info]) => (
                      <Link
                        key={id}
                        href="/quran"
                        onClick={onClose}
                        className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between transition-colors"
                      >
                        <span className="font-semibold text-sm">سورة {info.ar}</span>
                        <span className="text-xs text-gray-400">{info.en}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Hadith Matches */}
              {hadithResults.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-[#0F4C3A] dark:text-[#C9A227] flex items-center gap-1.5">
                    <Scroll className="w-4 h-4" />
                    <span>الأحاديث النبوية الصحيحة</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {hadithResults.map((h) => (
                      <Link
                        key={h.id}
                        href="/hadith"
                        onClick={onClose}
                        className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 block space-y-1 transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs text-[#0F4C3A] dark:text-[#C9A227]">
                          <span>{h.collection_ar} - حديث رقم {h.hadith_number}</span>
                          <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md">{h.grading_ar}</span>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">{h.text_ar}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {surahResults.length === 0 && hadithResults.length === 0 && (
                <div className="text-center py-8 text-sm text-gray-400">
                  لم يتم العثور على نتائج تطابق &ldquo;{query}&rdquo;. جرب البحث بكلمة أخرى.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
