'use client';

import React from 'react';
import { useUserStore } from '@/lib/store';
import { ShieldCheck, Heart, Mail, Compass } from 'lucide-react';

export default function AboutPage() {
  const { progress } = useUserStore();
  const isAr = progress.language === 'ar';

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-4">
        <div className="w-10 h-10 rounded-xl bg-[#0F4C3A] text-[#C9A227] flex items-center justify-center font-bold">
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#0F4C3A] dark:text-[#C9A227]">
            {isAr ? 'عن منصة مَعِين' : 'About Maeen Platform'}
          </h1>
          <p className="text-xs text-gray-500">
            {isAr ? 'الرؤية، والرسالة، ومنهجية العمل المعتمدة' : 'Vision, Mission, and Core Authenticity Commitment'}
          </p>
        </div>
      </div>

      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#0F4C3A] dark:text-[#C9A227] flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span>{isAr ? 'رسالة المنصة' : 'Our Mission'}</span>
          </h2>
          <p>
            {isAr
              ? 'تأسست منصة مَعِين لتكون عوناً يومياً ونبعاً صافياً لكل مسلم ومسلمة حول العالم، ينهل منه صفحة واحدة يومياً من القرآن الكريم بتفسيرها المعتمد، وحديثاً صحيحاً واحداً يومياً من السنة النبوية المطهرة.'
              : 'Maeen platform was established to be a daily pure source for Muslims worldwide, delivering one Quran page daily with verified Tafsir and one authentic Hadith daily.'}
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-[var(--border-color)]">
          <h2 className="text-xl font-bold text-[#0F4C3A] dark:text-[#C9A227] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>{isAr ? 'وثيقة الأصالة والتحقق' : 'Authenticity Statement'}</span>
          </h2>
          <ul className="space-y-2 list-disc list-inside bg-[#F8F6F1] dark:bg-[#0B1210] p-4 rounded-xl border border-[#C9A227]/30 text-xs sm:text-sm">
            {isAr ? (
              <>
                <li><strong>يُحظر تماماً</strong> توليد أي نص قرآني أو آية كريمة بوساطة أي خوارزمية ذكاء اصطناعي.</li>
                <li><strong>يُحظر تماماً</strong> إحداث أو تأليف تفاسير أو فتاوى أو أحكام شرعية جديدة.</li>
                <li><strong>يُحظر تماماً</strong> توليد أحاديث نبوية أو نسبتها للنبي ﷺ بدون تخريج موثق.</li>
                <li>الأصالة والسلامة العلمية تتقدم على كل شيء.</li>
              </>
            ) : (
              <>
                <li><strong>Strictly Forbidden:</strong> AI generation or modification of Quranic text or verses.</li>
                <li><strong>Strictly Forbidden:</strong> Inventing Tafsir, issuing fatwas, or creating new religious rulings.</li>
                <li><strong>Strictly Forbidden:</strong> Generating or fabricating Hadiths without verified attribution.</li>
                <li>Authenticity and scholarly reliability always come before engagement.</li>
              </>
            )}
          </ul>
        </div>

        <div className="space-y-3 pt-4 border-t border-[var(--border-color)]">
          <h2 className="text-xl font-bold text-[#0F4C3A] dark:text-[#C9A227] flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <span>{isAr ? 'التواصل والاستفسارات' : 'Contact & Support'}</span>
          </h2>
          <p>
            {isAr
              ? 'نسعد بتلقي ملحوظاتكم واقتراحاتكم لخدمة كتاب الله وسنة رسوله ﷺ عبر البريد الإلكتروني:'
              : 'We welcome your feedback and inquiries via email:'}{' '}
            <a href="mailto:contact@maeen.app" className="text-[#0F4C3A] dark:text-[#C9A227] font-bold underline">contact@maeen.app</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
