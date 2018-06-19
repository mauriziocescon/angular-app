import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TranslateModule } from '@ngx-translate/core';

import { AddContainerDirective } from './directives/add-component.directive';
import { ScrollToTopDirective } from './directives/scroll-to-top.directive';

import { UIUtilitiesService } from './modals/ui-utilities.service';
import { ModalAlertComponent } from './modals/modal-alert/modal-alert.component';
import { ModalConfirmerComponent } from './modals/modal-confirmer/modal-confirmer.component';

import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { TextFilterComponent } from './text-filter/text-filter.component';

import { Enum } from './utilities/enum';
import { KeyValue } from './utilities/keyvalue';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    InfiniteScrollModule,
    NgxChartsModule,
    TranslateModule,
  ],
  declarations: [
    AddContainerDirective,
    ScrollToTopDirective,
    ModalAlertComponent,
    ModalConfirmerComponent,
    NavigationBarComponent,
    TextFilterComponent,
  ],
  providers: [
    UIUtilitiesService,
  ],
  entryComponents: [
    ModalAlertComponent,
    ModalConfirmerComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    InfiniteScrollModule,
    NgxChartsModule,
    TranslateModule,
    AddContainerDirective,
    ScrollToTopDirective,
    NavigationBarComponent,
    TextFilterComponent,
  ],
})
export class SharedModule {
}

export {
  UIUtilitiesService,
  AddContainerDirective,
  NavigationBarComponent,
  Enum,
  KeyValue,
};
