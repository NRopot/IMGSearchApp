import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromCollections from '../../store/reducers/collections/collection.reducer';
import * as CollectionsActions from '../../store/reducers/collections/collections.actions';
import * as PhotosActions from '../../store/reducers/photos/photos.actions';
import * as CollectionsSelectors from '../../store/reducers/collections/collections.selector';
import { CollectionsService } from '../../services/collections.service';
import { ICollection } from '../../models/collections';
import { ModalService } from '../../services/modal.service';
import { Photo } from '../../models/photos';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.scss']
})
export class CollectionsListComponent implements OnInit {
  @Input() photo: Photo;
  collections: ICollection[] = [];
  selectedCollections: Record<string, boolean> = {};

  constructor(
    private store$: Store<fromCollections.State>,
    private collectionsService: CollectionsService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.collectionsService.getCollections().subscribe(collections => this.collections = collections);
  }

  createCollection() {
    this.modalService.show({
      header: 'Create new collection',
      mode: 'create',
    });
  }

  toggleCollections(collection: ICollection) {
    this.selectedCollections[collection.name] = !this.selectedCollections[collection.name];
    if (this.selectedCollections[collection.name]) {
      this.photo = {
        ...this.photo,
        categories: [
          ...this.photo.categories,
          collection.name,
        ],
      };
      collection = {
        ...collection,
        photos: [
          ...collection.photos,
          this.photo,
        ]
      };
    } else {
      this.photo = {
        ...this.photo,
        categories: [
          ...this.photo.categories.filter(category => category !== collection.name),
        ],
      };
      collection = {
        ...collection,
        photos: [
          ...collection.photos.filter(photo => photo.id !== this.photo.id),
        ]
      };
    }

    this.store$.dispatch(CollectionsActions.updateCollectionsAction({ collection }));
    this.store$.dispatch(PhotosActions.updatePhotoAction({ photo: this.photo }));
  }
}
