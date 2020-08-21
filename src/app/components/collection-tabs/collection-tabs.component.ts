import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromRoot from 'src/app/store/reducers/index';
import * as CollectionsActions from 'src/app/store/reducers/collections/collections.actions';
import * as photosActions from 'src/app/store/reducers/photos/photos.actions';
import * as CollectionSelectors from 'src/app/store/reducers/collections/collections.selector';
import { ICollection } from '../../models/collections';
import { DataService } from '../../services/data.service';
import { Photo } from '../../models/photos';

@Component({
  selector: 'app-collection-tabs',
  templateUrl: './collection-tabs.component.html',
  styleUrls: ['./collection-tabs.component.scss']
})
export class CollectionTabsComponent implements OnInit, OnDestroy {
  collections$: Observable<ICollection[]>;
  photos: Photo[];
  selectedTabs: string[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(
    private store$: Store<fromRoot.State>,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.collections$ = this.store$.pipe(
      select(CollectionSelectors.selectCollections)
    );
    this.dataService.getPhotos().subscribe(photos => {
      this.photos = photos;
    });
    this.store$.select(CollectionSelectors.getSelectedTabsSelector).subscribe(selectedTags => this.selectedTabs = selectedTags);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  selectAllTabs() {
    this.store$.dispatch(CollectionsActions.setSelectedTabAction({
      selectedTab: ''
    }));
    this.store$.dispatch(photosActions.updateAllPhotosAction({
      photos: [...this.dataService.getLocalPhotos()]
    }));
    this.dataService.getPhotos().subscribe();
  }

  selectTabs(tabName: string) {
    this.store$.dispatch(CollectionsActions.setSelectedTabAction(({ selectedTab: tabName })));
  }

}
