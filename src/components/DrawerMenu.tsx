/**
 * Drawer menu component
 */

import { h } from 'preact';

import { style, types } from 'typestyle';

import NavLinks, { ILinkMap } from './NavLinks';

const linkMap: ILinkMap = {
  '/subs': 'Podcasts',
  '/feed/top': 'Top',
};

const drawerItem = (theme: App.ITheme): types.NestedCSSProperties => ({
  height: 64,
  display: 'flex',
  alignItems: 'center',
  padding: 16,
  borderBottom: `solid 1px ${theme.backgroundLight}`,
});

const drawer = (theme: App.ITheme) =>
  style({
    display: 'block',
    position: 'fixed',
    height: '100%',
    width: 240,
    zIndex: 502,
    background: theme.background,
    boxShadow: `0px 4px 4px 0px rgba(0,0,0,0.75)`,
    fontSize: 20,
    color: theme.text,
    $nest: {
      '& nav nav': {
        display: 'flex',
        flexDirection: 'column',
      },
      '& nav nav a': drawerItem(theme),
      '& nav header': drawerItem(theme),
    },
  });

interface IDrawerMenuProps {
  theme: App.ITheme;
}

const DrawerMenu = ({ theme }: IDrawerMenuProps) => (
  <aside class={drawer(theme)}>
    <nav>
      <header>
        <div>Podcst.io</div>
      </header>
      <NavLinks links={linkMap} theme={theme} />
    </nav>
  </aside>
);

export default DrawerMenu;
