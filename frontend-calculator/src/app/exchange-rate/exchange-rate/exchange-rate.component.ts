import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExchangeRateService } from '../exchange-rate.service';
import { exchangeRateAPI, exchangeRate } from '../exchange-rate.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PopUpUExchangeRateComponent } from '../pop-up-uexchange-rate/pop-up-uexchange-rate.component';
import { response } from 'express';
import { ExchangeRateCreationDialogComponent } from '../exchange-rate-creation-dialog/exchange-rate-creation-dialog.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit, OnDestroy{
  constructor(
    private exchangeRateService : ExchangeRateService,
    private appService: AppService,
    private dialog: MatDialog){}
 
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loading = false;
  exchangeRateList: exchangeRate[] = [];
  searchQuery: string = '';

  subscription: Subscription | undefined;

  openExchangeCreationDialog(): void {
    const dialogRef = this.dialog.open(ExchangeRateCreationDialogComponent, {
      width: '500px',height:'50vh', 
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  openPopup(rate?:exchangeRate): void{
    const dialogRef = this.dialog.open(PopUpUExchangeRateComponent, {
      width: '500px',height:'50vh',
      data: rate //Pass the existing data here
    });
    dialogRef.afterClosed().subscribe()
  }

  ngOnInit(): void {
    console.log('Starting API call');
    this.appService.setIsLoading(true);
    fetch('http://localhost:3000/api/exchangeRate/')
      .then(response => response.json())
      .then(rate => {
        console.log(rate);
        this.exchangeRateList = rate;
        console.log('exchange rate', rate.rate);
      })
      .catch((error:any) => {

        console.error(error);
      })
      .finally(() => {
        this.appService.setIsLoading(false);
          console.log('API call completed');
      });
    // this.exchangeRateService.getAllExchangeRates().subscribe({
    //   next: (apiData: exchangeRateAPI) => {
    //     console.log(apiData);
    //     const rate: exchangeRate[] = apiData.rate;
    //     this.exchangeRateList = rate;
    //     console.log('Exchange Rate', rate);
        
    //   },
    //   error: (error) => {console.log(error)},
    //   complete: () => {
    //     this.loading = false;
    //     console.log('API call completed');
    //   },
    // })
  }

  onSearch():void{
    if(this.searchQuery.trim() !== ''){
      this.appService.setIsLoading(true);
      this.subscription = this.exchangeRateService.getExchangeRatesByBaseCurrency(this.searchQuery).subscribe({
        next:(response:any) =>{
          const{rate} = response;
          this.exchangeRateList = rate ? [rate] : [];
        },
        error:(error) => {
          this.appService.setIsLoading(false);
          console.log(error);
          console.log('API call find One rate completed');
        },
        complete:()=>{
          this.appService.setIsLoading(false); 
        }
      });
    }
  }

  OnExchangeRateDelete(baseCurrency: string, targetCurrency:string):void{
    this.exchangeRateService.deleteExchangeRate(baseCurrency, targetCurrency).subscribe({
      next:() => {
        this.exchangeRateList = this.exchangeRateList.filter(rate => rate.baseCurrency !== baseCurrency);
        console.log(`Exchange rate with base currency ${baseCurrency} deleted successfully.`);
      },
      error: (error) => {
        console.error('Error deleting exchange rate', error);
      },
      complete: ()=>{
        this.loading = false;
        window.location.reload();
        console.log('API call delete completed');
      }
    })
  }
}
