import { Component, OnInit } from '@angular/core';
import {UserLogin, UserSession} from "../../core/models/user.model";
import {ApiService} from "../../core/services/api.service";
import {UserService} from "../../core/services/user-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserLogin = {username: "", password: ""};
  rememberMe: boolean = false;

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getRememberMe();
  }

  doLogin(){
    this.api.post('/auth/login', this.user).subscribe(
      (response: UserSession)=>{
        this.userService.loginUser(response);
        if (this.rememberMe){
          this.userService.setRememberMe(this.user.username,  this.user.password);
        }
        this.router.navigate(['dashboard']).then();
      }, error => {
        console.log(error);
      }
    )
  }
}
