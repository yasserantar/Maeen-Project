'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Scroll, Compass, ShieldCheck, ArrowLeft, ArrowRight, Sparkles, CheckCircle2, Bell } from 'lucide-react';
import { fetchQuranPage } from '@/lib/quran-api';
import { fetchDailyHadith } from '@/lib/hadith-api';
import { QuranPageData, Hadith } from '@/lib/types';
import { HadithCard } from '@/components/HadithCard';
import { useUserStore } from '@/lib/store';

export default function HomePage() {
  const [quranData, setQuranData] = useState<QuranPageData | null>(null);
  const [hadithData, setHadithData] = useState<Hadith | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const { progress } = useUserStore();
  const isAr = progress.language === 'ar';

  useEffect(() => {
    // Fetch today's page (page 1 default or based on day of year)
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const todayPage = (dayOfYear % 604) + 1;

    fetchQuranPage(todayPage).then(setQuranData);
    fetchDailyHadith(dayOfYear).then(setHadithData);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

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
            مَعِين | <span className="text-[#C9A227]">Maeen</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 font-medium leading-relaxed">
            {isAr
              ? 'معينك اليومي لتلاوة وتدبر صفحة واحدة من القرآن الكريم بتفسير موثق وقراءة حديث صحيح يومياً مع التخريج والشرح.'
              : 'Your daily source for reciting and reflecting upon one Quran page daily with verified tafsir and one authentic Hadith daily.'}
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
            {isAr ? 'توثيق صارم 100%' : '100% Verified Sources'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {isAr
              ? 'الاعتماد الحصري على مجمع الملك فهد لطباعة المصحف الشريف، وتفسير السعدي وابن كثير، وأمهات كتب السنة (البخاري، مسلم، إلخ).'
              : 'Strict adherence to authenticated Quranic datasets, Tafsir As-Sa\'di/Ibn Kathir, and canonical Sunnah collections.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950 text-[#C9A227] flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-[#0F4C3A] dark:text-[#C9A227]">
            {isAr ? 'خطة ختم القرآن (604 صفحة)' : '604 Pages Journey'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {isAr
              ? 'متابعة بصرية دقيقة لإنجاز قراءة صفحات المصحف الشريف صفحة بصفحة مع حفظ التدبرات والملاحظات الشخصية.'
              : 'Visual progress tracker allowing you to complete reading all 604 Quran pages step-by-step with personal notes.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-[#0F4C3A] dark:text-[#C9A227]">
            {isAr ? 'تطبيق كامل بدون إعلانات' : '100% Ads-Free & Privacy First'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {isAr
              ? 'تجربة قراءة ناصعة خالية تماماً من الإعلانات أو التتبع، مع دعم العمل بدون إنترنت (PWA Offline).'
              : 'A clean, quiet reading experience completely free from advertisements, tracking, or distractions.'}
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
                {quranData ? `صفحة ${quranData.page_number}` : 'جاري التحميل...'}
              </span>
            </div>

            {quranData && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-bold text-[#0F4C3A] dark:text-[#C9A227]">{quranData.surah_name_ar}</span>
                  <span>الجزء {quranData.juz_number}</span>
                </div>

                <div className="quran-font text-xl leading-loose text-right p-4 rounded-xl bg-[#F8F6F1]/60 dark:bg-[#0B1210]/60 border border-[#C9A227]/20 line-clamp-4">
                  {quranData.verses.slice(0, 4).map(v => v.text_uthmani).join(' ')} ...
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 text-xs text-gray-700 dark:text-gray-300 space-y-1">
                  <span className="font-bold text-[#0F4C3A] dark:text-[#C9A227] block">تفسير السعدي لمطلع الصفحة:</span>
                  <p className="line-clamp-2">{quranData.tafsir_sadi}</p>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/quran"
            className="w-full py-3 bg-[#0F4C3A] hover:bg-[#0a382b] text-white font-bold text-sm rounded-xl text-center flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <span>{isAr ? 'الانتقال لقراءة الصفحة والتفسير الكامل' : 'Open Full Page & Tafsir'}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        {/* Today's Hadith Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#0F4C3A] dark:text-[#C9A227] font-bold text-lg px-2">
            <Scroll className="w-5 h-5" />
            <h2>{isAr ? 'حديث اليوم الصحيح' : 'Today\'s Authentic Hadith'}</h2>
          </div>

          {hadithData && <HadithCard hadith={hadithData} />}
        </div>
      </div>

      {/* Daily Reminders / Newsletter Subscription */}
      <section className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-8 sm:p-10 shadow-sm space-y-4 text-center max-w-3xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-[#0F4C3A]/10 text-[#0F4C3A] dark:bg-[#C9A227]/20 dark:text-[#C9A227] flex items-center justify-center mx-auto">
          <Bell className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-[#0F4C3A] dark:text-[#C9A227]">
          {isAr ? 'احصل على تذكير القرآن والحديث اليومي' : 'Subscribe to Daily Quran & Hadith Reminders'}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {isAr
            ? 'احرص على ألا يفوتك وردك اليومي من القرآن الكريم والحديث النبوي الشريف عبر التنبيهات الفورية.'
            : 'Stay connected with your daily Quran page and authentic Hadith.'}
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto pt-2">
          <input
            type="email"
            required
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            placeholder={isAr ? 'أدخل بريدك الإلكتروني...' : 'Enter your email address...'}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-[#0F4C3A]"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-[#0F4C3A] hover:bg-[#0a382b] text-white font-bold text-sm rounded-xl shrink-0 transition-colors shadow-xs"
          >
            {subscribed ? (isAr ? 'تم الاشتراك!' : 'Subscribed!') : (isAr ? 'اشترك الآن' : 'Subscribe')}
          </button>
        </form>
      </section>
    </div>
  );
}
