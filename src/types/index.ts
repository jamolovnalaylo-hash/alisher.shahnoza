export type InvitationDesignId = 
  | 'royal-gold' 
  | 'burgundy-luxury' 
  | 'pink-romance' 
  | 'imperial-arch' 
  | 'floral-palace' 
  | 'modern-royal';

export type Language = 'uz' | 'ru';

export interface WeddingInvitationData {
  id: string;
  designId: InvitationDesignId;
  brideName: string;
  groomName: string;
  bridePhoto: string;
  groomPhoto: string;
  weddingDate: string; // YYYY-MM-DD
  weddingTime: string; // HH:mm
  venueName: string;
  venueAddress: string;
  mapUrl: string;
  invitationText: string;
  greetingTitle?: string;
  footerNote?: string;
  parentsNames?: string;
  language: Language;
  musicTrack?: string; // custom audio data url or built-in track
  musicTitle?: string;
  rsvpList?: RsvpEntry[];
  createdDate?: string;
}

export interface RsvpEntry {
  id: string;
  guestName: string;
  guestsCount: number;
  phone?: string;
  message?: string;
  submittedAt: string;
}

export interface DesignThemeConfig {
  id: InvitationDesignId;
  name: string;
  nameUz: string;
  badge: string;
  description: string;
  previewColor: string;
  accentColor: string;
  fontClass: string;
  waxColor: string;
  envelopeColor: string;
  cardBgClass: string;
}
