import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAPIUSerOne, Users, userMenu } from 'shared';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UiService } from 'ui';
import { Router } from '@angular/router';
import { CanActivateUserGuard } from './can-activate-user.guard';


const USER_API = 'http://localhost:3000/api/user'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private attemptedAccess: boolean = false;


  private isLoadIngSubject = new BehaviorSubject<boolean>(false);
  isLoading$= this.isLoadIngSubject.asObservable();

  private loggedInSubject = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this.loggedInSubject.asObservable();

  private loggedInUserSubject = new BehaviorSubject<string>('');
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor(
    private http: HttpClient, 
    private alertService: UiService,
    private router : Router) { }

  login(username: string, password: string) {
    this.setIsLoading(true);
    this.http.get<UserAPIUSerOne>(`${USER_API}/${username}`)
    .subscribe((user) => {
      if(user.data && user.data.password === password) {
      this.loggedInSubject.next(user.data.password === password);
      this.loggedInUserSubject.next(`${user.data.username}`
      );
      this.alertService.newAlert({
        type: 'success',
        heading: `Welcome ${this.loggedInUserSubject.value}`,
        text: 'Nice to see you again!'
      })
      this.router.navigate(['']);
      }else {
        this.alertService.newAlert({
          type: 'danger', 
          heading: 'Authentication Error', 
          text: 'Wrong username or password',})
      }
      this.setIsLoading(false);
    });
  }
  logout( ){
    this.loggedInSubject.next(false);
    this.loggedInUserSubject.next('');
    this.router.navigate(['']);
  }

  setIsLoading(isLoading: boolean) {
    this.isLoadIngSubject.next(isLoading);
  }

  setAttemptedAccess(attempted: boolean) {
    this.attemptedAccess = attempted;
  }

  hasAttemptedAccess() {
    return this.attemptedAccess;
  }
}
