import { Track } from '../../models/Track';
import './Track.css';
import { formatDuration } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';
import { useCallback, MouseEvent } from 'react';

interface Props {
  track: Track;
}

export const TrackListItem = ({ track }: Props) => {
  const navigate = useNavigate();
  const handleArtistClick = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      navigate(`/artists/${track.artist.id}`);
    },
    [track],
  );
  return (
    <a className='track' href={track.url} target='blank' rel='noreferrer'>
      <img className='track-image' src={track.image} alt={track.name} />
      <div className='track-text'>
        <div className='track-name'>{track.name}</div>
        <span className='track-artist' onClick={handleArtistClick}>
          {track.artist.name}
        </span>
      </div>
      <div className='track-duration'>{formatDuration(track.duration)}</div>
    </a>
  );
};
