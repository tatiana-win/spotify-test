import './Artist.css';
import { Artist } from '../../models/Artist';

interface Props {
    artist: Artist;
}

export const ArtistListItem = ({ artist }: Props) => {
    return (
        <div className="artist">
            <div className="artist-image" style={{ backgroundImage: `url(${artist.image})`}} />
            <div className="artist-text artist-name">{artist.name}</div>
            <div className="artist-text artist-type">{artist.genres.join(', ')}</div>
        </div>
    );
}
