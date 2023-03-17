import { ArtistsService } from '../api/ArtistsService';
import { artistInfoLoaded } from '../reducers/artistsSlice';

export const getArtistInfo = (id: string) => {
  return async (dispatch: any) => {
    const [
      { data: tracks },
      {
        data: { artists },
      },
      { data: albums },
    ] = await Promise.all([
      dispatch(ArtistsService.endpoints.getArtistTracks.initiate(id)),
      dispatch(ArtistsService.endpoints.getRelatedArtists.initiate(id)),
      dispatch(ArtistsService.endpoints.getArtistAlbums.initiate(id)),
    ]);
    dispatch(artistInfoLoaded({ id, tracks, relatedArtists: artists, albums }));
    return { tracks, relatedArtists: artists, albums };
  };
};
