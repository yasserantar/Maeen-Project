'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Share2 } from 'lucide-react';
import { useUserStore } from '@/lib/store';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
  source: string;
}

export function ShareModal({ isOpen, onClose, title, text, source }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const { progress } = useUserStore();
  const isAr = progress.language === 'ar';

  if (!isOpen) return null;

  const fullShareText = isAr
    ? `📖 ${title}\n\n"${text}"\n\nالمصدر: ${source}\nعبر منصة مَعِين - معينك اليومي من القرآن والسنة`
    : `📖 ${title}\n\n"${text}"\n\nSource: ${source}\nVia Maeen Platform - Daily Quran & Sunnah`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullShareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToWhatsapp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(fullShareText)}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(fullShareText)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[var(--card-bg)] w-full max-w-lg rounded-2xl p-6 border border-[var(--border-color)] shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center gap-2 text-[#0F4C3A] dark:text-[#C9A227] font-bold">
            <Share2 className="w-5 h-5" />
            <h3>{isAr ? 'مشاركة النص المبارك' : 'Share Content'}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Preview */}
        <div className="p-4 rounded-xl bg-[#F8F6F1] dark:bg-[#0B1210] border border-[#C9A227]/30 text-right space-y-2">
          <h4 className="font-bold text-sm text-[#0F4C3A] dark:text-[#C9A227]">{title}</h4>
          <p className="quran-font text-lg leading-relaxed text-gray-800 dark:text-gray-200">
            &ldquo;{text}&rdquo;
          </p>
          <div className="text-xs text-gray-500 pt-2 border-t border-gray-200 dark:border-gray-800 flex justify-between">
            <span>{isAr ? `المصدر: ${source}` : `Source: ${source}`}</span>
            <span className="font-bold text-[#0F4C3A] dark:text-[#C9A227]">{isAr ? 'مَعِين' : 'Maeen'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={shareToWhatsapp}
            className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
          </button>
          <button
            onClick={shareToTwitter}
            className="py-2.5 px-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <span>{isAr ? 'منصة X' : 'Platform X'}</span>
          </button>
        </div>

        <button
          onClick={copyToClipboard}
          className="w-full py-2.5 bg-[#0F4C3A] hover:bg-[#0a382b] text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? (isAr ? 'تم نسخ النص المنسق!' : 'Text Copied!') : (isAr ? 'نسخ النص للحافظة' : 'Copy Text')}</span>
        </button>
      </div>
    </div>
  );
}
