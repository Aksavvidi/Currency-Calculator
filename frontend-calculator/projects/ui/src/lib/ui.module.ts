import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UiComponent } from './ui.component';
import { DropDownComponent } from './dropdown/dropdown.component';
import { AlertComponent } from './alert/alert.component';



@NgModule({
  declarations: [
    UiComponent,
    DropDownComponent,
    AlertComponent
  ],
  imports: [
    RouterModule,BrowserModule
  ],
  exports: [
    UiComponent, DropDownComponent,AlertComponent
  ]
})
export class UiModule { }
