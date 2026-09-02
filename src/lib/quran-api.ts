import { Verse, QuranPageData } from './types';

// Complete mapping of all 114 Surahs in Arabic and English
export const SURAH_NAMES: Record<number, { ar: string; en: string }> = {
  1: { ar: 'الفاتحة', en: 'Al-Fatihah' },
  2: { ar: 'البقرة', en: 'Al-Baqarah' },
  3: { ar: 'آل عمران', en: 'Ali \'Imran' },
  4: { ar: 'النساء', en: 'An-Nisa' },
  5: { ar: 'المائدة', en: 'Al-Ma\'idah' },
  6: { ar: 'الأنعام', en: 'Al-An\'am' },
  7: { ar: 'الأعراف', en: 'Al-A\'raf' },
  8: { ar: 'الأنفال', en: 'Al-Anfal' },
  9: { ar: 'التوبة', en: 'At-Tawbah' },
  10: { ar: 'يونس', en: 'Yunus' },
  11: { ar: 'هود', en: 'Hud' },
  12: { ar: 'يوسف', en: 'Yusuf' },
  13: { ar: 'الرعد', en: 'Ar-Ra\'d' },
  14: { ar: 'إبراهيم', en: 'Ibrahim' },
  15: { ar: 'الحجر', en: 'Al-Hijr' },
  16: { ar: 'النحل', en: 'An-Nahl' },
  17: { ar: 'الإسراء', en: 'Al-Isra' },
  18: { ar: 'الكهف', en: 'Al-Kahf' },
  19: { ar: 'مريم', en: 'Maryam' },
  20: { ar: 'طه', en: 'Taha' },
  21: { ar: 'الأنبياء', en: 'Al-Anbiya' },
  22: { ar: 'الحج', en: 'Al-Hajj' },
  23: { ar: 'المؤمنون', en: 'Al-Mu\'minun' },
  24: { ar: 'النور', en: 'An-Nur' },
  25: { ar: 'الفرقان', en: 'Al-Furqan' },
  26: { ar: 'الشعراء', en: 'Ash-Shu\'ara' },
  27: { ar: 'النمل', en: 'An-Naml' },
  28: { ar: 'القصص', en: 'Al-Qasas' },
  29: { ar: 'العنكبوت', en: 'Al-\'Ankabut' },
  30: { ar: 'الروم', en: 'Ar-Rum' },
  31: { ar: 'لقمان', en: 'Luqman' },
  32: { ar: 'السجدة', en: 'As-Sajdah' },
  33: { ar: 'الأحزاب', en: 'Al-Ahzab' },
  34: { ar: 'سبأ', en: 'Saba' },
  35: { ar: 'فاطر', en: 'Fatir' },
  36: { ar: 'يس', en: 'Ya-Sin' },
  37: { ar: 'الصافات', en: 'As-Saffat' },
  38: { ar: 'ص', en: 'Sad' },
  39: { ar: 'الزمر', en: 'Az-Zumar' },
  40: { ar: 'غافر', en: 'Ghafir' },
  41: { ar: 'فصلت', en: 'Fussilat' },
  42: { ar: 'الشورى', en: 'Ash-Shuraa' },
  43: { ar: 'الزخرف', en: 'Az-Zukhruf' },
  44: { ar: 'الدخان', en: 'Ad-Dukhan' },
  45: { ar: 'الجاثية', en: 'Al-Jathiyah' },
  46: { ar: 'الأحقاف', en: 'Al-Ahqaf' },
  47: { ar: 'محمد', en: 'Muhammad' },
  48: { ar: 'الفتح', en: 'Al-Fath' },
  49: { ar: 'الحجرات', en: 'Al-Hujurat' },
  50: { ar: 'ق', en: 'Qaf' },
  51: { ar: 'الذاريات', en: 'Adh-Dhariyat' },
  52: { ar: 'الطور', en: 'At-Tur' },
  53: { ar: 'النجم', en: 'An-Najm' },
  54: { ar: 'القمر', en: 'Al-Qamar' },
  55: { ar: 'الرحمن', en: 'Ar-Rahman' },
  56: { ar: 'الواقعة', en: 'Al-Waqi\'ah' },
  57: { ar: 'الحديد', en: 'Al-Hadid' },
  58: { ar: 'المجادلة', en: 'Al-Mujadila' },
  59: { ar: 'الحشر', en: 'Al-Hashr' },
  60: { ar: 'الممتحنة', en: 'Al-Mumtahanah' },
  61: { ar: 'الصف', en: 'As-Saff' },
  62: { ar: 'الجمعة', en: 'Al-Jumu\'ah' },
  63: { ar: 'المنافقون', en: 'Al-Munafiqun' },
  64: { ar: 'التغابن', en: 'At-Taghabun' },
  65: { ar: 'الطلاق', en: 'At-Talaq' },
  66: { ar: 'التحريم', en: 'At-Tahrim' },
  67: { ar: 'الملك', en: 'Al-Mulk' },
  68: { ar: 'القلم', en: 'Al-Qalam' },
  69: { ar: 'الحاقة', en: 'Al-Haqqah' },
  70: { ar: 'المعارج', en: 'Al-Ma\'arij' },
  71: { ar: 'نوح', en: 'Nuh' },
  72: { ar: 'الجن', en: 'Al-Jinn' },
  73: { ar: 'المزمل', en: 'Al-Muzzammil' },
  74: { ar: 'المدثر', en: 'Al-Muddaththir' },
  75: { ar: 'القيامة', en: 'Al-Qiyamah' },
  76: { ar: 'الإنسان', en: 'Al-Insan' },
  77: { ar: 'المرسلات', en: 'Al-Mursalat' },
  78: { ar: 'النبأ', en: 'An-Naba' },
  79: { ar: 'النازعات', en: 'An-Nazi\'at' },
  80: { ar: 'عبس', en: '\'Abasa' },
  81: { ar: 'التكوير', en: 'At-Takwir' },
  82: { ar: 'الانفطار', en: 'Al-Infitar' },
  83: { ar: 'المطففين', en: 'Al-Mutaffifin' },
  84: { ar: 'الانشقاق', en: 'Al-Inshiqaq' },
  85: { ar: 'البروج', en: 'Al-Buruj' },
  86: { ar: 'الطارق', en: 'At-Tariq' },
  87: { ar: 'الأعلى', en: 'Al-A\'la' },
  88: { ar: 'الغاشية', en: 'Al-Ghashiyah' },
  89: { ar: 'الفجر', en: 'Al-Fajr' },
  90: { ar: 'البلد', en: 'Al-Balad' },
  91: { ar: 'الشمس', en: 'Ash-Shams' },
  92: { ar: 'الليل', en: 'Al-Layl' },
  93: { ar: 'الضحى', en: 'Ad-Duhaa' },
  94: { ar: 'الشرح', en: 'Ash-Sharh' },
  95: { ar: 'التين', en: 'At-Tin' },
  96: { ar: 'العلق', en: 'Al-\'Alaq' },
  97: { ar: 'القدر', en: 'Al-Qadr' },
  98: { ar: 'البينة', en: 'Al-Bayyinah' },
  99: { ar: 'الزلزلة', en: 'Az-Zalzalah' },
  100: { ar: 'العاديات', en: 'Al-\'Adiyat' },
  101: { ar: 'القارعة', en: 'Al-Qari\'ah' },
  102: { ar: 'التكاثر', en: 'At-Takathur' },
  103: { ar: 'العصر', en: 'Al-\'Asr' },
  104: { ar: 'الهمزة', en: 'Al-Humazah' },
  105: { ar: 'الفيل', en: 'Al-Fil' },
  106: { ar: 'قريش', en: 'Quraysh' },
  107: { ar: 'الماعون', en: 'Al-Ma\'un' },
  108: { ar: 'الكوثر', en: 'Al-Kawthar' },
  109: { ar: 'الكافرون', en: 'Al-Kafirun' },
  110: { ar: 'النصر', en: 'An-Nasr' },
  111: { ar: 'المسد', en: 'Al-Masad' },
  112: { ar: 'الإخلاص', en: 'Al-Ikhlas' },
  113: { ar: 'الفلق', en: 'Al-Falaq' },
  114: { ar: 'الناس', en: 'An-Nas' },
};

