import {Injectable} from "@angular/core";
import {UserLogin, UserSession} from "../models/user.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {

  private currentUserSubject: BehaviorSubject<UserSession>;
  public currentUser: Observable<UserSession>;

  constructor(
  ) {
    this.currentUserSubject = new BehaviorSubject<UserSession>(JSON.parse(localStorage.getItem('user')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserSession | undefined {
    return this.currentUserSubject.value;
  }

  public get loggedUser(): Observable<UserSession> {
    return this.currentUser;
  }

  loginUser(user: UserSession){
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logoutUser(){
    localStorage.removeItem('user');
    this.currentUserSubject.next(
      {email: "", id: 0, roles: [], token: "", type: "", username: ""}
    );
  }

  setRememberMe(username: string, password: string){
    localStorage.setItem('uRemember', username);
    localStorage.setItem('pRemember', password);
  }

  getRememberMe(): UserLogin{
    return {
      username : localStorage.getItem('uRemember')||'',
      password : localStorage.getItem('pRemember')||''
    }
  }

  getToken(): string | undefined{
    return this.currentUserValue?.token;
  }

  isLoggedIn(): boolean{
    return (!!this.currentUserValue?.token)
  }
}
