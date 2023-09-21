import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {exchangeRate, exchangeRateAPI} from './exchange-rate.interfaces';
import { delay } from 'rxjs';

const EXCHANGE_API = 'http://localhost:3000/api/exchangeRate';

@Injectable()
export class ExchangeRateService {
  constructor(private http: HttpClient) {}

  getAllExchangeRates(){
    return this.http.get<exchangeRateAPI>(`${EXCHANGE_API}/`).pipe(delay(1000));
  }

  getExchangeRatesByBaseCurrency(baseCurrency: string){
    return this.http.get<exchangeRateAPI>(`${EXCHANGE_API}/base/${baseCurrency}`)
  }

  deleteExchangeRate(baseCurrency:string, targetCurrency:string) {
    return this.http.delete<exchangeRateAPI>(`${EXCHANGE_API}/${baseCurrency}/${targetCurrency}`);
  }

  updateExchangeRate(baseCurrency:string, targetCurrency:string, rate:exchangeRate){
    return this.http.patch<exchangeRateAPI>(`${EXCHANGE_API}/${baseCurrency}/${targetCurrency}`, rate);
  }

  createExchangeRate(rate: exchangeRate){
    return this.http.post<exchangeRateAPI>(`${EXCHANGE_API}/`, rate);
  }
}


