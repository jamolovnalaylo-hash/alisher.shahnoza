import fs from 'node:fs';

let css = fs.readFileSync('src/taklifnoma.css', 'utf8');

// 1. Fix .reveal so it is always 100% visible and never hidden
css = css.replace(/\.reveal\{opacity:0;transition:opacity \.85s[^{]*transform:translateY\(80px\)\}/, '.reveal{opacity:1;transform:none}');
css = css.replace(/\.reveal\.is-visible\{[^}]*\}/, '.reveal.is-visible{opacity:1;transform:none}');

// 2. Ensure .text-scene__couple has deep, bold, ultra-visible royal burgundy/gold color
css = css.replace(/\.text-scene h1,\.text-scene p\{[^}]*\}/g, '.text-scene h1,.text-scene p{color:#4a0713;text-shadow:0 1px 2px #fff;margin:0}');

fs.writeFileSync('src/taklifnoma.css', css);
console.log('Fixed .reveal and base text colors in src/taklifnoma.css');
