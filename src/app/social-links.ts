import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faXTwitter,
  faDeviantart,
} from '@fortawesome/free-brands-svg-icons';

export interface SocialLink {
  name: string;
  url: string;
  icon: IconDefinition;
}

// Shared by the footer (a curated subset) and the links page (the
// full list), so the icon imports and URLs only exist in one place
// instead of being repeated in both components.
export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Instagram', url: 'https://www.instagram.com/firecloak/', icon: faInstagram },
  { name: 'TikTok', url: 'https://www.tiktok.com/@firecloak?lang=en', icon: faTiktok },
  { name: 'Facebook', url: 'https://www.facebook.com/firecloak', icon: faFacebook },
  { name: 'Twitter', url: 'https://twitter.com/firecloak', icon: faXTwitter },
  { name: 'Deviantart', url: 'https://www.deviantart.com/firecloak', icon: faDeviantart },
];
