import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserLogin} from "../../../user-management/models/user-login.model";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Input() user!: UserLogin;
  @Output() userLoggingIn = new EventEmitter<UserLogin>();
  @Output() setRememberMe = new EventEmitter<boolean>();

  rememberMe: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
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
    if (this.rememberMe) {
      this.setRememberMe.emit(true);
    }
    this.userLoggingIn.emit(this.user);
  }
}
