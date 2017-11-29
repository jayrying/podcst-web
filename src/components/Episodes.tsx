import { Component, h } from 'preact';
import { classes, media, style, types } from 'typestyle';

import { IPodcastsState } from '../stores/podcasts';

import { imageWithPlaceholder, scrollToTop, stripHost } from '../utils';
import { normalizeEl } from '../utils/styles';

import EpisodeRow from './EpisodeRow';
import Loading from './Loading';
import ShareButton from './ShareButton';

const episodesContainer = (theme: App.ITheme) =>
  style({
    backgroundColor: theme.background,
    color: theme.text,
  });

const infoCover = (mode: App.ThemeMode, cover: string) =>
  style(
    {
      backgroundImage: imageWithPlaceholder(mode, cover),
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: '300px',
      height: '300px',
      minWidth: '300px',
    },
    media(
      { maxWidth: 600 },
      {
        width: '100vw',
        height: '100vw',
      },
    ),
  );

const podcastInfo = style(
  {
    display: 'flex',
    padding: 32,
    paddingBottom: 0,
  },
  media(
    { maxWidth: 600 },
    {
      flexDirection: 'column',
      padding: 0,
    },
  ),
);

const podcastInfoTitles = (theme: App.ITheme) =>
  style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 16,
    paddingTop: 0,
    $nest: {
      '& a': {
        color: theme.accent,
      },
    },
  });

const margins: types.NestedCSSProperties = {
  marginTop: 8,
  marginBottom: 8,
};

const infoMargins = style(margins);

const episodesListContainer = (theme: App.ITheme) =>
  style({
    margin: '32px 0 0',
    borderTop: `1px solid ${theme.backgroundLight}`,
    padding: 0,
  });

const podcastTitle = style(margins, {
  fontSize: '40px',
  fontWeight: 'bold',
});

const buttonsContainer = style(
  margins,
  {
    display: 'flex',
    $nest: {
      '& button': {
        marginRight: 16,
        minWidth: 120,
      },
    },
  },
  media(
    { maxWidth: 600 },
    {
      width: '100%',
      flexDirection: 'column',
      $nest: {
        '& button': {
          margin: 0,
          marginBottom: 16,
        },
      },
    },
  ),
);

const subscribeButton = (theme: App.ITheme) =>
  style({
    display: 'inline-block',
    minWidth: '120px',
    borderRadius: '3px',
    padding: '8px',
    background: 'transparent',
    color: theme.text,
    border: `2px solid ${theme.accent}`,
    outline: 0,
    $nest: {
      '&:focus, &:hover, &[data-is-subscribed]': {
        backgroundColor: theme.accent,
        color: theme.background,
      },
      '&[data-is-subscribed]:hover': {
        background: 'transparent',
        color: theme.text,
      },
    },
  });

interface IEpisodesProps {
  mode: App.ThemeMode;
  theme: App.ITheme;
  feed: string;
  info: IPodcastsState;
  currentEpisode: App.IEpisodeInfo | null;
  subscriptions: ISubscriptionsMap;
  getEpisodes: (feed: string) => void;
  playEpisode: (episode: App.IEpisodeInfo) => void;
  addSubscription: (feed: string, podcasts: App.IPodcastEpisodesInfo) => void;
  removeSubscription: (feed: string) => void;
}

class Episodes extends Component<IEpisodesProps, any> {
  public loadIfNeeded = () => {
    const { feed, getEpisodes, info } = this.props;

    const feedInfo = info[feed];

    if (!feedInfo || (feedInfo && !feedInfo.episodes && !feedInfo.loading)) {
      getEpisodes(feed);
    }
  };

  public componentDidMount() {
    this.loadIfNeeded();
    scrollToTop();
  }

  public componentDidUpdate() {
    this.loadIfNeeded();
  }

  public renderLoading() {
    return <Loading />;
  }

  public renderEpisode = (episode: App.IEpisodeInfo) => {
    const { currentEpisode, playEpisode, theme } = this.props;

    const play = () => playEpisode(episode);

    return <EpisodeRow isCurrentEpisode={currentEpisode === episode} episode={episode} play={play} theme={theme} />;
  };

  public renderLoaded(feed: string, info: App.IPodcastEpisodesInfo | null) {
    if (!info) {
      return <div>Couldn't get Podcasts episodes</div>;
    }

    const { addSubscription, mode, removeSubscription, subscriptions, theme } = this.props;

    const isSubscribed = !!subscriptions[feed];

    const { author, cover, description, episodes, link, title } = info;

    const handler = () => (isSubscribed ? removeSubscription(feed) : addSubscription(feed, info));

    return (
      <div class={classes(normalizeEl, episodesContainer(theme))}>
        <div class={podcastInfo}>
          <div class={infoCover(mode, cover)} role="img" aria-label={`${title} by ${author}`} />
          <div class={podcastInfoTitles(theme)}>
            <h1 class={podcastTitle}>{title}</h1>
            <h2 class={infoMargins}>
              {author} - <a href={link}>{stripHost(link)}</a>
            </h2>
            <div class={buttonsContainer}>
              <button class={subscribeButton(theme)} data-is-subscribed={isSubscribed} onClick={handler}>
                {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
              </button>
              <ShareButton title={title} text={`${title} - ${description}`} url={location.href} theme={theme} />
            </div>
            <p class={infoMargins} dangerouslySetInnerHTML={{ __html: description.trim() }} />
          </div>
        </div>
        <ul class={episodesListContainer(theme)}>{episodes.map(this.renderEpisode)}</ul>
      </div>
    );
  }

  public render({ feed, info }: IEpisodesProps) {
    const feedInfo = info[feed];
    if (!feedInfo || feedInfo.loading) {
      return this.renderLoading();
    }

    return this.renderLoaded(feed, feedInfo.episodes);
  }
}

export default Episodes;
