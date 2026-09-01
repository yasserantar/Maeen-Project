'use client';

import React from 'react';
import { useUserStore } from '@/lib/store';
import { Info, ExternalLink, ShieldCheck, CheckCircle } from 'lucide-react';

export default function SourcesPage() {
  const { progress } = useUserStore();
  const isAr = progress.language === 'ar';

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-4">
        <div className="w-10 h-10 rounded-xl bg-[#0F4C3A] text-[#C9A227] flex items-center justify-center font-bold">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#0F4C3A] dark:text-[#C9A227]">
            {isAr ? 'مصادر المنصة والتراخيص الرسمية' : 'Platform Sources & Licenses'}
          </h1>
          <p className="text-xs text-gray-500">
            {isAr ? 'بيان شفاف للمصادر الرقمية والتراخيص المعتمدة في منصة مَعِين' : 'Transparent documentation of verified digital sources and open data licenses'}
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#0F4C3A]/5 dark:bg-[#C9A227]/10 border border-[#0F4C3A]/20 dark:border-[#C9A227]/30 flex items-start gap-4">
        <ShieldCheck className="w-8 h-8 text-[#0F4C3A] dark:text-[#C9A227] shrink-0 mt-1" />
        <div className="space-y-2 text-sm">
          <h3 className="font-bold text-[#0F4C3A] dark:text-[#C9A227]">
            {isAr ? 'مبدأ التوثيق الصارم' : 'Strict Authenticity Principle'}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xs sm:text-sm">
            {isAr
              ? 'تلتزم منصة مَعِين بعدم توليد أي نص قرآن، أو تفسير، أو حديث نبوي بوساطة الذكاء الاصطناعي نهائياً. يتم جلب جميع النصوص والتفاسير والأحاديث حصراً من مصادرها الرسمية الموثقة والمعتمدة لدى الأمة.'
              : 'Maeen platform strictly commits to zero AI generation of Quran text, Tafsir, or Hadith. All religious texts are fetched exclusively from verified, canonical sources.'}
          </p>
        </div>
      </div>

      {/* Primary Sources Listing */}
      <div className="space-y-6">
        {/* Quran Source */}
        <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
            <h3 className="font-bold text-lg text-[#0F4C3A] dark:text-[#C9A227]">
              {isAr ? '1. مصدر النص القرآني والتلاوات' : '1. Quran Text & Recitation Source'}
            </h3>
            <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
              {isAr ? 'مجمع الملك فهد' : 'King Fahd Complex'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {isAr
              ? 'نص المصحف الشريف موافق لمصحف المدينة النبوية، ومجلوب عبر واجهة برمجة التطبيقات الرسمية لـ Quran.com Developer APIs ومشروع Tanzil.net Verified Quran Text.'
              : 'The holy Quran text conforms to the Medina Mushaf, fetched via the official Quran.com Developer APIs and the Tanzil.net Verified Quran Text project.'}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <a href="https://quran.com/developers" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#0F4C3A] dark:text-[#C9A227] hover:underline font-bold">
              <span>Quran.com Developer Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a href="https://tanzil.net/docs/Text_License" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#0F4C3A] dark:text-[#C9A227] hover:underline font-bold">
              <span>Tanzil Text License</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Tafsir Source */}
        <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
            <h3 className="font-bold text-lg text-[#0F4C3A] dark:text-[#C9A227]">
              {isAr ? '2. مصادر التفسير المعتمدة' : '2. Verified Tafsir Sources'}
            </h3>
            <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
              {isAr ? 'السعدي وابن كثير' : 'As-Sa\'di & Ibn Kathir'}
            </span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isAr ? 'تفسير السعدي (تيسير الكريم الرحمن في تفسير كلام المنان) للشيخ عبد الرحمن السعدي رحمه الله.' : 'Tafsir As-Sa\'di (Taysir al-Karim al-Rahman) by Shaykh Abd ar-Rahman as-Sa\'di.'}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isAr ? 'تفسير ابن كثير (تفسير القرآن العظيم) للحافظ إسماعيل بن كثير رحمه الله.' : 'Tafsir Ibn Kathir (Tafsir al-Qur\'an al-\'Azim) by Hafiz Ismail Ibn Kathir.'}</span>
            </li>
          </ul>
        </div>

        {/* Hadith Source */}
        <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
            <h3 className="font-bold text-lg text-[#0F4C3A] dark:text-[#C9A227]">
              {isAr ? '3. مصادر السنة النبوية الشريفة' : '3. Canonical Hadith Datasets'}
            </h3>
            <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 rounded-full font-bold">Sunnah.com API</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {isAr
              ? 'جميع الأحاديث مخرجة وموثقة من أمهات كتب الحديث (صحيح البخاري، صحيح مسلم، سنن أبي داود، جامع الترمذي، سنن النسائي، سنن ابن ماجه) ومجلوية عبر منصة Sunnah.com API الرسمية.'
              : 'All narrations are sourced and verified from canonical Hadith collections (Sahih al-Bukhari, Sahih Muslim, Sunan Abu Dawud, Jami` at-Tirmidhi, Sunan an-Nasa\'i, Sunan Ibn Majah) via Sunnah.com APIs.'}
          </p>
          <div className="pt-2 text-xs">
            <a href="https://sunnah.com/developers" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#0F4C3A] dark:text-[#C9A227] hover:underline font-bold">
              <span>Sunnah.com Developer Platform</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
