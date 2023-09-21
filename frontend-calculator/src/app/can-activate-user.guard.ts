import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateUserGuard {
  constructor(private appService: AppService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if the user has attempted to access a protected route
  if (!this.appService.hasAttemptedAccess()) {
    // If not attempted, mark it as attempted and allow access
    this.appService.setAttemptedAccess(true);
    return true;
  } else {
    // If attempted, redirect to the login page
    this.router.navigate(['/login']);
    return false;
  }
}}