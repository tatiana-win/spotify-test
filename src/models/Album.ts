import { Artist } from './Artist';
import { RawArtist } from './RawArtist';

export class Album {
  image: string;
  name: string;
  id: string;
  artist: Artist;
  year: number;
  constructor(
    image: string,
    name: string,
    id: string,
    year: string,
    artist: RawArtist,
  ) {
    this.image = image;
    this.name = name;
    this.id = id;
    this.year = +year?.split('-')[0];
    this.artist = new Artist('', artist.name, artist.id, []);
  }
}
