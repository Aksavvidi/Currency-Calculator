import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { tap } from 'rxjs';

import { PopUpUExchangeRateComponent } from './pop-up-uexchange-rate/pop-up-uexchange-rate.component';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import { ExchangeRateCreationDialogComponent } from './exchange-rate-creation-dialog/exchange-rate-creation-dialog.component';

import { AppService } from '../app.service';
import { ExchangeRateService } from './exchange-rate.service';
import { CanActivateUserGuard } from '../can-activate-user.guard';


//Route guard, checks whether a user is logged in and, if not, redirects them to the login page 
// const userGuard = () => {
//   const router = inject(Router);
//   const service = inject(AppService);
//   return service.isLoggedIn$.pipe(
//     tap((isLoggedIn) => {
//       if(!isLoggedIn) router.navigate(['/login']);
//     })
//   );
// };

const routes: Routes = [
  {path: 'table', component: ExchangeRateComponent,} //canActivate:[CanActivateUserGuard]},
];

@NgModule({
  declarations: [
    ExchangeRateComponent,
    PopUpUExchangeRateComponent,
    ExchangeRateCreationDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ExchangeRateService]
})
export class ExchangeRateModule { }
