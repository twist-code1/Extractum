import { Readability } from '@mozilla/readability';

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_idle',

  main() {
    const docClone = document.cloneNode(true) as Document;

    const preCleanSelectors = [
      'figure', 'figcaption', 'aside', 'sup.reference',
      '.infobox', '.thumb', '.hatnote', '.navbox', '.catlinks',
      '.reflist', '.references', '.mw-references-wrap', '.mw-editsection',
      '[role="note"]', '.gallery', '.sistersitebox'
    ];
    docClone.querySelectorAll(preCleanSelectors.join(',')).forEach((el) => el.remove());

    const article = new Readability(docClone, { charThreshold: 300 }).parse();

    if (!article || !article.textContent) return;

    const cleanText = article.textContent
      .replace(/\[[^\]]*\]/g, '')
      .replace(/\n\s*↑[\s\S]*$/g, '')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n\s*\n+/g, '\n\n')
      .trim();

    if (cleanText) {
      browser.runtime.sendMessage({
        action: 'SEND_ARTICLE_TO_BACKEND',
        payload: cleanText,
      });
    }
  },
});