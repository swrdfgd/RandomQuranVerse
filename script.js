async function getRandomVerse() {
    const button = document.getElementById('random-verse-button');
    button.disabled = true;
    button.innerText = 'Loading...';

    try {
        // Fetch a random verse
        const randomVerseResponse = await fetch('https://api.quran.com/api/v4/verses/random?language=en');
        const randomVerseData = await randomVerseResponse.json();
        const verseKey = randomVerseData.verse.verse_key; // format "chapter:verse"
        const [chapterNumber, verseNumber] = verseKey.split(':');

        // Fetch the verse text
        const verseTextResponse = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${chapterNumber}`);
        const verseTextData = await verseTextResponse.json();
        const verseText = verseTextData.verses.find(verse => verse.verse_key === verseKey).text_uthmani;

        // Fetch the chapter name
        const chapterResponse = await fetch(`https://api.quran.com/api/v4/chapters/${chapterNumber}`);
        const chapterData = await chapterResponse.json();
        const chapterName = chapterData.chapter.name_simple;

        // Display the verse and chapter name
        document.getElementById('verse').innerText = verseText;
        document.getElementById('surah').innerText = `Surah ${chapterName} (Chapter ${chapterNumber}), Verse ${verseNumber}`;
    } catch (error) {
        console.error('Error fetching random verse:', error);
        document.getElementById('verse').innerText = 'Failed to fetch verse. Please try again.';
        document.getElementById('surah').innerText = '';
    } finally {
        button.disabled = false;
        button.innerText = 'Get Random Verse';
    }
}
