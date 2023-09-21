import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CurrenciesComponent } from './currencies/currencies.component';
import { PopUpCurrencyComponent } from './pop-up-currency/pop-up-currency.component';
import { CurrenciesCreationDialogComponent } from './currencies-creation-dialog/currencies-creation-dialog.component';

import { CurrencyService } from './currency.service';
import { CanActivateUserGuard } from '../can-activate-user.guard';


const routes: Routes = [
  {path:'table', component: CurrenciesComponent, canActivate: [CanActivateUserGuard]},
];

@NgModule({
  declarations: [
    CurrenciesComponent,
    PopUpCurrencyComponent,
    CurrenciesCreationDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,FormsModule
  ],
  providers: [CurrencyService]
})
export class CurrencyModule { }
