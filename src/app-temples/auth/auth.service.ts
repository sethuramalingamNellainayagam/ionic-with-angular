import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private userIsAuthenticated = false;
  private userId = null;
  private _user = new BehaviorSubject<User>(null);
  private activeLogoutTimer;

  constructor(private httpClient: HttpClient, private router: Router) {}

  get getUserIsAuthenticated(): Observable<boolean> {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return null;
        }
      })
    );
  }

  get getUserId(): Observable<string> {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.userId;
        } else {
          return null;
        }
      })
    );
  }

  get getToken(): Observable<string> {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  autoLogin() {
    return from(Preferences.get({ key: 'authData' })).pipe(
      map((storedData) => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          userId: string;
          token: string;
          email: string;
          expirationDate: string;
        };
        const expTime = new Date(parsedData.expirationDate);
        if (expTime <= new Date()) {
          return null;
        }
        const userData = new User(
          parsedData.userId,
          parsedData.email,
          parsedData.token,
          expTime
        );
        return userData;
      }),
      tap((userData: User) => {
        this._user.next(userData);
        this.autoLogout(userData?.tokenDuration);
      }),
      map((user) => !!user)
    );
  }

  login(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPITempleKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  logout(): void {
    this._user.next(null);
    Preferences.remove({ key: 'authData' });
    this.router.navigateByUrl('/auth');
  }

  signup(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPITempleKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  private setUserData(userData: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    const user = new User(
      userData.localId,
      userData.email,
      userData.idToken,
      expirationDate
    );
    this._user.next(user);
    this.autoLogout(user.tokenDuration);
    this.authStoreData(
      userData.localId,
      userData.idToken,
      expirationDate.toISOString(),
      userData.email
    );
  }

  private authStoreData(
    userId: string,
    token: string,
    expirationDate: string,
    email: string
  ) {
    const authJson = JSON.stringify({
      userId,
      token,
      expirationDate,
      email,
    });
    Preferences.set({
      key: 'authData',
      value: authJson,
    });
  }

  private autoLogout(duration: number) {
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  ngOnDestroy(): void {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }
}
