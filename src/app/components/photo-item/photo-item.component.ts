import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Photo } from '../../models/photos';
import { DataService } from '../../services/data.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.scss']
})
export class PhotoItemComponent implements OnInit {
  @Input() photo: Photo;

  constructor(
    private dataService: DataService,
    private modalService: ModalService
  ) { }

  ngOnInit() {

  }

  addToCollections(photo: Photo) {
    this.modalService.show({
      header: 'Add to collections',
      mode: 'add',
      payload: photo
    });
  }

  downloadPhoto(photo: Photo) {
    return this.dataService.downloadPhoto(photo);
  }

}
