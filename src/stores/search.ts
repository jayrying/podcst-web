/**
 * Actions and Reducer for Search
 */

import {
  Epic,
} from 'redux-observable';

import Podcasts from '../api/Podcasts';

import {
  State,
} from './root';

interface SearchPodcastsAction {
  type: 'SEARCH_PODCASTS';
  query: string;
}
const SEARCH_PODCASTS: SearchPodcastsAction['type'] = 'SEARCH_PODCASTS';
export const searchPodcasts = (query: SearchPodcastsAction['query']) => ({
  type: SEARCH_PODCASTS,
  query,
});

interface SearchPodcastsSuccessAction {
  type: 'SEARCH_PODCASTS_SUCCESS';
  podcasts: App.Podcast[];
}
const SEARCH_PODCASTS_SUCCESS: SearchPodcastsSuccessAction['type'] = 'SEARCH_PODCASTS_SUCCESS';
export const searchPodcastsSuccess = (podcasts: App.Podcast[]) => ({
  type: SEARCH_PODCASTS_SUCCESS,
  podcasts,
});

export interface SearchState {
  query: SearchPodcastsAction['query'];
  podcasts: App.Podcast[];
  searching: boolean;
}

export type SearchActions =
  SearchPodcastsAction |
  SearchPodcastsSuccessAction;

export const searchPodcastsEpic: Epic<SearchActions, State> = action$ =>
  action$.ofType(SEARCH_PODCASTS)
    .mergeMap((action: SearchPodcastsAction) => {
      return Podcasts.search(action.query)
        .map(searchPodcastsSuccess);
    });

export const search = (state: SearchState = {
  query: '',
  podcasts: [],
  searching: false,
}, action: SearchActions): SearchState => {
  switch(action.type) {
    case SEARCH_PODCASTS:
      return {...state, query: action.query, searching: true};
    case SEARCH_PODCASTS_SUCCESS:
      return {...state, podcasts: action.podcasts, searching: false};
    default:
      return state;
  }
}