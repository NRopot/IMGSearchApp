import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as PhotosActions from './store/reducers/photos/photos.actions';
import * as CollectionsActions from './store/reducers/collections/collections.actions';
import * as fromPhotos from './store/reducers/photos/photos.reducer';
import { DataService } from './services/data.service';
import { Photo } from './models/photos';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  photos$: Observable<Photo[]>;
  subscriptions: Subscription = new Subscription();
  searchControl: FormControl = new FormControl('');

  constructor(
    private store$: Store<fromPhotos.State>,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.photos$ = this.dataService.getPhotos();
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(keyword => {
      const searchSubscription = this.dataService.searchPhotos(keyword, 1, 30).subscribe();

      this.store$.dispatch(CollectionsActions.updateKeywordAction({ keyword }));
      this.subscriptions.add(searchSubscription);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