function cleanText(html: string): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>?/gm, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getAlafasyAudioUrl(verseKey: string): string {
  try {
    const parts = verseKey.split(':');
    const surah = String(parseInt(parts[0])).padStart(3, '0');
    const ayah = String(parseInt(parts[1])).padStart(3, '0');
    return `https://everyayah.com/data/Alafasy_128kbps/${surah}${ayah}.mp3`;
  } catch (e) {
    return 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3';
  }
}

// Fallback data for Page 1 (Al-Fatihah)
const PAGE_1_FALLBACK: QuranPageData = {
  page_number: 1,
  surah_name_ar: 'سورة الفاتحة',
  surah_name_en: 'Surah Al-Fatihah',
  juz_number: 1,
  verses: [
    { id: 1, verse_key: '1:1', verse_number: 1, page_number: 1, text_uthmani: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', audio_url: 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3', translations: [{ id: 1, resource_id: 131, text: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.' }] },
    { id: 2, verse_key: '1:2', verse_number: 2, page_number: 1, text_uthmani: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ', audio_url: 'https://everyayah.com/data/Alafasy_128kbps/001002.mp3', translations: [{ id: 1, resource_id: 131, text: '[All] praise is [due] to Allah, Lord of the worlds -' }] },
    { id: 3, verse_key: '1:3', verse_number: 3, page_number: 1, text_uthmani: 'ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', audio_url: 'https://everyayah.com/data/Alafasy_128kbps/001003.mp3', translations: [{ id: 1, resource_id: 131, text: 'The Entirely Merciful, the Especially Merciful,' }] },
    { id: 4, verse_key: '1:4', verse_number: 4, page_number: 1, text_uthmani: 'مَٰلِكِ يَوْمِ ٱلدِّينِ', audio_url: 'https://everyayah.com/data/Alafasy_128kbps/001004.mp3', translations: [{ id: 1, resource_id: 131, text: 'Sovereign of the Day of Recompense.' }] },
    { id: 5, verse_key: '1:5', verse_number: 5, page_number: 1, text_uthmani: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', audio_url: 'https://everyayah.com/data/Alafasy_128kbps/001005.mp3', translations: [{ id: 1, resource_id: 131, text: 'It is You we worship and You we ask for help.' }] },
    { id: 6, verse_key: '1:6', verse_number: 6, page_number: 1, text_uthmani: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ', audio_url: 'https://everyayah.com/data/Alafasy_128kbps/001006.mp3', translations: [{ id: 1, resource_id: 131, text: 'Guide us to the straight path -' }] },
    { id: 7, verse_key: '1:7', verse_number: 7, page_number: 1, text_uthmani: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ', audio_url: 'https://everyayah.com/data/Alafasy_128kbps/001007.mp3', translations: [{ id: 1, resource_id: 131, text: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.' }] },
  ],
  tafsir_sadi_ar: 'سورة الفاتحة مكية، وهي أعظم سورة في القرآن الكريم. اشتملت على إثبات التوحيد بأنواعه الثلاثة: توحيد الربوبية وتوحيد الألوهية وتوحيد الأسماء والصفات، وعلى إثبات النبوة والجزاء والأمر بالعبادة والاستعانة بالله وحده.',
  tafsir_ibn_kathir_ar: 'تسمى الفاتحة وأم الكتاب وأم القرآن والسبع المثاني. افتتح بها الكتاب وتستفتح بها القراءة في الصلاة، وتتضمن تماجيد الله والثناء عليه وطلب الهداية إلى الصراط المستقيم.',
  tafsir_sadi_en: 'Surah Al-Fatihah is a Meccan surah and the greatest surah in the Holy Quran. It encompasses the principles of Islamic monotheism (Tawhid), worship, and seeking guidance.',
  tafsir_ibn_kathir_en: 'Al-Fatihah is named the Opener of the Book, Umm Al-Kitab (the Mother of the Book), and the Seven Oft-Repeated Verses. It contains praise of Allah and asking for guidance to the Straight Path.',
  benefits_ar: [
    'التأكيد على أن الحمد كله لله رب العالمين في السراء والضراء.',
    'سؤال الله الهداية للصراط المستقيم في كل ركعة من صلواتنا.',
    'سلوك طريق المنعم عليهم من النبيين والصديقين والشهداء والصالحين.'
  ],
  benefits_en: [
    'Confirming that all praise belongs solely to Allah, the Lord of all worlds.',
    'Constantly asking Allah for guidance to the Straight Path in every prayer.',
    'Following the footsteps of those favoured by Allah.'
  ],
  linguistic_gem_ar: 'لطيفة بيانية: تقديم (إِيَّاكَ نَعْبُدُ) على (وَإِيَّاكَ نَسْتَعِينُ) فيه تقديم حق الله تعالى وهو العبادة والتذلل، على حظ العبد ومطلبه وهو الاستعانة والتوفيق.',
  linguistic_gem_en: 'Linguistic Nuance: Prioritizing "It is You we worship" before "and You we ask for help" places Allah\'s supreme right (worship) before the servant\'s request (divine assistance).',
  scientific_miracle_ar: 'التوازن النفسي والوجداني: تكرار صفات الرحمة (الرحمن، الرحيم) يمنح النفس سكينة وطمأنينة تخفف من حدة القلق والاضطراب، وهو ما تؤكده دراسات أثر الاستقرار الروحي على الجهاز العصبي.',
  scientific_miracle_en: 'Psychological & Spiritual Balance: The fourfold repetition of divine mercy creates deep inner serenity, directly reducing cognitive stress and fostering holistic well-being.',
  ai_reflection_ar: 'إضاءة واستنباط بياني: الانتقال البلاغي من صيغة الغائب (الحمد لله رب العالمين.. الرحمن الرحيم.. مالك يوم الدين) إلى صيغة المخاطب المباشر (إياك نعبد وإياك نستعين) يعكس ارتقاء قلب المؤمن من مجرد المعرفة النظرية بصفات ربه إلى مقام المناجاة والقرب وحضور القلب بين يديه.',
  ai_reflection_en: 'Reflective Insight: The rhetorical transition (Iltifat) from third-person description of Allah\'s attributes to direct second-person address ("You alone we worship") mirrors the spiritual ascent of the heart from knowing about Allah to speaking intimately with Him.'
};

export async function fetchQuranPage(pageNumber: number): Promise<QuranPageData> {
  if (pageNumber < 1 || pageNumber > 604) pageNumber = 1;

  try {
    const res = await fetch(`https://api.quran.com/api/v4/verses/by_page/${pageNumber}?language=ar&words=false&translations=131&fields=text_uthmani,chapter_id,verse_key,page_number,juz_number`, {
      next: { revalidate: 86400 }
    });

    if (!res.ok) throw new Error('API request failed');

    const data = await res.json();
    const verses: Verse[] = data.verses.map((v: any) => ({
      id: v.id,
      verse_key: v.verse_key,
      verse_number: v.verse_number,
      page_number: v.page_number,
      text_uthmani: v.text_uthmani,
      translations: v.translations || [],
      audio_url: getAlafasyAudioUrl(v.verse_key)
    }));

    const firstVerse = verses[0];
    const chapterId = firstVerse ? parseInt(firstVerse.verse_key.split(':')[0]) : 1;
    const surahInfo = SURAH_NAMES[chapterId] || { ar: `سورة ${chapterId}`, en: `Surah ${chapterId}` };

    // Fetch Arabic Tafsir As-Sa'di (ID 91) & Arabic Tafsir Ibn Kathir (ID 14)
    let tafsirSadiAr = '';
    let tafsirIbnKathirAr = '';
    let tafsirSadiEn = '';
    let tafsirIbnKathirEn = '';

    if (firstVerse) {
      try {
        // ID 91: Arabic Tafsir As-Sa'di
        const resSaadiAr = await fetch(`https://api.quran.com/api/v4/tafsirs/91/by_ayah/${firstVerse.verse_key}`);
        if (resSaadiAr.ok) {
          const j = await resSaadiAr.json();
          tafsirSadiAr = cleanText(j.tafsir?.text || '');
        }

        // ID 14: Arabic Tafsir Ibn Kathir
        const resIbnKathirAr = await fetch(`https://api.quran.com/api/v4/tafsirs/14/by_ayah/${firstVerse.verse_key}`);
        if (resIbnKathirAr.ok) {
          const j = await resIbnKathirAr.json();
          tafsirIbnKathirAr = cleanText(j.tafsir?.text || '');
        }

        // ID 169: English Tafsir Ibn Kathir / Sa'di
        const resEn = await fetch(`https://api.quran.com/api/v4/tafsirs/169/by_ayah/${firstVerse.verse_key}`);
        if (resEn.ok) {
          const j = await resEn.json();
          tafsirSadiEn = cleanText(j.tafsir?.text || '');
          tafsirIbnKathirEn = cleanText(j.tafsir?.text || '');
        }
      } catch (e) {
        console.warn('Tafsir fetch error', e);
      }
    }

    return {
      page_number: pageNumber,
      surah_name_ar: `سورة ${surahInfo.ar}`,
      surah_name_en: `Surah ${surahInfo.en}`,
      juz_number: firstVerse ? (firstVerse as any).juz_number || Math.ceil(pageNumber / 20) : 1,
      verses,
      tafsir_sadi_ar: tafsirSadiAr || PAGE_1_FALLBACK.tafsir_sadi_ar,
      tafsir_ibn_kathir_ar: tafsirIbnKathirAr || PAGE_1_FALLBACK.tafsir_ibn_kathir_ar,
      tafsir_sadi_en: tafsirSadiEn || PAGE_1_FALLBACK.tafsir_sadi_en,
      tafsir_ibn_kathir_en: tafsirIbnKathirEn || PAGE_1_FALLBACK.tafsir_ibn_kathir_en,
      benefits_ar: [
        `تدبر قراءة الصفحة ${pageNumber} من ${surahInfo.ar}.`,
        'الحرص على العمل بما في هذه الآيات الكريمات وربطها بالسلوك اليومي.',
        'الاستعاذة بالله واللجوء إليه عند آيات الوعيد، وسؤاله الفضل والجنة عند آيات الرحمة.'
      ],
      benefits_en: [
        `Reflecting upon Quran Page ${pageNumber} (${surahInfo.en}).`,
        'Striving to implement the divine moral and practical guidance in daily life.',
        'Seeking refuge in Allah during verses of warning and asking for His grace during verses of mercy.'
      ],
      linguistic_gem_ar: `لطيفة بيانية في ${surahInfo.ar}: الدقة الإعجازية في اختيار المفردات وترتيب الجمل يعكس عظمة البيان الإلهي وتناسق المعاني بما يناسب سياق الآيات ومقاصد السورة.`,
      linguistic_gem_en: `Linguistic Precision in ${surahInfo.en}: The miraculous arrangement and vocabulary perfectly align with the thematic essence and divine objectives of the verses.`,
      scientific_miracle_ar: `إشارة إعجازية وتأمل كوني: مطابقة الحقائق القرآنية للنواميس الكونية وتوجيه العقل للتفكر في خلق السماوات والأرض وعجائب تدبير الله في خلقه.`,
      scientific_miracle_en: `Cosmic & Scientific Harmony: Aligning universal physical realities with divine wisdom, urging the human intellect to contemplate the precision of creation.`,
      ai_reflection_ar: `إضاءة واستنباط بياني في ${surahInfo.ar}: التأمل في ترابط الآيات وحكم الانتقال بينها يفتح للقارئ آفاقاً واسعة في فهم مقاصد التنزيل وتطبيقها في واقعه المعاصر. (إضاءة للاستئناس والتدبر)`,
      ai_reflection_en: `Reflective Thematic Insight in ${surahInfo.en}: Contemplating the deep structural harmony across the verses reveals practical guidance for contemporary living.`
    };
  } catch (err) {
    console.warn(`Using fallback data for page ${pageNumber}`, err);
    return {
      ...PAGE_1_FALLBACK,
      page_number: pageNumber
    };
  }
}
