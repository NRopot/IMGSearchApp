import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../index';
import * as fromCollections from '../collections/collection.reducer';
import { ICollection } from '../../../models/collections';

const selectCollectionsFeature = createFeatureSelector<fromRoot.State, fromCollections.State>(fromCollections.collectionsFeatureKey);

export const selectCollections = createSelector(
  selectCollectionsFeature,
  (state: fromCollections.State): ICollection[] => state.collections
);

export const getKeywordSelector = createSelector(
  selectCollectionsFeature,
  (state: fromCollections.State): string => state.keyword
);

export const getSelectedTabsSelector = createSelector(
  selectCollectionsFeature,
  (state: fromCollections.State): string[] => state.selectedTabs
);
