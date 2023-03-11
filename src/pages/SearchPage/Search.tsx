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
import { Loader } from '../../components/Loader/Loader';

interface MapProps {
  artists: Artist[];
  tracks: Track[];
}
interface DispatchProps {
  search: (q?: string) => Promise<void>;
}

interface Props extends MapProps, DispatchProps {}

const SearchPure = ({ search, artists, tracks }: Props) => {
  // @ts-ignore
  const { q } = useLoaderData();
  const [query, setQuery] = useState(q);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadRecommendation = async () => {
      setLoading(true);
      try {
        await search(q);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };

    loadRecommendation();
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
    <div className='page'>
      <h1 className='title'>Search</h1>
      <SearchInput onChange={handleChange} defaultValue={q} />
      {loading && (
        <div className='loader-container'>
          <Loader />
        </div>
      )}

      {!!artists.length && (
        <>
          <h2 className='subtitle'>Artists</h2>
          <div className='search-artists'>
            {artists.map(artist => (
              <ArtistListItem artist={artist} key={artist.id} />
            ))}
          </div>
        </>
      )}

      {!loading && !artists.length && !tracks.length && (
        <div className='search-stub'>Type something</div>
      )}

      {!!tracks.length && (
        <>
          <h2 className='subtitle'>{query ? 'Tracks' : 'Recommendations'}</h2>
          <div className='search-tracks'>
            <TracksList tracks={tracks} />
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: any): MapProps => ({
  artists: state.search.artists,
  tracks: state.search.tracks,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  search: q => dispatch(search(q)),
});

export const SearchPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPure);
