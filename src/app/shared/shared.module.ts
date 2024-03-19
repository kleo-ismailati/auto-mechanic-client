import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BreadcrumbComponent} from "./layout/breadcrumb/breadcrumb.component";
import {AlertComponent} from './layout/alert/alert.component';


@NgModule({
  declarations: [
    BreadcrumbComponent,
    AlertComponent
  ],
  exports: [
    BreadcrumbComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
}
