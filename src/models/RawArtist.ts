import { RawModel } from './RawModel';
import { RawImage } from './RawImage';

export interface RawArtist extends RawModel {
  genres: string[];
  images?: RawImage[];
}

export interface RawArtistFullInfo extends RawArtist {
  images: RawImage[];
  followers: { total: number };
}
