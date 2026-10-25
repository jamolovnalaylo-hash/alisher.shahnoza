import React, { useState, useEffect, useRef } from 'react';
import { WeddingInvitationData } from '../../types';
import { INITIAL_INVITATION_DATA } from '../../data/sampleData';
import { royalAudioEngine } from '../../utils/audioPlayer';
import {
  Lock,
  LogOut,
  Upload,
  Calendar,
  Clock,
  MapPin,
  FileText,
  User,
  Music,
  Camera,
  Play,
  Pause,
  Trash2,
  Check,
  Eye,
  HeartHandshake,
  Settings,
  ShieldCheck,
  Save,
  RefreshCw,
  UserPlus,
  Shield,
  RotateCcw,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';

interface WishItem {
  id: number;
  guestName: string;
  message: string;
  submittedAt: string;
}

interface AdminUserItem {
  id: number;
  phone: string;
  createdAt: string;
}

interface AdminDashboardProps {
  onBackToGuestView: () => void;
  onInvitationUpdated: (newData: WeddingInvitationData) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToGuestView,
  onInvitationUpdated,
}) => {
  // Direct Admin Access ("admin panelga kirishda parol soramasin")
  const [authToken] = useState<string>('direct_admin_token');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'settings' | 'music' | 'wishes' | 'admins'>('settings');

  // Form State: ALWAYS initialized to INITIAL_INVITATION_DATA (never null!)
  const [formData, setFormData] = useState<WeddingInvitationData>(INITIAL_INVITATION_DATA);
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [isLoadingWishes, setIsLoadingWishes] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessToast, setSaveSuccessToast] = useState(false);
  const [isPlayingTestAudio, setIsPlayingTestAudio] = useState(false);

  // Admins Management State
  const [adminsList, setAdminsList] = useState<AdminUserItem[]>([
    { id: 1, phone: '934352504', createdAt: new Date().toLocaleDateString('uz-UZ') },
  ]);
  const [isLoadingAdmins, setIsLoadingAdmins] = useState(false);
  const [newAdminPhone, setNewAdminPhone] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [adminSuccessMsg, setAdminSuccessMsg] = useState('');
  const [adminErrMsg, setAdminErrMsg] = useState('');
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);

  const photoFileRef = useRef<HTMLInputElement | null>(null);
  const audioFileRef = useRef<HTMLInputElement | null>(null);

  // Load Invitation Settings from LocalStorage & API
  const fetchSettings = async () => {
    // 1. Try LocalStorage
    const saved = localStorage.getItem('wedding_invitation_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch {}
    }

    // 2. Try Backend API
    try {
      const res = await fetch('/api/invitation');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          setFormData((prev) => ({ ...prev, ...data.data }));
          localStorage.setItem('wedding_invitation_settings', JSON.stringify(data.data));
        }
      }
    } catch (err) {
      console.log("Using cached settings");
    }
  };

  // Load Wishes from API / LocalStorage
  const fetchWishes = async (token: string) => {
    setIsLoadingWishes(true);
    try {
      const res = await fetch('/api/admin/wishes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setWishes(data.data || []);
        }
      }
    } catch (err) {
      console.log("Offline mode for wishes");
    } finally {
      setIsLoadingWishes(false);
    }
  };

  // Load Admins from LocalStorage & API
  const fetchAdmins = async (token: string) => {
    setIsLoadingAdmins(true);
    const localAdmins = localStorage.getItem('wedding_admins');
    if (localAdmins) {
      try {
        setAdminsList(JSON.parse(localAdmins));
      } catch {}
    } else {
      setAdminsList([
        { id: 1, phone: '934352504', createdAt: new Date().toLocaleDateString('uz-UZ') },
      ]);
    }

    try {
      const res = await fetch('/api/admin/admins', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setAdminsList(data.data);
          localStorage.setItem('wedding_admins', JSON.stringify(data.data));
        }
      }
    } catch (err) {
      console.log("Using cached admin list");
    } finally {
      setIsLoadingAdmins(false);
    }
  };

  useEffect(() => {
    fetchSettings();
    fetchWishes(authToken);
    fetchAdmins(authToken);
  }, []);

  // Handle Logout / Return to Invitation
  const handleLogout = () => {
    royalAudioEngine.stop();
    setIsPlayingTestAudio(false);
    onBackToGuestView();
  };

  // Photo Upload Handler (Multipart File with Base64 Fallback)
  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Immediately read Base64 so preview and persistence work instantaneously
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result as string;
      if (base64Url) {
        setFormData((prev) => ({
          ...prev,
          bridePhoto: base64Url,
          groomPhoto: base64Url,
        }));
      }
    };
    reader.readAsDataURL(file);

    // 2. Also try uploading to server if backend is active
    const bodyFormData = new FormData();
    bodyFormData.append('photo', file);
    fetch('/api/admin/upload-photo', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: bodyFormData,
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.url) {
          setFormData((prev) => ({
            ...prev,
            bridePhoto: data.url,
            groomPhoto: data.url,
          }));
        }
      })
      .catch(() => {
        // Base64 already saved locally
      });
  };

  // Reset Photo to Default
  const handleResetPhoto = () => {
    setFormData((prev) => ({
      ...prev,
      bridePhoto: './assets/couple-alisher-shaxnoza.jpg',
      groomPhoto: './assets/couple-alisher-shaxnoza.jpg',
    }));
  };

  // Audio Upload Handler with Base64 Fallback
  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cleanTitle = file.name.replace(/\.[^/.]+$/, "");

    // 1. Read Base64 for instant local playback & storage
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const audioUrl = uploadEvent.target?.result as string;
      if (audioUrl) {
        setFormData((prev) => ({
          ...prev,
          musicTrack: audioUrl,
          musicTitle: cleanTitle,
        }));
        royalAudioEngine.setCustomAudio(audioUrl);
      }
    };
    reader.readAsDataURL(file);

    // 2. Try uploading to backend
    const bodyFormData = new FormData();
    bodyFormData.append('audio', file);
    fetch('/api/admin/upload-audio', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: bodyFormData,
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.url) {
          setFormData((prev) => ({
            ...prev,
            musicTrack: data.url,
            musicTitle: data.title || cleanTitle,
          }));
          royalAudioEngine.setCustomAudio(data.url);
        }
      })
      .catch(() => {
        // Base64 active
      });
  };

  // Reset Music to Default Çalıkuşu Track
  const handleResetMusic = () => {
    setFormData((prev) => ({
      ...prev,
      musicTrack: './assets/choli-qushi.mp3',
      musicTitle: 'Çalıkuşu ("Choli qushi") seriali musiqasi',
    }));
    royalAudioEngine.setCustomAudio('./assets/choli-qushi.mp3');
    setIsPlayingTestAudio(false);
  };

  // Toggle Test Audio Player
  const toggleTestAudio = () => {
    if (formData.musicTrack) {
      royalAudioEngine.setCustomAudio(formData.musicTrack);
    }
    const state = royalAudioEngine.toggle();
    setIsPlayingTestAudio(state);
  };

  // Save All Changes to Server & LocalStorage
  const handleSaveAll = async () => {
    setIsSaving(true);

    // 1. Save to localStorage immediately so changes are 100% persistent
    try {
      localStorage.setItem('wedding_invitation_settings', JSON.stringify(formData));
      onInvitationUpdated(formData);
    } catch (e) {
      console.warn("LocalStorage save warning:", e);
    }

    // 2. Also sync to backend API if available
    try {
      const res = await fetch('/api/admin/invitation', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const resData = await res.json();
        if (resData.success && resData.data) {
          onInvitationUpdated(resData.data);
        }
      }
    } catch (err) {
      // Backend offline or static host: already saved locally!
    } finally {
      setIsSaving(false);
      setSaveSuccessToast(true);
      setTimeout(() => setSaveSuccessToast(false), 3000);
    }
  };

  // Delete Wish
  const handleDeleteWish = async (id: number) => {
    if (!window.confirm("Ushbu tilakni o‘chirmoqchimisiz?")) return;

    setWishes((prev) => prev.filter((w) => w.id !== id));

    try {
      await fetch(`/api/admin/wishes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } catch (err) {
      // Offline
    }
  };

  // Add New Admin
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminErrMsg('');
    setAdminSuccessMsg('');

    const cleanNumber = newAdminPhone.replace(/\D/g, '');
    if (cleanNumber.length < 9) {
      setAdminErrMsg("Iltimos, to‘g‘ri telefon raqam kiriting (masalan: 998901234567 yoki 934352504)");
      return;
    }

    if (!newAdminPassword || newAdminPassword.trim().length < 4) {
      setAdminErrMsg("Parol kamida 4 ta belgidan iborat bo‘lishi lozim.");
      return;
    }

    setIsAddingAdmin(true);

    const newAdminObj: AdminUserItem = {
      id: Date.now(),
      phone: cleanNumber,
      createdAt: new Date().toLocaleDateString('uz-UZ'),
    };

    const updated = [...adminsList, newAdminObj];
    setAdminsList(updated);
    localStorage.setItem('wedding_admins', JSON.stringify(updated));
    setAdminSuccessMsg(`Yangi admin (+${cleanNumber}) muvaffaqiyatli tayinlandi!`);
    setNewAdminPhone('');
    setNewAdminPassword('');
    setTimeout(() => setAdminSuccessMsg(''), 4000);

    try {
      await fetch('/api/admin/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          phone: cleanNumber,
          password: newAdminPassword.trim(),
        }),
      });
    } catch (err) {
      // Kept local
    } finally {
      setIsAddingAdmin(false);
    }
  };

  // Delete Admin
  const handleDeleteAdmin = async (id: number, phone: string) => {
    if (adminsList.length <= 1) {
      alert("Oxirgi adminni o‘chirib bo‘lmaydi.");
      return;
    }
    if (!window.confirm(`+${phone} adminini o‘chirib tashlamoqchimisiz?`)) return;

    const updated = adminsList.filter((a) => a.id !== id);
    setAdminsList(updated);
    localStorage.setItem('wedding_admins', JSON.stringify(updated));

    try {
      await fetch(`/api/admin/admins/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } catch (err) {
      // Kept local
    }
  };

  // ================= ADMIN DASHBOARD (DIRECT ACCESS: "parol soramasin") =================
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2219]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-gradient-to-r from-[#FFFDF9] via-[#FAF5EC] to-[#F3EBE0] border-b-2 border-[#D4AF37]/50 px-4 sm:px-8 py-3.5 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#751628] to-[#450711] flex items-center justify-center text-white shadow-sm border border-[#D4AF37]">
            <ShieldCheck className="w-5 h-5 text-[#FDE29A]" />
          </div>
          <div>
            <span className="font-cinzel text-[10px] tracking-widest uppercase text-[#751628] font-bold block">
              BOSHQARUV PANELI (934352504)
            </span>
            <h1 className="font-serif text-lg sm:text-xl font-bold text-[#2C2219]">
              To‘y Taklifnomasini Boshqarish
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBackToGuestView}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#D4AF37] bg-white text-xs font-cinzel font-semibold text-[#8C6D28] hover:bg-[#FAF3E6] transition-all cursor-pointer shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Taklifnomani ko‘rish</span>
          </button>

          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#751628] to-[#520C17] text-white text-xs font-cinzel font-bold tracking-wider uppercase shadow-md hover:opacity-95 transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "Saqlanmoqda..." : "Saqlash"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-stone-200 text-stone-600 hover:text-red-700 transition-colors cursor-pointer"
            title="Chiqish"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Save Toast Notification */}
      {saveSuccessToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#2C2219] text-white px-5 py-3 rounded-2xl shadow-2xl border-2 border-[#D4AF37] text-xs sm:text-sm font-cinzel flex items-center gap-2.5 animate-bounce">
          <Check className="w-5 h-5 text-emerald-400" />
          <span>Barcha o‘zgarishlar muvaffaqiyatli saqlandi!</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        {/* Navigation Tabs */}
        <div className="flex rounded-2xl bg-stone-200/70 p-1.5 mb-8 max-w-lg mx-auto shadow-inner">
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-cinzel font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-white text-[#751628] shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Sozlamalar</span>
          </button>

          <button
            onClick={() => setActiveTab('music')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-cinzel font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'music'
                ? 'bg-white text-[#751628] shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>Musiqa</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('wishes');
              fetchWishes(authToken);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-cinzel font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'wishes'
                ? 'bg-white text-[#751628] shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Tilaklar ({wishes.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('admins');
              fetchAdmins(authToken);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-cinzel font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'admins'
                ? 'bg-white text-[#751628] shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Adminlar ({adminsList.length})</span>
          </button>
        </div>

        {/* ================= TAB 1: TAKLIFNOMA SOZLAMALARI (HAMMA YOZUVLAR VA RASMLAR) ================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6 bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/50 shadow-sm">
            {/* 1. Single Couple Photo Section */}
            <div>
              <h3 className="font-cinzel text-sm uppercase tracking-wider text-[#751628] font-bold mb-3 flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#D4AF37]" />
                <span>1. Kelin va Kuyov Fotosurati (Asosiy Rasm)</span>
              </h3>

              <div className="p-5 rounded-2xl border border-stone-200 bg-white flex flex-col items-center text-center shadow-sm max-w-md mx-auto">
                <div className="w-44 h-56 rounded-t-[45px] rounded-b-2xl overflow-hidden border-2 border-[#D4AF37] mb-3 bg-stone-100 shadow-inner">
                  <img
                    src={formData.bridePhoto || formData.groomPhoto || "./assets/couple-alisher-shaxnoza.jpg"}
                    alt="Kelin va Kuyov"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="font-cinzel text-xs font-bold text-[#751628] mb-3">
                  Taklifnoma uchun yagona fotosurat
                </span>

                <input
                  type="file"
                  ref={photoFileRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoFileUpload}
                />

                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <button
                    type="button"
                    onClick={() => photoFileRef.current?.click()}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#FAF5EC] border border-[#D4AF37]/60 text-xs font-cinzel font-semibold text-[#8C6D28] hover:bg-[#F3E7CF] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Yangi Rasm Yuklash</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetPhoto}
                    className="py-2.5 px-3 rounded-xl border border-stone-300 text-xs font-cinzel text-stone-600 hover:text-red-700 hover:bg-stone-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Asl rasmga qaytarish"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Asliga qaytarish</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Names Section */}
            <div className="pt-2">
              <h3 className="font-cinzel text-sm uppercase tracking-wider text-[#751628] font-bold mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-[#D4AF37]" />
                <span>2. Kelin va Kuyov Ismlari</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    Kuyov ismi:
                  </label>
                  <input
                    type="text"
                    value={formData.groomName || ''}
                    onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                    placeholder="Masalan: Alisher"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none font-serif text-base"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    Kelin ismi:
                  </label>
                  <input
                    type="text"
                    value={formData.brideName || ''}
                    onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                    placeholder="Masalan: Shahnoza"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none font-serif text-base"
                  />
                </div>
              </div>
            </div>

            {/* 3. Date & Time */}
            <div className="pt-2">
              <h3 className="font-cinzel text-sm uppercase tracking-wider text-[#751628] font-bold mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>3. To‘y Sanasi va Boshlanish Vaqti</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    To‘y sanasi:
                  </label>
                  <input
                    type="date"
                    value={formData.weddingDate || '2026-11-03'}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none text-sm font-sans"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    Boshlanish vaqti:
                  </label>
                  <input
                    type="time"
                    value={formData.weddingTime || '18:00'}
                    onChange={(e) => setFormData({ ...formData, weddingTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none text-sm font-sans"
                  />
                </div>
              </div>
            </div>

            {/* 4. Venue & Map */}
            <div className="pt-2">
              <h3 className="font-cinzel text-sm uppercase tracking-wider text-[#751628] font-bold mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>4. To‘yxona va Manzil</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    To‘yxona nomi:
                  </label>
                  <input
                    type="text"
                    value={formData.venueName || ''}
                    onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                    placeholder='Masalan: "Charag‘on" restorani'
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none font-serif text-base"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    To‘yxona manzili:
                  </label>
                  <input
                    type="text"
                    value={formData.venueAddress || ''}
                    onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                    placeholder="Masalan: Buxoro viloyati, Qorako‘l tumani, Charag‘on restorani"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    Google Maps havolasi (Lokatsiya):
                  </label>
                  <input
                    type="url"
                    value={formData.mapUrl || ''}
                    onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                    placeholder="https://maps.google.com/?q=..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            {/* 5. Invitation Texts (All custom copy) */}
            <div className="pt-2">
              <h3 className="font-cinzel text-sm uppercase tracking-wider text-[#751628] font-bold mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                <span>5. Taklifnoma Matnlari (Barcha Yozuvlar)</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    Taklifnoma sarlavhasi:
                  </label>
                  <input
                    type="text"
                    value={formData.greetingTitle || 'Hurmatli aziz mehmonimiz!'}
                    onChange={(e) => setFormData({ ...formData, greetingTitle: e.target.value })}
                    placeholder="Hurmatli aziz mehmonimiz!"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none font-serif text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    Asosiy taklifnoma matni:
                  </label>
                  <textarea
                    rows={4}
                    value={formData.invitationText || ''}
                    onChange={(e) => setFormData({ ...formData, invitationText: e.target.value })}
                    className="w-full p-4 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none text-xs sm:text-sm font-serif leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    Ota-onalar xonadoni (hurmat bilan):
                  </label>
                  <input
                    type="text"
                    value={formData.parentsNames || ''}
                    onChange={(e) => setFormData({ ...formData, parentsNames: e.target.value })}
                    placeholder="Masalan: Buxoro xonadoni"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    Yakuniy eslatma / xush kelibsiz so‘zlari:
                  </label>
                  <input
                    type="text"
                    value={formData.footerNote || '«Sizning tashrifingiz to‘yimizga cheksiz quvonch bag‘ishlaydi!»'}
                    onChange={(e) => setFormData({ ...formData, footerNote: e.target.value })}
                    placeholder="«Sizning tashrifingiz to‘yimizga cheksiz quvonch bag‘ishlaydi!»"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none text-sm italic"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleSaveAll}
                disabled={isSaving}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#751628] to-[#520C17] text-white text-xs sm:text-sm font-cinzel font-bold tracking-widest uppercase shadow-md hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saqlanmoqda..." : "Barcha O‘zgarishlarni Saqlash"}</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 2: MUSIQA BOSHQARUVI VA O‘ZGARTIRISH ================= */}
        {activeTab === 'music' && (
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/50 shadow-sm space-y-6">
            <div>
              <h3 className="font-cinzel text-base uppercase tracking-wider text-[#751628] font-bold mb-2 flex items-center gap-2">
                <Music className="w-5 h-5 text-[#D4AF37]" />
                <span>To‘y Taklifnomasi Musiqasini O‘zgartirish</span>
              </h3>
              <p className="text-xs text-stone-600">
                Ushbu bo‘limda taklifnoma ochilganda yangraydigan audio faylni yoki uning nomini o‘zgartirishingiz mumkin.
              </p>
            </div>

            {/* Current Track Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FAF5EC] to-[#F3EBE0] border border-[#D4AF37]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-cinzel uppercase tracking-widest text-[#751628] font-bold block mb-1">
                  Hozirgi Musiqa:
                </span>
                <span className="font-serif text-base sm:text-lg font-bold text-[#2C2219] block">
                  {formData.musicTitle || "Çalıkuşu («Choli qushi») seriali musiqasi"}
                </span>
              </div>

              <button
                type="button"
                onClick={toggleTestAudio}
                className="py-2.5 px-5 rounded-full bg-gradient-to-r from-[#751628] to-[#520C17] text-white text-xs font-cinzel font-semibold flex items-center gap-2 shadow-sm hover:opacity-95 cursor-pointer shrink-0"
              >
                {isPlayingTestAudio ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>To‘xtatish</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Eshitib ko‘rish</span>
                  </>
                )}
              </button>
            </div>

            {/* Music Title Customization */}
            <div>
              <label className="text-xs font-cinzel font-bold text-[#751628] block mb-1">
                Musiqa nomi (ekranda ko‘rinadigan sarlavha):
              </label>
              <input
                type="text"
                value={formData.musicTitle || ''}
                onChange={(e) => setFormData({ ...formData, musicTitle: e.target.value })}
                placeholder="Masalan: Çalıkuşu («Choli qushi») seriali musiqasi"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#751628] bg-white outline-none font-serif text-sm"
              />
            </div>

            {/* Upload New Music File */}
            <div className="p-6 rounded-2xl border-2 border-dashed border-[#D4AF37]/60 bg-white text-center space-y-3">
              <Upload className="w-10 h-10 text-[#C5A047] mx-auto" />
              <h4 className="font-cinzel text-sm font-bold text-[#751628]">
                Kompyuter yoki Telefondan Yangi Audio Fayl Yuklash
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                MP3, WAV yoki M4A formatidagi istalgan audio faylni tanlang.
              </p>
              <input
                type="file"
                ref={audioFileRef}
                accept="audio/*"
                className="hidden"
                onChange={handleAudioFileUpload}
              />
              <button
                type="button"
                onClick={() => audioFileRef.current?.click()}
                className="py-2.5 px-6 rounded-full bg-[#FAF5EC] border border-[#D4AF37] text-xs font-cinzel font-bold text-[#8C6D28] hover:bg-[#F3E7CF] transition-all cursor-pointer shadow-sm"
              >
                Audio Faylni Tanlash (MP3)
              </button>
            </div>

            {/* Revert to default */}
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={handleResetMusic}
                className="text-xs font-cinzel font-semibold text-stone-600 hover:text-red-700 underline cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Standart «Çalıkuşu» musiqasiga qaytarish</span>
              </button>

              <button
                type="button"
                onClick={handleSaveAll}
                disabled={isSaving}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#751628] to-[#520C17] text-white text-xs sm:text-sm font-cinzel font-bold tracking-widest uppercase shadow-md hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saqlanmoqda..." : "Musiqani Saqlash"}</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 3: MEHMONLAR TILAKLARI ================= */}
        {activeTab === 'wishes' && (
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/50 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h3 className="font-cinzel text-base uppercase tracking-wider text-[#751628] font-bold">
                  Mehmonlardan Kelgan Ezgu Tilaklar
                </h3>
                <p className="text-xs text-stone-600">
                  Ushbu tilaklar faqat sizga ko‘rinadi, boshqa mehmonlarga ko‘rinmaydi.
                </p>
              </div>
              <button
                type="button"
                onClick={() => fetchWishes(authToken)}
                className="p-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                title="Yangilash"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {isLoadingWishes ? (
              <div className="py-12 text-center text-xs text-stone-500">
                Tilaklar yuklanmoqda...
              </div>
            ) : wishes.length === 0 ? (
              <div className="py-12 text-center text-stone-500 font-serif text-sm">
                Hozircha mehmonlar tomonidan tilaklar qoldirilmagan.
              </div>
            ) : (
              <div className="space-y-3">
                {wishes.map((wish) => (
                  <div
                    key={wish.id}
                    className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-start justify-between gap-4 transition-all hover:border-[#D4AF37]"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-cinzel text-xs font-bold text-[#751628]">
                          {wish.guestName}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono">
                          {new Date(wish.submittedAt).toLocaleString('uz-UZ')}
                        </span>
                      </div>
                      <p className="font-serif text-sm text-stone-700 leading-relaxed italic">
                        «{wish.message}»
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteWish(wish.id)}
                      className="p-2 rounded-xl text-stone-400 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                      title="Tilakni o‘chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: ADMINLARNI BOSHQARISH VA YAYINGI ADMIN TAYINLASH ================= */}
        {activeTab === 'admins' && (
          <div className="space-y-6">
            {/* 1. Yangi Admin Qo‘shish Formasi */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/50 shadow-sm">
              <div className="flex items-center gap-3 mb-5 border-b border-stone-200 pb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#751628] to-[#450711] flex items-center justify-center text-white shadow-md">
                  <UserPlus className="w-5 h-5 text-[#FDE29A]" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base uppercase tracking-wider text-[#751628] font-bold">
                    Yangi Administrator Tayinlash
                  </h3>
                  <p className="text-xs text-stone-600">
                    Yangi admin o‘z telefon raqami va paroli orqali tizimga kira oladi.
                  </p>
                </div>
              </div>

              <form onSubmit={handleAddAdmin} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-cinzel font-bold text-[#751628] block mb-1">
                    Admin Telefon Raqami: *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAdminPhone}
                    onChange={(e) => setNewAdminPhone(e.target.value)}
                    placeholder="Masalan: 998901234567 yoki 934352504"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#751628] focus:ring-1 focus:ring-[#751628] bg-white outline-none font-mono text-sm shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-cinzel font-bold text-[#751628] block mb-1">
                    Parol: *
                  </label>
                  <input
                    type="password"
                    required
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    placeholder="Kamida 4 ta belgi"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#751628] focus:ring-1 focus:ring-[#751628] bg-white outline-none text-sm shadow-sm"
                  />
                </div>

                {adminErrMsg && (
                  <div className="sm:col-span-2 text-xs text-red-600 font-medium">
                    {adminErrMsg}
                  </div>
                )}

                {adminSuccessMsg && (
                  <div className="sm:col-span-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-300 p-2.5 rounded-xl font-medium">
                    {adminSuccessMsg}
                  </div>
                )}

                <div className="sm:col-span-2 flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isAddingAdmin}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#751628] to-[#520C17] text-white text-xs font-cinzel font-bold tracking-wider uppercase shadow-md hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    <UserPlus className="w-4 h-4 text-[#FDE29A]" />
                    <span>{isAddingAdmin ? "Tayinlanmoqda..." : "Yangi Admin Tayinlash"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* 2. Mavjud Administratorlar Ro‘yxati */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/50 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div>
                  <h3 className="font-cinzel text-base uppercase tracking-wider text-[#751628] font-bold">
                    Mavjud Administratorlar Ro‘yxati ({adminsList.length})
                  </h3>
                  <p className="text-xs text-stone-600">
                    Ushbu raqamlar orqali taklifnomani tahrirlash huquqi mavjud.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => fetchAdmins(authToken)}
                  className="p-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                  title="Yangilash"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {isLoadingAdmins ? (
                <div className="py-8 text-center text-xs text-stone-500">
                  Adminlar ro‘yxati yuklanmoqda...
                </div>
              ) : adminsList.length === 0 ? (
                <div className="py-8 text-center text-stone-500 font-serif text-sm">
                  Adminlar topilmadi.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {adminsList.map((admin) => (
                    <div
                      key={admin.id}
                      className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between gap-4 transition-all hover:border-[#D4AF37]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-[#751628]">
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-mono text-sm font-bold text-stone-800">
                            +{admin.phone}
                          </p>
                          <p className="text-[10px] text-stone-400">
                            Tayinlangan sana: {admin.createdAt}
                          </p>
                        </div>
                      </div>

                      {adminsList.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteAdmin(admin.id, admin.phone)}
                          className="p-2 rounded-xl text-stone-400 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                          title="Adminni bekor qilish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
