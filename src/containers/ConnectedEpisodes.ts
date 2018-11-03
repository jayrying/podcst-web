/**
 * Connected Episodes component
 */

import { connect } from 'react-redux';

import { RouteComponentProps } from 'react-router';

import { IState } from '../stores/root';

import { getEpisodes } from '../stores/podcasts';

import { addSubscription, removeSubscription } from '../stores/subscriptions';

import { playEpisode } from '../stores/player';

import Episodes from '../components/Episodes';

const mapState = (
  { app: { mode, theme }, podcasts, player: { currentEpisode, queue }, subscriptions: { subs } }: IState,
  ownProps: RouteComponentProps<any>,
) => ({
  mode,
  theme,
  info: podcasts,
  currentEpisode: queue[currentEpisode] || null,
  subscriptions: subs,
  ...ownProps,
});

const mapDispatch = {
  getEpisodes,
  playEpisode,
  addSubscription,
  removeSubscription,
};

const ConnectedEpisodes = connect(
  mapState,
  mapDispatch,
)(Episodes);

export default ConnectedEpisodes;
