import { App, IChromeMediaMetadataClass, IChromeNavigator } from '../typings';

/**
 * Hook into Chrome for Android's media session
 * https://developers.google.com/web/updates/2015/07/media-notifications
 * https://developers.google.com/web/updates/2017/02/media-session
 */

export const updateMetadata = (
  episode: App.IEpisodeInfo,
  info: App.IPodcastEpisodesInfo | null,
  pause: () => void,
  resume: () => void,
  seekBack: () => void,
  seekForward: () => void,
) => {
  const { mediaSession } = navigator as IChromeNavigator;

  const { title, author, episodeArt, cover } = episode;

  const artwork = episodeArt || cover || ((info && info.cover) as string);

  const MM = (window as any).MediaMetadata as IChromeMediaMetadataClass;

  mediaSession.metadata = new MM({
    album: (info && info.title) || title,
    artist: author || ((info && info.author) as string),
    artwork: [
      { src: artwork, sizes: '96x96', type: 'image/png' },
      { src: artwork, sizes: '128x128', type: 'image/png' },
      { src: artwork, sizes: '192x192', type: 'image/png' },
      { src: artwork, sizes: '256x256', type: 'image/png' },
      { src: artwork, sizes: '384x384', type: 'image/png' },
      { src: artwork, sizes: '512x512', type: 'image/png' },
    ],
    title,
  });

  mediaSession.setActionHandler('play', resume);
  mediaSession.setActionHandler('pause', pause);
  mediaSession.setActionHandler('seekbackward', seekBack);
  mediaSession.setActionHandler('seekforward', seekForward);
};
