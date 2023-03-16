import { SearchResult, SearchResultType } from './SearchResult';
import { Artist } from './Artist';

export class Track implements SearchResult {
  image: string;
  name: string;
  id: string;
  type: SearchResultType;
  artist: Artist;
  duration: number;
  url: string;

  constructor(
    url: string,
    image: string,
    name: string,
    id: string,
    duration: number,
    artist: Artist,
  ) {
    this.url = url;
    this.type = SearchResultType.track;
    this.image = image;
    this.name = name;
    this.id = id;
    this.artist = artist;
    this.duration = duration;
  }
}
