import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BreadcrumbComponent} from "./layout/breadcrumb/breadcrumb.component";
import {AlertComponent} from './layout/alert/alert.component';
import { BannerComponent } from './layout/banner/banner.component';
import { BackButtonComponent } from './layout/back-button/back-button.component';
import { BackgroundComponent } from './layout/background/background.component';


@NgModule({
  declarations: [
    BreadcrumbComponent,
    AlertComponent,
    BannerComponent,
    BackButtonComponent,
    BackgroundComponent
  ],
  exports: [
    BreadcrumbComponent,
    AlertComponent,
    BannerComponent,
    BackButtonComponent,
    BackgroundComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
}
