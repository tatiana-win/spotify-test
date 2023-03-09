export enum SearchResultType {
  track,
  artist,
  album,
  playlist,
}
export interface SearchResult {
  image: string;
  name: string;
  id: string;
  type: SearchResultType;
}
