import { Component, OnDestroy, OnInit } from '@angular/core';
import { WelcomeService } from './welcome.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import {exchangeRate, exchangeRateAPI} from './exRate.interfaces';
import { Currencies, currency, currencyAPI} from 'shared';
import { response } from 'express';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit,OnDestroy {
  selectedExchangeRate: exchangeRate | null = null; 
  amount: number | null = null; 
  convertedAmount: number | null = null; 

  exchangeRate: exchangeRate[] = [];

  constructor(private http: HttpClient, private welcomeService: WelcomeService) {} 
  ngOnInit(): void {
    this.welcomeService.getAllExchangeRates().subscribe((response:any) => {
      this.exchangeRate = response;
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  currencyList: Currencies[] =  [];
  subscription: Subscription | undefined;
  searchQuery: string = '';

  onConvert() {
    if (this.selectedExchangeRate && this.amount !== null) {
      const baseCurrency = this.selectedExchangeRate.baseCurrency;
      const targetCurrency = this.selectedExchangeRate.targetCurrency;
      
      this.subscription = this.welcomeService.convertAmount(baseCurrency, targetCurrency, this.amount)
        .subscribe({
          next: (response: any) => {
            this.convertedAmount = response.convertedAmount;
            console.log(`The amount ${this.amount} ${baseCurrency} is ${this.convertedAmount} ${targetCurrency}`);
          },
          error: (error: any) => {
            console.error(error);
          }
      });
    }
  }
  onSearch(): void{
    console.log('Search query:', this.searchQuery);
    if(this.searchQuery.trim() !== ''){
      this.subscription = this.welcomeService.getCurrencyByCode(this.searchQuery).subscribe({
        next:(response: any )=> {
          const data = response;
          this.currencyList = data? [data] : [];
          console.log('Currency list:',this.currencyList);
          this.searchQuery = '';

        },
        error: (error) => {
          console.log("Currency code not found")
        },
        complete: () => {
          console.log('API call find one currency name completed');
        }
      })
    }else {
      this.currencyList = [];
    }

  }
}




