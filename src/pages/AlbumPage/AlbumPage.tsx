import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { FullAlbumInfo } from '../../models/Album';
import { getAlbum } from '../../actions/getAlbum';
import { TracksList } from '../../components/TracksList/TracksList';

import './AlbumPage.css';
import { SpotifyButton } from '../../components/SpotifyButton/SpotifyButton';

interface MapProps {
  albums: Record<string, FullAlbumInfo>;
}
interface DispatchProps {
  getAlbum: (id: string) => Promise<FullAlbumInfo>;
}

interface Props extends MapProps, DispatchProps {}

const AlbumPagePure = ({ albums, getAlbum }: Props) => {
  // @ts-ignore
  const { id = '' } = useParams();
  const [album, setAlbum] = useState(albums[id]);

  const loadData = async () => {
    const album = await getAlbum(id);
    setAlbum(album);
    window.scroll({ behavior: 'smooth', top: 0 });
  };

  useEffect(() => {
    if (!albums[id]) {
      loadData();
    } else {
      setAlbum(albums[id]);
      window.scroll({ behavior: 'smooth', top: 0 });
    }
  }, [id]);

  return (
    <div className='page'>
      {!album ? (
        <div className='loader-container'>
          <Loader />
        </div>
      ) : (
        <>
          <section className='albumPage-header'>
            <SpotifyButton url={album.url} className='albumPage-spotify' />
            <div className='albumPage-imageContainer'>
              <div
                className='albumPage-image'
                style={{ backgroundImage: `url(${album.image})` }}
              />
              <div className='albumPage-overlay' />
            </div>

            <div className='albumPage-description'>
              <p className='albumPage-type'>
                Album
                <SpotifyButton url={album.url} />
              </p>
              <h1 className='albumPage-name'>{album.name}</h1>
              <a
                href={`/artists/${album.artist.id}`}
                className='albumPage-artist'
              >
                {album.artist.name}
              </a>
              <div className='albumPage-info'>
                <span>{album.year}</span>
                {album.tracks.length > 1 && (
                  <span className='albumPage-tracksCount'>
                    {album.tracks.length}&nbsp;tracks
                  </span>
                )}
              </div>
            </div>
          </section>
          {!!album.tracks.length && (
            <section className='albumPage-tracks'>
              <h2 className='subtitle'>Tracks</h2>
              <TracksList tracks={album.tracks} />
            </section>
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: any): MapProps => ({
  albums: state.albums.list,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  getAlbum: id => dispatch(getAlbum(id)),
});

export const AlbumPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumPagePure);
