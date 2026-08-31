'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useUserStore } from '@/lib/store';

export function Footer() {
  const { progress } = useUserStore();
  const isAr = progress.language === 'ar';

  return (
    <footer className="bg-[var(--card-bg)] border-t border-[var(--border-color)] mt-16 text-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0F4C3A] flex items-center justify-center text-[#C9A227] font-bold text-lg">
                م
              </div>
              <span className="font-bold text-xl text-[#0F4C3A] dark:text-[#C9A227]">
                {isAr ? 'مَعِين | Maeen' : 'Maeen'}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-md leading-relaxed text-xs sm:text-sm">
              {isAr
                ? 'منصة إسلامية موثوقة تقدم صفحة يومية من القرآن الكريم مع التفسير المعتمد وحديثاً صحيحاً يومياً من أمهات كتب السنة النبوية، وفق أعلى معايير التوثيق والسهولة.'
                : 'A trusted bilingual Islamic platform delivering one Quran page daily with verified tafsir and one authentic Hadith daily from canonical Sunnah sources.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#0F4C3A] dark:text-[#C9A227] font-medium bg-[#0F4C3A]/5 dark:bg-[#C9A227]/10 p-2.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>{isAr ? 'منهجية التوثيق الصارم من المصادر الأصلية' : '100% Verified Sources & Strict Authenticity'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-[#0F4C3A] dark:text-[#C9A227]">
              {isAr ? 'أقسام المنصة' : 'Sections'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/quran" className="hover:text-[#C9A227]">{isAr ? 'صفحة القرآن اليومية' : 'Daily Quran Page'}</Link></li>
              <li><Link href="/hadith" className="hover:text-[#C9A227]">{isAr ? 'الحديث الصحيح اليومي' : 'Daily Hadith'}</Link></li>
              <li><Link href="/journey" className="hover:text-[#C9A227]">{isAr ? 'خطة 604 صفحة' : '604 Pages Tracker'}</Link></li>
              <li><Link href="/favorites" className="hover:text-[#C9A227]">{isAr ? 'المحفوظات والملاحظات' : 'Bookmarks & Notes'}</Link></li>
            </ul>
          </div>

          {/* Verification & AI */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-[#0F4C3A] dark:text-[#C9A227]">
              {isAr ? 'المصادر والتوثيق' : 'Sources & AI'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/sources" className="hover:text-[#C9A227]">{isAr ? 'مصادر القرآن والتفسير' : 'Quran & Tafsir Sources'}</Link></li>
              <li><Link href="/about" className="hover:text-[#C9A227]">{isAr ? 'عن معين والمنهجية' : 'About & Methodology'}</Link></li>
              <li>
                <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#C9A227]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>llms.txt (AI Discoverability)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} مَعِين - جميع الحقوق محفوظة للمسلمين.</p>
          <div className="flex items-center gap-1">
            <span>{isAr ? 'صُنع بحب لخدمة كتاب الله وسنة نبينا ﷺ' : 'Crafted with devotion for Quran & Sunnah'}</span>
            <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
