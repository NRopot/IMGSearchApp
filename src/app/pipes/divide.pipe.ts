import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { take, drop } from 'lodash';

import { Photo } from '../models/photos';

@Pipe({
  name: 'divide',
})
@Injectable()
export class DividePipe implements PipeTransform {
  public transform(photos: Photo[], divider: number) {
    if (photos && photos.length > 0) {
      const result = [];
      let array = photos;
      const divisor = photos.length < divider
        ? Math.round(photos.length / divider)
        : Math.floor(photos.length / divider);

      const func = () => {
        result.push(take(array, divisor < 1 ? 1 : divisor));
        array = drop(array, divisor < 1 ? 1 : divisor);
        if (array.length) {
          func();
        }
      };
      func();

      return result;
    }

    return photos;
  }
}
