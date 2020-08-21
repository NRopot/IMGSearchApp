import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../index';
import * as fromPhotos from '../photos/photos.reducer';
import { Photo } from '../../../models/photos';

const selectCollectionsFeature = createFeatureSelector<fromRoot.State, fromPhotos.State>(fromPhotos.photosFeatureKey);

export const getPhotosSelector = createSelector(
  selectCollectionsFeature,
  (state: fromPhotos.State): Photo[] => state.photos
);
