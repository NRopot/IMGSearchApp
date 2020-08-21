import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromCollections from '../store/reducers/collections/collection.reducer';
import * as fromRoot from '../store/reducers/index';
import * as CollectionsActions from '../store/reducers/collections/collections.actions';
import * as CollectionsSelectors from '../store/reducers/collections/collections.selector';
import { ICollection } from '../models/collections';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  constructor(
    private store$: Store<fromRoot.State>,
  ) { }

  getCollections(): Observable<ICollection[]> {
    return this.store$.pipe(
      select(CollectionsSelectors.selectCollections)
    );
  }

  createCollection(collection: ICollection) {
    this.store$.dispatch(CollectionsActions.addCollectionAction({ collection }));
  }
}
