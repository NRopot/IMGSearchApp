import { Injectable } from '@angular/core';
import Unsplash, { toJson } from 'unsplash-js';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { ACCESS_KEY, SECRET_KEY } from '../config';
import * as PhotosActions from '../store/reducers/photos/photos.actions';
import * as PhotosSelectors from '../store/reducers/photos/photos.selector';
import * as fromRoot from '../store/reducers/index';
import { IFilters, Photo } from '../models/photos';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private unsplash: Unsplash = new Unsplash({
    accessKey: ACCESS_KEY,
    secretKey: SECRET_KEY
  });
  photos: Photo[];
  constructor(
    private http: HttpClient,
    private store$: Store<fromRoot.State>,
  ) { }

  getPhotos(): Observable<Photo[]> {
    return this.store$.pipe(
      select(PhotosSelectors.getPhotosSelector),
      map(photos => {
        this.photos = photos
        return photos;
      })
    );
  }

  getLocalPhotos(): Photo[] {
    return this.photos;
  }

  searchPhotos(keyword: string, page: number, perPage: number, filters?: IFilters): Observable<Photo[]> {
    return from(this.unsplash.search.photos(keyword, page, perPage, filters).then(toJson)).pipe(
      map(({ results }) => results),
      tap(photos => {
        this.store$.dispatch(PhotosActions.setPhotosAction({ photos }));
      })
    );
  }

  downloadPhoto(photo: Photo) {
    return this.http.get<any>(photo.links.download_location, {
      headers: {
        Authorization: 'Client-ID ' + ACCESS_KEY
      }
    }).subscribe();
    // return this.unsplash.photos.downloadPhoto(photo).then(downloadedPhoto => {
    //   console.log(downloadedPhoto);
    // });
  }
}
