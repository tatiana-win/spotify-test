import { Artist } from './Artist';
import { Track } from './Track';
import { RawAlbum, RawFullAlbumInfo } from './RawAlbum';
import { SearchResult } from './SearchResult';

export class Album extends SearchResult {
  image: string;
  artist: Artist;
  year: number;
  constructor(album: RawAlbum) {
    super(album);
    this.image = album.images[0]?.url;
    this.year = +album.release_date?.split('-')[0];
    this.artist = new Artist(album.artists[0]);
  }
}

export class FullAlbumInfo extends Album {
  tracks: Track[];
  constructor(album: RawFullAlbumInfo) {
    super(album);
    this.tracks = album.tracks.items.map(track => new Track(track, this.image));
  }
}
