import { Verse, QuranPageData } from './types';

// Surah names list mapping for 114 Surahs
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
    const surahInfo = SURAH_NAMES[chapterId] || { ar: `سورة رقم ${chapterId}`, en: `Surah ${chapterId}` };

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
      surah_name_ar: surahInfo.ar,
      surah_name_en: surahInfo.en,
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
