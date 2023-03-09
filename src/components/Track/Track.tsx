import { Track } from "../../models/Track";
import "./Track.css";
import { formatDuration } from "../../utils/formatters";

interface Props {
  track: Track;
}

export const TrackListItem = ({ track }: Props) => {
  return (
    <div className="track">
      <img className="track-image" src={track.image} alt={track.name} />
      <div className="track-text">
        <div className="track-name">{track.name}</div>
        <div className="track-artist">{track.artist.name}</div>
      </div>
      <div className="track-duration">{formatDuration(track.duration)}</div>
    </div>
  );
};
