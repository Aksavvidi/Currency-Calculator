import { Component } from '@angular/core';
import { userMenu, exchangeRate, currency } from 'shared';
import { AppService } from './app.service';
import { UiService } from 'ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Currency Calculator';
  userMenu = userMenu;
  exchangeRate = exchangeRate;
  currency = currency;

  isLoggedIn$ = this.service.isLoggedIn$;
  loggedInUser$ = this.service.loggedInUser$;
  isLoading$ = this.service.isLoading$;

  alerts = this.uiService.alerts;
  constructor(
    private service: AppService, 
    private uiService: UiService){}

  logout() {
    this.service.logout();
  }

  onAlertDismiss(index: number) {
    this.uiService.alertDismiss(index);
  }
}
