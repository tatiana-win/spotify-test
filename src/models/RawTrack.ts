import { RawImage } from './RawImage';

export interface RawTrack {
  album: {
    images: RawImage[];
    id: string;
    name: string;
    release_date: string;
  };
  artists: {
    href: string;
    id: string;
    name: string;
  }[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  duration_ms: number;
}
