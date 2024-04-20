import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLoginPageComponent } from './pages/user-login-page/user-login-page.component';
import { LoginService } from './login.service';

@NgModule({
    declarations: [LoginFormComponent, UserLoginPageComponent],
    imports: [LoginRoutingModule, SharedModule, ReactiveFormsModule],
    providers: [LoginService],
})
export class LoginModule {}
