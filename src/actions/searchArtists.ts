import { SearchService } from '../api/SearchService';
import { searchResultsLoaded } from '../reducers/searchSlice';
import { randomInRange } from '../utils/random';

const possibleArtists = [
  '12Chz98pHFMPJEknJQMWvI',
  '4Z8W4fKeB5YxbusRsdQVPb',
  '3TOqt5oJwL9BE2NG9MEwDa',
];

export const searchArtists = (q?: string) => {
  return async (dispatch: any) => {
    if (!q) {
      const { data } = await dispatch(
        SearchService.endpoints.relatedArtists.initiate(
          possibleArtists[randomInRange(0, possibleArtists.length - 1)],
        ),
      );
      return dispatch(
        searchResultsLoaded({ tracks: [], artists: data.artists }),
      );
    }
    const { data } = await dispatch(
      SearchService.endpoints.search.initiate({ q, type: 'artist' }),
    );
    if (data) {
      dispatch(searchResultsLoaded(data));
    }
  };
};
