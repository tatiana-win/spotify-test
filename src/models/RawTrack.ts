import { RawImage } from './RawImage';
import { RawModel } from './RawModel';

export interface RawTrack extends RawModel {
  album?: {
    images: RawImage[];
    id: string;
    name: string;
    release_date: string;
  };
  artists: RawModel[];
  duration_ms: number;
}
