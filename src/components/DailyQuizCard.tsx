'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle, Sparkles, Award, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useUserStore } from '@/lib/store';

interface QuizQuestion {
  word: string;
  surah: string;
  ayah: string;
  questionAr: string;
  questionEn: string;
  optionsAr: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationAr: string;
  explanationEn: string;
}

const DAILY_QUIZZES: QuizQuestion[] = [
  {
    word: 'نَجِيًّا',
    surah: 'سورة يوسف',
    ayah: 'آية 80',
    questionAr: 'ما معنى قوله تعالى: ﴿ فَلَمَّا اسْتَيْأَسُوا مِنْهُ خَلَصُوا نَجِيًّا ﴾؟',
    questionEn: 'What is the meaning of the word "نَجِيًّا" in Surah Yusuf (12:80)?',
    optionsAr: [
      'انفردوا وتشاوروا سراً فيما بينهم',
      'رجعوا مسرعين إلى أبيهم',
      'دعوا الله أن ينجيهم من الكرب'
    ],
    optionsEn: [
      'They conferred privately in secret consultation',
      'They hurried back to their father',
      'They prayed to Allah to save them'
    ],
    correctIndex: 0,
    explanationAr: 'قال الإمام السعدي: (خَلَصُوا نَجِيًّا) أي: انفردوا عن الناس بحيث لا يسمع كلامهم أحد، ليتشاوروا في هذه المصيبة العظيمة التي نزلت بهم.',
    explanationEn: 'Tafsir As-Sa\'di explains: "They isolated themselves from people so no one could hear them, to privately consult on this critical matter."'
  },
  {
    word: 'فَرَّطتُمْ',
    surah: 'سورة يوسف',
    ayah: 'آية 80',
    questionAr: 'ما معنى قوله تعالى: ﴿ وَمِن قَبْلُ مَا فَرَّطتُمْ فِي يُوسُفَ ﴾؟',
    questionEn: 'What is the meaning of "فَرَّطتُمْ" in Surah Yusuf (12:80)?',
    optionsAr: [
      'قصرتم وضيعتم العهد في حقه',
      'أفرطتم في محبته والاعتناء به',
      'سافرتم وتركتموه في البئر'
    ],
    optionsEn: [
      'Neglected and broke your trust regarding him',
      'Over-pampered and excessively loved him',
      'Traveled and left him in the well'
    ],
    correctIndex: 0,
    explanationAr: 'التفريط هو التقصير وتضييع الأمانة؛ أي تذكروا ما وقع منكم سابقاً في حق يوسف عليه السلام من التقصير والأذى.',
    explanationEn: 'Tafreet means neglect and failure to fulfill the trust, reminding them of how they broke their promise concerning Yusuf.'
  },
  {
    word: 'الصَّمَدُ',
    surah: 'سورة الإخلاص',
    ayah: 'آية 2',
    questionAr: 'ما معنى اسم الله العظيم: ﴿ اللَّهُ الصَّمَدُ ﴾؟',
    questionEn: 'What is the comprehensive meaning of the divine name "الصَّمَدُ" in Surah Al-Ikhlas?',
    optionsAr: [
      'السيد الذي تصمد وتقصد إليه الخلائق في جميع حوائجها',
      'الذي لا يراه أحد من خلقه',
      'الخالق لكل شيء في الوجود'
    ],
    optionsEn: [
      'The Self-Sufficient Master upon Whom all creation relies for all needs',
      'The One unseen by creation',
      'The Creator of all existence'
    ],
    correctIndex: 0,
    explanationAr: 'الصمد هو السيد الذي كمل في سؤدده، وتصمد وتلجأ إليه جميع الخلائق في رغائبها وحوائجها ومسائلها.',
    explanationEn: 'As-Samad is the Absolute Master upon Whom all creations depend for all their needs, while He needs nothing.'
  }
];

