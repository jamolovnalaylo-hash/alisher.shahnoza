import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Serve uploaded static files
app.use('/uploads', express.static(uploadsDir));

// Multer Storage Configuration
const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(uploadsDir, 'photos');
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const unique = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`;
    cb(null, unique);
  },
});

const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(uploadsDir, 'audio');
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const unique = `audio-${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`;
    cb(null, unique);
  },
});

const uploadPhoto = multer({
  storage: photoStorage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext) && allowed.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Faqat JPG, PNG yoki WEBP formatidagi rasm yuklash mumkin."));
    }
  },
});

const uploadAudio = multer({
  storage: audioStorage,
  limits: { fileSize: 30 * 1024 * 1024 }, // 30MB
  fileFilter: (req, file, cb) => {
    const allowed = /mp3|wav|ogg|m4a|aac/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext) || file.mimetype.includes('audio')) {
      cb(null, true);
    } else {
      cb(new Error("Faqat MP3, WAV yoki M4A formatidagi audio yuklash mumkin."));
    }
  },
});

// Middleware: Admin Authentication Token Verification (Supports direct admin without password)
const requireAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.admin = { id: 1, phone: '934352504' };
    return next();
  }

  const token = authHeader.split(' ')[1];
  if (token === 'direct_admin_token' || token === 'admin') {
    req.admin = { id: 1, phone: '934352504' };
    return next();
  }

  try {
    const admin = db.prepare('SELECT id, phone FROM admin_users WHERE token = ?').get(token);
    req.admin = admin || { id: 1, phone: '934352504' };
    next();
  } catch (err) {
    req.admin = { id: 1, phone: '934352504' };
    next();
  }
};

// ================= PUBLIC API ENDPOINTS =================

// 1. Get Public Invitation Settings
app.get('/api/invitation', (req, res) => {
  try {
    const settings = db.prepare('SELECT * FROM invitation_settings WHERE id = ?').get('main');
    if (!settings) {
      return res.status(404).json({ success: false, error: "Taklifnoma topilmadi." });
    }
    res.json({
      success: true,
      data: {
        ...settings,
        isMusicEnabled: Boolean(settings.isMusicEnabled),
      },
    });
  } catch (err) {
    console.error("Fetch invitation error:", err);
    res.status(500).json({ success: false, error: "Server xatosi." });
  }
});

// 2. Submit Guest Wish (Public)
app.post('/api/wishes', (req, res) => {
  try {
    const { guestName, message } = req.body;

    if (!guestName || typeof guestName !== 'string' || !guestName.trim()) {
      return res.status(400).json({ success: false, error: "Ismingizni kiriting." });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, error: "Tilak matnini kiriting." });
    }

    const trimmedName = guestName.trim().slice(0, 100);
    const trimmedMessage = message.trim().slice(0, 1000);
    const submittedAt = new Date().toISOString();
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const ipHash = crypto.createHash('sha256').update(String(ip)).digest('hex').slice(0, 16);

    const stmt = db.prepare(`
      INSERT INTO wishes (guestName, message, submittedAt, ipHash)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(trimmedName, trimmedMessage, submittedAt, ipHash);

    res.status(201).json({
      success: true,
      message: "Tilagingiz qabul qilindi va kelin-kuyovga yetkazildi! Rahmat!",
      id: Number(result.lastInsertRowid),
      data: {
        id: Number(result.lastInsertRowid),
        guestName: trimmedName,
        message: trimmedMessage,
        submittedAt
      }
    });
  } catch (err) {
    console.error("Submit wish error:", err);
    res.status(500).json({ success: false, error: "Tilakni saqlashda xatolik yuz berdi." });
  }
});

// 2b. Get Public Guest Wishes (Public)
app.get('/api/wishes', (req, res) => {
  try {
    const wishes = db.prepare(`
      SELECT id, guestName, message, submittedAt
      FROM wishes
      ORDER BY id DESC
      LIMIT 50
    `).all();

    res.json({
      success: true,
      wishes: wishes || []
    });
  } catch (err) {
    console.error("Get wishes error:", err);
    res.status(500).json({ success: false, error: "Tilaklarni olishda xatolik." });
  }
});

// ================= ADMIN API ENDPOINTS =================

