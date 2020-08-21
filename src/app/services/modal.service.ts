import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ModalWindowModel } from '../models/modal/modal.model';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private window: Subject<ModalWindowModel> = new Subject<ModalWindowModel>();

  getNotification(): Subject<ModalWindowModel> {
    return this.window;
  }

  show(window: ModalWindowModel) {
    this.window.next(window);
  }
}
