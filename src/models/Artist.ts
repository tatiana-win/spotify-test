import { SearchResult } from './SearchResult';
import { RawArtist, RawArtistFullInfo } from './RawArtist';
import { RawModel } from './RawModel';

export class ArtistCompact extends SearchResult {
  constructor(params: RawModel) {
    super(params);
  }
}

export class Artist extends SearchResult {
  genres: string[];
  image: string;
  constructor(artist: RawArtist) {
    super(artist);
    this.genres = artist.genres;
    this.image = artist.images
      ? artist.images[artist.images.length - 1]?.url
      : '';
  }
}

export class FullArtistInfo extends Artist {
  followers: number;
  constructor(artist: RawArtistFullInfo) {
    super(artist);
    this.followers = artist.followers.total;
    this.image = artist.images[0]?.url;
  }
}
