import './AlbumsPage.css';
import { connect } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { SearchInput } from '../../components/SearchInput/Searchinput';
import { Loader } from '../../components/Loader/Loader';
import { search } from '../../actions/search';
import { SearchType } from '../../models/SearchType';
import { Album } from '../../models/Album';
import { AlbumListItem } from '../../components/Album/Album';

interface MapProps {
  albums: Album[];
}
interface DispatchProps {
  search: (q?: string) => void;
}

interface Props extends MapProps, DispatchProps {}

const AlbumsPure = ({ search, albums }: Props) => {
  const [query, setQuery] = useState<string | undefined>('');

  useEffect(() => {
    search();
  }, []);

  const handleChange = useCallback((query?: string) => {
    search(query);
    setQuery(query);
  }, []);

  return (
    <div className='page'>
      <h1 className='title'>Albums</h1>
      <SearchInput onChange={handleChange} />
      {!albums.length && (
        <div className='loader-container'>
          <Loader />
        </div>
      )}

      {!!albums.length && (
        <>
          <h2 className='subtitle'>{query ? 'Results' : 'New Releases'}</h2>
          <div className='albums-list'>
            {albums.map(album => (
              <AlbumListItem album={album} key={album.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: any): MapProps => ({
  albums: state.search.albums,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  search: q => dispatch(search(q, SearchType.album)),
});

export const AlbumsPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumsPure);
