import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Photo } from '../../models/photos';
import { DataService } from '../../services/data.service';
import * as fromRoot from 'src/app/store/reducers/index';
import * as CollectionsSelectors from 'src/app/store/reducers/collections/collections.selector';

@Component({
  selector: 'app-photos-container',
  templateUrl: './photos-container.component.html',
  styleUrls: ['./photos-container.component.scss']
})
export class PhotosContainerComponent implements OnInit {
  @Input() photos: Photo[];

  constructor(
    private dataService: DataService,
    private store$: Store<fromRoot.State>
  ) { }

  ngOnInit() {
      this.store$.select(CollectionsSelectors.getSelectedTabsSelector)
    .subscribe(tabs => {
      this.photos = this.dataService.getLocalPhotos().filter(photo => {
        if (tabs.some(tab => photo.categories.includes(tab))) {
          return true;
        }

        return false;
      });
    });
  }
}