export function DailyQuizCard() {
  const { progress } = useUserStore();
  const isAr = progress.language === 'ar';

  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const quiz = DAILY_QUIZZES[dayOfYear % DAILY_QUIZZES.length];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIndex(idx);
    setIsAnswered(true);

    if (idx === quiz.correctIndex) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const isCorrect = selectedIndex === quiz.correctIndex;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glow-card glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-[#C9A227]/30 dark:border-[#F0CA50]/40 shadow-lg relative overflow-hidden"
    >
      {/* Ambient background decoration */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F0CA50]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-[#F0CA50] flex items-center justify-center font-bold border border-[#F0CA50]/30 shadow-xs">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-[#0A382C] dark:text-[#FFFFFF]">
              {isAr ? 'تحدي تدبر معاني القرآن اليومي' : 'Daily Quranic Vocabulary & Reflection'}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {isAr ? `${quiz.surah} • ${quiz.ayah}` : `${quiz.surah} • ${quiz.ayah}`}
            </span>
          </div>
        </div>

        <span className="text-[11px] font-extrabold bg-[#0A382C]/10 text-[#0A382C] dark:bg-[#F0CA50]/20 dark:text-[#F0CA50] px-3 py-1 rounded-full border border-transparent dark:border-[#F0CA50]/30">
          {isAr ? 'دقيقة تدبر' : '1-Min Reflection'}
        </span>
      </div>

      {/* Question */}
      <div className="space-y-2">
        <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 leading-relaxed">
          {isAr ? quiz.questionAr : quiz.questionEn}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {(isAr ? quiz.optionsAr : quiz.optionsEn).map((option, idx) => {
          let btnStyle = 'bg-white/80 dark:bg-[#101915] border-gray-200 dark:border-white/10 hover:border-[#F0CA50] dark:hover:border-[#F0CA50]';

          if (isAnswered) {
            if (idx === quiz.correctIndex) {
              btnStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/40 shadow-xs';
            } else if (idx === selectedIndex) {
              btnStyle = 'bg-red-500/15 border-red-500 text-red-800 dark:text-red-300';
            } else {
              btnStyle = 'opacity-50 border-gray-200 dark:border-white/5';
            }
          }

          return (
            <motion.button
              key={idx}
              whileHover={!isAnswered ? { scale: 1.01 } : {}}
              whileTap={!isAnswered ? { scale: 0.99 } : {}}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-2xl border text-sm font-semibold transition-all flex items-center justify-between text-right sm:text-start ${btnStyle}`}
            >
              <span className="leading-relaxed">{option}</span>
              {isAnswered && idx === quiz.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 ml-2" />
              )}
              {isAnswered && idx === selectedIndex && idx !== quiz.correctIndex && (
                <XCircle className="w-5 h-5 text-red-500 shrink-0 ml-2" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback & Tafsir Explanation */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-5 rounded-2xl border space-y-2 text-xs sm:text-sm ${
              isCorrect
                ? 'bg-emerald-50/90 dark:bg-[#0D241C] border-emerald-300 dark:border-[#1D785E] text-emerald-900 dark:text-[#E2F0EA]'
                : 'bg-amber-50/90 dark:bg-[#2A200A] border-amber-300 dark:border-[#F0CA50]/40 text-amber-900 dark:text-[#FFF0C2]'
            }`}
          >
            <div className="flex items-center gap-2 font-extrabold text-sm">
              <Sparkles className="w-4 h-4 text-[#F0CA50] fill-[#F0CA50]" />
              <span>{isCorrect ? (isAr ? 'أحسنت! إجابة صحيحة ومباركة ✨' : 'Excellent! Correct Answer ✨') : (isAr ? 'الفائدة والمعنى الصحيح من التفسير:' : 'Scholarly Meaning from Tafsir:')}</span>
            </div>
            <p className="leading-relaxed">
              {isAr ? quiz.explanationAr : quiz.explanationEn}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
