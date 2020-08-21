import { Action, createReducer, on } from '@ngrx/store';
import * as PhotosActions from './photos.actions';
import { Photo } from '../../../models/photos';

export const photosFeatureKey = 'photos';

export interface State {
  photos: Photo[];
}

export const initialState: State = {
  photos: [],
};

const photosReducer = createReducer(
  initialState,
  on(PhotosActions.setPhotosAction, (state, { photos }) => ({ ...state, photos })),
  on(PhotosActions.updateAllPhotosAction, (state, { photos }) => ({ ...state, photos })),
  on(PhotosActions.updatePhotoAction, (state, { photo: newPhoto }) => {
    const photos = state.photos.map(photo => {
      if (newPhoto && photo.id === newPhoto.id) {
        return newPhoto;
      }

      return photo;
    });

    return { ...state, photos };
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return photosReducer(state, action);
}
