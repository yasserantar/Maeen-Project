'use client';

import React, { useState } from 'react';
import { Hadith } from '@/lib/types';
import { Bookmark, Share2, ExternalLink, Info, CheckCircle2, Globe } from 'lucide-react';
import { useUserStore } from '@/lib/store';
import { ShareModal } from './ShareModal';

interface HadithCardProps {
  hadith: Hadith;
}

export function HadithCard({ hadith }: HadithCardProps) {
  const { progress, toggleBookmark } = useUserStore();
  const isAr = progress.language === 'ar';
  const [showExplanation, setShowExplanation] = useState(false);
  const [showEnglishTranslation, setShowEnglishTranslation] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const isBookmarked = progress.bookmarks.some(
    b => b.type === 'hadith' && b.id === hadith.id
  );

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 relative transition-all duration-300">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#0F4C3A]/10 text-[#0F4C3A] dark:bg-[#C9A227]/20 dark:text-[#C9A227] font-bold text-xs rounded-full">
            {isAr ? hadith.collection_ar : hadith.collection}
          </span>
          <span className="text-xs text-gray-500 font-medium">
            {isAr ? `حديث رقم ${hadith.hadith_number}` : `Hadith #${hadith.hadith_number}`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {isAr ? hadith.grading_ar : hadith.grading}
          </span>

          <button
            onClick={() => toggleBookmark('hadith', hadith.id, isAr ? `حديث ${hadith.hadith_number} - ${hadith.collection_ar}` : `Hadith ${hadith.hadith_number} - ${hadith.collection}`)}
            className={`p-2 rounded-xl border transition-colors ${
              isBookmarked
                ? 'bg-[#C9A227] text-white border-[#C9A227]'
                : 'border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title={isAr ? 'حفظ الحديث' : 'Bookmark Hadith'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          <button
            onClick={() => setIsShareOpen(true)}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={isAr ? 'مشاركة الحديث' : 'Share Hadith'}
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Narrator */}
      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
        {isAr ? `عن ${hadith.narrator_ar}` : `On the authority of ${hadith.narrator_en}`}
      </div>

      {/* Hadith Text Arabic */}
      <div className="quran-font text-xl sm:text-2xl leading-loose text-gray-900 dark:text-gray-100 text-right bg-[#F8F6F1]/50 dark:bg-[#0B1210]/50 p-5 rounded-xl border border-[#C9A227]/20">
        {hadith.text_ar}
      </div>

      {/* Hadith Text English Translation (Only in English mode or if toggled) */}
      {(!isAr || showEnglishTranslation) && (
        <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans border-l-2 border-[#0F4C3A] dark:border-[#C9A227] pl-4 py-1 italic">
          &ldquo;{hadith.text_en}&rdquo;
        </div>
      )}

      {/* Explanation & Translation Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center gap-2 text-xs font-bold text-[#0F4C3A] dark:text-[#C9A227] hover:underline"
        >
          <Info className="w-4 h-4" />
          <span>{showExplanation ? (isAr ? 'إخفاء الشرح والفوائد' : 'Hide Explanation') : (isAr ? 'عرض الشرح والفوائد' : 'View Explanation')}</span>
        </button>

        {isAr && (
          <button
            onClick={() => setShowEnglishTranslation(!showEnglishTranslation)}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0F4C3A] dark:hover:text-[#C9A227] font-medium"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{showEnglishTranslation ? 'إخفاء الترجمة الإنجليزية' : 'عرض الترجمة الإنجليزية'}</span>
          </button>
        )}
      </div>

      {showExplanation && (
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
          <p className="font-bold text-[#0F4C3A] dark:text-[#C9A227]">{isAr ? 'الشرح والفوائد الحديثية:' : 'Explanation & Key Learnings:'}</p>
          <p>{isAr ? hadith.explanation_ar : hadith.explanation_en}</p>
        </div>
      )}

      {/* Footer & Source Attribution */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-[var(--border-color)]">
        <span>{isAr ? `المصدر المعتمد: ${hadith.collection_ar}` : `Verified Source: ${hadith.collection}`}</span>
        <a
          href={hadith.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[#0F4C3A] dark:text-[#C9A227] hover:underline font-medium"
        >
          <span>{isAr ? 'التحقق عبر Sunnah.com' : 'Verify on Sunnah.com'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={isAr ? `${hadith.collection_ar} - حديث رقم ${hadith.hadith_number}` : `${hadith.collection} - Hadith #${hadith.hadith_number}`}
        text={isAr ? hadith.text_ar : hadith.text_en}
        source={isAr ? `منصة السنة النبوية (${hadith.collection_ar})` : `Sunnah Platform (${hadith.collection})`}
      />
    </div>
  );
}
