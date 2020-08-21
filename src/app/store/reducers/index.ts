import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromPhotos from './photos/photos.reducer';
import * as fromCollections from './collections/collection.reducer';


export interface State {
  photos: fromPhotos.State;
  collections: fromCollections.State;
}

export const reducers: ActionReducerMap<State> = {
  photos: fromPhotos.reducer,
  collections: fromCollections.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
