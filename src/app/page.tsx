'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Scroll, Compass, ShieldCheck, ArrowLeft, ArrowRight, Sparkles, Bell, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchQuranPage } from '@/lib/quran-api';
import { fetchDailyHadith } from '@/lib/hadith-api';
import { QuranPageData, Hadith } from '@/lib/types';
import { HadithCard } from '@/components/HadithCard';
import { DailyQuizCard } from '@/components/DailyQuizCard';
import { NotificationSettingsModal } from '@/components/NotificationSettingsModal';
import { useUserStore } from '@/lib/store';

export default function HomePage() {
  const [quranData, setQuranData] = useState<QuranPageData | null>(null);
  const [hadithData, setHadithData] = useState<Hadith | null>(null);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const { progress } = useUserStore();
  const isAr = progress.language === 'ar';
  const completedCount = progress.completedPages.length;
  const progressPercent = Math.round((completedCount / 604) * 100);

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const todayPage = (dayOfYear % 604) + 1;

    fetchQuranPage(todayPage).then(setQuranData);
    fetchDailyHadith(dayOfYear).then(setHadithData);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-16"
    >
      {/* 21st.dev / SupaHero Inspired Master Hero Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0F382C] via-[#0A261E] to-[#0A1A14] dark:from-[#154638] dark:via-[#0E2F26] dark:to-[#0B1A15] text-white p-8 sm:p-12 md:p-16 shadow-2xl border border-[#C9A227]/30 dark:border-[#F0CA50]/40"
      >
        {/* Ambient Radial Lighting Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9A227]/20 dark:bg-[#F0CA50]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-8">
          {/* Floating Pill Badge */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 dark:bg-black/40 border border-[#C9A227]/50 dark:border-[#F0CA50]/50 text-[#F0CA50] text-xs sm:text-sm font-bold backdrop-blur-md shadow-xs"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F0CA50] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F0CA50]"></span>
            </span>
            <Sparkles className="w-4 h-4 fill-[#F0CA50]" />
            <span>{isAr ? 'منصة القرآن والسنة اليومية الموثقة' : 'Verified Daily Quran & Authentic Sunnah'}</span>
          </motion.div>

          {/* Master Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.15]">
              {isAr ? (
                <>
                  معينك اليومي.. <br />
                  <span className="bg-gradient-to-r from-[#FFF5D6] via-[#F0CA50] to-[#D4AF37] bg-clip-text text-transparent">
                    نبعٌ صافٍ لقلبك وروحك
                  </span>
                </>
              ) : (
                <>
                  Maeen.. <br />
                  <span className="bg-gradient-to-r from-[#FFF5D6] via-[#F0CA50] to-[#D4AF37] bg-clip-text text-transparent">
                    Your Daily Divine Source
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-xl text-gray-200/90 dark:text-gray-100 font-medium leading-relaxed max-w-2xl">
              {isAr
                ? 'صفحة يومية واحدة من القرآن الكريم بتفسيرها المعتمد، مع حديث نبوي صحيح ونفيس يعالج همومك ويضيء يومك.'
                : 'One authentic Quran page daily with verified English translation (Sahih International) and tafsir, accompanied by authentic prophetic Hadiths.'}
            </p>
          </div>

          {/* Action CTAs with Shimmer Animation */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/quran"
                className="shimmer-btn px-7 py-4 rounded-2xl bg-[#F0CA50] hover:bg-[#D4AF37] text-[#0A261E] font-extrabold text-sm sm:text-base shadow-lg transition-all flex items-center gap-2.5"
              >
                <BookOpen className="w-5 h-5" />
                <span>{isAr ? 'ابدأ ورد اليوم الآن' : 'Start Today\'s Page'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/hadith"
                className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 dark:bg-black/30 dark:hover:bg-black/50 text-white font-bold text-sm sm:text-base border border-white/25 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Scroll className="w-5 h-5 text-[#F0CA50]" />
                <span>{isAr ? 'حديث اليوم الصحيح' : 'Today\'s Authentic Hadith'}</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <button
                onClick={() => setIsNotificationModalOpen(true)}
                className="px-5 py-4 rounded-2xl bg-[#F0CA50]/20 hover:bg-[#F0CA50]/30 text-[#FFF5D6] font-bold text-xs sm:text-sm border border-[#F0CA50]/50 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Bell className="w-4 h-4 text-[#F0CA50]" />
                <span>{isAr ? 'تفعيل التنبيه اليومي' : 'Set Daily Reminder'}</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Subtle Geometric Overlay */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(#F0CA50_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      </motion.section>

      {/* Refero / Bento Grid Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Large Bento Card (7 cols): Today's Quran Page Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 glow-card glass-panel rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#0A382C] text-[#F0CA50] flex items-center justify-center font-bold shadow-xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-extrabold text-lg text-[#0A382C] dark:text-[#FFFFFF]">
                    {isAr ? 'صفحة اليوم من القرآن الكريم' : 'Today\'s Quran Page'}
                  </h2>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {quranData ? (isAr ? `${quranData.surah_name_ar} • الجزء ${quranData.juz_number}` : `${quranData.surah_name_en} • Juz ${quranData.juz_number}`) : '...'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!isAr && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2.5 py-1 rounded-lg font-bold">
                    Sahih International
                  </span>
                )}
                <span className="text-xs bg-[#0A382C]/10 text-[#0A382C] dark:bg-[#F0CA50]/20 dark:text-[#F0CA50] px-3.5 py-1.5 rounded-full font-extrabold border border-transparent dark:border-[#F0CA50]/30">
                  {quranData ? (isAr ? `صفحة ${quranData.page_number}` : `Page ${quranData.page_number}`) : '...'}
                </span>
              </div>
            </div>

            {quranData && (
              <div className="space-y-4">
                {/* Quran Text Preview on Velvet Mushaf Plate */}
                <div className="p-6 rounded-2xl bg-[#FAF6EC] dark:bg-[#0D1612] border border-[#C9A227]/30 dark:border-[#F0CA50]/35 shadow-inner">
                  {isAr ? (
                    /* Arabic Mode Display */
                    <div className="quran-font text-xl sm:text-2xl leading-[2.6] text-right">
                      {quranData.verses.slice(0, 4).map(v => (
                        <span key={v.id} className="inline">
                          {v.text_uthmani}{' '}
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-sans font-bold text-[#0A382C] dark:text-[#F0CA50] bg-[#0A382C]/10 dark:bg-[#F0CA50]/20 mx-1 align-middle border border-transparent dark:border-[#F0CA50]/30">
                            {v.verse_number}
                          </span>{' '}
                        </span>
                      ))}
                      <span className="text-gray-400 font-sans text-sm">...</span>
                    </div>
                  ) : (
                    /* English Mode: Verified Bilingual Verse-by-Verse with Sahih International */
                    <div className="space-y-4 text-left">
                      {quranData.verses.slice(0, 3).map(v => (
                        <div key={v.id} className="p-3.5 rounded-xl bg-white/60 dark:bg-[#131F1A]/80 border border-gray-200/60 dark:border-white/5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold text-[#0A382C] dark:text-[#F0CA50] bg-[#0A382C]/10 dark:bg-[#F0CA50]/20 px-2 py-0.5 rounded-md font-mono">
                              {v.verse_key}
                            </span>
                            <span className="quran-font text-lg text-right text-[#0A382C] dark:text-[#F0CA50]">
                              {v.text_uthmani}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-100 font-medium leading-relaxed font-sans">
                            {v.translations?.[0]?.text || 'Translation loading...'}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Verified Tafsir Snapshot */}
                <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-[#0D241C] border border-emerald-200/70 dark:border-[#1D785E] text-xs sm:text-sm text-gray-800 dark:text-[#E2F0EA] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#0A382C] dark:text-[#F0CA50]">
                    <Sparkles className="w-4 h-4 text-[#F0CA50]" />
                    <span>{isAr ? 'مقتطف من تفسير السعدي:' : 'Tafsir As-Sa\'di Excerpt (English):'}</span>
                  </div>
                  <p className="line-clamp-2 leading-relaxed">
                    {isAr ? quranData.tafsir_sadi_ar : quranData.tafsir_sadi_en}
                  </p>
                </div>
              </div>
            )}
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/quran"
              className="shimmer-btn w-full py-4 bg-[#0A382C] hover:bg-[#0F4C3A] dark:bg-[#F0CA50] dark:hover:bg-[#D4AF37] text-white dark:text-[#0A261E] font-extrabold text-sm sm:text-base rounded-2xl text-center flex items-center justify-center gap-2 transition-all shadow-md mt-4"
            >
              <span>{isAr ? 'الانتقال لقراءة الصفحة والتفسير والاستماع' : 'Open Full Page, English Translation & Recitation'}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </motion.div>
        </motion.div>

        {/* Side Bento Column (5 cols): Journey & Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 space-y-6 flex flex-col justify-between"
        >
          {/* Bento Card: Quran Completion Journey Tracker */}
          <div className="glow-card glass-panel rounded-3xl p-6 space-y-5 border border-[var(--border-color)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-[#2A200A] text-[#F0CA50] flex items-center justify-center font-bold border border-[#F0CA50]/30">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-[#0A382C] dark:text-[#FFFFFF]">
                    {isAr ? 'رحلة ختم القرآن الكريم' : 'Quran Reading Journey'}
                  </h3>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                    {isAr ? '604 صفحة • خطة يومية مستمرة' : '604 Pages • Step-by-Step Plan'}
                  </span>
                </div>
              </div>

              <span className="text-sm font-extrabold text-[#F0CA50] bg-[#F0CA50]/15 dark:bg-[#F0CA50]/20 px-3 py-1 rounded-xl border border-[#F0CA50]/30">
                {progressPercent}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-[#0A120F] overflow-hidden p-0.5 border border-gray-200/50 dark:border-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#0A382C] via-[#F0CA50] to-[#D4AF37] transition-all duration-700 shadow-xs"
                  style={{ width: `${Math.max(progressPercent, 2)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                <span>{isAr ? `أتممت قراءة ${completedCount} صفحة` : `${completedCount} pages completed`}</span>
                <span>{isAr ? `المتبقي ${604 - completedCount} صفحة` : `${604 - completedCount} pages remaining`}</span>
              </div>
            </div>

            <Link
              href="/journey"
              className="w-full py-3 bg-gray-100 dark:bg-[#1A2621] hover:bg-gray-200 dark:hover:bg-[#23332C] text-[#0A382C] dark:text-[#F0CA50] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-transparent dark:border-white/5"
            >
              <span>{isAr ? 'عرض خريطة الـ 604 صفحة' : 'View Full 604-Page Journey Map'}</span>
              {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Link>
          </div>

          {/* Bento Card: Features Pill Matrix */}
          <div className="glow-card glass-panel rounded-3xl p-6 space-y-4 border border-[var(--border-color)]">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {isAr ? 'مميزات المنصة الأساسية' : 'Core Platform Guarantees'}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-[#0A382C]/5 dark:bg-[#15231E] border border-[#0A382C]/10 dark:border-white/10 space-y-1">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-bold text-xs block text-[#0A382C] dark:text-[#FFFFFF]">{isAr ? 'توثيق 100%' : '100% Verified'}</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight block">{isAr ? 'مصحف المدينة وأمهات السنة' : 'Medina Mushaf & Sunnah'}</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#C9A227]/5 dark:bg-[#1F2417] border border-[#C9A227]/10 dark:border-[#F0CA50]/20 space-y-1">
                <Star className="w-5 h-5 text-[#F0CA50]" />
                <span className="font-bold text-xs block text-[#0A382C] dark:text-[#FFFFFF]">{isAr ? 'بدون إعلانات' : '100% Ads Free'}</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight block">{isAr ? 'بيئة قراءة هادئة وناصعة' : 'Pure reading focus'}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Daily Tadabbur & Vocab Quiz Section */}
      <DailyQuizCard />

      {/* Today's Authentic Hadith Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#0A382C] text-[#F0CA50] flex items-center justify-center font-bold shadow-xs">
              <Scroll className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-xl text-[#0A382C] dark:text-[#FFFFFF]">
                {isAr ? 'حديث اليوم الصحيح والنفيس' : 'Today\'s Authentic & Precious Hadith'}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isAr ? 'من أمهات كتب السنة النبوية مع شرح الأثر في الحياة اليومية' : 'From canonical Sunnah collections with daily life impact'}
              </p>
            </div>
          </div>

          <Link
            href="/hadith"
            className="text-xs font-bold text-[#0A382C] dark:text-[#F0CA50] hover:underline flex items-center gap-1"
          >
            <span>{isAr ? 'أحاديث أخرى' : 'More Hadiths'}</span>
            {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Link>
        </div>

        {hadithData && <HadithCard hadith={hadithData} />}
      </motion.section>

      {/* 21st.dev Style Notification Banner */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0F382C] via-[#0A261E] to-[#0A1A14] dark:from-[#154638] dark:via-[#0E2F26] dark:to-[#0B1A15] text-white p-8 sm:p-12 shadow-xl border border-[#C9A227]/35 dark:border-[#F0CA50]/40 text-center space-y-6"
      >
        <div className="w-14 h-14 rounded-2xl bg-white/10 dark:bg-black/40 text-[#F0CA50] border border-white/20 dark:border-[#F0CA50]/30 flex items-center justify-center mx-auto shadow-md backdrop-blur-md">
          <Bell className="w-7 h-7" />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            {isAr ? 'لا تدع يوماً يمر دون وردك المبارك' : 'Never Let a Day Pass Without Your Source'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-200/90 dark:text-gray-100 leading-relaxed">
            {isAr
              ? 'اضبط تنبيهك اليومي ليصلك عبر المتصفح أو تقويم Google أو البريد في الوقت الذي يناسبك.'
              : 'Configure daily reminders through Browser notifications, Google Calendar, or Email at your preferred time.'}
          </p>
        </div>

        <div className="pt-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <button
              onClick={() => setIsNotificationModalOpen(true)}
              className="shimmer-btn px-8 py-4 bg-[#F0CA50] hover:bg-[#D4AF37] text-[#0A261E] font-extrabold text-sm rounded-2xl transition-all shadow-lg"
            >
              {isAr ? 'ضبط وتفعيل التنبيه اليومي' : 'Configure Daily Reminders'}
            </button>
          </motion.div>
        </div>
      </motion.section>

      <NotificationSettingsModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
    </motion.div>
  );
}
