/**
 * Add to playlist queue button
 */

import * as React from 'react';

import { style } from 'typestyle';

import { IAddToQueueAction } from '../stores/player';

import { App } from '../typings';

const addToQueueButton = (theme: App.ITheme) =>
  style({
    display: 'inline-block',
    minWidth: '80px',
    borderRadius: '3px',
    padding: '8px',
    background: 'transparent',
    color: theme.text,
    border: `2px solid ${theme.accent}`,
    $nest: {
      '&:hover, &:focus, &:active': {
        outline: 0,
        backgroundColor: theme.accent,
        color: theme.background,
      },
    },
  });

export interface IAddToQueueButtonProps {
  theme: App.ITheme;
  add: () => IAddToQueueAction;
}

const AddToQueueButton = ({ add, theme }: IAddToQueueButtonProps) => {
  return (
    <button className={addToQueueButton(theme)} onClick={add}>
      Add
    </button>
  );
};

export default AddToQueueButton;
