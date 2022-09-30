import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { AuthService } from './auth/auth.service';

import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { of, Subscription } from 'rxjs';
import { delay, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  authSub: Subscription;
  private previousAuthState = false;
  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    this.authSub = this.authService.getUserIsAuthenticated.pipe(
      take(1),
      switchMap((isAuthenticated) => {
        if (!isAuthenticated) {
          return this.authService.autoLogin();
        } else {
          return of(isAuthenticated);
        }
      }),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('/auth');
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  onLogOut(): void {
    this.authService.logout();
    this.menuCtrl.close();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        SplashScreen.hide();
      }
    });
  }
}
