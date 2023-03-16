import { RawImage } from './RawImage';

export interface RawArtist {
  id: string;
  images: RawImage[];
  name: string;
  href: string;
  genres: string[];
}

export interface RawArtistFullInfo extends RawArtist {
  followers: { total: number };
}
