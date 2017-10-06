/**
 * Keyboard shortcuts epic root
 */

import {
  Observable,
} from 'rxjs/Observable';

import {
  Epic,
} from 'redux-observable';

import {
  getEpisodeRoute,
  ignoreKeyboardSelector,
} from '../utils';

import {
  Actions,
  IState,
} from './root';

import {
  noop,
} from './utils';

import {
  APP_INIT,
  changeTheme,
} from './app';

import {
  manualSeekUpdate,
  pauseEpisode,
  PLAY_EPISODE,
  resumeEpisode,
  skipToNextEpisode,
  skipToPrevEpisode,
  STOP_EPISODE,
} from './player';

import {
  navigate,
} from './router';

/**
 * Seek delta in seconds
 */
const SEEK_DELTA = 10;

/**
 * Keyboard shortcut map for changing theme
 */
const ChangeThemeKeys: KeyboardShortcutsMap = {
  84: 'change-theme',
};

/**
 * Theme change shortcut epic
 */
export const changeThemeEpic: Epic<Actions, IState> = (action$, store) =>
  action$.ofType(APP_INIT)
    .switchMap(() => Observable.fromEvent<KeyboardEvent>(document, 'keyup')
      .filter((event) =>
        !!ChangeThemeKeys[event.keyCode] &&
        !(event.target as HTMLElement).matches(ignoreKeyboardSelector),
      )
      .map(() => changeTheme(
        store.getState().app.mode === 'dark' ? 'light' : 'dark',
      )),
    );

/**
 * Keyboard shortcut map for controlling map
 */
const PlayerControlKeys: KeyboardShortcutsMap = {
  32: 'play',
  80: 'prev',
  78: 'next',
  37: 'seek-back',
  39: 'seek-forward',
  69: 'episode-info',
};

/**
 * Is Seek key if its between 0-9
 */
const isSeekKey = (keyCode: number) => keyCode >= 48 && keyCode <= 57;

/**
 * Player controls epic
 */
export const playerControlsEpic: Epic<Actions, IState> = (action$, store) =>
  action$.ofType(PLAY_EPISODE)
    .switchMap(() => Observable.fromEvent<KeyboardEvent>(document, 'keydown')
      .filter(({ keyCode, target }) =>
        !(target as HTMLElement).matches(ignoreKeyboardSelector) &&
        !!PlayerControlKeys[keyCode] || isSeekKey(keyCode),
      )
      .map((e) => {
        const {
          state,
          seekPosition,
          duration,
          currentEpisode,
          queue,
        } = store.getState().player;

        // Space for scroll check
        if (!(e.keyCode === 32 && state === 'stopped')) {
          e.preventDefault();
        }

        if (isSeekKey(e.keyCode)) {
          const seekPercent = (e.keyCode - 48) / 10;
          const seekTo = duration * seekPercent;
          return manualSeekUpdate(seekTo, duration);
        }

        const episode = queue[currentEpisode];

        const shortcut = PlayerControlKeys[e.keyCode];
        switch (shortcut) {
          case 'play': return state === 'paused' ? resumeEpisode() : pauseEpisode();
          case 'next': return skipToNextEpisode();
          case 'prev': return skipToPrevEpisode();
          case 'seek-back':
          case 'seek-forward':
            const seekTo = seekPosition + SEEK_DELTA * (shortcut === 'seek-forward' ? 1 : -1);
            return manualSeekUpdate(seekTo, duration);
          case 'episode-info':
            if (state !== 'stopped' && !!episode) {
              const { feed, title } = episode;
              return navigate(getEpisodeRoute(feed, title));
            } else {
              return noop();
            }
          default: return noop();
        }
      })
      .takeUntil(action$.ofType(STOP_EPISODE)),
    );
