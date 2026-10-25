import fs from 'node:fs';

let css = fs.readFileSync('src/taklifnoma.css', 'utf8');

// Replace @font-face rules that reference missing woff/woff2 files (leave base64 data ones and existing assets)
css = css.replace(/@font-face\{[^}]*\/assets\/(manrope|great-vibes-(cyrillic|vietnamese|latin-ext))[^}]*\}/g, '');

fs.writeFileSync('src/taklifnoma.css', css);
console.log('Cleaned font face warnings from src/taklifnoma.css');
