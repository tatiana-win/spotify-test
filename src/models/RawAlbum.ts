import { RawImage } from './RawImage';
import { RawArtist } from './RawArtist';

export interface RawAlbum {
  id: string;
  images: RawImage[];
  release_date: string;
  name: string;
  artists: RawArtist[];
}
