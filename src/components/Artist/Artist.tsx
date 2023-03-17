import './Artist.css';
import { Artist } from '../../models/Artist';
import { Link } from 'react-router-dom';

interface Props {
  artist: Artist;
}

export const ArtistListItem = ({ artist }: Props) => {
  return (
    <Link className='artist' to={`/artists/${artist.id}`}>
      <div
        className='artist-image'
        style={{ backgroundImage: `url(${artist.image})` }}
      />
      <div className='artist-text artist-name'>{artist.name}</div>
      <div className='artist-text artist-type'>{artist.genres.join(', ')}</div>
    </Link>
  );
};
