import React, { useState, useEffect } from 'react';
import { WeddingInvitationData } from '../../types';
import QRCode from 'qrcode';
import {
  X,
  Copy,
  Check,
  Send,
  MessageCircle,
  QrCode,
  Download,
  Globe,
  Sparkles,
  Share2
} from 'lucide-react';

interface ShareInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WeddingInvitationData;
}

export const ShareInvitationModal: React.FC<ShareInvitationModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'link' | 'qr' | 'deploy'>('link');

  // Build the complete shareable URL with parameters
  const generateShareUrl = () => {
    try {
      const baseUrl = window.location.origin + window.location.pathname;
      const params = new URLSearchParams();

      if (data.brideName) params.set('b', data.brideName);
      if (data.groomName) params.set('g', data.groomName);
      if (data.weddingDate) params.set('d', data.weddingDate);
      if (data.weddingTime) params.set('t', data.weddingTime);
      if (data.venueName) params.set('v', data.venueName);
      if (data.venueAddress) params.set('a', data.venueAddress);
      if (data.mapUrl) params.set('map', data.mapUrl);

      return `${baseUrl}?${params.toString()}`;
    } catch {
      return window.location.href;
    }
  };

  const shareUrl = generateShareUrl();

  // Generate QR Code data URL
  useEffect(() => {
    if (!isOpen) return;
    QRCode.toDataURL(shareUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: '#4D3716',
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error("QR Code Error:", err));
  }, [isOpen, shareUrl]);

  if (!isOpen) return null;

  // Copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Telegram share text
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(
    `💍 Sizga maxsus taklifnoma!\n\n${data.brideName} & ${data.groomName} sizni nikoh to‘yiga chin qalbimizdan taklif etamiz.\n\nTaklifnomani ochish:`
  )}`;

  // WhatsApp share text
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `💍 Sizga maxsus taklifnoma!\n\n${data.brideName} & ${data.groomName} sizni nikoh to‘yiga chin qalbimizdan taklif etamiz.\n\nTaklifnomani ochish: ${shareUrl}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-3xl border-2 border-[#D4AF37]/60 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F3EBE0] p-6 sm:p-8 shadow-2xl z-10 text-[#2C2219]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-200/70 text-stone-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full mx-auto mb-2 bg-gradient-to-br from-[#D4AF37] to-[#AA771C] flex items-center justify-center text-white shadow-md">
            <Share2 className="w-6 h-6 text-[#FFF9E6]" />
          </div>
          <span className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[#8C6D28] font-bold block">
            ULASHISH VA YUBORISH
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#2C2219]">
            Taklifnoma Havolasini Ulashish
          </h3>
          <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-2" />
          <p className="text-xs text-stone-600 max-w-sm mx-auto">
            Mehmon ushbu havolani ochganida unga hashamatli konvert, ochilish animatsiyasi va sizning barcha ma’lumotlaringiz ko‘rinadi.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex rounded-xl bg-stone-200/60 p-1 mb-5">
          <button
            onClick={() => setActiveTab('link')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-cinzel font-semibold transition-all cursor-pointer ${
              activeTab === 'link'
                ? 'bg-white text-[#8C6D28] shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Havola & Ijtimoiy tarmoqlar
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-cinzel font-semibold transition-all cursor-pointer ${
              activeTab === 'qr'
                ? 'bg-white text-[#8C6D28] shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            QR Kod
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-cinzel font-semibold transition-all cursor-pointer ${
              activeTab === 'deploy'
                ? 'bg-white text-[#8C6D28] shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Internetga joylash
          </button>
        </div>

        {/* Tab 1: Direct Link & Messenger Sharing */}
        {activeTab === 'link' && (
          <div className="space-y-4">
            {/* Copyable Link Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-cinzel font-semibold text-[#8C6D28]">
                Taklifnoma havolasi:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="w-full px-3 py-2 text-xs font-mono bg-white rounded-xl border border-stone-300 select-all outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-white text-xs font-cinzel font-bold flex items-center gap-1.5 hover:shadow-gold-glow transition-all shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>Nusxalandi!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Nusxa olish</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Share Buttons: Telegram & WhatsApp */}
            <div className="pt-2">
              <label className="text-xs font-cinzel font-semibold text-stone-600 block mb-2">
                Tezkor yuborish:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={telegramShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-[#2AABEE] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:opacity-95 shadow-sm transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Telegram</span>
                </a>

                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-[#25D366] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:opacity-95 shadow-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: QR Code */}
        {activeTab === 'qr' && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-3 rounded-2xl bg-white border-2 border-[#D4AF37]/50 shadow-md">
              {qrCodeUrl ? (
                <img
                  src={qrCodeUrl}
                  alt="Taklifnoma QR Kodi"
                  className="w-48 h-48 object-contain"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-xs text-stone-400">
                  Yuklanmoqda...
                </div>
              )}
            </div>
            <p className="text-xs text-center text-stone-600 max-w-xs">
              Ushbu QR kodni telefon kamerasi bilan skaner qilib, taklifnomani bevosita ochish mumkin.
            </p>
            {qrCodeUrl && (
              <a
                href={qrCodeUrl}
                download={`taklifnoma-${data.brideName}-${data.groomName}.png`}
                className="py-2 px-5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-white text-xs font-cinzel font-bold flex items-center gap-2 shadow-sm hover:shadow-gold-glow transition-all"
              >
                <Download className="w-4 h-4" />
                <span>QR Kodni yuklab olish (PNG)</span>
              </a>
            )}
          </div>
        )}

        {/* Tab 3: Deployment Guide */}
        {activeTab === 'deploy' && (
          <div className="space-y-3 text-xs leading-relaxed text-stone-700">
            <div className="p-3.5 rounded-xl bg-white border border-[#D4AF37]/40">
              <h4 className="font-cinzel font-bold text-[#8C6D28] mb-1 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#C5A047]" />
                <span>Internetga (Vercel / Netlify) bepul joylash:</span>
              </h4>
              <ol className="list-decimal list-inside space-y-1.5 text-stone-600 mt-2">
                <li>
                  Loyihani build qiling: <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-[11px]">npm run build</code>
                </li>
                <li>
                  Tayyor <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-[11px]">dist</code> jildini <strong>Vercel.com</strong> yoki <strong>Netlify.com</strong> saytiga tashlang (drag & drop).
                </li>
                <li>
                  Sizga o‘zingizning shaxsiy havolangiz (masalan: <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-[11px]">madina-aziz.vercel.app</code>) beriladi!
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
