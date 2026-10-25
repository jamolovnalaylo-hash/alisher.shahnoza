import React, { useState, useEffect } from 'react';
import { WeddingInvitationData } from './types';
import { INITIAL_INVITATION_DATA } from './data/sampleData';
import { SvgGoldGradients } from './components/common/GoldFoilDecorations';
import { MasterWeddingInvitation } from './components/viewer/MasterWeddingInvitation';
import { ShareInvitationModal } from './components/common/ShareInvitationModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { royalAudioEngine } from './utils/audioPlayer';

export const App: React.FC = () => {
  // 1. Invitation Data loaded from Backend API (with fallback)
  const [invitationData, setInvitationData] = useState<WeddingInvitationData>(INITIAL_INVITATION_DATA);

  // 2. View Mode: ALWAYS defaults to 'guest' so that admin is NEVER asked upon entry!
  const [currentView, setCurrentView] = useState<'guest' | 'admin'>('guest');

  // Controls
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Fetch real invitation settings from localStorage and backend API
  const loadInvitationFromBackend = async () => {
    // 1. Check LocalStorage first (instant & offline)
    const saved = localStorage.getItem('wedding_invitation_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setInvitationData(parsed);
        if (parsed.musicTrack) {
          royalAudioEngine.setCustomAudio(parsed.musicTrack);
        }
      } catch {}
    }

    // 2. Try fetching from backend API if online
    try {
      const res = await fetch('/api/invitation');
      const data = await res.json();
      if (data.success && data.data) {
        setInvitationData(data.data);
        localStorage.setItem('wedding_invitation_settings', JSON.stringify(data.data));
        if (data.data.musicTrack) {
          royalAudioEngine.setCustomAudio(data.data.musicTrack);
        }
      }
    } catch (err) {
      // Offline or static CDN: already loaded from localStorage or sampleData
    }
  };

  useEffect(() => {
    // If the browser address bar still has #/admin from a previous session, clear it on entry
    // so guests are NEVER greeted with an admin prompt!
    if (window.location.hash.includes('admin')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    loadInvitationFromBackend();
  }, []);

  // Sync music state with audio engine
  useEffect(() => {
    setIsPlayingMusic(royalAudioEngine.getIsPlaying());
  }, []);

  // Toggle Background Music
  const toggleMusic = () => {
    const newState = royalAudioEngine.toggle(invitationData.musicTrack);
    setIsPlayingMusic(newState);
  };

  // ================= VIEW 1: ADMIN DASHBOARD (Only accessed when tiny admin link is clicked) =================
  if (currentView === 'admin') {
    return (
      <AdminDashboard
        onBackToGuestView={() => {
          window.location.hash = '';
          setCurrentView('guest');
          loadInvitationFromBackend();
        }}
        onInvitationUpdated={(newData) => {
          setInvitationData(newData);
          if (newData.musicTrack) {
            royalAudioEngine.setCustomAudio(newData.musicTrack);
          }
        }}
      />
    );
  }

  // ================= VIEW 2: 100% PURE BESPOKE WEDDING INVITATION (NO ADMIN PROMPT) =================
  return (
    <div className="w-full h-full min-h-screen bg-[#17120f] text-[#2C2219] antialiased relative">
      {/* 1. Global SVG Gold Gradients definition */}
      <SvgGoldGradients />

      {/* 2. Main Invitation Experience: 1:1 Video Replica Arched Double Gate & Scenes */}
      <MasterWeddingInvitation
        data={invitationData}
        onAdminClick={() => {
          window.location.hash = '/admin';
          setCurrentView('admin');
        }}
      />

      {/* 3. Share Invitation Modal */}
      <ShareInvitationModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        data={invitationData}
      />
    </div>
  );
};

export default App;
