/**
 * Player component
 */

import {
  h,
} from 'preact';

import {
  media,
  style,
} from 'typestyle';

import {
  IPlayerState,
} from '../stores/player';

import PlayerInfo from './PlayerInfo';
import Seekbar from './Seekbar';

const player = (theme: App.Theme) => style(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'fixed',
    bottom: 0,
    left: 0,
    height: '64px',
    width: '100%',
    zIndex: 500,
    fontSize: 20,
    color: theme.text,
    boxShadow: `0px 4px 32px 4px rgba(0,0,0,0.75)`,
  },
  media({ maxWidth: 600 }, {
    height: '128px',
    flexDirection: 'column-reverse',
    alignItems: 'stretch',
  }),
);

interface IPlayerProps extends IPlayerState {
  theme: App.Theme;
  pause: () => void;
  resume: () => void;
  skipToNext: () => void;
  skipToPrev: () => void;
  onSeek: (seekPosition: number, duration: number) => void;
}

const Player = ({
  duration,
  currentEpisode,
  pause,
  queue,
  resume,
  seekPosition,
  state,
  onSeek,
  buffering,
  theme,
}: IPlayerProps) => {
  const episode = queue[currentEpisode];

  if (state === 'stopped' || !episode) {
    return null;
  }

  const episodeDuration = duration || episode.duration || 0;

  return (
    <div class={player(theme)}>
      <PlayerInfo
        episode={episode}
        pause={pause}
        resume={resume}
        state={state}
        theme={theme}
      />
      <Seekbar
        buffering={buffering}
        onSeek={onSeek}
        duration={episodeDuration}
        seekPosition={seekPosition}
        theme={theme}
      />
    </div>
  );
};

export default Player;
