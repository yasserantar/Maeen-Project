'use client';

import React, { useState, useRef } from 'react';
import { X, Copy, Check, Share2, Image as ImageIcon, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const { progress } = useUserStore();
  const isAr = progress.language === 'ar';

  if (!isOpen) return null;

  const fullShareText = isAr
    ? `📖 ${title}\n\n"${text}"\n\nالمصدر: ${source}\nعبر منصة مَعِين - https://maeen-app-five.vercel.app`
    : `📖 ${title}\n\n"${text}"\n\nSource: ${source}\nVia Maeen Platform - https://maeen-app-five.vercel.app`;

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

  // Generate high-resolution luxury Islamic Story card
  const downloadCardImage = () => {
    setIsGeneratingImage(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = 1080;
      const height = 1350; // Instagram/WhatsApp Story 4:5 ratio
      canvas.width = width;
      canvas.height = height;

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#061C15');
      grad.addColorStop(0.5, '#0A261E');
      grad.addColorStop(1, '#05140F');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Gold luxury border
      ctx.strokeStyle = '#F0CA50';
      ctx.lineWidth = 6;
      ctx.strokeRect(40, 40, width - 80, height - 80);

      // Inner subtle border
      ctx.strokeStyle = 'rgba(240, 202, 80, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(55, 55, width - 110, height - 110);

      // Header Top Pill
      ctx.fillStyle = 'rgba(240, 202, 80, 0.15)';
      ctx.beginPath();
      ctx.roundRect(width / 2 - 180, 100, 360, 60, 30);
      ctx.fill();

      ctx.fillStyle = '#F0CA50';
      ctx.font = 'bold 28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('مَنَصَّةُ مَعِين • وَرْدُ اليَوْم', width / 2, 142);

      // Title
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 44px sans-serif';
      ctx.fillText(title, width / 2, 260);

      // Separator
      ctx.strokeStyle = 'rgba(240, 202, 80, 0.4)';
      ctx.beginPath();
      ctx.moveTo(width / 2 - 120, 290);
      ctx.lineTo(width / 2 + 120, 290);
      ctx.stroke();

      // Main Text with word wrap
      ctx.fillStyle = '#FFFDF5';
      ctx.font = '38px "Amiri", "Traditional Arabic", serif';
      const words = (text || '').split(' ');
      let line = '';
      let y = 390;
      const maxWidth = width - 200;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, width / 2, y);
          line = words[n] + ' ';
          y += 65;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, width / 2, y);

      // Source Box
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.roundRect(100, height - 260, width - 200, 100, 20);
      ctx.fill();

      ctx.fillStyle = '#F0CA50';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText(`المصدر المعتمد: ${source}`, width / 2, height - 205);

      // Footer
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '22px sans-serif';
      ctx.fillText('https://maeen-app-five.vercel.app', width / 2, height - 90);

      // Download
      const link = document.createElement('a');
      link.download = `maeen-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.warn('Image generation error', e);
    }
    setIsGeneratingImage(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-[#C9A227]/40 dark:border-[#F0CA50]/50 shadow-2xl space-y-5"
        >
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <div className="flex items-center gap-2 text-[#0A382C] dark:text-[#F0CA50] font-extrabold">
              <Share2 className="w-5 h-5" />
              <h3>{isAr ? 'مشاركة النص المبارك' : 'Share Content'}</h3>
            </div>
            <button onClick={onClose} className="p-1 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Card Preview */}
          <div className="p-5 rounded-2xl bg-[#FAF6EC] dark:bg-[#0D1612] border border-[#C9A227]/30 dark:border-[#F0CA50]/35 text-right space-y-3 shadow-inner">
            <h4 className="font-bold text-sm text-[#0A382C] dark:text-[#F0CA50]">{title}</h4>
            <p className="quran-font text-xl leading-relaxed text-gray-900 dark:text-[#FFFFFF]">
              &ldquo;{text}&rdquo;
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-white/10 flex justify-between items-center">
              <span>{isAr ? `المصدر: ${source}` : `Source: ${source}`}</span>
              <span className="font-extrabold text-[#0A382C] dark:text-[#F0CA50]">{isAr ? 'مَعِين' : 'Maeen'}</span>
            </div>
          </div>

          {/* Image Story Card Generator Button */}
          <button
            onClick={downloadCardImage}
            disabled={isGeneratingImage}
            className="shimmer-btn w-full py-3.5 bg-[#F0CA50] hover:bg-[#D4AF37] text-[#0A261E] font-black text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{isGeneratingImage ? (isAr ? 'جاري إنشاء البطاقة...' : 'Generating...') : (isAr ? 'حفظ وتنزيل كبطاقة صورة أنيقة للـ Story' : 'Download as Story Image Card')}</span>
          </button>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={shareToWhatsapp}
              className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <span>{isAr ? 'مشاركة واتساب' : 'WhatsApp'}</span>
            </button>
            <button
              onClick={shareToTwitter}
              className="py-3 px-4 bg-black hover:bg-gray-900 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs border border-white/10"
            >
              <span>{isAr ? 'مشاركة عبر X' : 'Platform X'}</span>
            </button>
          </div>

          <button
            onClick={copyToClipboard}
            className="w-full py-3 bg-[#0A382C] hover:bg-[#0F4C3A] text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (isAr ? 'تم نسخ النص المنسق!' : 'Text Copied!') : (isAr ? 'نسخ النص المنسق للحافظة' : 'Copy Formatted Text')}</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
