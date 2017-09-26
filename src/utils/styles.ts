import {
  normalize,
  setupPage,
} from 'csstips';

import {
  cssRule,
  style,
} from 'typestyle';

/**
 * Global styles
 */
export const fixGlobalStyles = (theme: App.Theme) => {
  normalize();
  setupPage('body');
  cssRule('body', {
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    backgroundColor: theme.background,
  });
  cssRule('p', {
    margin: 0,
  });
  cssRule('a', {
    color: 'inherit',
    textDecoration: 'none',
  });
};

export const normalizeEl = style({
  height: '100%',
  width: '100%',
});
