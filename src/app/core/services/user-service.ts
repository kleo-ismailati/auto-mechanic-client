import {Injectable} from "@angular/core";
import {UserLogin, UserSession} from "../models/user.model";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {AlertService} from "./alert.service";
import {jwtDecode} from "jwt-decode";

@Injectable({providedIn: 'root'})
export class UserService {

  private currentUserSubject: BehaviorSubject<UserSession | null>;
  public currentUser: Observable<UserSession | null>;

  private tokenExpirationTimer: any;
  private tokenInfo: any;
  private expireTimestamp: number = 0;

  constructor(
    private router: Router,
    private alertService: AlertService
  ) {
    this.currentUserSubject = new BehaviorSubject<UserSession | null>(null);

    if (localStorage.getItem('user') != null) {
      this.currentUserSubject.next(JSON.parse(localStorage.getItem('user')!));
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserSession | null {
    return this.currentUserSubject.value;
  }

  public get loggedUser(): Observable<UserSession | null> {
    return this.currentUser;
  }

  loginUser(user: UserSession) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);

    this.router.navigate(['dashboard']).then(
      () => {
        this.alertService.success("Logged in successfully!", {autoClose: true})
      }
    );
  }

  logoutUser() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.clearLogoutTimer();
    this.router.navigate([""]).then(() => {
      this.alertService.success("Logged out successfully", {autoClose: true, keepAfterRouteChange: true});
    })
  }

  logoutUserOnExpire() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.clearLogoutTimer();

    this.router.navigate([""]).then(() => {
      this.alertService.warn("User session expired! Please sign in again!", {
        autoClose: false,
        keepAfterRouteChange: true
      });
    })
  }

  logoutUserForced() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.clearLogoutTimer();

    this.router.navigate([""]).then(() => {
      this.alertService.warn("User session invalid! Please sign in again!", {
        autoClose: true,
        keepAfterRouteChange: true
      });
    })
  }

  autoLogoutUser() {
    let currentDate: Date = new Date();
    let expireDate: Date | null = this.getTokenExpirationDate();
    this.clearLogoutTimer();

    if (expireDate && expireDate.getTime() < currentDate.getTime()) {
      localStorage.removeItem('user');
      this.currentUserSubject.next(null);
      this.router.navigate([""]).then(() => {
        this.alertService.warn("User session expired! Please sign in again!", {
          autoClose: true,
          keepAfterRouteChange: true
        });
      })
    }
  }

  setLogoutTimer() {
    let currentDate: Date = new Date();
    let expireDate: Date | null = this.getTokenExpirationDate();
    let timeMillis: number = 0;

    if (expireDate && expireDate.getTime() > currentDate.getTime()) {
      timeMillis = expireDate.getTime() - currentDate.getTime();
      this.tokenExpirationTimer = setTimeout(() => {
        this.logoutUserOnExpire()
      }, timeMillis);
    }
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  setRememberMe(username: string, password: string) {
    localStorage.setItem('uRemember', username);
    localStorage.setItem('pRemember', password);
  }

  getRememberMe(): UserLogin {
    return {
      username: localStorage.getItem('uRemember') || '',
      password: localStorage.getItem('pRemember') || ''
    }
  }

  getToken(): string | undefined {
    return this.currentUserValue?.token;
  }

  getTokenExpirationDate() {
    try {
      if (this.currentUserValue) {
        this.tokenInfo = jwtDecode(this.currentUserValue!.token);
        this.expireTimestamp = this.tokenInfo.exp;

        return new Date(this.expireTimestamp * 1000);
      } else return null;
    } catch (Error) {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return (!!this.currentUserValue?.token)
  }
}
