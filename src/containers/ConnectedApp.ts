/**
 * Connected App component
 */

import {
  connect,
} from 'preact-redux';

import {
  bindActionCreators,
  Dispatch,
} from 'redux';

import {
  State,
} from '../stores/root';

import {
  changeTheme,
} from '../stores/app';

import {
  pauseEpisode,
  resumeEpisode,
  seekUpdate,
  setBuffer,
  skipToNextEpisode,
  skipToPrevEpisode,
  stopEpisode,
} from '../stores/player';

import App from '../components/App';

const mapState = (state: State) => state.app;

const mapDispatch = (dispatch: Dispatch<State>) => bindActionCreators({
  changeTheme,
  pauseEpisode,
  resumeEpisode,
  seekUpdate,
  setBuffer,
  skipToNextEpisode,
  skipToPrevEpisode,
  stopEpisode,
}, dispatch);

const ConnectedApp = connect(
  mapState,
  mapDispatch,
)(App);

export default ConnectedApp;