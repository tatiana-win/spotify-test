import './Search.css';
import { connect } from 'react-redux';
import { search } from '../../actions/search';
import { useCallback, useEffect, useState } from 'react';
import { Artist } from '../../models/Artist';
import { Track } from '../../models/Track';
import { ArtistListItem } from '../../components/Artist/Artist';
import { TracksList } from '../../components/TracksList/TracksList';
import { useLoaderData } from 'react-router-dom';
import { SearchInput } from '../../components/SearchInput/Searchinput';

interface MapProps {
    artists: Artist[];
    tracks: Track[];
}
interface DispatchProps {
    search: (q?: string) => void;
}

interface Props extends MapProps, DispatchProps {};

const SearchPure = ({ search, artists, tracks }: Props) => {
    // @ts-ignore
    const { q } = useLoaderData();
    const [query, setQuery] = useState(q);
    useEffect(() => {
        search(q);
    }, []);

    const handleChange = useCallback((query?: string) => {
        search(query);
        setQuery(query);

        const url = new URL(window.location.href);
        if (query) {
            url.searchParams.set('q', query);
        } else {
            url.searchParams.delete('q');
        }
        window.history.replaceState(null, '', url);
    }, []);

    return (
        <div className="search">
            <h1 className="search-title">Search</h1>
            <SearchInput onChange={handleChange} defaultValue={q} />

            {!!artists.length &&
                <>
                    <h2 className="search-subtitle">
                        Artists
                    </h2>
                    <div className="search-artists">
                        {artists.map(artist => <ArtistListItem artist={artist} key={artist.id} />)}
                    </div>
                </>
            }

            {!!tracks.length &&
                <>
                    <h2 className="search-subtitle">
                        {query ? 'Tracks' : 'Recommendations' }
                    </h2>
                    <div className="search-tracks">
                        <TracksList tracks={tracks} />
                    </div>
                </>
            }
        </div>
    );
}

const mapStateToProps = (state: any): MapProps => ({
    artists: state.search.artists,
    tracks: state.search.tracks
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    search: (q) => dispatch(search(q))
});

export const SearchPage = connect(mapStateToProps, mapDispatchToProps)(SearchPure);
