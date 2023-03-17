import { RawModel } from './RawModel';

export enum SearchResultType {
  track,
  artist,
  album,
  playlist,
}
export abstract class SearchResult {
  url: string;
  name: string;
  id: string;
  constructor(model: RawModel) {
    this.url = model.external_urls.spotify;
    this.name = model.name;
    this.id = model.id;
  }
}
