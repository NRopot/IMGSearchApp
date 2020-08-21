import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  useAnimation,
} from '@angular/animations';
import { Subscription } from 'rxjs';
import { slideInRight, slideOutRight } from './modal.animations';
import { ModalWindowModel } from '../../models/modal/modal.model';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('rightLeft', [
      transition(':enter', useAnimation(slideInRight, {
        params: {
          startTranslateX: '1000px',
          endTranslateX: '0'
        }
      })),
      transition(':leave', useAnimation(slideOutRight, {
        params: {
          endTranslateX: '1000px',
          startTranslateX: '0'
        }
      })),
    ])
  ]
})
export class ModalComponent implements OnInit, OnDestroy {
  windows: Set<ModalWindowModel> = new Set<ModalWindowModel>();
  subscriptions: Subscription = new Subscription();

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
    const notificationSubscription = this.modalService.getNotification().subscribe((notification: ModalWindowModel) => {
      this.windows.add(notification);
    });

    this.subscriptions.add(notificationSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  close(window: ModalWindowModel) {
    this.windows.delete(window);
  }

  confirm(window: ModalWindowModel) {
    this.close(window);
  }

}
