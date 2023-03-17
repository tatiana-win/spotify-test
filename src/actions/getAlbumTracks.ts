import { AlbumsService } from '../api/AlbumsService';
import { albumTracksLoaded } from '../reducers/albumsSlice';

export const getAlbumTracks = (id: string) => {
  return async (dispatch: any) => {
    const { data: tracks } = await dispatch(
      AlbumsService.endpoints.getAlbum.initiate(id),
    );
    dispatch(albumTracksLoaded({ id, tracks }));
    return tracks;
  };
};
