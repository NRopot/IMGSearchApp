import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { CollectionsService } from '../../services/collections.service';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.scss']
})
export class CreateCollectionComponent implements OnInit {
  createCollectionForm: FormGroup;
  @Output() onCreate: EventEmitter<any> = new EventEmitter();
  @Output() onCanceled: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private collectionService: CollectionsService
  ) { }

  ngOnInit() {
    this.createCollectionForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
    if (this.createCollectionForm.valid) {
      this.collectionService.createCollection({
        ...this.createCollectionForm.value,
        count: 0,
        photos: []
      });
      this.onCreate.emit();
    }
  }

  onCancel() {
    this.onCanceled.emit();
  }

  get name(): AbstractControl {
    return this.createCollectionForm.get('name');
  }

  get description(): AbstractControl {
    return this.createCollectionForm.get('description');
  }

}
