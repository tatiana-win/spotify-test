import { SearchResult, SearchResultType } from './SearchResult';
import { Artist } from './Artist';

export class Track implements SearchResult {
    image: string;
    name: string;
    id: string;
    type: SearchResultType;
    artist: Artist;

    constructor(image: string, name: string, id: string, artist: Artist) {
        this.type = SearchResultType.track;
        this.image = image;
        this.name = name;
        this.id = id;
        this.artist = artist;
    }
}
