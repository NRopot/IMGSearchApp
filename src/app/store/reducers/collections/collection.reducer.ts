import { Action, createReducer, on } from '@ngrx/store';

import * as CollectionsActions from './collections.actions';
import { ICollection } from '../../../models/collections';

export const collectionsFeatureKey = 'collections';

export interface State {
  collections: ICollection[];
  keyword: string;
  selectedTabs: string[];
}

export const initialState: State = {
  collections: [
    {
      name: 'Cats',
      count: 0,
      photos: [],
    } as ICollection,
    {
      name: 'Dogs',
      count: 0,
      photos: [],
    } as ICollection,
    {
      name: 'People',
      count: 0,
      photos: [],
    } as ICollection,
  ],
  keyword: '',
  selectedTabs: [],
};

const collectionsReducer = createReducer(
  initialState,
  on(CollectionsActions.setSelectedTabAction, (state, { selectedTab }) => {
    if (!selectedTab) {
      return { ...state, selectedTabs: [] };
    }

    if (state.selectedTabs.includes(selectedTab)) {
      return { ...state, selectedTabs: state.selectedTabs.filter(v => v !== selectedTab) };
    }

    return { ...state, selectedTabs: [ ...state.selectedTabs, selectedTab ] };
  }),
  on(CollectionsActions.updateKeywordAction, (state, { keyword }) => ({ ...state, keyword })),
  on(CollectionsActions.addCollectionAction, (state, { collection }) => ({
    ...state,
    collections: [
      ...state.collections,
      collection,
    ]
  })),
  on(CollectionsActions.updateCollectionsAction, (state, { collection: newCollection }) => {
    const collections = state.collections.map(collection => {
      if (collection.name === newCollection.name) {
        newCollection = {
          ...newCollection,
          count: newCollection.photos.length
        };

        return newCollection;
      }

      collection = {
        ...collection,
        count: collection.photos.length
      };

      return collection;
    });

    return {
      ...state,
      collections,
    };
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return collectionsReducer(state, action);
}
