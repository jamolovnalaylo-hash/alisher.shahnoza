import { WeddingInvitationData, DesignThemeConfig } from '../types';

export const DEFAULT_BRIDE_PHOTO = "./assets/couple-alisher-shaxnoza.jpg";
export const DEFAULT_GROOM_PHOTO = "./assets/couple-alisher-shaxnoza.jpg";

export const INITIAL_INVITATION_DATA: WeddingInvitationData = {
  id: "royal-invitation-2027",
  designId: "royal-gold",
  brideName: "Shahnoza",
  groomName: "Alisher",
  bridePhoto: DEFAULT_BRIDE_PHOTO,
  groomPhoto: DEFAULT_GROOM_PHOTO,
  weddingDate: "2026-11-03",
  weddingTime: "18:00",
  venueName: "\"Charag‘on\" restorani",
  venueAddress: "Buxoro viloyati, Qorako‘l tumani, Charag‘on restorani",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Qorako%27l+tumani+Charag%27on+restarani",
  invitationText: `Hurmatli aziz mehmonimiz!

Sizni Alisher va Shahnozaning nikoh to‘yi munosabati bilan quvonchli marosimimizga taklif etamiz. Quvonchimizga sherik bo‘ling!`,
  greetingTitle: "Hurmatli aziz mehmonimiz!",
  footerNote: "«Sizning tashrifingiz to‘yimizga cheksiz quvonch bag‘ishlaydi!»",
  parentsNames: "Buxoro xonadoni",
  language: "uz",
  musicTrack: "./assets/choli-qushi.mp3",
  musicTitle: "Çalıkuşu (\"Choli qushi\") seriali musiqasi",
  rsvpList: [
    {
      id: "rsvp-1",
      guestName: "Farrux & Nigora Aliyevlar",
      guestsCount: 2,
      phone: "+998 90 123 45 67",
      message: "Ikki dunyo saodatini tilaymiz! Baxtli bo'linglar!",
      submittedAt: "2026-10-24 16:30"
    }
  ]
};

export const DESIGN_THEMES: DesignThemeConfig[] = [
  {
    id: "royal-gold",
    name: "Royal Gold",
    nameUz: "Shohona Oltin",
    badge: "Eng ommabop",
    description: "Oq va shampan fon, hashamatli oltin arabeska naqshlar, shohona arka, oltin kalligrafik yozuvlar va nozik dekorativ ramkalar.",
    previewColor: "#D4AF37",
    accentColor: "#C5A047",
    fontClass: "font-cinzel",
    waxColor: "#B38728",
    envelopeColor: "#F4ECE1",
    cardBgClass: "bg-parchment text-[#2A2318]"
  }
];
