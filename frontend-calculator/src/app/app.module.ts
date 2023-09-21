import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'shared';
import { UiModule } from 'ui';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { DropDownComponent } from 'ui';
import { UsersModule } from './users/users.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExchangeRateService } from '../app/exchange-rate/exchange-rate.service';


const routes: Routes =[
  {
    path: 'users',
    loadChildren:() => import('./users/users.module').then((m)=> m.UsersModule)
  },
  {
    path: 'exchange-rate',
    loadChildren:() => import('./exchange-rate/exchange-rate.module').then((m)=> m.ExchangeRateModule)
  },
  {
    path: 'currency',
    loadChildren:() => import('./currency/currency.module').then((m)=> m.CurrencyModule)
  },
  {
    path: '',
    loadChildren:() => import('./public/public.module').then((m)=> m.PublicModule)
  },
  //{path:'', component:WelcomeComponent},
  {path:'**', component:PageNotFoundComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    //WelcomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes),
    FormsModule,HttpClientModule, MatButtonModule,
    SharedModule, UiModule,
  ],
  providers: [ExchangeRateService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
