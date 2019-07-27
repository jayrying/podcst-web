/**
 * Router actions / reducers
 */

import { Epic } from 'redux-observable';
import { filter, map, tap } from 'rxjs/operators';

import { routeTo } from '../utils/history';

import { Actions, IState } from './root';

import { getTitle } from '../utils/route-titles';
import { ISetTitleAction, setTitle } from './app';
import { effect, IEffectAction } from './utils';

/**
 * Action creator for navigating between routes
 */
export const navigate = (route: string) => ({
  type: 'NAVIGATE' as const,
  route,
});
type INavigateAction = ReturnType<typeof navigate>;

export type RouterActions = INavigateAction | IEffectAction;

/**
 * Router navigation epic
 */
export const routerEpic: Epic<RouterActions, IEffectAction, IState> = action$ =>
  action$.ofType('NAVIGATE').pipe(
    map((action: INavigateAction) => action.route),
    tap(routeTo),
    map(payload => effect({ error: false, epic: 'routerEpic', payload })),
  );

/**
 * Route title sync epic
 */
export const routeTitleSyncEpic: Epic<Actions, ISetTitleAction, IState> = action$ =>
  action$.pipe(
    filter(action => action.type === 'NAVIGATE'),
    map(({ route }: INavigateAction) => setTitle(getTitle(route))),
  );
