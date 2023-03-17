import { SearchResult } from './SearchResult';
import { ArtistCompact } from './Artist';
import { RawTrack } from './RawTrack';

export class Track extends SearchResult {
  image: string;
  artist: ArtistCompact;
  duration: number;

  constructor(track: RawTrack, image = '') {
    super(track);
    this.image = track.album?.images
      ? track.album.images[track.album.images.length - 1]?.url
      : image;
    this.artist = new ArtistCompact(track.artists[0]);
    this.duration = track.duration_ms;
  }
}
