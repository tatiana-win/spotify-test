import { SearchService } from '../api/SearchService';
import { searchResultsLoaded } from '../reducers/searchSlice';

export const search = (q?: string) => {
    return async(dispatch: any) => {
        if (!q) {
            const { data } = await dispatch(SearchService.endpoints.recommendations.initiate());
            return dispatch(searchResultsLoaded({ tracks: data.tracks, artists: [] }));
        }
        const { data } = await dispatch(SearchService.endpoints.search.initiate(q));
        if (data) {
            dispatch(searchResultsLoaded(data));
        }
    }
}
