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
  21: { ar: 'الأننبياء', en: 'Al-Anbiya' },
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

// Default static fallback for Page 1 (Al-Fatihah)
const PAGE_1_FALLBACK: QuranPageData = {
  page_number: 1,
  surah_name_ar: 'سورة الفاتحة',
  surah_name_en: 'Surah Al-Fatihah',
  juz_number: 1,
  verses: [
    { id: 1, verse_key: '1:1', verse_number: 1, page_number: 1, text_uthmani: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', translations: [{ id: 1, resource_id: 131, text: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.' }] },
    { id: 2, verse_key: '1:2', verse_number: 2, page_number: 1, text_uthmani: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ', translations: [{ id: 1, resource_id: 131, text: '[All] praise is [due] to Allah, Lord of the worlds -' }] },
    { id: 3, verse_key: '1:3', verse_number: 3, page_number: 1, text_uthmani: 'ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', translations: [{ id: 1, resource_id: 131, text: 'The Entirely Merciful, the Especially Merciful,' }] },
    { id: 4, verse_key: '1:4', verse_number: 4, page_number: 1, text_uthmani: 'مَٰلِكِ يَوْمِ ٱلدِّينِ', translations: [{ id: 1, resource_id: 131, text: 'Sovereign of the Day of Recompense.' }] },
    { id: 5, verse_key: '1:5', verse_number: 5, page_number: 1, text_uthmani: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', translations: [{ id: 1, resource_id: 131, text: 'It is You we worship and You we ask for help.' }] },
    { id: 6, verse_key: '1:6', verse_number: 6, page_number: 1, text_uthmani: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ', translations: [{ id: 1, resource_id: 131, text: 'Guide us to the straight path -' }] },
    { id: 7, verse_key: '1:7', verse_number: 7, page_number: 1, text_uthmani: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ', translations: [{ id: 1, resource_id: 131, text: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.' }] },
  ],
  tafsir_sadi: 'سورة الفاتحة مكية، وهي أعظم سورة في القرآن الكريم. اشتملت على إثبات التوحيد بأنواعه الثلاثة: توحيد الربوبية وتوحيد الألوهية وتوحيد الأسماء والصفات، وعلى إثبات النبوة والجزاء والأمر بالعبادة والاستعانة بالله وحده.',
  tafsir_ibn_kathir: 'تسمى الفاتحة وأم الكتاب وأم القرآن والسبع المثاني. افتتح بها الكتاب وتستفتح بها القراءة في الصلاة.',
  benefits_ar: [
    'التأكيد على أن الحمد كله لله رب العالمين في السراء والضراء.',
    'سؤال الله الهداية للصراط المستقيم في كل ركعة من صلواتنا.',
    'سلوك طريق المنعم عليهم من النبيين والصديقين والشهداء والصالحين.'
  ],
  benefits_en: [
    'Confirming that all praise belongs solely to Allah, the Lord of all worlds.',
    'Constantly asking Allah for guidance to the Straight Path in every prayer.',
    'Following the footsteps of those favoured by Allah.'
  ]
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
      audio_url: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${v.id}.mp3`
    }));

    const firstVerse = verses[0];
    const chapterId = firstVerse ? parseInt(firstVerse.verse_key.split(':')[0]) : 1;
    const surahInfo = SURAH_NAMES[chapterId] || { ar: `سورة ${chapterId}`, en: `Surah ${chapterId}` };

    // Fetch Tafsir As-Sa'di for first verse of page
    let tafsirSadi = '';
    if (firstVerse) {
      try {
        const tafsirRes = await fetch(`https://api.quran.com/api/v4/tafsirs/169/by_ayah/${firstVerse.verse_key}`);
        if (tafsirRes.ok) {
          const tafsirJson = await tafsirRes.json();
          tafsirSadi = tafsirJson.tafsir?.text?.replace(/<[^>]*>?/gm, '') || '';
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
      tafsir_sadi: tafsirSadi || PAGE_1_FALLBACK.tafsir_sadi,
      tafsir_ibn_kathir: PAGE_1_FALLBACK.tafsir_ibn_kathir,
      benefits_ar: [
        `تدبر قراءة الصفحة ${pageNumber} من القرآن الكريم.`,
        'الحرص على العمل بما في هذه الآيات الكريمات.',
        'الاستعاذة بالله واللجوء إليه عند تلاوة آيات الوعيد، وسؤاله الفضل عند آيات الرحمة.'
      ],
      benefits_en: [
        `Reflecting upon Quran Page ${pageNumber}.`,
        'Striving to act upon the guidance contained in these verses.',
        'Seeking refuge in Allah during verses of warning and asking for His grace during verses of mercy.'
      ]
    };
  } catch (err) {
    console.warn(`Using fallback data for page ${pageNumber}`, err);
    return {
      ...PAGE_1_FALLBACK,
      page_number: pageNumber
    };
  }
}
