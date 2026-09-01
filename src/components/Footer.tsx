'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart, Sparkles, MessageSquarePlus, AlertTriangle } from 'lucide-react';
import { useUserStore } from '@/lib/store';
import { FeedbackModal } from './FeedbackModal';

export function Footer() {
  const { progress } = useUserStore();
  const isAr = progress.language === 'ar';
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <>
      <footer className="bg-[var(--card-bg)] border-t border-[var(--border-color)] mt-16 text-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Top Feedback Callout Banner */}
          <div className="mb-10 p-6 rounded-3xl bg-gradient-to-r from-[#0A382C]/10 via-[#F0CA50]/10 to-[#0A382C]/10 dark:from-[#132820] dark:via-[#222413] dark:to-[#132820] border border-[#F0CA50]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-start">
              <div className="w-12 h-12 rounded-2xl bg-[#0A382C] text-[#F0CA50] flex items-center justify-center font-bold shrink-0 border border-[#F0CA50]/30 shadow-xs">
                <MessageSquarePlus className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-base text-[#0A382C] dark:text-[#F0CA50]">
                  {isAr ? 'هل لاحظت خطأً أو لديك اقتراح لتحسين المنصة؟' : 'Spotted an error or have a suggestion?'}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {isAr
                    ? 'الأمانة العلمية والتطوير المستمر غايتنا. أرسل لنا وسنراجع ملاحظتك فوراً بإذن الله.'
                    : 'We value scholarly precision and continuous improvement. Let us know anytime!'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="shimmer-btn px-6 py-3 bg-[#0A382C] hover:bg-[#0F4C3A] dark:bg-[#F0CA50] dark:hover:bg-[#D4AF37] text-white dark:text-[#0A261E] font-extrabold text-xs rounded-xl shrink-0 transition-all shadow-sm flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-[#F0CA50] dark:text-[#0A261E]" />
              <span>{isAr ? 'أبلغ عن خطأ / أرسل مقترحك' : 'Send Feedback / Correction'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand & Mission */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-[#0A382C] flex items-center justify-center text-[#F0CA50] font-extrabold text-lg shadow-sm border border-[#F0CA50]/30">
                  م
                </div>
                <span className="font-extrabold text-xl text-[#0A382C] dark:text-[#F0CA50]">
                  {isAr ? 'مَعِين' : 'Maeen'}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-md leading-relaxed text-xs sm:text-sm">
                {isAr
                  ? 'منصة إسلامية موثوقة تقدم صفحة يومية من القرآن الكريم مع التفسير المعتمد وحديثاً صحيحاً يومياً من أمهات كتب السنة النبوية، وفق أعلى معايير التوثيق والسهولة.'
                  : 'A trusted bilingual Islamic platform delivering one Quran page daily with verified tafsir and one authentic Hadith daily from canonical Sunnah sources.'}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#0A382C] dark:text-[#F0CA50] font-bold bg-[#0A382C]/5 dark:bg-[#F0CA50]/10 p-2.5 rounded-xl w-fit border border-[#0A382C]/10 dark:border-[#F0CA50]/20">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isAr ? 'منهجية التوثيق الصارم من المصادر الأصلية' : '100% Verified Sources & Strict Authenticity'}</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-[#0A382C] dark:text-[#F0CA50]">
                {isAr ? 'أقسام المنصة' : 'Sections'}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                <li><Link href="/quran" className="hover:text-[#F0CA50] transition-colors">{isAr ? 'صفحة القرآن اليومية' : 'Daily Quran Page'}</Link></li>
                <li><Link href="/hadith" className="hover:text-[#F0CA50] transition-colors">{isAr ? 'الحديث الصحيح اليومي' : 'Daily Hadith'}</Link></li>
                <li><Link href="/journey" className="hover:text-[#F0CA50] transition-colors">{isAr ? 'خطة 604 صفحة' : '604 Pages Tracker'}</Link></li>
                <li><Link href="/favorites" className="hover:text-[#F0CA50] transition-colors">{isAr ? 'المحفوظات والملاحظات' : 'Bookmarks & Notes'}</Link></li>
              </ul>
            </div>

            {/* Verification & Support */}
            <div>
              <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-[#0A382C] dark:text-[#F0CA50]">
                {isAr ? 'المصادر والدعم' : 'Sources & Feedback'}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                <li><Link href="/sources" className="hover:text-[#F0CA50] transition-colors">{isAr ? 'مصادر القرآن والتفسير' : 'Quran & Tafsir Sources'}</Link></li>
                <li><Link href="/about" className="hover:text-[#F0CA50] transition-colors">{isAr ? 'عن معين والمنهجية' : 'About & Methodology'}</Link></li>
                <li>
                  <button
                    onClick={() => setIsFeedbackOpen(true)}
                    className="text-[#0A382C] dark:text-[#F0CA50] hover:underline font-bold flex items-center gap-1.5"
                  >
                    <MessageSquarePlus className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تواصل معنا / تصويب خطأ' : 'Contact / Report Error'}</span>
                  </button>
                </li>
                <li>
                  <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#F0CA50] transition-colors">
                    <Sparkles className="w-3.5 h-3.5 text-[#F0CA50]" />
                    <span>{isAr ? 'ملف llms.txt (الذكاء الاصطناعي)' : 'llms.txt (AI Discoverability)'}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-4">
            <p>{isAr ? `© ${new Date().getFullYear()} مَعِين - جميع الحقوق محفوظة.` : `© ${new Date().getFullYear()} Maeen Platform - All Rights Reserved.`}</p>
            <div className="flex items-center gap-1">
              <span>{isAr ? 'صُنع بحب لخدمة كتاب الله وسنة نبينا ﷺ' : 'Crafted with devotion for Quran & Sunnah'}</span>
              <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" />
            </div>
          </div>
        </div>
      </footer>

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </>
  );
}
