/**
 * Theme Picker settings component
 */

import * as React from 'react';

import { media, style } from 'typestyle';

import Icon, { IconType } from '../svg/Icon';

import { onEvent } from '../utils';

import { App } from '../typings';

const container = (theme: App.ITheme) =>
  style({
    display: 'flex',
    flexDirection: 'column',
    color: theme.text,
    fontSize: 18,
  });

const themesContainer = (theme: App.ITheme) =>
  style(
    {
      $nest: {
        '& > div': {
          display: 'flex',
          alignItems: 'center',
          padding: 32,
        },
        '& > div:nth-child(even)': {
          backgroundColor: theme.backgroundLight,
        },
        '& input': {
          marginRight: 16,
        },
        '& label': {
          display: 'flex',
          alignItems: 'center',
          flex: 1,
        },
        '& label > div': {
          marginRight: 16,
        },
      },
    },
    media(
      { maxWidth: 600 },
      {
        $nest: {
          '& > div': {
            paddingLeft: 16,
            paddingRight: 16,
          },
        },
      },
    ),
  );

interface IThemePickerProps {
  mode: App.ThemeMode;
  theme: App.ITheme;
  onThemeChange(mode: App.ThemeMode);
}

interface IThemeInfo {
  theme: App.ThemeMode;
  icon: IconType;
  name: string;
}

const appThemes: IThemeInfo[] = [
  {
    theme: 'light',
    icon: 'day',
    name: 'Light',
  },
  {
    theme: 'dark',
    icon: 'night',
    name: 'Dark',
  },
];

const renderTheme = (color: string, selected: App.ThemeMode, { icon, name, theme }: IThemeInfo) => (
  <div key={name}>
    <input type="radio" id={theme} name="theme" checked={selected === theme} value={theme} />
    <label htmlFor={theme}>
      <Icon color={color} icon={icon} />
      {name}
    </label>
  </div>
);

const renderThemes = (color: string, selected: App.ThemeMode, themes: IThemeInfo[]) =>
  themes.map(theme => renderTheme(color, selected, theme));

const ThemePicker = ({ mode, theme, onThemeChange }: IThemePickerProps) => (
  <form onChange={onEvent(onThemeChange)} className={container(theme)}>
    <div className={themesContainer(theme)}>{renderThemes(theme.text, mode, appThemes)}</div>
  </form>
);

export default ThemePicker;
