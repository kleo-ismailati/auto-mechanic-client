import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserLoginPageComponent} from "./pages/user-login-page/user-login-page.component";

const routes: Routes = [{path: '', component: UserLoginPageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
