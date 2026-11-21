ENHANCED BIRTHDAY SURPRISE WEBSITE
===================================

RUN IT
1. Download and extract Birthday_Website_Enhanced.zip.
2. Open the extracted folder.
3. Double-click index.html to preview in Chrome, Edge, or Firefox.

PERSONALIZE THE NAME
1. Open script.js in Notepad or VS Code.
2. Change: const birthdayName = "Aanya";
3. Save and refresh the page.

REPLACE THE SAMPLE PHOTOS
Replace the four files in assets/:
  memory-1.svg
  memory-2.svg
  memory-3.svg
  memory-4.svg
You can use your own images (JPG/PNG/WebP). If you use different filenames,
update the corresponding src values in index.html. The scrapbook reuses some
of the same photos.

FEATURES
- Animated five-second intro countdown and progress bar
- Confetti welcome screen
- Eight-page birthday experience inspired by the supplied Reel
- Personal note, swipeable memory gallery, appreciation cards and story chapters
- Interactive three-candle cake
- Optional microphone blow detection (requires HTTPS/localhost and microphone permission)
- Drag-to-cut cake interaction, plus tap alternative
- Wish page, personal letter and scrapbook
- Responsive mobile and desktop layout
- Reduced-motion accessibility support

HOSTING
For Netlify Drop:
1. Extract the ZIP.
2. Drag the extracted folder (the one containing index.html) to https://app.netlify.com/drop
3. Netlify deploys it and gives you a public URL.
For microphone access on a hosted website, use its HTTPS URL and allow microphone
permission in the browser. Microphone access may not work when opening index.html
directly from a local file.

NOTES
- The supplied gallery art is placeholder artwork, not personal photos.
- Google Fonts need an internet connection; fallback fonts are provided.
- Sound is not autoplayed. The music button plays a short synthesized chime on demand.
- This is an original implementation inspired by the structure and visual mood of
  the supplied Instagram Reel, not the original creator's source code.
