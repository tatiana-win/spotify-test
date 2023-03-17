import { RawArtist } from './RawArtist';
import { RawTrack } from './RawTrack';
import { RawModel } from './RawModel';
import { RawImage } from './RawImage';

export interface RawAlbum extends RawModel {
  release_date: string;
  artists: RawArtist[];
  images: RawImage[];
}

export interface RawFullAlbumInfo extends RawAlbum {
  genres: string[];
  tracks: { items: RawTrack[] };
}
