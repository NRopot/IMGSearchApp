import { createAction, props } from '@ngrx/store';
import { Photo } from '../../../models/photos';

export const setPhotosAction = createAction(
  '[Photos] Load photos',
  props<{ photos: Photo[] }>(),
);

export const updatePhotoAction = createAction(
  '[Photos] Update photo',
  props<{ photo: Photo }>(),
);

export const updateAllPhotosAction = createAction(
  '[Photos] Update all photos',
  props<{ photos: Photo[] }>(),
);

