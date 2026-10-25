import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data and uploads directories exist
const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, '..', 'uploads');
const photosDir = path.join(uploadsDir, 'photos');
const audioDir = path.join(uploadsDir, 'audio');

[dataDir, uploadsDir, photosDir, audioDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const dbPath = path.join(dataDir, 'wedding.sqlite');
export const db = new DatabaseSync(dbPath);

// Enable WAL mode & foreign keys
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
`);

// 1. Invitation Settings Table
db.exec(`
  CREATE TABLE IF NOT EXISTS invitation_settings (
    id TEXT PRIMARY KEY,
    brideName TEXT NOT NULL,
    groomName TEXT NOT NULL,
    bridePhoto TEXT NOT NULL,
    groomPhoto TEXT NOT NULL,
    weddingDate TEXT NOT NULL,
    weddingTime TEXT NOT NULL,
    venueName TEXT NOT NULL,
    venueAddress TEXT NOT NULL,
    mapUrl TEXT NOT NULL,
    invitationText TEXT NOT NULL,
    parentsNames TEXT,
    musicTrack TEXT,
    musicTitle TEXT,
    isMusicEnabled INTEGER DEFAULT 1,
    updatedAt TEXT NOT NULL
  );
`);

// 2. Guest Wishes Table
db.exec(`
  CREATE TABLE IF NOT EXISTS wishes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guestName TEXT NOT NULL,
    message TEXT NOT NULL,
    submittedAt TEXT NOT NULL,
    ipHash TEXT
  );
`);

// 3. Admin Users Table
db.exec(`
  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    token TEXT,
    createdAt TEXT NOT NULL
  );
`);

// Seed Default Invitation Settings if empty
const existingSettings = db.prepare('SELECT * FROM invitation_settings WHERE id = ?').get('main');
if (!existingSettings) {
  const insertSettings = db.prepare(`
    INSERT INTO invitation_settings (
      id, brideName, groomName, bridePhoto, groomPhoto,
      weddingDate, weddingTime, venueName, venueAddress, mapUrl,
      invitationText, parentsNames, musicTrack, musicTitle, isMusicEnabled, updatedAt
    ) VALUES (
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?
    )
  `);

  insertSettings.run(
    'main',
    'Madina',
    'Aziz',
    '/images/bride-default.jpg',
    '/images/groom-default.jpg',
    '2027-06-20',
    '18:00',
    'Zarafshon Saroyi',
    'Navoiy shahri, Amir Temur shoh ko‘chasi, 24-uy',
    'https://maps.google.com/?q=Zarafshon+Saroyi+Navoiy',
    `Aziz va muhtaram mehmonimiz!

Ikki qalbning sevgi, sadoqat va o‘zaro hurmat rishtalari bog‘langan ushbu muqaddas va shukuhli kunda — nikoh to‘yimizda sizni quvonchimizga sherik bo‘lishga chin qalbimizdan taklif etamiz.

Sizning tashrifingiz baxtli xonadonimiz uchun unutilmas xotira va cheksiz sharafdir!`,
    'Karimovlar va Rahimovlar xonadonlari',
    '',
    'Shohona vals ohanglari',
    1,
    new Date().toISOString()
  );
}

// Seed Default Admin User: phone 934352504
const defaultPhone = '934352504';
const existingAdmin = db.prepare('SELECT * FROM admin_users WHERE phone = ?').get(defaultPhone);
if (!existingAdmin) {
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync('admin934352504', salt);
  db.prepare(`
    INSERT INTO admin_users (phone, passwordHash, createdAt)
    VALUES (?, ?, ?)
  `).run(defaultPhone, passwordHash, new Date().toISOString());
  console.log(`[DB] Default admin initialized: Phone: ${defaultPhone}`);
}
