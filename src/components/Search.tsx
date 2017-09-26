/**
 * Search component for toolbar
 */

import {
  h,
  Component,
} from 'preact';

import {
  style,
} from 'typestyle';

import {
  Observable,
} from 'rxjs/Observable';

import {
  Subscription,
} from 'rxjs/Subscription';

import {
  onEvent,
} from '../utils';

import {
  SearchState,
} from '../stores/search';

import SearchResults from './SearchResults';

const search = (theme: App.Theme) => style({
  padding: 16,
  height: 'inherit',
  boxShadow: 'inset 0 2px 5px rgba(0,0,0,.2)',
  backgroundColor: theme.backgroundDark,
  border: `1px solid ${theme.backgroundDark}`,
  borderRadius: '4px',
  outline: 'none',
  color: theme.text,
});

const Key: KeyboardShortcutsMap = {
  83: 'focus',
  27: 'dismiss',
};

interface SearchProps extends SearchState {
  className: string;
  searchPodcasts(query: string);
  dismissSearch();
  navigateResult(direction: 'up' | 'down');
  focusResult(focusedResult: number);
  onResultSelect(feed: string);
  theme: App.Theme;
}

class Search extends Component<SearchProps, any> {
  private el: HTMLElement | null = null;
  private clicksSub: Subscription | null = null;
  private keyboardSub: Subscription | null = null;

  componentDidMount() {
    this.watchClicks();
    this.watchKeyboard();
  }

  componentWillUnmount() {
    this.clicksSub && this.clicksSub.unsubscribe();
    this.keyboardSub && this.keyboardSub.unsubscribe();
  }

  watchClicks = () => {
    this.clicksSub = Observable.fromEvent(document, 'click')
      .filter(({ target, }: MouseEvent) =>
        !!this.el &&
        !this.el.contains(target as HTMLElement)
      )
      .subscribe(this.props.dismissSearch);
  }

  watchKeyboard = () => {
    this.keyboardSub = Observable.fromEvent(document, 'keydown')
      .filter(({ keyCode, }: KeyboardEvent) => Key[keyCode] !== undefined)
      .map((event: KeyboardEvent) => ({
        input: (this.el as HTMLDivElement).querySelector('input') as HTMLInputElement,
        keyCode: event.keyCode,
        preventDefault: () => event.preventDefault(),
        target: event.target as HTMLElement,
      }))
      .subscribe(({ input, keyCode, preventDefault, target }) => {
        switch (Key[keyCode]) {
          case 'focus': {
            if (this.el && !this.el.contains(target)) {
              preventDefault();
              input.focus();
            }
            return;
          }
          case 'dismiss': {
            preventDefault();
            return this.props.dismissSearch();
          }
        }
      });
  }

  saveRef = (el: HTMLElement | undefined) => {
    if (el) {
      this.el = el;
    }
  }

  render({
    className,
    dismissSearch,
    podcasts,
    query,
    searchPodcasts,
    focusedResult,
    focusResult,
    navigateResult,
    onResultSelect,
    theme,
  }: SearchProps) {
    return (
      <div
        class={className}
        ref={this.saveRef}
      >
        <input
          aria-label="Search podcasts"
          class={search(theme)}
          type="text"
          onInput={onEvent(searchPodcasts)}
          placeholder={'Search'}
          value={query}
        />
        {query && podcasts.length ?
          <SearchResults
            focusResult={focusResult}
            focusedResult={focusedResult}
            navigateResult={navigateResult}
            dismissSearch={dismissSearch}
            podcasts={podcasts}
            onResultSelect={onResultSelect}
          /> : null
        }
      </div>
    );
  }
}

export default Search;
