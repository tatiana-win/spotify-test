import { SearchResult, SearchResultType } from './SearchResult';

export class Artist implements SearchResult {
  image: string;
  name: string;
  id: string;
  genres: string[];
  type: SearchResultType;
  followers?: number;
  constructor(
    image: string,
    name: string,
    id: string,
    genres: string[],
    followers?: number,
  ) {
    this.type = SearchResultType.artist;
    this.image = image;
    this.name = name;
    this.id = id;
    this.genres = genres;
    this.followers = followers;
  }
}
