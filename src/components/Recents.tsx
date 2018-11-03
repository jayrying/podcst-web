/**
 * Recents component
 */

import * as React from 'react';

import { style } from 'typestyle';

import EpisodeRow from './EpisodeRow';

import { App } from '../typings';

import { IAddToQueueAction } from '../stores/player';

const container = style({
  padding: 0,
  margin: 0,
});

interface IRecentsProps {
  currentEpisode: App.IEpisodeInfo | null;
  episodes: App.IEpisodeInfo[];
  theme: App.ITheme;
  addToQueue: (episode: App.IEpisodeInfo) => IAddToQueueAction;
  playEpisode: (episode: App.IEpisodeInfo) => void;
}

const recentRow = (
  currentEpisode: App.IEpisodeInfo | null,
  addToQueue: (episode: App.IEpisodeInfo) => IAddToQueueAction,
  playEpisode: (episode: App.IEpisodeInfo) => void,
  theme: App.ITheme,
) => (episode: App.IEpisodeInfo) => (
  <EpisodeRow
    isCurrentEpisode={currentEpisode === episode}
    episode={episode}
    add={() => addToQueue(episode)}
    play={() => playEpisode(episode)}
    theme={theme}
  />
);

const Recents = ({ addToQueue, currentEpisode, episodes, playEpisode, theme }: IRecentsProps) => {
  const RecentRow = recentRow(currentEpisode, addToQueue, playEpisode, theme);
  return (
    <div>
      <ul className={container}>{episodes.map(RecentRow)}</ul>
    </div>
  );
};

export default Recents;
