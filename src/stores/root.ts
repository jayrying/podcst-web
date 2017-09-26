/**
 * Redux store root entities
 */

import {
  Epic,
  combineEpics,
} from 'redux-observable';

import {
  combineReducers,
} from 'redux';

import {
  NoopAction,
} from './utils';

import {
  ChromeMediaActions,
  chromeMediaMetadaUpdateEpic,
} from './chrome-media';

import {
  RouterActions,
  RouterState,
  router,
  routerEpic,
} from './router';

import {
  PodcastsAction,
  PodcastsState,
  podcasts,
  getEpisodesEpic,
} from './podcasts';

import {
  PlayerActions,
  PlayerState,
  player,
  manualSeekUpdateEpic,
  playerAudioEpic,
  seekUpdateEpic,
} from './player';

import {
  FeedActions,
  FeedState,
  feed,
  getFeedEpic,
} from './feed';

import {
  SearchActions,
  SearchState,
  search,
  searchPodcastsEpic,
} from './search';

import {
  SubscriptionsActions,
  SubscriptionsState,
  subscriptions,
  parseOPMLEpic,
  subscriptionStateChangeEpic,
} from './subscriptions';

import {
  ThemeActions,
  ThemeState,
  theme,
} from './theme';

/**
 * Combined application actions interface
 */
export type Actions =
  RouterActions |
  FeedActions |
  SearchActions |
  PodcastsAction |
  PlayerActions |
  SubscriptionsActions |
  ChromeMediaActions |
  ThemeActions |
  NoopAction;

/**
 * Combined application state interface
 */
export interface State {
  router: RouterState;
  feed: FeedState;
  search: SearchState;
  podcasts: PodcastsState;
  player: PlayerState;
  subscriptions: SubscriptionsState;
  theme: ThemeState;
};

const epics = [
  routerEpic,
  getFeedEpic,
  searchPodcastsEpic,
  getEpisodesEpic,
  playerAudioEpic,
  seekUpdateEpic,
  manualSeekUpdateEpic,
  parseOPMLEpic,
  subscriptionStateChangeEpic,
  ('mediaSession' in navigator) ? chromeMediaMetadaUpdateEpic : null,
].filter(epic => epic !== null);

export const rootEpic = combineEpics<Actions, State>(...(epics as Epic<Actions, State, any>[]));

export const rootReducer = combineReducers<State>({
  router,
  feed,
  search,
  podcasts,
  player,
  subscriptions,
  theme,
});
