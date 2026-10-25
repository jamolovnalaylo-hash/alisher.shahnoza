import fs from 'node:fs';

const content = fs.readFileSync('src/components/admin/AdminDashboard.tsx', 'utf8');

// Find all occurrences of the admin block header
const marker = "{/* ================= TAB 4: ADMINLARNI BOSHQARISH VA YAYINGI ADMIN TAYINLASH ================= */}";
const occurrences = [];
let pos = 0;
while ((pos = content.indexOf(marker, pos)) !== -1) {
  occurrences.push(pos);
  pos += marker.length;
}

console.log('Occurrences at indices:', occurrences);

if (occurrences.length > 1) {
  // The last occurrence is the one after wishes.
  // We want to delete all occurrences except the last one!
  // Let's find the closing for each occurrence: it ends with `</div>\n        )}`
  // But each occurrence starts with `\n        {/* ================= TAB 4` and ends right before the next tab or end.
  // Let's see: the last occurrence is at occurrences[occurrences.length - 1].
  // Let's remove the first (occurrences.length - 1) occurrences.
  let cleaned = content;
  // We do it in reverse order so indices don't shift!
  for (let i = occurrences.length - 2; i >= 0; i--) {
    const start = occurrences[i];
    // Find where this tab block ends
    const end = cleaned.indexOf('</div>\n        )}\n\n', start) + '</div>\n        )}\n\n'.length;
    console.log(`Removing duplicate block ${i} from ${start} to ${end}`);
    cleaned = cleaned.substring(0, start) + cleaned.substring(end);
  }
  fs.writeFileSync('src/components/admin/AdminDashboard.tsx', cleaned);
  console.log('Successfully cleaned AdminDashboard.tsx!');
}
