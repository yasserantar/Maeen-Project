'use client';

import React, { useState, useEffect } from 'react';
import { QuranPageData } from '@/lib/types';
import { fetchQuranPage } from '@/lib/quran-api';
import { AudioPlayer } from './AudioPlayer';
import { ShareModal } from './ShareModal';
import { Bookmark, Share2, CheckCircle, BookOpen, ChevronRight, ChevronLeft, Sparkles, FileText, Layers, Globe, Compass, AlertCircle } from 'lucide-react';
import { useUserStore } from '@/lib/store';

interface QuranReaderProps {
  initialPage?: number;
}

export function QuranReader({ initialPage = 1 }: QuranReaderProps) {
  const [currentPageNum, setCurrentPageNum] = useState(initialPage);
  const [pageData, setPageData] = useState<QuranPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'quran' | 'tafsir' | 'benefits' | 'reflections'>('quran');
  const [activeTafsirSource, setActiveTafsirSource] = useState<'sadi' | 'ibn_kathir'>('sadi');
  const [showTranslation, setShowTranslation] = useState(false);
  const [activeVerseIndex, setActiveVerseIndex] = useState<number | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedVerseText, setSelectedVerseText] = useState('');

  const { progress, togglePageCompletion, toggleBookmark } = useUserStore();
  const isAr = progress.language === 'ar';
  const isCompleted = progress.completedPages.includes(currentPageNum);
  const isBookmarked = progress.bookmarks.some(b => b.type === 'page' && b.id === currentPageNum);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setActiveVerseIndex(null);
    fetchQuranPage(currentPageNum).then((data) => {
      if (isMounted) {
        setPageData(data);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [currentPageNum]);

  const handleNextPage = () => {
    if (currentPageNum < 604) setCurrentPageNum(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPageNum > 1) setCurrentPageNum(prev => prev - 1);
  };

  const openShareForPage = () => {
    if (!pageData) return;
    const firstVerse = pageData.verses[0]?.text_uthmani || '';
    setSelectedVerseText(firstVerse);
    setIsShareOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Page Header Bar */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-4 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={isAr ? handlePrevPage : handleNextPage}
            disabled={isAr ? currentPageNum <= 1 : currentPageNum >= 604}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title={isAr ? 'الصفحة السابقة' : 'Previous Page'}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-[#0F4C3A] dark:text-[#C9A227]">
                {isAr ? (pageData?.surah_name_ar || 'جاري التحميل...') : (pageData?.surah_name_en || 'Loading...')}
              </span>
              <span className="text-xs bg-[#0F4C3A]/10 text-[#0F4C3A] dark:bg-[#C9A227]/20 dark:text-[#C9A227] px-2.5 py-0.5 rounded-full font-bold">
                {isAr ? `الجزء ${pageData?.juz_number || 1}` : `Juz ${pageData?.juz_number || 1}`}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {isAr ? `صفحة ${currentPageNum} من 604` : `Page ${currentPageNum} of 604`}
            </span>
          </div>

          <button
            onClick={isAr ? handleNextPage : handlePrevPage}
            disabled={isAr ? currentPageNum >= 604 : currentPageNum <= 1}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title={isAr ? 'الصفحة التالية' : 'Next Page'}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Page Selector Slider & Actions */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="range"
            min="1"
            max="604"
            value={currentPageNum}
            onChange={(e) => setCurrentPageNum(parseInt(e.target.value))}
            className="w-32 sm:w-48 accent-[#0F4C3A] dark:accent-[#C9A227]"
          />

          <button
            onClick={() => togglePageCompletion(currentPageNum)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
              isCompleted
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>
              {isCompleted
                ? (isAr ? 'أتممت القراءة' : 'Completed')
                : (isAr ? 'تعليم كمقروءة' : 'Mark as Read')}
            </span>
          </button>

          <button
            onClick={() => toggleBookmark('page', currentPageNum, isAr ? `${pageData?.surah_name_ar || 'صفحة'} - صفحة ${currentPageNum}` : `${pageData?.surah_name_en || 'Page'} - Page ${currentPageNum}`)}
            className={`p-2 rounded-xl border transition-colors ${
              isBookmarked
                ? 'bg-[#C9A227] text-white border-[#C9A227]'
                : 'border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title={isAr ? 'حفظ الصفحة' : 'Bookmark Page'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          <button
            onClick={openShareForPage}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={isAr ? 'مشاركة' : 'Share'}
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode Tabs (Quran / Tafsir / Benefits / Reflections) */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-color)] pb-2 text-sm font-semibold">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('quran')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'quran'
                ? 'bg-[#0F4C3A] text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{isAr ? 'آيات الصفحة' : 'Page Verses'}</span>
          </button>

          <button
            onClick={() => setActiveTab('tafsir')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'tafsir'
                ? 'bg-[#0F4C3A] text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{isAr ? 'التفسير المعتمد' : 'Verified Tafsir'}</span>
          </button>

          <button
            onClick={() => setActiveTab('benefits')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'benefits'
                ? 'bg-[#0F4C3A] text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'الفوائد والتدبر' : 'Key Learnings'}</span>
          </button>

          <button
            onClick={() => setActiveTab('reflections')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'reflections'
                ? 'bg-[#0F4C3A] text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Compass className="w-4 h-4 text-[#C9A227]" />
            <span>{isAr ? 'لطائف وإعجاز بياني' : 'Linguistic & Scientific Gems'}</span>
          </button>
        </div>

        {/* Optional Translation Toggle */}
        {activeTab === 'quran' && (
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
              showTranslation
                ? 'bg-[#C9A227] text-white border-[#C9A227]'
                : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isAr ? (showTranslation ? 'إخفاء الترجمة الإنجليزية' : 'عرض الترجمة الإنجليزية') : (showTranslation ? 'Hide English Translation' : 'Show English Translation')}</span>
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-10 shadow-sm min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-10 h-10 border-4 border-[#0F4C3A] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-500 font-medium">
              {isAr ? 'جاري تحميل آيات الصفحة المباركة...' : 'Loading Quran verses...'}
            </span>
          </div>
        ) : (
          <>
            {activeTab === 'quran' && pageData && (
              <div className="space-y-8">
                {/* Continuous Audio Recitation Player for Full Page */}
                <AudioPlayer
                  verses={pageData.verses}
                  title={isAr ? `تلاوة صفحة ${currentPageNum} - ${pageData.surah_name_ar}` : `Recitation Page ${currentPageNum} - ${pageData.surah_name_en}`}
                  isAr={isAr}
                  onActiveVerseChange={(index) => setActiveVerseIndex(index)}
                />

                {/* Bismillah Header if start of surah */}
                {pageData.verses.some(v => v.verse_number === 1) && (
                  <div className="text-center py-4 quran-font text-2xl text-[#0F4C3A] dark:text-[#C9A227] font-bold border-b border-[#C9A227]/20">
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                  </div>
                )}

                {/* Verses Text with Active Recitation Highlighting */}
                <div className="quran-font text-2xl sm:text-3xl leading-[2.6] text-right text-gray-900 dark:text-gray-100 space-x-reverse space-x-2">
                  {pageData.verses.map((v, idx) => {
                    const isActive = activeVerseIndex === idx;

                    return (
                      <span
                        key={v.id}
                        className={`inline rounded-lg px-1.5 py-0.5 transition-all duration-300 cursor-pointer ${
                          isActive
                            ? 'bg-[#C9A227]/25 text-[#0F4C3A] dark:text-[#C9A227] ring-2 ring-[#C9A227] shadow-xs'
                            : 'hover:text-[#C9A227]'
                        }`}
                        title={`آية ${v.verse_number}`}
                      >
                        {v.text_uthmani}{' '}
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-sans font-bold mx-1 align-middle transition-colors ${
                          isActive
                            ? 'bg-[#C9A227] text-white'
                            : 'bg-[#0F4C3A]/10 text-[#0F4C3A] dark:bg-[#C9A227]/20 dark:text-[#C9A227]'
                        }`}>
                          {v.verse_number}
                        </span>
                      </span>
                    );
                  })}
                </div>

                {/* Translation Box (Only if enabled or in English mode) */}
                {(showTranslation || !isAr) && (
                  <div className="pt-6 border-t border-[var(--border-color)] space-y-3">
                    <h4 className="font-bold text-xs text-[#0F4C3A] dark:text-[#C9A227] uppercase tracking-wider">
                      English Translation (Sahih International)
                    </h4>
                    <div className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                      {pageData.verses.map((v, idx) => (
                        <p key={v.id} className={activeVerseIndex === idx ? 'font-semibold text-[#0F4C3A] dark:text-[#C9A227]' : ''}>
                          <span className="font-bold text-[#0F4C3A] dark:text-[#C9A227] mr-1">[{v.verse_key}]</span>
                          {v.translations?.[0]?.text || ''}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tafsir' && pageData && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-color)] pb-3 gap-2">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#0F4C3A] dark:text-[#C9A227]" />
                    <h3 className="font-bold text-lg">{isAr ? 'اختر التفسير المعتمد' : 'Select Verified Tafsir'}</h3>
                  </div>

                  <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl text-xs font-bold">
                    <button
                      onClick={() => setActiveTafsirSource('sadi')}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        activeTafsirSource === 'sadi' ? 'bg-[#0F4C3A] text-white' : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {isAr ? 'تفسير السعدي (تيسير الكريم الرحمن)' : 'Tafsir As-Sa\'di'}
                    </button>
                    <button
                      onClick={() => setActiveTafsirSource('ibn_kathir')}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        activeTafsirSource === 'ibn_kathir' ? 'bg-[#0F4C3A] text-white' : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {isAr ? 'تفسير ابن كثير (تفسير القرآن العظيم)' : 'Tafsir Ibn Kathir'}
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-[#F8F6F1] dark:bg-[#0B1210] border border-[#C9A227]/30 leading-relaxed text-sm sm:text-base text-gray-800 dark:text-gray-200 space-y-4">
                  <div className="text-xs font-bold text-[#0F4C3A] dark:text-[#C9A227] pb-2 border-b border-gray-200 dark:border-gray-800">
                    {activeTafsirSource === 'sadi'
                      ? (isAr ? 'المصدر: تفسير الشيخ عبد الرحمن بن ناصر السعدي رحمه الله' : 'Source: Tafsir Shaykh Abd ar-Rahman as-Sa\'di')
                      : (isAr ? 'المصدر: تفسير الحافظ ابن كثير رحمه الله' : 'Source: Tafsir Hafiz Ibn Kathir')}
                  </div>
                  <p className="leading-loose">
                    {activeTafsirSource === 'sadi'
                      ? (isAr ? pageData.tafsir_sadi_ar : pageData.tafsir_sadi_en)
                      : (isAr ? pageData.tafsir_ibn_kathir_ar : pageData.tafsir_ibn_kathir_en)}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'benefits' && pageData && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[#0F4C3A] dark:text-[#C9A227] font-bold text-lg border-b border-[var(--border-color)] pb-3">
                  <Sparkles className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <h3>{isAr ? 'فوائد وتدبر صفحة اليوم' : 'Key Learnings & Reflection'}</h3>
                </div>

                <ul className="space-y-3">
                  {(isAr ? pageData.benefits_ar : pageData.benefits_en)?.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 text-sm text-gray-800 dark:text-gray-200">
                      <span className="w-6 h-6 rounded-full bg-[#0F4C3A] text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reflections' && pageData && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[#0F4C3A] dark:text-[#C9A227] font-bold text-lg border-b border-[var(--border-color)] pb-3">
                  <Compass className="w-5 h-5" />
                  <h3>{isAr ? 'لطائف بيانية وإشارات إعجازية وتأملات' : 'Linguistic Gems & Reflections'}</h3>
                </div>

                {/* Linguistic Gem */}
                <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/70 space-y-2">
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#C9A227]" />
                    {isAr ? 'لطيفة بيانية ولغوية موثقة:' : 'Scholarly Linguistic Nuance:'}
                  </span>
                  <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                    {isAr ? pageData.linguistic_gem_ar : pageData.linguistic_gem_en}
                  </p>
                </div>

                {/* Scientific / Cosmic Reflection */}
                <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-800/70 space-y-2">
                  <span className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-blue-600" />
                    {isAr ? 'إشارة إعجازية وتأمل كوني/نفسي:' : 'Cosmic & Psychological Harmony:'}
                  </span>
                  <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                    {isAr ? pageData.scientific_miracle_ar : pageData.scientific_miracle_en}
                  </p>
                </div>

                {/* AI-Assisted Reflection with explicit scholarly caution disclaimer */}
                <div className="p-5 rounded-2xl bg-[#0F4C3A]/5 dark:bg-[#C9A227]/10 border border-[#0F4C3A]/20 dark:border-[#C9A227]/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0F4C3A] dark:text-[#C9A227] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#C9A227] fill-[#C9A227]" />
                      {isAr ? 'إضاءة واستنباط بياني ذكي:' : 'AI Thematic Reflection Insight:'}
                    </span>
                    <span className="text-[10px] bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full font-bold">
                      {isAr ? 'بمساعدة الذكاء الاصطناعي' : 'AI-Assisted'}
                    </span>
                  </div>

                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    {isAr ? pageData.ai_reflection_ar : pageData.ai_reflection_en}
                  </p>

                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2 leading-relaxed">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                    <span>
                      {isAr
                        ? 'تنبيه وأمانة علمية: هذه الإضاءة هي استنباط بياني تأملي للاستئناس والتدبر والتفكر، ولا تحل محل التفاسير المأثورة المعتمدة عن سلف الأمة وعلماء التفسير.'
                        : 'Notice: This thematic reflection is an exploratory contemplative insight for reflection and does not replace established scholarly Tafsir.'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={isAr ? `${pageData?.surah_name_ar || 'قرآن كريم'} - صفحة ${currentPageNum}` : `${pageData?.surah_name_en || 'Holy Quran'} - Page ${currentPageNum}`}
        text={selectedVerseText}
        source={isAr ? `مصدر القرآن الكريم (مصحف المدينة النبوية - صفحة ${currentPageNum})` : `Quran Source (Medina Mushaf - Page ${currentPageNum})`}
      />
    </div>
  );
}
