import { SearchResult, SearchResultType } from './SearchResult';

export class Artist implements SearchResult {
    image: string;
    name: string;
    id: string;
    genres: string[];
    type: SearchResultType;
    constructor (image: string, name: string, id: string, genres: string[]) {
        this.type = SearchResultType.artist;
        this.image = image;
        this.name = name;
        this.id = id;
        this.genres = genres;
    }
}
