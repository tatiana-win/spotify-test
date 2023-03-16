import { ArtistsService } from '../api/ArtistsService';
import { artistLoaded } from '../reducers/artistsSlice';

export const getArtist = (id: string) => {
  return async (dispatch: any) => {
    const { data } = await dispatch(
      ArtistsService.endpoints.getArtist.initiate(id),
    );
    dispatch(artistLoaded(data));
    return data;
  };
};
