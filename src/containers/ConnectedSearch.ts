/**
 * Connected Seach component
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
  dismissSearch,
  searchPodcasts,
} from '../stores/search';

import Search from '../components/Search';

const mapState = (state: State) => state.search;

const mapDispatch = (dispatch: Dispatch<State>) => bindActionCreators({
  dismissSearch,
  searchPodcasts,
}, dispatch);

const ConnectedSearch = connect(
  mapState,
  mapDispatch,
)(Search);

export default ConnectedSearch;
