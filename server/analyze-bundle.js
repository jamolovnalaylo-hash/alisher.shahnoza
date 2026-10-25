import fs from 'node:fs';

const css = fs.readFileSync('src/taklifnoma.css', 'utf8');
const p = css.indexOf('html,body');
if (p !== -1) {
  console.log(css.substring(p, p + 300));
} else {
  console.log('No html,body rule');
}
