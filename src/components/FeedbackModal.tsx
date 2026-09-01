'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquarePlus, AlertTriangle, Lightbulb, Bug, CheckCircle2, Send, Mail, MessageCircle } from 'lucide-react';
import { useUserStore } from '@/lib/store';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: string;
  initialType?: 'error' | 'suggestion' | 'bug';
}

export function FeedbackModal({
  isOpen,
  onClose,
  initialContext = '',
  initialType = 'suggestion'
}: FeedbackModalProps) {
  const { progress } = useUserStore();
  const isAr = progress.language === 'ar';

  const [type, setType] = useState<'error' | 'suggestion' | 'bug'>(initialType);
  const [context, setContext] = useState(initialContext);
  const [message, setMessage] = useState('');
  const [name, setName] = useState(progress.user?.name || '');
  const [email, setEmail] = useState(progress.user?.email || '');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync initialContext when opened
  React.useEffect(() => {
    if (initialContext) setContext(initialContext);
    if (initialType) setType(initialType);
  }, [initialContext, initialType, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, message, context, name, email })
      });
      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setMessage('');
          onClose();
        }, 2200);
      }
    } catch (e) {
      console.warn('Feedback submit error', e);
    }
    setLoading(false);
  };

  const directWhatsappLink = () => {
    const text = isAr
      ? `السلام عليكم، لدي ${type === 'error' ? 'تصويب لخطأ' : type === 'suggestion' ? 'اقتراح تحسين' : 'إبلاغ عن مشكلة'} في منصة مَعِين:\n\n📌 الموضع: ${context || 'عام'}\n📝 التفاصيل: ${message}\n— من: ${name || 'فاعل خير'}`
      : `Salam, I have a ${type} for Maeen Platform:\nContext: ${context || 'General'}\nDetails: ${message}\nFrom: ${name || 'User'}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-[#C9A227]/40 dark:border-[#F0CA50]/50 shadow-2xl space-y-6 relative overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 left-5 rtl:left-auto rtl:right-5 p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-1 text-center sm:text-start">
            <div className="flex items-center gap-2.5 text-[#0A382C] dark:text-[#F0CA50] font-extrabold text-xl">
              <MessageSquarePlus className="w-6 h-6 text-[#F0CA50]" />
              <h3>{isAr ? 'شاركنا تصويباً أو اقتراحاً' : 'Report Error or Suggest Feature'}</h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isAr
                ? 'رأيك وملاحظاتك أمانة نعتز بها لتطوير المنصة وتصويب أي خطأ فوراً.'
                : 'Your feedback and corrections help us keep the platform authentic and flawless.'}
            </p>
          </div>

          {isSuccess ? (
            <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-[#0D241C] border border-emerald-300 dark:border-[#1D785E] text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-500 animate-bounce" />
              <h4 className="text-base font-extrabold text-emerald-900 dark:text-emerald-200">
                {isAr ? 'جزاكم الله خيراً وبورك فيكم!' : 'Thank you so much!'}
              </h4>
              <p className="text-xs text-emerald-800 dark:text-[#E2F0EA] leading-relaxed">
                {isAr
                  ? 'تم استلام ملاحظتك بنجاح وسيقوم فريق العمل بمراجعتها والعمل بها فوراً.'
                  : 'Your feedback has been received and will be reviewed immediately.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type Tabs */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  {isAr ? 'نوع المشاركة:' : 'Feedback Type:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setType('error')}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 border ${
                      type === 'error'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-800 dark:text-[#F0CA50] ring-1 ring-amber-500'
                        : 'bg-gray-50 dark:bg-[#101915] border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>{isAr ? 'تصويب خطأ' : 'Correction'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setType('suggestion')}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 border ${
                      type === 'suggestion'
                        ? 'bg-[#0A382C]/15 dark:bg-[#F0CA50]/15 border-[#0A382C] dark:border-[#F0CA50] text-[#0A382C] dark:text-[#F0CA50] ring-1 ring-[#F0CA50]'
                        : 'bg-gray-50 dark:bg-[#101915] border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <Lightbulb className="w-4 h-4 text-[#F0CA50]" />
                    <span>{isAr ? 'اقتراح وتطوير' : 'Suggestion'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setType('bug')}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 border ${
                      type === 'bug'
                        ? 'bg-red-500/15 border-red-500 text-red-800 dark:text-red-300 ring-1 ring-red-500'
                        : 'bg-gray-50 dark:bg-[#101915] border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <Bug className="w-4 h-4 text-red-500" />
                    <span>{isAr ? 'مشكلة تقنية' : 'Bug Report'}</span>
                  </button>
                </div>
              </div>

              {/* Context / Location */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  {isAr ? 'الموضع أو الصفحة المرتبطة (اختياري):' : 'Related Page / Context (Optional):'}
                </label>
                <input
                  type="text"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder={isAr ? 'مثال: صفحة 45 أو حديث رقم 12 أو القائمة الرئيسية' : 'e.g. Page 45, Hadith #12, or Audio Player'}
                  className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#101915] border border-gray-200 dark:border-white/10 text-xs sm:text-sm outline-none focus:border-[#F0CA50]"
                />
              </div>

              {/* Message Textarea */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  {isAr ? 'نص الملاحظة أو التصويب أو الاقتراح:' : 'Details / Explanation:'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isAr ? 'اكتب ملاحظتك بالتفصيل وسنعمل عليها فوراً بإذن الله...' : 'Please describe your observation, suggestion, or error correction...'}
                  className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#101915] border border-gray-200 dark:border-white/10 text-xs sm:text-sm outline-none focus:border-[#F0CA50] resize-none"
                />
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isAr ? 'اسمك الكريم (اختياري)' : 'Your Name (Optional)'}
                  className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#101915] border border-gray-200 dark:border-white/10 text-xs outline-none focus:border-[#F0CA50]"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isAr ? 'بريدك للتواصل (اختياري)' : 'Email for reply (Optional)'}
                  className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#101915] border border-gray-200 dark:border-white/10 text-xs outline-none focus:border-[#F0CA50]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="shimmer-btn w-full py-3.5 bg-[#0A382C] hover:bg-[#0F4C3A] dark:bg-[#F0CA50] dark:hover:bg-[#D4AF37] text-white dark:text-[#0A261E] font-black text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? (isAr ? 'جاري الإرسال...' : 'Sending...') : (isAr ? 'إرسال الملاحظة الآن' : 'Submit Feedback')}</span>
                </button>

                <button
                  type="button"
                  onClick={directWhatsappLink}
                  className="w-full py-2.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 dark:text-emerald-400 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-emerald-500/30"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{isAr ? 'أو إرسال مباشر عبر واتساب' : 'Or Send via WhatsApp'}</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