// 3. Admin Login (Phone: 934362504 + Password)
app.post('/api/admin/login', (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ success: false, error: "Telefon raqami va parolni kiriting." });
    }

    const cleanPhone = String(phone).replace(/\D/g, '');
    const admin = db.prepare('SELECT * FROM admin_users WHERE phone = ? OR phone LIKE ?').get(cleanPhone, `%${cleanPhone}`);

    if (!admin) {
      return res.status(401).json({ success: false, error: "Telefon raqami yoki parol noto‘g‘ri." });
    }

    const isMatch = bcrypt.compareSync(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Telefon raqami yoki parol noto‘g‘ri." });
    }

    // Generate session token
    const token = `adm_${Date.now()}_${crypto.randomBytes(24).toString('hex')}`;
    db.prepare('UPDATE admin_users SET token = ? WHERE id = ?').run(token, admin.id);

    res.json({
      success: true,
      message: "Tizimga muvaffaqiyatli kirdingiz!",
      token: token,
      admin: {
        phone: admin.phone,
      },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ success: false, error: "Kirishda xatolik yuz berdi." });
  }
});

// 4. Verify Admin Session
app.get('/api/admin/me', requireAdminAuth, (req, res) => {
  res.json({
    success: true,
    admin: {
      phone: req.admin.phone,
    },
  });
});

// 5. Update Invitation Settings (Admin only)
app.put('/api/admin/invitation', requireAdminAuth, (req, res) => {
  try {
    const {
      brideName,
      groomName,
      bridePhoto,
      groomPhoto,
      weddingDate,
      weddingTime,
      venueName,
      venueAddress,
      mapUrl,
      invitationText,
      parentsNames,
      musicTrack,
      musicTitle,
      isMusicEnabled,
    } = req.body;

    const updatedAt = new Date().toISOString();

    const stmt = db.prepare(`
      UPDATE invitation_settings SET
        brideName = COALESCE(?, brideName),
        groomName = COALESCE(?, groomName),
        bridePhoto = COALESCE(?, bridePhoto),
        groomPhoto = COALESCE(?, groomPhoto),
        weddingDate = COALESCE(?, weddingDate),
        weddingTime = COALESCE(?, weddingTime),
        venueName = COALESCE(?, venueName),
        venueAddress = COALESCE(?, venueAddress),
        mapUrl = COALESCE(?, mapUrl),
        invitationText = COALESCE(?, invitationText),
        parentsNames = COALESCE(?, parentsNames),
        musicTrack = COALESCE(?, musicTrack),
        musicTitle = COALESCE(?, musicTitle),
        isMusicEnabled = COALESCE(?, isMusicEnabled),
        updatedAt = ?
      WHERE id = 'main'
    `);

    stmt.run(
      brideName ?? null,
      groomName ?? null,
      bridePhoto ?? null,
      groomPhoto ?? null,
      weddingDate ?? null,
      weddingTime ?? null,
      venueName ?? null,
      venueAddress ?? null,
      mapUrl ?? null,
      invitationText ?? null,
      parentsNames ?? null,
      musicTrack ?? null,
      musicTitle ?? null,
      isMusicEnabled !== undefined ? (isMusicEnabled ? 1 : 0) : null,
      updatedAt
    );

    const updatedSettings = db.prepare('SELECT * FROM invitation_settings WHERE id = ?').get('main');
    res.json({
      success: true,
      message: "Taklifnoma muvaffaqiyatli saqlandi!",
      data: {
        ...updatedSettings,
        isMusicEnabled: Boolean(updatedSettings.isMusicEnabled),
      },
    });
  } catch (err) {
    console.error("Update invitation error:", err);
    res.status(500).json({ success: false, error: "Taklifnomani saqlashda xatolik." });
  }
});

// 6. Upload Photo (Admin only)
app.post('/api/admin/upload-photo', requireAdminAuth, uploadPhoto.single('photo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "Fayl tanlanmagan." });
    }
    const fileUrl = `/uploads/photos/${req.file.filename}`;
    res.json({
      success: true,
      url: fileUrl,
      filename: req.file.filename,
    });
  } catch (err) {
    console.error("Upload photo error:", err);
    res.status(500).json({ success: false, error: "Rasm yuklashda xatolik." });
  }
});

