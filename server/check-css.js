import fs from 'node:fs';

const css = fs.readFileSync('src/taklifnoma.css', 'utf8');

const coupleIdx = css.indexOf('.text-scene__couple{');
console.log('=== .text-scene__couple ===');
console.log(css.substring(coupleIdx, coupleIdx + 400));

const dateIdx = css.indexOf('.text-scene__date{');
console.log('=== .text-scene__date ===');
console.log(css.substring(dateIdx, dateIdx + 400));
