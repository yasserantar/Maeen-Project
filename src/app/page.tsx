'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Scroll, Compass, ShieldCheck, ArrowLeft, ArrowRight, Sparkles, Bell, Download, CheckCircle2, Bookmark, Flame, Star, ChevronLeft } from 'lucide-react';
import { fetchQuranPage } from '@/lib/quran-api';
import { fetchDailyHadith } from '@/lib/hadith-api';
import { QuranPageData, Hadith } from '@/lib/types';
import { HadithCard } from '@/components/HadithCard';
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
    <div className="space-y-16">
      {/* 21st.dev / SupaHero Inspired Master Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A382C] via-[#0F4C3A] to-[#061812] text-white p-8 sm:p-12 md:p-16 shadow-2xl border border-[#C9A227]/25">
        {/* Ambient Radial Glow Effect */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9A227]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-8">
          {/* Floating Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-[#C9A227]/40 text-[#C9A227] text-xs sm:text-sm font-bold backdrop-blur-md shadow-xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A227] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A227]"></span>
            </span>
            <Sparkles className="w-4 h-4 fill-[#C9A227]" />
            <span>{isAr ? 'منصة القرآن والسنة اليومية الموثقة' : 'Verified Daily Quran & Authentic Sunnah'}</span>
          </div>

          {/* Master Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.15]">
              {isAr ? (
                <>
                  معينك اليومي.. <br />
                  <span className="bg-gradient-to-r from-[#FFF0C2] via-[#E5C158] to-[#C9A227] bg-clip-text text-transparent">
                    نبعٌ صافٍ لقلبك وروحك
                  </span>
                </>
              ) : (
                <>
                  Maeen.. <br />
                  <span className="bg-gradient-to-r from-[#FFF0C2] via-[#E5C158] to-[#C9A227] bg-clip-text text-transparent">
                    Your Daily Divine Source
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-xl text-gray-200/90 font-medium leading-relaxed max-w-2xl">
              {isAr
                ? 'صفحة يومية واحدة من القرآن الكريم بتفسيرها المعتمد، مع حديث نبوي صحيح ونفيس يعالج همومك ويضيء يومك.'
                : 'One authentic Quran page daily with verified tafsir, accompanied by deeply inspiring prophetic Hadiths.'}
            </p>
          </div>

          {/* Action CTAs with Shimmer Animation */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/quran"
              className="shimmer-btn px-7 py-4 rounded-2xl bg-[#C9A227] hover:bg-[#B89220] text-[#0A382C] font-extrabold text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
            >
              <BookOpen className="w-5 h-5" />
              <span>{isAr ? 'ابدأ ورد اليوم الآن' : 'Read Today\'s Quran Page'}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>

            <Link
              href="/hadith"
              className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Scroll className="w-5 h-5 text-[#C9A227]" />
              <span>{isAr ? 'حديث اليوم الصحيح' : 'Today\'s Hadith'}</span>
            </Link>

            <button
              onClick={() => setIsNotificationModalOpen(true)}
              className="px-5 py-4 rounded-2xl bg-[#C9A227]/20 hover:bg-[#C9A227]/30 text-[#FFF0C2] font-bold text-xs sm:text-sm border border-[#C9A227]/40 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Bell className="w-4 h-4 text-[#C9A227]" />
              <span>{isAr ? 'تفعيل التنبيه اليومي' : 'Daily Reminder'}</span>
            </button>
          </div>
        </div>

        {/* Subtle Islamic Geometric Mesh */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(#C9A227_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      </section>

      {/* Refero / Bento Grid Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Large Bento Card (7 cols): Today's Quran Page Preview */}
        <div className="lg:col-span-7 glow-card glass-panel rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0A382C] text-[#C9A227] flex items-center justify-center font-bold shadow-xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-[#0A382C] dark:text-[#C9A227]">
                    {isAr ? 'صفحة اليوم من القرآن الكريم' : 'Today\'s Quran Page'}
                  </h2>
                  <span className="text-xs text-gray-500">
                    {quranData ? (isAr ? `${quranData.surah_name_ar} • الجزء ${quranData.juz_number}` : `${quranData.surah_name_en} • Juz ${quranData.juz_number}`) : '...'}
                  </span>
                </div>
              </div>

              <span className="text-xs bg-[#0A382C]/10 text-[#0A382C] dark:bg-[#C9A227]/20 dark:text-[#C9A227] px-3.5 py-1.5 rounded-full font-extrabold shadow-2xs">
                {quranData ? (isAr ? `صفحة ${quranData.page_number}` : `Page ${quranData.page_number}`) : '...'}
              </span>
            </div>

            {quranData && (
              <div className="space-y-4">
                {/* Quran Text Preview */}
                <div className="quran-font text-xl sm:text-2xl leading-[2.6] text-right p-6 rounded-2xl bg-[#FAF8F5]/80 dark:bg-[#070D0B]/80 border border-[#C9A227]/25 shadow-inner">
                  {quranData.verses.slice(0, 4).map(v => (
                    <span key={v.id} className="inline">
                      {v.text_uthmani}{' '}
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-sans font-bold text-[#0A382C] dark:text-[#C9A227] bg-[#0A382C]/10 dark:bg-[#C9A227]/20 mx-1 align-middle">
                        {v.verse_number}
                      </span>{' '}
                    </span>
                  ))}
                  <span className="text-gray-400 font-sans text-sm">...</span>
                </div>

                {/* Verified Tafsir Snapshot */}
                <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/70 text-xs sm:text-sm text-gray-800 dark:text-gray-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#0A382C] dark:text-[#C9A227]">
                    <Sparkles className="w-4 h-4 text-[#C9A227]" />
                    <span>{isAr ? 'مقتطف من تفسير السعدي:' : 'Tafsir As-Sa\'di:'}</span>
                  </div>
                  <p className="line-clamp-2 leading-relaxed">
                    {isAr ? quranData.tafsir_sadi_ar : quranData.tafsir_sadi_en}
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/quran"
            className="shimmer-btn w-full py-4 bg-[#0A382C] hover:bg-[#0F4C3A] text-white font-bold text-sm sm:text-base rounded-2xl text-center flex items-center justify-center gap-2 transition-all shadow-md mt-4"
          >
            <span>{isAr ? 'الانتقال لقراءة الصفحة والتفسير والاستماع' : 'Open Full Page & Recitation'}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        {/* Side Bento Column (5 cols): Journey & Quick Stats */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          {/* Bento Card: Quran Completion Journey Tracker */}
          <div className="glow-card glass-panel rounded-3xl p-6 space-y-5 border border-[var(--border-color)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-[#C9A227] flex items-center justify-center font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#0A382C] dark:text-[#C9A227]">
                    {isAr ? 'رحلة ختم القرآن الكريم' : 'Quran Reading Journey'}
                  </h3>
                  <span className="text-[11px] text-gray-500">
                    {isAr ? '604 صفحة • خطة يومية مستمرة' : '604 Pages Visual Plan'}
                  </span>
                </div>
              </div>

              <span className="text-sm font-extrabold text-[#C9A227] bg-[#C9A227]/10 px-2.5 py-1 rounded-lg">
                {progressPercent}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden p-0.5 border border-gray-200/50 dark:border-gray-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#0A382C] to-[#C9A227] transition-all duration-700"
                  style={{ width: `${Math.max(progressPercent, 2)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
                <span>{isAr ? `أتممت قراءة ${completedCount} صفحة` : `${completedCount} pages read`}</span>
                <span>{isAr ? `المتبقي ${604 - completedCount} صفحة` : `${604 - completedCount} pages remaining`}</span>
              </div>
            </div>

            <Link
              href="/journey"
              className="w-full py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-[#0A382C] dark:text-[#C9A227] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>{isAr ? 'عرض خريطة الـ 604 صفحة' : 'View Full Journey Map'}</span>
              <ChevronLeft className="w-4 h-4 rtl:rotate-0 rotate-180" />
            </Link>
          </div>

          {/* Bento Card: Features Pill Matrix */}
          <div className="glow-card glass-panel rounded-3xl p-6 space-y-4 border border-[var(--border-color)]">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {isAr ? 'مميزات المنصة الأساسية' : 'Core Platform Guarantees'}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#0A382C]/5 dark:bg-[#0A382C]/20 border border-[#0A382C]/10 space-y-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-xs block text-[#0A382C] dark:text-[#C9A227]">{isAr ? 'توثيق 100%' : '100% Verified'}</span>
                <span className="text-[10px] text-gray-500 leading-tight block">{isAr ? 'مصحف المدينة وأمهات السنة' : 'Authentic texts only'}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#C9A227]/5 dark:bg-[#C9A227]/20 border border-[#C9A227]/10 space-y-1">
                <Star className="w-4 h-4 text-[#C9A227]" />
                <span className="font-bold text-xs block text-[#0A382C] dark:text-[#C9A227]">{isAr ? 'بدون إعلانات' : '100% Ads Free'}</span>
                <span className="text-[10px] text-gray-500 leading-tight block">{isAr ? 'بيئة قراءة هادئة وناصعة' : 'Pure reading focus'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Authentic Hadith Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0A382C] text-[#C9A227] flex items-center justify-center font-bold shadow-xs">
              <Scroll className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-xl text-[#0A382C] dark:text-[#C9A227]">
                {isAr ? 'حديث اليوم الصحيح والنفيس' : 'Today\'s Authentic Prophetic Hadith'}
              </h2>
              <p className="text-xs text-gray-500">
                {isAr ? 'من أمهات كتب السنة النبوية مع شرح الأثر في الحياة اليومية' : 'Verified Sunnah narration with daily life application'}
              </p>
            </div>
          </div>

          <Link
            href="/hadith"
            className="text-xs font-bold text-[#0A382C] dark:text-[#C9A227] hover:underline flex items-center gap-1"
          >
            <span>{isAr ? 'أحاديث أخرى' : 'More Hadiths'}</span>
            <ChevronLeft className="w-4 h-4 rtl:rotate-0 rotate-180" />
          </Link>
        </div>

        {hadithData && <HadithCard hadith={hadithData} />}
      </section>

      {/* 21st.dev Style Notification Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A382C] via-[#0F4C3A] to-[#125844] text-white p-8 sm:p-12 shadow-xl border border-[#C9A227]/30 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#C9A227] border border-white/15 flex items-center justify-center mx-auto shadow-md backdrop-blur-md">
          <Bell className="w-7 h-7" />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            {isAr ? 'لا تدع يوماً يمر دون وردك المبارك' : 'Never Miss Your Daily Quran & Hadith'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-200/80 leading-relaxed">
            {isAr
              ? 'اضبط تنبيهك اليومي ليصلك عبر المتصفح أو تقويم Google أو البريد في الوقت الذي يناسبك.'
              : 'Set a daily reminder via Browser notifications, Google Calendar, or Email.'}
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => setIsNotificationModalOpen(true)}
            className="shimmer-btn px-8 py-4 bg-[#C9A227] hover:bg-[#B89220] text-[#0A382C] font-extrabold text-sm rounded-2xl transition-all shadow-lg hover:scale-105"
          >
            {isAr ? 'ضبط وتفعيل التنبيه اليومي' : 'Configure Reminders'}
          </button>
        </div>
      </section>

      <NotificationSettingsModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
    </div>
  );
}
