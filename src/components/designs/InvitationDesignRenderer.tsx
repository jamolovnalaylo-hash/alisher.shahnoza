import React from 'react';
import { WeddingInvitationData } from '../../types';
import { RoyalGoldDesign } from './RoyalGoldDesign';
import { BurgundyLuxuryDesign } from './BurgundyLuxuryDesign';
import { PinkRomanceDesign } from './PinkRomanceDesign';
import { ImperialArchDesign } from './ImperialArchDesign';
import { FloralPalaceDesign } from './FloralPalaceDesign';
import { ModernRoyalDesign } from './ModernRoyalDesign';

interface InvitationDesignRendererProps {
  data: WeddingInvitationData;
  onAddRsvp?: (entry: { guestName: string; guestsCount: number; phone?: string; message?: string }) => void;
}

export const InvitationDesignRenderer: React.FC<InvitationDesignRendererProps> = ({
  data,
  onAddRsvp,
}) => {
  switch (data.designId) {
    case 'burgundy-luxury':
      return <BurgundyLuxuryDesign data={data} onAddRsvp={onAddRsvp} />;
    case 'pink-romance':
      return <PinkRomanceDesign data={data} onAddRsvp={onAddRsvp} />;
    case 'imperial-arch':
      return <ImperialArchDesign data={data} onAddRsvp={onAddRsvp} />;
    case 'floral-palace':
      return <FloralPalaceDesign data={data} onAddRsvp={onAddRsvp} />;
    case 'modern-royal':
      return <ModernRoyalDesign data={data} onAddRsvp={onAddRsvp} />;
    case 'royal-gold':
    default:
      return <RoyalGoldDesign data={data} onAddRsvp={onAddRsvp} />;
  }
};
