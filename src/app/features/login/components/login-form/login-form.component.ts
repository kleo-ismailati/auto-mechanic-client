import {Component, OnInit} from '@angular/core';
import {UserLogin, UserSession} from "../../../user-management/models/user.model";
import {ApiService} from "../../../../core/services/api.service";
import {UserService} from "../../../../core/services/user-service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../../core/services/alert.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  user: UserLogin = {username: "", password: ""};
  rememberMe: boolean = false;
  loginForm: FormGroup;

  constructor(
    private api: ApiService,
    private userService: UserService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(this.user.username, [
        Validators.required,
        Validators.minLength(4)
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(8)
      ]),
    });
  }

  ngOnInit(): void {
    this.user = this.userService.getRememberMe();
    this.loginForm.controls["username"].setValue(this.user.username);
    this.loginForm.controls["password"].setValue(this.user.password);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  doLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.user.username = this.loginForm.value["username"];
    this.user.password = this.loginForm.value["password"];
    this.spinner.show();
    setTimeout(
      () => {
        this.spinner.hide();
        this.api.post('/auth/login', this.user).subscribe(
          {
            next: (response: UserSession) => {
              if (this.rememberMe) {
                this.userService.setRememberMe(this.user.username, this.user.password);
              }
              this.userService.loginUser(response);
            },
            error: error => {
              if (error.status == "INTERNAL_SERVER_ERROR") {
                this.alertService.error("Bad credentials - could not login!", {autoClose: true})
              }
            }
          }
        )
      }, 2000
    )
  }
}
