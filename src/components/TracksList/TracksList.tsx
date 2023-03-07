import { Track } from '../../models/Track';
import './TracksList.css';
import { TrackListItem } from '../Track/Track';

interface Props {
    tracks: Track[];
}

export const TracksList = ({ tracks }: Props) => {
    return (
        <div className="tracksList">
            {tracks.map(track => <TrackListItem track={track} key={track.id} />)}
        </div>
    );
}
