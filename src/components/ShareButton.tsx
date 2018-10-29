/**
 * Share Button component
 */

import * as React from 'react';

import { media, style } from 'typestyle';

import { App, IShareEnabledNavigator } from '../typings';

const shareButton = (theme: App.ITheme) =>
  style(
    {
      display: 'inline-block',
      borderRadius: '3px',
      padding: '8px',
      background: 'transparent',
      color: theme.text,
      border: `2px solid ${theme.accent}`,
      outline: 0,
      $nest: {
        '&:focus, &:hover, &:active': {
          backgroundColor: theme.accent,
          color: theme.background,
        },
      },
    },
    media(
      { maxWidth: 600 },
      {
        $nest: {
          '&:active': {
            backgroundColor: 'transparent',
            color: theme.text,
          },
        },
      },
    ),
  );

interface IShareButtonProps {
  theme: App.ITheme;
  title: string;
  text: string;
  url: string;
}

const share = ({ text, title, url }: IShareButtonProps) => () => {
  if ('share' in navigator) {
    /* tslint:disable:no-console */
    (navigator as IShareEnabledNavigator)
      .share({ text, title, url })
      .then(() => console.log('Share succesful'))
      .catch(err => console.error('Error sharing', err));
  }
};

/* tslint:disable:no-console */
const ShareButton = (props: IShareButtonProps) =>
  'share' in navigator ? (
    <button className={shareButton(props.theme)} onClick={share(props)}>
      Share
    </button>
  ) : null;

export default ShareButton;
