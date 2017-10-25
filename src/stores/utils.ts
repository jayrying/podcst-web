/**
 * Utils for store
 */

import { IState } from './root';

import { Storage } from '../utils/storage';

import { SEEK_DELTA } from '../utils/constants';

import { ThemeProvider } from '../styles';
import { IAppState } from './app';

/**
 * Noop action
 */
export interface INoopAction {
  type: 'NOOP';
}
const NOOP: INoopAction['type'] = 'NOOP';
export const noop = (): INoopAction => ({ type: NOOP });

const defaultAppState: IAppState = {
  mode: 'dark',
  theme: ThemeProvider('dark'),
};

/**
 * App default state
 */
export const getDefaultState = (): IState => ({
  app: { ...defaultAppState, ...Storage.getAppState() },
  router: {
    path: '/',
  },
  feed: {
    top: {
      loading: false,
      podcasts: [],
    },
  },
  search: {
    focusedResult: 0,
    podcasts: [],
    query: '',
    searching: false,
  },
  podcasts: {},
  player: {
    buffering: false,
    currentEpisode: 0,
    duration: 0,
    queue: [],
    seekDelta: SEEK_DELTA,
    seekPosition: 0,
    state: 'stopped',
  },
  subscriptions: {
    subs: Storage.getSubscriptions(),
  },
  toast: {
    isVisible: false,
    message: null,
    persistent: false,
  },
  drawer: {
    isVisible: false,
  },
});
