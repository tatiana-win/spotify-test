import { useParams } from 'react-router-dom';
import { getArtist } from '../../actions/getArtist';
import { connect } from 'react-redux';
import { Artist, FullArtistInfo } from '../../models/Artist';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader/Loader';

import './ArtistPage.css';
import { formatNumberWithSpaces } from '../../utils/formatters';
import { Track } from '../../models/Track';
import { getArtistInfo } from '../../actions/getArtistInfo';
import { TracksList } from '../../components/TracksList/TracksList';
import { ArtistListItem } from '../../components/Artist/Artist';
import { Album } from '../../models/Album';
import { AlbumListItem } from '../../components/Album/Album';
import { ArtistData } from '../../models/ArtistData';
import { SpotifyButton } from '../../components/SpotifyButton/SpotifyButton';

interface MapProps {
  artists: Record<string, FullArtistInfo>;
  info: Record<string, ArtistData>;
}
interface DispatchProps {
  getArtist: (id: string) => Promise<FullArtistInfo>;
  getArtistInfo: (
    id: string,
  ) => Promise<{ tracks: Track[]; relatedArtists: Artist[]; albums: Album[] }>;
}

interface Props extends MapProps, DispatchProps {}

const ArtistPagePure = ({ artists, getArtist, getArtistInfo, info }: Props) => {
  // @ts-ignore
  const { id = '' } = useParams();
  const [artist, setArtist] = useState(artists[id]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [relatedArtists, setRelatedArtists] = useState<Artist[]>([]);

  const loadData = async () => {
    const artist = await getArtist(id);
    setArtist(artist);
    const { tracks, relatedArtists, albums } = await getArtistInfo(id);
    setTracks(tracks);
    setRelatedArtists(relatedArtists);
    setAlbums(albums);
    window.scroll({ behavior: 'smooth', top: 0 });
  };

  useEffect(() => {
    if (!artists[id]) {
      loadData();
    } else {
      setArtist(artists[id]);
      if (info[id]) {
        const { tracks, relatedArtists, albums } = info[id];
        setTracks(tracks);
        setRelatedArtists(relatedArtists);
        setAlbums(albums);
      }
      window.scroll({ behavior: 'smooth', top: 0 });
    }
  }, [id]);

  return (
    <div className='page artistPage'>
      {!artist ? (
        <div className='loader-container'>
          <Loader />
        </div>
      ) : (
        <>
          <section className='artistPage-header'>
            <SpotifyButton url={artist.url} className='artistPage-spotify' />
            <div className='artistPage-imageContainer'>
              <div
                className='artistPage-image'
                style={{ backgroundImage: `url(${artist.image})` }}
              />
              <div className='artistPage-overlay' />
            </div>

            <div className='artistPage-description'>
              <p className='artistPage-type'>
                Artist <SpotifyButton url={artist.url} />
              </p>
              <h1 className='artistPage-name'>{artist.name}</h1>
              {!!artist.followers && (
                <p className='artistPage-followers'>
                  {formatNumberWithSpaces(artist.followers)} followers
                </p>
              )}
              <div className='artistPage-genres'>
                {artist.genres.map((genre, index) => (
                  <span className='artistPage-genre' key={genre}>
                    {genre}
                    {index !== artist.genres.length - 1 && ', '}
                  </span>
                ))}
              </div>
            </div>
          </section>
          {!!tracks.length && (
            <section className='artistPage-tracks'>
              <h2 className='subtitle'>Top tracks</h2>
              <TracksList tracks={tracks} />
            </section>
          )}
          {!!albums.length && (
            <section>
              <h2 className='subtitle'>Top Albums</h2>
              <div className='artistPage-albums'>
                {albums.map(album => (
                  <AlbumListItem album={album} key={album.id} />
                ))}
              </div>
            </section>
          )}
          {!!relatedArtists.length && (
            <section>
              <h2 className='subtitle'>Recommendations</h2>
              <div className='artists-list'>
                {relatedArtists.map(artist => (
                  <ArtistListItem artist={artist} key={artist.id} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: any): MapProps => ({
  artists: state.artists.list,
  info: state.artists.info,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  getArtist: id => dispatch(getArtist(id)),
  getArtistInfo: id => dispatch(getArtistInfo(id)),
});

export const ArtistPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistPagePure);
