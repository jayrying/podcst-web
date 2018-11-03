/**
 * Connected AddToQueue component
 */

import { connect } from 'react-redux';

import { IState } from '../stores/root';

import { pauseEpisode, resumeEpisode } from '../stores/player';

import AddToQueueButton, { IAddToQueueButtonProps } from '../components/AddToQueueButton';

const mapState = ({ app: { theme } }: IState, ownProps: Partial<IAddToQueueButtonProps>) => ({
  theme,
  ...ownProps,
});

const mapDispatch = {
  pause: pauseEpisode,
  resume: resumeEpisode,
};

const ConnectedAddToQueueButton = connect(
  mapState,
  mapDispatch,
)(AddToQueueButton);

export default ConnectedAddToQueueButton;
