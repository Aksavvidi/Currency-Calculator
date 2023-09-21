import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {exchangeRate, exchangeRateAPI} from './exRate.interfaces';
import { currency, currencyAPI} from 'shared';

const EXCHANGE_API = 'http://localhost:3000/api/exchangeRate';
const CURRENCY_API = 'http://localhost:3000/api/currencies';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {
  getCurrencyByCode(code: string){
    return this.http.get<currencyAPI>(`${CURRENCY_API}/find/${code}`);
  }

  getAllExchangeRates(){
    return this.http.get<exchangeRateAPI>(`${EXCHANGE_API}/`);
  }

  constructor(private http: HttpClient) {}
     convertAmount(baseCurrency: string, targetCurrency: string, amount: number) {
    const body = { baseCurrency, targetCurrency, amount };
    return this.http.post<exchangeRateAPI>(`${EXCHANGE_API}/convert`, body);
  }
   }