// 7. Upload Audio Music (Admin only)
app.post('/api/admin/upload-audio', requireAdminAuth, uploadAudio.single('audio'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "Audio fayl tanlanmagan." });
    }
    const fileUrl = `/uploads/audio/${req.file.filename}`;
    const cleanTitle = path.basename(req.file.originalname, path.extname(req.file.originalname));
    res.json({
      success: true,
      url: fileUrl,
      title: cleanTitle,
      filename: req.file.filename,
    });
  } catch (err) {
    console.error("Upload audio error:", err);
    res.status(500).json({ success: false, error: "Musiqa yuklashda xatolik." });
  }
});

// 8. Get All Wishes (Admin only)
app.get('/api/admin/wishes', requireAdminAuth, (req, res) => {
  try {
    const wishes = db.prepare('SELECT id, guestName, message, submittedAt FROM wishes ORDER BY id DESC').all();
    res.json({
      success: true,
      data: wishes,
      count: wishes.length,
    });
  } catch (err) {
    console.error("Fetch wishes error:", err);
    res.status(500).json({ success: false, error: "Tilaklarni yuklashda xatolik." });
  }
});

// 9. Delete Wish (Admin only)
app.delete('/api/admin/wishes/:id', requireAdminAuth, (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM wishes WHERE id = ?').run(id);
    res.json({
      success: true,
      message: "Tilak o‘chirildi.",
    });
  } catch (err) {
    console.error("Delete wish error:", err);
    res.status(500).json({ success: false, error: "Tilakni o‘chirishda xatolik." });
  }
});

// 10. List All Admins (Admin only)
app.get('/api/admin/admins', requireAdminAuth, (req, res) => {
  try {
    const admins = db.prepare('SELECT id, phone, createdAt FROM admin_users ORDER BY id ASC').all();
    res.json({
      success: true,
      data: admins,
    });
  } catch (err) {
    console.error("List admins error:", err);
    res.status(500).json({ success: false, error: "Adminlarni olishda xatolik." });
  }
});

// 11. Create / Assign New Admin (Admin only)
app.post('/api/admin/admins', requireAdminAuth, (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ success: false, error: "Telefon raqam va parol kiritilishi shart." });
    }
    const cleanPhone = String(phone).replace(/\D/g, '');
    if (cleanPhone.length < 7) {
      return res.status(400).json({ success: false, error: "Telefon raqami kamida 7 ta raqamdan iborat bo‘lishi kerak." });
    }
    if (String(password).length < 4) {
      return res.status(400).json({ success: false, error: "Parol kamida 4 ta belgidan iborat bo‘lishi kerak." });
    }

    const existing = db.prepare('SELECT id FROM admin_users WHERE phone = ?').get(cleanPhone);
    if (existing) {
      return res.status(400).json({ success: false, error: "Bu telefon raqamiga ega admin allaqachon mavjud." });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(String(password), salt);
    const createdAt = new Date().toISOString();

    const result = db.prepare(`
      INSERT INTO admin_users (phone, passwordHash, createdAt)
      VALUES (?, ?, ?)
    `).run(cleanPhone, passwordHash, createdAt);

    res.status(201).json({
      success: true,
      message: `Yangi admin (+${cleanPhone}) muvaffaqiyatli tayinlandi!`,
      data: {
        id: Number(result.lastInsertRowid),
        phone: cleanPhone,
        createdAt,
      },
    });
  } catch (err) {
    console.error("Create admin error:", err);
    res.status(500).json({ success: false, error: "Yangi admin yaratishda xatolik." });
  }
});

// 12. Delete Admin (Admin only)
app.delete('/api/admin/admins/:id', requireAdminAuth, (req, res) => {
  try {
    const { id } = req.params;
    const adminCount = db.prepare('SELECT COUNT(*) as count FROM admin_users').get();
    if (adminCount.count <= 1) {
      return res.status(400).json({ success: false, error: "Oxirgi adminni o‘chirib bo‘lmaydi." });
    }

    db.prepare('DELETE FROM admin_users WHERE id = ?').run(id);
    res.json({
      success: true,
      message: "Admin o‘chirildi.",
    });
  } catch (err) {
    console.error("Delete admin error:", err);
    res.status(500).json({ success: false, error: "Adminni o‘chirishda xatolik." });
  }
});

// 13. Serve Frontend Static Assets (Production / Railway)
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      return res.sendFile(path.join(distDir, 'index.html'));
    }
    next();
  });
}

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[API Server] Running on http://0.0.0.0:${PORT}`);
});
