/**
 * Storage manager
 */

import { IAppState } from '../stores/app';
import { ISubscriptionsState } from '../stores/subscriptions';

const STORE_KEY = 'store@3';
const DEPRECATED_BASE_KEY = 'store@PLAY_PODCST_IO';
const DEPRECATED_KEYS = [DEPRECATED_BASE_KEY, DEPRECATED_BASE_KEY + '/2'];

interface IStoreable {
  subscriptions: ISubscriptionsState;
  app: IAppState;
}

const storage = process.env.IN_BROWSER
  ? localStorage
  : {
      // tslint:disable:no-empty
      setItem(_k: string, _v: string) {},
      getItem(_k: string) {
        return '{}';
      },
      removeItem(_k: string) {},
      clear(_x: string) {},
      length: 0,
    };

// Handle deprecated keys
DEPRECATED_KEYS.forEach(storage.removeItem.bind(storage));

const getStore = (): IStoreable => JSON.parse(storage.getItem(STORE_KEY) as string) || {};

const getValue = <K extends keyof IStoreable>(key: K): IStoreable[K] | null => {
  const store = getStore();
  return store[key] || null;
};

const setValue = <K extends keyof IStoreable>(key: K, val: IStoreable[K]) => {
  const store: IStoreable = {
    ...getStore(),
    [key]: val,
  };
  storage.setItem(STORE_KEY, JSON.stringify(store));
};

export const Storage = {
  saveSubscriptions(subs: IStoreable['subscriptions']) {
    setValue('subscriptions', subs);
  },
  getSubscriptions() {
    return getValue('subscriptions');
  },
  saveAppState(appState: IAppState) {
    setValue('app', appState);
  },
  getAppState() {
    return getValue('app');
  },
};
