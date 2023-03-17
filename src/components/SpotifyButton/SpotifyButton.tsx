import './SpotifyButton.css';
import cn from 'clsx';

interface Props {
  url: string;
  className?: string;
}
export const SpotifyButton = ({ url, className }: Props) => {
  return (
    <a
      href={url}
      className={cn('spotifyButton', className)}
      target='blank'
      rel='noreferrer'
    >
      Open in Spotify
    </a>
  );
};
