import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { metaReducers, reducers } from './store/reducers';
import { environment } from '../environments/environment';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { PhotosContainerComponent } from './components/photos-container/photos-container.component';
import { PhotoItemComponent } from './components/photo-item/photo-item.component';
import { ModalComponent } from './components/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollectionsListComponent } from './components/collections-list/collections-list.component';
import { CreateCollectionComponent } from './components/create-collection/create-collection.component';
import { DividePipe } from './pipes';
import { CollectionTabsComponent } from './components/collection-tabs/collection-tabs.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    PhotosContainerComponent,
    PhotoItemComponent,
    ModalComponent,
    CollectionsListComponent,
    CreateCollectionComponent,
    DividePipe,
    CollectionTabsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // ScrollingModule,
    // CdkScrollableModule,
    BrowserAnimationsModule,
    FormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
