import { db } from './db.js';

db.prepare(`
  UPDATE invitation_settings 
  SET brideName = 'Shaxnoza',
      groomName = 'Alisher',
      bridePhoto = '/assets/couple-alisher-shaxnoza.jpg',
      groomPhoto = '/assets/couple-alisher-shaxnoza.jpg',
      weddingDate = '2026-11-03',
      weddingTime = '18:00',
      venueName = 'Charag''on restorani',
      venueAddress = 'Buxoro viloyati, Qorako''l tumani, Charag''on restorani',
      mapUrl = 'https://www.google.com/maps/search/?api=1&query=Qorako%27l+tumani+Charag%27on+restarani',
      invitationText = 'Hurmatli aziz mehmonimiz!\n\nSizni Alisher va Shaxnozaning nikoh to‘yi munosabati bilan quvonchli marosimimizga taklif etamiz. Quvonchimizga sherik bo‘ling!',
      parentsNames = 'Buxoro xonadoni',
      musicTrack = '/assets/choli-qushi.mp3',
      musicTitle = 'Çalıkuşu (\"Choli qushi\") seriali musiqasi',
      updatedAt = datetime('now')
  WHERE id = 'main'
`).run();

console.log('Database updated with Alisher & Shaxnoza in Qorakol Charagon with Choli Qushi music!');
