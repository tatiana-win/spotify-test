import { SearchService } from '../api/SearchService';
import { searchResultsLoaded } from '../reducers/searchSlice';
import { SearchType } from '../models/SearchType';
import { randomInRange } from '../utils/random';

const possibleArtists = [
  '12Chz98pHFMPJEknJQMWvI',
  '4Z8W4fKeB5YxbusRsdQVPb',
  '3TOqt5oJwL9BE2NG9MEwDa',
];

const getRecommendations = (type = SearchType.all) => {
  switch (type) {
    case SearchType.artist:
      return SearchService.endpoints.relatedArtists.initiate(
        possibleArtists[randomInRange(0, possibleArtists.length - 1)],
      );
    default:
      return SearchService.endpoints.recommendations.initiate();
  }
};

export const search = (q?: string, type?: SearchType) => {
  return async (dispatch: any) => {
    if (!q) {
      const { data } = await dispatch(getRecommendations(type));
      return dispatch(searchResultsLoaded(data));
    }
    const { data } = await dispatch(
      SearchService.endpoints.search.initiate({ q, type }),
    );
    if (data) {
      dispatch(searchResultsLoaded(data));
    }
  };
};
