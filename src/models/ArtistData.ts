import { Track } from './Track';
import { Album } from './Album';
import { Artist } from './Artist';

export interface ArtistData {
  tracks: Track[];
  albums: Album[];
  relatedArtists: Artist[];
}
