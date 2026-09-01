'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { QuranPageData } from '@/lib/types';
import { fetchQuranPage } from '@/lib/quran-api';
import { AudioPlayer } from './AudioPlayer';
import { ShareModal } from './ShareModal';
import { Bookmark, Share2, CheckCircle, BookOpen, ChevronRight, ChevronLeft, Sparkles, FileText, Layers, Compass, AlertCircle, Copy, Check, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/lib/store';

interface QuranReaderProps {
  initialPage?: number;
}

const FONT_SIZES = [
  { label: 'S', size: 'text-xl sm:text-2xl sm:leading-[2.4]' },
  { label: 'M', size: 'text-2xl sm:text-3xl sm:leading-[2.8]' },
  { label: 'L', size: 'text-3xl sm:text-4xl sm:leading-[3.2]' },
];

export function QuranReader({ initialPage = 1 }: QuranReaderProps) {
  const [currentPageNum, setCurrentPageNum] = useState(initialPage);
  const [pageData, setPageData] = useState<QuranPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'quran' | 'tafsir' | 'benefits' | 'reflections'>('quran');
  const [activeTafsirSource, setActiveTafsirSource] = useState<'sadi' | 'ibn_kathir'>('sadi');
  const [viewMode, setViewMode] = useState<'mushaf' | 'bilingual' | 'english'>('mushaf');
  const [activeVerseIndex, setActiveVerseIndex] = useState<number | null>(null);
  const [fontSizeIndex, setFontSizeIndex] = useState(1); // M (Default)
  const [copiedAyahKey, setCopiedAyahKey] = useState<string | null>(null);
  const [isZenMode, setIsZenMode] = useState(false);
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

  // Set default view mode based on language
  useEffect(() => {
    if (!isAr && viewMode === 'mushaf') {
      setViewMode('bilingual');
    }
  }, [isAr]);

  const handleNextPage = useCallback(() => {
    if (currentPageNum < 604) setCurrentPageNum(prev => prev + 1);
  }, [currentPageNum]);

  const handlePrevPage = useCallback(() => {
    if (currentPageNum > 1) setCurrentPageNum(prev => prev - 1);
  }, [currentPageNum]);

  // Keyboard navigation for page turning & ESC for Zen mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'Escape' && isZenMode) {
        setIsZenMode(false);
      } else if (e.key === 'ArrowRight') {
        if (isAr) handlePrevPage();
        else handleNextPage();
      } else if (e.key === 'ArrowLeft') {
        if (isAr) handleNextPage();
        else handlePrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAr, isZenMode, handleNextPage, handlePrevPage]);

  const handleCopyVerse = (verseKey: string, arabicText: string, translation?: string) => {
    const textToCopy = isAr
      ? `﴿ ${arabicText} ﴾ [${pageData?.surah_name_ar || ''} : ${verseKey}] - عبر منصة مَعِين`
      : `"${translation || arabicText}" [${pageData?.surah_name_en || ''} : ${verseKey}] - via Maeen Platform`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedAyahKey(verseKey);
    setTimeout(() => setCopiedAyahKey(null), 2000);
  };

  const openShareForPage = () => {
    if (!pageData) return;
    const firstVerse = pageData.verses[0]?.text_uthmani || '';
    setSelectedVerseText(firstVerse);
    setIsShareOpen(true);
  };

  return (
    <div className={`space-y-6 ${isZenMode ? 'fixed inset-0 z-50 overflow-y-auto bg-[var(--bg-light)] p-4 sm:p-8' : ''}`}>
      {/* Top Page Header Bar */}
      <div className="glass-panel rounded-3xl p-4 sm:p-6 shadow-sm flex flex-wrap items-center justify-between gap-4 border border-[var(--border-color)]">
        <div className="flex items-center gap-3">
          <button
            onClick={isAr ? handlePrevPage : handleNextPage}
            disabled={isAr ? currentPageNum <= 1 : currentPageNum >= 604}
            className="p-2.5 rounded-2xl bg-white dark:bg-[#131F1A] disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-[#1C2E27] transition-all shadow-2xs border border-gray-200/60 dark:border-white/10"
            title={isAr ? 'الصفحة السابقة (سهم يمين)' : 'Previous Page (Right Arrow)'}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-[#0A382C] dark:text-[#F0CA50]">
                {isAr ? (pageData?.surah_name_ar || 'جاري التحميل...') : (pageData?.surah_name_en || 'Loading...')}
              </span>
              <span className="text-xs bg-[#0A382C]/10 text-[#0A382C] dark:bg-[#F0CA50]/20 dark:text-[#F0CA50] px-3 py-1 rounded-full font-bold border border-transparent dark:border-[#F0CA50]/30">
                {isAr ? `الجزء ${pageData?.juz_number || 1}` : `Juz ${pageData?.juz_number || 1}`}
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {isAr ? `صفحة ${currentPageNum} من 604` : `Page ${currentPageNum} of 604`}
            </span>
          </div>

          <button
            onClick={isAr ? handleNextPage : handlePrevPage}
            disabled={isAr ? currentPageNum >= 604 : currentPageNum <= 1}
            className="p-2.5 rounded-2xl bg-white dark:bg-[#131F1A] disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-[#1C2E27] transition-all shadow-2xs border border-gray-200/60 dark:border-white/10"
            title={isAr ? 'الصفحة التالية (سهم يسار)' : 'Next Page (Left Arrow)'}
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
            className="w-32 sm:w-48 accent-[#C9A227] dark:accent-[#F0CA50]"
          />

          <button
            onClick={() => togglePageCompletion(currentPageNum)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
              isCompleted
                ? 'bg-emerald-600 dark:bg-emerald-500 text-white'
                : 'bg-emerald-50 text-emerald-700 dark:bg-[#0D241C] dark:text-emerald-300 hover:bg-emerald-100 border border-emerald-200 dark:border-[#1D785E]'
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
            onClick={() => setIsZenMode(!isZenMode)}
            className={`p-2 rounded-xl border transition-colors ${
              isZenMode
                ? 'bg-[#F0CA50] text-[#0A261E] border-[#F0CA50]'
                : 'border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-[#1C2E27]'
            }`}
            title={isZenMode ? (isAr ? 'إنهاء وضع القراءة الكامل (ESC)' : 'Exit Zen Mode (ESC)') : (isAr ? 'وضع القراءة الهادئة بملء الشاشة' : 'Zen Fullscreen Focus Mode')}
          >
            {isZenMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => toggleBookmark('page', currentPageNum, isAr ? `${pageData?.surah_name_ar || 'صفحة'} - صفحة ${currentPageNum}` : `${pageData?.surah_name_en || 'Page'} - Page ${currentPageNum}`)}
            className={`p-2 rounded-xl border transition-colors ${
              isBookmarked
                ? 'bg-[#C9A227] dark:bg-[#F0CA50] text-white dark:text-[#0A261E] border-[#C9A227] dark:border-[#F0CA50]'
                : 'border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-[#1C2E27]'
            }`}
            title={isAr ? 'حفظ الصفحة' : 'Bookmark Page'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          <button
            onClick={openShareForPage}
            className="p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-[#1C2E27] transition-colors"
            title={isAr ? 'مشاركة كصورة' : 'Share Card'}
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode Tabs & Font Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-color)] pb-3 text-sm font-semibold">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('quran')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all font-bold ${
              activeTab === 'quran'
                ? 'bg-[#0A382C] text-white dark:bg-[#F0CA50] dark:text-[#0A261E] shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1C2E27]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{isAr ? 'آيات الصفحة' : 'Page Verses'}</span>
          </button>

          <button
            onClick={() => setActiveTab('tafsir')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all font-bold ${
              activeTab === 'tafsir'
                ? 'bg-[#0A382C] text-white dark:bg-[#F0CA50] dark:text-[#0A261E] shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1C2E27]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{isAr ? 'التفسير المعتمد' : 'Verified Tafsir'}</span>
          </button>

          <button
            onClick={() => setActiveTab('benefits')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all font-bold ${
              activeTab === 'benefits'
                ? 'bg-[#0A382C] text-white dark:bg-[#F0CA50] dark:text-[#0A261E] shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1C2E27]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#F0CA50] dark:text-[#0A261E]" />
            <span>{isAr ? 'الفوائد والتدبر' : 'Key Learnings'}</span>
          </button>

          <button
            onClick={() => setActiveTab('reflections')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all font-bold ${
              activeTab === 'reflections'
                ? 'bg-[#0A382C] text-white dark:bg-[#F0CA50] dark:text-[#0A261E] shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1C2E27]'
            }`}
          >
            <Compass className="w-4 h-4 text-[#F0CA50] dark:text-[#0A261E]" />
            <span>{isAr ? 'لطائف وإعجاز بياني' : 'Linguistic & Scientific Gems'}</span>
          </button>
        </div>

        {/* View Mode & Font Size Controls */}
        {activeTab === 'quran' && (
          <div className="flex items-center gap-2">
            {/* Font Size Selector */}
            <div className="flex items-center bg-gray-100 dark:bg-[#131F1A] p-1 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-bold">
              {FONT_SIZES.map((item, idx) => (
                <button
                  key={item.label}
                  onClick={() => setFontSizeIndex(idx)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    fontSizeIndex === idx
                      ? 'bg-[#0A382C] text-white dark:bg-[#F0CA50] dark:text-[#0A261E] shadow-xs'
                      : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                  title={isAr ? `حجم الخط: ${item.label}` : `Font Size: ${item.label}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-gray-100 dark:bg-[#131F1A] p-1 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-bold">
              <button
                onClick={() => setViewMode('mushaf')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'mushaf'
                    ? 'bg-[#0A382C] text-white dark:bg-[#F0CA50] dark:text-[#0A261E] shadow-xs'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {isAr ? 'مصحف' : 'Arabic'}
              </button>
              <button
                onClick={() => setViewMode('bilingual')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'bilingual'
                    ? 'bg-[#0A382C] text-white dark:bg-[#F0CA50] dark:text-[#0A261E] shadow-xs'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {isAr ? 'مزدوج' : 'Bilingual'}
              </button>
              <button
                onClick={() => setViewMode('english')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'english'
                    ? 'bg-[#0A382C] text-white dark:bg-[#F0CA50] dark:text-[#0A261E] shadow-xs'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {isAr ? 'إنجليزي' : 'English'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area with Velvet Frame in Dark Mode */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-lg min-h-[450px] border border-[var(--border-color)]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-[#F0CA50] border-t-transparent rounded-full animate-spin"></div>
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
                  <div className="text-center py-5 quran-font text-3xl text-[#0A382C] dark:text-[#F0CA50] font-bold border-b border-[#F0CA50]/25">
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                  </div>
                )}

                {/* 1. MUSHAF SCRIPT VIEW */}
                {viewMode === 'mushaf' && (
                  <div className="p-6 sm:p-10 rounded-3xl bg-[#FAF6EC] dark:bg-[#0D1612] border border-[#C9A227]/30 dark:border-[#F0CA50]/35 shadow-inner">
                    <div className={`quran-font ${FONT_SIZES[fontSizeIndex].size} text-right space-x-reverse space-x-2`}>
                      {pageData.verses.map((v, idx) => {
                        const isActive = activeVerseIndex === idx;

                        return (
                          <span
                            key={v.id}
                            className={`inline rounded-xl px-2 py-1 transition-all duration-300 cursor-pointer ${
                              isActive
                                ? 'bg-[#F0CA50]/25 ring-2 ring-[#F0CA50] shadow-[0_0_15px_rgba(240,202,80,0.25)]'
                                : 'hover:text-[#F0CA50]'
                            }`}
                            title={`آية ${v.verse_number}`}
                            onClick={() => handleCopyVerse(v.verse_key, v.text_uthmani, v.translations?.[0]?.text)}
                          >
                            {v.text_uthmani}{' '}
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-sans font-bold mx-1 align-middle transition-colors ${
                              isActive
                                ? 'bg-[#F0CA50] text-[#0A261E]'
                                : 'bg-[#0A382C]/10 text-[#0A382C] dark:bg-[#F0CA50]/20 dark:text-[#F0CA50] border border-transparent dark:border-[#F0CA50]/30'
                            }`}>
                              {v.verse_number}
                            </span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. BILINGUAL VERSE-BY-VERSE VIEW */}
                {viewMode === 'bilingual' && (
                  <div className="space-y-4">
                    {pageData.verses.map((v, idx) => {
                      const isActive = activeVerseIndex === idx;
                      const isCopied = copiedAyahKey === v.verse_key;

                      return (
                        <div
                          key={v.id}
                          className={`p-5 rounded-2xl transition-all border ${
                            isActive
                              ? 'bg-amber-50/90 dark:bg-[#1A2822] border-[#F0CA50] ring-2 ring-[#F0CA50]/50 shadow-md'
                              : 'bg-white/80 dark:bg-[#101915] border-gray-200 dark:border-white/5'
                          }`}
                        >
                          <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-2.5 mb-2.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-extrabold text-[#0A382C] dark:text-[#F0CA50] bg-[#0A382C]/10 dark:bg-[#F0CA50]/20 px-2.5 py-1 rounded-lg font-mono">
                                {v.verse_key}
                              </span>
                              <button
                                onClick={() => handleCopyVerse(v.verse_key, v.text_uthmani, v.translations?.[0]?.text)}
                                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                                title={isAr ? 'نسخ الآية والترجمة' : 'Copy verse & translation'}
                              >
                                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>

                            <span className="quran-font text-xl text-right text-[#0A382C] dark:text-[#FFFFFF]">
                              {v.text_uthmani}
                            </span>
                          </div>
                          <p className="text-sm text-gray-800 dark:text-gray-100 font-sans leading-relaxed">
                            {v.translations?.[0]?.text || ''}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 3. ENGLISH ONLY VIEW */}
                {viewMode === 'english' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        English Translation (Sahih International - Quran.com)
                      </span>
                    </div>
                    {pageData.verses.map((v, idx) => {
                      const isActive = activeVerseIndex === idx;
                      const isCopied = copiedAyahKey === v.verse_key;

                      return (
                        <div
                          key={v.id}
                          className={`p-4 rounded-2xl transition-all border ${
                            isActive
                              ? 'bg-amber-50/90 dark:bg-[#1A2822] border-[#F0CA50] ring-2 ring-[#F0CA50]/50 shadow-md'
                              : 'bg-white/80 dark:bg-[#101915] border-gray-200 dark:border-white/5'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#0A382C] dark:text-[#F0CA50]">
                              [{v.verse_key}]
                            </span>
                            <button
                              onClick={() => handleCopyVerse(v.verse_key, v.text_uthmani, v.translations?.[0]?.text)}
                              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-200 transition-colors"
                              title="Copy translation"
                            >
                              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                          <span className="text-sm text-gray-800 dark:text-gray-100 font-sans leading-relaxed block mt-1">
                            {v.translations?.[0]?.text || ''}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tafsir' && pageData && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-color)] pb-3 gap-2">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#0A382C] dark:text-[#F0CA50]" />
                    <h3 className="font-bold text-lg">{isAr ? 'اختر التفسير المعتمد' : 'Select Verified Tafsir'}</h3>
                  </div>

                  <div className="flex bg-gray-100 dark:bg-[#131F1A] p-1.5 rounded-2xl text-xs font-bold border border-gray-200/60 dark:border-white/10">
                    <button
                      onClick={() => setActiveTafsirSource('sadi')}
                      className={`px-4 py-2 rounded-xl transition-all ${
                        activeTafsirSource === 'sadi' ? 'bg-[#0A382C] text-white dark:bg-[#F0CA50] dark:text-[#0A261E] shadow-xs' : 'text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {isAr ? 'تفسير السعدي (تيسير الكريم الرحمن)' : 'Tafsir As-Sa\'di'}
                    </button>
                    <button
                      onClick={() => setActiveTafsirSource('ibn_kathir')}
                      className={`px-4 py-2 rounded-xl transition-all ${
                        activeTafsirSource === 'ibn_kathir' ? 'bg-[#0A382C] text-white dark:bg-[#F0CA50] dark:text-[#0A261E] shadow-xs' : 'text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {isAr ? 'تفسير ابن كثير (تفسير القرآن العظيم)' : 'Tafsir Ibn Kathir'}
                    </button>
                  </div>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] dark:bg-[#0D1612] border border-[#C9A227]/30 dark:border-[#F0CA50]/30 leading-relaxed text-sm sm:text-base text-gray-800 dark:text-[#FBF9F2] space-y-4 shadow-inner">
                  <div className="text-xs font-bold text-[#0A382C] dark:text-[#F0CA50] pb-2 border-b border-gray-200 dark:border-white/10">
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
                <div className="flex items-center gap-2 text-[#0A382C] dark:text-[#F0CA50] font-bold text-lg border-b border-[var(--border-color)] pb-3">
                  <Sparkles className="w-5 h-5 fill-[#F0CA50] text-[#F0CA50]" />
                  <h3>{isAr ? 'فوائد وتدبر صفحة اليوم' : 'Key Learnings & Reflection'}</h3>
                </div>

                <ul className="space-y-3">
                  {(isAr ? pageData.benefits_ar : pageData.benefits_en)?.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 p-5 rounded-2xl bg-emerald-50/70 dark:bg-[#0D241C] border border-emerald-200/70 dark:border-[#1D785E] text-sm text-gray-800 dark:text-gray-200 shadow-2xs">
                      <span className="w-7 h-7 rounded-xl bg-[#0A382C] text-white dark:bg-[#F0CA50] dark:text-[#0A261E] flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
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
                <div className="flex items-center gap-2 text-[#0A382C] dark:text-[#F0CA50] font-bold text-lg border-b border-[var(--border-color)] pb-3">
                  <Compass className="w-5 h-5 text-[#F0CA50]" />
                  <h3>{isAr ? 'لطائف بيانية وإشارات إعجازية وتأملات' : 'Linguistic Gems & Reflections'}</h3>
                </div>

                {/* Linguistic Gem */}
                <div className="p-6 rounded-3xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/70 space-y-2">
                  <span className="text-xs font-bold text-amber-900 dark:text-[#F0CA50] uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#F0CA50]" />
                    {isAr ? 'لطيفة بيانية ولغوية موثقة:' : 'Scholarly Linguistic Nuance:'}
                  </span>
                  <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                    {isAr ? pageData.linguistic_gem_ar : pageData.linguistic_gem_en}
                  </p>
                </div>

                {/* Scientific / Cosmic Reflection */}
                <div className="p-6 rounded-3xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/70 space-y-2">
                  <span className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider flex items-center gap-2">
                    <Compass className="w-4 h-4 text-blue-600" />
                    {isAr ? 'إشارة إعجازية وتأمل كوني/نفسي:' : 'Cosmic & Psychological Harmony:'}
                  </span>
                  <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                    {isAr ? pageData.scientific_miracle_ar : pageData.scientific_miracle_en}
                  </p>
                </div>

                {/* AI-Assisted Reflection */}
                <div className="p-6 rounded-3xl bg-[#0A382C]/5 dark:bg-[#F0CA50]/10 border border-[#0A382C]/15 dark:border-[#F0CA50]/25 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0A382C] dark:text-[#F0CA50] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#F0CA50] fill-[#F0CA50]" />
                      {isAr ? 'إضاءة واستنباط بياني ذكي:' : 'AI Thematic Reflection Insight:'}
                    </span>
                    <span className="text-[10px] bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2.5 py-0.5 rounded-full font-bold">
                      {isAr ? 'بمساعدة الذكاء الاصطناعي' : 'AI-Assisted'}
                    </span>
                  </div>

                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    {isAr ? pageData.ai_reflection_ar : pageData.ai_reflection_en}
                  </p>

                  <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-300 flex items-start gap-2 leading-relaxed">
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
