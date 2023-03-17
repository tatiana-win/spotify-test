import './Album.css';
import { Link, useNavigate } from 'react-router-dom';
import { Album } from '../../models/Album';
import { MouseEvent, useCallback } from 'react';

interface Props {
  album: Album;
}

export const AlbumListItem = ({ album }: Props) => {
  const navigate = useNavigate();
  const handleArtistClick = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      navigate(`/artists/${album.artist.id}`);
    },
    [album],
  );

  return (
    <Link className='album' to={`/albums/${album.id}`}>
      <div
        className='album-image'
        style={{ backgroundImage: `url(${album.image})` }}
      />
      <div className='album-name album-text ellipsis'>{album.name}</div>
      <div
        className='album-artist album-text ellipsis'
        onClick={handleArtistClick}
      >
        {album.artist.name}
      </div>
      <div className='album-year'>{album.year}</div>
    </Link>
  );
};
