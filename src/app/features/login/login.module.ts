import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {LoginRoutingModule} from "./login-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {UserLoginComponent} from './pages/user-login/user-login.component';


@NgModule({
  declarations: [LoginFormComponent, UserLoginComponent],
  imports: [
    LoginRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class LoginModule {
}
