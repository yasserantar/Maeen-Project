'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Scroll, Compass, ShieldCheck, ArrowLeft, ArrowRight, Sparkles, Bell } from 'lucide-react';
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

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const todayPage = (dayOfYear % 604) + 1;

    fetchQuranPage(todayPage).then(setQuranData);
    fetchDailyHadith(dayOfYear).then(setHadithData);
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F4C3A] via-[#125844] to-[#0B1210] text-white p-8 sm:p-12 md:p-16 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/40 text-[#C9A227] text-xs font-bold">
            <Sparkles className="w-4 h-4 fill-[#C9A227]" />
            <span>{isAr ? 'منصة موثوقة للقرآن والسنة المطهرة' : 'Verified Quran & Authentic Sunnah Platform'}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            {isAr ? (
              <>مَعِين <span className="text-[#C9A227]">اليومي</span></>
            ) : (
              <>Maeen <span className="text-[#C9A227]">Platform</span></>
            )}
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 font-medium leading-relaxed">
            {isAr
              ? 'معينك اليومي لتلاوة وتدبر صفحة واحدة من القرآن الكريم بتفسير موثق وقراءة أحاديث صحيحة ونفيسة تمس حياتك اليومية.'
              : 'Your daily source for reciting one Quran page with verified tafsir and discovering captivating authentic Hadiths for daily life.'}
          </p>

          {/* Quick Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/quran"
              className="px-6 py-3.5 rounded-xl bg-[#C9A227] hover:bg-[#a8851c] text-[#0F4C3A] font-bold text-sm sm:text-base shadow-md hover:scale-105 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>{isAr ? 'صفحة القرآن اليومية' : 'Read Today\'s Quran Page'}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>

            <Link
              href="/hadith"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-xs hover:scale-105 transition-all flex items-center gap-2"
            >
              <Scroll className="w-5 h-5 text-[#C9A227]" />
              <span>{isAr ? 'حديث اليوم الصحيح' : 'Read Today\'s Hadith'}</span>
            </Link>

            <button
              onClick={() => setIsNotificationModalOpen(true)}
              className="px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/90 font-bold text-xs sm:text-sm border border-white/15 backdrop-blur-xs transition-all flex items-center gap-2"
            >
              <Bell className="w-4 h-4 text-[#C9A227]" />
              <span>{isAr ? 'ضبط التنبيه اليومي' : 'Set Daily Reminder'}</span>
            </button>
          </div>
        </div>

        {/* Decorative Geometric Ornament background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:16px_16px]" />
      </section>

      {/* Core Authenticity Principles */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-[#0F4C3A] dark:text-[#C9A227]">
            {isAr ? 'أحاديث صحيحة ونفيسة' : '100% Authentic Treasures'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {isAr
              ? 'انتقاء لأحاديث صحيحة تمس واقع الحياة اليومية، وتعالج الهموم وتبعث السكينة، مع التخريج الدقيق والشرح المعتمد.'
              : 'Authentic prophetic narrations focused on daily peace, emotional well-being, and verified attribution.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950 text-[#C9A227] flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-[#0F4C3A] dark:text-[#C9A227]">
            {isAr ? 'لطائف بيانية وتأملات' : 'Linguistic & Cosmic Insights'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {isAr
              ? 'عرض لطائف التفسير للعلماء مع وقفات بيانية ذكية تُحبّب القارئ في التدبر وتفتح آفاق التفكر بضوابط علمية.'
              : 'Scholarly reflections, linguistic nuances, and contemplative thematic insights with strict authenticity.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-[#0F4C3A] dark:text-[#C9A227]">
            {isAr ? 'تنبيهات يومية متعددة' : 'Multi-Channel Reminders'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {isAr
              ? 'تذكير يومي يصلك عبر إشعارات المتصفح، أو تقويم جوجل (Google Calendar)، أو البريد في الوقت الذي تختاره.'
              : 'Daily reminders delivered via Browser Push, Google Calendar recurrence, or Email at your chosen time.'}
          </p>
        </div>
      </section>

      {/* Today's Quran Preview & Today's Hadith */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Quran Page Preview Card */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <div className="flex items-center gap-2 text-[#0F4C3A] dark:text-[#C9A227] font-bold text-lg">
                <BookOpen className="w-5 h-5" />
                <h2>{isAr ? 'صفحة اليوم من القرآن' : 'Today\'s Quran Page'}</h2>
              </div>

              <span className="text-xs bg-[#0F4C3A]/10 text-[#0F4C3A] dark:bg-[#C9A227]/20 dark:text-[#C9A227] px-3 py-1 rounded-full font-bold">
                {quranData ? (isAr ? `صفحة ${quranData.page_number}` : `Page ${quranData.page_number}`) : (isAr ? 'جاري التحميل...' : 'Loading...')}
              </span>
            </div>

            {quranData && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-bold text-[#0F4C3A] dark:text-[#C9A227]">
                    {isAr ? quranData.surah_name_ar : quranData.surah_name_en}
                  </span>
                  <span>{isAr ? `الجزء ${quranData.juz_number}` : `Juz ${quranData.juz_number}`}</span>
                </div>

                <div className="quran-font text-xl leading-loose text-right p-4 rounded-xl bg-[#F8F6F1]/60 dark:bg-[#0B1210]/60 border border-[#C9A227]/20 line-clamp-4">
                  {quranData.verses.slice(0, 4).map(v => v.text_uthmani).join(' ')} ...
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 text-xs text-gray-700 dark:text-gray-300 space-y-1">
                  <span className="font-bold text-[#0F4C3A] dark:text-[#C9A227] block">
                    {isAr ? 'تفسير السعدي لمطلع الصفحة:' : 'Tafsir As-Sa\'di:'}
                  </span>
                  <p className="line-clamp-2">{isAr ? quranData.tafsir_sadi_ar : quranData.tafsir_sadi_en}</p>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/quran"
            className="w-full py-3 bg-[#0F4C3A] hover:bg-[#0a382b] text-white font-bold text-sm rounded-xl text-center flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <span>{isAr ? 'الانتقال لقراءة الصفحة والتفسير واللطائف' : 'Open Full Page, Tafsir & Insights'}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        {/* Today's Hadith Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#0F4C3A] dark:text-[#C9A227] font-bold text-lg px-2">
            <Scroll className="w-5 h-5" />
            <h2>{isAr ? 'حديث اليوم الصحيح والنفيس' : 'Today\'s Authentic Hadith'}</h2>
          </div>

          {hadithData && <HadithCard hadith={hadithData} />}
        </div>
      </div>

      {/* Daily Reminders & Notification Setup Section */}
      <section className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 text-center max-w-4xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-[#0F4C3A]/10 text-[#0F4C3A] dark:bg-[#C9A227]/20 dark:text-[#C9A227] flex items-center justify-center mx-auto shadow-xs">
          <Bell className="w-7 h-7" />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0F4C3A] dark:text-[#C9A227]">
            {isAr ? 'لا تفوّت وردك اليومي المبارك' : 'Stay Consistent With Your Daily Source'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {isAr
              ? 'احرص على تثبيت التنبيه اليومي في الوقت المناسب لك عبر المتصفح أو تقويم جوجل أو البريد الإلكتروني.'
              : 'Configure daily reminders through your browser, Google Calendar, or email.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setIsNotificationModalOpen(true)}
            className="px-6 py-3.5 bg-[#0F4C3A] hover:bg-[#0a382b] text-white font-bold text-sm rounded-xl flex items-center gap-2 transition-all shadow-md hover:scale-105"
          >
            <Bell className="w-4 h-4" />
            <span>{isAr ? 'ضبط إشعارات المتصفح والتقويم' : 'Configure Reminders'}</span>
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
