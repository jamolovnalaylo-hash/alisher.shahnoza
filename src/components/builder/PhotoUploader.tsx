import React, { useRef } from 'react';
import { Upload, Trash2, RefreshCw, ZoomIn, ZoomOut, Image as ImageIcon } from 'lucide-react';

interface PhotoUploaderProps {
  label: string;
  role: 'kelin' | 'kuyov';
  currentPhoto: string;
  onPhotoChange: (newPhotoUrl: string) => void;
  onPhotoReset: () => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  label,
  role,
  currentPhoto,
  onPhotoChange,
  onPhotoReset,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image format
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert("Iltimos, faqat JPG, PNG yoki WEBP formatidagi rasmni tanlang.");
      return;
    }

    // Maximum 15MB file size
    if (file.size > 15 * 1024 * 1024) {
      alert("Rasm hajmi juda katta (maksimal 15 MB). Iltimos, kichikroq rasm yuklang.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onPhotoChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center p-4 rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#FFFDF9] to-[#F7F2E8] shadow-sm">
      <div className="flex items-center gap-1.5 mb-2.5">
        <ImageIcon className="w-4 h-4 text-[#B38728]" />
        <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#8C6D28]">
          {label}
        </span>
      </div>

      {/* Frame Preview with Arch / Oval shape */}
      <div className="relative group my-2">
        <div className="relative w-32 h-44 sm:w-36 sm:h-48 rounded-t-[80px] rounded-b-xl border-2 border-[#D4AF37] shadow-md overflow-hidden bg-stone-200">
          <img
            src={currentPhoto}
            alt={label}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />

          {/* Quick Hover Overlay */}
          <div
            onClick={triggerUpload}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 cursor-pointer text-white"
          >
            <Upload className="w-6 h-6 text-[#FDF2B5]" />
            <span className="text-[11px] font-sans font-medium tracking-wide">
              Almashtirish
            </span>
          </div>
        </div>
      </div>

      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Action Buttons: Upload, Replace, Reset */}
      <div className="flex items-center gap-2 mt-3">
        <button
          type="button"
          onClick={triggerUpload}
          className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#C5A047] to-[#B38728] text-[#1E170A] font-semibold text-xs tracking-wider uppercase shadow-sm hover:shadow-gold-glow flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Tanlash</span>
        </button>

        <button
          type="button"
          onClick={onPhotoReset}
          title="Standart rasmga qaytarish"
          className="p-1.5 rounded-full border border-stone-300 text-stone-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-[10px] text-stone-500 mt-2 font-serif text-center">
        Telefon yoki kompyuterdan JPG, PNG, WEBP
      </p>
    </div>
  );
};
