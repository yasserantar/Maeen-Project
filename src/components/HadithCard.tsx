'use client';

import React, { useState } from 'react';
import { Hadith } from '@/lib/types';
import { Bookmark, Share2, ExternalLink, Info, CheckCircle2, Globe, Heart, Sparkles, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
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
  const [isCopied, setIsCopied] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const isBookmarked = progress.bookmarks.some(
    b => b.type === 'hadith' && b.id === hadith.id
  );

  const handleCopyHadith = () => {
    const textToCopy = isAr
      ? `قال رسول الله ﷺ:\n"${hadith.text_ar}"\n\n📌 الراوي: ${hadith.narrator_ar}\n📚 المصدر: ${hadith.collection_ar} (حديث رقم ${hadith.hadith_number} - ${hadith.grading_ar})\n💡 أثر الحديث: ${hadith.life_benefit_ar || ''}\n\n— عبر منصة مَعِين (https://maeen-app-five.vercel.app)`
      : `The Messenger of Allah ﷺ said:\n"${hadith.text_en}"\n\n📌 Narrator: ${hadith.narrator_en}\n📚 Source: ${hadith.collection} (Hadith #${hadith.hadith_number} - ${hadith.grading})\n\n— via Maeen Platform (https://maeen-app-five.vercel.app)`;

    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glow-card glass-panel rounded-3xl p-6 sm:p-8 shadow-md space-y-6 relative border border-[var(--border-color)] transition-all duration-300"
    >
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 bg-[#0A382C]/10 text-[#0A382C] dark:bg-[#F0CA50]/20 dark:text-[#F0CA50] font-extrabold text-xs rounded-full border border-transparent dark:border-[#F0CA50]/30">
            {isAr ? hadith.collection_ar : hadith.collection}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {isAr ? `حديث رقم ${hadith.hadith_number}` : `Hadith #${hadith.hadith_number}`}
          </span>
          {hadith.theme_ar && isAr && (
            <span className="text-[11px] bg-amber-50 dark:bg-[#2A200A] text-amber-900 dark:text-[#F0CA50] px-2.5 py-0.5 rounded-lg font-bold flex items-center gap-1 border border-amber-200/50 dark:border-[#F0CA50]/20">
              <Sparkles className="w-3 h-3 text-[#F0CA50]" />
              <span>{hadith.theme_ar}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-[#0D241C] dark:text-emerald-300 border border-emerald-200 dark:border-[#1D785E]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            {isAr ? hadith.grading_ar : hadith.grading}
          </span>

          <button
            onClick={handleCopyHadith}
            className="p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            title={isAr ? 'نسخ الحديث الشريف والمصدر' : 'Copy Hadith & citation'}
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />}
          </button>

          <button
            onClick={() => toggleBookmark('hadith', hadith.id, isAr ? `حديث ${hadith.hadith_number} - ${hadith.collection_ar}` : `Hadith ${hadith.hadith_number} - ${hadith.collection}`)}
            className={`p-2 rounded-xl border transition-colors ${
              isBookmarked
                ? 'bg-[#C9A227] dark:bg-[#F0CA50] text-white dark:text-[#0A261E] border-[#C9A227] dark:border-[#F0CA50]'
                : 'border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10'
            }`}
            title={isAr ? 'حفظ الحديث' : 'Bookmark Hadith'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          <button
            onClick={() => setIsShareOpen(true)}
            className="p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            title={isAr ? 'مشاركة الحديث' : 'Share Hadith'}
          >
            <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Narrator */}
      <div className="text-xs font-bold text-gray-500 dark:text-gray-400">
        {isAr ? `عن ${hadith.narrator_ar}` : `On the authority of ${hadith.narrator_en}`}
      </div>

      {/* Hadith Text Arabic */}
      <div className="quran-font text-xl sm:text-2xl leading-loose text-gray-900 dark:text-[#FFFFFF] text-right bg-[#FAF6EC] dark:bg-[#0D1612] p-6 rounded-2xl border border-[#C9A227]/25 dark:border-[#F0CA50]/30 shadow-inner">
        {hadith.text_ar}
      </div>

      {/* Life Benefit / Impact in Daily Life */}
      {hadith.life_benefit_ar && isAr && (
        <div className="p-5 rounded-2xl bg-emerald-50/80 dark:bg-[#0D241C] border border-emerald-200/80 dark:border-[#1D785E] text-xs sm:text-sm text-gray-800 dark:text-[#E2F0EA] space-y-1.5 shadow-2xs">
          <div className="flex items-center gap-1.5 font-extrabold text-[#0A382C] dark:text-[#F0CA50]">
            <Heart className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-current" />
            <span>أثر هذا الحديث في حياتك اليومية:</span>
          </div>
          <p className="leading-relaxed font-medium">{hadith.life_benefit_ar}</p>
        </div>
      )}

      {/* Hadith Text English Translation (Only in English mode or if toggled) */}
      {(!isAr || showEnglishTranslation) && (
        <div className="text-sm text-gray-800 dark:text-gray-100 leading-relaxed font-sans border-l-2 border-[#0A382C] dark:border-[#F0CA50] pl-4 py-1 italic bg-white/60 dark:bg-[#131F1A] p-4 rounded-xl">
          &ldquo;{hadith.text_en}&rdquo;
        </div>
      )}

      {/* Explanation & Translation Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center gap-2 text-xs font-extrabold text-[#0A382C] dark:text-[#F0CA50] hover:underline"
        >
          <Info className="w-4 h-4" />
          <span>{showExplanation ? (isAr ? 'إخفاء الشرح والفوائد' : 'Hide Explanation') : (isAr ? 'عرض الشرح والتفصيل العلمي' : 'View Explanation')}</span>
        </button>

        {isAr && (
          <button
            onClick={() => setShowEnglishTranslation(!showEnglishTranslation)}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0A382C] dark:hover:text-[#F0CA50] font-bold"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{showEnglishTranslation ? 'إخفاء الترجمة الإنجليزية' : 'عرض الترجمة الإنجليزية'}</span>
          </button>
        )}
      </div>

      {showExplanation && (
        <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#101915] border border-gray-200 dark:border-white/10 text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed space-y-2">
          <p className="font-extrabold text-[#0A382C] dark:text-[#F0CA50]">{isAr ? 'الشرح والفوائد الحديثية:' : 'Explanation & Key Learnings:'}</p>
          <p className="leading-loose">{isAr ? hadith.explanation_ar : hadith.explanation_en}</p>
        </div>
      )}

      {/* Footer & Source Attribution */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-[var(--border-color)]">
        <span>{isAr ? `المصدر المعتمد: ${hadith.collection_ar}` : `Verified Source: ${hadith.collection}`}</span>
        <a
          href={hadith.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[#0A382C] dark:text-[#F0CA50] hover:underline font-bold"
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
    </motion.div>
  );
}
