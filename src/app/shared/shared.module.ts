import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BreadcrumbComponent} from "./layout/breadcrumb/breadcrumb.component";
import {BannerComponent} from './layout/banner/banner.component';
import {BackButtonComponent} from './components/back-button/back-button.component';
import {BackgroundComponent} from './layout/background/background.component';
import {HeaderComponent} from "./layout/header/header.component";
import {FooterComponent} from "./layout/footer/footer.component";
import {AlertComponent} from "./components/alert/alert.component";
import {SpinnerComponent} from './layout/spinner/spinner.component';
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
  declarations: [
    BreadcrumbComponent,
    BannerComponent,
    BackButtonComponent,
    BackgroundComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    SpinnerComponent
  ],
  exports: [
    BreadcrumbComponent,
    BannerComponent,
    BackButtonComponent,
    BackgroundComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    SpinnerComponent,
    CommonModule,
    NgxSpinnerModule
  ],
  imports: [
    RouterModule,
    CommonModule,
    NgxSpinnerModule
  ]
})
export class SharedModule {
}
