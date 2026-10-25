import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { WeddingInvitationData } from '../../types';
import {
  Share2,
  Copy,
  QrCode,
  Download,
  Printer,
  Check,
  Send,
  X,
  FileImage,
  Eye,
  Edit3,
  Bookmark
} from 'lucide-react';

interface ShareExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WeddingInvitationData;
  onViewGuest: () => void;
  onEdit: () => void;
  onSaveLocal: () => void;
}

export const ShareExportModal: React.FC<ShareExportModalProps> = ({
  isOpen,
  onClose,
  data,
  onViewGuest,
  onEdit,
  onSaveLocal,
}) => {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Generate shareable URL
  const getShareUrl = () => {
    try {
      const url = new URL(window.location.origin + window.location.pathname);
      url.searchParams.set('view', 'guest');
      url.searchParams.set('design', data.designId);
      url.searchParams.set('b', encodeURIComponent(data.brideName || 'Madina'));
      url.searchParams.set('g', encodeURIComponent(data.groomName || 'Aziz'));
      url.searchParams.set('d', data.weddingDate);
      url.searchParams.set('t', data.weddingTime);
      url.searchParams.set('v', encodeURIComponent(data.venueName));
      url.searchParams.set('a', encodeURIComponent(data.venueAddress));
      return url.toString();
    } catch {
      return window.location.href;
    }
  };

  const shareUrl = getShareUrl();

  // Generate real QR code
  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(shareUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#351F0D',
          light: '#FAF7F2',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error("QR Code Error:", err));
    }
  }, [isOpen, shareUrl]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1. Copy link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      showToast("Havola nusxalandi!");
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // 2. Web Share / Telegram / WhatsApp
  const handleNativeShare = async () => {
    const text = `Sizni ${data.brideName} va ${data.groomName}ning nikoh to‘yiga taklif etamiz!\nTo‘yxona: ${data.venueName}\nSana: ${data.weddingDate}\n\nTaklifnomani ko‘rish:`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data.brideName} & ${data.groomName} Nikoh To‘yi`,
          text: text,
          url: shareUrl,
        });
        showToast("Muvaffaqiyatli ulashildi!");
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyLink();
    }
  };

  const handleShareTelegram = () => {
    const text = encodeURIComponent(`Sizni ${data.brideName} va ${data.groomName}ning nikoh to‘yiga taklif etamiz! To‘yxona: ${data.venueName}, Sana: ${data.weddingDate}`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${text}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Sizni ${data.brideName} va ${data.groomName}ning nikoh to‘yiga taklif etamiz!\n${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // 3. Download QR Code PNG
  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `QR-Taklifnoma-${data.brideName}-${data.groomName}.png`;
    a.click();
    showToast("QR-kod yuklab olindi!");
  };

  // 4. Download as high quality Image (PNG)
  const handleDownloadImage = async () => {
    const cardEl = document.getElementById('invitation-card-container');
    if (!cardEl) {
      alert("Iltimos, avval taklifnoma ko‘rinishini oching.");
      return;
    }

    try {
      setIsExportingImage(true);
      showToast("Rasm tayyorlanmoqda, iltimos kuting...");

      const canvas = await html2canvas(cardEl, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `Taklifnoma-${data.brideName || 'Kelin'}-${data.groomName || 'Kuyov'}.png`;
      link.click();
      setIsExportingImage(false);
      showToast("Rasm muvaffaqiyatli saqlandi!");
    } catch (err) {
      console.error("HTML2Canvas Error:", err);
      setIsExportingImage(false);
      alert("Rasm eksportida xatolik yuz berdi. Iltimos, sahifani yangilab qayta urinib ko‘ring.");
    }
  };

  // 5. Download as PDF / Print
  const handlePrintPdf = () => {
    onViewGuest();
    setTimeout(() => {
      window.print();
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in no-print">
      <div className="relative w-full max-w-lg rounded-3xl border border-[#D4AF37]/50 bg-[#FAF7F2] p-6 shadow-2xl text-[#2B2319] max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-[10px] font-cinzel uppercase tracking-[0.3em] text-[#8C6D28] font-bold block mb-1">
            ROYAL WEDDING STUDIO
          </span>
          <h3 className="font-cinzel text-xl font-bold text-gold-foil">
            Taklifnomani Saqlash & Ulashish
          </h3>
          <p className="text-xs font-serif text-stone-600 mt-1">
            {data.brideName} & {data.groomName} nikoh to‘yi taklifnomasi
          </p>
        </div>

        {/* Toast alert */}
        {toastMessage && (
          <div className="mb-4 p-2.5 rounded-xl bg-[#FAF1D6] border border-[#D4AF37] text-center text-xs font-cinzel font-semibold text-[#8C6D28] animate-bounce">
            {toastMessage}
          </div>
        )}

        {/* Primary Action Buttons: View, Edit, Save */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button
            onClick={() => {
              onClose();
              onViewGuest();
            }}
            className="p-3 rounded-2xl border border-[#D4AF37]/40 bg-white hover:bg-[#FAF5EB] flex flex-col items-center gap-1.5 transition-all text-center group cursor-pointer"
          >
            <Eye className="w-5 h-5 text-[#B38728] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-cinzel font-semibold">Ko‘rish</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onEdit();
            }}
            className="p-3 rounded-2xl border border-[#D4AF37]/40 bg-white hover:bg-[#FAF5EB] flex flex-col items-center gap-1.5 transition-all text-center group cursor-pointer"
          >
            <Edit3 className="w-5 h-5 text-[#B38728] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-cinzel font-semibold">Tahrirlash</span>
          </button>

          <button
            onClick={() => {
              onSaveLocal();
              showToast("Taklifnoma brauzerda saqlandi!");
            }}
            className="p-3 rounded-2xl border border-[#D4AF37]/40 bg-white hover:bg-[#FAF5EB] flex flex-col items-center gap-1.5 transition-all text-center group cursor-pointer"
          >
            <Bookmark className="w-5 h-5 text-[#B38728] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-cinzel font-semibold">Saqlash</span>
          </button>
        </div>

        {/* Shareable URL Bar */}
        <div className="mb-6">
          <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider text-[#8C6D28] mb-1.5">
            Havola orqali ulashish
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-700 font-mono outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A047] to-[#B38728] text-white text-xs font-cinzel font-bold uppercase tracking-wider shadow-sm hover:shadow-gold-glow flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Nusxalandi" : "Nusxalash"}</span>
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <button
            onClick={handleNativeShare}
            className="flex-1 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-[#FAF5EB] flex items-center justify-center gap-2 text-xs font-cinzel font-semibold text-stone-800 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-[#B38728]" />
            <span>Ulashish</span>
          </button>

          <button
            onClick={handleShareTelegram}
            className="flex-1 py-2.5 rounded-xl bg-[#2AABEE] text-white flex items-center justify-center gap-2 text-xs font-cinzel font-semibold shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Telegram</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="flex-1 py-2.5 rounded-xl bg-[#25D366] text-white flex items-center justify-center gap-2 text-xs font-cinzel font-semibold shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span>WhatsApp</span>
          </button>
        </div>

        {/* Real QR Code Display */}
        <div className="p-4 rounded-2xl border border-[#D4AF37]/40 bg-white flex flex-col sm:flex-row items-center gap-4 mb-6">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="To'y taklifnomasi QR kodi"
              className="w-32 h-32 rounded-xl border border-stone-200 shadow-sm"
            />
          ) : (
            <div className="w-32 h-32 rounded-xl bg-stone-100 flex items-center justify-center">
              <QrCode className="w-8 h-8 text-stone-400" />
            </div>
          )}

          <div className="flex-1 text-center sm:text-left">
            <h4 className="font-cinzel text-sm font-bold text-[#2A2318] mb-1">
              QR-kod yaratildi
            </h4>
            <p className="text-xs font-serif text-stone-500 mb-3">
              Mehmonlar o‘z telefon kameralarini ushbu QR-kodga qaratish orqali taklifnomani darhol ochishlari mumkin.
            </p>
            <button
              onClick={handleDownloadQr}
              className="px-4 py-1.5 rounded-full border border-[#D4AF37] text-xs font-cinzel font-semibold text-[#8C6D28] hover:bg-[#FAF5EB] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>QR-kodni yuklab olish</span>
            </button>
          </div>
        </div>

        {/* Export to Image / PDF Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            disabled={isExportingImage}
            onClick={handleDownloadImage}
            className="py-3 px-4 rounded-2xl bg-gradient-to-r from-[#C5A047] to-[#B38728] text-white font-cinzel font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-gold-glow flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <FileImage className="w-4 h-4" />
            <span>{isExportingImage ? "Tayyorlanmoqda..." : "Rasm sifatida saqlash"}</span>
          </button>

          <button
            onClick={handlePrintPdf}
            className="py-3 px-4 rounded-2xl border border-[#D4AF37] bg-white hover:bg-[#FAF5EB] text-[#8C6D28] font-cinzel font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>PDF sifatida yuklab olish</span>
          </button>
        </div>
      </div>
    </div>
  );
};
