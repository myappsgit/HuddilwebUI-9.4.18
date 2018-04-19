import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, CanLoad, Route
} from '@angular/router';
import { MeetupService } from './provider/meetup.service';



@Injectable()
export class AdvisorAuthGuard implements CanActivate, CanLoad {
  status: boolean;
  constructor(private meetupService: MeetupService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }
  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (sessionStorage.getItem('currentUser')) {
      this.meetupService.isLoggedIn = true;
      var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      this.meetupService.sessionId = currentUser.sessionId;
      if (currentUser.userType == '7' || currentUser.userType == '8') {
        this.router.navigate([currentUser.redirectUrl]);
      }

      return true;
    }
    else if (localStorage.getItem('authCookie')) {
      this.meetupService.isLoggedIn = true;
      var currentUser = JSON.parse(localStorage.getItem('authCookie'));
      this.meetupService.sessionId = currentUser.sessionId;
      if (currentUser.userType == '7' || currentUser.userType == '8') {
        this.router.navigate([currentUser.redirectUrl]);
      }

      return true;
    }


    else {
      this.router.navigate(['']);
      return true;

    }
  }
}