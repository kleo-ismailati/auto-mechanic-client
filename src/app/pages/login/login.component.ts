import { Component, OnInit } from '@angular/core';
import {UserLogin, UserSession} from "../../core/models/user.model";
import {ApiService} from "../../core/services/api.service";
import {UserService} from "../../core/services/user-service";
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../core/services/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserLogin = {username: "", password: ""};
  rememberMe: boolean = false;
  loginForm: FormGroup;

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder
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

  doLogin(){
    if (this.loginForm.invalid) {
      return;
    }
    this.user.username = this.loginForm.value["username"];
    this.user.password = this.loginForm.value["password"];
      this.api.post('/auth/login', this.user).subscribe(
      (response: UserSession)=>{
        this.userService.loginUser(response);
        if (this.rememberMe){
          this.userService.setRememberMe(this.user.username,  this.user.password);
        }
        this.router.navigate(['dashboard']).then(
          () => {
            this.alertService.success("Logged in successfully!", { autoClose: true })
          }
        );
      }, error => {
        if(error.status=="INTERNAL_SERVER_ERROR"){
          this.alertService.error("Bad credentials - could not login!", { autoClose: true })
        }
      }
    )
  }
}
