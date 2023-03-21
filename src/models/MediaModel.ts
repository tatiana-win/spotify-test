import { RawModel } from './RawModel';

export abstract class MediaModel {
  url: string;
  name: string;
  id: string;
  constructor(model: RawModel) {
    this.url = model.external_urls.spotify;
    this.name = model.name;
    this.id = model.id;
  }
}
