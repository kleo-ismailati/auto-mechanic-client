import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../login.service";
import {UserService} from "../../../../core/services/user-service";
import {AlertService} from "../../../../core/services/alert.service";
import {UserLogin} from "../../../user-management/models/user-login.model";
import {UserSession} from "../../../user-management/models/user-session.model";
import {HttpErrorResponse} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-user-login-page-form',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.css']
})
export class UserLoginPageComponent implements OnInit {

  user: UserLogin = {username: "", password: ""};
  rememberMe: boolean = false;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.user = this.userService.getRememberMe();
  }

  onUserLoggingIn(user: UserLogin) {
    this.user = user;
    this.spinner.show().then(r => r);
    setTimeout(
      () => {
        this.spinner.hide().then(r => r);
        this.loginService.login(this.user).subscribe(
          {
            next: (response: UserSession) => {
              if (this.rememberMe) {
                this.userService.setRememberMe(this.user.username, this.user.password);
              }
              this.userService.loginUser(response);
            },
            error: (error: HttpErrorResponse) => {
              if (error.status == 500) {
                this.alertService.error("Bad credentials - could not login!", {autoClose: true})
              }
            }
          }
        )
      }, 2000
    )
  }

  onSetRememberMe(isRememberMe: boolean) {
    if (isRememberMe) {
      this.rememberMe = isRememberMe;
    }
  }
}
