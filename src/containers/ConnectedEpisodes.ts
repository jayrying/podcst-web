/**
 * Connected Episodes component
 */

import {
  connect,
} from 'preact-redux';

import {
  Dispatch,
  bindActionCreators,
} from 'redux';

import {
  State,
} from '../stores/root';

import {
  getEpisodes,
} from '../stores/podcasts';

import {
  addSubscription,
} from '../stores/subscriptions';

import {
  playEpisode,
  pauseEpisode,
  resumeEpisode,
} from '../stores/player';

import Episodes from '../components/Episodes';

const mapState = (state: State) => ({
  info: state.podcasts,
  state: state.player.state,
  currentEpisode: state.player.queue[state.player.currentEpisode] || null,
});

const mapDispatch = (dispatch: Dispatch<State>) => bindActionCreators({
  getEpisodes,
  playEpisode,
  pauseEpisode,
  resumeEpisode,
  addSubscription,
}, dispatch);

const ConnectedEpisodes = connect(
  mapState,
  mapDispatch,
)(Episodes);

export default ConnectedEpisodes;
