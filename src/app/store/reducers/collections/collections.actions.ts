import { createAction, props } from '@ngrx/store';
import { ICollection } from '../../../models/collections';

export const updateCollectionsAction = createAction(
  '[Collection] Update collection',
  props<{ collection: ICollection }>(),
);

export const addCollectionAction = createAction(
  '[Collection] Add photo',
  props<{ collection: ICollection }>(),
);

export const updateKeywordAction = createAction(
  '[Collection] Update keyword',
  props<{ keyword: string }>(),
);

export const setSelectedTabAction = createAction(
  '[Collection] Set selected tabs',
  props<{ selectedTab: string }>(),
);

