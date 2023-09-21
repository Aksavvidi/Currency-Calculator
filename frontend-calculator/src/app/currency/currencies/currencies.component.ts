import {  Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { currencyAPI, Currencies } from 'shared';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PopUpCurrencyComponent } from '../pop-up-currency/pop-up-currency.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit, OnDestroy{
  constructor(
    private CurrencyService: CurrencyService,
    private appService: AppService,
    private dialog: MatDialog){}

  ngOnDestroy(): void {
   this.subscription?.unsubscribe();
  }
   

  loading = false;
  currencyList: Currencies[] = [];
  searchQuery: string = '';

  subscription: Subscription | undefined;

  openCurrencyCreationDialog( ){}

  openPopup(data?:Currencies): void{
    const dialogRef = this.dialog.open(PopUpCurrencyComponent, {
    width: '500px',height:'50vh',
      data: data //Pass the existing data here
    });
    dialogRef.afterClosed().subscribe()
  }
  // ngOnInit(): void {
  //   console.log('Starting "find All" API call');
  //   this.appService.setIsLoading(true);
  //   this.CurrencyService.getAllCurrencies().subscribe({
  //     next:(apiData:currencyAPI)=>{
  //       console.log('apiData', apiData);
  //       const data: Currencies[] = apiData.data;
  //       this.currencyList = data;

  //       console.log('Data', data);
  //     },
  //     error:(error) => {
  //       this.appService.setIsLoading(false);
  //       console.log(error)
  //     },
  //     complete: () => {
  //       this.appService.setIsLoading(false);
  //       console.log('API call completed');
  //     },
  //   })
  //}
  ngOnInit(): void {
    console.log('Starting "find All" API call');
    this.appService.setIsLoading(true);
  fetch('http://localhost:3000/api/currencies/findAll')
    .then(response  => response.json())
    .then(data => {
      console.log(data);
      this.currencyList = data.currencies;
      console.log('currencies',data.currencies );//this.currencyList
    })
    .catch((error: any) => {
      console.error(error);
    })
    .finally(() => {
      this.appService.setIsLoading(false);
      console.log('API call completed');
    });
  }
  OnCurrencyDelete(code: string) :void{
    this.CurrencyService.deleteCurrency(code).subscribe({
      next:() => {
        this.currencyList = this.currencyList.filter(data => data.code !== code);
        console.log(`Currency with code ${code} deleted successfully.`);
      },
      error: (error) => {
        console.error('Error deleting currency', error);
      },
      complete: ()=>{
        this.loading = false;
        window.location.reload();
        console.log('API call delete completed');
      }
    }) 
  }
}


