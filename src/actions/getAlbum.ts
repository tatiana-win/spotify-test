import { AlbumsService } from '../api/AlbumsService';
import { albumLoaded } from '../reducers/albumsSlice';

export const getAlbum = (id: string) => {
  return async (dispatch: any) => {
    const { data } = await dispatch(
      AlbumsService.endpoints.getAlbum.initiate(id),
    );
    dispatch(albumLoaded(data));
    return data;
  };
};
